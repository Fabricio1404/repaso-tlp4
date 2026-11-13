import type { NextFunction, Request, Response } from 'express';

// 📌 [FACTORY DE MIDDLEWARES / CLOSURE] authorize('libro:delete') devuelve un middleware que recuerda el permiso
export function authorize(permiso: string) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    // 📌 [RES.LOCALS] authenticate (que corre antes) dejó acá los permisos del rol
    const permisos = res.locals.permisos as string[] | undefined;
    // 📌 [403] Autenticado pero sin el permiso: se corta la cadena respondiendo y haciendo return
    if (permisos === undefined || !permisos.includes(permiso)) {
      res.status(403).json({ error: 'No tenés permiso para esta acción' });
      return;
    }
    // 📌 [NEXT] Tiene permiso: pasa al siguiente middleware/controlador
    next();
  };
}

// 📌 [VARIANTE] Exige TODOS los permisos de la lista
export function authorizeAll(...requeridos: string[]) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const permisos = (res.locals.permisos as string[] | undefined) ?? [];
    const faltantes = requeridos.filter((p) => !permisos.includes(p));
    if (faltantes.length > 0) {
      res.status(403).json({ error: `Faltan permisos: ${faltantes.join(', ')}` });
      return;
    }
    next();
  };
}
