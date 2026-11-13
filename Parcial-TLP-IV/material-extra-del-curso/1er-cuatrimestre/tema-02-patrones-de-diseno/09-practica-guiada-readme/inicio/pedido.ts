// INICIO · pedido.ts
import type { Plato } from "./modelos.ts";
import type { ServicioDelivery } from "./delivery.ts";
import { Cocina } from "./cocina.ts";
import { Mozo, PantallaCocina } from "./observadores.ts";

export class Pedido {
  private static proximo = 1;
  readonly numero: number;
  readonly destino: string;
  private platos: Plato[];
  private estado: string;
  private mozo: Mozo;
  private pantalla: PantallaCocina;

  constructor(destino: string) {
    this.numero = Pedido.proximo++;
    this.destino = destino;
    this.platos = [];
    this.estado = "abierto";
    this.mozo = new Mozo("Juan");
    this.pantalla = new PantallaCocina();
  }

  agregar(plato: Plato, cantidad: number = 1): void {
    for (let i = 0; i < cantidad; i++) {
      this.platos.push(plato);
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
    const cocina = new Cocina();
    cocina.encolar(`#${this.numero} ${this.destino}`);
    this.cambiarEstado("confirmado");
  }

  cambiarEstado(estado: string): void {
    this.estado = estado;
    this.mozo.avisar(this.numero, this.destino, this.estado);
    this.pantalla.mostrar(this.numero, this.estado);
  }

  enviarPorDelivery(servicio: ServicioDelivery, direccion: string): string {
    // TODO (TAREA 5): usar el servicio, pasar el estado a "en camino (<seguimiento>)" y devolver el seguimiento
    throw new Error("TODO: enviarPorDelivery");
  }
}
