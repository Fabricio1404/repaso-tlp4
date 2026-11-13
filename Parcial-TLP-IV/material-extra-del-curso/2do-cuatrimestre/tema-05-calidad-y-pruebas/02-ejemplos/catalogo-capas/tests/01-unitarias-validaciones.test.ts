import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoProducto } from '../src/services/validaciones';

const valido = { nombre: 'Yerba', precio: 3000, stock: 10 };

// 📌 [PRUEBA UNITARIA DE UNA FUNCIÓN PURA]
describe('validarNuevoProducto', () => {
  // 📌 [CASO HABITUAL] + .not.toThrow()
  it('acepta un producto válido', () => {
    expect(() => validarNuevoProducto(valido)).not.toThrow();
  });

  // 📌 [CASOS LÍMITE] Justo en el borde de cada regla (valores válidos)
  it('acepta stock 0 (límite inferior permitido)', () => {
    expect(() => validarNuevoProducto({ ...valido, stock: 0 })).not.toThrow();
  });

  it('acepta un nombre de un solo carácter', () => {
    expect(() => validarNuevoProducto({ ...valido, nombre: 'A' })).not.toThrow();
  });

  // 📌 [IT.EACH] El mismo test con varios datos inválidos (particiones: vacío, solo espacios, negativo, cero, decimal, NaN)
  it.each([
    ['nombre vacío', { ...valido, nombre: '' }],
    ['nombre con solo espacios', { ...valido, nombre: '   ' }],
    ['precio cero (límite inválido)', { ...valido, precio: 0 }],
    ['precio negativo', { ...valido, precio: -10 }],
    ['precio NaN', { ...valido, precio: Number.NaN }],
    ['stock negativo (límite inválido)', { ...valido, stock: -1 }],
    ['stock con decimales', { ...valido, stock: 2.5 }],
  ])('rechaza %s', (_caso, datos) => {
    // 📌 [TOTHROW CON CLASE] Verifica el TIPO de error, no solo que haya un error
    expect(() => validarNuevoProducto(datos)).toThrow(ValidacionError);
  });

  // 📌 [TOTHROW CON MENSAJE] Verifica el texto (útil cuando el mensaje es parte del requisito)
  it('informa qué campo es inválido', () => {
    expect(() => validarNuevoProducto({ ...valido, precio: 0 })).toThrow('El precio debe ser mayor a 0');
  });
});
