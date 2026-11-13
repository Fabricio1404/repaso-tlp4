const MULTA_POR_DIA = 500;
const MULTA_MAXIMA = 10000;

/**
 * Calcula la multa por devolver un libro con retraso.
 * Reglas: ver README, sección "Reglas de negocio" (R1, R2 y R3).
 */
export function calcularMulta(diasDeRetraso: number): number {
  return Math.min(diasDeRetraso * MULTA_POR_DIA, MULTA_MAXIMA);
}
