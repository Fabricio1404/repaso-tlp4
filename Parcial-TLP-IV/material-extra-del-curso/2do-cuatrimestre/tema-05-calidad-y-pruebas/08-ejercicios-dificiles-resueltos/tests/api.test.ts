import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { crearApp } from '../src/app';
import { NotificadorMemoria } from '../src/services/notificador';

describe('API /turnos (integración)', () => {
  it('GET /turnos responde 200 con los 3 turnos iniciales', async () => {
    const res = await request(crearApp()).get('/turnos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it('GET /turnos/:id existente → 200 con el turno', async () => {
    const res = await request(crearApp()).get('/turnos/1');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, paciente: 'Ana Pérez' });
  });

  // 📌 [REVELÓ EL DEFECTO 2] Respondía 200 con cuerpo vacío
  it('GET /turnos/:id inexistente → 404 { error: "Turno no encontrado" }', async () => {
    const res = await request(crearApp()).get('/turnos/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Turno no encontrado' });
  });

  // 📌 [REVELÓ EL DEFECTO 3] Respondía 200 en vez de 201
  it('POST /turnos válido → 201 con el turno creado en estado "reservado"', async () => {
    const res = await request(crearApp()).post('/turnos').send({ paciente: 'Dani', fecha: '2026-03-12', hora: '19:30' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 4, paciente: 'Dani', fecha: '2026-03-12', hora: '19:30', estado: 'reservado' });
  });

  it('POST /turnos con un horario ocupado → 409', async () => {
    const res = await request(crearApp()).post('/turnos').send({ paciente: 'Eva', fecha: '2026-03-10', hora: '09:00' });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  // 📌 [HORARIO DE UN TURNO CANCELADO] Un turno cancelado libera el horario (R4 habla de turnos reservados)
  it('POST /turnos en el horario de un turno cancelado → 201', async () => {
    const res = await request(crearApp()).post('/turnos').send({ paciente: 'Eva', fecha: '2026-03-11', hora: '10:00' });
    expect(res.status).toBe(201);
  });

  // 📌 [IT.EACH + LÍMITES DE R3] 20:00 reveló el DEFECTO 1; 07:30 y 10:15 son inválidos por otras razones
  it.each([
    ['paciente vacío', { paciente: '   ', fecha: '2026-03-12', hora: '10:00' }],
    ['fecha con otro formato', { paciente: 'X', fecha: '12/03/2026', hora: '10:00' }],
    ['hora sin formato', { paciente: 'X', fecha: '2026-03-12', hora: '10hs' }],
    ['hora antes de las 08:00', { paciente: 'X', fecha: '2026-03-12', hora: '07:30' }],
    ['hora 20:00 (después de 19:30)', { paciente: 'X', fecha: '2026-03-12', hora: '20:00' }],
    ['minutos que no son 00 ni 30', { paciente: 'X', fecha: '2026-03-12', hora: '10:15' }],
  ])('POST /turnos con %s → 400', async (_caso, body) => {
    const res = await request(crearApp()).post('/turnos').send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /turnos con los bordes válidos 08:00 y 19:30 → 201', async () => {
    const app = crearApp();
    const a = await request(app).post('/turnos').send({ paciente: 'X', fecha: '2026-04-01', hora: '08:00' });
    const b = await request(app).post('/turnos').send({ paciente: 'Y', fecha: '2026-04-01', hora: '19:30' });
    expect([a.status, b.status]).toEqual([201, 201]);
  });

  it('POST /turnos/:id/cancelar de un turno reservado → 200 con estado "cancelado"', async () => {
    const res = await request(crearApp()).post('/turnos/1/cancelar');
    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('cancelado');
  });

  // 📌 [REVELÓ EL DEFECTO 4] Respondía 200 y notificaba de nuevo
  it('POST /turnos/:id/cancelar de un turno ya cancelado → 409', async () => {
    const res = await request(crearApp()).post('/turnos/3/cancelar');
    expect(res.status).toBe(409);
  });

  it('POST /turnos/:id/cancelar inexistente → 404', async () => {
    const res = await request(crearApp()).post('/turnos/999/cancelar');
    expect(res.status).toBe(404);
  });

  // 📌 [INTEGRACIÓN CON DEPENDENCIA INYECTADA] Se le pasa un notificador propio a crearApp para verificar el efecto
  it('reservar por la API notifica al paciente', async () => {
    const notificador = new NotificadorMemoria();
    await request(crearApp({ notificador })).post('/turnos').send({ paciente: 'Dani', fecha: '2026-03-12', hora: '11:00' });
    expect(notificador.enviados).toEqual(['Dani: Turno reservado para el 2026-03-12 a las 11:00']);
  });
});

// 📌 [TDD - R8] Estos tests se escribieron ANTES que el código: primero fallaron (404 de Express porque no existía la ruta)
describe('DELETE /turnos/:id (TDD)', () => {
  it('existente → 204 sin cuerpo y el turno ya no aparece', async () => {
    const app = crearApp();
    const res = await request(app).delete('/turnos/2');
    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
    const lista = await request(app).get('/turnos');
    expect(lista.body).toHaveLength(2);
  });

  it('inexistente → 404 { error: "Turno no encontrado" }', async () => {
    const res = await request(crearApp()).delete('/turnos/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Turno no encontrado' });
  });
});
