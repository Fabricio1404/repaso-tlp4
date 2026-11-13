import type { Request, Response } from 'express';
import type { UsuarioPublico } from '../domain/tipos';
import type { NotificationService } from '../services/NotificationService';

export class NotificationController {
  private service: NotificationService;

  constructor(service: NotificationService) {
    this.service = service;
  }

  listar = async (_req: Request, res: Response): Promise<void> => {
    const usuario = res.locals.usuario as UsuarioPublico;
    res.json(await this.service.listar(usuario.email));
  };

  marcarLeida = async (req: Request, res: Response): Promise<void> => {
    const usuario = res.locals.usuario as UsuarioPublico;
    await this.service.marcarLeida(Number(req.params.id), usuario.email);
    res.status(204).send();
  };
}
