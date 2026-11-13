// PRIMER PARCIAL · TEMA B · EJERCICIO 1 · Hotel
// (clase abstracta, herencia, polimorfismo, static, getter)

// 📌 [CLASE ABSTRACTA] "clase abstracta Habitacion": no se puede hacer new Habitacion()
abstract class Habitacion {
  // 📌 [READONLY] "numero readonly": se asigna en el constructor y no cambia
  readonly numero: number;

  constructor(numero: number) {
    this.numero = numero;
  }

  // 📌 [MÉTODO ABSTRACTO] "calcularPrecio(noches) abstracto": cada hija lo implementa
  abstract calcularPrecio(noches: number): number;
}

// 📌 [HERENCIA] Simple ES UNA Habitacion; no necesita constructor propio (usa el del padre)
class Simple extends Habitacion {
  // 📌 [IMPLEMENTACIÓN DEL ABSTRACTO] $20000 por noche
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
  // 📌 [ENCAPSULAMIENTO] "arreglo privado": solo se agrega mediante checkIn
  private habitaciones: Habitacion[];
  // 📌 [STATIC] "atributo static que cuenta los ingresos": pertenece a la clase Hotel, no a un hotel puntual
  static totalCheckIns: number = 0;

  constructor() {
    this.habitaciones = [];
  }

  checkIn(habitacion: Habitacion): void {
    this.habitaciones.push(habitacion);
    // 📌 [STATIC] Se accede con el nombre de la clase
    Hotel.totalCheckIns++;
  }

  // 📌 [GETTER] "getter cantidad": cuántas habitaciones hay AHORA (≠ total histórico)
  get cantidad(): number {
    return this.habitaciones.length;
  }

  mostrarPrecios(noches: number): void {
    for (let i = 0; i < this.habitaciones.length; i++) {
      const h = this.habitaciones[i];
      // 📌 [POLIMORFISMO] "sin if por tipo": cada habitación calcula su precio
      console.log(`Habitación ${h.numero} paga $${h.calcularPrecio(noches)}`);
    }
  }
}

// Bloque de prueba
const hotel = new Hotel();
hotel.checkIn(new Simple(101));
hotel.checkIn(new Suite(303));
hotel.mostrarPrecios(2);
console.log(`Habitaciones ocupadas: ${hotel.cantidad}`);
console.log(`Total histórico de check-ins: ${Hotel.totalCheckIns}`);
// Salida:
// Habitación 101 paga $40000
// Habitación 303 paga $100000
// Habitaciones ocupadas: 2
// Total histórico de check-ins: 2
