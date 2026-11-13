// RESOLUCIÓN M3 · Socios de biblioteca (abstracta + método con valor por defecto + polimorfismo)

abstract class Socio {
  readonly numero: number;
  nombre: string;
  // 📌 [ENCAPSULAMIENTO] La lista de préstamos solo cambia con prestar() y devolver()
  private prestamos: string[];

  constructor(numero: number, nombre: string) {
    this.numero = numero;
    this.nombre = nombre;
    this.prestamos = [];
  }

  // 📌 [MÉTODO ABSTRACTO] Cada tipo de socio DEBE decir su límite (no hay un valor "por defecto" razonable)
  abstract limitePrestamos(): number;

  // 📌 [MÉTODO CONCRETO REDEFINIBLE] Hay un valor por defecto (7) que algunas hijas sobrescriben
  diasDePrestamo(): number {
    return 7;
  }

  prestar(titulo: string): void {
    // 📌 [POLIMORFISMO] La regla está UNA vez acá; el límite lo aporta cada subclase
    const limite = this.limitePrestamos();
    if (this.prestamos.length >= limite) {
      throw new Error(`${this.nombre} alcanzó su límite de ${limite} préstamos`);
    }
    if (this.prestamos.includes(titulo)) {
      throw new Error(`${this.nombre} ya tiene "${titulo}"`);
    }
    this.prestamos.push(titulo);
  }

  devolver(titulo: string): void {
    const indice = this.prestamos.indexOf(titulo);
    if (indice === -1) {
      throw new Error(`${this.nombre} no tiene "${titulo}"`);
    }
    this.prestamos.splice(indice, 1);
  }

  get cantidadPrestamos(): number {
    return this.prestamos.length;
  }

  // 📌 [POLIMORFISMO] resumen() combina métodos que cada hija puede haber redefinido
  resumen(): string {
    return `#${this.numero} ${this.nombre}: ${this.cantidadPrestamos}/${this.limitePrestamos()} préstamos, ${this.diasDePrestamo()} días`;
  }
}

class SocioComun extends Socio {
  limitePrestamos(): number {
    return 2;
  }
}

class SocioPremium extends Socio {
  limitePrestamos(): number {
    return 5;
  }

  // 📌 [OVERRIDE] Redefine el valor por defecto heredado
  override diasDePrestamo(): number {
    return 14;
  }
}

class SocioEstudiante extends Socio {
  limitePrestamos(): number {
    return 3;
  }

  override diasDePrestamo(): number {
    return 10;
  }
}

// Bloque de prueba
const ana = new SocioComun(1, "Ana");
const beto = new SocioPremium(2, "Beto");
const caro = new SocioEstudiante(3, "Caro");

ana.prestar("Rayuela");
ana.prestar("Ficciones");
try {
  ana.prestar("El Aleph");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
beto.prestar("Rayuela");
try {
  beto.prestar("Rayuela");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  caro.devolver("Martín Fierro");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
ana.devolver("Rayuela");

const socios: Socio[] = [ana, beto, caro];
for (const s of socios) {
  console.log(s.resumen());
}
