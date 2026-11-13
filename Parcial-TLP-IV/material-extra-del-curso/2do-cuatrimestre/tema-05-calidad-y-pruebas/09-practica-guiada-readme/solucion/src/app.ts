import express, { type NextFunction, type Request, type Response } from 'express';
import { calcularPrecioFinal } from './services/precios';

export function crearApp() {
  const app = express();
  app.use(express.json());

  app.post('/api/precios/calcular', (req: Request, res: Response) => {
    const precio = Number(req.body?.precio);
    const descuento = Number(req.body?.descuento);
    const precioFinal = calcularPrecioFinal(precio, descuento);
    res.json({ precio, descuento, precioFinal });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof RangeError) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
}

export const app = crearApp();
