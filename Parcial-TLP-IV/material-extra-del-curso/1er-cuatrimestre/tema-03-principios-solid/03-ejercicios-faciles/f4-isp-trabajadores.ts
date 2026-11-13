// EJERCICIO F4 · ISP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona, pero está mal diseñado. Refactorizalo.

interface Trabajador {
  trabajar(): string;
  comer(): string;
  cobrarSueldo(): number;
}

class Empleado implements Trabajador {
  readonly nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  trabajar(): string {
    return `${this.nombre} trabaja`;
  }
  comer(): string {
    return `${this.nombre} almuerza`;
  }
  cobrarSueldo(): number {
    return 500000;
  }
}

class Robot implements Trabajador {
  readonly modelo: string;
  constructor(modelo: string) {
    this.modelo = modelo;
  }
  trabajar(): string {
    return `${this.modelo} ensambla piezas`;
  }
  comer(): string {
    throw new Error("Un robot no come");
  }
  cobrarSueldo(): number {
    throw new Error("Un robot no cobra sueldo");
  }
}

// Bloque de prueba
const planta: Trabajador[] = [new Empleado("Ana"), new Robot("R2-D2")];
for (const t of planta) {
  console.log(t.trabajar());
}
console.log(new Empleado("Ana").comer());
console.log(`Sueldos: $${new Empleado("Ana").cobrarSueldo()}`);
