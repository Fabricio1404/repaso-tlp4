const PORCENTAJE_JUBILADO = 0.2;
const DESCUENTO_MAXIMO = 5000;

/**
 * Calcula el descuento para jubilados.
 * Reglas: ver README, sección "Reglas de negocio" (R1, R2 y R3).
 */
export function calcularDescuento(edad: number, monto: number): number {
  if (!Number.isFinite(monto) || monto < 0) {
    throw new RangeError('El monto debe ser un número mayor o igual a 0');
  }
  if (edad > 65) {
    return Math.min(monto * PORCENTAJE_JUBILADO, DESCUENTO_MAXIMO);
  }
  return 0;
}
