import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { crearAppDePrueba } from './helpers';

describe('RF4 y RF5: suscripción y notificación por dos canales', () => {
  afterEach(() => vi.restoreAllMocks());

  it('al cambiar el estado, el suscriptor recibe la notificación in-app y una línea en consola', async () => {
    const { app } = await crearAppDePrueba();
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const tUsuario = (await request(app).post('/api/auth/login').send({ email: 'usuario@tp.com', password: 'Usuario123' })).body.token;
    const tOperador = (await request(app).post('/api/auth/login').send({ email: 'operador@tp.com', password: 'Operador123' })).body.token;

    const sub = await request(app).post('/api/libros/2/suscripcion').set('Authorization', `Bearer ${tUsuario}`);
    expect(sub.status).toBe(201);

    const cambio = await request(app)
      .patch('/api/libros/2/estado')
      .set('Authorization', `Bearer ${tOperador}`)
      .send({ estado: 'PRESTADO' });
    expect(cambio.status).toBe(200);
    expect(cambio.body.estado).toBe('PRESTADO');

    // Canal consola (Adapter)
    expect(log).toHaveBeenCalledWith('[NOTIFICACIÓN] Para: usuario@tp.com | Libro #2 | Estado: DISPONIBLE → PRESTADO');

    // Canal in-app (guardado como no leído)
    const notifs = await request(app).get('/api/notificaciones').set('Authorization', `Bearer ${tUsuario}`);
    expect(notifs.body).toHaveLength(1);
    expect(notifs.body[0]).toMatchObject({ libroId: 2, leida: false });

    const leer = await request(app).patch(`/api/notificaciones/${notifs.body[0].id}/leida`).set('Authorization', `Bearer ${tUsuario}`);
    expect(leer.status).toBe(204);
  });

  it('un usuario no puede cambiar el estado → 403 y nadie es notificado', async () => {
    const { app } = await crearAppDePrueba();
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const t = (await request(app).post('/api/auth/login').send({ email: 'usuario@tp.com', password: 'Usuario123' })).body.token;
    const res = await request(app).patch('/api/libros/1/estado').set('Authorization', `Bearer ${t}`).send({ estado: 'PRESTADO' });
    expect(res.status).toBe(403);
    expect(log).not.toHaveBeenCalled();
  });

  it('suscribirse dos veces → 409', async () => {
    const { app } = await crearAppDePrueba();
    const t = (await request(app).post('/api/auth/login').send({ email: 'usuario@tp.com', password: 'Usuario123' })).body.token;
    await request(app).post('/api/libros/1/suscripcion').set('Authorization', `Bearer ${t}`);
    const otra = await request(app).post('/api/libros/1/suscripcion').set('Authorization', `Bearer ${t}`);
    expect(otra.status).toBe(409);
  });
});
