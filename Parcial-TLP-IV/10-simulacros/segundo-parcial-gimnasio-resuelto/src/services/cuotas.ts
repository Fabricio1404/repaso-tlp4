const CUOTA_BASE = 20000;
const DESCUENTO_POR_ANIO = 0.05;
const DESCUENTO_MAXIMO = 0.25;

/**
 * Calcula la cuota mensual de un socio según su antigüedad.
 * Reglas: ver README, sección "Reglas de negocio" (R1, R2 y R3).
 */
export function calcularCuota(aniosDeAntiguedad: number): number {
  if (!Number.isInteger(aniosDeAntiguedad) || aniosDeAntiguedad < 0) {
    throw new RangeError('La antigüedad debe ser un número entero mayor o igual a 0');
  }
  const descuento = Math.min(aniosDeAntiguedad * DESCUENTO_POR_ANIO, DESCUENTO_MAXIMO);
  return Math.round(CUOTA_BASE * (1 - descuento));
}
