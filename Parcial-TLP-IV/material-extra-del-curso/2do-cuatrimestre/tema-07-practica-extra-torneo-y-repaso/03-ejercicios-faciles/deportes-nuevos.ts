// EJERCICIO F · Deportes nuevos — consigna en ENUNCIADOS.md. Los tests (deportes-nuevos.test.ts) son la especificación.
import { Deporte, Equipo } from "../02-ejemplos/torneo.ts";

export class Voley extends Deporte {
  constructor() {
    super("Vóley", 6);
  }
  validar(equipo: Equipo): boolean {
    throw new Error("TODO");
  }
}

export class Tenis extends Deporte {
  constructor() {
    super("Tenis", 1);
  }
  validar(equipo: Equipo): boolean {
    throw new Error("TODO");
  }
}

export class Futbol5 extends Deporte {
  constructor() {
    super("Fútbol 5", 7);
    // TODO: el mínimo
  }
  validar(equipo: Equipo): boolean {
    throw new Error("TODO");
  }
}
