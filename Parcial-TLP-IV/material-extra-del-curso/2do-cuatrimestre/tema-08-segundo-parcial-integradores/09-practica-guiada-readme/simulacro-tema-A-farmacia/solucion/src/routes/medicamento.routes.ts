import { Router } from 'express';
import type { MedicamentoController } from '../controllers/medicamento.controller';

export function crearMedicamentoRouter(controller: MedicamentoController): Router {
  const router = Router();
  router.get('/medicamentos', controller.listar);
  router.get('/medicamentos/:id', controller.obtener);
  router.post('/medicamentos', controller.registrar);
  router.post('/medicamentos/:id/venta', controller.vender);
  router.get('/descuento', controller.descuento);
  return router;
}
