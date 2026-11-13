import { Router } from 'express';
import type { CompraController } from '../controllers/compra.controller';

export function crearCompraRouter(c: CompraController): Router {
  const r = Router();
  r.get('/compras', c.listar);
  r.get('/compras/:id', c.obtener);
  r.post('/compras', c.registrar);
  return r;
}
