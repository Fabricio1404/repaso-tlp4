import { describe, expect, it } from 'vitest';
import { calcularPrecioFinal } from '../src/services/precios';

describe('calcularPrecioFinal', () => {
  it('aplica un descuento del 10 %', () => {
    expect(calcularPrecioFinal(1000, 10)).toBe(900);
  });

  it('conserva el precio si el descuento es cero', () => {
    expect(calcularPrecioFinal(1000, 0)).toBe(1000);
  });

  it('rechaza descuentos superiores al 100 %', () => {
    expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError);
  });

  it('con un descuento del 100 % el precio final es cero', () => {
    expect(calcularPrecioFinal(1000, 100)).toBe(0);
  });

  it('rechaza un precio negativo', () => {
    expect(() => calcularPrecioFinal(-1, 10)).toThrow(RangeError);
  });

  it('rechaza un descuento negativo', () => {
    expect(() => calcularPrecioFinal(1000, -5)).toThrow(RangeError);
  });
});
