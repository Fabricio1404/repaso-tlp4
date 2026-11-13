import { ValidacionError } from '../errors';
import type { NuevoSocio } from '../models/clase';

/**
 * Valida los datos de un socio nuevo.
 * Reglas: ver README, sección "Reglas de negocio" (R4, R5 y R6).
 */
export function validarNuevoSocio(datos: NuevoSocio): void {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    throw new ValidacionError('El nombre es obligatorio');
  }
  if (typeof datos.email !== 'string' || datos.email.trim() === '') {
    throw new ValidacionError('El email es obligatorio y debe contener @');
  }
  if (!Number.isInteger(datos.edad) || datos.edad < 16 || datos.edad >= 90) {
    throw new ValidacionError('La edad debe ser un número entero entre 16 y 90');
  }
}
