export interface Compra {
  id: number;
  cliente: string;
  monto: number;
  cupon: string | null;
  total: number;
}

export interface NuevaCompra {
  cliente: string;
  monto: number;
  cupon?: string;
}
