export class ValidacionError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'ValidacionError';
  }
}

export class CredencialesInvalidasError extends Error {
  constructor() {
    super('Credenciales inválidas');
    this.name = 'CredencialesInvalidasError';
  }
}

export class NoEncontradoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'NoEncontradoError';
  }
}

export class ConflictoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'ConflictoError';
  }
}
