import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { crearApp } from '../src/app';
import { RegistroAuditoria } from '../src/auditoria/auditoria';
import { CompraRepositoryEnMemoria } from '../src/repositories/compra.repository';

describe('API /compras (integración)', () => {
  // 📌 [REVELÓ EL DEFECTO 3] Respondía 200
  it('POST /compras válido → 201 con la compra', async () => {
    const res = await request(crearApp()).post('/compras').send({ cliente: 'Ana', monto: 12000, cupon: 'MENOS2000' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, cliente: 'Ana', monto: 12000, cupon: 'MENOS2000', total: 10000 });
  });

  it('POST /compras con datos inválidos → 400', async () => {
    const res = await request(crearApp()).post('/compras').send({ cliente: '', monto: 100 });
    expect(res.status).toBe(400);
  });

  // 📌 [REVELÓ EL DEFECTO 4] Respondía 500
  it('POST /compras con un cupón inexistente → 400 con { error }', async () => {
    const res = await request(crearApp()).post('/compras').send({ cliente: 'Ana', monto: 100, cupon: 'GRATIS' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'El cupón GRATIS no existe' });
  });

  it('POST /compras que no cumple la condición del cupón → 409', async () => {
    const res = await request(crearApp()).post('/compras').send({ cliente: 'Ana', monto: 5000, cupon: 'MENOS2000' });
    expect(res.status).toBe(409);
  });

  it('GET /compras/:id inexistente → 404', async () => {
    const res = await request(crearApp()).get('/compras/99');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Compra no encontrada' });
  });

  it('la auditoría (observer real) registra cada compra', async () => {
    const auditoria = new RegistroAuditoria();
    const app = crearApp(new CompraRepositoryEnMemoria(), [auditoria]);
    await request(app).post('/compras').send({ cliente: 'Ana', monto: 10000, cupon: 'desc10' });
    await request(app).post('/compras').send({ cliente: 'Beto', monto: 3000 });
    expect(auditoria.lineas).toEqual(['#1 Ana $9000 (DESC10)', '#2 Beto $3000']);
  });
});

// 📌 [TDD - R8] Rojo primero (la ruta no existía: /compras/total caía en /compras/:id → 404)
describe('GET /compras/total (TDD)', () => {
  it('sin compras → { total: 0 }', async () => {
    const res = await request(crearApp()).get('/compras/total');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ total: 0 });
  });

  it('suma los totales (con descuentos aplicados)', async () => {
    const app = crearApp();
    await request(app).post('/compras').send({ cliente: 'Ana', monto: 10000, cupon: 'DESC10' });
    await request(app).post('/compras').send({ cliente: 'Beto', monto: 12000, cupon: 'MENOS2000' });
    const res = await request(app).get('/compras/total');
    expect(res.body).toEqual({ total: 19000 });
  });
});
