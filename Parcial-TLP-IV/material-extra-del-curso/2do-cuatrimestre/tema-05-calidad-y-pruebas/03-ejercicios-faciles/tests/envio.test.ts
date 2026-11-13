import { describe, expect, it } from 'vitest';
import { calcularEnvio } from '../src/envio';

describe('calcularEnvio', () => {
  it('envío local de 2 kg cuesta la base', () => {
    expect(calcularEnvio(2, 'local')).toBe(1000);
  });

  it.todo('base de cada zona');
  it.todo('casos límite del recargo por kilo');
  it.todo('casos inválidos');
});
