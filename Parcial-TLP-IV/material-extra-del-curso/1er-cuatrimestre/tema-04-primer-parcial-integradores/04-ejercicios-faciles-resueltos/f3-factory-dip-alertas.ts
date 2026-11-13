// RESOLUCIÓN F3 · Factory + DIP: servicio de alertas configurable

// 📌 [DIP ✓] DIP: ServicioAlertas depende de esta interfaz, no de un canal concreto
interface Notificador {
  enviar(destino: string, mensaje: string): string;
}

class NotificadorEmail implements Notificador {
  enviar(destino: string, mensaje: string): string {
    return `EMAIL → ${destino}: ${mensaje}`;
  }
}

class NotificadorSms implements Notificador {
  enviar(destino: string, mensaje: string): string {
    return `SMS → ${destino}: ${mensaje.substring(0, 30)}`;
  }
}

class NotificadorSlack implements Notificador {
  enviar(destino: string, mensaje: string): string {
    return `SLACK #${destino}: ${mensaje}`;
  }
}

type TipoCanal = "email" | "sms" | "slack";

// 📌 [FACTORY] Traduce una configuración (texto) a un objeto concreto. Único lugar con estos new
class FabricaNotificadores {
  static crear(tipo: TipoCanal): Notificador {
    switch (tipo) {
      case "email":
        return new NotificadorEmail();
      case "sms":
        return new NotificadorSms();
      case "slack":
        return new NotificadorSlack();
    }
  }
}

class ServicioAlertas {
  private notificador: Notificador;
  private enviadas: number;

  // 📌 [DIP ✓ INYECCIÓN POR CONSTRUCTOR] No sabe si recibe email, sms o slack
  constructor(notificador: Notificador) {
    this.notificador = notificador;
    this.enviadas = 0;
  }

  alertar(destino: string, nivel: "info" | "critico", mensaje: string): string {
    this.enviadas++;
    const prefijo = nivel === "critico" ? "URGENTE: " : "";
    return this.notificador.enviar(destino, `${prefijo}${mensaje}`);
  }

  get cantidadEnviadas(): number {
    return this.enviadas;
  }
}

// Bloque de prueba
// 📌 [COMPOSITION ROOT + FACTORY] La "configuración" decide el canal; el servicio no cambia
const configuracion: { canal: TipoCanal; destino: string }[] = [
  { canal: "email", destino: "ops@empresa.com" },
  { canal: "sms", destino: "3815550000" },
  { canal: "slack", destino: "guardia" },
];
for (const c of configuracion) {
  const servicio = new ServicioAlertas(FabricaNotificadores.crear(c.canal));
  console.log(servicio.alertar(c.destino, "critico", "Servidor caído en producción"));
}
const info = new ServicioAlertas(FabricaNotificadores.crear("email"));
info.alertar("a@b.com", "info", "uno");
console.log(info.alertar("a@b.com", "info", "dos"));
console.log(`Enviadas: ${info.cantidadEnviadas}`);
