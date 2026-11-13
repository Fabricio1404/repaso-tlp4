// ============================================================================
// EJEMPLO 2 · OCP — PaymentProcessor (guía de la cátedra)
// Consigna: cada medio de pago nuevo obliga a agregar un case al switch. Definir una
// interfaz PaymentMethod y una clase por medio de pago. PaymentProcessor delega sin switch.
// ============================================================================

// ------------------------------- ANTES -------------------------------------
class PaymentProcessorOriginal {
  pay(method: string, amount: number): void {
    // 📌 [OCP ✗ VIOLACIÓN] switch que CRECE con cada medio nuevo: hay que MODIFICAR una clase que ya funcionaba
    switch (method) {
      case "card":
        console.log(`Pagando $${amount} con tarjeta`);
        break;
      case "cash":
        console.log(`Pagando $${amount} en efectivo`);
        break;
      case "transfer":
        console.log(`Pagando $${amount} por transferencia`);
        break;
      default:
        // 📌 [OCP ✗ ERROR EN EJECUCIÓN] Un texto mal escrito ("crad") recién se detecta al ejecutar
        throw new Error(`Medio de pago desconocido: ${method}`);
    }
  }
}

// ------------------------------- DESPUÉS -----------------------------------
// 📌 [OCP ✓ ABSTRACCIÓN] El comportamiento que comparten todos los medios de pago se vuelve la interfaz
interface PaymentMethod {
  pay(amount: number): void;
}

// 📌 [OCP ✓ UNA CLASE POR OPCIÓN]
class CardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con tarjeta`);
  }
}

class CashPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} en efectivo`);
  }
}

class TransferPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} por transferencia`);
  }
}

// 📌 [OCP ✓ EXTENSIÓN] Medio NUEVO agregado después: es una clase nueva, PaymentProcessor NO se tocó
class CryptoPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando $${amount} con cripto`);
  }
}

// 📌 [OCP ✓ CERRADO A MODIFICACIÓN] Delega en el medio recibido. Nunca más hay que editarlo para agregar opciones
class PaymentProcessor {
  pay(method: PaymentMethod, amount: number): void {
    method.pay(amount);
  }
}

// Bloque de prueba
const original = new PaymentProcessorOriginal();
original.pay("card", 100);
original.pay("cash", 50);
original.pay("transfer", 200);

const processor = new PaymentProcessor();
processor.pay(new CardPayment(), 100);
processor.pay(new CashPayment(), 50);
processor.pay(new TransferPayment(), 200);
processor.pay(new CryptoPayment(), 999);
// Pagando $100 con tarjeta / Pagando $50 en efectivo / Pagando $200 por transferencia (dos veces)
// Pagando $999 con cripto
