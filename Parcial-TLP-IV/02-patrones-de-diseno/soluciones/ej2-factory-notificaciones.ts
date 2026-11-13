// Ejercicio 2 · Factory Method: notificadores

// El "producto": la interface común que conoce el cliente
interface Notificador {
  enviar(destino: string, mensaje: string): string;
}

// Productos concretos
class NotificadorEmail implements Notificador {
  enviar(destino: string, mensaje: string): string {
    return `📧 Email a ${destino}: ${mensaje}`;
  }
}

class NotificadorSMS implements Notificador {
  enviar(destino: string, mensaje: string): string {
    // Regla propia del SMS: máximo 20 caracteres
    const recortado = mensaje.length > 20 ? mensaje.slice(0, 20) + "..." : mensaje;
    return `📱 SMS a ${destino}: ${recortado}`;
  }
}

class NotificadorWhatsApp implements Notificador {
  enviar(destino: string, mensaje: string): string {
    return `💬 WhatsApp a ${destino}: ${mensaje}`;
  }
}

type Canal = "email" | "sms" | "whatsapp";

// La fábrica: ÚNICO lugar donde se hace new de las clases concretas
class FabricaNotificadores {
  static crear(canal: Canal): Notificador {   // devuelve la INTERFACE
    switch (canal) {
      case "email":
        return new NotificadorEmail();
      case "sms":
        return new NotificadorSMS();
      case "whatsapp":
        return new NotificadorWhatsApp();
    }
  }
}

// El cliente: no conoce ninguna clase concreta, solo la interface y la fábrica
function avisarATodos(canales: Canal[], destino: string, mensaje: string): void {
  for (const canal of canales) {
    const notificador = FabricaNotificadores.crear(canal);
    console.log(notificador.enviar(destino, mensaje));
  }
}

// ---------------- Bloque de prueba ----------------
avisarATodos(["email", "sms", "whatsapp"], "Ana", "Tu pedido fue despachado hoy");
