import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { AuthService } from '../services/AuthService';

export function crearAuthenticate(auth: AuthService): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const header = req.headers.authorization;
    if (header === undefined || !header.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Falta el token de autenticación' });
      return;
    }
    try {
      const payload = auth.verificarToken(header.slice('Bearer '.length));
      const datos = await auth.permisosDeUsuario(Number(payload.sub));
      if (datos === undefined) {
        res.status(401).json({ error: 'Usuario inexistente' });
        return;
      }
      res.locals.usuario = datos.usuario;
      res.locals.permisos = datos.permisos;
      next();
    } catch {
      res.status(401).json({ error: 'Token inválido o vencido' });
    }
  };
}
