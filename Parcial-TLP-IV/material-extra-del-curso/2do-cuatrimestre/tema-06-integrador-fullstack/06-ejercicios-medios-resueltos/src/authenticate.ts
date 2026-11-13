import type { NextFunction, Request, Response } from 'express';
import type { AuthService } from './AuthService';

// 📌 [MIDDLEWARE AUTHENTICATE] Lee "Authorization: Bearer <token>", verifica y deja usuarioId y permisos en res.locals
export function crearAuthenticate(auth: AuthService) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization;
    if (header === undefined || !header.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Falta el token' });
      return;
    }
    try {
      const datos = auth.verificar(header.slice(7));
      res.locals.usuarioId = datos.id;
      res.locals.permisos = datos.permisos;
      next();
    } catch {
      res.status(401).json({ error: 'Token inválido o vencido' });
    }
  };
}
