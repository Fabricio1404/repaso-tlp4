export type Zona = 'local' | 'provincial' | 'nacional';

const BASE: Record<Zona, number> = { local: 1000, provincial: 2500, nacional: 4000 };

/** Calcula el costo de envío. Reglas: R5 y R6. */
export function calcularEnvio(kilos: number, zona: Zona): number {
  if (!Number.isFinite(kilos) || kilos <= 0) {
    throw new RangeError('Los kilos deben ser mayores a 0');
  }
  const extra = kilos > 5 ? Math.ceil(kilos - 5) * 300 : 0;
  return BASE[zona] + extra;
}
