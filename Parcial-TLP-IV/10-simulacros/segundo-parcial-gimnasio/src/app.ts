import express from 'express';
import { GimnasioController } from './controllers/gimnasio.controller';
import { clasesIniciales } from './data/clases-iniciales';
import { manejarErrores } from './middlewares/manejo-errores';
import { type ClaseRepository, ClaseRepositoryEnMemoria } from './repositories/clase.repository';
import { crearGimnasioRouter } from './routes/gimnasio.routes';
import { GimnasioService } from './services/gimnasio.service';

// Arma la aplicación. Cada llamada crea un repositorio nuevo, así los tests no se pisan entre sí.
export function crearApp(repo: ClaseRepository = new ClaseRepositoryEnMemoria(clasesIniciales)) {
  const app = express();
  app.use(express.json());

  const service = new GimnasioService(repo);
  const controller = new GimnasioController(service);

  app.use(crearGimnasioRouter(controller));
  app.use(manejarErrores);
  return app;
}
