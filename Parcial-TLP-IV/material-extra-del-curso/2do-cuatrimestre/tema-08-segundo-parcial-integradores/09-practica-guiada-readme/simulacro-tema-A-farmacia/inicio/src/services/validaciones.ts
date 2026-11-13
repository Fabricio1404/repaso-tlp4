import { ValidacionError } from '../errors';
import type { NuevoMedicamento } from '../models/medicamento';

/**
 * Valida los datos de un medicamento nuevo.
 * Reglas: ver README, sección "Reglas de negocio" (R4, R5 y R6).
 */
export function validarNuevoMedicamento(datos: NuevoMedicamento): void {
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    throw new ValidacionError('El nombre es obligatorio');
  }
  if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
    throw new ValidacionError('El precio debe ser mayor a 0');
  }
  if (typeof datos.stock !== 'number' || datos.stock < 0) {
    throw new ValidacionError('El stock debe ser un número entero mayor o igual a 0');
  }
}
