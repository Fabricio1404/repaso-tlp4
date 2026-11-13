import { Router } from 'express';
import type { GimnasioController } from '../controllers/gimnasio.controller';

export function crearGimnasioRouter(controller: GimnasioController): Router {
  const router = Router();
  router.get('/clases', controller.listar);
  router.get('/clases/:id', controller.obtener);
  router.post('/clases/:id/reserva', controller.reservar);
  router.post('/socios', controller.registrarSocio);
  router.get('/cuota', controller.cuota);
  return router;
}
