import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UsuarioGuardado {
  id: number;
  email: string;
  passwordHash: string;
  permisos: string[];
}

export class CredencialesInvalidasError extends Error {
  constructor() {
    super('Credenciales inválidas');
  }
}

// 📌 [JWT + BCRYPT]
export class AuthService {
  private usuarios: UsuarioGuardado[];
  private secreto: string;

  constructor(usuarios: UsuarioGuardado[], secreto: string) {
    this.usuarios = usuarios;
    this.secreto = secreto;
  }

  async login(email: string, password: string): Promise<string> {
    const u = this.usuarios.find((x) => x.email === email);
    // 📌 [MENSAJE GENÉRICO] Mismo error si no existe el email o si la contraseña es incorrecta
    if (u === undefined || !(await bcrypt.compare(password, u.passwordHash))) {
      throw new CredencialesInvalidasError();
    }
    // 📌 [SUB COMO STRING] El estándar define sub como string
    return jwt.sign({ sub: String(u.id), email: u.email }, this.secreto, { expiresIn: '1h' });
  }

  // 📌 [VERIFY] Lanza si la firma no coincide o si venció
  verificar(token: string): { id: number; permisos: string[] } {
    const payload = jwt.verify(token, this.secreto);
    if (typeof payload === 'string' || payload.sub === undefined) throw new CredencialesInvalidasError();
    const u = this.usuarios.find((x) => x.id === Number(payload.sub));
    if (u === undefined) throw new CredencialesInvalidasError();
    return { id: u.id, permisos: [...u.permisos] };
  }
}
