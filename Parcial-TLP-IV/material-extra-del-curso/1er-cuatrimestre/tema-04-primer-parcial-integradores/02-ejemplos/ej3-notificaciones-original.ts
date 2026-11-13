// PRIMER PARCIAL · TEMA B · EJERCICIO 3 · Código ORIGINAL (reconstruido a partir de la consigna)
// Este es el código que se commitea con "chore(ej3): código original" ANTES de refactorizar.

class ArchivoLog {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

class ServicioNotificaciones {
  notificar(canal: string, mensaje: string): void {
    let costo = 0;
    // 📌 [OCP ✗ VIOLACIÓN] "un if (canal === "sms") que crece con cada canal": cada canal nuevo obliga a modificar este método
    if (canal === "sms") {
      costo = 15;
    } else if (canal === "email") {
      costo = 0;
    }
    // 📌 [DIP ✗ VIOLACIÓN] "crea un ArchivoLog con new dentro del método": no se puede cambiar a base de datos sin tocar el servicio
    const log = new ArchivoLog();
    const nombre = canal === "sms" ? "SMS" : "Email";
    log.escribir(`${nombre}: "${mensaje}" ($${costo})`);
  }
}

// Bloque de prueba
const servicio = new ServicioNotificaciones();
servicio.notificar("email", "Hola");
servicio.notificar("sms", "Hola");
// [LOG] Email: "Hola" ($0)
// [LOG] SMS: "Hola" ($15)
