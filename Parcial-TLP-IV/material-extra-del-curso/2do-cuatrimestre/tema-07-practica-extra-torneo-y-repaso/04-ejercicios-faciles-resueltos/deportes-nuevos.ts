// RESOLUCIÓN F · Deportes nuevos SIN tocar Partido (OCP + polimorfismo)
import { Deporte, Equipo } from "../02-ejemplos/torneo.ts";

// 📌 [OCP] Deporte nuevo = clase nueva. Partido no se modifica
export class Voley extends Deporte {
  constructor() {
    super("Vóley", 6);
  }
  validar(equipo: Equipo): boolean {
    return equipo.cantidad <= this.maxPorEquipo;
  }
}

// 📌 [POLIMORFISMO] Otra regla distinta: exactamente 1 jugador (no "como máximo")
export class Tenis extends Deporte {
  constructor() {
    super("Tenis", 1);
  }
  validar(equipo: Equipo): boolean {
    return equipo.cantidad === this.maxPorEquipo;
  }
}

// 📌 [REGLA COMBINADA] Mínimo y máximo: entre 5 y 7 (fútbol 5 con suplentes)
export class Futbol5 extends Deporte {
  private minimo: number;
  constructor() {
    super("Fútbol 5", 7);
    this.minimo = 5;
  }
  validar(equipo: Equipo): boolean {
    return equipo.cantidad >= this.minimo && equipo.cantidad <= this.maxPorEquipo;
  }
}
