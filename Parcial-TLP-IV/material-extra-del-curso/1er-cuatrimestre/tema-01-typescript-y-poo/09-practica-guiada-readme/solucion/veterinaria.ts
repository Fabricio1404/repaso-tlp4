// SOLUCIÓN · veterinaria.ts

// 📌 [IMPORT TYPE] Mascota y Especie solo se usan como TIPOS acá: con Node hay que importarlos con "import type"
import type { Especie, Mascota } from "./mascota.ts";

export class Veterinaria {
  // 📌 [STATIC PRIVADO] (DEFECTO 4 CORREGIDO) Antes era public: cualquiera podía hacer Veterinaria.totalAtenciones = 0
  private static atenciones: number = 0;
  readonly nombre: string;
  private pacientes: Mascota[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.pacientes = [];
  }

  static totalAtenciones(): number {
    return Veterinaria.atenciones;
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
    // 📌 [POLIMORFISMO] Sin if (m instanceof Perro): cada mascota sabe su costo
    const consulta = mascota.registrarConsulta(fecha, motivo);
    Veterinaria.atenciones++;
    return consulta.costo;
  }

  // 📌 [TODO 1 RESUELTO] Suma los costos de todas las consultas de todos los pacientes
  facturacion(): number {
    let total = 0;
    for (const m of this.pacientes) {
      for (const c of m.obtenerHistorial()) {
        total += c.costo;
      }
    }
    return total;
  }

  // 📌 [TODO 2 RESUELTO] filter devuelve un arreglo nuevo (copia)
  pacientesPorEspecie(especie: Especie): Mascota[] {
    return this.pacientes.filter((m) => m.especie() === especie);
  }

  listar(): string[] {
    return this.pacientes.map((m) => m.describir());
  }
}
