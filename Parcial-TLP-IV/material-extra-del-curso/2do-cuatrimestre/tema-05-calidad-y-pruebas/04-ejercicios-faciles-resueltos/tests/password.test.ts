import { describe, expect, it } from 'vitest';
import { validarPassword } from '../src/password';

describe('validarPassword', () => {
  it('una contraseña válida no tiene errores', () => {
    // 📌 [TOEQUAL CON ARREGLOS] toBe([]) fallaría: compara referencias
    expect(validarPassword('Secreta123')).toEqual([]);
  });

  // 📌 [CASO LÍMITE] Exactamente 8 caracteres: válido. Este test reveló el defecto
  it('acepta exactamente 8 caracteres', () => {
    expect(validarPassword('Abcdefg1')).toEqual([]);
  });

  it('rechaza 7 caracteres', () => {
    expect(validarPassword('Abcdef1')).toEqual(['Debe tener al menos 8 caracteres']);
  });

  it('rechaza si no tiene números', () => {
    expect(validarPassword('SinNumeros')).toEqual(['Debe tener al menos un número']);
  });

  it('rechaza si no tiene mayúsculas', () => {
    expect(validarPassword('sinmayus123')).toEqual(['Debe tener al menos una mayúscula']);
  });

  // 📌 [VARIAS REGLAS A LA VEZ] Verifica también el ORDEN de los mensajes
  it('informa todas las reglas incumplidas en orden', () => {
    expect(validarPassword('abc')).toEqual([
      'Debe tener al menos 8 caracteres',
      'Debe tener al menos un número',
      'Debe tener al menos una mayúscula',
    ]);
  });
});
