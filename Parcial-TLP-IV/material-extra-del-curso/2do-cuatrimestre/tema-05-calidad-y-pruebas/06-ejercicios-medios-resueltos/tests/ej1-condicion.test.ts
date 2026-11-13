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

  // 📌 [ERROR EN EL TEST - R3] Con 4 y 4 ambas notas son >= 4: queda REGULAR, no libre. Se corrigió la expectativa
  it('con 4 y 4 queda regular', () => {
    expect(calcularCondicion(4, 4)).toBe('regular');
  });

  it('con 2 y 8 sin recuperatorio queda libre', () => {
    expect(calcularCondicion(2, 8)).toBe('libre');
  });

  // 📌 [ERROR EN EL TEST - R4] Quien recupera NO puede promocionar: como máximo queda regular. Se corrigió la expectativa
  it('el recuperatorio reemplaza la nota más baja: 2 y 8 con recuperatorio 9 queda regular', () => {
    expect(calcularCondicion(2, 8, 9)).toBe('regular');
  });

  // 📌 [CASO AGREGADO] El recuperatorio también puede dejar libre si no alcanza
  it('2 y 8 con recuperatorio 3 queda libre', () => {
    expect(calcularCondicion(2, 8, 3)).toBe('libre');
  });

  it('rechaza una nota 0', () => {
    expect(() => calcularCondicion(0, 8)).toThrow(RangeError);
  });

  it('rechaza una nota 11', () => {
    expect(() => calcularCondicion(11, 8)).toThrow(RangeError);
  });
});
