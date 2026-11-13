// Ejercicio 5 · OCP + DIP · Turnos médicos (RESUELTO)

export {};

// DIP: ServicioTurnos depende de esta abstracción y no de RegistroTurnosArchivo;
// así se puede cambiar a una base de datos o a un repositorio falso en los tests.
interface RepositorioTurnos {
  guardar(paciente: string, fecha: string): void;
}

// OCP: cada canal nuevo se agrega con una clase que implementa CanalAviso,
// sin modificar ServicioTurnos.
interface CanalAviso {
  avisar(paciente: string, fecha: string): void;
}

class RegistroTurnosArchivo implements RepositorioTurnos {
  guardar(paciente: string, fecha: string): void {
    console.log(`[archivo] turno guardado: ${paciente} - ${fecha}`);
  }
}

class AvisoEmail implements CanalAviso {
  avisar(paciente: string, fecha: string): void {
    console.log(`[email] ${paciente}: tu turno es el ${fecha}`);
  }
}

class AvisoSms implements CanalAviso {
  avisar(_paciente: string, fecha: string): void {
    console.log(`[sms] Turno ${fecha} confirmado`);
  }
}

class AvisoWhatsapp implements CanalAviso {
  avisar(paciente: string, fecha: string): void {
    console.log(`[whatsapp] Hola ${paciente}! Turno: ${fecha}`);
  }
}

class ServicioTurnos {
  private repositorio: RepositorioTurnos;
  private canales: CanalAviso[];

  // Las dependencias se RECIBEN (inyección por constructor), no se crean adentro
  constructor(repositorio: RepositorioTurnos, canales: CanalAviso[]) {
    this.repositorio = repositorio;
    this.canales = canales;
  }

  reservar(paciente: string, fecha: string): void {
    this.repositorio.guardar(paciente, fecha);
    for (const canal of this.canales) {
      canal.avisar(paciente, fecha);   // polimorfismo: sin if por canal
    }
  }
}

// ---------------- Bloque de prueba (composition root) ----------------
const servicio = new ServicioTurnos(new RegistroTurnosArchivo(), [new AvisoEmail(), new AvisoWhatsapp()]);
servicio.reservar("Ana", "10/12 09:30");
servicio.reservar("Beto", "11/12 15:00");
