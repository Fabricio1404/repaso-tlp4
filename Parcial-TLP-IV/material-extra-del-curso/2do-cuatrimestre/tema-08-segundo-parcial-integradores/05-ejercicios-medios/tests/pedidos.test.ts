import { describe, expect, it, vi } from 'vitest';
import { type Pedido, type PedidoRepository, type Reloj, ServicioPedidos } from '../src/pedidos';

// Dobles dados
function repoFalso(pedido: Pedido | undefined) {
  return { buscar: vi.fn(() => (pedido ? { ...pedido } : undefined)), guardar: vi.fn() } satisfies PedidoRepository;
}
const relojFijo: Reloj = { ahora: () => new Date('2026-03-10T15:00:00Z') };
const pendiente: Pedido = { id: 1, cliente: 'Ana', estado: 'pendiente' };

describe('ServicioPedidos', () => {
  // Ejemplo dado
  it('avanzar un pedido pendiente lo pasa a "preparando"', () => {
    const servicio = new ServicioPedidos(repoFalso(pendiente), relojFijo);
    expect(servicio.avanzar(1).estado).toBe('preparando');
  });

  it.todo('avanzar guarda el pedido actualizado una vez (R2)');
  it.todo('avanzar notifica a TODOS los observadores con el evento completo, usando la fecha del reloj (R5)');
  it.todo('primero se guarda y después se notifica (R5) — pista: mock.invocationCallOrder');
  it.todo('un pedido entregado no puede avanzar: error, no guarda, no notifica (R3)');
  it.todo('cancelar: se puede en pendiente y preparando; no en enviado, entregado ni cancelado (R4)');
  it.todo('desuscribir saca SOLO a ese observador (R6) — probalo con 3 observadores');
  it.todo('pedido inexistente: PedidoNoEncontradoError');
});
