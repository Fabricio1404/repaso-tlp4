import type { Request, Response } from 'express';
import type { NombreRol } from '../domain/tipos';
import type { UserService } from '../services/UserService';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  listar = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.service.listar());
  };

  asignarRol = async (req: Request, res: Response): Promise<void> => {
    await this.service.asignarRol(Number(req.params.id), req.body?.rol as NombreRol);
    res.status(204).send();
  };
}
