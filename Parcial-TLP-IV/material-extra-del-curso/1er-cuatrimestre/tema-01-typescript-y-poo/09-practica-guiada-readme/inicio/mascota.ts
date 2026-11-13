// INICIO · mascota.ts — código heredado de otro programador (tiene defectos, ver README)

export type Especie = "Perro" | "Gato";

export interface Consulta {
  fecha: string;
  motivo: string;
  costo: number;
}

export abstract class Mascota {
  private static proximoId: number = 1;
  readonly id: number;
  readonly nombre: string;
  edad: number;
  historial: Consulta[];

  constructor(nombre: string, edad: number) {
    this.id = Mascota.proximoId;
    Mascota.proximoId++;
    this.nombre = nombre;
    this.edad = edad;
    this.historial = [];
  }

  abstract especie(): Especie;

  registrarConsulta(fecha: string, motivo: string, costo: number): Consulta {
    const consulta: Consulta = { fecha: fecha, motivo: motivo, costo: costo };
    this.historial.push(consulta);
    return consulta;
  }

  obtenerHistorial(): Consulta[] {
    return this.historial;
  }

  describir(): string {
    return `#${this.id} ${this.especie()} ${this.nombre} (${this.edad} años)`;
  }
}

export class Perro extends Mascota {
  especie(): Especie {
    return "Perro";
  }
}

export class Gato extends Mascota {
  especie(): Especie {
    return "Gato";
  }
}
