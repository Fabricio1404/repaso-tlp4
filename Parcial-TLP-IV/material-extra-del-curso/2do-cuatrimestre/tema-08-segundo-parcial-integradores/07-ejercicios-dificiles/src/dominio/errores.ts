export class ValidacionError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'ValidacionError';
  }
}
export class CuponInvalidoError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'CuponInvalidoError';
  }
}
export class CondicionCuponError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'CondicionCuponError';
  }
}
export class NoEncontradoError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'NoEncontradoError';
  }
}
