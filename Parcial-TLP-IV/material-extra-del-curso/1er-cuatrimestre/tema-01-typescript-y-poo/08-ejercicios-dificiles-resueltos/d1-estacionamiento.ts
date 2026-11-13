// RESOLUCIÓN D1 · Estacionamiento
// Integra: abstracción, encapsulamiento, herencia, polimorfismo, clase abstracta,
// static, readonly, getters, errores propios, super.metodo() y validación en constructor.

// 📌 [ERROR PROPIO] Permite distinguir "lleno" de cualquier otro error con instanceof
class EstacionamientoLlenoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "EstacionamientoLlenoError";
  }
}

// 📌 [CLASE ABSTRACTA] Todo vehículo tiene patente y sabe calcular su cobro, pero la tarifa la define cada tipo
abstract class Vehiculo {
  // 📌 [STATIC READONLY PRIVADO] Una sola expresión regular para toda la clase: formato viejo ABC123 o nuevo AB123CD
  private static readonly FORMATO = /^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$/;
  // 📌 [READONLY] La patente no cambia nunca
  readonly patente: string;

  constructor(patente: string) {
    const normalizada = patente.trim().toUpperCase();
    // 📌 [VALIDAR EN CONSTRUCTOR] Es imposible crear un vehículo con patente inválida
    if (!Vehiculo.FORMATO.test(normalizada)) {
      throw new Error(`Patente inválida: ${patente}`);
    }
    this.patente = normalizada;
  }

  // 📌 [MÉTODO ABSTRACTO] Cada tipo DEBE definir su tarifa y su nombre
  abstract tarifaPorHora(): number;
  abstract tipo(): string;

  // 📌 [MÉTODO CONCRETO REUTILIZABLE] La regla de redondeo (mínimo 1 hora, fracción = hora completa) está en un solo lugar
  calcularCobro(minutos: number): number {
    const horas = Math.max(1, Math.ceil(minutos / 60));
    return horas * this.tarifaPorHora();
  }
}

class Auto extends Vehiculo {
  tarifaPorHora(): number {
    return 1000;
  }
  tipo(): string {
    return "Auto";
  }
}

class Moto extends Vehiculo {
  tarifaPorHora(): number {
    return 500;
  }
  tipo(): string {
    return "Moto";
  }
}

class Camioneta extends Vehiculo {
  private static readonly SEGURO = 2000;

  tarifaPorHora(): number {
    return 1500;
  }
  tipo(): string {
    return "Camioneta";
  }

  // 📌 [OVERRIDE + SUPER.METODO] Reutiliza el cálculo del padre y le suma el seguro fijo
  override calcularCobro(minutos: number): number {
    return super.calcularCobro(minutos) + Camioneta.SEGURO;
  }
}

// 📌 [INTERFACE PARA DATOS] Lo que el estacionamiento guarda de cada vehículo adentro
interface Estadia {
  vehiculo: Vehiculo;
  minutoIngreso: number;
}

class Estacionamiento {
  // 📌 [STATIC] Recaudación de TODOS los estacionamientos (nivel clase); privado + método static para leerlo
  private static recaudado: number = 0;
  readonly nombre: string;
  private readonly capacidad: number;
  // 📌 [ENCAPSULAMIENTO] Las estadías solo cambian con ingresar() y egresar()
  private estadias: Estadia[];
  private _recaudacion: number;

  constructor(nombre: string, capacidad: number) {
    if (!Number.isInteger(capacidad) || capacidad <= 0) {
      throw new Error("La capacidad debe ser un entero mayor a 0");
    }
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.estadias = [];
    this._recaudacion = 0;
  }

  // 📌 [GETTER CALCULADO] Nunca se desactualiza porque se calcula al leerlo
  get lugaresLibres(): number {
    return this.capacidad - this.estadias.length;
  }

  // 📌 [GETTER SIN SETTER] Se puede leer la recaudación, pero no modificarla desde afuera
  get recaudacion(): number {
    return this._recaudacion;
  }

  static recaudacionHistorica(): number {
    return Estacionamiento.recaudado;
  }

  ingresar(vehiculo: Vehiculo, minuto: number): void {
    if (this.lugaresLibres === 0) {
      throw new EstacionamientoLlenoError(`El estacionamiento ${this.nombre} está lleno`);
    }
    if (this.buscar(vehiculo.patente) !== undefined) {
      throw new Error(`${vehiculo.patente} ya está adentro`);
    }
    this.estadias.push({ vehiculo: vehiculo, minutoIngreso: minuto });
  }

  egresar(patente: string, minuto: number): number {
    const estadia = this.buscar(patente);
    if (estadia === undefined) {
      throw new Error(`${patente} no está en el estacionamiento`);
    }
    if (minuto < estadia.minutoIngreso) {
      throw new Error("El horario de egreso es anterior al de ingreso");
    }
    // 📌 [POLIMORFISMO] Sin preguntar si es Auto, Moto o Camioneta: cada uno calcula su cobro
    const cobro = estadia.vehiculo.calcularCobro(minuto - estadia.minutoIngreso);
    this.estadias = this.estadias.filter((e) => e !== estadia);
    this._recaudacion += cobro;
    Estacionamiento.recaudado += cobro;
    return cobro;
  }

  // 📌 [COPIA DEFENSIVA] Devuelve textos, nunca la lista interna
  listarOcupados(): string[] {
    return this.estadias.map((e) => `${e.vehiculo.tipo()} ${e.vehiculo.patente}`);
  }

  // 📌 [MÉTODO PRIVADO] Ayudante interno reutilizado por ingresar y egresar
  private buscar(patente: string): Estadia | undefined {
    const normalizada = patente.trim().toUpperCase();
    return this.estadias.find((e) => e.vehiculo.patente === normalizada);
  }
}

// Bloque de prueba
const centro = new Estacionamiento("Centro", 3);
centro.ingresar(new Auto("ab123cd"), 0);
centro.ingresar(new Moto("XYZ987"), 10);
centro.ingresar(new Camioneta("AAA111"), 30);
console.log(centro.listarOcupados());
console.log(`Libres: ${centro.lugaresLibres}`);
try {
  centro.ingresar(new Auto("BBB222"), 40);
} catch (e) {
  if (e instanceof EstacionamientoLlenoError) console.log(`${e.name}: ${e.message}`);
}
console.log(`Cobro: $${centro.egresar("AB123CD", 150)}`);
console.log(`Cobro: $${centro.egresar("xyz987", 20)}`);
console.log(`Cobro: $${centro.egresar("AAA111", 90)}`);
try {
  new Auto("123ABC");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  centro.egresar("ZZZ999", 100);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
const norte = new Estacionamiento("Norte", 1);
norte.ingresar(new Moto("MMM333"), 0);
console.log(`Cobro: $${norte.egresar("MMM333", 61)}`);
console.log(`Recaudación Centro: $${centro.recaudacion}`);
console.log(`Recaudación histórica: $${Estacionamiento.recaudacionHistorica()}`);
