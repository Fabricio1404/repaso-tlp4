import type { NextFunction, Request, Response } from 'express';
import { NoEncontradoError, StockInsuficienteError, ValidacionError } from '../errors';

// 📌 [MIDDLEWARE DE ERRORES] 4 parámetros = Express lo reconoce como manejador de errores. Traduce dominio → HTTP
export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidacionError || err instanceof RangeError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof NoEncontradoError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err instanceof StockInsuficienteError) {
    res.status(409).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Error interno del servidor' });
}
