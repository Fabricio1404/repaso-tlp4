import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { crearApp } from '../src/app';
import { CuposInsuficientesError } from '../src/errors';
import type { Clase } from '../src/models/clase';
import type { ClaseRepository } from '../src/repositories/clase.repository';
import { GimnasioService } from '../src/services/gimnasio.service';

// Repositorio falso: cada método es una función espía creada con vi.fn().
// buscarPorId devuelve siempre la clase que se le pasa por parámetro.
// Usalo en el Ej. 3a en lugar de ClaseRepositoryEnMemoria.
function crearRepositorioFalso(clase: Clase) {
  return {
    listar: vi.fn(() => [clase]),
    buscarPorId: vi.fn(() => ({ ...clase })),
    actualizar: vi.fn(),
  } satisfies ClaseRepository;
}

const spinning: Clase = { id: 2, nombre: 'Spinning', profesor: 'Martín Ruiz', cupos: 4 };

describe('Ej. 3a - GimnasioService.reservar con un repositorio falso', () => {
  it.todo('con cupos suficientes llama a actualizar una sola vez con los cupos descontados');
  it.todo('con cupos insuficientes lanza CuposInsuficientesError y NO llama a actualizar');
});

describe('Ej. 3b - API /clases', () => {
  // Ejemplo dado
  it('GET /clases responde 200 con la lista de clases', async () => {
    const respuesta = await request(crearApp()).get('/clases');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(4);
  });

  it.todo('GET /clases/:id de una clase existente responde 200 con la clase');
  it.todo('GET /clases/:id de una clase inexistente responde 404 con un mensaje de error');
});

// (estas líneas evitan avisos de "import sin usar" mientras el ejercicio está sin resolver)
void spinning;
void GimnasioService;
void CuposInsuficientesError;
