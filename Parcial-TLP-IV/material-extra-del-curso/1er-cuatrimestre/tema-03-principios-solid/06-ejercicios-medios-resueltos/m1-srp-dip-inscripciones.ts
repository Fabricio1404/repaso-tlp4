// RESOLUCIÓN M1 · SRP + DIP
// Motivos de cambio del original (5): reglas de validación de datos, forma de guardar,
// canal de notificación, forma de registrar logs y reglas del proceso (cupo/duplicados).

interface Alumno {
  dni: string;
  nombre: string;
  telefono: string;
}

// 📌 [SRP ✓ VALIDACIÓN DE DATOS] Cambia solo si cambian las reglas de formato del alumno
class ValidadorAlumno {
  validar(alumno: Alumno): void {
    if (!/^\d{7,8}$/.test(alumno.dni)) {
      throw new Error(`DNI inválido: ${alumno.dni}`);
    }
    if (alumno.nombre.trim() === "") {
      throw new Error("El nombre es obligatorio");
    }
  }
}

// 📌 [SRP ✓ ALMACENAMIENTO] Cambia solo si cambia dónde se guardan las inscripciones
class RepositorioInscripciones {
  private inscriptos: Alumno[];

  constructor() {
    this.inscriptos = [];
  }

  guardar(alumno: Alumno): void {
    this.inscriptos.push(alumno);
  }

  existe(dni: string): boolean {
    return this.inscriptos.some((a) => a.dni === dni);
  }

  cantidad(): number {
    return this.inscriptos.length;
  }
}

// 📌 [DIP ✓ ABSTRACCIÓN] DIP: el servicio depende de esta interfaz, no de WhatsApp ni de Email
interface Notificador {
  enviar(alumno: Alumno, texto: string): void;
}

class NotificadorWhatsapp implements Notificador {
  enviar(alumno: Alumno, texto: string): void {
    console.log(`[WhatsApp ${alumno.telefono}] ${texto}`);
  }
}

// 📌 [DIP ✓ NUEVA IMPLEMENTACIÓN] Se agregó sin tocar ServicioInscripcion
class NotificadorEmail implements Notificador {
  enviar(alumno: Alumno, texto: string): void {
    console.log(`[Email ${alumno.dni}@alumnos.edu] ${texto}`);
  }
}

// 📌 [DIP ✓ ABSTRACCIÓN] DIP: el log se puede cambiar (archivo, base) sin tocar el servicio
interface Registro {
  escribir(linea: string): void;
}

class RegistroConsola implements Registro {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

// 📌 [SRP ✓ COORDINADOR] Solo contiene las reglas del PROCESO (cupo y duplicados) y delega el resto
class ServicioInscripcion {
  private validador: ValidadorAlumno;
  private repositorio: RepositorioInscripciones;
  private notificador: Notificador;
  private registro: Registro;
  private readonly cupo: number;

  // 📌 [DIP ✓ INYECCIÓN POR CONSTRUCTOR] Todas las dependencias (y el cupo) vienen de afuera
  constructor(
    validador: ValidadorAlumno,
    repositorio: RepositorioInscripciones,
    notificador: Notificador,
    registro: Registro,
    cupo: number,
  ) {
    this.validador = validador;
    this.repositorio = repositorio;
    this.notificador = notificador;
    this.registro = registro;
    this.cupo = cupo;
  }

  // 📌 [MISMO ORDEN QUE EL ORIGINAL] validar → cupo → duplicado → guardar → notificar → log (la salida no cambia)
  inscribir(alumno: Alumno, curso: string): void {
    this.validador.validar(alumno);
    if (this.repositorio.cantidad() >= this.cupo) {
      throw new Error(`Sin cupo en ${curso}`);
    }
    if (this.repositorio.existe(alumno.dni)) {
      throw new Error(`${alumno.nombre} ya está inscripto`);
    }
    this.repositorio.guardar(alumno);
    this.notificador.enviar(alumno, `Hola ${alumno.nombre}, quedaste inscripto en ${curso}`);
    this.registro.escribir(`inscripción ${alumno.dni} en ${curso}`);
  }

  cantidad(): number {
    return this.repositorio.cantidad();
  }
}

// Bloque de prueba
// 📌 [COMPOSITION ROOT] Todos los new, acá
const servicio = new ServicioInscripcion(
  new ValidadorAlumno(),
  new RepositorioInscripciones(),
  new NotificadorWhatsapp(),
  new RegistroConsola(),
  2,
);
servicio.inscribir({ dni: "30111222", nombre: "Ana", telefono: "381111" }, "TLP IV");
for (const a of [
  { dni: "12", nombre: "X", telefono: "0" },
  { dni: "30111222", nombre: "Ana", telefono: "381111" },
]) {
  try {
    servicio.inscribir(a, "TLP IV");
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
}
servicio.inscribir({ dni: "30333444", nombre: "Beto", telefono: "381222" }, "TLP IV");
try {
  servicio.inscribir({ dni: "30555666", nombre: "Caro", telefono: "381333" }, "TLP IV");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(`Inscriptos: ${servicio.cantidad()}`);

const servicioEmail = new ServicioInscripcion(
  new ValidadorAlumno(),
  new RepositorioInscripciones(),
  new NotificadorEmail(),
  new RegistroConsola(),
  30,
);
servicioEmail.inscribir({ dni: "40111222", nombre: "Dani", telefono: "381444" }, "TLP IV");
