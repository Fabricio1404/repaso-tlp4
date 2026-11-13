export type EstadoLibro = 'DISPONIBLE' | 'PRESTADO' | 'EN_REPARACION';
export const ESTADOS_LIBRO: readonly EstadoLibro[] = ['DISPONIBLE', 'PRESTADO', 'EN_REPARACION'];

export type NombreRol = 'admin' | 'operador' | 'usuario';
export const ROLES: readonly NombreRol[] = ['admin', 'operador', 'usuario'];

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  estado: EstadoLibro;
}

export type DatosLibro = Pick<Libro, 'titulo' | 'autor'>;

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  rol: NombreRol;
}

export type UsuarioPublico = Omit<Usuario, 'passwordHash'>;

export interface CambioEstadoEvento {
  libroId: number;
  estadoAnterior: EstadoLibro;
  estadoNuevo: EstadoLibro;
}

// Lo que recibe cada canal (INotifier.send)
export interface Notification {
  destinatario: string;
  libroId: number;
  estadoAnterior: EstadoLibro;
  estadoNuevo: EstadoLibro;
}

// Una notificación in-app ya guardada en la base
export interface NotificacionGuardada {
  id: number;
  destinatario: string;
  libroId: number;
  mensaje: string;
  leida: boolean;
  fecha: string;
}
