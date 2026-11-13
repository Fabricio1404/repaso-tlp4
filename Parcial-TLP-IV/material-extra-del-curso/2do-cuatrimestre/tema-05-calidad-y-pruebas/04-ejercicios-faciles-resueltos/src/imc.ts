/**
 * Calcula el índice de masa corporal (IMC) redondeado a 1 decimal.
 * Reglas: ver ENUNCIADOS.md (R1 y R2).
 */
export function calcularIMC(pesoKg: number, alturaM: number): number {
  if (!Number.isFinite(pesoKg) || pesoKg <= 0 || pesoKg > 300) {
    throw new RangeError('El peso debe estar entre 0 y 300 kg');
  }
  if (!Number.isFinite(alturaM) || alturaM <= 0 || alturaM > 2.5) {
    throw new RangeError('La altura debe estar entre 0 y 2.5 m');
  }
  return Math.round((pesoKg / (alturaM * alturaM)) * 10) / 10;
}

export type Clasificacion = 'bajo peso' | 'normal' | 'sobrepeso' | 'obesidad';

/** Clasifica un IMC. Reglas: R3. */
export function clasificarIMC(imc: number): Clasificacion {
  if (imc < 18.5) return 'bajo peso';
  // 📌 [DEFECTO CORREGIDO] Antes: imc > 25 (un IMC de 25 exacto daba "normal"). R3: "de 25 a menos de 30"
  if (imc >= 25 && imc < 30) return 'sobrepeso';
  if (imc >= 30) return 'obesidad';
  return 'normal';
}
