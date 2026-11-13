import { describe, expect, it } from 'vitest';
import { EjemplaresInsuficientesError } from '../src/errors';
import { LibroRepositoryEnMemoria } from '../src/repositories/libro.repository';
import { LibroService } from '../src/services/libro.service';
import { calcularMulta } from '../src/services/multas';

describe('Ej. 1 - calcularMulta', () => {
  it('cobra $500 por un día de retraso', () => {
    expect(calcularMulta(1)).toBe(500);
  });

  it('cobra $500 por cada día de retraso', () => {
    expect(calcularMulta(3)).toBe(1500);
  });

  it('nunca supera el tope de $10.000', () => {
    expect(calcularMulta(30)).toBe(10000);
  });

  // 📌 [EJ1 · CORRECCIÓN EN EL TEST - R3] "Sin retraso (0 días) la multa es $0": el test esperaba un error que la regla no pide
  it('sin retraso (0 días) la multa es $0', () => {
    expect(calcularMulta(0)).toBe(0);
  });

  it('rechaza días de retraso negativos', () => {
    expect(() => calcularMulta(-2)).toThrow(RangeError);
  });

  it('rechaza días de retraso con decimales', () => {
    expect(() => calcularMulta(1.5)).toThrow(RangeError);
  });
});

describe('Ej. 1 - LibroService.prestar', () => {
  const crearServicio = () =>
    new LibroService(
      new LibroRepositoryEnMemoria([{ id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 4 }]),
    );

  it('descuenta los ejemplares prestados', () => {
    const servicio = crearServicio();
    expect(servicio.prestar(1, 1).ejemplares).toBe(3);
  });

  it('permite prestar todos los ejemplares disponibles', () => {
    const servicio = crearServicio();
    expect(servicio.prestar(1, 4).ejemplares).toBe(0);
  });

  it('rechaza prestar más ejemplares que los disponibles', () => {
    const servicio = crearServicio();
    expect(() => servicio.prestar(1, 5)).toThrow(EjemplaresInsuficientesError);
  });
});
