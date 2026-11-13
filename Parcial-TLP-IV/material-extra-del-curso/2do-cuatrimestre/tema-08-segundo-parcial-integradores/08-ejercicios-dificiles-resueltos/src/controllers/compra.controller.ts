import type { Request, Response } from 'express';
import type { CompraService } from '../services/compra.service';

export class CompraController {
  private service: CompraService;
  constructor(service: CompraService) {
    this.service = service;
  }

  registrar = (req: Request, res: Response): void => {
    // 📌 [DEFECTO 3 CORREGIDO - R7] Antes: res.json (200). Crear responde 201
    res.status(201).json(this.service.registrar(req.body));
  };

  obtener = (req: Request, res: Response): void => {
    res.json(this.service.obtener(Number(req.params.id)));
  };

  listar = (_req: Request, res: Response): void => {
    res.json(this.service.listar());
  };

  // 📌 [TDD - R8]
  total = (_req: Request, res: Response): void => {
    res.json({ total: this.service.totalVendido() });
  };
}
