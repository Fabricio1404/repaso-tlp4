// Simulacro primer parcial · Tema D · Ejercicio 3 · Recordatorios (OCP + DIP) — SOLUCIÓN

// DIP: ServicioRecordatorios depende de esta abstracción y no de AgendaArchivo,
// así se puede cambiar el almacenamiento (o usar uno falso en pruebas) sin modificar el servicio.
interface Agenda {
  registrar(texto: string): void;
}

// OCP: cada canal nuevo se agrega con una clase que implementa CanalRecordatorio,
// sin modificar ServicioRecordatorios.
interface CanalRecordatorio {
  enviar(dueno: string, mascota: string): void;
}

class AgendaArchivo implements Agenda {
  registrar(texto: string): void {
    console.log(`[agenda] ${texto}`);
  }
}

class CanalEmail implements CanalRecordatorio {
  enviar(dueno: string, mascota: string): void {
    console.log(`Email a ${dueno}: ${mascota} tiene vacuna pendiente`);
  }
}

class CanalSms implements CanalRecordatorio {
  enviar(dueno: string, mascota: string): void {
    console.log(`SMS a ${dueno}: vacuna de ${mascota}`);
  }
}

class CanalLlamada implements CanalRecordatorio {
  enviar(dueno: string, mascota: string): void {
    console.log(`Llamando a ${dueno} por ${mascota}...`);
  }
}

class ServicioRecordatorios {
  private agenda: Agenda;

  constructor(agenda: Agenda) {
    this.agenda = agenda;
  }

  recordar(dueno: string, mascota: string, canal: CanalRecordatorio): void {
    this.agenda.registrar(`recordatorio para ${mascota}`);
    canal.enviar(dueno, mascota);
  }
}

// ---------------- Bloque de prueba ----------------
const servicio = new ServicioRecordatorios(new AgendaArchivo());
servicio.recordar("Ana", "Firulais", new CanalEmail());
servicio.recordar("Beto", "Michi", new CanalSms());
servicio.recordar("Caro", "Pepe", new CanalLlamada());
