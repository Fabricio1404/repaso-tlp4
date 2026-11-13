import express, { type NextFunction, type Request, type Response } from 'express';
import { calcularPrecioFinal } from './services/precios';

// 📌 [APP SEPARADA DEL SERVER] crearApp arma la app SIN escuchar un puerto: Supertest la usa directamente
export function crearApp() {
  const app = express();
  // 📌 [MIDDLEWARE JSON] Convierte el body JSON de la petición en req.body
  app.use(express.json());

  // 📌 [RUTA + CONTROLADOR] Traduce HTTP → servicio → HTTP. Sin reglas de negocio acá
  app.post('/api/precios/calcular', (req: Request, res: Response) => {
    const precio = Number(req.body?.precio);
    const descuento = Number(req.body?.descuento);
    const precioFinal = calcularPrecioFinal(precio, descuento);
    res.json({ precio, descuento, precioFinal });
  });

  // 📌 [MIDDLEWARE DE ERRORES] 4 parámetros; se registra al final. Traduce RangeError → 400 con { error }
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
