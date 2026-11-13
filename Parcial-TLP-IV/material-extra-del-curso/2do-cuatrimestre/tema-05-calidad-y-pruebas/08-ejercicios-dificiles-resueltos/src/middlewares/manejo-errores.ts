import type { NextFunction, Request, Response } from 'express';
import { ConflictoError, NoEncontradoError, ValidacionError } from '../errors';

export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidacionError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof NoEncontradoError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err instanceof ConflictoError) {
    res.status(409).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Error interno del servidor' });
}
