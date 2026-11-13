import type { Request, Response } from 'express';
import type { UsuarioPublico } from '../domain/tipos';
import type { SubscriptionService } from '../services/SubscriptionService';

export class SubscriptionController {
  private service: SubscriptionService;

  constructor(service: SubscriptionService) {
    this.service = service;
  }

  suscribir = async (req: Request, res: Response): Promise<void> => {
    const usuario = res.locals.usuario as UsuarioPublico;
    await this.service.suscribir(usuario.id, Number(req.params.id));
    res.status(201).json({ mensaje: 'Suscripción creada' });
  };

  desuscribir = async (req: Request, res: Response): Promise<void> => {
    const usuario = res.locals.usuario as UsuarioPublico;
    await this.service.desuscribir(usuario.id, Number(req.params.id));
    res.status(204).send();
  };
}
