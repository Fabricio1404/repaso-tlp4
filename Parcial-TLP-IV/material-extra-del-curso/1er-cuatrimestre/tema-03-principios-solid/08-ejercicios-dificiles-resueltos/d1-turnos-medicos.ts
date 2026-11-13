// RESOLUCIÓN D1 · Turnos médicos — los 5 principios

// ============================== ISP ==========================================
// 📌 [ISP ✓ INTERFACES CHICAS] ISP: cada profesional implementa solo las capacidades que tiene
interface AtencionPresencial {
  readonly nombre: string;
  atenderPresencial(paciente: string): string;
}

interface AtencionVirtual {
  readonly nombre: string;
  atenderVirtual(paciente: string): string;
}

interface Prescriptor {
  firmarReceta(paciente: string, medicamento: string): string;
}

class Medico implements AtencionPresencial, AtencionVirtual, Prescriptor {
  readonly nombre: string;
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

// 📌 [ISP ✓ SIN THROW] El enfermero ya no está obligado a implementar atención virtual ni recetas
class Enfermero implements AtencionPresencial {
  readonly nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  atenderPresencial(paciente: string): string {
    return `Enf. ${this.nombre} atiende a ${paciente} en persona`;
  }
}

// ============================== LSP ==========================================
// 📌 [LSP ✓ CONTRATO COMÚN] LSP: los dos turnos cumplen este contrato de verdad; ninguno hereda del otro
interface Turno {
  readonly paciente: string;
  readonly hora: number;
  readonly profesional: string;
  ubicacion(): string;
  atender(): string;
}

class TurnoPresencial implements Turno {
  readonly paciente: string;
  readonly hora: number;
  private atiende: AtencionPresencial;

  constructor(paciente: string, atiende: AtencionPresencial, hora: number) {
    this.paciente = paciente;
    this.atiende = atiende;
    this.hora = hora;
  }

  get profesional(): string {
    return this.atiende.nombre;
  }

  ubicacion(): string {
    return `Consultorio ${(this.hora % 5) + 1}`;
  }

  atender(): string {
    return this.atiende.atenderPresencial(this.paciente);
  }
}

// 📌 [LSP + ISP ✓ TIPO PRECISO] Un turno virtual EXIGE un profesional con AtencionVirtual: con un enfermero no compila
class TurnoVirtual implements Turno {
  readonly paciente: string;
  readonly hora: number;
  private atiende: AtencionVirtual;

  constructor(paciente: string, atiende: AtencionVirtual, hora: number) {
    this.paciente = paciente;
    this.atiende = atiende;
    this.hora = hora;
  }

  get profesional(): string {
    return this.atiende.nombre;
  }

  // 📌 [LSP ✓ NO LANZA] Responde algo válido en vez de explotar
  ubicacion(): string {
    return "virtual";
  }

  atender(): string {
    return this.atiende.atenderVirtual(this.paciente);
  }
}

// ============================== OCP ==========================================
// 📌 [OCP ✓ ABSTRACCIÓN] OCP: se agregan obras sociales sin modificar SistemaTurnos
interface ObraSocial {
  precioConsulta(): number;
}

class Particular implements ObraSocial {
  precioConsulta(): number {
    return 20000;
  }
}

class Osde implements ObraSocial {
  precioConsulta(): number {
    return 5000;
  }
}

class Pami implements ObraSocial {
  precioConsulta(): number {
    return 0;
  }
}

// ============================== DIP ==========================================
// 📌 [DIP ✓ ABSTRACCIÓN] DIP: el sistema depende de estas interfaces, no de SmsService ni de console.log
interface Notificador {
  enviar(destino: string, mensaje: string): void;
}

interface Registro {
  escribir(linea: string): void;
}

class SmsService implements Notificador {
  enviar(telefono: string, mensaje: string): void {
    console.log(`[SMS ${telefono}] ${mensaje}`);
  }
}

class RegistroConsola implements Registro {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

// ============================== SRP ==========================================
// 📌 [SRP ✓ REGLA DE HORARIO] Cambia solo si cambia el horario de atención
class ValidadorHorario {
  private desde: number;
  private hasta: number;

