import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { crearApp } from '../src/app';

describe('API /compras (integración)', () => {
  // Ejemplo dado
  it('GET /compras responde 200 con una lista vacía', async () => {
    const res = await request(crearApp()).get('/compras');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it.todo('POST /compras válido → 201 con la compra (R7)');
  it.todo('POST /compras con datos inválidos → 400 (R7)');
  it.todo('POST /compras con un cupón inexistente → 400 con { error } (R7)');
  it.todo('POST /compras que no cumple la condición del cupón → 409 (R7)');
  it.todo('GET /compras/:id inexistente → 404 (R7)');
  it.todo('la auditoría (observer real) registra cada compra (R5)');
});

describe('GET /compras/total (TDD - R8)', () => {
  it.todo('sin compras → { total: 0 }');
  it.todo('suma los totales con los descuentos aplicados');
});
