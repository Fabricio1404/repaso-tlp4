// RESOLUCIÓN D2 · Banco con transferencias atómicas
// Integra: clase abstracta con método abstracto protegido (gancho), protected entre instancias,
// errores propios, unión de literales, copia defensiva, polimorfismo y composición (Banco tiene Cuentas).

type TipoMovimiento = "deposito" | "extraccion" | "transferencia-enviada" | "transferencia-recibida";

// 📌 [INTERFACE CON READONLY] Un movimiento, una vez registrado, no se puede alterar
interface Movimiento {
  readonly tipo: TipoMovimiento;
  readonly monto: number;
  readonly saldoResultante: number;
}

class OperacionInvalidaError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "OperacionInvalidaError";
  }
}

function formatear(monto: number): string {
  return monto < 0 ? `-$${-monto}` : `$${monto}`;
}

abstract class Cuenta {
  readonly cbu: string;
  readonly titular: string;
  // 📌 [PROTECTED] Las hijas necesitan leer el saldo para validar su regla de extracción
  protected saldo: number;
  private movimientos: Movimiento[];

  constructor(cbu: string, titular: string) {
    this.cbu = cbu;
    this.titular = titular;
    this.saldo = 0;
    this.movimientos = [];
  }

  abstract tipo(): string;

  // 📌 [MÉTODO ABSTRACTO PROTEGIDO] Cada tipo de cuenta define SU regla; no es parte de la interfaz pública
  protected abstract validarExtraccion(monto: number): void;

  // 📌 [GANCHO (HOOK)] Método vacío que las hijas PUEDEN redefinir para reaccionar a una extracción exitosa
  protected alExtraer(): void {}

  depositar(monto: number): void {
    Cuenta.validarMonto(monto);
    this.acreditar(monto, "deposito");
  }

  extraer(monto: number): void {
    Cuenta.validarMonto(monto);
    // 📌 [POLIMORFISMO] La regla concreta (descubierto o límite de extracciones) la pone cada hija
    this.validarExtraccion(monto);
    this.debitar(monto, "extraccion");
  }

  transferir(destino: Cuenta, monto: number): void {
    if (destino === this) {
      throw new OperacionInvalidaError("No se puede transferir a la misma cuenta");
    }
    // 📌 [ATOMICIDAD] TODAS las validaciones van antes de modificar algo: si falla, ninguna de las dos cuentas cambia
    Cuenta.validarMonto(monto);
    this.validarExtraccion(monto);
    this.debitar(monto, "transferencia-enviada");
    // 📌 [PROTECTED ENTRE INSTANCIAS] Dentro de Cuenta se puede usar un miembro protected de OTRA Cuenta
    destino.acreditar(monto, "transferencia-recibida");
  }

  get saldoActual(): number {
    return this.saldo;
  }

  // 📌 [COPIA DEFENSIVA] Copia del arreglo; los movimientos son readonly así que tampoco se pueden alterar
  historial(): Movimiento[] {
    return [...this.movimientos];
  }

  protected acreditar(monto: number, tipo: TipoMovimiento): void {
    this.saldo += monto;
    this.registrar(tipo, monto);
  }

  private debitar(monto: number, tipo: TipoMovimiento): void {
    this.saldo -= monto;
    this.registrar(tipo, monto);
    this.alExtraer();
  }

  private registrar(tipo: TipoMovimiento, monto: number): void {
    this.movimientos.push({ tipo: tipo, monto: monto, saldoResultante: this.saldo });
  }

  private static validarMonto(monto: number): void {
    if (!Number.isFinite(monto) || monto <= 0) {
      throw new OperacionInvalidaError("El monto debe ser mayor a 0");
    }
  }
}

class CajaAhorro extends Cuenta {
  static readonly MAX_EXTRACCIONES = 3;
  private extraccionesDelMes: number;

  constructor(cbu: string, titular: string) {
    super(cbu, titular);
    this.extraccionesDelMes = 0;
  }

  tipo(): string {
    return "CajaAhorro";
  }

