// RESOLUCIÓN F4 · Adapter de sensor de temperatura

// 📌 [ADAPTER - TARGET] Lo que espera el sistema nuevo: grados Celsius
interface SensorTemperatura {
  leerCelsius(): number;
}

// Un sensor nuevo que ya cumple el contrato
class SensorDigital implements SensorTemperatura {
  private valor: number;
  constructor(valor: number) {
    this.valor = valor;
  }
  leerCelsius(): number {
    return this.valor;
  }
}

// 📌 [ADAPTER - ADAPTEE] Sensor viejo importado: mide en Fahrenheit y tiene otro nombre de método. No se modifica
class TermometroFahrenheit {
  private fahrenheit: number;
  constructor(fahrenheit: number) {
    this.fahrenheit = fahrenheit;
  }
  leerF(): number {
    return this.fahrenheit;
  }
}

// 📌 [ADAPTER - ADAPTADOR] Implementa el target y contiene al viejo
class AdaptadorFahrenheit implements SensorTemperatura {
  private viejo: TermometroFahrenheit;

  constructor(viejo: TermometroFahrenheit) {
    this.viejo = viejo;
  }

  // 📌 [TRADUCCIÓN] Cambia el nombre del método Y convierte la unidad
  leerCelsius(): number {
    return Math.round(((this.viejo.leerF() - 32) * 5) / 9);
  }
}

// 📌 [CLIENTE] Solo conoce SensorTemperatura
function promedio(sensores: SensorTemperatura[]): number {
  const suma = sensores.reduce((acc, s) => acc + s.leerCelsius(), 0);
  return suma / sensores.length;
}

// Bloque de prueba
const sensores: SensorTemperatura[] = [
  new SensorDigital(20),
  new AdaptadorFahrenheit(new TermometroFahrenheit(86)),
  new AdaptadorFahrenheit(new TermometroFahrenheit(50)),
];
for (const s of sensores) {
  console.log(`${s.leerCelsius()}°C`);
}
console.log(`Promedio: ${promedio(sensores)}°C`);
