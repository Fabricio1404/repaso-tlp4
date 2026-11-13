const MULTA_POR_DIA = 500;
const MULTA_MAXIMA = 10000;

/**
 * Calcula la multa por devolver un libro con retraso.
 * Reglas: ver README, sección "Reglas de negocio" (R1, R2 y R3).
 */
export function calcularMulta(diasDeRetraso: number): number {
  // CORRECCIÓN Ej. 1 (R3): los días deben ser un entero >= 0; si no, RangeError.
  // Number.isInteger rechaza decimales, NaN e Infinity.
  if (!Number.isInteger(diasDeRetraso) || diasDeRetraso < 0) {
    throw new RangeError('Los días de retraso deben ser un número entero mayor o igual a 0');
  }
  return Math.min(diasDeRetraso * MULTA_POR_DIA, MULTA_MAXIMA);
}
