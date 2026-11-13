import { ValidacionError } from '../errors';
import type { NuevoProducto } from '../models/producto';

// 📌 [FUNCIÓN PURA] Fácil de probar unitariamente: entra un dato, lanza o no lanza
export function validarNuevoProducto(datos: NuevoProducto): void {
  // 📌 [TYPEOF EN EJECUCIÓN] Los datos vienen de HTTP: TypeScript no garantiza nada en ejecución
  if (typeof datos.nombre !== 'string' || datos.nombre.trim() === '') {
    throw new ValidacionError('El nombre es obligatorio');
  }
  if (!Number.isFinite(datos.precio) || datos.precio <= 0) {
    throw new ValidacionError('El precio debe ser mayor a 0');
  }
  if (!Number.isInteger(datos.stock) || datos.stock < 0) {
    throw new ValidacionError('El stock debe ser un entero mayor o igual a 0');
  }
}
