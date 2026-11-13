import { afterEach, describe, expect, it, vi } from 'vitest';

// 📌 [REFERENCIA] Un test por matcher, para consultar la sintaxis rápido
describe('Referencia de matchers de Vitest', () => {
  afterEach(() => {
    // 📌 [AFTEREACH + RESTOREALLMOCKS] Deshace los vi.spyOn después de cada test
    vi.restoreAllMocks();
  });

  it('toBe vs toEqual', () => {
    expect(2 + 2).toBe(4);
    expect('hola').toBe('hola');
    // 📌 [TOBE CON OBJETOS FALLA] Dos objetos distintos con el mismo contenido NO son toBe
    expect({ a: 1 }).not.toBe({ a: 1 });
    expect({ a: 1 }).toEqual({ a: 1 });
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  it('toStrictEqual distingue undefined explícito', () => {
    expect({ a: 1, b: undefined }).toEqual({ a: 1 });
    expect({ a: 1, b: undefined }).not.toStrictEqual({ a: 1 });
  });

  it('propiedades, largo y contenido', () => {
    const usuario = { nombre: 'Ana', roles: ['admin', 'usuario'] };
    expect(usuario).toHaveProperty('nombre');
    expect(usuario).toHaveProperty('nombre', 'Ana');
    expect(usuario).toMatchObject({ nombre: 'Ana' });
    expect(usuario.roles).toHaveLength(2);
    expect(usuario.roles).toContain('admin');
    expect('libro:create').toContain(':');
  });

  it('nulos, verdaderos y comparaciones', () => {
    expect(undefined).toBeUndefined();
    expect(null).toBeNull();
    expect('x').toBeDefined();
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
    expect(10).toBeGreaterThan(5);
    expect(10).toBeLessThanOrEqual(10);
    // 📌 [TOBECLOSETO] Para decimales: 0.1 + 0.2 da 0.30000000000000004
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });

  it('errores', () => {
    const fallar = (): never => {
      throw new RangeError('fuera de rango');
    };
    expect(fallar).toThrow();
    expect(fallar).toThrow(RangeError);
    expect(fallar).toThrow('fuera de rango');
    expect(fallar).toThrow(/rango/);
  });

  it('promesas: resolves y rejects', async () => {
    await expect(Promise.resolve([1, 2])).resolves.toHaveLength(2);
    await expect(Promise.reject(new Error('no'))).rejects.toThrow('no');
  });

  it('vi.fn: llamadas y argumentos', () => {
    const espia = vi.fn((n: number) => n * 2);
    espia(3);
    espia(5);
    expect(espia).toHaveBeenCalledTimes(2);
    expect(espia).toHaveBeenLastCalledWith(5);
    // 📌 [.MOCK.CALLS] Todas las llamadas con sus argumentos
    expect(espia.mock.calls).toEqual([[3], [5]]);
    expect(espia.mock.results[0].value).toBe(6);
  });

  it('vi.spyOn sobre console.log', () => {
    // 📌 [VI.SPYON] Espía un método real; mockImplementation lo silencia
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    console.log('[NOTIFICACIÓN] hola');
    expect(log).toHaveBeenCalledWith('[NOTIFICACIÓN] hola');
  });
});
