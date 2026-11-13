// Ejercicio 3 · LSP · Cuentas bancarias
// CONSIGNA: PlazoFijo "es una" Cuenta, pero rompe lo que el código cliente espera de una Cuenta.
//   1. Explicá en un comentario POR QUÉ se viola LSP (¿qué esperaba procesarRetiros y qué pasó?).
//   2. Refactorizá para que ninguna clase prometa algo que no puede cumplir.
//      Pista: separá la capacidad de "extraer" en su propia interface.
//   3. procesarRetiros solo debe recibir cuentas que REALMENTE permiten extraer,
//      y ya no debe necesitar try/catch para esquivar al plazo fijo.
// Ejecutá: node 03-principios-solid/ejercicios/ej3-lsp-cuentas.ts

export {};

class Cuenta {
  protected saldo: number;
  readonly titular: string;

  constructor(titular: string, saldo: number) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(monto: number): void {
    this.saldo += monto;
  }

  extraer(monto: number): void {
    if (monto > this.saldo) throw new Error("Saldo insuficiente");
    this.saldo -= monto;
  }

  obtenerSaldo(): number {
    return this.saldo;
  }
}

class CajaAhorro extends Cuenta {}

class PlazoFijo extends Cuenta {
  override extraer(_monto: number): void {
    throw new Error("Un plazo fijo no permite extracciones");   // ← sorpresa para el cliente
  }
}

function procesarRetiros(cuentas: Cuenta[], monto: number): void {
  for (const c of cuentas) {
    try {
      c.extraer(monto);
      console.log(`${c.titular}: retiro OK, saldo $${c.obtenerSaldo()}`);
    } catch (e) {
      if (e instanceof Error) console.log(`${c.titular}: ${e.message}`);
    }
  }
}

// ---------------- Bloque de prueba ----------------
const cuentas: Cuenta[] = [
  new CajaAhorro("Ana", 10000),
  new PlazoFijo("Beto", 50000),
  new CajaAhorro("Caro", 3000),
];
procesarRetiros(cuentas, 2000);
