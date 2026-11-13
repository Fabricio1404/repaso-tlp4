import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoLibro } from '../src/services/validaciones';

const valido = { titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 };

describe('Ej. 2 - validarNuevoLibro', () => {
  // Caso habitual (dado como ejemplo)
  it('acepta un libro con datos válidos', () => {
    expect(() => validarNuevoLibro(valido)).not.toThrow();
  });

  // ---------- Casos LÍMITE (justo en el borde de una regla) ----------
  it('R6 límite: acepta exactamente 1 ejemplar (el mínimo permitido)', () => {
    expect(() => validarNuevoLibro({ ...valido, ejemplares: 1 })).not.toThrow();
  });

  it('R6 límite: rechaza 0 ejemplares (justo debajo del mínimo)', () => {
    // Este test REVELÓ un defecto: el código usaba "< 0" y aceptaba 0.
    expect(() => validarNuevoLibro({ ...valido, ejemplares: 0 })).toThrow(ValidacionError);
  });

  it('R4 límite: acepta un título de un solo carácter', () => {
    expect(() => validarNuevoLibro({ ...valido, titulo: 'X' })).not.toThrow();
  });

  // ---------- Casos INVÁLIDOS (al menos uno por regla) ----------
  it('R4: rechaza un título vacío', () => {
    expect(() => validarNuevoLibro({ ...valido, titulo: '' })).toThrow(ValidacionError);
  });

  it('R4: rechaza un título con solo espacios', () => {
    expect(() => validarNuevoLibro({ ...valido, titulo: '   ' })).toThrow(ValidacionError);
  });

  it('R5: rechaza un autor vacío', () => {
    // Este test REVELÓ un defecto: el código validaba el título dos veces y nunca el autor.
    expect(() => validarNuevoLibro({ ...valido, autor: '' })).toThrow(ValidacionError);
  });

  it('R5: rechaza un autor con solo espacios', () => {
    expect(() => validarNuevoLibro({ ...valido, autor: '   ' })).toThrow(ValidacionError);
  });

  it('R6: rechaza una cantidad negativa de ejemplares', () => {
    expect(() => validarNuevoLibro({ ...valido, ejemplares: -1 })).toThrow(ValidacionError);
  });

  it('R6: rechaza una cantidad decimal de ejemplares', () => {
    expect(() => validarNuevoLibro({ ...valido, ejemplares: 2.5 })).toThrow(ValidacionError);
  });

  it('R6: rechaza NaN como cantidad de ejemplares', () => {
    expect(() => validarNuevoLibro({ ...valido, ejemplares: Number.NaN })).toThrow(ValidacionError);
  });

  it('el mensaje de error del autor es el correcto', () => {
    expect(() => validarNuevoLibro({ ...valido, autor: '' })).toThrow('El autor es obligatorio');
  });
});
