// Ejercicio 4 · Adapter: pasarela de pagos vieja

// TARGET: la interface que usa nuestro sistema nuevo
interface ProcesadorPago {
  pagar(montoEnPesos: number): string;
}

// Un procesador nuevo que ya cumple la interface
class PagoTarjeta implements ProcesadorPago {
  pagar(montoEnPesos: number): string {
    return `Tarjeta: cobrados $${montoEnPesos.toFixed(2)}`;
  }
}

// ADAPTEE: la clase vieja que NO se puede modificar.
// Trabaja en CENTAVOS y con otros nombres de métodos.
class PasarelaLegacy {
  iniciarTransaccion(): number {
    return 4521;   // número de transacción
  }
  cobrarCentavos(transaccion: number, centavos: number): boolean {
    return centavos > 0 && transaccion > 0;
  }
}

// ADAPTER: implementa la interface nueva y CONTIENE a la vieja
class AdaptadorPasarelaLegacy implements ProcesadorPago {
  private pasarela: PasarelaLegacy;

  constructor(pasarela: PasarelaLegacy) {
    this.pasarela = pasarela;
  }

  pagar(montoEnPesos: number): string {
    const transaccion = this.pasarela.iniciarTransaccion();       // traduce: 1 llamada nueva = 2 viejas
    const centavos = Math.round(montoEnPesos * 100);               // traduce: pesos → centavos
    const ok = this.pasarela.cobrarCentavos(transaccion, centavos);
    return ok
      ? `Legacy #${transaccion}: cobrados ${centavos} centavos`
      : `Legacy #${transaccion}: pago rechazado`;
  }
}

// CLIENTE: solo conoce ProcesadorPago
function cobrarCarrito(procesador: ProcesadorPago, total: number): void {
  console.log(procesador.pagar(total));
}

// ---------------- Bloque de prueba ----------------
const procesadores: ProcesadorPago[] = [
  new PagoTarjeta(),
  new AdaptadorPasarelaLegacy(new PasarelaLegacy()),
];

for (const p of procesadores) {
  cobrarCarrito(p, 1234.5);
}
cobrarCarrito(new AdaptadorPasarelaLegacy(new PasarelaLegacy()), 0);
