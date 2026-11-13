import { describe, expect, it } from 'vitest';
import { calcularIMC, clasificarIMC } from '../src/imc';

describe('calcularIMC', () => {
  // Caso habitual (dado como ejemplo)
  it('calcula el IMC de 70 kg y 1.75 m', () => {
    expect(calcularIMC(70, 1.75)).toBe(22.9);
  });

  it.todo('casos límite de R1 y R2');
  it.todo('casos inválidos de R1 y R2');
});

describe('clasificarIMC', () => {
  it.todo('un caso habitual de cada categoría');
  it.todo('casos límite de R3 (los bordes exactos de cada categoría)');
});