  // 📌 [IMPLEMENTACIÓN DE ABSTRACTO] Regla propia: sin descubierto y con límite mensual
  protected validarExtraccion(monto: number): void {
    if (monto > this.saldo) {
      throw new OperacionInvalidaError("Saldo insuficiente");
    }
    if (this.extraccionesDelMes >= CajaAhorro.MAX_EXTRACCIONES) {
      throw new OperacionInvalidaError(`Límite de ${CajaAhorro.MAX_EXTRACCIONES} extracciones mensuales alcanzado`);
    }
  }

  // 📌 [OVERRIDE DEL GANCHO] Cuenta las extracciones solo cuando se concretan
  protected override alExtraer(): void {
    this.extraccionesDelMes++;
  }

  nuevoMes(): void {
    this.extraccionesDelMes = 0;
  }
}

class CuentaCorriente extends Cuenta {
  private readonly descubierto: number;

  constructor(cbu: string, titular: string, descubierto: number) {
    super(cbu, titular);
    this.descubierto = descubierto;
  }

  tipo(): string {
    return "CuentaCorriente";
  }

  protected validarExtraccion(monto: number): void {
    if (this.saldo - monto < -this.descubierto) {
      throw new OperacionInvalidaError(`Supera el descubierto de $${this.descubierto}`);
    }
  }
}

class Banco {
  // 📌 [COMPOSICIÓN] El banco administra su colección de cuentas
  private cuentas: Cuenta[];

  constructor() {
    this.cuentas = [];
  }

  abrir(cuenta: Cuenta): void {
    if (this.cuentas.some((c) => c.cbu === cuenta.cbu)) {
      throw new OperacionInvalidaError(`Ya existe una cuenta con CBU ${cuenta.cbu}`);
    }
    this.cuentas.push(cuenta);
  }

  buscar(cbu: string): Cuenta {
    const cuenta = this.cuentas.find((c) => c.cbu === cbu);
    if (cuenta === undefined) {
      throw new OperacionInvalidaError(`No existe la cuenta ${cbu}`);
    }
    return cuenta;
  }

  // 📌 [DELEGACIÓN] El banco busca las cuentas y delega la operación en ellas
  transferir(cbuOrigen: string, cbuDestino: string, monto: number): void {
    const origen = this.buscar(cbuOrigen);
    const destino = this.buscar(cbuDestino);
    origen.transferir(destino, monto);
  }

  get totalDepositado(): number {
    return this.cuentas.reduce((acc, c) => acc + c.saldoActual, 0);
  }

  reporte(): string[] {
    return this.cuentas.map((c) => `${c.tipo()} ${c.cbu} (${c.titular}): ${formatear(c.saldoActual)}`);
  }
}

// Bloque de prueba
function intentar(accion: () => void): void {
  try {
    accion();
  } catch (e) {
    if (e instanceof OperacionInvalidaError) console.log(`✗ ${e.message}`);
  }
}

const banco = new Banco();
const ca = new CajaAhorro("001", "Ana");
const cc = new CuentaCorriente("002", "Beto", 5000);
banco.abrir(ca);
banco.abrir(cc);

ca.depositar(10000);
banco.transferir("001", "002", 3000);
cc.extraer(7000);
intentar(() => cc.extraer(2000));
ca.extraer(1000);
ca.extraer(1000);
intentar(() => ca.extraer(1000));
ca.nuevoMes();
ca.extraer(1000);
intentar(() => banco.transferir("001", "002", 99999));
console.log(`Saldo de Beto sin cambios: ${formatear(cc.saldoActual)}`);
intentar(() => banco.abrir(new CajaAhorro("001", "Otro")));
intentar(() => banco.buscar("999"));
intentar(() => ca.transferir(ca, 10));
intentar(() => ca.depositar(-5));
console.log(banco.reporte());
console.log(ca.historial().map((m) => `${m.tipo} ${m.monto} → ${m.saldoResultante}`));
console.log(`Total depositado: ${formatear(banco.totalDepositado)}`);
