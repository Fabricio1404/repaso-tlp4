// EJERCICIO D · Torneo en vivo — consigna en ENUNCIADOS.md. Los tests son la especificación.
// Podés reutilizar: Voley (../04-ejercicios-faciles-resueltos) y TablaPosiciones (../06-ejercicios-medios-resueltos).
import type { Deporte, Equipo, Partido } from "../02-ejemplos/torneo.ts";

export type TipoDeporte = "futbol" | "basquet" | "voley";

export class FabricaDeportes {
  static crear(tipo: TipoDeporte): Deporte {
    throw new Error(`TODO ${tipo}`);
  }
}

export interface EventoResultado {
  readonly partidoId: string;
  readonly local: string;
  readonly visitante: string;
  readonly resultado: string;
}

export interface ObservadorTorneo {
  resultadoCargado(evento: EventoResultado, partido: Partido): void;
}

export class TorneoEnVivo {
  constructor(nombre: string, tipo: TipoDeporte) {}
  suscribir(o: ObservadorTorneo): void {
    throw new Error("TODO");
  }
  programar(id: string, local: Equipo, visitante: Equipo): Partido {
    throw new Error("TODO");
  }
  cargarResultado(id: string, golesLocal: number, golesVisitante: number): void {
    throw new Error("TODO");
  }
}

export class TablaObservador implements ObservadorTorneo {
  // TODO: tabla (TablaPosiciones)
  resultadoCargado(_e: EventoResultado, partido: Partido): void {
    throw new Error("TODO");
  }
}

export class Prensa implements ObservadorTorneo {
  readonly titulares: string[] = [];
  resultadoCargado(e: EventoResultado): void {
    throw new Error("TODO");
  }
}
