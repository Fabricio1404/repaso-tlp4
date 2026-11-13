import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { crearApp } from '../src/app';
import { EjemplaresInsuficientesError } from '../src/errors';
import type { Libro, NuevoLibro } from '../src/models/libro';
import type { LibroRepository } from '../src/repositories/libro.repository';
import { LibroService } from '../src/services/libro.service';

// Repositorio falso: cada método es una función espía creada con vi.fn().
// buscarPorId devuelve siempre el libro que se le pasa por parámetro.
// Usalo en el Ej. 3a en lugar de LibroRepositoryEnMemoria.
function crearRepositorioFalso(libro: Libro) {
  return {
    listar: vi.fn(() => [libro]),
    buscarPorId: vi.fn(() => ({ ...libro })),
    guardar: vi.fn((datos: NuevoLibro) => ({ id: 99, ...datos })),
    actualizar: vi.fn(),
  } satisfies LibroRepository;
}

const rayuela: Libro = { id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 };

describe('Ej. 3a - LibroService.prestar con un repositorio falso', () => {
  it.todo('con ejemplares suficientes llama a actualizar una sola vez con los ejemplares descontados');
  it.todo('con ejemplares insuficientes lanza EjemplaresInsuficientesError y NO llama a actualizar');
});

describe('Ej. 3b - API /libros', () => {
  // Ejemplo dado
  it('GET /libros responde 200 con la lista de libros', async () => {
    const respuesta = await request(crearApp()).get('/libros');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(4);
  });

  it.todo('GET /libros/:id de un libro existente responde 200 con el libro');
  it.todo('GET /libros/:id de un libro inexistente responde 404 con un mensaje de error');
});
