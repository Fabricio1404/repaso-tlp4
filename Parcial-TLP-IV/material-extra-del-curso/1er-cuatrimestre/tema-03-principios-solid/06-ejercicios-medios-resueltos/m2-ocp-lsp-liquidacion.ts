// RESOLUCIÓN M2 · OCP + LSP

// 📌 [OCP ✓ CONTRATO COMÚN] OCP: tipos de empleado nuevos sin modificar Liquidador
interface Liquidable {
  readonly nombre: string;
  sueldo(): number;
}

// 📌 [LSP ✓ CAPACIDAD APARTE] LSP: solo promete un bono quien realmente lo cobra (ya nadie hereda un bono que "rompe")
interface ConBono {
  calcularBono(): number;
}

class EmpleadoPlanta implements Liquidable, ConBono {
  readonly nombre: string;
  private base: number;

  constructor(nombre: string, base: number) {
    this.nombre = nombre;
    this.base = base;
  }

  calcularBono(): number {
    return this.base * 0.1;
  }

  sueldo(): number {
    return this.base + this.calcularBono();
  }
}

class EmpleadoContratado implements Liquidable, ConBono {
  readonly nombre: string;
  private base: number;

  constructor(nombre: string, base: number) {
    this.nombre = nombre;
    this.base = base;
  }

  calcularBono(): number {
    return this.base * 0.1;
  }

  sueldo(): number {
    return this.base * 0.9 + this.calcularBono();
  }
}

// 📌 [LSP ✓ NO PROMETE LO QUE NO CUMPLE] El pasante no implementa ConBono: no hay método que lance error
class Pasante implements Liquidable {
  readonly nombre: string;
  private base: number;

  constructor(nombre: string, base: number) {
    this.nombre = nombre;
    this.base = base;
  }

  sueldo(): number {
    return this.base * 0.5;
  }
}

// 📌 [OCP ✓ EXTENSIÓN] Tipo nuevo agregado sin tocar Liquidador
class Consultor implements Liquidable {
  readonly nombre: string;
  private horas: number;
  private valorHora: number;

  constructor(nombre: string, horas: number, valorHora: number) {
    this.nombre = nombre;
    this.horas = horas;
    this.valorHora = valorHora;
  }

  sueldo(): number {
    return this.horas * this.valorHora;
  }
}

// 📌 [OCP ✓ SIN SWITCH NI IF] Cada empleado sabe calcular su sueldo
class Liquidador {
  liquidar(e: Liquidable): number {
    return e.sueldo();
  }
}

// Bloque de prueba
const liquidador = new Liquidador();
const nomina: Liquidable[] = [
  new EmpleadoPlanta("Ana", 1000000),
  new EmpleadoContratado("Beto", 800000),
  new Pasante("Caro", 400000),
];
let total = 0;
for (const e of nomina) {
  const s = liquidador.liquidar(e);
  total += s;
  console.log(`${e.nombre}: $${s}`);
}
console.log(`Total: $${total}`);
const dani = new Consultor("Dani", 20, 15000);
console.log(`${dani.nombre}: $${liquidador.liquidar(dani)}`);
