import type { Request, Response } from 'express';
import type { GimnasioService } from '../services/gimnasio.service';

// Capa de presentación: traduce HTTP <-> servicio. No contiene reglas de negocio.
export class GimnasioController {
  constructor(private readonly service: GimnasioService) {}

  listar = (_req: Request, res: Response) => {
    res.json(this.service.listarClases());
  };

  obtener = (req: Request, res: Response) => {
    res.json(this.service.obtenerClase(Number(req.params.id)));
  };

  reservar = (req: Request, res: Response) => {
    res.json(this.service.reservar(Number(req.params.id), req.body?.cantidad));
  };

  registrarSocio = (req: Request, res: Response) => {
    res.status(201).json(this.service.registrarSocio(req.body));
  };

  cuota = (req: Request, res: Response) => {
    res.json({ cuota: this.service.cuota(Number(req.query.anios ?? 0)) });
  };
}
