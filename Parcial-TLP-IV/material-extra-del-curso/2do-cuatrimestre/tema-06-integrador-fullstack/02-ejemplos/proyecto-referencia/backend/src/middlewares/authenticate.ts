import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { AuthService } from '../services/AuthService';

// 📌 [AUTENTICACIÓN - MIDDLEWARE] ¿Quién sos? Valida el JWT y deja en res.locals el usuario y los permisos de su rol
export function crearAuthenticate(auth: AuthService): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const header = req.headers.authorization;
    // 📌 [401] Sin token o con formato incorrecto → no autenticado
    if (header === undefined || !header.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Falta el token de autenticación' });
      return;
    }
    try {
      const payload = auth.verificarToken(header.slice('Bearer '.length));
      // 📌 [PERMISOS DESDE LA BASE] Si el admin cambia el rol, se aplica en la próxima petición (no hay que esperar a que venza el token)
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
