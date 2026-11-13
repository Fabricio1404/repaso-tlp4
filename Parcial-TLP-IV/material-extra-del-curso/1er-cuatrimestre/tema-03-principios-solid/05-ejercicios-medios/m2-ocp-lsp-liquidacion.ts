// EJERCICIO M2 · OCP + LSP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL (funciona, mal diseñado). Refactorizalo.

class Empleado {
  readonly nombre: string;
  readonly tipo: string;
  readonly base: number;

  constructor(nombre: string, tipo: string, base: number) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.base = base;
  }

  calcularBono(): number {
    return this.base * 0.1;
  }
}

class Pasante extends Empleado {
  constructor(nombre: string, base: number) {
    super(nombre, "pasante", base);
  }

  override calcularBono(): number {
    throw new Error("Los pasantes no cobran bono");
  }
}

class Liquidador {
  liquidar(e: Empleado): number {
    let sueldo = 0;
    switch (e.tipo) {
      case "planta":
        sueldo = e.base;
        break;
      case "contratado":
        sueldo = e.base * 0.9;
        break;
      case "pasante":
        sueldo = e.base * 0.5;
        break;
    }
    if (e.tipo !== "pasante") {
      sueldo += e.calcularBono();
    }
    return sueldo;
  }
}

// Bloque de prueba
const liquidador = new Liquidador();
const nomina: Empleado[] = [
  new Empleado("Ana", "planta", 1000000),
  new Empleado("Beto", "contratado", 800000),
  new Pasante("Caro", 400000),
];
let total = 0;
for (const e of nomina) {
  const s = liquidador.liquidar(e);
  total += s;
  console.log(`${e.nombre}: $${s}`);
}
console.log(`Total: $${total}`);
