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
    // 📌 [DEFECTO 1 CORREGIDO - R4] Antes: monto > minimo (con $10.000 exactos rechazaba el cupón)
    if (monto < this.minimo) {
      throw new CondicionCuponError(`El cupón requiere una compra de al menos $${this.minimo}`);
    }
    return monto - this.descuento;
  }
}

// 📌 [FACTORY] Traduce el código del cupón a una estrategia
export class FabricaCupones {
  static crear(codigo: string | undefined): EstrategiaCupon {
    if (codigo === undefined || codigo.trim() === '') return new SinCupon();
    // 📌 [DEFECTO 2 CORREGIDO - R3] Los códigos no distinguen mayúsculas/minúsculas ni espacios
    switch (codigo.trim().toUpperCase()) {
      case 'DESC10':
        return new CuponPorcentaje(10);
      case 'MENOS2000':
        return new CuponMontoFijo(2000, 10000);
      default:
        throw new CuponInvalidoError(`El cupón ${codigo} no existe`);
    }
  }
}
