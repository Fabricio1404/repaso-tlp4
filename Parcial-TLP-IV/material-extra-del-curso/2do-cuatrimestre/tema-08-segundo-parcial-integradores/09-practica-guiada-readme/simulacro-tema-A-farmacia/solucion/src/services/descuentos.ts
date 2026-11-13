const PORCENTAJE_JUBILADO = 0.2;
const DESCUENTO_MAXIMO = 5000;

/**
 * Calcula el descuento para jubilados.
 * Reglas: ver README, sección "Reglas de negocio" (R1, R2 y R3).
 */
export function calcularDescuento(edad: number, monto: number): number {
  // 📌 [EJ1 · CÓDIGO - R3] Faltaba validar la edad (entero de 0 a 120)
  if (!Number.isInteger(edad) || edad < 0 || edad > 120) {
    throw new RangeError('La edad debe ser un entero entre 0 y 120');
  }
  if (!Number.isFinite(monto) || monto < 0) {
    throw new RangeError('El monto debe ser un número mayor o igual a 0');
  }
  // 📌 [EJ1 · CÓDIGO - R1] Antes: edad > 65. R1 dice "65 años o más"
  if (edad >= 65) {
    return Math.min(monto * PORCENTAJE_JUBILADO, DESCUENTO_MAXIMO);
  }
  return 0;
}
