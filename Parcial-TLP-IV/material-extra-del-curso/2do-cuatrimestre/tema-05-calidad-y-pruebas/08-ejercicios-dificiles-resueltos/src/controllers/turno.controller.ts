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
    // 📌 [DEFECTO 2 CORREGIDO - R7] Antes: service.buscar (devolvía undefined → 200 con cuerpo vacío). obtener lanza NoEncontradoError → 404
    res.json(this.service.obtener(Number(req.params.id)));
  };

  reservar = (req: Request, res: Response): void => {
    // 📌 [DEFECTO 3 CORREGIDO - R7] Antes: res.json (200). Crear un recurso responde 201
    res.status(201).json(this.service.reservar(req.body));
  };

  cancelar = (req: Request, res: Response): void => {
    res.json(this.service.cancelar(Number(req.params.id)));
  };

  // 📌 [TDD - R8] Método nuevo: 204 sin cuerpo
  eliminar = (req: Request, res: Response): void => {
    this.service.eliminar(Number(req.params.id));
    res.status(204).send();
  };
}
