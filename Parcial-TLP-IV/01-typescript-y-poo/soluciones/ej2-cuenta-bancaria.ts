// Ejercicio 2 · Cuenta bancaria (encapsulamiento, getter, error propio, copia defensiva)

// Error propio: extiende Error para poder distinguirlo con instanceof
class SaldoInsuficienteError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "SaldoInsuficienteError";
  }
}

type TipoMovimiento = "deposito" | "extraccion";

interface Movimiento {
  tipo: TipoMovimiento;
  monto: number;
}

class CuentaBancaria {
  readonly titular: string;               // readonly: se asigna una sola vez
  private _saldo: number;                 // atributo de respaldo del getter
  private movimientos: Movimiento[];

  constructor(titular: string, saldoInicial: number) {
    if (saldoInicial < 0) {
      throw new RangeError("El saldo inicial no puede ser negativo");
    }
    this.titular = titular;
    this._saldo = saldoInicial;
    this.movimientos = [];
  }

  // Getter SIN setter: desde afuera se puede leer el saldo, pero no asignarlo
  get saldo(): number {
    return this._saldo;
  }

  depositar(monto: number): void {
    this.validarMonto(monto);
    this._saldo += monto;
    this.movimientos.push({ tipo: "deposito", monto: monto });
  }

  extraer(monto: number): void {
    this.validarMonto(monto);
    if (monto > this._saldo) {
      throw new SaldoInsuficienteError(
        `Saldo insuficiente: se pidieron $${monto} y hay $${this._saldo}`
      );
    }
    this._saldo -= monto;
    this.movimientos.push({ tipo: "extraccion", monto: monto });
  }

  // Copia defensiva: devolvemos un arreglo NUEVO con objetos NUEVOS
  obtenerMovimientos(): Movimiento[] {
    return this.movimientos.map(m => ({ ...m }));
  }

  // Método privado: ayuda interna que no forma parte de la interfaz pública
  private validarMonto(monto: number): void {
    if (!Number.isFinite(monto) || monto <= 0) {
      throw new RangeError("El monto debe ser un número positivo");
    }
  }
}

// ---------------- Bloque de prueba ----------------
const cuenta = new CuentaBancaria("Ana Gómez", 1000);
console.log(`Titular: ${cuenta.titular}`);
console.log(`Saldo inicial: $${cuenta.saldo}`);

cuenta.depositar(500);
cuenta.extraer(300);
console.log(`Saldo actual: $${cuenta.saldo}`);

try {
  cuenta.extraer(5000);
} catch (e) {
  if (e instanceof SaldoInsuficienteError) console.log(`${e.name}: ${e.message}`);
}

try {
  cuenta.depositar(-50);
} catch (e) {
  if (e instanceof RangeError) console.log(`RangeError: ${e.message}`);
}

// Intentamos "romper" la cuenta desde afuera modificando la copia
const copia = cuenta.obtenerMovimientos();
copia.push({ tipo: "deposito", monto: 1000000 });
console.log(`Movimientos reales: ${cuenta.obtenerMovimientos().length}`);

for (const m of cuenta.obtenerMovimientos()) {
  console.log(`- ${m.tipo}: $${m.monto}`);
}
