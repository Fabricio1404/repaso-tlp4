import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { crearApp } from '../src/app';

describe('API /turnos (integración)', () => {
  // Ejemplo dado
  it('GET /turnos responde 200 con los 3 turnos iniciales', async () => {
    const res = await request(crearApp()).get('/turnos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it.todo('GET /turnos/:id existente → 200 con el turno');
  it.todo('GET /turnos/:id inexistente → 404 { error: "Turno no encontrado" }');
  it.todo('POST /turnos válido → 201 con el turno creado en estado "reservado"');
  it.todo('POST /turnos con un horario ocupado → 409');
  it.todo('POST /turnos con datos inválidos → 400 (al menos 3 casos distintos, incluidos los bordes de R3)');
  it.todo('POST /turnos/:id/cancelar de un turno reservado → 200 con estado "cancelado"');
  it.todo('POST /turnos/:id/cancelar de un turno ya cancelado → 409');
  it.todo('POST /turnos/:id/cancelar inexistente → 404');
});
