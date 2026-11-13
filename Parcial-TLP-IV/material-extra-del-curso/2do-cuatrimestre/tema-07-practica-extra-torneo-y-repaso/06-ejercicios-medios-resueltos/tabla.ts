// RESOLUCIÓN M · Tabla de posiciones
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
  // 📌 [ENCAPSULAMIENTO] Un Map privado: nombre del equipo → fila acumulada
  private filas: Map<string, Fila>;

  constructor() {
    this.filas = new Map();
  }

  registrar(partido: Partido): void {
    // 📌 [NARROWING] resultado es opcional: sin resultado no se puede registrar
    if (partido.resultado === undefined) {
      throw new Error(`El partido ${partido.id} todavía no se jugó`);
    }
    const { local, visitante } = partido.resultado;
    this.sumar(partido.local.nombre, local, visitante);
    this.sumar(partido.visitante.nombre, visitante, local);
  }

  // 📌 [ORDEN CON COMPARADOR] puntos ↓, diferencia de gol ↓, goles a favor ↓, nombre ↑
  posiciones(): Fila[] {
    return [...this.filas.values()]
      .map((f) => ({ ...f }))
      .sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.equipo.localeCompare(b.equipo));
  }

  private sumar(equipo: string, favor: number, contra: number): void {
    const f = this.filas.get(equipo) ?? { equipo, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 };
    f.pj++;
    f.gf += favor;
    f.gc += contra;
    f.dg = f.gf - f.gc;
    if (favor > contra) {
      f.pg++;
      f.pts += 3;
    } else if (favor === contra) {
      f.pe++;
      f.pts += 1;
    } else {
      f.pp++;
    }
    this.filas.set(equipo, f);
  }
}
