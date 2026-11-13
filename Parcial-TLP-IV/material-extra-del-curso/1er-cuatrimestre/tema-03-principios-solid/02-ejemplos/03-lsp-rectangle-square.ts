// ============================================================================
// EJEMPLO 3 · LSP — Rectangle y Square (guía de la cátedra)
// Consigna: Square hereda de Rectangle pero cambia setWidth y setHeight, así que
// resizeRectangle obtiene un área de 100 en vez de 50. Eliminar la herencia y modelar
// un contrato común Shape.
// ============================================================================

// ------------------------------- ANTES -------------------------------------
class RectangleOriginal {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

// 📌 [LSP ✗ VIOLACIÓN] "Un cuadrado ES un rectángulo" en matemática, pero en código no se COMPORTA igual
class SquareOriginal extends RectangleOriginal {
  constructor(side: number) {
    super(side, side);
  }

  // 📌 [LSP ✗ POSTCONDICIÓN DEBILITADA] La base garantiza que setWidth cambia SOLO el ancho; la hija cambia también el alto
  override setWidth(width: number): void {
    this.width = width;
    this.height = width;
  }

  override setHeight(height: number): void {
    this.width = height;
    this.height = height;
  }
}

// 📌 [LSP ✗ LA FUNCIÓN CLIENTE] Espera un rectángulo y es "sorprendida" por la subclase
function resizeRectangleOriginal(rectangle: RectangleOriginal): void {
  rectangle.setWidth(5);
  rectangle.setHeight(10);
  console.log(`Area esperada: 50. Area obtenida: ${rectangle.area()}`);
}

// ------------------------------- DESPUÉS -----------------------------------
// 📌 [LSP ✓ CONTRATO COMÚN] Lo único que los dos pueden prometer de verdad: tener área
interface Shape {
  area(): number;
}

// 📌 [LSP ✓ SIN HERENCIA ENTRE ELLOS] Rectangle y Square son hermanos que cumplen Shape
class Rectangle implements Shape {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  private side: number;

  constructor(side: number) {
    this.side = side;
  }

  // 📌 [LSP ✓ OPERACIÓN PROPIA] El cuadrado tiene SU forma de cambiar de tamaño, sin fingir ser rectángulo
  setSide(side: number): void {
    this.side = side;
  }

  area(): number {
    return this.side * this.side;
  }
}

// 📌 [LSP ✓ TIPO PRECISO] Ahora solo acepta Rectangle: ya no puede recibir un Square por error
function resizeRectangle(rectangle: Rectangle): void {
  rectangle.setWidth(5);
  rectangle.setHeight(10);
  console.log(`Area esperada: 50. Area obtenida: ${rectangle.area()}`);
}

// 📌 [POLIMORFISMO SEGURO] Lo que sí sirve para todos: un Shape[]
function areaTotal(formas: Shape[]): number {
  return formas.reduce((acc, f) => acc + f.area(), 0);
}

// Bloque de prueba
resizeRectangleOriginal(new RectangleOriginal(1, 1)); // Area esperada: 50. Area obtenida: 50
resizeRectangleOriginal(new SquareOriginal(1)); // Area esperada: 50. Area obtenida: 100  ← el bug

resizeRectangle(new Rectangle(1, 1)); // Area esperada: 50. Area obtenida: 50
console.log(new Square(4).area()); // 16
console.log(areaTotal([new Rectangle(2, 3), new Square(4)])); // 22
// resizeRectangle(new Square(4)); ❌ no compila: Square no tiene setWidth/setHeight
