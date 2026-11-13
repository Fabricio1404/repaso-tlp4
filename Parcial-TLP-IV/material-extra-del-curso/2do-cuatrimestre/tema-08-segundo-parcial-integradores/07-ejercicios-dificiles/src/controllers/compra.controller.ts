import type { Request, Response } from 'express';
import type { CompraService } from '../services/compra.service';

export class CompraController {
  private service: CompraService;
  constructor(service: CompraService) {
    this.service = service;
  }

  registrar = (req: Request, res: Response): void => {
    res.json(this.service.registrar(req.body));
  };

  obtener = (req: Request, res: Response): void => {
    res.json(this.service.obtener(Number(req.params.id)));
  };

  listar = (_req: Request, res: Response): void => {
    res.json(this.service.listar());
  };
}
