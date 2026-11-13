// 📌 [UNIÓN DE LITERALES] Estados del libro sin enum de TypeScript
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

// 📌 [TIPO PÚBLICO] Lo que se devuelve por la API: nunca el hash de la contraseña
export type UsuarioPublico = Omit<Usuario, 'passwordHash'>;

// 📌 [EVENTO DEL OBSERVER] Lo que el Subject le pasa a cada observer
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
