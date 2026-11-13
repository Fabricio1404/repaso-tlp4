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
  // 📌 [EJ2 · DEFECTO 1 - R5] Faltaba por completo la validación del laboratorio
  if (typeof datos.laboratorio !== 'string' || datos.laboratorio.trim() === '') {
    throw new ValidacionError('El laboratorio es obligatorio');
  }
  if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
    throw new ValidacionError('El precio debe ser mayor a 0');
  }
  // 📌 [EJ2 · DEFECTO 2 - R6] Antes: typeof number (aceptaba 2.5 y NaN). R6: entero
  if (!Number.isInteger(datos.stock) || datos.stock < 0) {
    throw new ValidacionError('El stock debe ser un número entero mayor o igual a 0');
  }
}
