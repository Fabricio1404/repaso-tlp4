import { describe, expect, it, vi } from "vitest";
import { Basquet, crearEquipo, Futbol } from "../02-ejemplos/torneo.ts";
import { FabricaDeportes, Prensa, TablaObservador, TorneoEnVivo } from "./torneo-en-vivo.ts";

describe("D · FabricaDeportes", () => {
  it("crea el deporte correcto", () => {
    expect(FabricaDeportes.crear("futbol")).toBeInstanceOf(Futbol);
    expect(FabricaDeportes.crear("basquet")).toBeInstanceOf(Basquet);
    expect(FabricaDeportes.crear("voley").nombre).toBe("Vóley");
  });
});

describe("D · TorneoEnVivo (Observer)", () => {
  function torneo() {
    const t = new TorneoEnVivo("Liga", "basquet");
    t.programar("P1", crearEquipo("Tigres", 5), crearEquipo("Leones", 5));
    t.programar("P2", crearEquipo("Leones", 5), crearEquipo("Pumas", 5));
    return t;
  }

  it("valida los equipos con el deporte fabricado (básquet: máx. 5)", () => {
    expect(() => new TorneoEnVivo("X", "basquet").programar("P", crearEquipo("A", 6), crearEquipo("B", 5))).toThrow(
      "Equipos no válidos para el deporte",
    );
  });

  it("al cargar un resultado avisa a todos los observadores con el evento", () => {
    const t = torneo();
    const espia = { resultadoCargado: vi.fn() };
    t.suscribir(espia);
    t.cargarResultado("P1", 80, 75);
    expect(espia.resultadoCargado).toHaveBeenCalledTimes(1);
    expect(espia.resultadoCargado.mock.calls[0][0]).toEqual({ partidoId: "P1", local: "Tigres", visitante: "Leones", resultado: "80 - 75" });
  });

  it("la prensa arma titulares y la tabla se actualiza sola", () => {
    const t = torneo();
    const prensa = new Prensa();
    const tabla = new TablaObservador();
    t.suscribir(prensa);
    t.suscribir(tabla);
    t.cargarResultado("P1", 80, 75);
    t.cargarResultado("P2", 70, 70);
    expect(prensa.titulares).toEqual(["Tigres 80 - 75 Leones", "Leones 70 - 70 Pumas"]);
    // @ts-expect-error -- TablaObservador.tabla todavía no existe en el inicio: borrá esta línea cuando la agregues
    expect(tabla.tabla.posiciones().map((f) => `${f.equipo}:${f.pts}`)).toEqual(["Tigres:3", "Pumas:1", "Leones:1"]);
  });

  it.each([
    ["P9", 1, 0, "No existe el partido P9"],
    ["P1", -1, 0, "Los goles deben ser enteros"],
    ["P1", 1.5, 0, "Los goles deben ser enteros"],
  ])("cargarResultado(%s, %d, %d) falla y no notifica", (id, gl, gv, mensaje) => {
    const t = torneo();
    const espia = { resultadoCargado: vi.fn() };
    t.suscribir(espia);
    expect(() => t.cargarResultado(id, gl, gv)).toThrow(mensaje);
    expect(espia.resultadoCargado).not.toHaveBeenCalled();
  });

  it("no se puede cargar dos veces el mismo partido", () => {
    const t = torneo();
    t.cargarResultado("P1", 1, 0);
    expect(() => t.cargarResultado("P1", 2, 0)).toThrow("ya tiene resultado");
  });
});
