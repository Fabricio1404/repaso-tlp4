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
  it('con stock suficiente llama a actualizar una sola vez con el stock descontado', () => {
    const repo = crearRepositorioFalso(amoxicilina);
    new MedicamentoService(repo).vender(2, 3);
    expect(repo.actualizar).toHaveBeenCalledTimes(1);
    expect(repo.actualizar).toHaveBeenCalledWith({ ...amoxicilina, stock: 0 });
  });

  it('con stock insuficiente lanza StockInsuficienteError y NO llama a actualizar', () => {
    const repo = crearRepositorioFalso(amoxicilina);
    expect(() => new MedicamentoService(repo).vender(2, 4)).toThrow(StockInsuficienteError);
    expect(repo.actualizar).not.toHaveBeenCalled();
  });
});

describe('Ej. 3b - API /medicamentos', () => {
  // Ejemplo dado
  it('GET /medicamentos responde 200 con la lista', async () => {
    const respuesta = await request(crearApp()).get('/medicamentos');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(3);
  });

  it('GET /medicamentos/:id de un medicamento existente responde 200 con el medicamento', async () => {
    const respuesta = await request(crearApp()).get('/medicamentos/2');
    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual(amoxicilina);
  });

  // 📌 [EJ3b · ROJO → VERDE] Antes respondía 500 (Error genérico)
  it('GET /medicamentos/:id de un medicamento inexistente responde 404 con un mensaje de error', async () => {
    const respuesta = await request(crearApp()).get('/medicamentos/999');
    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Medicamento no encontrado' });
  });
});

