import express, { type NextFunction, type Request, type Response } from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { authorize, authorizeAll } from '../src/authorize';

// App mínima de prueba: un "authenticate falso" lee los permisos de una cabecera.
function appCon(middleware: ReturnType<typeof authorize>) {
  const app = express();
  app.use((req: Request, res: Response, next: NextFunction) => {
    const header = req.headers['x-permisos'];
    if (typeof header === 'string') res.locals.permisos = header.split(',');
    next();
  });
  app.delete('/libros/1', middleware, (_req, res) => {
    res.status(204).send();
  });
  return app;
}

describe('F1 · authorize(permiso)', () => {
  it('con el permiso deja pasar (204)', async () => {
    const res = await request(appCon(authorize('libro:delete'))).delete('/libros/1').set('x-permisos', 'libro:read,libro:delete');
    expect(res.status).toBe(204);
  });

  it('sin el permiso responde 403 con { error }', async () => {
    const res = await request(appCon(authorize('libro:delete'))).delete('/libros/1').set('x-permisos', 'libro:read');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'No tenés permiso para esta acción' });
  });

  it('si no hay permisos cargados (no pasó por authenticate) también responde 403', async () => {
    const res = await request(appCon(authorize('libro:delete'))).delete('/libros/1');
    expect(res.status).toBe(403);
  });

  it('compara el permiso exacto (libro:delete ≠ libro:delete-all)', async () => {
    const res = await request(appCon(authorize('libro:delete'))).delete('/libros/1').set('x-permisos', 'libro:delete-all');
    expect(res.status).toBe(403);
  });

  it('authorizeAll exige todos y lista los faltantes', async () => {
    const res = await request(appCon(authorizeAll('libro:read', 'libro:delete', 'user:read')))
      .delete('/libros/1')
      .set('x-permisos', 'libro:read');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({ error: 'Faltan permisos: libro:delete, user:read' });
  });
});
