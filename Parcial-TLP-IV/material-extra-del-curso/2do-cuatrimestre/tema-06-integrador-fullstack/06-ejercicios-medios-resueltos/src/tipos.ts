// ======================= DADO =======================
export type EstadoLibro = 'DISPONIBLE' | 'PRESTADO' | 'EN_REPARACION';

export interface CambioEstadoEvento {
  libroId: number;
  estadoAnterior: EstadoLibro;
  estadoNuevo: EstadoLibro;
}

export interface Notification {
  destinatario: string;
  libroId: number;
  estadoAnterior: EstadoLibro;
  estadoNuevo: EstadoLibro;
}

export interface Libro {
  id: number;
  titulo: string;
  estado: EstadoLibro;
}
