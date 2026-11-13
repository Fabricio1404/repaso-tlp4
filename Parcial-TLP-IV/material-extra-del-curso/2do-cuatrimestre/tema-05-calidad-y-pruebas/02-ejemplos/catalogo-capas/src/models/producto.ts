export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

// 📌 [TIPO UTILITARIO OMIT] Un producto nuevo es igual a Producto pero sin id (lo asigna el repositorio)
export type NuevoProducto = Omit<Producto, 'id'>;
