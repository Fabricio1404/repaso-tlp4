// SOLUCIÓN · mascota.ts

// 📌 [UNIÓN DE LITERALES] En lugar de enum
export type Especie = "Perro" | "Gato" | "Conejo";

// 📌 [INTERFACE CON READONLY] Una consulta registrada no se puede alterar
export interface Consulta {
  readonly fecha: string;
  readonly motivo: string;
  readonly costo: number;
}

// 📌 [CLASE ABSTRACTA] No existe una "mascota genérica"; cada especie completa lo que falta
export abstract class Mascota {
  private static proximoId: number = 1;
  readonly id: number;
  readonly nombre: string;
  // 📌 [ENCAPSULAMIENTO] (DEFECTO 2 CORREGIDO) La edad era pública y sin validar
  private _edad: number;
  // 📌 [ENCAPSULAMIENTO] (DEFECTO 1 CORREGIDO) El historial era público
  private historial: Consulta[];

  constructor(nombre: string, edad: number) {
    this.id = Mascota.proximoId;
    Mascota.proximoId++;
    this.nombre = nombre;
    this._edad = 0;
    this.edad = edad;
    this.historial = [];
  }

  get edad(): number {
    return this._edad;
  }

  // 📌 [SETTER CON REGLA] Valida también al crear, porque el constructor usa this.edad
  set edad(valor: number) {
    if (!Number.isInteger(valor) || valor < 0 || valor > 30) {
      throw new Error("Edad inválida");
    }
    this._edad = valor;
  }

  abstract especie(): Especie;
  abstract costoBaseConsulta(): number;

  // 📌 [POLIMORFISMO] (DEFECTO 3 CORREGIDO) El costo lo calcula la mascota, no la veterinaria con instanceof
  calcularCosto(): number {
    const base = this.costoBaseConsulta();
    return this._edad >= 10 ? base * 1.2 : base;
  }

  registrarConsulta(fecha: string, motivo: string): Consulta {
    const consulta: Consulta = { fecha: fecha, motivo: motivo, costo: this.calcularCosto() };
    this.historial.push(consulta);
    return consulta;
  }

  // 📌 [COPIA DEFENSIVA] (DEFECTO 1 CORREGIDO) Antes devolvía this.historial
  obtenerHistorial(): Consulta[] {
    return [...this.historial];
  }

  describir(): string {
    return `#${this.id} ${this.especie()} ${this.nombre} (${this._edad} años)`;
  }
}

export class Perro extends Mascota {
  especie(): Especie {
    return "Perro";
  }
  costoBaseConsulta(): number {
    return 8000;
  }
}

export class Gato extends Mascota {
  especie(): Especie {
    return "Gato";
  }
  costoBaseConsulta(): number {
    return 7000;
  }
}

// 📌 [OCP / EXTENSIÓN] Especie nueva: una clase nueva, Veterinaria no se toca
export class Conejo extends Mascota {
  especie(): Especie {
    return "Conejo";
  }
  costoBaseConsulta(): number {
    return 6000;
  }
}
