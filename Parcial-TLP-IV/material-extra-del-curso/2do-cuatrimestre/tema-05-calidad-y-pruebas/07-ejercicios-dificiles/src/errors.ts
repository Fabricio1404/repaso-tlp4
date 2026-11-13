export class ValidacionError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'ValidacionError';
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
