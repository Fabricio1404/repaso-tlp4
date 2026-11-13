const MULTA_POR_DIA = 500;
const MULTA_MAXIMA = 10000;

/**
 * Calcula la multa por devolver un libro con retraso.
 * Reglas: ver README, sección "Reglas de negocio" (R1, R2 y R3).
 */
export function calcularMulta(diasDeRetraso: number): number {
  // 📌 [EJ1 · CORRECCIÓN EN EL CÓDIGO - R3] Faltaba validar: entero >= 0, si no RangeError. 0 es VÁLIDO (multa $0)
  if (!Number.isInteger(diasDeRetraso) || diasDeRetraso < 0) {
    throw new RangeError('Los días de retraso deben ser un número entero mayor o igual a 0');
  }
  // R1 ($500 por día) y R2 (tope $10.000)
  return Math.min(diasDeRetraso * MULTA_POR_DIA, MULTA_MAXIMA);
}
