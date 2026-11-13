import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ServicioCorreoLegacy } from '../src/externos/ServicioCorreoLegacy';
import { crearAppDePrueba } from './helpers';

async function token(app: Parameters<typeof request>[0], email: string, password: string): Promise<string> {
  return (await request(app).post('/api/auth/login').send({ email, password })).body.token as string;
}

describe('Modificación A · canal de email', () => {
  afterEach(() => vi.restoreAllMocks());

  it('al cambiar el estado, cada suscriptor también recibe un correo (además de in-app y consola)', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const correo = vi.spyOn(ServicioCorreoLegacy.prototype, 'enviarCorreo');
    const { app } = await crearAppDePrueba();
    const tUsuario = await token(app, 'usuario@tp.com', 'Usuario123');
    const tOperador = await token(app, 'operador@tp.com', 'Operador123');
    await request(app).post('/api/libros/1/suscripcion').set('Authorization', `Bearer ${tUsuario}`);

    await request(app).patch('/api/libros/1/estado').set('Authorization', `Bearer ${tOperador}`).send({ estado: 'PRESTADO' });

    expect(correo).toHaveBeenCalledTimes(1);
    expect(correo).toHaveBeenCalledWith('usuario@tp.com', 'Cambio de estado del libro #1', 'DISPONIBLE → PRESTADO');
    const inapp = await request(app).get('/api/notificaciones').set('Authorization', `Bearer ${tUsuario}`);
    expect(inapp.body).toHaveLength(1);
  });
});

describe('Modificación B · permiso libro:export', () => {
  it('el operador descarga el CSV de libros', async () => {
    const { app } = await crearAppDePrueba();
    const res = await request(app).get('/api/libros/export').set('Authorization', `Bearer ${await token(app, 'operador@tp.com', 'Operador123')}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.text.split('\n')).toEqual([
      'id,titulo,autor,estado',
      '1,Rayuela,Julio Cortázar,DISPONIBLE',
      '2,Ficciones,Jorge Luis Borges,DISPONIBLE',
      '3,Martín Fierro,José Hernández,DISPONIBLE',
    ]);
  });

  it('un usuario no tiene libro:export → 403', async () => {
    const { app } = await crearAppDePrueba();
    const res = await request(app).get('/api/libros/export').set('Authorization', `Bearer ${await token(app, 'usuario@tp.com', 'Usuario123')}`);
    expect(res.status).toBe(403);
  });

  it('el login del admin y del operador incluye libro:export; el del usuario no', async () => {
    const { app } = await crearAppDePrueba();
    const admin = await request(app).post('/api/auth/login').send({ email: 'admin@tp.com', password: 'Admin123' });
    const usuario = await request(app).post('/api/auth/login').send({ email: 'usuario@tp.com', password: 'Usuario123' });
    expect(admin.body.permisos).toContain('libro:export');
    expect(usuario.body.permisos).not.toContain('libro:export');
  });
});

describe('Modificación C · no se puede eliminar un libro PRESTADO', () => {
  it('eliminar un libro prestado → 409 y el libro sigue existiendo', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const { app } = await crearAppDePrueba();
    const tAdmin = await token(app, 'admin@tp.com', 'Admin123');
    await request(app).patch('/api/libros/2/estado').set('Authorization', `Bearer ${tAdmin}`).send({ estado: 'PRESTADO' });
    const res = await request(app).delete('/api/libros/2').set('Authorization', `Bearer ${tAdmin}`);
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: 'No se puede eliminar un libro prestado' });
    const libro = await request(app).get('/api/libros/2').set('Authorization', `Bearer ${tAdmin}`);
    expect(libro.status).toBe(200);
    vi.restoreAllMocks();
  });
});
