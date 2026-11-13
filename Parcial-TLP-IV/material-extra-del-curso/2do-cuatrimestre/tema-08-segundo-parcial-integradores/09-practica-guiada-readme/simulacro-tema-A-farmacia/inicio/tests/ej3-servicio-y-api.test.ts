import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { crearApp } from '../src/app';
import { StockInsuficienteError } from '../src/errors';
import type { Medicamento, NuevoMedicamento } from '../src/models/medicamento';
import type { MedicamentoRepository } from '../src/repositories/medicamento.repository';
import { MedicamentoService } from '../src/services/medicamento.service';

// Repositorio falso: cada método es una función espía creada con vi.fn().
// buscarPorId devuelve siempre el medicamento que se le pasa por parámetro.
function crearRepositorioFalso(medicamento: Medicamento) {
  return {
    listar: vi.fn(() => [medicamento]),
    buscarPorId: vi.fn(() => ({ ...medicamento })),
    guardar: vi.fn((datos: NuevoMedicamento) => ({ id: 99, ...datos })),
    actualizar: vi.fn(),
  } satisfies MedicamentoRepository;
}

const amoxicilina: Medicamento = { id: 2, nombre: 'Amoxicilina 500', laboratorio: 'Roemmers', precio: 8200, stock: 3 };

describe('Ej. 3a - MedicamentoService.vender con un repositorio falso', () => {
  it.todo('con stock suficiente llama a actualizar una sola vez con el stock descontado');
  it.todo('con stock insuficiente lanza StockInsuficienteError y NO llama a actualizar');
});

describe('Ej. 3b - API /medicamentos', () => {
  // Ejemplo dado
  it('GET /medicamentos responde 200 con la lista', async () => {
    const respuesta = await request(crearApp()).get('/medicamentos');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(3);
  });

  it.todo('GET /medicamentos/:id de un medicamento existente responde 200 con el medicamento');
  it.todo('GET /medicamentos/:id de un medicamento inexistente responde 404 con un mensaje de error');
});

