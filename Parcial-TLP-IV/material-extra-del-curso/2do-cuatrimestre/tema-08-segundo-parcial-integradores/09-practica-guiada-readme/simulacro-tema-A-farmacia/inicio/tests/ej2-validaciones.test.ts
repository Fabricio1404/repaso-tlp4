import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoMedicamento } from '../src/services/validaciones';

const valido = { nombre: 'Ibuprofeno 400', laboratorio: 'Bagó', precio: 3500, stock: 10 };

describe('Ej. 2 - validarNuevoMedicamento', () => {
  // Caso habitual (dado como ejemplo)
  it('acepta un medicamento con datos válidos', () => {
    expect(() => validarNuevoMedicamento(valido)).not.toThrow();
  });

  // TODO Ej. 2: agregá acá los casos límite e inválidos para R4, R5 y R6.
  // Tip: expect(() => validarNuevoMedicamento({ ...valido, precio: -1 })).toThrow(ValidacionError);
});

