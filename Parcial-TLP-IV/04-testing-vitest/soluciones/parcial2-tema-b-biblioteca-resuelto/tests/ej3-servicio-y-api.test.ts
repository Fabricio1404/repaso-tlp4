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
  it('con ejemplares suficientes llama a actualizar una sola vez con los ejemplares descontados', () => {
    // Preparar: un repositorio FALSO que siempre devuelve a Rayuela (3 ejemplares)
    const repo = crearRepositorioFalso(rayuela);
    const servicio = new LibroService(repo);   // DIP: el servicio recibe el repo por constructor

    // Ejecutar
    servicio.prestar(1, 2);

    // Comprobar: se llamó UNA vez, con el libro COMPLETO y los ejemplares descontados (3 - 2 = 1)
    expect(repo.actualizar).toHaveBeenCalledTimes(1);
    expect(repo.actualizar).toHaveBeenCalledWith({ ...rayuela, ejemplares: 1 });
  });

  it('con ejemplares insuficientes lanza EjemplaresInsuficientesError y NO llama a actualizar', () => {
    const repo = crearRepositorioFalso(rayuela);
    const servicio = new LibroService(repo);

    // toThrow necesita una FUNCIÓN flecha: Vitest la ejecuta y atrapa el error
    expect(() => servicio.prestar(1, 4)).toThrow(EjemplaresInsuficientesError);
    expect(repo.actualizar).not.toHaveBeenCalled();
  });
});

describe('Ej. 3b - API /libros', () => {
  // Ejemplo dado
  it('GET /libros responde 200 con la lista de libros', async () => {
    const respuesta = await request(crearApp()).get('/libros');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(4);
  });

  it('GET /libros/:id de un libro existente responde 200 con el libro', async () => {
    const respuesta = await request(crearApp()).get('/libros/1');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 });
  });

  // TDD: este test se escribió PRIMERO y falló (rojo: recibía 200 con cuerpo vacío).
  // Después se corrigió el controlador y pasó (verde).
  it('GET /libros/:id de un libro inexistente responde 404 con un mensaje de error', async () => {
    const respuesta = await request(crearApp()).get('/libros/999');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Libro no encontrado' });
  });
});
