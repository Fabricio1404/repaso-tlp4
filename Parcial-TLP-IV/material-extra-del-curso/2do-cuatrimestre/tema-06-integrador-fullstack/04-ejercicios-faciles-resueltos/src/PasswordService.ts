import bcrypt from 'bcrypt';

export class ContrasenaDebilError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'ContrasenaDebilError';
  }
}

// 📌 [BCRYPT] Encapsula el hasheo: el resto del sistema no sabe qué algoritmo se usa (SRP)
export class PasswordService {
  private readonly costo: number;

  constructor(costo = 10) {
    this.costo = costo;
  }

  // 📌 [VALIDAR ANTES DE HASHEAR] Al menos 8 caracteres, una mayúscula y un número
  async hashear(password: string): Promise<string> {
    if (password.length < 8) throw new ContrasenaDebilError('Debe tener al menos 8 caracteres');
    if (!/[A-Z]/.test(password)) throw new ContrasenaDebilError('Debe tener al menos una mayúscula');
    if (!/[0-9]/.test(password)) throw new ContrasenaDebilError('Debe tener al menos un número');
    // 📌 [HASH CON SALT] Cada llamada genera un salt distinto: mismo password → hashes distintos
    return bcrypt.hash(password, this.costo);
  }

  // 📌 [COMPARE] Se verifica con compare (no se vuelve a hashear: el salt sería otro)
  verificar(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
