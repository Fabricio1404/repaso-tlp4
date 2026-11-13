import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { crearAppDePrueba } from './helpers';

async function login(app: Parameters<typeof request>[0], email: string, password: string): Promise<string> {
  const res = await request(app).post('/api/auth/login').send({ email, password });
  return res.body.token as string;
}

describe('RF1 y RF2: autenticación y permisos validados en el backend', () => {
  it('login correcto devuelve token y permisos del rol', async () => {
    const { app } = await crearAppDePrueba();
    const res = await request(app).post('/api/auth/login').send({ email: 'operador@tp.com', password: 'Operador123' });
    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
    expect(res.body.permisos).toContain('libro:change-status');
    expect(res.body.permisos).not.toContain('libro:delete');
    expect(res.body.usuario).not.toHaveProperty('passwordHash');
  });

  it('login con contraseña incorrecta → 401 con mensaje genérico', async () => {
    const { app } = await crearAppDePrueba();
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@tp.com', password: 'mal' });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'Credenciales inválidas' });
  });

  it('sin token → 401', async () => {
    const { app } = await crearAppDePrueba();
    expect((await request(app).get('/api/libros')).status).toBe(401);
  });

  it('token adulterado → 401', async () => {
    const { app } = await crearAppDePrueba();
    const res = await request(app).get('/api/libros').set('Authorization', 'Bearer abc.def.ghi');
    expect(res.status).toBe(401);
  });

  it('un usuario NO puede eliminar libros → 403 (aunque llame directo a la API)', async () => {
    const { app } = await crearAppDePrueba();
    const token = await login(app, 'usuario@tp.com', 'Usuario123');
    const res = await request(app).delete('/api/libros/1').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(403);
  });

  it('un admin sí puede eliminar → 204', async () => {
    const { app } = await crearAppDePrueba();
    const token = await login(app, 'admin@tp.com', 'Admin123');
    const res = await request(app).delete('/api/libros/1').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it('el registro crea usuarios con rol "usuario"', async () => {
    const { app } = await crearAppDePrueba();
    const res = await request(app).post('/api/auth/register').send({ nombre: 'Nuevo', email: 'nuevo@tp.com', password: 'Nuevo1234' });
    expect(res.status).toBe(201);
    expect(res.body.usuario.rol).toBe('usuario');
  });

  it('RF6: el admin asigna un rol y el cambio se aplica en la siguiente petición', async () => {
    const { app } = await crearAppDePrueba();
    const admin = await login(app, 'admin@tp.com', 'Admin123');
    const tokenUsuario = await login(app, 'usuario@tp.com', 'Usuario123');
    const asignar = await request(app).patch('/api/usuarios/3/rol').set('Authorization', `Bearer ${admin}`).send({ rol: 'operador' });
    expect(asignar.status).toBe(204);
    const crear = await request(app)
      .post('/api/libros')
      .set('Authorization', `Bearer ${tokenUsuario}`)
      .send({ titulo: 'El Aleph', autor: 'Borges' });
    expect(crear.status).toBe(201);
  });
});
