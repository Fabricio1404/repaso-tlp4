// SIMULACRO TEMA C · EJERCICIO 2 · Cotizaciones (Singleton + Factory)

class CotizacionDolar {
  // 📌 [SINGLETON]
  private static instancia: CotizacionDolar | undefined;
  readonly valor = 1000;

  private constructor() {}

  static obtenerInstancia(): CotizacionDolar {
    if (CotizacionDolar.instancia === undefined) {
      CotizacionDolar.instancia = new CotizacionDolar();
    }
    return CotizacionDolar.instancia;
  }
}

// 📌 [FACTORY - TIPO COMÚN]
interface Servicio {
  descripcion(): string;
  precioEnPesos(): number;
}

class Excursion implements Servicio {
  private nombre: string;
  private pesos: number;
  constructor(nombre: string, pesos: number) {
    this.nombre = nombre;
    this.pesos = pesos;
  }
  descripcion(): string {
    return `Excursión ${this.nombre}`;
  }
  precioEnPesos(): number {
    return this.pesos;
  }
}

class VueloInternacional implements Servicio {
  private ruta: string;
  private dolares: number;
  constructor(ruta: string, dolares: number) {
    this.ruta = ruta;
    this.dolares = dolares;
  }
  descripcion(): string {
    return `Vuelo ${this.ruta}`;
  }
  precioEnPesos(): number {
    // 📌 [SINGLETON EN USO] La cotización no está escrita acá
    return this.dolares * CotizacionDolar.obtenerInstancia().valor;
  }
}

class FabricaServicios {
  // 📌 [FACTORY ESTÁTICA] Único lugar con los new de los servicios
  static crear(tipo: "excursion" | "vuelo", nombre: string, monto: number): Servicio {
    if (tipo === "excursion") {
      return new Excursion(nombre, monto);
    }
    return new VueloInternacional(nombre, monto);
  }
}

// Bloque de prueba
console.log(`Mismo Singleton: ${CotizacionDolar.obtenerInstancia() === CotizacionDolar.obtenerInstancia()}`);
const servicios: Servicio[] = [
  FabricaServicios.crear("excursion", "Cerro Catedral", 85000),
  FabricaServicios.crear("vuelo", "EZE-MAD", 950),
];
let total = 0;
for (const s of servicios) {
  console.log(`${s.descripcion()}: $${s.precioEnPesos()}`);
  total += s.precioEnPesos();
}
console.log(`Total: $${total}`);
