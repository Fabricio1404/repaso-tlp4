// EJERCICIO D1 · Turnos médicos — los 5 principios — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona, pero viola los cinco principios SOLID.

class SmsService {
  enviar(telefono: string, mensaje: string): void {
    console.log(`[SMS ${telefono}] ${mensaje}`);
  }
}

interface Profesional {
  nombre: string;
  atenderPresencial(paciente: string): string;
  atenderVirtual(paciente: string): string;
  firmarReceta(paciente: string, medicamento: string): string;
}

class Medico implements Profesional {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  atenderPresencial(paciente: string): string {
    return `Dr/a. ${this.nombre} atiende a ${paciente} en persona`;
  }
  atenderVirtual(paciente: string): string {
    return `Dr/a. ${this.nombre} atiende a ${paciente} por videollamada`;
  }
  firmarReceta(paciente: string, medicamento: string): string {
    return `Receta de ${medicamento} para ${paciente}, firma ${this.nombre}`;
  }
}

class Enfermero implements Profesional {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  atenderPresencial(paciente: string): string {
    return `Enf. ${this.nombre} atiende a ${paciente} en persona`;
  }
  atenderVirtual(_paciente: string): string {
    throw new Error(`${this.nombre} no hace atención virtual`);
  }
  firmarReceta(_paciente: string, _medicamento: string): string {
    throw new Error(`${this.nombre} no puede firmar recetas`);
  }
}

class TurnoPresencial {
  paciente: string;
  profesional: Profesional;
  hora: number;
  constructor(paciente: string, profesional: Profesional, hora: number) {
    this.paciente = paciente;
    this.profesional = profesional;
    this.hora = hora;
  }
  asignarConsultorio(): string {
    return `Consultorio ${(this.hora % 5) + 1}`;
  }
  atender(): string {
    return this.profesional.atenderPresencial(this.paciente);
  }
}

class TurnoVirtual extends TurnoPresencial {
  override asignarConsultorio(): string {
    throw new Error("Un turno virtual no tiene consultorio");
  }
  override atender(): string {
    return this.profesional.atenderVirtual(this.paciente);
  }
}

class SistemaTurnos {
  private turnos: TurnoPresencial[] = [];
  private sms = new SmsService();

  reservar(turno: TurnoPresencial, obraSocial: string, telefono: string): number {
    if (turno.hora < 8 || turno.hora > 19) {
      throw new Error(`Horario fuera de atención: ${turno.hora}h`);
    }
    if (this.turnos.some((t) => t.profesional === turno.profesional && t.hora === turno.hora)) {
      throw new Error(`${turno.profesional.nombre} ya tiene un turno a las ${turno.hora}h`);
    }
    let precio = 0;
    switch (obraSocial) {
      case "particular":
        precio = 20000;
        break;
      case "osde":
        precio = 5000;
        break;
      case "pami":
        precio = 0;
        break;
      default:
        throw new Error(`Obra social desconocida: ${obraSocial}`);
    }
    this.turnos.push(turno);
    this.sms.enviar(telefono, `Turno ${turno.hora}h con ${turno.profesional.nombre}. Abona $${precio}`);
    console.log(`[LOG] reserva ${turno.paciente} ${turno.hora}h`);
    return precio;
  }

  agenda(): string[] {
    return this.turnos.map((t) => {
      const lugar = t instanceof TurnoVirtual ? "virtual" : t.asignarConsultorio();
      return `${t.hora}h ${t.paciente} con ${t.profesional.nombre} (${lugar})`;
    });
  }

  atenderTodos(): void {
    for (const t of this.turnos) {
      try {
        console.log(t.atender());
      } catch (e) {
        if (e instanceof Error) console.log(`ERROR: ${e.message}`);
      }
    }
  }
}

// Bloque de prueba
const sistema = new SistemaTurnos();
const garcia = new Medico("García");
const lopez = new Enfermero("López");

sistema.reservar(new TurnoPresencial("Ana", garcia, 9), "osde", "381-111");
sistema.reservar(new TurnoVirtual("Beto", garcia, 10), "particular", "381-222");
sistema.reservar(new TurnoPresencial("Caro", lopez, 9), "pami", "381-333");
sistema.reservar(new TurnoVirtual("Dani", lopez, 11), "pami", "381-444");
for (const intento of [
  () => sistema.reservar(new TurnoPresencial("Eva", garcia, 9), "osde", "381-555"),
  () => sistema.reservar(new TurnoPresencial("Fede", garcia, 22), "osde", "381-666"),
  () => sistema.reservar(new TurnoPresencial("Gabi", garcia, 15), "galeno", "381-777"),
]) {
  try {
    intento();
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
}
console.log(sistema.agenda());
sistema.atenderTodos();
console.log(garcia.firmarReceta("Ana", "Ibuprofeno"));
