import express from 'express';
import { ProductoController } from './controllers/producto.controller';
import { productosIniciales } from './data/productos-iniciales';
import { manejarErrores } from './middlewares/manejo-errores';
import { type ProductoRepository, ProductoRepositoryEnMemoria } from './repositories/producto.repository';
import { crearProductoRouter } from './routes/producto.routes';
import { ProductoService } from './services/producto.service';

// 📌 [COMPOSITION ROOT] Acá se crean y conectan las capas. Cada llamada crea un repo nuevo: los tests no se pisan
export function crearApp(repo: ProductoRepository = new ProductoRepositoryEnMemoria(productosIniciales)) {
  const app = express();
  app.use(express.json());

  const service = new ProductoService(repo);
  const controller = new ProductoController(service);

  app.use(crearProductoRouter(controller));
  // 📌 [ORDEN] El manejador de errores va DESPUÉS de las rutas
  app.use(manejarErrores);
  return app;
}
