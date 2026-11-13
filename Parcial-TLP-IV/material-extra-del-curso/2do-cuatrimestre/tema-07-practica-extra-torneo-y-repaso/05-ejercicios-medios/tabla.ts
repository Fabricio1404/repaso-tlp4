// EJERCICIO M · Tabla de posiciones — consigna en ENUNCIADOS.md. Los tests son la especificación.
import type { Partido } from "../02-ejemplos/torneo.ts";

export interface Fila {
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  dg: number;
  pts: number;
}

export class TablaPosiciones {
  registrar(partido: Partido): void {
    throw new Error(`TODO: registrar ${partido.id}`);
  }

  posiciones(): Fila[] {
    throw new Error("TODO");
  }
}
