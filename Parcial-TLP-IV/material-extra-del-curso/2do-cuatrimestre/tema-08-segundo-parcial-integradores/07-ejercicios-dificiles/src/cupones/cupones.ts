import { CondicionCuponError, CuponInvalidoError } from '../dominio/errores';

// FACTORY · tipo común
export interface EstrategiaCupon {
  aplicar(monto: number): number;
}

export class SinCupon implements EstrategiaCupon {
  aplicar(monto: number): number {
    return monto;
  }
}

export class CuponPorcentaje implements EstrategiaCupon {
  private porcentaje: number;
  constructor(porcentaje: number) {
    this.porcentaje = porcentaje;
  }
  aplicar(monto: number): number {
    return Math.round(monto * (1 - this.porcentaje / 100));
  }
}

export class CuponMontoFijo implements EstrategiaCupon {
  private descuento: number;
  private minimo: number;
  constructor(descuento: number, minimo: number) {
    this.descuento = descuento;
    this.minimo = minimo;
  }
  aplicar(monto: number): number {
    if (monto <= this.minimo) {
      throw new CondicionCuponError(`El cupón requiere una compra de al menos $${this.minimo}`);
    }
    return monto - this.descuento;
  }
}

export class FabricaCupones {
  static crear(codigo: string | undefined): EstrategiaCupon {
    if (codigo === undefined || codigo.trim() === '') return new SinCupon();
    switch (codigo) {
      case 'DESC10':
        return new CuponPorcentaje(10);
      case 'MENOS2000':
        return new CuponMontoFijo(2000, 10000);
      default:
        throw new CuponInvalidoError(`El cupón ${codigo} no existe`);
    }
  }
}
