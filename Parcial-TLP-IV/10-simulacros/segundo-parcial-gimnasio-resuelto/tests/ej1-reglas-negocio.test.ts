import { describe, expect, it } from 'vitest';
import { CuposInsuficientesError } from '../src/errors';
import { ClaseRepositoryEnMemoria } from '../src/repositories/clase.repository';
import { GimnasioService } from '../src/services/gimnasio.service';
import { calcularCuota } from '../src/services/cuotas';

describe('Ej. 1 - calcularCuota', () => {
  it('sin antigüedad paga la cuota completa', () => {
    expect(calcularCuota(0)).toBe(20000);
  });

  it('con 1 año de antigüedad paga $19.000', () => {
    expect(calcularCuota(1)).toBe(19000);
  });

  it('con 3 años de antigüedad paga $17.000', () => {
    expect(calcularCuota(3)).toBe(17000);
  });

  it('el descuento nunca supera el 25 %', () => {
    expect(calcularCuota(10)).toBe(15000);
  });

  it('rechaza una antigüedad negativa', () => {
    expect(() => calcularCuota(-1)).toThrow(RangeError);
  });

  it('rechaza una antigüedad con decimales', () => {
    expect(() => calcularCuota(2.5)).toThrow(RangeError);
  });
});

describe('Ej. 1 - GimnasioService.reservar', () => {
  const crearServicio = () =>
    new GimnasioService(
      new ClaseRepositoryEnMemoria([{ id: 1, nombre: 'Yoga', profesor: 'Sofía Acosta', cupos: 5 }]),
    );

  it('descuenta los cupos reservados', () => {
    const servicio = crearServicio();
    expect(servicio.reservar(1, 2).cupos).toBe(3);
  });

  it('permite reservar todos los cupos disponibles', () => {
    const servicio = crearServicio();
    expect(servicio.reservar(1, 5).cupos).toBe(0);
  });

  it('rechaza reservar más cupos que los disponibles', () => {
    const servicio = crearServicio();
    expect(() => servicio.reservar(1, 6)).toThrow(CuposInsuficientesError);
  });
});
