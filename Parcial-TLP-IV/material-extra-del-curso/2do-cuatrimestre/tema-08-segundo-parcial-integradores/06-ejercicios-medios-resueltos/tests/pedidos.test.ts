import { describe, expect, it, vi } from 'vitest';
import {
  type EstadoPedido,
  type Pedido,
  PedidoNoEncontradoError,
  type PedidoRepository,
  type Reloj,
  ServicioPedidos,
  TransicionInvalidaError,
} from '../src/pedidos';

function repoFalso(pedido: Pedido | undefined) {
  return { buscar: vi.fn(() => (pedido ? { ...pedido } : undefined)), guardar: vi.fn() } satisfies PedidoRepository;
}
const relojFijo: Reloj = { ahora: () => new Date('2026-03-10T15:00:00Z') };
const pendiente: Pedido = { id: 1, cliente: 'Ana', estado: 'pendiente' };
// 📌 [ESPÍA COMO OBSERVADOR] Cualquier objeto con notificar() sirve: el sujeto depende de la interfaz
const observador = () => ({ notificar: vi.fn() });

describe('ServicioPedidos', () => {
  it('avanzar un pedido pendiente lo pasa a "preparando"', () => {
    const servicio = new ServicioPedidos(repoFalso(pendiente), relojFijo);
    expect(servicio.avanzar(1).estado).toBe('preparando');
  });

  it('avanzar guarda el pedido actualizado una vez (R2)', () => {
    const repo = repoFalso(pendiente);
    new ServicioPedidos(repo, relojFijo).avanzar(1);
    expect(repo.guardar).toHaveBeenCalledTimes(1);
    expect(repo.guardar).toHaveBeenCalledWith({ id: 1, cliente: 'Ana', estado: 'preparando' });
  });

  it('avanzar notifica a TODOS los observadores con el evento completo, usando la fecha del reloj (R5)', () => {
    const servicio = new ServicioPedidos(repoFalso(pendiente), relojFijo);
    const a = observador();
    const b = observador();
    servicio.suscribir(a);
    servicio.suscribir(b);
    servicio.avanzar(1);
    const esperado = { pedidoId: 1, estadoAnterior: 'pendiente', estadoNuevo: 'preparando', fecha: '2026-03-10' };
    expect(a.notificar).toHaveBeenCalledWith(esperado);
    expect(b.notificar).toHaveBeenCalledWith(esperado);
  });

  // 📌 [ORDEN DE LLAMADAS] invocationCallOrder: número de orden global. Reveló el DEFECTO 3
  it('primero se guarda y después se notifica (R5)', () => {
    const repo = repoFalso(pendiente);
    const obs = observador();
    const servicio = new ServicioPedidos(repo, relojFijo);
    servicio.suscribir(obs);
    servicio.avanzar(1);
    expect(repo.guardar.mock.invocationCallOrder[0]).toBeLessThan(obs.notificar.mock.invocationCallOrder[0]);
  });

  it('si guardar falla, nadie es notificado (R5)', () => {
    const repo = repoFalso(pendiente);
    repo.guardar.mockImplementation(() => {
      throw new Error('base caída');
    });
    const obs = observador();
    const servicio = new ServicioPedidos(repo, relojFijo);
    servicio.suscribir(obs);
    expect(() => servicio.avanzar(1)).toThrow('base caída');
    expect(obs.notificar).not.toHaveBeenCalled();
  });

  it('un pedido entregado no puede avanzar: error, no guarda, no notifica (R3)', () => {
    const repo = repoFalso({ ...pendiente, estado: 'entregado' });
    const obs = observador();
    const servicio = new ServicioPedidos(repo, relojFijo);
    servicio.suscribir(obs);
    expect(() => servicio.avanzar(1)).toThrow(TransicionInvalidaError);
    expect(repo.guardar).not.toHaveBeenCalled();
    expect(obs.notificar).not.toHaveBeenCalled();
  });

  // 📌 [IT.EACH POR ESTADO] "enviado" reveló el DEFECTO 2
  it.each(['pendiente', 'preparando'] as EstadoPedido[])('se puede cancelar un pedido %s (R4)', (estado) => {
    const servicio = new ServicioPedidos(repoFalso({ ...pendiente, estado }), relojFijo);
    expect(servicio.cancelar(1).estado).toBe('cancelado');
  });

  it.each(['enviado', 'entregado', 'cancelado'] as EstadoPedido[])('NO se puede cancelar un pedido %s (R4)', (estado) => {
    const repo = repoFalso({ ...pendiente, estado });
    expect(() => new ServicioPedidos(repo, relojFijo).cancelar(1)).toThrow(TransicionInvalidaError);
    expect(repo.guardar).not.toHaveBeenCalled();
  });

  // 📌 [TRES OBSERVADORES] Con uno solo el defecto de splice no se ve. Reveló el DEFECTO 1
  it('desuscribir saca SOLO a ese observador (R6)', () => {
    const servicio = new ServicioPedidos(repoFalso(pendiente), relojFijo);
    const [a, b, c] = [observador(), observador(), observador()];
    servicio.suscribir(a);
    servicio.suscribir(b);
    servicio.suscribir(c);
    servicio.desuscribir(b);
    servicio.avanzar(1);
    expect(a.notificar).toHaveBeenCalledTimes(1);
    expect(b.notificar).not.toHaveBeenCalled();
    expect(c.notificar).toHaveBeenCalledTimes(1);
  });

  it('pedido inexistente: PedidoNoEncontradoError', () => {
    expect(() => new ServicioPedidos(repoFalso(undefined), relojFijo).avanzar(9)).toThrow(PedidoNoEncontradoError);
  });
});
