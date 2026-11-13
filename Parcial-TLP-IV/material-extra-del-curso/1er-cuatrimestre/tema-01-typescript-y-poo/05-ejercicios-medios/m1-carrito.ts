// EJERCICIO M1 · Carrito de compras — consigna en ENUNCIADOS.md
// Completá atributos, constructores y métodos. Reemplazá cada throw new Error("TODO").

interface Producto {
  readonly codigo: string;
  nombre: string;
  precio: number;
}

type Cupon = "DESC10" | "DESC20";

class ItemCarrito {
  // TODO: atributos

  constructor(producto: Producto, cantidad: number) {
    // TODO
  }

  get subtotal(): number {
    throw new Error("TODO");
  }
}

class Carrito {
  // TODO: atributos

  constructor() {
    // TODO
  }

  agregar(producto: Producto, cantidad: number): void {
    throw new Error("TODO");
  }

  quitar(codigo: string): void {
    throw new Error("TODO");
  }

  get total(): number {
    throw new Error("TODO");
  }

  get cantidadDeItems(): number {
    throw new Error("TODO");
  }

  aplicarCupon(cupon: Cupon): void {
    throw new Error("TODO");
  }

  get totalConDescuento(): number {
    throw new Error("TODO");
  }

  listar(): string[] {
    throw new Error("TODO");
  }
}

// Bloque de prueba
const yerba: Producto = { codigo: "Y1", nombre: "Yerba", precio: 3000 };
const cafe: Producto = { codigo: "C1", nombre: "Café", precio: 5000 };
const carrito = new Carrito();
carrito.agregar(yerba, 2);
carrito.agregar(cafe, 1);
carrito.agregar(yerba, 1);
console.log(carrito.listar());
console.log(carrito.cantidadDeItems, carrito.total);
carrito.aplicarCupon("DESC20");
console.log(carrito.totalConDescuento);
carrito.quitar("C1");
console.log(carrito.total, carrito.totalConDescuento);
try {
  carrito.quitar("ZZ");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  carrito.agregar(cafe, 0);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
const otro = new Carrito();
otro.agregar(cafe, 1);
try {
  otro.aplicarCupon("DESC20");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
