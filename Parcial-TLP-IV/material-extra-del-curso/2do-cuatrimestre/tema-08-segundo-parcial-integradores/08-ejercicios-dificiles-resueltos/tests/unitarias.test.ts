import { describe, expect, it, vi } from 'vitest';
import type { ObservadorCompra } from '../src/auditoria/auditoria';
import { CuponMontoFijo, CuponPorcentaje, FabricaCupones, SinCupon } from '../src/cupones/cupones';
import { CondicionCuponError, CuponInvalidoError, ValidacionError } from '../src/dominio/errores';
import type { CompraRepository } from '../src/repositories/compra.repository';
import { CompraService } from '../src/services/compra.service';

function repoFalso() {
  return {
    guardar: vi.fn((d: Parameters<CompraRepository['guardar']>[0]) => ({ id: 1, ...d })),
    buscar: vi.fn(() => undefined),
    listar: vi.fn(() => []),
  } satisfies CompraRepository;
}

describe('FabricaCupones (Factory)', () => {
  it.each([
    [undefined, SinCupon],
    ['', SinCupon],
    ['DESC10', CuponPorcentaje],
    ['MENOS2000', CuponMontoFijo],
  ] as const)('el código %s crea la estrategia correcta (R2)', (codigo, clase) => {
    expect(FabricaCupones.crear(codigo)).toBeInstanceOf(clase);
  });

  // 📌 [REVELÓ EL DEFECTO 2] R3: sin distinguir mayúsculas ni espacios
  it.each(['desc10', ' Desc10 ', 'menos2000'])('acepta "%s" (R3)', (codigo) => {
    expect(() => FabricaCupones.crear(codigo)).not.toThrow();
  });

  it('un código inexistente lanza CuponInvalidoError (R3)', () => {
    expect(() => FabricaCupones.crear('GRATIS')).toThrow(CuponInvalidoError);
  });

  it('DESC10 descuenta 10 % redondeado (R2)', () => {
    expect(FabricaCupones.crear('DESC10').aplicar(15555)).toBe(14000);
  });

  // 📌 [REVELÓ EL DEFECTO 1] Límite exacto de R4
  it('MENOS2000 con $10.000 exactos se aplica (R4)', () => {
    expect(FabricaCupones.crear('MENOS2000').aplicar(10000)).toBe(8000);
  });

  it('MENOS2000 con $9.999 lanza CondicionCuponError (R4)', () => {
    expect(() => FabricaCupones.crear('MENOS2000').aplicar(9999)).toThrow(CondicionCuponError);
  });
});

describe('CompraService (unitaria con repo falso y observador espía)', () => {
  it('registra, guarda una vez y notifica a los observadores con la compra guardada (R5)', () => {
    const repo = repoFalso();
    const obs = { compraRegistrada: vi.fn() } satisfies ObservadorCompra;
    const compra = new CompraService(repo, [obs]).registrar({ cliente: ' Ana ', monto: 20000, cupon: 'desc10' });
    expect(repo.guardar).toHaveBeenCalledTimes(1);
    expect(repo.guardar).toHaveBeenCalledWith({ cliente: 'Ana', monto: 20000, cupon: 'DESC10', total: 18000 });
    expect(obs.compraRegistrada).toHaveBeenCalledWith(compra);
  });

  it.each([
    ['cliente vacío', { cliente: '  ', monto: 100 }],
    ['monto 0', { cliente: 'Ana', monto: 0 }],
    ['monto negativo', { cliente: 'Ana', monto: -5 }],
  ])('%s: ValidacionError, no guarda ni notifica (R1, R6)', (_c, datos) => {
    const repo = repoFalso();
    const obs = { compraRegistrada: vi.fn() };
    expect(() => new CompraService(repo, [obs]).registrar(datos)).toThrow(ValidacionError);
    expect(repo.guardar).not.toHaveBeenCalled();
    expect(obs.compraRegistrada).not.toHaveBeenCalled();
  });

  it('cupón inválido: no guarda ni notifica (R6)', () => {
    const repo = repoFalso();
    const obs = { compraRegistrada: vi.fn() };
    expect(() => new CompraService(repo, [obs]).registrar({ cliente: 'Ana', monto: 100, cupon: 'XX' })).toThrow(CuponInvalidoError);
    expect(repo.guardar).not.toHaveBeenCalled();
    expect(obs.compraRegistrada).not.toHaveBeenCalled();
  });
});
