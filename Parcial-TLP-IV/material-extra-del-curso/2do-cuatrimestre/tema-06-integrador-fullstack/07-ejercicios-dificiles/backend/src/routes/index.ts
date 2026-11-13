import { type RequestHandler, Router } from 'express';
import type { AuthController } from '../controllers/AuthController';
import type { LibroController } from '../controllers/LibroController';
import type { NotificationController } from '../controllers/NotificationController';
import type { SubscriptionController } from '../controllers/SubscriptionController';
import type { UserController } from '../controllers/UserController';
import { authorize } from '../middlewares/authorize';

export interface Controladores {
  auth: AuthController;
  libros: LibroController;
  suscripciones: SubscriptionController;
  notificaciones: NotificationController;
  usuarios: UserController;
}

export function crearRouter(c: Controladores, authenticate: RequestHandler): Router {
  const r = Router();

  // RF1 (públicas)
  r.post('/auth/register', c.auth.registrar);
  r.post('/auth/login', c.auth.login);
  r.get('/auth/me', authenticate, c.auth.yo);

  // RF3 Libros
  r.get('/libros', authenticate, authorize('libro:read'), c.libros.listar);
  r.get('/libros/:id', authenticate, authorize('libro:read'), c.libros.obtener);
  r.post('/libros', authenticate, authorize('libro:create'), c.libros.crear);
  r.put('/libros/:id', authenticate, authorize('libro:update'), c.libros.actualizar);
  r.patch('/libros/:id/estado', authenticate, authorize('libro:change-status'), c.libros.cambiarEstado);
  r.delete('/libros/:id', authenticate, authorize('libro:delete'), c.libros.eliminar);

  // RF4 Suscripciones
  r.post('/libros/:id/suscripcion', authenticate, authorize('subscription:create'), c.suscripciones.suscribir);
  r.delete('/libros/:id/suscripcion', authenticate, authorize('subscription:delete'), c.suscripciones.desuscribir);

  // RF5 Notificaciones in-app
  r.get('/notificaciones', authenticate, authorize('notification:read'), c.notificaciones.listar);
  r.patch('/notificaciones/:id/leida', authenticate, authorize('notification:read'), c.notificaciones.marcarLeida);

  // RF6 Usuarios
  r.get('/usuarios', authenticate, authorize('user:read'), c.usuarios.listar);
  r.patch('/usuarios/:id/rol', authenticate, authorize('user:assign-role'), c.usuarios.asignarRol);

  return r;
}
