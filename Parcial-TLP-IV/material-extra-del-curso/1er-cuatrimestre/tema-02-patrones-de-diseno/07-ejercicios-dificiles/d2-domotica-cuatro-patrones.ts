// EJERCICIO D2 · Casa inteligente con los 4 patrones — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO (no lo modifiques) =======================
type TipoDispositivo = "luz" | "persiana" | "termostato";

// Termostato viejo con protocolo X10: trabaja en Fahrenheit. NO SE PUEDE MODIFICAR.
class TermostatoX10 {
  private tempF = 68;
  setTempF(f: number): void {
    this.tempF = f;
  }
  getTempF(): number {
    return this.tempF;
  }
}
// ===============================================================================

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const central = CentralDomotica.obtenerInstancia();
// central.instalar("luz", "luz-living");
// central.instalar("persiana", "persiana-living");
// central.instalar("termostato", "termo-casa");
// try {
//   central.instalar("luz", "luz-living");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
//
// central.ordenar("persiana-living", "abrir", 40);
// central.ordenar("termo-casa", "temperatura", 22);
//
// const sensor = new SensorMovimiento("living");
// const alarma = new Alarma();
// sensor.suscribir(new ModoNoche());
// sensor.suscribir(alarma);
//
// sensor.detectar(15); // de día y alarma desarmada: no pasa nada
// alarma.armar();
// sensor.detectar(23); // de noche: enciende la luz y suena la alarma
//
// try {
//   central.ordenar("termo-casa", "encender");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// console.log(central.resumen());
// console.log(central.obtenerBitacora());
// console.log(`Intrusiones: ${alarma.cantidadIntrusiones}`);
