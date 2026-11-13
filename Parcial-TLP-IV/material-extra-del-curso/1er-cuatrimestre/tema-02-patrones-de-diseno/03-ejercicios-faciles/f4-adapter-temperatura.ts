// EJERCICIO F4 · Adapter de temperatura — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO (no lo modifiques) =======================
interface SensorTemperatura {
  leerCelsius(): number;
}

class SensorDigital implements SensorTemperatura {
  private valor: number;
  constructor(valor: number) {
    this.valor = valor;
  }
  leerCelsius(): number {
    return this.valor;
  }
}

// Sensor viejo importado de otro sistema (NO se puede modificar)
class TermometroFahrenheit {
  private fahrenheit: number;
  constructor(fahrenheit: number) {
    this.fahrenheit = fahrenheit;
  }
  leerF(): number {
    return this.fahrenheit;
  }
}
// ===============================================================================

// TODO: AdaptadorFahrenheit y la función promedio


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const sensores: SensorTemperatura[] = [
//   new SensorDigital(20),
//   new AdaptadorFahrenheit(new TermometroFahrenheit(86)),
//   new AdaptadorFahrenheit(new TermometroFahrenheit(50)),
// ];
// for (const s of sensores) {
//   console.log(`${s.leerCelsius()}°C`);
// }
// console.log(`Promedio: ${promedio(sensores)}°C`);
