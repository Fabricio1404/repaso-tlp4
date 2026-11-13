import type { Request, Response } from 'express';
import type { AuthService } from '../services/AuthService';

// 📌 [CONTROLLER] Lee la request, llama al servicio, responde. Sin lógica de negocio
export class AuthController {
  private auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  registrar = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password } = req.body ?? {};
    res.status(201).json(await this.auth.registrar(nombre, email, password));
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body ?? {};
    res.json(await this.auth.login(email, password));
  };

  // Devuelve el usuario y los permisos actuales (el frontend lo usa al recargar la página)
  yo = (_req: Request, res: Response): void => {
    res.json({ usuario: res.locals.usuario, permisos: res.locals.permisos });
  };
}
