import type { Clase } from '../models/clase';

// Puerto: la capa de servicio depende de esta interfaz, no de una implementación concreta.
export interface ClaseRepository {
  listar(): Clase[];
  buscarPorId(id: number): Clase | undefined;
  actualizar(clase: Clase): void;
}

// Implementación en memoria (no hay base de datos en este proyecto).
export class ClaseRepositoryEnMemoria implements ClaseRepository {
  private clases: Clase[];

  constructor(iniciales: Clase[] = []) {
    this.clases = iniciales.map((c) => ({ ...c }));
  }

  listar(): Clase[] {
    return this.clases.map((c) => ({ ...c }));
  }

  buscarPorId(id: number): Clase | undefined {
    const clase = this.clases.find((c) => c.id === id);
    return clase ? { ...clase } : undefined;
  }

  actualizar(clase: Clase): void {
    const indice = this.clases.findIndex((c) => c.id === clase.id);
    if (indice !== -1) {
      this.clases[indice] = { ...clase };
    }
  }
}
