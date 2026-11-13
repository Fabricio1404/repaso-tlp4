import cors from 'cors';
import express from 'express';
import { AuthController } from './controllers/AuthController';
import { LibroController } from './controllers/LibroController';
import { NotificationController } from './controllers/NotificationController';
import { SubscriptionController } from './controllers/SubscriptionController';
import { UserController } from './controllers/UserController';
import { crearAuthenticate } from './middlewares/authenticate';
import { errorHandler } from './middlewares/errorHandler';
import { crearRouter } from './routes';
import type { AuthService } from './services/AuthService';
import type { LibroService } from './services/LibroService';
import type { NotificationService } from './services/NotificationService';
import type { SubscriptionService } from './services/SubscriptionService';
import type { UserService } from './services/UserService';

export interface Servicios {
  auth: AuthService;
  libros: LibroService;
  suscripciones: SubscriptionService;
  notificaciones: NotificationService;
  usuarios: UserService;
}

// 📌 [APP SIN LISTEN] Recibe los servicios ya construidos (desde main.ts o desde un test): no sabe si atrás hay Sequelize o memoria
export function crearApp(s: Servicios, corsOrigin = '*') {
  const app = express();
  // 📌 [CORS] El navegador bloquea peticiones entre orígenes distintos (5173 → 3000) salvo que el backend las permita
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json());

  const controladores = {
    auth: new AuthController(s.auth),
    libros: new LibroController(s.libros),
    suscripciones: new SubscriptionController(s.suscripciones),
    notificaciones: new NotificationController(s.notificaciones),
    usuarios: new UserController(s.usuarios),
  };
  app.use('/api', crearRouter(controladores, crearAuthenticate(s.auth)));
  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });
  app.use(errorHandler);
  return app;
}
