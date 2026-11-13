// SIMULACRO TEMA C · EJERCICIO 1 · Agencia de viajes (abstracta, getter/setter, static, polimorfismo)

abstract class Paquete {
  // 📌 [READONLY]
  readonly destino: string;
  // 📌 [ATRIBUTO RESPALDO]
  private _noches: number;

  constructor(destino: string, noches: number) {
    this.destino = destino;
    this._noches = 0;
    // 📌 [SETTER EN CONSTRUCTOR]
    this.noches = noches;
  }

  get noches(): number {
    return this._noches;
  }

  // 📌 [SETTER CON VALIDACIÓN]
  set noches(valor: number) {
    if (!Number.isInteger(valor) || valor < 1 || valor > 30) {
      throw new Error("Las noches deben estar entre 1 y 30");
    }
    this._noches = valor;
  }

  // 📌 [MÉTODO ABSTRACTO]
  abstract precioPorNoche(): number;

  // 📌 [POLIMORFISMO + MÉTODO REDEFINIBLE] Las hijas pueden sumar extras con override
  precioTotal(): number {
    return this.precioPorNoche() * this._noches;
  }
}

class PaqueteNacional extends Paquete {
  precioPorNoche(): number {
    return 40000;
  }
}

class PaqueteInternacional extends Paquete {
  static readonly TASA_AEROPORTUARIA = 60000;

  precioPorNoche(): number {
    return 90000;
  }

  // 📌 [OVERRIDE + SUPER] Reutiliza el cálculo del padre y suma la tasa
  override precioTotal(): number {
    return super.precioTotal() + PaqueteInternacional.TASA_AEROPORTUARIA;
  }
}

class Agencia {
  private ventas: Paquete[];
  // 📌 [STATIC]
  static paquetesVendidos: number = 0;

  constructor() {
    this.ventas = [];
  }

  vender(p: Paquete): void {
    this.ventas.push(p);
    Agencia.paquetesVendidos++;
  }

  // 📌 [GETTER CALCULADO + POLIMORFISMO]
  get totalVendido(): number {
    return this.ventas.reduce((acc, p) => acc + p.precioTotal(), 0);
  }

  resumen(): void {
    for (const p of this.ventas) {
      console.log(`${p.destino} (${p.noches} noches): $${p.precioTotal()}`);
    }
  }
}

// Bloque de prueba
const agencia = new Agencia();
const bariloche = new PaqueteNacional("Bariloche", 5);
agencia.vender(bariloche);
agencia.vender(new PaqueteInternacional("Madrid", 7));
bariloche.noches = 6;
agencia.resumen();
try {
  bariloche.noches = 45;
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(`Total vendido: $${agencia.totalVendido}`);
console.log(`Paquetes vendidos: ${Agencia.paquetesVendidos}`);
