import { describe, expect, it } from 'vitest';
import { calcularIMC, clasificarIMC } from '../src/imc';

describe('calcularIMC', () => {
  // 📌 [CASO HABITUAL]
  it('calcula el IMC de 70 kg y 1.75 m', () => {
    expect(calcularIMC(70, 1.75)).toBe(22.9);
  });

  // 📌 [CASOS LÍMITE] 300 kg y 2.5 m son válidos (inclusive)
  it('acepta el peso máximo de 300 kg', () => {
    expect(calcularIMC(300, 2)).toBe(75);
  });

  it('acepta la altura máxima de 2.5 m', () => {
    expect(calcularIMC(100, 2.5)).toBe(16);
  });

  // 📌 [CASOS INVÁLIDOS CON IT.EACH] Justo afuera de los bordes, cero, negativos y NaN
  it.each([
    ['peso 0', 0, 1.7],
    ['peso negativo', -5, 1.7],
    ['peso mayor a 300', 300.1, 1.7],
    ['peso NaN', Number.NaN, 1.7],
    ['altura 0', 70, 0],
    ['altura mayor a 2.5', 70, 2.51],
  ])('rechaza %s con RangeError', (_caso, peso, altura) => {
    expect(() => calcularIMC(peso, altura)).toThrow(RangeError);
  });
});

describe('clasificarIMC', () => {
  // 📌 [CASOS HABITUALES] Uno por categoría
  it.each([
    [16, 'bajo peso'],
    [22, 'normal'],
    [27, 'sobrepeso'],
    [35, 'obesidad'],
  ] as const)('IMC %d es "%s"', (imc, esperado) => {
    expect(clasificarIMC(imc)).toBe(esperado);
  });

  // 📌 [CASOS LÍMITE] Cada borde y el valor justo debajo. El de 25 reveló el defecto
  it.each([
    [18.4, 'bajo peso'],
    [18.5, 'normal'],
    [24.9, 'normal'],
    [25, 'sobrepeso'],
    [29.9, 'sobrepeso'],
    [30, 'obesidad'],
  ] as const)('borde: IMC %d es "%s"', (imc, esperado) => {
    expect(clasificarIMC(imc)).toBe(esperado);
  });
});
