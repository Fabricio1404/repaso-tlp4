import type { NextFunction, Request, Response } from 'express';

// authenticate (antes) deja en res.locals.permisos la lista de permisos del rol
export function authorize(permiso: string) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const permisos = res.locals.permisos as string[] | undefined;
    if (permisos === undefined || !permisos.includes(permiso)) {
      res.status(403).json({ error: 'No tenés permiso para esta acción' });
      return;
    }
    next();
  };
}
