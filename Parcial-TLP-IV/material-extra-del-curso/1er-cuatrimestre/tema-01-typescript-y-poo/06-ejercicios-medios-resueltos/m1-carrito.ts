// RESOLUCIÓN M1 · Carrito de compras (composición, copia defensiva, unión de literales)

// 📌 [INTERFACE PARA DATOS] El producto es un dato simple, sin comportamiento
interface Producto {
  readonly codigo: string;
  nombre: string;
  precio: number;
}

// 📌 [UNIÓN DE LITERALES] Reemplaza al enum prohibido: un cupón mal escrito no compila
type Cupon = "DESC10" | "DESC20";

class ItemCarrito {
  // 📌 [AGREGACIÓN] El producto existe por fuera del carrito; el ítem solo lo referencia
  readonly producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  get subtotal(): number {
    return this.producto.precio * this.cantidad;
  }
}

class Carrito {
  // 📌 [COMPOSICIÓN] El carrito crea y administra sus ítems; nadie de afuera hace new ItemCarrito
  private items: ItemCarrito[];
  private porcentajeDescuento: number;

  constructor() {
    this.items = [];
    this.porcentajeDescuento = 0;
  }

  agregar(producto: Producto, cantidad: number): void {
    // 📌 [VALIDACIÓN] Number.isInteger también rechaza NaN y decimales
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("Cantidad inválida");
    }
    // 📌 [BUSCAR ANTES DE AGREGAR] Si el producto ya está, se suma la cantidad (no se duplica el ítem)
    const existente = this.items.find((i) => i.producto.codigo === producto.codigo);
    if (existente !== undefined) {
      existente.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }
  }

  quitar(codigo: string): void {
    const indice = this.items.findIndex((i) => i.producto.codigo === codigo);
    if (indice === -1) {
      throw new Error(`No existe el producto ${codigo}`);
    }
    // 📌 [SPLICE] Quita 1 elemento en la posición indice
    this.items.splice(indice, 1);
  }

  // 📌 [DELEGACIÓN] El carrito no multiplica precios: le pide el subtotal a cada ítem
  get total(): number {
    return this.items.reduce((acc, i) => acc + i.subtotal, 0);
  }

  get cantidadDeItems(): number {
    return this.items.reduce((acc, i) => acc + i.cantidad, 0);
  }

  aplicarCupon(cupon: Cupon): void {
    if (cupon === "DESC20" && this.total < 10000) {
      throw new Error("DESC20 requiere un total de al menos $10000");
    }
    this.porcentajeDescuento = cupon === "DESC10" ? 10 : 20;
  }

  get totalConDescuento(): number {
    return this.total - (this.total * this.porcentajeDescuento) / 100;
  }

  // 📌 [COPIA DEFENSIVA] Devuelve textos nuevos: la lista interna nunca sale de la clase
  listar(): string[] {
    return this.items.map((i) => `${i.producto.nombre} x${i.cantidad} = $${i.subtotal}`);
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
