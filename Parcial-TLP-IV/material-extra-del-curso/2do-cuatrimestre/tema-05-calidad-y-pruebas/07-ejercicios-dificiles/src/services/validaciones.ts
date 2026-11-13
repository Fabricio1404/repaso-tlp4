import { ValidacionError } from '../errors';
import type { NuevoTurno } from '../models/turno';

/** Reglas R1, R2 y R3. */
export function validarNuevoTurno(datos: NuevoTurno): void {
  if (typeof datos.paciente !== 'string' || datos.paciente.trim() === '') {
    throw new ValidacionError('El paciente es obligatorio');
  }
  if (typeof datos.fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha)) {
    throw new ValidacionError('La fecha debe tener el formato AAAA-MM-DD');
  }
  if (typeof datos.hora !== 'string' || !/^\d{2}:\d{2}$/.test(datos.hora)) {
    throw new ValidacionError('La hora debe tener el formato HH:MM');
  }
  const [h, m] = datos.hora.split(':').map(Number);
  if (h < 8 || h > 20 || (m !== 0 && m !== 30)) {
    throw new ValidacionError('Los turnos son de 08:00 a 19:30, cada media hora');
  }
}
