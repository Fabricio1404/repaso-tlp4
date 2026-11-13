import type { Request, Response } from 'express';
import type { TurnoService } from '../services/turno.service';

export class TurnoController {
  private readonly service: TurnoService;

  constructor(service: TurnoService) {
    this.service = service;
  }

  listar = (_req: Request, res: Response): void => {
    res.json(this.service.listar());
  };

  obtener = (req: Request, res: Response): void => {
    res.json(this.service.buscar(Number(req.params.id)));
  };

  reservar = (req: Request, res: Response): void => {
    res.json(this.service.reservar(req.body));
  };

  cancelar = (req: Request, res: Response): void => {
    res.json(this.service.cancelar(Number(req.params.id)));
  };
}
