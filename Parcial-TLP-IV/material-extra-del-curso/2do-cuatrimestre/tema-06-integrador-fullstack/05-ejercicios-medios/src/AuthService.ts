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

// M2 · TODO: usá bcrypt (compare) y jsonwebtoken (sign / verify)
export class AuthService {
  constructor(usuarios: UsuarioGuardado[], secreto: string) {}

  async login(email: string, password: string): Promise<string> {
    throw new Error('TODO');
  }

  verificar(token: string): { id: number; permisos: string[] } {
    throw new Error('TODO');
  }
}
