import type { Compra } from '../dominio/compra';

// OBSERVER
export interface ObservadorCompra {
  compraRegistrada(compra: Compra): void;
}

export class RegistroAuditoria implements ObservadorCompra {
  readonly lineas: string[] = [];
  compraRegistrada(c: Compra): void {
    this.lineas.push(`#${c.id} ${c.cliente} $${c.total}${c.cupon ? ` (${c.cupon})` : ''}`);
  }
}
