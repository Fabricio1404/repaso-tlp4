import type { Request, Response } from 'express';
import type { MedicamentoService } from '../services/medicamento.service';

// Capa de presentación: traduce HTTP <-> servicio. No contiene reglas de negocio.
export class MedicamentoController {
  constructor(private readonly service: MedicamentoService) {}

  listar = (_req: Request, res: Response) => {
    res.json(this.service.listar());
  };

  obtener = (req: Request, res: Response) => {
    res.json(this.service.obtener(Number(req.params.id)));
  };

  registrar = (req: Request, res: Response) => {
    res.status(201).json(this.service.registrar(req.body));
  };

  vender = (req: Request, res: Response) => {
    res.json(this.service.vender(Number(req.params.id), req.body?.cantidad));
  };

  descuento = (req: Request, res: Response) => {
    res.json({ descuento: this.service.descuento(Number(req.query.edad), Number(req.query.monto)) });
  };
}