  constructor(desde: number, hasta: number) {
    this.desde = desde;
    this.hasta = hasta;
  }

  validar(hora: number): void {
    if (hora < this.desde || hora > this.hasta) {
      throw new Error(`Horario fuera de atención: ${hora}h`);
    }
  }
}

// 📌 [SRP ✓ ALMACENAMIENTO] Cambia solo si cambia dónde se guardan los turnos
class AgendaRepositorio {
  private turnos: Turno[];

  constructor() {
    this.turnos = [];
  }

  guardar(turno: Turno): void {
    this.turnos.push(turno);
  }

  ocupado(profesional: string, hora: number): boolean {
    return this.turnos.some((t) => t.profesional === profesional && t.hora === hora);
  }

  listar(): Turno[] {
    return [...this.turnos];
  }
}

// 📌 [SRP ✓ COORDINADOR] Orquesta el proceso; no valida horarios, no guarda, no notifica ni loguea por sí mismo
class SistemaTurnos {
  private validador: ValidadorHorario;
  private agendaRepo: AgendaRepositorio;
  private notificador: Notificador;
  private registro: Registro;

  // 📌 [DIP ✓ INYECCIÓN POR CONSTRUCTOR] Antes: private sms = new SmsService()
  constructor(validador: ValidadorHorario, agendaRepo: AgendaRepositorio, notificador: Notificador, registro: Registro) {
    this.validador = validador;
    this.agendaRepo = agendaRepo;
    this.notificador = notificador;
    this.registro = registro;
  }

  reservar(turno: Turno, obraSocial: ObraSocial, telefono: string): number {
    this.validador.validar(turno.hora);
    if (this.agendaRepo.ocupado(turno.profesional, turno.hora)) {
      throw new Error(`${turno.profesional} ya tiene un turno a las ${turno.hora}h`);
    }
    // 📌 [OCP ✓ SIN SWITCH] Cada obra social sabe su precio
    const precio = obraSocial.precioConsulta();
    this.agendaRepo.guardar(turno);
    this.notificador.enviar(telefono, `Turno ${turno.hora}h con ${turno.profesional}. Abona $${precio}`);
    this.registro.escribir(`reserva ${turno.paciente} ${turno.hora}h`);
    return precio;
  }

  // 📌 [LSP ✓ SIN INSTANCEOF] Cada turno informa su ubicación
  agenda(): string[] {
    return this.agendaRepo.listar().map((t) => `${t.hora}h ${t.paciente} con ${t.profesional} (${t.ubicacion()})`);
  }

  // 📌 [LSP ✓ SIN TRY/CATCH] Ningún turno puede fallar al atender: ya no hace falta defenderse
  atenderTodos(): void {
    for (const t of this.agendaRepo.listar()) {
      console.log(t.atender());
    }
  }
}

// Bloque de prueba
// 📌 [COMPOSITION ROOT]
const sistema = new SistemaTurnos(new ValidadorHorario(8, 19), new AgendaRepositorio(), new SmsService(), new RegistroConsola());
const garcia = new Medico("García");
const lopez = new Enfermero("López");

sistema.reservar(new TurnoPresencial("Ana", garcia, 9), new Osde(), "381-111");
sistema.reservar(new TurnoVirtual("Beto", garcia, 10), new Particular(), "381-222");
sistema.reservar(new TurnoPresencial("Caro", lopez, 9), new Pami(), "381-333");
// sistema.reservar(new TurnoVirtual("Dani", lopez, 11), new Pami(), "381-444");  ❌ ya no compila (ISP + LSP)
for (const intento of [
  () => sistema.reservar(new TurnoPresencial("Eva", garcia, 9), new Osde(), "381-555"),
  () => sistema.reservar(new TurnoPresencial("Fede", garcia, 22), new Osde(), "381-666"),
  // () => sistema.reservar(..., "galeno", ...)  ❌ ya no existe: una obra social es una clase, no un texto
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
// lopez.firmarReceta(...) ❌ no compila: el enfermero no es Prescriptor
