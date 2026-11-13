// Ejercicio 5 · Estacionamiento (INTEGRADOR: abstracta, herencia, polimorfismo,
// static, readonly, getter, composición, error propio, copia defensiva)

type TipoVehiculo = "auto" | "moto" | "camioneta";

class EstacionamientoLlenoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "EstacionamientoLlenoError";
  }
}

abstract class Vehiculo {
  readonly patente: string;
  readonly tipo: TipoVehiculo;

  constructor(patente: string, tipo: TipoVehiculo) {
    if (patente.trim() === "") throw new Error("La patente es obligatoria");
    this.patente = patente.toUpperCase();
    this.tipo = tipo;
  }

  abstract tarifaPorHora(): number;

  // Polimorfismo dentro del padre: usa tarifaPorHora() sin saber qué hija es
  calcularCobro(horas: number): number {
    const horasCobradas = Math.ceil(horas);   // toda fracción se cobra como hora entera
    return horasCobradas * this.tarifaPorHora();
  }
}

class Auto extends Vehiculo {
  constructor(patente: string) {
    super(patente, "auto");
  }
  override tarifaPorHora(): number {
    return 1500;
  }
}

class Moto extends Vehiculo {
  constructor(patente: string) {
    super(patente, "moto");
  }
  override tarifaPorHora(): number {
    return 800;
  }
}

class Camioneta extends Vehiculo {
  constructor(patente: string) {
    super(patente, "camioneta");
  }
  override tarifaPorHora(): number {
    return 2000;
  }
}

// Estacionamiento TIENE vehículos (composición)
class Estacionamiento {
  static recaudacionHistorica: number = 0;   // de TODOS los estacionamientos

  private capacidad: number;
  private vehiculos: Vehiculo[];
  private recaudacion: number;

  constructor(capacidad: number) {
    this.capacidad = capacidad;
    this.vehiculos = [];
    this.recaudacion = 0;
  }

  get ocupados(): number {
    return this.vehiculos.length;
  }

  get libres(): number {
    return this.capacidad - this.vehiculos.length;
  }

  get recaudado(): number {
    return this.recaudacion;
  }

  ingresar(v: Vehiculo): void {
    if (this.libres === 0) {
      throw new EstacionamientoLlenoError(`No hay lugar para ${v.patente}`);
    }
    if (this.vehiculos.some(x => x.patente === v.patente)) {
      throw new Error(`${v.patente} ya está adentro`);
    }
    this.vehiculos.push(v);
  }

  egresar(patente: string, horas: number): number {
    const v = this.vehiculos.find(x => x.patente === patente.toUpperCase());
    if (v === undefined) throw new Error(`${patente} no está en el estacionamiento`);

    const cobro = v.calcularCobro(horas);   // polimorfismo: cada vehículo sabe su tarifa
    this.vehiculos = this.vehiculos.filter(x => x !== v);
    this.recaudacion += cobro;
    Estacionamiento.recaudacionHistorica += cobro;
    return cobro;
  }

  obtenerVehiculos(): Vehiculo[] {
    return [...this.vehiculos];   // copia defensiva
  }
}

// ---------------- Bloque de prueba ----------------
const centro = new Estacionamiento(2);
const norte = new Estacionamiento(5);

centro.ingresar(new Auto("ab123cd"));
centro.ingresar(new Moto("A001XYZ"));
console.log(`Centro: ${centro.ocupados} ocupados, ${centro.libres} libres`);

try {
  centro.ingresar(new Camioneta("AE999ZZ"));
} catch (e) {
  if (e instanceof EstacionamientoLlenoError) console.log(`${e.name}: ${e.message}`);
}

console.log(`Cobro AB123CD (2.5 h): $${centro.egresar("AB123CD", 2.5)}`);
console.log(`Cobro A001XYZ (1 h): $${centro.egresar("A001XYZ", 1)}`);

norte.ingresar(new Camioneta("AE999ZZ"));
console.log(`Cobro AE999ZZ (0.5 h): $${norte.egresar("AE999ZZ", 0.5)}`);

console.log(`Recaudado en Centro: $${centro.recaudado}`);
console.log(`Recaudado en Norte: $${norte.recaudado}`);
console.log(`Recaudación histórica: $${Estacionamiento.recaudacionHistorica}`);
