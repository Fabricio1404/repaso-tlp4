import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';

describe('API de precios', () => {
  it('calcula el precio final con un descuento válido', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ precio: 1000, descuento: 10 });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ precio: 1000, descuento: 10, precioFinal: 900 });
  });

  it('responde 400 si falta el precio', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ descuento: 10 });

    expect(respuesta.status).toBe(400);
  });

  it('responde 400 si el descuento es del 150 %', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ precio: 1000, descuento: 150 });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });
});
