import express from 'express';
import type { ObservadorCompra } from './auditoria/auditoria';
import { CompraController } from './controllers/compra.controller';
import { manejarErrores } from './middlewares/manejo-errores';
import { type CompraRepository, CompraRepositoryEnMemoria } from './repositories/compra.repository';
import { crearCompraRouter } from './routes/compra.routes';
import { CompraService } from './services/compra.service';

export function crearApp(repo: CompraRepository = new CompraRepositoryEnMemoria(), observadores: ObservadorCompra[] = []) {
  const app = express();
  app.use(express.json());
  app.use(crearCompraRouter(new CompraController(new CompraService(repo, observadores))));
  app.use(manejarErrores);
  return app;
}
