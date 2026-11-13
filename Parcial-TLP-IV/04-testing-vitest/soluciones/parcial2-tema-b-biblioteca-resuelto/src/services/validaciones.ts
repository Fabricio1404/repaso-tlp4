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
  // CORRECCIÓN Ej. 2 (R5): el original volvía a validar datos.titulo (copiar y pegar),
  // así que un autor vacío pasaba sin error.
  if (typeof datos.autor !== 'string' || datos.autor.trim() === '') {
    throw new ValidacionError('El autor es obligatorio');
  }
  // CORRECCIÓN Ej. 2 (R6): el mínimo es 1. El original usaba "< 0" y aceptaba 0 ejemplares.
  if (!Number.isInteger(datos.ejemplares) || datos.ejemplares < 1) {
    throw new ValidacionError('Los ejemplares deben ser un número entero mayor o igual a 1');
  }
}
