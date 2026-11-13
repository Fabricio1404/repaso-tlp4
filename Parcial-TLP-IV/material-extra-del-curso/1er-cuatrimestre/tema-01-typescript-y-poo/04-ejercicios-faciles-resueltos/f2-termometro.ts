// RESOLUCIÓN F2 · Termometro

class Termometro {
  // 📌 [STATIC READONLY] Constantes de la CLASE: hay una sola copia (no una por objeto) y no se pueden reasignar
  static readonly MINIMA = -50;
  static readonly MAXIMA = 60;
  // 📌 [ENCAPSULAMIENTO] La temperatura solo cambia a través de subir() y bajar()
  private temperatura: number;

  constructor(temperatura: number) {
    this.temperatura = temperatura;
  }

  subir(grados: number): void {
    this.validarGrados(grados);
    // 📌 [VALIDAR ANTES DE MODIFICAR] Se calcula el valor nuevo en una variable y se valida ANTES de asignarlo
    const nueva = this.temperatura + grados;
    this.validarRango(nueva);
    this.temperatura = nueva;
  }

  bajar(grados: number): void {
    this.validarGrados(grados);
    const nueva = this.temperatura - grados;
    this.validarRango(nueva);
    this.temperatura = nueva;
  }

  leer(): number {
    return this.temperatura;
  }

  // 📌 [GETTER CALCULADO] Se usa como t.estado (sin paréntesis) y no tiene setter: solo lectura
  get estado(): string {
    if (this.temperatura < 10) return "frío";
    if (this.temperatura > 25) return "calor";
    return "templado";
  }

  // 📌 [MÉTODO PRIVADO] Ayudante interno: evita repetir la validación en subir y bajar
  private validarGrados(grados: number): void {
    if (grados <= 0) {
      throw new Error("Los grados deben ser positivos");
    }
  }

  private validarRango(valor: number): void {
    // 📌 [STATIC] Se accede con el nombre de la clase, no con this
    if (valor < Termometro.MINIMA || valor > Termometro.MAXIMA) {
      throw new Error("Fuera de rango");
    }
  }
}

// Bloque de prueba
const t = new Termometro(20);
console.log(t.leer(), t.estado);
t.subir(8);
console.log(t.leer(), t.estado);
try {
  t.subir(100);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(t.leer());
t.bajar(23);
console.log(t.leer(), t.estado);
