import type { Request, Response } from 'express';
import type { ProductoService } from '../services/producto.service';

// 📌 [CAPA DE PRESENTACIÓN] Traduce HTTP ↔ servicio. Sin reglas de negocio
export class ProductoController {
  private readonly service: ProductoService;

  constructor(service: ProductoService) {
    this.service = service;
  }

  // 📌 [MÉTODOS COMO FUNCIONES FLECHA] Se pasan sueltos al router (router.get('/x', controller.listar)): con flecha, this sigue apuntando al controlador
  listar = (_req: Request, res: Response): void => {
    res.json(this.service.listar());
  };

  obtener = (req: Request, res: Response): void => {
    // 📌 [OBTENER, NO BUSCAR] Llama al método que LANZA si no existe; así el middleware responde 404
    res.json(this.service.obtener(Number(req.params.id)));
  };

  crear = (req: Request, res: Response): void => {
    // 📌 [201 CREATED] Al crear un recurso
    res.status(201).json(this.service.crear(req.body));
  };

  vender = (req: Request, res: Response): void => {
    res.json(this.service.vender(Number(req.params.id), req.body?.cantidad));
  };
}
