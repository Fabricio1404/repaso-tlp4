import { NoEncontradoError, ValidacionError } from '../domain/errores';
import { type NombreRol, ROLES, type UsuarioPublico } from '../domain/tipos';
import type { IUserRepository } from '../repositories/interfaces';

// 📌 [RF6] El administrador lista usuarios y les asigna un rol
export class UserService {
  private usuarios: IUserRepository;

  constructor(usuarios: IUserRepository) {
    this.usuarios = usuarios;
  }

  listar(): Promise<UsuarioPublico[]> {
    return this.usuarios.findAll();
  }

  async asignarRol(id: number, rol: NombreRol): Promise<void> {
    if (!ROLES.includes(rol)) throw new ValidacionError(`Rol inválido. Válidos: ${ROLES.join(', ')}`);
    if (!(await this.usuarios.updateRol(id, rol))) throw new NoEncontradoError('Usuario no encontrado');
  }
}
