import { describe, expect, it } from 'vitest';
import { StockInsuficienteError, ValidacionError } from '../src/errors';
import { MedicamentoRepositoryEnMemoria } from '../src/repositories/medicamento.repository';
import { MedicamentoService } from '../src/services/medicamento.service';
import { calcularDescuento } from '../src/services/descuentos';

describe('Ej. 1 - calcularDescuento', () => {
  it('70 años con $10.000 tiene $2.000 de descuento', () => {
    expect(calcularDescuento(70, 10000)).toBe(2000);
  });

  it('65 años ya tiene descuento', () => {
    expect(calcularDescuento(65, 10000)).toBe(2000);
  });

  it('64 años no tiene descuento', () => {
    expect(calcularDescuento(64, 10000)).toBe(0);
  });

  it('el descuento nunca supera $5.000', () => {
    expect(calcularDescuento(80, 100000)).toBe(5000);
  });

  it('rechaza una edad negativa', () => {
    expect(() => calcularDescuento(-1, 10000)).toThrow(RangeError);
  });

  // 📌 [EJ1 · TEST - R3] "con monto $0 el descuento es $0": 0 es válido
  it('con un monto de $0 el descuento es $0', () => {
    expect(calcularDescuento(70, 0)).toBe(0);
  });
});

describe('Ej. 1 - MedicamentoService.vender', () => {
  const crearServicio = () =>
    new MedicamentoService(
      new MedicamentoRepositoryEnMemoria([{ id: 1, nombre: 'Ibuprofeno', laboratorio: 'Bagó', precio: 3500, stock: 10 }]),
    );

  it('descuenta las unidades vendidas', () => {
    expect(crearServicio().vender(1, 4).stock).toBe(6);
  });

  it('rechaza vender más unidades que el stock', () => {
    expect(() => crearServicio().vender(1, 11)).toThrow(StockInsuficienteError);
  });

  // 📌 [EJ1 · TEST - R7] Cantidad 0 es un dato inválido → ValidacionError, no falta de stock
  it('rechaza vender 0 unidades', () => {
    expect(() => crearServicio().vender(1, 0)).toThrow(ValidacionError);
  });
});
