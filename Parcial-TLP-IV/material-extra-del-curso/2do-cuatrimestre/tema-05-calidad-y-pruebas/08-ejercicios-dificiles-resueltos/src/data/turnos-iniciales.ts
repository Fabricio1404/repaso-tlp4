import type { Turno } from '../models/turno';

export const turnosIniciales: Turno[] = [
  { id: 1, paciente: 'Ana Pérez', fecha: '2026-03-10', hora: '09:00', estado: 'reservado' },
  { id: 2, paciente: 'Beto Gómez', fecha: '2026-03-10', hora: '09:30', estado: 'reservado' },
  { id: 3, paciente: 'Caro Díaz', fecha: '2026-03-11', hora: '10:00', estado: 'cancelado' },
];
