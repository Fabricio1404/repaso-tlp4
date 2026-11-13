import { describe, expect, it } from 'vitest';
import { ContrasenaDebilError, PasswordService } from '../src/PasswordService';

const servicio = new PasswordService(4); // costo bajo para que los tests sean rápidos

describe('F2 · PasswordService', () => {
  it('el hash no es la contraseña y empieza con $2', async () => {
    const hash = await servicio.hashear('Secreta123');
    expect(hash).not.toBe('Secreta123');
    expect(hash.startsWith('$2')).toBe(true);
  });

  it('la misma contraseña produce hashes distintos (salt)', async () => {
    const a = await servicio.hashear('Secreta123');
    const b = await servicio.hashear('Secreta123');
    expect(a).not.toBe(b);
  });

  it('verificar acepta la contraseña correcta y rechaza otra', async () => {
    const hash = await servicio.hashear('Secreta123');
    await expect(servicio.verificar('Secreta123', hash)).resolves.toBe(true);
    await expect(servicio.verificar('secreta123', hash)).resolves.toBe(false);
  });

  it.each([
    ['corta', 'Abc12'],
    ['sin mayúscula', 'secreta123'],
    ['sin número', 'SecretaSinNumero'],
  ])('rechaza una contraseña %s', async (_caso, password) => {
    await expect(servicio.hashear(password)).rejects.toThrow(ContrasenaDebilError);
  });
});
