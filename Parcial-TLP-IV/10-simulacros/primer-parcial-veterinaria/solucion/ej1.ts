// Simulacro primer parcial · Tema D · Ejercicio 1 · Veterinaria (POO) — SOLUCIÓN

type Especie = "perro" | "gato" | "ave";

abstract class Paciente {
  static totalConsultas: number = 0;

  readonly nombre: string;
  protected edad: number;
  readonly especie: Especie;

  constructor(nombre: string, edad: number, especie: Especie) {
    if (edad < 0) throw new RangeError("La edad no puede ser negativa");
    this.nombre = nombre;
    this.edad = edad;
    this.especie = especie;
  }

  abstract costoBase(): number;

  // Polimorfismo dentro del padre: los mayores de 10 años pagan 20 % extra
  costoConsulta(): number {
    const base = this.costoBase();
    return this.edad > 10 ? base * 1.2 : base;
  }

  atender(): string {
    Paciente.totalConsultas++;
    return `Atendiendo a ${this.nombre} (${this.especie}, ${this.edad} años): $${this.costoConsulta()}`;
  }
}

class Perro extends Paciente {
  constructor(nombre: string, edad: number) {
    super(nombre, edad, "perro");
  }
  override costoBase(): number {
    return 15000;
  }
}

class Gato extends Paciente {
  constructor(nombre: string, edad: number) {
    super(nombre, edad, "gato");
  }
  override costoBase(): number {
    return 12000;
  }
}

class Ave extends Paciente {
  constructor(nombre: string, edad: number) {
    super(nombre, edad, "ave");
  }
  override costoBase(): number {
    return 8000;
  }
}

class Veterinaria {
  private pacientes: Paciente[];

  constructor() {
    this.pacientes = [];
  }

  registrar(p: Paciente): void {
    this.pacientes.push(p);
  }

  get cantidad(): number {
    return this.pacientes.length;
  }

  atenderTodos(): number {
    let total = 0;
    for (const p of this.pacientes) {
      console.log(p.atender());
      total += p.costoConsulta();
    }
    return total;
  }
}

// ---------------- Bloque de prueba ----------------
const vet = new Veterinaria();
vet.registrar(new Perro("Firulais", 3));
vet.registrar(new Gato("Michi", 12));
vet.registrar(new Ave("Pepe", 1));

console.log(`Pacientes registrados: ${vet.cantidad}`);
const recaudado = vet.atenderTodos();
console.log(`Total recaudado: $${recaudado}`);
console.log(`Consultas realizadas: ${Paciente.totalConsultas}`);
