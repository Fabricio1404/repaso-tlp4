import { describe, expect, it } from 'vitest';
import { validarPassword } from '../src/password';

describe('validarPassword', () => {
  it('una contraseña válida no tiene errores', () => {
    expect(validarPassword('Secreta123')).toEqual([]);
  });

  it.todo('caso límite de longitud');
  it.todo('un caso inválido por cada regla');
  it.todo('una contraseña que incumple varias reglas devuelve todos los mensajes');
});
