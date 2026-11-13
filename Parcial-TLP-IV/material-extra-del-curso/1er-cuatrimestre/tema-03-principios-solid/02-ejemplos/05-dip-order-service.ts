// ============================================================================
// EJEMPLO 5 · DIP — OrderService (guía de la cátedra)
// Consigna: OrderService crea un EmailSender con new, así que no puede cambiar a SMS
// ni probarse sin enviar un correo real. Definir la interfaz Notifier y recibirla por
// el constructor.
// ============================================================================

// ------------------------------- ANTES -------------------------------------
class EmailSenderOriginal {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

class OrderServiceOriginal {
  // 📌 [DIP ✗ VIOLACIÓN] new de una clase CONCRETA dentro de otra clase: OrderService queda atado al email para siempre
  private emailSender: EmailSenderOriginal = new EmailSenderOriginal();

  createOrder(customer: string): void {
    console.log("Pedido creado");
    this.emailSender.send(customer, "Tu pedido fue creado");
  }
}

// ------------------------------- DESPUÉS -----------------------------------
// 📌 [DIP ✓ ABSTRACCIÓN] El contrato común que pueden cumplir el correo y el SMS
interface Notifier {
  send(to: string, message: string): void;
}

// 📌 [DIP ✓ DETALLES QUE DEPENDEN DE LA ABSTRACCIÓN] Los módulos de bajo nivel implementan la interfaz
class EmailSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`Correo para ${to}: ${message}`);
  }
}

class SmsSender implements Notifier {
  send(to: string, message: string): void {
    console.log(`SMS para ${to}: ${message}`);
  }
}

class OrderService {
  // 📌 [DIP ✓ DEPENDE DE LA INTERFAZ] El módulo de alto nivel no conoce EmailSender ni SmsSender
  private notifier: Notifier;

  // 📌 [INYECCIÓN POR CONSTRUCTOR] La dependencia viene desde afuera
  constructor(notifier: Notifier) {
    this.notifier = notifier;
  }

  createOrder(customer: string): void {
    console.log("Pedido creado");
    this.notifier.send(customer, "Tu pedido fue creado");
  }
}

// 📌 [DOBLE DE PRUEBA] Implementa Notifier y GUARDA los mensajes en vez de enviarlos: permite probar sin mandar correos reales
class NotifierFalso implements Notifier {
  readonly enviados: string[] = [];
  send(to: string, message: string): void {
    this.enviados.push(`${to} → ${message}`);
  }
}

// Bloque de prueba
new OrderServiceOriginal().createOrder("ana@example.com");

// 📌 [COMPOSITION ROOT] Acá (y solo acá) se decide qué implementación concreta usar
new OrderService(new EmailSender()).createOrder("ana@example.com");
new OrderService(new SmsSender()).createOrder("1155550000");

const falso = new NotifierFalso();
new OrderService(falso).createOrder("test@test.com");
console.log(falso.enviados); // [ 'test@test.com → Tu pedido fue creado' ]
console.log(falso.enviados.length === 1 ? "PRUEBA OK" : "PRUEBA FALLÓ"); // PRUEBA OK
