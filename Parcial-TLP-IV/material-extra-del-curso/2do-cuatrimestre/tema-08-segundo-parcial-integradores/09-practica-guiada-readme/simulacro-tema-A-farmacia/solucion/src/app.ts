import express from 'express';
import { MedicamentoController } from './controllers/medicamento.controller';
import { medicamentosIniciales } from './data/medicamentos-iniciales';
import { manejarErrores } from './middlewares/manejo-errores';
import { type MedicamentoRepository, MedicamentoRepositoryEnMemoria } from './repositories/medicamento.repository';
import { crearMedicamentoRouter } from './routes/medicamento.routes';
import { MedicamentoService } from './services/medicamento.service';

// Arma la aplicación. Cada llamada crea un repositorio nuevo, así los tests no se pisan entre sí.
export function crearApp(repo: MedicamentoRepository = new MedicamentoRepositoryEnMemoria(medicamentosIniciales)) {
  const app = express();
  app.use(express.json());
  const controller = new MedicamentoController(new MedicamentoService(repo));
  app.use(crearMedicamentoRouter(controller));
  app.use(manejarErrores);
  return app;
}
