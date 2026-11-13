export type EstadoPedido = 'pendiente' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';

export interface Pedido {
  id: number;
  cliente: string;
  estado: EstadoPedido;
}

export interface EventoPedido {
  pedidoId: number;
  estadoAnterior: EstadoPedido;
  estadoNuevo: EstadoPedido;
  fecha: string; // AAAA-MM-DD
}

// Observer
export interface ObservadorPedido {
  notificar(evento: EventoPedido): void;
}

// Dependencias inyectadas (DIP)
export interface PedidoRepository {
  buscar(id: number): Pedido | undefined;
  guardar(pedido: Pedido): void;
}

export interface Reloj {
  ahora(): Date;
}

export class PedidoNoEncontradoError extends Error {}
export class TransicionInvalidaError extends Error {}

const SIGUIENTE: Partial<Record<EstadoPedido, EstadoPedido>> = {
  pendiente: 'preparando',
  preparando: 'enviado',
  enviado: 'entregado',
};

export class ServicioPedidos {
  private repo: PedidoRepository;
  private reloj: Reloj;
  private observadores: ObservadorPedido[];

  constructor(repo: PedidoRepository, reloj: Reloj) {
    this.repo = repo;
    this.reloj = reloj;
    this.observadores = [];
  }

  suscribir(o: ObservadorPedido): void {
    this.observadores.push(o);
  }

  desuscribir(o: ObservadorPedido): void {
    const i = this.observadores.indexOf(o);
    // 📌 [DEFECTO 1 CORREGIDO - R6] splice(i) sin cantidad borraba DESDE i hasta el final (a todos los siguientes)
    if (i !== -1) this.observadores.splice(i, 1);
  }

  /** R2 y R3 */
  avanzar(id: number): Pedido {
    const pedido = this.obtener(id);
    const siguiente = SIGUIENTE[pedido.estado];
    if (siguiente === undefined) {
      throw new TransicionInvalidaError(`Un pedido ${pedido.estado} no puede avanzar`);
    }
    return this.cambiar(pedido, siguiente);
  }

  /** R4 */
  cancelar(id: number): Pedido {
    const pedido = this.obtener(id);
    // 📌 [DEFECTO 2 CORREGIDO - R4] Antes se permitía cancelar un pedido ENVIADO. Solo pendiente o preparando
    if (pedido.estado !== 'pendiente' && pedido.estado !== 'preparando') {
      throw new TransicionInvalidaError(`Un pedido ${pedido.estado} no se puede cancelar`);
    }
    return this.cambiar(pedido, 'cancelado');
  }

  private obtener(id: number): Pedido {
    const p = this.repo.buscar(id);
    if (p === undefined) throw new PedidoNoEncontradoError(`No existe el pedido ${id}`);
    return p;
  }

  private cambiar(pedido: Pedido, estadoNuevo: EstadoPedido): Pedido {
    const actualizado: Pedido = { ...pedido, estado: estadoNuevo };
    const evento: EventoPedido = {
      pedidoId: pedido.id,
      estadoAnterior: pedido.estado,
      estadoNuevo,
      fecha: this.reloj.ahora().toISOString().slice(0, 10),
    };
    // 📌 [DEFECTO 3 CORREGIDO - R5] Antes notificaba ANTES de guardar. Primero se guarda, después se avisa
    this.repo.guardar(actualizado);
    for (const o of this.observadores) o.notificar(evento);
    return actualizado;
  }
}
