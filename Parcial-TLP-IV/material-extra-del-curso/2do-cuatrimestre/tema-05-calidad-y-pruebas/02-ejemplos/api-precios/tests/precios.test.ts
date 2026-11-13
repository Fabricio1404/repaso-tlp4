import { describe, expect, it } from 'vitest';
import { calcularPrecioFinal } from '../src/services/precios';

// 📌 [PRUEBA UNITARIA] Llama a la función directamente, sin HTTP
describe('calcularPrecioFinal', () => {
  // 📌 [CASO HABITUAL]
  it('aplica un descuento del 10 %', () => {
    expect(calcularPrecioFinal(1000, 10)).toBe(900);
  });

  // 📌 [CASO LÍMITE] Borde inferior del descuento
  it('conserva el precio si el descuento es cero', () => {
    expect(calcularPrecioFinal(1000, 0)).toBe(1000);
  });

  // 📌 [CASO INVÁLIDO + TOTHROW CON FUNCIÓN] La flecha es obligatoria: si se llamara directo, el error saltaría antes de que Vitest lo vea
  it('rechaza descuentos superiores al 100 %', () => {
    expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError);
  });

  // 📌 [CASO LÍMITE] Borde superior
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
