// SOLUCIÓN · modelos.ts (igual que en inicio: los productos ya estaban bien)

export type TipoPlato = "pizza" | "empanada" | "ensalada";

// 📌 [FACTORY - TIPO COMÚN] Lo que devuelve la fábrica
export abstract class Plato {
  readonly nombre: string;
  readonly precio: number;

  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }

  abstract minutosPreparacion(): number;
}

export class Pizza extends Plato {
  constructor() {
    super("Pizza muzzarella", 9000);
  }
  minutosPreparacion(): number {
    return 20;
  }
}

export class Empanada extends Plato {
  constructor() {
    super("Empanada de carne", 1200);
  }
  minutosPreparacion(): number {
    return 15;
  }
}

export class Ensalada extends Plato {
  constructor() {
    super("Ensalada mixta", 5500);
  }
  minutosPreparacion(): number {
    return 5;
  }
}
