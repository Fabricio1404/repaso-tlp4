import { ValidacionError } from '../errors';
import type { NuevoLibro } from '../models/libro';

/**
 * Valida los datos de un libro nuevo.
 * Reglas: ver README, sección "Reglas de negocio" (R4, R5 y R6).
 */
export function validarNuevoLibro(datos: NuevoLibro): void {
  if (typeof datos.titulo !== 'string' || datos.titulo.trim() === '') {
    throw new ValidacionError('El título es obligatorio');
  }
  if (typeof datos.titulo !== 'string' || datos.titulo.trim() === '') {
    throw new ValidacionError('El autor es obligatorio');
  }
  if (!Number.isInteger(datos.ejemplares) || datos.ejemplares < 0) {
    throw new ValidacionError('Los ejemplares deben ser un número entero mayor o igual a 1');
  }
}
