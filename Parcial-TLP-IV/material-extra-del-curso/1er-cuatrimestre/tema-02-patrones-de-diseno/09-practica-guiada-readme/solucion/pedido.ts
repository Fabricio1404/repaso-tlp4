// SOLUCIÓN · pedido.ts
import type { Plato, TipoPlato } from "./modelos.ts";
import type { EventoPedido, ObservadorPedido } from "./observadores.ts";
import type { ServicioDelivery } from "./delivery.ts";
import { FabricaPlatos } from "./fabrica-platos.ts";
import { Cocina } from "./cocina.ts";

export class Pedido {
  private static proximo = 1;
  readonly numero: number;
  readonly destino: string;
  private platos: Plato[];
  private estado: string;
  // 📌 [OBSERVER - SUJETO] Antes tenía "private mozo = new Mozo(...)" y "private pantalla = new PantallaCocina()"
  private observadores: ObservadorPedido[];

  constructor(destino: string) {
    this.numero = Pedido.proximo++;
    this.destino = destino;
    this.platos = [];
    this.estado = "abierto";
    this.observadores = [];
  }

  suscribir(o: ObservadorPedido): void {
    this.observadores.push(o);
  }

  // 📌 [FACTORY EN USO] Recibe el TIPO y le pide el plato a la fábrica (antes recibía un Plato creado con new en main)
  agregar(tipo: TipoPlato, cantidad: number = 1): void {
    for (let i = 0; i < cantidad; i++) {
      this.platos.push(FabricaPlatos.crear(tipo));
    }
  }

  get total(): number {
    return this.platos.reduce((acc, p) => acc + p.precio, 0);
  }

  get minutosEstimados(): number {
    return this.platos.reduce((max, p) => Math.max(max, p.minutosPreparacion()), 0);
  }

  detalle(): string {
    const conteo = new Map<string, number>();
    for (const p of this.platos) {
      conteo.set(p.nombre, (conteo.get(p.nombre) ?? 0) + 1);
    }
    const partes: string[] = [];
    for (const [nombre, cant] of conteo) {
      partes.push(`${cant}x ${nombre}`);
    }
    return `#${this.numero} ${this.destino}: ${partes.join(", ")} = $${this.total} (~${this.minutosEstimados} min)`;
  }

  confirmar(): void {
    if (this.platos.length === 0) {
      throw new Error("No se puede confirmar un pedido vacío");
    }
    // 📌 [SINGLETON EN USO] Antes: new Cocina() → una cola nueva por pedido
    Cocina.obtenerInstancia().encolar(`#${this.numero} ${this.destino}`);
    this.cambiarEstado("confirmado");
  }

  cambiarEstado(estado: string): void {
    this.estado = estado;
    this.notificar();
  }

  // 📌 [ADAPTER EN USO] Pedido depende de ServicioDelivery (interfaz); no sabe nada de payloads ni centavos
  enviarPorDelivery(servicio: ServicioDelivery, direccion: string): string {
    const seguimiento = servicio.enviar(this.numero, direccion, this.total);
    this.cambiarEstado(`en camino (${seguimiento})`);
    return seguimiento;
  }

  // 📌 [OBSERVER - NOTIFICAR] Recorre sin saber quiénes son
  private notificar(): void {
    const evento: EventoPedido = { pedido: this.numero, destino: this.destino, estado: this.estado };
    for (const o of this.observadores) {
      o.pedidoActualizado(evento);
    }
  }
}
