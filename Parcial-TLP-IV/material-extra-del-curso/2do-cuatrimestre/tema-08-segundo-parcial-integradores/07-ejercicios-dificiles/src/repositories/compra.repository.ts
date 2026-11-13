import type { Compra } from '../dominio/compra';

export interface CompraRepository {
  guardar(datos: Omit<Compra, 'id'>): Compra;
  buscar(id: number): Compra | undefined;
  listar(): Compra[];
}

export class CompraRepositoryEnMemoria implements CompraRepository {
  private compras: Compra[] = [];
  private proximo = 1;
  guardar(datos: Omit<Compra, 'id'>): Compra {
    const c: Compra = { id: this.proximo++, ...datos };
    this.compras.push(c);
    return { ...c };
  }
  buscar(id: number): Compra | undefined {
    const c = this.compras.find((x) => x.id === id);
    return c ? { ...c } : undefined;
  }
  listar(): Compra[] {
    return this.compras.map((c) => ({ ...c }));
  }
}
