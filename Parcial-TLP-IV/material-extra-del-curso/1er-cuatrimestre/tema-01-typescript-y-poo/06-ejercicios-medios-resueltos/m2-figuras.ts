// RESOLUCIÓN M2 · Figuras (clase abstracta + polimorfismo)

// 📌 [CLASE ABSTRACTA] Molde parcial: tiene estado (nombre) y un método con código (describir), pero area y perimetro quedan como "huecos"
abstract class Figura {
  readonly nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // 📌 [MÉTODO ABSTRACTO] Sin cuerpo: cada hija está obligada a implementarlo
  abstract area(): number;
  abstract perimetro(): number;

  // 📌 [POLIMORFISMO] Método concreto en la abstracta que usa los abstractos: funciona para cualquier hija
  describir(): string {
    return `${this.nombre}: área ${this.area().toFixed(2)}, perímetro ${this.perimetro().toFixed(2)}`;
  }

  // 📌 [MÉTODO PROTECTED STATIC] Validación compartida que las hijas pueden usar
  protected static validarPositivo(...medidas: number[]): void {
    for (const m of medidas) {
      if (m <= 0) {
        throw new Error("Medida inválida");
      }
    }
  }
}

class Circulo extends Figura {
  private radio: number;

  constructor(radio: number) {
    super("Círculo");
    Figura.validarPositivo(radio);
    this.radio = radio;
  }

  // 📌 [IMPLEMENTACIÓN DE ABSTRACTO] Cada figura calcula a su manera
  area(): number {
    return Math.PI * this.radio * this.radio;
  }

  perimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

class Rectangulo extends Figura {
  private ancho: number;
  private alto: number;

  constructor(ancho: number, alto: number) {
    super("Rectángulo");
    Figura.validarPositivo(ancho, alto);
    this.ancho = ancho;
    this.alto = alto;
  }

  area(): number {
    return this.ancho * this.alto;
  }

  perimetro(): number {
    return 2 * (this.ancho + this.alto);
  }
}

class Triangulo extends Figura {
  private a: number;
  private b: number;
  private c: number;

  constructor(a: number, b: number, c: number) {
    super("Triángulo");
    Figura.validarPositivo(a, b, c);
    // 📌 [VALIDAR EN CONSTRUCTOR] Es imposible crear un triángulo que no cumpla la desigualdad triangular
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("Los lados no forman un triángulo");
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }

  // Fórmula de Herón
  area(): number {
    const s = this.perimetro() / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  perimetro(): number {
    return this.a + this.b + this.c;
  }
}

// 📌 [POLIMORFISMO] Recibe Figura[] y compara áreas sin saber qué figura es cada una
function figuraMayorArea(figuras: Figura[]): Figura {
  if (figuras.length === 0) {
    throw new Error("No hay figuras");
  }
  let mayor = figuras[0];
  for (const f of figuras) {
    if (f.area() > mayor.area()) {
      mayor = f;
    }
  }
  return mayor;
}

function areaTotal(figuras: Figura[]): number {
  return figuras.reduce((acc, f) => acc + f.area(), 0);
}

// Bloque de prueba
const figuras: Figura[] = [new Circulo(1), new Rectangulo(3, 4), new Triangulo(3, 4, 5)];
for (const f of figuras) {
  console.log(f.describir());
}
console.log(`Mayor área: ${figuraMayorArea(figuras).nombre}`);
console.log(`Área total: ${areaTotal(figuras).toFixed(2)}`);
try {
  new Triangulo(1, 2, 10);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  figuraMayorArea([]);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
// new Figura("x"); ❌ no compila: clase abstracta
