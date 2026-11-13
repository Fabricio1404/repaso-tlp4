// RESOLUCIÓN M3 · Adapter: dos pasarelas de pago externas con interfaces distintas

// 📌 [ADAPTER - TARGET] Lo que espera nuestro checkout
interface ResultadoPago {
  aprobado: boolean;
  comprobante: string;
}

interface ProcesadorPago {
  readonly nombre: string;
  pagar(montoPesos: number, descripcion: string): ResultadoPago;
}

// ===================== SDKs EXTERNOS (no se pueden modificar) =====================
// 📌 [ADAPTEE 1] Recibe un objeto con nombres en inglés y devuelve un status
class MercadoPagoSDK {
  private ultimo = 1000;
  crearCobro(datos: { amount: number; title: string }): { status: "approved" | "rejected"; id: number } {
    this.ultimo++;
    return { status: datos.amount <= 500000 ? "approved" : "rejected", id: this.ultimo };
  }
}

// 📌 [ADAPTEE 2] Trabaja en centavos de dólar y devuelve un texto "OK:<código>" o "FAIL"
class PayPalLegacy {
  makePayment(usdCents: number): string {
    return usdCents > 0 && usdCents <= 100000 ? `OK:PP${usdCents}` : "FAIL";
  }
}
// ===================================================================================

// 📌 [ADAPTER 1] Traduce nombres, formato de entrada y formato de respuesta
class MercadoPagoAdapter implements ProcesadorPago {
  readonly nombre = "MercadoPago";
  private sdk: MercadoPagoSDK;

  constructor(sdk: MercadoPagoSDK) {
    this.sdk = sdk;
  }

  pagar(montoPesos: number, descripcion: string): ResultadoPago {
    const r = this.sdk.crearCobro({ amount: montoPesos, title: descripcion });
    return { aprobado: r.status === "approved", comprobante: `MP-${r.id}` };
  }
}

// 📌 [ADAPTER 2] Además de traducir, convierte la moneda (pesos → centavos de dólar)
class PayPalAdapter implements ProcesadorPago {
  readonly nombre = "PayPal";
  private legacy: PayPalLegacy;
  private cotizacion: number;

  constructor(legacy: PayPalLegacy, cotizacion: number) {
    this.legacy = legacy;
    this.cotizacion = cotizacion;
  }

  pagar(montoPesos: number, descripcion: string): ResultadoPago {
    const centavos = Math.round((montoPesos / this.cotizacion) * 100);
    const respuesta = this.legacy.makePayment(centavos);
    // 📌 [TRADUCCIÓN DE RESPUESTA] "OK:xxx" → { aprobado: true, comprobante: "xxx" }
    if (respuesta.startsWith("OK:")) {
      return { aprobado: true, comprobante: respuesta.substring(3) };
    }
    return { aprobado: false, comprobante: "" };
  }
}

// 📌 [CLIENTE] El checkout solo conoce ProcesadorPago: no sabe nada de status, centavos ni "OK:"
function checkout(procesador: ProcesadorPago, monto: number, descripcion: string): string {
  if (monto <= 0) {
    throw new Error("Monto inválido");
  }
  const r = procesador.pagar(monto, descripcion);
  return r.aprobado
    ? `✔ ${procesador.nombre}: $${monto} aprobado (${r.comprobante})`
    : `✘ ${procesador.nombre}: $${monto} rechazado`;
}

// Bloque de prueba
const procesadores: ProcesadorPago[] = [
  new MercadoPagoAdapter(new MercadoPagoSDK()),
  new PayPalAdapter(new PayPalLegacy(), 1000),
];
for (const p of procesadores) {
  console.log(checkout(p, 25000, "Curso de TypeScript"));
  console.log(checkout(p, 2000000, "Notebook"));
}
try {
  checkout(procesadores[0], 0, "Nada");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
