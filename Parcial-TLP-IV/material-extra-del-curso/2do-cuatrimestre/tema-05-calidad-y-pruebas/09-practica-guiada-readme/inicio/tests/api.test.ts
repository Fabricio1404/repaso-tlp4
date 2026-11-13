import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';

describe('API de precios', () => {
  it('calcula el precio final con un descuento válido', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ precio: 1000, descuento: 10 });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ precio: 1000, descuento: 10, precioFinal: 900 });
  });

  it('con descuento cero devuelve el mismo precio', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ precio: 500, descuento: 0 });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.precioFinal).toBe(500);
  });

  // Actividad 6: agregá acá la prueba de integración del 150 %
});
