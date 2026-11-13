// EJERCICIO M1 · SRP + DIP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL (funciona, mal diseñado). Refactorizalo sin cambiar la salida.

class NotificadorWhatsapp {
  enviar(telefono: string, texto: string): void {
    console.log(`[WhatsApp ${telefono}] ${texto}`);
  }
}

interface Alumno {
  dni: string;
  nombre: string;
  telefono: string;
}

class ServicioInscripcion {
  private inscriptos: Alumno[] = [];
  private notificador = new NotificadorWhatsapp();
  private readonly cupo = 2;

  inscribir(alumno: Alumno, curso: string): void {
    if (!/^\d{7,8}$/.test(alumno.dni)) {
      throw new Error(`DNI inválido: ${alumno.dni}`);
    }
    if (alumno.nombre.trim() === "") {
      throw new Error("El nombre es obligatorio");
    }
    if (this.inscriptos.length >= this.cupo) {
      throw new Error(`Sin cupo en ${curso}`);
    }
    if (this.inscriptos.some((a) => a.dni === alumno.dni)) {
      throw new Error(`${alumno.nombre} ya está inscripto`);
    }
    this.inscriptos.push(alumno);
    this.notificador.enviar(alumno.telefono, `Hola ${alumno.nombre}, quedaste inscripto en ${curso}`);
    console.log(`[LOG] inscripción ${alumno.dni} en ${curso}`);
  }

  cantidad(): number {
    return this.inscriptos.length;
  }
}

// Bloque de prueba
const servicio = new ServicioInscripcion();
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
