// INICIO · delivery.ts

// Lo que espera nuestro sistema
export interface ServicioDelivery {
  enviar(pedido: number, direccion: string, totalPesos: number): string;
}

// API externa vieja (DADA, NO SE MODIFICA): recibe "id;direccion;centavos" y
// devuelve un número de seguimiento, o -1 si rechaza el envío.
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

// TODO (TAREA 5): RappiAdapter
