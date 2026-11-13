import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoLibro } from '../src/services/validaciones';

const valido = { titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 };

describe('Ej. 2 - validarNuevoLibro', () => {
  // Caso habitual (dado como ejemplo)
  it('acepta un libro con datos válidos', () => {
    expect(() => validarNuevoLibro(valido)).not.toThrow();
  });

  // TODO Ej. 2: agregá acá los casos límite e inválidos para R4, R5 y R6.
  // Tip: para un caso inválido podés usar
  //   expect(() => validarNuevoLibro({ ...valido, ejemplares: -1 })).toThrow(ValidacionError);
});
