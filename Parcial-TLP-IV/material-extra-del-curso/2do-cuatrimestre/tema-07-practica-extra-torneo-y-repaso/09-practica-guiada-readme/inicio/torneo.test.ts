// Pruebas del TP con Vitest (segundo cuatrimestre aplicado al código del primero)
import { describe, expect, it, vi } from "vitest";
import { Basquet, crearEquipo, Equipo, Futbol, gestionarTorneo, Jugador, Partido, Torneo } from "./torneo.ts";

describe("gestionarTorneo (ejemplos del enunciado)", () => {
  it("fútbol con 10 y 11 jugadores → OK", () => {
    expect(gestionarTorneo({ deporte: "Futbol", jugadoresLocal: 10, jugadoresVisitante: 11 })).toBe("OK");
  });

  it("básquet con 6 y 4 → Equipos no válidos para el deporte", () => {
    expect(gestionarTorneo({ deporte: "Basquet", jugadoresLocal: 6, jugadoresVisitante: 4 })).toBe("Equipos no válidos para el deporte");
  });

  it.each([
    ["Futbol", 11, true],
    ["Futbol", 12, false],
    ["Basquet", 5, true],
    ["Basquet", 6, false],
  ] as const)("límite: %s con %d jugadores válido = %s", (deporte, n, esperado) => {
    const d = deporte === "Futbol" ? new Futbol() : new Basquet();
    expect(d.validar(crearEquipo("X", n))).toBe(esperado);
  });
});

describe("Equipo, Partido y Torneo", () => {
  it("no admite jugadores duplicados por id", () => {
    const e = new Equipo("A");
    e.agregarJugador(new Jugador("1", "Ana", 20));
    expect(() => e.agregarJugador(new Jugador("1", "Otra", 22))).toThrow("ya está en el equipo");
    expect(e.cantidad).toBe(1);
  });

  it("un partido exige equipos distintos", () => {
    const a = crearEquipo("A", 5);
    expect(() => new Partido("P", a, a, new Futbol())).toThrow("Los equipos deben ser distintos");
  });

  it("jugar() usa Math.random: se controla con vi.spyOn para que el test sea determinista", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.5).mockReturnValueOnce(0.1);
    const p = new Partido("P", crearEquipo("A", 3), crearEquipo("B", 3), new Basquet());
    expect(p.jugar().toString()).toBe("2 - 0");
    expect(p.toString()).toBe("A vs B (Básquet): 2 - 0");
    vi.restoreAllMocks();
  });

  it("el torneo rechaza ids de partido repetidos y devuelve una copia de la lista", () => {
    const t = new Torneo("T", "Copa");
    const p = new Partido("P1", crearEquipo("A", 3), crearEquipo("B", 3), new Futbol());
    t.programarPartido(p);
    expect(() => t.programarPartido(p)).toThrow("Ya existe el partido P1");
    t.listarPartidos().pop();
    expect(t.listarPartidos()).toHaveLength(1);
  });
});
