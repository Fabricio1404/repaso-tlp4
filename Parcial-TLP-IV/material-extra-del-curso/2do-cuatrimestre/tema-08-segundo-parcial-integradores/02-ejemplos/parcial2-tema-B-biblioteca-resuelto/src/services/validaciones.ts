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
  // 📌 [EJ2 · DEFECTO 1 - R5] Antes volvía a validar datos.titulo (copiar y pegar): un autor vacío pasaba
  if (typeof datos.autor !== 'string' || datos.autor.trim() === '') {
    throw new ValidacionError('El autor es obligatorio');
  }
  // 📌 [EJ2 · DEFECTO 2 - R6] Antes: ejemplares < 0 (aceptaba 0). R6: entero mayor o igual a 1
  if (!Number.isInteger(datos.ejemplares) || datos.ejemplares < 1) {
    throw new ValidacionError('Los ejemplares deben ser un número entero mayor o igual a 1');
  }
}
