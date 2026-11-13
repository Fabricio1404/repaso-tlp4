// EJERCICIO M3 · Adapter de pagos — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO (no lo modifiques) =======================
interface ResultadoPago {
  aprobado: boolean;
  comprobante: string;
}

interface ProcesadorPago {
  readonly nombre: string;
  pagar(montoPesos: number, descripcion: string): ResultadoPago;
}

// ===================== SDKs EXTERNOS (no se pueden modificar) =====================
class MercadoPagoSDK {
  private ultimo = 1000;
  crearCobro(datos: { amount: number; title: string }): { status: "approved" | "rejected"; id: number } {
    this.ultimo++;
    return { status: datos.amount <= 500000 ? "approved" : "rejected", id: this.ultimo };
  }
}
class PayPalLegacy {
  makePayment(usdCents: number): string {
    return usdCents > 0 && usdCents <= 100000 ? `OK:PP${usdCents}` : "FAIL";
  }
}
// ===================================================================================

// TODO: MercadoPagoAdapter, PayPalAdapter y la función checkout


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const procesadores: ProcesadorPago[] = [
//   new MercadoPagoAdapter(new MercadoPagoSDK()),
//   new PayPalAdapter(new PayPalLegacy(), 1000),
// ];
// for (const p of procesadores) {
//   console.log(checkout(p, 25000, "Curso de TypeScript"));
//   console.log(checkout(p, 2000000, "Notebook"));
// }
// try {
//   checkout(procesadores[0], 0, "Nada");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
