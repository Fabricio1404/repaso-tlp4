import type { NextFunction, Request, Response } from 'express';

// F1 · Completá. Ver ENUNCIADOS.md y tests/authorize.test.ts (los tests son la especificación).
export function authorize(permiso: string) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    throw new Error(`TODO: authorize(${permiso})`);
  };
}

export function authorizeAll(...requeridos: string[]) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    throw new Error(`TODO: authorizeAll(${requeridos.join(',')})`);
  };
}
