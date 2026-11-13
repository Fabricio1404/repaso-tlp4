// Simulacro primer parcial · Tema D · Ejercicio 3 · Recordatorios (CÓDIGO ORIGINAL A REFACTORIZAR)
// Hacé commit de este archivo TAL CUAL antes de modificarlo:  chore(ej3): código original

class AgendaArchivo {
  registrar(texto: string): void {
    console.log(`[agenda] ${texto}`);
  }
}

class ServicioRecordatorios {
  private agenda: AgendaArchivo;

  constructor() {
    this.agenda = new AgendaArchivo();
  }

  recordar(dueno: string, mascota: string, canal: string): void {
    this.agenda.registrar(`recordatorio para ${mascota}`);
    if (canal === "email") {
      console.log(`Email a ${dueno}: ${mascota} tiene vacuna pendiente`);
    } else if (canal === "sms") {
      console.log(`SMS a ${dueno}: vacuna de ${mascota}`);
    } else if (canal === "llamada") {
      console.log(`Llamando a ${dueno} por ${mascota}...`);
    } else {
      console.log("Canal desconocido");
    }
  }
}

// ---------------- Bloque de prueba ----------------
const servicio = new ServicioRecordatorios();
servicio.recordar("Ana", "Firulais", "email");
servicio.recordar("Beto", "Michi", "sms");
servicio.recordar("Caro", "Pepe", "llamada");
