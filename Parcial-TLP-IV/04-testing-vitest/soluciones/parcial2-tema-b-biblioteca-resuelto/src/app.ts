import express from 'express';
import { LibroController } from './controllers/libro.controller';
import { librosIniciales } from './data/libros-iniciales';
import { manejarErrores } from './middlewares/manejo-errores';
import { type LibroRepository, LibroRepositoryEnMemoria } from './repositories/libro.repository';
import { crearLibroRouter } from './routes/libro.routes';
import { LibroService } from './services/libro.service';

// Arma la aplicación. Cada llamada crea un repositorio nuevo, así los tests no se pisan entre sí.
export function crearApp(repo: LibroRepository = new LibroRepositoryEnMemoria(librosIniciales)) {
  const app = express();
  app.use(express.json());

  const service = new LibroService(repo);
  const controller = new LibroController(service);

  app.use(crearLibroRouter(controller));
  app.use(manejarErrores);
  return app;
}
