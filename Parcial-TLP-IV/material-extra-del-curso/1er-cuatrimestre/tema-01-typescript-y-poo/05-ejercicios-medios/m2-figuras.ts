// EJERCICIO M2 · Figuras — consigna en ENUNCIADOS.md

abstract class Figura {
  readonly nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // TODO: declarar area() y perimetro() de forma que las hijas estén OBLIGADAS a implementarlos

  describir(): string {
    throw new Error("TODO");
  }
}

class Circulo extends Figura {
  constructor(radio: number) {
    super("Círculo");
    // TODO
  }
  // TODO: area() y perimetro()
}

class Rectangulo extends Figura {
  constructor(ancho: number, alto: number) {
    super("Rectángulo");
    // TODO
  }
  // TODO: area() y perimetro()
}

class Triangulo extends Figura {
  constructor(a: number, b: number, c: number) {
    super("Triángulo");
    // TODO (incluye la validación de los lados)
  }
  // TODO: area() (Herón) y perimetro()
}

function figuraMayorArea(figuras: Figura[]): Figura {
  throw new Error("TODO");
}

function areaTotal(figuras: Figura[]): number {
  throw new Error("TODO");
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
