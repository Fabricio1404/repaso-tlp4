import { Router } from 'express';
import type { TurnoController } from '../controllers/turno.controller';

export function crearTurnoRouter(controller: TurnoController): Router {
  const router = Router();
  router.get('/turnos', controller.listar);
  router.get('/turnos/:id', controller.obtener);
  router.post('/turnos', controller.reservar);
  router.post('/turnos/:id/cancelar', controller.cancelar);
  // 📌 [TDD - R8] Ruta nueva
  router.delete('/turnos/:id', controller.eliminar);
  return router;
}
