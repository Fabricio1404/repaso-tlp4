// Punto de partida del dominio (podés ajustarlo).
export type EstadoEquipo = 'DISPONIBLE' | 'EN_USO' | 'EN_MANTENIMIENTO';
export type NombreRol = 'admin' | 'operador' | 'usuario';

export interface Equipo {
  id: number;
  nombre: string;
  ubicacion: string;
  estado: EstadoEquipo;
}

export interface CambioEstadoEvento {
  equipoId: number;
  estadoAnterior: EstadoEquipo;
  estadoNuevo: EstadoEquipo;
}
