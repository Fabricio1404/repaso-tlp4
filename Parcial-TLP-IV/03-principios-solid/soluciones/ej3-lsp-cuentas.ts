// Ejercicio 3 · LSP · Cuentas bancarias (RESUELTO)
//
// ¿Por qué el original viola LSP?
//   procesarRetiros recibe Cuenta[] y espera que TODA Cuenta pueda extraer (eso prometía la clase padre).
//   PlazoFijo hereda extraer() pero lo convierte en un error: la hija NO puede reemplazar al padre
//   sin sorpresas. El cliente tuvo que defenderse con try/catch por culpa de una subclase.

export {};

// La base solo promete lo que TODAS las cuentas cumplen
abstract class Cuenta {
  protected saldo: number;
  readonly titular: string;

  constructor(titular: string, saldo: number) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(monto: number): void {
    this.saldo += monto;
  }

  obtenerSaldo(): number {
    return this.saldo;
  }
}

// LSP: la capacidad de extraer se separa; solo la implementa quien realmente puede
interface Extraible {
  readonly titular: string;
  extraer(monto: number): void;
  obtenerSaldo(): number;
}

class CajaAhorro extends Cuenta implements Extraible {
  extraer(monto: number): void {
    if (monto > this.saldo) throw new Error("Saldo insuficiente");
    this.saldo -= monto;
  }
}

class PlazoFijo extends Cuenta {
  // No promete extraer: no hay sorpresa posible
  acreditarIntereses(tasa: number): void {
    this.saldo += this.saldo * tasa;
  }
}

// Solo acepta cuentas que REALMENTE pueden extraer
function procesarRetiros(cuentas: Extraible[], monto: number): void {
  for (const c of cuentas) {
    c.extraer(monto);
    console.log(`${c.titular}: retiro OK, saldo $${c.obtenerSaldo()}`);
  }
}

// ---------------- Bloque de prueba ----------------
const ana = new CajaAhorro("Ana", 10000);
const beto = new PlazoFijo("Beto", 50000);
const caro = new CajaAhorro("Caro", 3000);

procesarRetiros([ana, caro], 2000);
// procesarRetiros([beto], 2000);   // ❌ ahora es un error de TIPOS: TypeScript lo detecta antes de ejecutar

beto.acreditarIntereses(0.05);
console.log(`${beto.titular}: plazo fijo con intereses, saldo $${beto.obtenerSaldo()}`);
