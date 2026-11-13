import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';

// 📌 [PRUEBA DE INTEGRACIÓN] Participan la ruta de Express, el middleware de errores y el servicio
describe('API de precios', () => {
  // 📌 [ASYNC + AWAIT] Sin await, el test terminaría antes de recibir la respuesta
  it('calcula el precio final con un descuento válido', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ precio: 1000, descuento: 10 });

    expect(respuesta.status).toBe(200);
    // 📌 [TOEQUAL] Compara el CONTENIDO del objeto (toBe compararía referencias y fallaría)
    expect(respuesta.body).toEqual({ precio: 1000, descuento: 10, precioFinal: 900 });
  });

  it('responde 400 si falta el precio', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ descuento: 10 });

    expect(respuesta.status).toBe(400);
  });

  // 📌 [ACTIVIDAD 6 DEL LABORATORIO] 150 % → el servicio lanza RangeError → el middleware responde 400 { error }
  it('responde 400 si el descuento es del 150 %', async () => {
    const respuesta = await request(app).post('/api/precios/calcular').send({ precio: 1000, descuento: 150 });

    expect(respuesta.status).toBe(400);
    // 📌 [TOHAVEPROPERTY] Solo comprueba que exista la propiedad error (no el texto exacto)
    expect(respuesta.body).toHaveProperty('error');
  });
});
