// F2 · Completá. Ver ENUNCIADOS.md y tests/password.test.ts.

export class ContrasenaDebilError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'ContrasenaDebilError';
  }
}

export class PasswordService {
  private readonly costo: number;

  constructor(costo = 10) {
    this.costo = costo;
  }

  async hashear(password: string): Promise<string> {
    throw new Error('TODO: hashear');
  }

  async verificar(password: string, hash: string): Promise<boolean> {
    throw new Error('TODO: verificar');
  }
}
