import { Router } from 'express';
import type { CompraController } from '../controllers/compra.controller';

export function crearCompraRouter(c: CompraController): Router {
  const r = Router();
  r.get('/compras', c.listar);
  // 📌 [TDD - R8 · ORDEN] /compras/total ANTES de /compras/:id
  r.get('/compras/total', c.total);
  r.get('/compras/:id', c.obtener);
  r.post('/compras', c.registrar);
  return r;
}
