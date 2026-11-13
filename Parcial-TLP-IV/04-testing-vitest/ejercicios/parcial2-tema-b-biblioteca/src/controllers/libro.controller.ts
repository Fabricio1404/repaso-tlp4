import type { Request, Response } from 'express';
import type { LibroService } from '../services/libro.service';

// Capa de presentación: traduce HTTP <-> servicio. No contiene reglas de negocio.
export class LibroController {
  constructor(private readonly service: LibroService) {}

  listar = (_req: Request, res: Response) => {
    res.json(this.service.listar());
  };

  obtener = (req: Request, res: Response) => {
    res.json(this.service.buscar(Number(req.params.id)));
  };

  registrar = (req: Request, res: Response) => {
    res.status(201).json(this.service.registrar(req.body));
  };

  prestar = (req: Request, res: Response) => {
    res.json(this.service.prestar(Number(req.params.id), req.body?.cantidad));
  };

  multa = (req: Request, res: Response) => {
    res.json({ multa: this.service.multa(Number(req.query.dias ?? 0)) });
  };
}
