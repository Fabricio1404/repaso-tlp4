import { Router } from 'express';
import type { ProductoController } from '../controllers/producto.controller';

// 📌 [CAPA DE RUTAS] Solo asocia método HTTP + URL con un controlador
export function crearProductoRouter(controller: ProductoController): Router {
  const router = Router();
  router.get('/productos', controller.listar);
  router.get('/productos/:id', controller.obtener);
  router.post('/productos', controller.crear);
  router.post('/productos/:id/venta', controller.vender);
  return router;
}
