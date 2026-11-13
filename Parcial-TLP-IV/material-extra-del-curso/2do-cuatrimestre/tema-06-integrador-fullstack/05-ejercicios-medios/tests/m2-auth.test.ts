import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import { AuthService, CredencialesInvalidasError } from '../src/AuthService';
import { crearAuthenticate } from '../src/authenticate';

let auth: AuthService;

beforeAll(async () => {
  auth = new AuthService(
    [{ id: 7, email: 'ana@tp.com', passwordHash: await bcrypt.hash('Secreta123', 4), permisos: ['libro:read'] }],
    'secreto-test',
  );
});

function app() {
  const a = express();
  a.get('/privado', crearAuthenticate(auth), (_req, res) => {
    res.json({ usuarioId: res.locals.usuarioId, permisos: res.locals.permisos });
  });
  return a;
}

describe('M2 · AuthService', () => {
  it('login correcto devuelve un JWT con sub (string) y email, sin la contraseña', async () => {
    const token = await auth.login('ana@tp.com', 'Secreta123');
    const payload = jwt.decode(token) as Record<string, unknown>;
    expect(payload).toMatchObject({ sub: '7', email: 'ana@tp.com' });
    expect(payload).not.toHaveProperty('password');
    expect(payload).toHaveProperty('exp');
  });

  it('email inexistente y contraseña incorrecta dan el MISMO error', async () => {
    await expect(auth.login('nadie@tp.com', 'Secreta123')).rejects.toThrow(CredencialesInvalidasError);
    await expect(auth.login('ana@tp.com', 'otra')).rejects.toThrow('Credenciales inválidas');
  });
});

describe('M2 · middleware authenticate', () => {
  it('sin cabecera → 401', async () => {
    expect((await request(app()).get('/privado')).status).toBe(401);
  });

  it('cabecera sin "Bearer " → 401', async () => {
    expect((await request(app()).get('/privado').set('Authorization', 'Token abc')).status).toBe(401);
  });

  it('token firmado con OTRO secreto → 401', async () => {
    const falso = jwt.sign({ sub: '7' }, 'otro-secreto');
    expect((await request(app()).get('/privado').set('Authorization', `Bearer ${falso}`)).status).toBe(401);
  });

  it('token vencido → 401', async () => {
    const vencido = jwt.sign({ sub: '7', exp: Math.floor(Date.now() / 1000) - 10 }, 'secreto-test');
    expect((await request(app()).get('/privado').set('Authorization', `Bearer ${vencido}`)).status).toBe(401);
  });

  it('token válido → pasa y deja usuarioId y permisos en res.locals', async () => {
    const token = await auth.login('ana@tp.com', 'Secreta123');
    const res = await request(app()).get('/privado').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ usuarioId: 7, permisos: ['libro:read'] });
  });
});
