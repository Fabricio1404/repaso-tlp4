import type { NextFunction, Request, Response } from 'express';
import { ConflictoError, CredencialesInvalidasError, NoEncontradoError, ValidacionError } from '../domain/errores';

// 📌 [MIDDLEWARE DE ERRORES] 4 parámetros. Traduce errores de dominio a códigos HTTP
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidacionError) {
    res.status(400).json({ error: err.message });
  } else if (err instanceof CredencialesInvalidasError) {
    res.status(401).json({ error: err.message });
  } else if (err instanceof NoEncontradoError) {
    res.status(404).json({ error: err.message });
  } else if (err instanceof ConflictoError) {
    res.status(409).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
