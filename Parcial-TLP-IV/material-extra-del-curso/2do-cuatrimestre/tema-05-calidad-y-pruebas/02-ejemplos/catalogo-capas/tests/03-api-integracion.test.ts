import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { crearApp } from '../src/app';

// 📌 [PRUEBA DE INTEGRACIÓN] ruta + controlador + servicio + repo en memoria + middleware de errores
describe('API /productos', () => {
  it('GET /productos responde 200 con la lista', async () => {
    // 📌 [CREARAPP EN CADA TEST] Datos limpios en cada prueba (independencia)
    const res = await request(crearApp()).get('/productos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it('GET /productos/:id existente responde 200 con el producto', async () => {
    const res = await request(crearApp()).get('/productos/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1, nombre: 'Yerba', precio: 3000, stock: 10 });
  });

  it('GET /productos/:id inexistente responde 404 con { error }', async () => {
    const res = await request(crearApp()).get('/productos/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Producto no encontrado' });
  });

  it('POST /productos válido responde 201 y el producto queda en la lista', async () => {
    const app = crearApp();
    // 📌 [.SEND] Envía el body como JSON
    const res = await request(app).post('/productos').send({ nombre: 'Mate', precio: 900, stock: 4 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 4, nombre: 'Mate' });

    // 📌 [MISMA APP] Para comprobar el efecto se usa la MISMA instancia de app
    const lista = await request(app).get('/productos');
    expect(lista.body).toHaveLength(4);
  });

  it('POST /productos inválido responde 400', async () => {
    const res = await request(crearApp()).post('/productos').send({ nombre: '', precio: 900, stock: 4 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /productos/:id/venta sin stock suficiente responde 409', async () => {
    const res = await request(crearApp()).post('/productos/2/venta').send({ cantidad: 5 });
    expect(res.status).toBe(409);
    expect(res.body.error).toContain('Hay 2 unidades');
  });
});
