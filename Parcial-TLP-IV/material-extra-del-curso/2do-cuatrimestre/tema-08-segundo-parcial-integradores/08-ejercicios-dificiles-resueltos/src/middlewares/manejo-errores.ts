import type { NextFunction, Request, Response } from 'express';
import { CondicionCuponError, CuponInvalidoError, NoEncontradoError, ValidacionError } from '../dominio/errores';

export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  // 📌 [DEFECTO 4 CORREGIDO - R7] Faltaba CuponInvalidoError: un cupón inexistente terminaba en 500
  if (err instanceof ValidacionError || err instanceof CuponInvalidoError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof NoEncontradoError) {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err instanceof CondicionCuponError) {
    res.status(409).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Error interno del servidor' });
}
