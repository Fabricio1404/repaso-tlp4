import { describe, expect, it } from 'vitest';
import { ValidacionError } from '../src/errors';
import { validarNuevoSocio } from '../src/services/validaciones';

const valido = { nombre: 'Ana Gómez', email: 'ana@mail.com', edad: 25 };

describe('Ej. 2 - validarNuevoSocio', () => {
  // Caso habitual (dado como ejemplo)
  it('acepta un socio con datos válidos', () => {
    expect(() => validarNuevoSocio(valido)).not.toThrow();
  });

  // TODO Ej. 2: agregá acá los casos límite e inválidos para R4, R5 y R6.
  // Tip: para un caso inválido podés usar
  //   expect(() => validarNuevoSocio({ ...valido, edad: 10 })).toThrow(ValidacionError);
});

// (esta línea evita el aviso de "import sin usar" mientras no hayas escrito casos)
void ValidacionError;
