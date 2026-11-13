import type { NuevoProducto, Producto } from '../models/producto';

// 📌 [DIP - INTERFAZ DEL REPOSITORIO] El servicio depende de esto. En los tests se reemplaza por un falso
export interface ProductoRepository {
  listar(): Producto[];
  buscarPorId(id: number): Producto | undefined;
  guardar(datos: NuevoProducto): Producto;
  actualizar(producto: Producto): void;
}

// 📌 [FAKE] Implementación simplificada pero funcional (sin base de datos)
export class ProductoRepositoryEnMemoria implements ProductoRepository {
  private productos: Producto[];
  private proximoId: number;

  constructor(iniciales: Producto[] = []) {
    // 📌 [COPIA DEFENSIVA] Cada repositorio tiene sus propias copias: los tests no se pisan
    this.productos = iniciales.map((p) => ({ ...p }));
    this.proximoId = Math.max(0, ...this.productos.map((p) => p.id)) + 1;
  }

  listar(): Producto[] {
    return this.productos.map((p) => ({ ...p }));
  }

  buscarPorId(id: number): Producto | undefined {
    const p = this.productos.find((x) => x.id === id);
    return p ? { ...p } : undefined;
  }

  guardar(datos: NuevoProducto): Producto {
    const nuevo: Producto = { id: this.proximoId++, ...datos };
    this.productos.push(nuevo);
    return { ...nuevo };
  }

  actualizar(producto: Producto): void {
    const i = this.productos.findIndex((p) => p.id === producto.id);
    if (i !== -1) {
      this.productos[i] = { ...producto };
    }
  }
}
