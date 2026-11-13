import { describe, expect, it } from "vitest";
import { crearEquipo, Futbol, Partido, Resultado } from "../02-ejemplos/torneo.ts";
import { TablaPosiciones } from "./tabla.ts";

function jugado(id: string, a: string, b: string, gl: number, gv: number): Partido {
  const p = new Partido(id, crearEquipo(a, 11), crearEquipo(b, 11), new Futbol());
  p.resultado = new Resultado(gl, gv);
  return p;
}

describe("M · TablaPosiciones", () => {
  it("3 puntos al ganador, 1 a cada uno en el empate, 0 al perdedor", () => {
    const t = new TablaPosiciones();
    t.registrar(jugado("1", "Atlético", "San Martín", 2, 0));
    t.registrar(jugado("2", "San Martín", "Central", 1, 1));
    const pts = Object.fromEntries(t.posiciones().map((f) => [f.equipo, f.pts]));
    expect(pts).toEqual({ "Atlético": 3, "San Martín": 1, "Central": 1 });
  });

  it("calcula pj, pg, pe, pp, gf, gc y dg", () => {
    const t = new TablaPosiciones();
    t.registrar(jugado("1", "A", "B", 3, 1));
    t.registrar(jugado("2", "B", "A", 2, 2));
    expect(t.posiciones()[0]).toEqual({ equipo: "A", pj: 2, pg: 1, pe: 1, pp: 0, gf: 5, gc: 3, dg: 2, pts: 4 });
  });

  it("ordena por puntos, después diferencia de gol, después goles a favor, después nombre", () => {
    const t = new TablaPosiciones();
    t.registrar(jugado("1", "Zeta", "X", 3, 0)); // Zeta 3 pts dg +3
    t.registrar(jugado("2", "Alfa", "Y", 1, 0)); // Alfa 3 pts dg +1
    t.registrar(jugado("3", "Beta", "W", 2, 1)); // Beta 3 pts dg +1, gf 2
    t.registrar(jugado("4", "Gama", "V", 1, 0)); // Gama 3 pts dg +1, gf 1 (empata con Alfa → nombre)
    expect(t.posiciones().slice(0, 4).map((f) => f.equipo)).toEqual(["Zeta", "Beta", "Alfa", "Gama"]);
  });

  it("un partido sin jugar no se puede registrar", () => {
    const p = new Partido("9", crearEquipo("A", 1), crearEquipo("B", 1), new Futbol());
    expect(() => new TablaPosiciones().registrar(p)).toThrow("El partido 9 todavía no se jugó");
  });

  it("posiciones() devuelve copias: modificarlas no altera la tabla", () => {
    const t = new TablaPosiciones();
    t.registrar(jugado("1", "A", "B", 1, 0));
    t.posiciones()[0].pts = 999;
    expect(t.posiciones()[0].pts).toBe(3);
  });
});
