import type { Request, Response } from 'express';
import type { EstadoLibro } from '../domain/tipos';
import type { LibroService } from '../services/LibroService';

export class LibroController {
  private service: LibroService;

  constructor(service: LibroService) {
    this.service = service;
  }

  listar = async (_req: Request, res: Response): Promise<void> => {
    res.json(await this.service.listar());
  };

  obtener = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.service.obtener(Number(req.params.id)));
  };

  crear = async (req: Request, res: Response): Promise<void> => {
    res.status(201).json(await this.service.crear(req.body));
  };

  actualizar = async (req: Request, res: Response): Promise<void> => {
    res.json(await this.service.actualizar(Number(req.params.id), req.body));
  };

  cambiarEstado = async (req: Request, res: Response): Promise<void> => {
    const estado = req.body?.estado as EstadoLibro;
    res.json(await this.service.changeStatus(Number(req.params.id), estado));
  };

  // 📌 [MODIFICACIÓN B · CONTROLLER] text/csv en lugar de JSON
  exportar = async (_req: Request, res: Response): Promise<void> => {
    res.type('text/csv').send(await this.service.exportarCsv());
  };

  eliminar = async (req: Request, res: Response): Promise<void> => {
    await this.service.eliminar(Number(req.params.id));
    res.status(204).send();
  };
}
