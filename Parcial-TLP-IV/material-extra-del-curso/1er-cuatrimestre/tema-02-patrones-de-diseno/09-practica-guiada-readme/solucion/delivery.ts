// SOLUCIÓN · delivery.ts (TAREA 5: Adapter)

// 📌 [ADAPTER - TARGET] Lo que espera nuestro sistema
export interface ServicioDelivery {
  enviar(pedido: number, direccion: string, totalPesos: number): string;
}

// 📌 [ADAPTER - ADAPTEE] API externa vieja (DADA, no se modifica): recibe "id;direccion;centavos" y devuelve un número de seguimiento o -1
export class RappiLegacyAPI {
  private ultimo = 7000;
  createShipment(payload: string): number {
    const partes = payload.split(";");
    if (partes.length !== 3 || partes[1].trim() === "") {
      return -1;
    }
    this.ultimo++;
    return this.ultimo;
  }
}

// 📌 [ADAPTER - ADAPTADOR] Implementa el target, contiene la API vieja y traduce ida y vuelta
export class RappiAdapter implements ServicioDelivery {
  private api: RappiLegacyAPI;

  constructor(api: RappiLegacyAPI) {
    this.api = api;
  }

  enviar(pedido: number, direccion: string, totalPesos: number): string {
    const tracking = this.api.createShipment(`${pedido};${direccion};${Math.round(totalPesos * 100)}`);
    if (tracking === -1) {
      throw new Error("El servicio de delivery rechazó el envío");
    }
    return `RAPPI-${tracking}`;
  }
}
