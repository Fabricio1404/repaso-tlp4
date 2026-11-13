// ============================================================================
// EJEMPLO 1 · ABSTRACCIÓN (clase Producto) — tomado de la guía de la cátedra
// Consigna: modelar un Producto con nombre, precio, categoria y stock, y los
// métodos describir(), hayStock(cantidad), venderUnidades(cantidad) y
// aplicarDescuento(porcentaje) (devuelve el precio final sin modificar el original).
// Ejecutar: node tema-01-typescript-y-poo/02-ejemplos/01-abstraccion-producto.ts
// ============================================================================

// 📌 [CLASE] La clase es el molde: define qué datos y qué comportamiento tendrá cada producto
class Producto {
  // 📌 [ABSTRACCIÓN] Solo los datos relevantes para VENDER. Se descartan detalles irrelevantes (color del embalaje, proveedor del cartón...)
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;

  // 📌 [CONSTRUCTOR FORMA LARGA] Se declara el atributo arriba y acá se asigna con this. (sin parameter properties)
  constructor(nombre: string, precio: number, categoria: string, stock: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

  // 📌 [MÉTODO] Devuelve un string (return), NO imprime: quien llama decide qué hacer con el texto
  describir(): string {
    return `${this.nombre} (${this.categoria}): $${this.precio} — ${this.stock} unidades`;
  }

  // 📌 [ABSTRACCIÓN] La regla "hay stock" vive en UN solo lugar y tiene un nombre claro; quien llama no necesita saber el cómo
  hayStock(cantidad: number): boolean {
    return cantidad > 0 && cantidad <= this.stock;
  }

  venderUnidades(cantidad: number): void {
    // 📌 [REUTILIZACIÓN] venderUnidades reutiliza hayStock en vez de repetir la condición
    if (!this.hayStock(cantidad)) {
      // 📌 [ERRORES] Se lanza un Error en vez de imprimir: quien llama no puede ignorar el fallo
      throw new Error(`No hay stock suficiente de ${this.nombre}`);
    }
    this.stock = this.stock - cantidad;
  }

  // 📌 [SIN EFECTOS SECUNDARIOS] Solo calcula y devuelve: NO hace this.precio = ... porque el descuento es una simulación
  aplicarDescuento(porcentaje: number): number {
    return this.precio - (this.precio * porcentaje) / 100;
  }
}

// 📌 [BLOQUE DE PRUEBA] Regla del examen: cada archivo termina mostrando la salida por consola
const teclado = new Producto("Teclado", 10000, "electrónica", 5);
console.log(teclado.describir()); // Teclado (electrónica): $10000 — 5 unidades
teclado.venderUnidades(3);
console.log(teclado.describir()); // Teclado (electrónica): $10000 — 2 unidades
console.log(teclado.aplicarDescuento(10)); // 9000
console.log(teclado.precio); // 10000 (no cambió)

try {
  teclado.venderUnidades(50);
} catch (e) {
  // 📌 [NARROWING] En strict, e es unknown: con instanceof Error TS sabe que tiene .message
  if (e instanceof Error) {
    console.log(`Error: ${e.message}`); // Error: No hay stock suficiente de Teclado
  }
}
