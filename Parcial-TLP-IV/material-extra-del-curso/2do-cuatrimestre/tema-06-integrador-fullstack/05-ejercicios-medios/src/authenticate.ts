import type { NextFunction, Request, Response } from 'express';
import type { AuthService } from './AuthService';

// M2 · TODO
export function crearAuthenticate(auth: AuthService) {
  return (req: Request, res: Response, next: NextFunction): void => {
    throw new Error('TODO');
  };
}
