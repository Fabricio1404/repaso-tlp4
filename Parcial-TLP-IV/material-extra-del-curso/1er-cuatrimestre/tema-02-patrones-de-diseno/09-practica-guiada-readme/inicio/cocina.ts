// INICIO · cocina.ts

export class Cocina {
  private cola: string[];

  constructor() {
    this.cola = [];
  }

  encolar(descripcion: string): number {
    this.cola.push(descripcion);
    return this.cola.length;
  }

  pendientes(): number {
    return this.cola.length;
  }

  despachar(): string | undefined {
    return this.cola.shift();
  }
}
