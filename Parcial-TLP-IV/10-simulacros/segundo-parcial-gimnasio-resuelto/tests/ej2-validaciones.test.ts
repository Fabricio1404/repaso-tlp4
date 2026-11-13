import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoSocio } from '../src/services/validaciones';

const valido = { nombre: 'Ana Gómez', email: 'ana@mail.com', edad: 25 };

describe('Ej. 2 - validarNuevoSocio', () => {
  it('acepta un socio con datos válidos', () => {
    expect(() => validarNuevoSocio(valido)).not.toThrow();
  });

  // Límites
  it('R6 límite: acepta 16 años (mínimo)', () => {
    expect(() => validarNuevoSocio({ ...valido, edad: 16 })).not.toThrow();
  });
  it('R6 límite: rechaza 15 años (justo debajo)', () => {
    expect(() => validarNuevoSocio({ ...valido, edad: 15 })).toThrow(ValidacionError);
  });
  it('R6 límite: acepta 90 años (máximo, inclusive)', () => {
    expect(() => validarNuevoSocio({ ...valido, edad: 90 })).not.toThrow();
  });
  it('R6 límite: rechaza 91 años (justo arriba)', () => {
    expect(() => validarNuevoSocio({ ...valido, edad: 91 })).toThrow(ValidacionError);
  });

  // Inválidos
  it('R4: rechaza un nombre vacío', () => {
    expect(() => validarNuevoSocio({ ...valido, nombre: '' })).toThrow(ValidacionError);
  });
  it('R4: rechaza un nombre con solo espacios', () => {
    expect(() => validarNuevoSocio({ ...valido, nombre: '   ' })).toThrow(ValidacionError);
  });
  it('R5: rechaza un email vacío', () => {
    expect(() => validarNuevoSocio({ ...valido, email: '' })).toThrow(ValidacionError);
  });
  it('R5: rechaza un email sin @', () => {
    expect(() => validarNuevoSocio({ ...valido, email: 'ana.mail.com' })).toThrow(ValidacionError);
  });
  it('R6: rechaza una edad decimal', () => {
    expect(() => validarNuevoSocio({ ...valido, edad: 20.5 })).toThrow(ValidacionError);
  });
  it('R6: rechaza NaN como edad', () => {
    expect(() => validarNuevoSocio({ ...valido, edad: Number.NaN })).toThrow(ValidacionError);
  });
});
