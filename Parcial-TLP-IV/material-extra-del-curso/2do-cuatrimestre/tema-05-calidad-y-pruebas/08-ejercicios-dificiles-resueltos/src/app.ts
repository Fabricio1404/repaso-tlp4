import express from 'express';
import { TurnoController } from './controllers/turno.controller';
import { turnosIniciales } from './data/turnos-iniciales';
import { manejarErrores } from './middlewares/manejo-errores';
import { type TurnoRepository, TurnoRepositoryEnMemoria } from './repositories/turno.repository';
import { crearTurnoRouter } from './routes/turno.routes';
import { type Notificador, NotificadorMemoria } from './services/notificador';
import { TurnoService } from './services/turno.service';

interface Dependencias {
  repo?: TurnoRepository;
  notificador?: Notificador;
}

// Cada llamada crea dependencias nuevas, así los tests no se pisan entre sí.
export function crearApp(deps: Dependencias = {}) {
  const repo = deps.repo ?? new TurnoRepositoryEnMemoria(turnosIniciales);
  const notificador = deps.notificador ?? new NotificadorMemoria();

  const app = express();
  app.use(express.json());
  const controller = new TurnoController(new TurnoService(repo, notificador));
  app.use(crearTurnoRouter(controller));
  app.use(manejarErrores);
  return app;
}
