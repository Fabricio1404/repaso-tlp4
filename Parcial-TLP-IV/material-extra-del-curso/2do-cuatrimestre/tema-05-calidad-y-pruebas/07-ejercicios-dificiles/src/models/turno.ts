export type EstadoTurno = 'reservado' | 'cancelado';

export interface Turno {
  id: number;
  paciente: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  estado: EstadoTurno;
}

export type NuevoTurno = Pick<Turno, 'paciente' | 'fecha' | 'hora'>;
