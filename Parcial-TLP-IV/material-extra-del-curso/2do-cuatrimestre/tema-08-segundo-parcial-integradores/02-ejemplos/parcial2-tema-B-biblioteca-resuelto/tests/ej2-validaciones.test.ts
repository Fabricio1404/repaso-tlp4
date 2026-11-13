import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoLibro } from '../src/services/validaciones';

const valido = { titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 };

describe('Ej. 2 - validarNuevoLibro', () => {
  // Caso habitual (dado como ejemplo)
  it('acepta un libro con datos válidos', () => {
    expect(() => validarNuevoLibro(valido)).not.toThrow();
  });

  // 📌 [CASOS LÍMITE] Justo en el borde de cada regla
  it('acepta exactamente 1 ejemplar (límite inferior de R6)', () => {
    expect(() => validarNuevoLibro({ ...valido, ejemplares: 1 })).not.toThrow();
  });

  it('rechaza 0 ejemplares (justo afuera del límite de R6)', () => {
    expect(() => validarNuevoLibro({ ...valido, ejemplares: 0 })).toThrow(ValidacionError);
  });

  it('acepta un título y un autor de un solo carácter (límite de R4 y R5)', () => {
    expect(() => validarNuevoLibro({ ...valido, titulo: 'A', autor: 'B' })).not.toThrow();
  });

  // 📌 [CASOS INVÁLIDOS] Al menos uno por regla (R4, R5 y R6)
  it.each([
    ['R4 · título vacío', { ...valido, titulo: '' }],
    ['R4 · título con solo espacios', { ...valido, titulo: '   ' }],
    ['R5 · autor vacío', { ...valido, autor: '' }],
    ['R5 · autor con solo espacios', { ...valido, autor: '   ' }],
    ['R6 · ejemplares negativos', { ...valido, ejemplares: -1 }],
    ['R6 · ejemplares con decimales', { ...valido, ejemplares: 2.5 }],
    ['R6 · ejemplares NaN', { ...valido, ejemplares: Number.NaN }],
  ])('rechaza %s', (_caso, datos) => {
    expect(() => validarNuevoLibro(datos)).toThrow(ValidacionError);
  });

  // 📌 [MENSAJE] Verifica que el error del autor sea el del autor (el defecto devolvía el del título... o nada)
  it('el autor vacío informa "El autor es obligatorio"', () => {
    expect(() => validarNuevoLibro({ ...valido, autor: '' })).toThrow('El autor es obligatorio');
  });
});
