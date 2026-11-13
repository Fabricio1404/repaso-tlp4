// ============================================================================
// EJEMPLO 2 · ENCAPSULAMIENTO (clase CuentaBancaria) — tomado de la guía
// Consigna: titular fijo, saldo privado con monto inicial, historial privado,
// depositar, retirar (con validaciones), consultarSaldo y obtenerHistorial
// sin exponer el arreglo interno.
// ============================================================================

class CuentaBancaria {
  // 📌 [READONLY] El titular se fija una vez (en el constructor) y después no se puede reasignar
  readonly titular: string;
  // 📌 [ENCAPSULAMIENTO] saldo es private: desde afuera NO se puede hacer cuenta.saldo = -999
  private saldo: number;
  // 📌 [ENCAPSULAMIENTO] El historial también es privado: solo esta clase lo modifica
  private historial: string[];

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.historial = [];
  }

  // 📌 [ENCAPSULAMIENTO] Único camino para AUMENTAR el saldo: valida antes de modificar
  depositar(monto: number): void {
    // 📌 [VALIDAR ANTES DE MODIFICAR] Si el monto es inválido, el objeto queda exactamente igual
    if (monto <= 0) {
      throw new Error("El monto a depositar debe ser mayor a 0");
    }
    this.saldo = this.saldo + monto;
    this.historial.push(`depósito: +${monto}`);
  }

  // 📌 [ENCAPSULAMIENTO] Único camino para DISMINUIR el saldo: dos validaciones antes de tocar nada
  retirar(monto: number): void {
    if (monto <= 0) {
      throw new Error("El monto a retirar debe ser mayor a 0");
    }
    if (monto > this.saldo) {
      throw new Error("Saldo insuficiente");
    }
    this.saldo = this.saldo - monto;
    this.historial.push(`retiro: -${monto}`);
  }

  // 📌 [LECTURA CONTROLADA] Se puede LEER el saldo, pero no escribirlo
  consultarSaldo(): number {
    return this.saldo;
  }

  // 📌 [COPIA DEFENSIVA] Devuelve [...this.historial]: si devolviera this.historial, quien llama podría hacer push y falsificar el historial
  obtenerHistorial(): string[] {
    return [...this.historial];
  }
}

// Bloque de prueba
const cuenta = new CuentaBancaria("Ana", 1000);
cuenta.depositar(2000);
cuenta.retirar(500);
console.log(cuenta.consultarSaldo()); // 2500
console.log(cuenta.obtenerHistorial()); // [ 'depósito: +2000', 'retiro: -500' ]

// 📌 [COPIA DEFENSIVA] Prueba de que la copia protege: modificar lo devuelto NO cambia la cuenta
const copia = cuenta.obtenerHistorial();
copia.push("depósito: +1000000");
console.log(cuenta.obtenerHistorial().length); // 2 (sigue igual)

try {
  cuenta.retirar(999999);
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Saldo insuficiente
  }
}
console.log(cuenta.consultarSaldo()); // 2500 (el retiro fallido no dejó la cuenta a medias)

// cuenta.saldo = 0;        ❌ Error de compilación: 'saldo' is private
// cuenta.titular = "Beto"; ❌ Error de compilación: 'titular' is read-only
