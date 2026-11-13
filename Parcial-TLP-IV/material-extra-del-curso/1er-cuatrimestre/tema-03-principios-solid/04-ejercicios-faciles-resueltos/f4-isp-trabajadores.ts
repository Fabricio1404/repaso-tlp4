// RESOLUCIÓN F4 · ISP

// 📌 [ISP ✓ INTERFACES CHICAS] ISP: cada clase implementa solo las capacidades que tiene
interface Trabajador {
  trabajar(): string;
}

interface Comensal {
  comer(): string;
}

interface Asalariado {
  cobrarSueldo(): number;
}

// 📌 [ISP ✓ VARIAS INTERFACES] El empleado tiene las tres capacidades
class Empleado implements Trabajador, Comensal, Asalariado {
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

// 📌 [ISP ✓ SIN MÉTODOS QUE LANCEN ERROR] El robot solo trabaja
class Robot implements Trabajador {
  readonly modelo: string;
  constructor(modelo: string) {
    this.modelo = modelo;
  }
  trabajar(): string {
    return `${this.modelo} ensambla piezas`;
  }
}

// Bloque de prueba
const planta: Trabajador[] = [new Empleado("Ana"), new Robot("R2-D2")];
for (const t of planta) {
  console.log(t.trabajar());
}
console.log(new Empleado("Ana").comer());
console.log(`Sueldos: $${new Empleado("Ana").cobrarSueldo()}`);
// const r: Asalariado = new Robot("X"); ❌ no compila: el robot no promete cobrar sueldo
