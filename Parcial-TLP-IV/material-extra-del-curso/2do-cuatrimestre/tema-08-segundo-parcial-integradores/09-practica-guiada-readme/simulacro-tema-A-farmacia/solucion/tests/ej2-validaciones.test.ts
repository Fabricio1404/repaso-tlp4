import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoMedicamento } from '../src/services/validaciones';

const valido = { nombre: 'Ibuprofeno 400', laboratorio: 'Bagó', precio: 3500, stock: 10 };

describe('Ej. 2 - validarNuevoMedicamento', () => {
  it('acepta un medicamento con datos válidos', () => {
    expect(() => validarNuevoMedicamento(valido)).not.toThrow();
  });

  // 📌 [CASOS LÍMITE]
  it('acepta stock 0 (límite de R6)', () => {
    expect(() => validarNuevoMedicamento({ ...valido, stock: 0 })).not.toThrow();
  });

  it('acepta un precio mínimo positivo como 0.01 (límite de R6)', () => {
    expect(() => validarNuevoMedicamento({ ...valido, precio: 0.01 })).not.toThrow();
  });

  it('rechaza precio 0 (justo afuera del límite de R6)', () => {
    expect(() => validarNuevoMedicamento({ ...valido, precio: 0 })).toThrow(ValidacionError);
  });

  // 📌 [CASOS INVÁLIDOS] Uno o más por regla
  it.each([
    ['R4 · nombre vacío', { ...valido, nombre: '' }],
    ['R4 · nombre con solo espacios', { ...valido, nombre: '   ' }],
    ['R5 · laboratorio vacío', { ...valido, laboratorio: '' }],
    ['R5 · laboratorio con solo espacios', { ...valido, laboratorio: '  ' }],
    ['R6 · precio negativo', { ...valido, precio: -10 }],
    ['R6 · stock negativo', { ...valido, stock: -1 }],
    ['R6 · stock con decimales', { ...valido, stock: 2.5 }],
    ['R6 · stock NaN', { ...valido, stock: Number.NaN }],
  ])('rechaza %s', (_caso, datos) => {
    expect(() => validarNuevoMedicamento(datos)).toThrow(ValidacionError);
  });
});
