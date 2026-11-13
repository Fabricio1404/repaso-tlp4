export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  ejemplares: number;
}

export type NuevoLibro = Omit<Libro, 'id'>;
