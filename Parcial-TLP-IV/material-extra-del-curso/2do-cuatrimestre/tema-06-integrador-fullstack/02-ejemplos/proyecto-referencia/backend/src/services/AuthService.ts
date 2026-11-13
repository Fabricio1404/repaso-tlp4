import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConflictoError, CredencialesInvalidasError, ValidacionError } from '../domain/errores';
import type { UsuarioPublico } from '../domain/tipos';
import type { IRoleRepository, IUserRepository } from '../repositories/interfaces';

export interface Sesion {
  token: string;
  usuario: UsuarioPublico;
  permisos: string[];
}

export interface PayloadToken {
  sub: string;
  email: string;
}

// 📌 [RF1 AUTENTICACIÓN] bcrypt para las contraseñas y JWT para la sesión
export class AuthService {
  private usuarios: IUserRepository;
  private roles: IRoleRepository;
  private secreto: string;
  private expiraEn: string;

  constructor(usuarios: IUserRepository, roles: IRoleRepository, secreto: string, expiraEn: string) {
    this.usuarios = usuarios;
    this.roles = roles;
    this.secreto = secreto;
    this.expiraEn = expiraEn;
  }

  async registrar(nombre: string, email: string, password: string): Promise<Sesion> {
    if (typeof nombre !== 'string' || nombre.trim() === '') throw new ValidacionError('El nombre es obligatorio');
    if (typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new ValidacionError('Email inválido');
    if (typeof password !== 'string' || password.length < 8) {
      throw new ValidacionError('La contraseña debe tener al menos 8 caracteres');
    }
    if ((await this.usuarios.findByEmail(email)) !== undefined) throw new ConflictoError('El email ya está registrado');
    // 📌 [BCRYPT HASH] Nunca se guarda la contraseña: se guarda el hash (con salt, costo 10)
    const passwordHash = await bcrypt.hash(password, 10);
    // 📌 [RF2] Todo usuario nuevo es "usuario"
    const creado = await this.usuarios.create({ nombre: nombre.trim(), email, passwordHash, rol: 'usuario' });
    return this.crearSesion(creado.id, creado.email);
  }

  async login(email: string, password: string): Promise<Sesion> {
    const usuario = typeof email === 'string' ? await this.usuarios.findByEmail(email) : undefined;
    // 📌 [BCRYPT COMPARE] Mensaje genérico: no revela si falló el email o la contraseña
    if (usuario === undefined || typeof password !== 'string' || !(await bcrypt.compare(password, usuario.passwordHash))) {
      throw new CredencialesInvalidasError();
    }
    return this.crearSesion(usuario.id, usuario.email);
  }

  // 📌 [JWT VERIFY] Lanza si la firma no coincide o el token venció
  verificarToken(token: string): PayloadToken {
    const payload = jwt.verify(token, this.secreto);
    if (typeof payload === 'string' || typeof payload.sub !== 'string' || typeof payload.email !== 'string') {
      throw new CredencialesInvalidasError();
    }
    return { sub: payload.sub, email: payload.email };
  }

  async permisosDeUsuario(id: number): Promise<{ usuario: UsuarioPublico; permisos: string[] } | undefined> {
    const u = await this.usuarios.findById(id);
    if (u === undefined) return undefined;
    const { passwordHash: _omitido, ...usuario } = u;
    return { usuario, permisos: await this.roles.permisosDe(u.rol) };
  }

  private async crearSesion(id: number, email: string): Promise<Sesion> {
    // 📌 [JWT SIGN] El payload se puede LEER (no está cifrado): solo id y email, nunca la contraseña
    const token = jwt.sign({ sub: String(id), email }, this.secreto, { expiresIn: this.expiraEn as jwt.SignOptions['expiresIn'] });
    const datos = await this.permisosDeUsuario(id);
    if (datos === undefined) throw new CredencialesInvalidasError();
    return { token, usuario: datos.usuario, permisos: datos.permisos };
  }
}
