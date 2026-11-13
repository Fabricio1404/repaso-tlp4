// SIMULACRO TEMA C · EJERCICIO 3 · Refactor de transportes (LSP e ISP)

// 📌 [ISP ✓]
// ISP: interfaces chicas; cada transporte implementa solo lo que ofrece
interface Reservable {
  readonly nombre: string;
  reservarAsiento(pasajero: string): string;
}

interface ConEquipaje {
  despacharEquipaje(kilos: number): string;
}

interface ConServicioABordo {
  servirComida(): string;
}

class Avion implements Reservable, ConEquipaje, ConServicioABordo {
  readonly nombre = "Avión";
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

// 📌 [LSP ✓] LSP: el colectivo ya no hereda métodos que no puede cumplir (no hay throw)
class Colectivo implements Reservable, ConEquipaje {
  readonly nombre = "Colectivo";
  reservarAsiento(pasajero: string): string {
    return `${this.nombre}: asiento para ${pasajero}`;
  }
  despacharEquipaje(kilos: number): string {
    return `${this.nombre}: ${kilos} kg en bodega`;
  }
}

class Traslado implements Reservable {
  readonly nombre = "Traslado";
  reservarAsiento(pasajero: string): string {
    return `${this.nombre}: lugar para ${pasajero}`;
  }
}

// 📌 [ISP ✓ CLIENTES MÍNIMOS] Cada función pide solo la capacidad que usa
function reservarTodos(transportes: Reservable[], pasajero: string): void {
  for (const t of transportes) console.log(t.reservarAsiento(pasajero));
}

function servirATodos(transportes: ConServicioABordo[]): void {
  for (const t of transportes) console.log(t.servirComida());
}

// Bloque de prueba
const avion = new Avion();
const colectivo = new Colectivo();
const traslado = new Traslado();
reservarTodos([avion, colectivo, traslado], "Ana");
console.log(avion.despacharEquipaje(23));
console.log(colectivo.despacharEquipaje(15));
servirATodos([avion]);
// servirATodos([colectivo]);            ❌ no compila (antes: "ERROR: El colectivo no sirve comida")
// traslado.despacharEquipaje(10);       ❌ no compila (antes: "ERROR: El traslado no lleva equipaje")
