import type { Libro, NuevoLibro } from '../models/libro';

// Puerto: la capa de servicio depende de esta interfaz, no de una implementación concreta.
export interface LibroRepository {
  listar(): Libro[];
  buscarPorId(id: number): Libro | undefined;
  guardar(datos: NuevoLibro): Libro;
  actualizar(libro: Libro): void;
}

// Implementación en memoria (no hay base de datos en este proyecto).
export class LibroRepositoryEnMemoria implements LibroRepository {
  private libros: Libro[];
  private proximoId: number;

  constructor(iniciales: Libro[] = []) {
    this.libros = iniciales.map((l) => ({ ...l }));
    this.proximoId = Math.max(0, ...this.libros.map((l) => l.id)) + 1;
  }

  listar(): Libro[] {
    return this.libros.map((l) => ({ ...l }));
  }

  buscarPorId(id: number): Libro | undefined {
    const libro = this.libros.find((l) => l.id === id);
    return libro ? { ...libro } : undefined;
  }

  guardar(datos: NuevoLibro): Libro {
    const nuevo: Libro = { id: this.proximoId++, ...datos };
    this.libros.push(nuevo);
    return { ...nuevo };
  }

  actualizar(libro: Libro): void {
    const indice = this.libros.findIndex((l) => l.id === libro.id);
    if (indice !== -1) {
      this.libros[indice] = { ...libro };
    }
  }
}
