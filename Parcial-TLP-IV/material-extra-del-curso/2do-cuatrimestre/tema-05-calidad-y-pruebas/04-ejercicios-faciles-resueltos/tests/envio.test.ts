import { describe, expect, it } from 'vitest';
import { calcularEnvio } from '../src/envio';

describe('calcularEnvio', () => {
  it('envío local de 2 kg cuesta la base', () => {
    expect(calcularEnvio(2, 'local')).toBe(1000);
  });

  it.each([
    ['local', 1000],
    ['provincial', 2500],
    ['nacional', 4000],
  ] as const)('base de la zona %s es $%d', (zona, base) => {
    expect(calcularEnvio(1, zona)).toBe(base);
  });

  // 📌 [CASOS LÍMITE DEL RECARGO] 5 kg sin recargo; 5.1 kg ya es "fracción" → +300; 6 kg → +300; 7 kg → +600
  it.each([
    [5, 1000],
    [5.1, 1300],
    [6, 1300],
    [7, 1600],
  ])('local con %d kg cuesta $%d', (kilos, esperado) => {
    expect(calcularEnvio(kilos, 'local')).toBe(esperado);
  });

  it.each([0, -1, Number.NaN])('rechaza %d kilos', (kilos) => {
    expect(() => calcularEnvio(kilos, 'nacional')).toThrow(RangeError);
  });
});
