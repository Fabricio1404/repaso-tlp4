import { describe, expect, it } from "vitest";
import { crearEquipo, Partido } from "../02-ejemplos/torneo.ts";
import { Futbol5, Tenis, Voley } from "./deportes-nuevos.ts";

describe("F · deportes nuevos", () => {
  it.each([
    [6, true],
    [7, false],
  ])("Vóley con %d jugadores válido = %s", (n, ok) => {
    expect(new Voley().validar(crearEquipo("A", n))).toBe(ok);
  });

  it.each([
    [0, false],
    [1, true],
    [2, false],
  ])("Tenis con %d jugadores válido = %s", (n, ok) => {
    expect(new Tenis().validar(crearEquipo("A", n))).toBe(ok);
  });

  it.each([
    [4, false],
    [5, true],
    [7, true],
    [8, false],
  ])("Fútbol 5 con %d jugadores válido = %s", (n, ok) => {
    expect(new Futbol5().validar(crearEquipo("A", n))).toBe(ok);
  });

  it("Partido funciona con los deportes nuevos sin haber sido modificado (OCP)", () => {
    expect(() => new Partido("P", crearEquipo("A", 1), crearEquipo("B", 1), new Tenis())).not.toThrow();
    expect(() => new Partido("P", crearEquipo("A", 2), crearEquipo("B", 1), new Tenis())).toThrow("Equipos no válidos para el deporte");
    expect(new Voley().nombre).toBe("Vóley");
  });
});
