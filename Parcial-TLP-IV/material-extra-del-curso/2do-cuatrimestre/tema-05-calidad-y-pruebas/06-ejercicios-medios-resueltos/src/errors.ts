export class NoEncontradoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'NoEncontradoError';
  }
}

export class CondicionInvalidaError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'CondicionInvalidaError';
  }
}

export class InscripcionDuplicadaError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'InscripcionDuplicadaError';
  }
}
