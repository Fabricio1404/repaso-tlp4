import { Router } from 'express';
import type { LibroController } from '../controllers/libro.controller';

export function crearLibroRouter(controller: LibroController): Router {
  const router = Router();
  router.get('/libros', controller.listar);
  router.get('/libros/:id', controller.obtener);
  router.post('/libros', controller.registrar);
  router.post('/libros/:id/prestamo', controller.prestar);
  router.get('/multas', controller.multa);
  return router;
}
