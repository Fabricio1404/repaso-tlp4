import type { NextFunction, Request, Response } from 'express';
import { CuposInsuficientesError, NoEncontradoError, ValidacionError } from '../errors';

// Traduce los errores del dominio a códigos de estado HTTP.
export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ValidacionError || err instanceof RangeError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof NoEncontradoError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err instanceof CuposInsuficientesError) {
    res.status(409).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Error interno del servidor' });
}
