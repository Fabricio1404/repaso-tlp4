// Ejercicio 4 · Figuras (interface, implements, polimorfismo con interfaces, readonly)

interface Figura {
  readonly nombre: string;
  area(): number;
  perimetro(): number;
}

class Circulo implements Figura {
  readonly nombre: string;
  private radio: number;

  constructor(radio: number) {
    if (radio <= 0) throw new RangeError("El radio debe ser positivo");
    this.nombre = "Círculo";
    this.radio = radio;
  }

  area(): number {
    return Math.PI * this.radio ** 2;
  }

  perimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

class Rectangulo implements Figura {
  readonly nombre: string;
  private base: number;
  private altura: number;

  constructor(base: number, altura: number) {
    if (base <= 0 || altura <= 0) throw new RangeError("Las medidas deben ser positivas");
    this.nombre = "Rectángulo";
    this.base = base;
    this.altura = altura;
  }

  area(): number {
    return this.base * this.altura;
  }

  perimetro(): number {
    return 2 * (this.base + this.altura);
  }
}

class Triangulo implements Figura {
  readonly nombre: string;
  private a: number;
  private b: number;
  private c: number;

  constructor(a: number, b: number, c: number) {
    // Desigualdad triangular: cada lado debe ser menor que la suma de los otros dos
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new RangeError("Esos lados no forman un triángulo");
    }
    this.nombre = "Triángulo";
    this.a = a;
    this.b = b;
    this.c = c;
  }

  area(): number {
    const s = this.perimetro() / 2;   // fórmula de Herón
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  perimetro(): number {
    return this.a + this.b + this.c;
  }
}

// Funciones que trabajan con la INTERFACE, no con las clases concretas
function describir(f: Figura): string {
  return `${f.nombre}: área ${f.area().toFixed(2)}, perímetro ${f.perimetro().toFixed(2)}`;
}

function mayorArea(figuras: Figura[]): Figura | undefined {
  let mayor: Figura | undefined = undefined;
  for (const f of figuras) {
    if (mayor === undefined || f.area() > mayor.area()) mayor = f;
  }
  return mayor;
}

// ---------------- Bloque de prueba ----------------
const figuras: Figura[] = [new Circulo(2), new Rectangulo(3, 4), new Triangulo(3, 4, 5)];

for (const f of figuras) {
  console.log(describir(f));
}

const mayor = mayorArea(figuras);
if (mayor !== undefined) console.log(`La de mayor área es: ${mayor.nombre}`);

try {
  new Triangulo(1, 2, 10);
} catch (e) {
  if (e instanceof RangeError) console.log(`Error: ${e.message}`);
}
