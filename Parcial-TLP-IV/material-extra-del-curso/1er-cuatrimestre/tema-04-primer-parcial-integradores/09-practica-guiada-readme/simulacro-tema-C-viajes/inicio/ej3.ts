// SIMULACRO TEMA C · EJERCICIO 3 · CÓDIGO ORIGINAL
// Hacé el commit "chore(ej3): código original" ANTES de modificarlo.

class Transporte {
  nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  reservarAsiento(pasajero: string): string {
    return `${this.nombre}: asiento para ${pasajero}`;
  }
  despacharEquipaje(kilos: number): string {
    return `${this.nombre}: ${kilos} kg despachados`;
  }
  servirComida(): string {
    return `${this.nombre}: menú servido`;
  }
}

class Avion extends Transporte {
  constructor() {
    super("Avión");
  }
}

class Colectivo extends Transporte {
  constructor() {
    super("Colectivo");
  }
  override despacharEquipaje(kilos: number): string {
    return `${this.nombre}: ${kilos} kg en bodega`;
  }
  override servirComida(): string {
    throw new Error("El colectivo no sirve comida");
  }
}

class Traslado extends Transporte {
  constructor() {
    super("Traslado");
  }
  override reservarAsiento(pasajero: string): string {
    return `${this.nombre}: lugar para ${pasajero}`;
  }
  override despacharEquipaje(_kilos: number): string {
    throw new Error("El traslado no lleva equipaje");
  }
  override servirComida(): string {
    throw new Error("El traslado no sirve comida");
  }
}

function reservarTodos(transportes: Transporte[], pasajero: string): void {
  for (const t of transportes) console.log(t.reservarAsiento(pasajero));
}

function servirATodos(transportes: Transporte[]): void {
  for (const t of transportes) {
    try {
      console.log(t.servirComida());
    } catch (e) {
      if (e instanceof Error) console.log(`ERROR: ${e.message}`);
    }
  }
}

// Bloque de prueba
const avion = new Avion();
const colectivo = new Colectivo();
const traslado = new Traslado();
reservarTodos([avion, colectivo, traslado], "Ana");
console.log(avion.despacharEquipaje(23));
console.log(colectivo.despacharEquipaje(15));
servirATodos([avion, colectivo]);
try {
  console.log(traslado.despacharEquipaje(10));
} catch (e) {
  if (e instanceof Error) console.log(`ERROR: ${e.message}`);
}
