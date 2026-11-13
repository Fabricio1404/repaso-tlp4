import { describe, expect, it } from 'vitest';
import { calcularCondicion } from '../src/condicion';

describe('Ej. 1 - calcularCondicion', () => {
  it('promociona con 8 y 9', () => {
    expect(calcularCondicion(8, 9)).toBe('promocionado');
  });

  it('promociona con 7 y 7', () => {
    expect(calcularCondicion(7, 7)).toBe('promocionado');
  });

  it('con 6 y 9 promociona (promedio 7.5 y ambas >= 6)', () => {
    expect(calcularCondicion(6, 9)).toBe('promocionado');
  });

  it('con 5 y 10 queda regular (una nota menor a 6)', () => {
    expect(calcularCondicion(5, 10)).toBe('regular');
  });

  it('con 4 y 4 queda libre', () => {
    expect(calcularCondicion(4, 4)).toBe('libre');
  });

  it('con 2 y 8 sin recuperatorio queda libre', () => {
    expect(calcularCondicion(2, 8)).toBe('libre');
  });

  it('el recuperatorio reemplaza la nota más baja: 2 y 8 con recuperatorio 9 promociona', () => {
    expect(calcularCondicion(2, 8, 9)).toBe('promocionado');
  });

  it('rechaza una nota 0', () => {
    expect(() => calcularCondicion(0, 8)).toThrow(RangeError);
  });

  it('rechaza una nota 11', () => {
    expect(() => calcularCondicion(11, 8)).toThrow(RangeError);
  });
});
