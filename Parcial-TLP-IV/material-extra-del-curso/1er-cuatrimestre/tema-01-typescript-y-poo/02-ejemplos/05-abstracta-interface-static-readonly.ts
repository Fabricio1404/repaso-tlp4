// ============================================================================
// EJEMPLO 5 · CLASE ABSTRACTA, INTERFACE, STATIC y READONLY
// Parte A: el Hotel del primer parcial (Tema B, ejercicio 1).
// Parte B: interface Pagable implementada por clases sin relación de herencia.
// ============================================================================

// ---------------------------- PARTE A: Hotel --------------------------------

// 📌 [CLASE ABSTRACTA] Molde parcial: no se puede hacer new Habitacion(...)
abstract class Habitacion {
  // 📌 [READONLY] El número de habitación se asigna una vez y no cambia
  readonly numero: number;

  constructor(numero: number) {
    this.numero = numero;
  }

  // 📌 [MÉTODO ABSTRACTO] Sin cuerpo: cada hija está OBLIGADA a implementarlo (si no, no compila)
  abstract calcularPrecio(noches: number): number;
}

// 📌 [HERENCIA SIN CONSTRUCTOR] Si la hija no declara constructor, usa el del padre automáticamente
class Simple extends Habitacion {
  // 📌 [IMPLEMENTACIÓN DE ABSTRACTO] Cumple el "hueco" que dejó la clase abstracta
  calcularPrecio(noches: number): number {
    return 20000 * noches;
  }
}

class Suite extends Habitacion {
  calcularPrecio(noches: number): number {
    return 50000 * noches;
  }
}

class Hotel {
  // 📌 [ENCAPSULAMIENTO] El arreglo es privado: solo se agrega mediante checkIn
  private habitaciones: Habitacion[];
  // 📌 [STATIC] Pertenece a la CLASE Hotel, no a un hotel puntual: cuenta el total histórico
  static totalCheckIns: number = 0;

  constructor() {
    this.habitaciones = [];
  }

  checkIn(habitacion: Habitacion): void {
    this.habitaciones.push(habitacion);
    // 📌 [STATIC] Se accede con el nombre de la clase, no con this
    Hotel.totalCheckIns++;
  }

  // 📌 [GETTER] cantidad mide cuántas habitaciones hay AHORA en este hotel (distinto del static)
  get cantidad(): number {
    return this.habitaciones.length;
  }

  mostrarPrecios(noches: number): void {
    for (let i = 0; i < this.habitaciones.length; i++) {
      const h = this.habitaciones[i];
      // 📌 [POLIMORFISMO] Sin if por tipo: cada habitación calcula su precio a su manera
      console.log(`Habitación ${h.numero} paga $${h.calcularPrecio(noches)}`);
    }
  }
}

// ----------------------- PARTE B: interface Pagable -------------------------

// 📌 [INTERFACE] Contrato puro: solo dice QUÉ debe tener; no tiene código ni estado
interface Pagable {
  descripcion: string;
  monto(): number;
}

// 📌 [IMPLEMENTS] Factura se compromete a cumplir el contrato Pagable
class Factura implements Pagable {
  descripcion: string;
  private importe: number;
  private iva: number;

  constructor(descripcion: string, importe: number, iva: number) {
    this.descripcion = descripcion;
    this.importe = importe;
    this.iva = iva;
  }

  monto(): number {
    return this.importe + this.importe * this.iva;
  }
}

// 📌 [IMPLEMENTS] Sueldo NO tiene relación de herencia con Factura, pero cumple el mismo contrato
class Sueldo implements Pagable {
  descripcion: string;
  private bruto: number;
  // 📌 [STATIC READONLY] Constante de la clase: una sola, compartida y no reasignable
  static readonly APORTES = 0.17;

  constructor(empleado: string, bruto: number) {
    this.descripcion = `Sueldo de ${empleado}`;
    this.bruto = bruto;
  }

  monto(): number {
    return this.bruto - this.bruto * Sueldo.APORTES;
  }
}

// 📌 [POLIMORFISMO CON INTERFACES] Recibe Pagable[]: funciona con cualquier clase que implemente el contrato
function totalAPagar(pagables: Pagable[]): number {
  let total = 0;
  for (const p of pagables) {
    total += p.monto();
  }
  return total;
}

// Bloque de prueba
const hotel = new Hotel();
hotel.checkIn(new Simple(101));
hotel.checkIn(new Suite(303));
hotel.mostrarPrecios(2);
console.log(`Habitaciones ocupadas: ${hotel.cantidad}`);
console.log(`Total histórico de check-ins: ${Hotel.totalCheckIns}`);
// Habitación 101 paga $40000
// Habitación 303 paga $100000
// Habitaciones ocupadas: 2
// Total histórico de check-ins: 2

const pagos: Pagable[] = [new Factura("Luz", 10000, 0.21), new Sueldo("Ana", 100000)];
for (const p of pagos) {
  console.log(`${p.descripcion}: $${p.monto()}`);
}
console.log(`Total: $${totalAPagar(pagos)}`);
// Luz: $12100
// Sueldo de Ana: $83000
// Total: $95100

// new Habitacion(5);        ❌ Cannot create an instance of an abstract class
// Sueldo.APORTES = 0.2;     ❌ Cannot assign to 'APORTES' because it is a read-only property
