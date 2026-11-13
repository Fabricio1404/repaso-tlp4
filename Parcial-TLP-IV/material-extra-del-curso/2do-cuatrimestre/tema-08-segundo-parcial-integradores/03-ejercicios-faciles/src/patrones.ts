// ============================== SINGLETON ==============================
export class ConfiguracionTienda {
  private static instancia: ConfiguracionTienda | undefined;
  readonly envioGratisDesde = 50000;
  readonly costoEnvio = 3000;

  private constructor() {}

  static obtenerInstancia(): ConfiguracionTienda {
    if (ConfiguracionTienda.instancia === undefined) {
      ConfiguracionTienda.instancia = new ConfiguracionTienda();
    }
    return ConfiguracionTienda.instancia;
  }
}

// ============================== FACTORY ==============================
export interface Descuento {
  readonly nombre: string;
  aplicar(monto: number): number;
}

export class SinDescuento implements Descuento {
  readonly nombre = 'ninguno';
  aplicar(monto: number): number {
    return monto;
  }
}

export class DescuentoEstudiante implements Descuento {
  readonly nombre = 'estudiante';
  aplicar(monto: number): number {
    return monto * 0.9;
  }
}

export class DescuentoJubilado implements Descuento {
  readonly nombre = 'jubilado';
  aplicar(monto: number): number {
    return monto * 0.8;
  }
}

export type TipoDescuento = 'ninguno' | 'estudiante' | 'jubilado';

export class FabricaDescuentos {
  static crear(tipo: TipoDescuento): Descuento {
    switch (tipo) {
      case 'estudiante':
        return new DescuentoEstudiante();
      case 'jubilado':
        return new DescuentoEstudiante();
      case 'ninguno':
        return new SinDescuento();
    }
  }
}

/** Reglas R3 y R4. */
export function calcularTotal(monto: number, descuento: Descuento): number {
  if (!Number.isFinite(monto) || monto <= 0) {
    throw new RangeError('El monto debe ser mayor a 0');
  }
  const config = ConfiguracionTienda.obtenerInstancia();
  const conDescuento = descuento.aplicar(monto);
  return conDescuento > config.envioGratisDesde ? conDescuento : conDescuento + config.costoEnvio;
}

// ============================== ADAPTER ==============================
export interface Balanza {
  pesoKg(): number;
}

// Balanza vieja (externa): informa en libras
export interface BalanzaLegacy {
  pesoEnLibras(): number;
}

export class BalanzaAdapter implements Balanza {
  private legacy: BalanzaLegacy;
  constructor(legacy: BalanzaLegacy) {
    this.legacy = legacy;
  }
  pesoKg(): number {
    return Math.round(this.legacy.pesoEnLibras() * 0.4536 * 100) / 100;
  }
}
