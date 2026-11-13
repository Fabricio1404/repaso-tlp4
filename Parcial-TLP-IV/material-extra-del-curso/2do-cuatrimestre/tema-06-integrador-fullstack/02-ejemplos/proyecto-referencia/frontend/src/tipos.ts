export type EstadoLibro = 'DISPONIBLE' | 'PRESTADO' | 'EN_REPARACION';
export const ESTADOS: EstadoLibro[] = ['DISPONIBLE', 'PRESTADO', 'EN_REPARACION'];
export type NombreRol = 'admin' | 'operador' | 'usuario';

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  estado: EstadoLibro;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: NombreRol;
}

export interface Sesion {
  token: string;
  usuario: Usuario;
  permisos: string[];
}

export interface Notificacion {
  id: number;
  libroId: number;
  mensaje: string;
  leida: boolean;
  fecha: string;
}
