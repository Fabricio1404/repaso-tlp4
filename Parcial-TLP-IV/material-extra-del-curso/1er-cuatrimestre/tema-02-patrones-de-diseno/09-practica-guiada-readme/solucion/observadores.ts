// SOLUCIÓN · observadores.ts (TAREA 4: Observer)

export interface EventoPedido {
  readonly pedido: number;
  readonly destino: string;
  readonly estado: string;
}

// 📌 [OBSERVER - INTERFAZ] Pedido depende de esto, no de Mozo ni de PantallaCocina
export interface ObservadorPedido {
  pedidoActualizado(evento: EventoPedido): void;
}

// 📌 [OBSERVER - CONCRETO]
export class Mozo implements ObservadorPedido {
  readonly nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  pedidoActualizado(e: EventoPedido): void {
    console.log(`  [Mozo ${this.nombre}] Pedido #${e.pedido} (${e.destino}): ${e.estado}`);
  }
}

export class PantallaCocina implements ObservadorPedido {
  pedidoActualizado(e: EventoPedido): void {
    if (e.estado === "confirmado") {
      console.log(`  [Pantalla] NUEVO #${e.pedido}`);
    }
  }
}

// 📌 [OBSERVER - CONCRETO NUEVO] Se agregó sin tocar Pedido (TAREA 4, último punto)
export class ClienteApp implements ObservadorPedido {
  readonly cliente: string;
  constructor(cliente: string) {
    this.cliente = cliente;
  }
  pedidoActualizado(e: EventoPedido): void {
    console.log(`  [App de ${this.cliente}] Tu pedido está ${e.estado}`);
  }
}
