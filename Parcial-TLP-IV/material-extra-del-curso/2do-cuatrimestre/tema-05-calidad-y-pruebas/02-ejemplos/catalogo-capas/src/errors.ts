// 📌 [ERRORES DE DOMINIO] Clases propias para distinguir cada problema con instanceof y traducirlo a un código HTTP
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

export class StockInsuficienteError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'StockInsuficienteError';
  }
}
