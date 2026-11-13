// INICIO · veterinaria.ts — código heredado (tiene defectos y TODOs, ver README)

import type { Especie, Mascota } from "./mascota.ts";
import { Gato, Perro } from "./mascota.ts";

export class Veterinaria {
  static totalAtenciones: number = 0;
  readonly nombre: string;
  private pacientes: Mascota[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.pacientes = [];
  }

  registrar(mascota: Mascota): void {
    const repetida = this.pacientes.some(
      (m) => m.nombre === mascota.nombre && m.especie() === mascota.especie(),
    );
    if (repetida) {
      throw new Error(`${mascota.nombre} ya es paciente`);
    }
    this.pacientes.push(mascota);
  }

  atender(id: number, fecha: string, motivo: string): number {
    const mascota = this.pacientes.find((m) => m.id === id);
    if (mascota === undefined) {
      throw new Error(`No existe el paciente #${id}`);
    }
    let costo = 0;
    if (mascota instanceof Perro) {
      costo = 8000;
    } else if (mascota instanceof Gato) {
      costo = 7000;
    }
    if (mascota.edad >= 10) {
      costo = costo * 1.2;
    }
    mascota.registrarConsulta(fecha, motivo, costo);
    Veterinaria.totalAtenciones++;
    return costo;
  }

  facturacion(): number {
    // TODO 1
    throw new Error("TODO 1: facturacion");
  }

  pacientesPorEspecie(especie: Especie): Mascota[] {
    // TODO 2
    throw new Error("TODO 2: pacientesPorEspecie");
  }

  listar(): string[] {
    return this.pacientes.map((m) => m.describir());
  }
}
