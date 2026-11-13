// RESOLUCIÓN M1 · Estación meteorológica — POO (abstracta/polimorfismo) + Observer + DIP

// ============================ POO: sensores =================================
// 📌 [CLASE ABSTRACTA] Todo sensor tiene id y unidad; cada uno mide a su manera
abstract class Sensor {
  readonly id: string;
  private lecturas: number[];

  constructor(id: string, lecturas: number[]) {
    this.id = id;
    // 📌 [COPIA DEFENSIVA] Se copia lo que entra para que nadie de afuera altere la secuencia
    this.lecturas = [...lecturas];
  }

  abstract magnitud(): string;
  abstract unidad(): string;

  // 📌 [ENCAPSULAMIENTO] La lectura avanza una posición por llamada; vuelve a empezar al final
  medir(): number {
    const valor = this.lecturas.shift();
    if (valor === undefined) {
      throw new Error(`${this.id} sin datos`);
    }
    this.lecturas.push(valor);
    return valor;
  }
}

class Termometro extends Sensor {
  magnitud(): string {
    return "temperatura";
  }
  unidad(): string {
    return "°C";
  }
}

class Higrometro extends Sensor {
  magnitud(): string {
    return "humedad";
  }
  unidad(): string {
    return "%";
  }
}

// ============================ Observer ======================================
interface Medicion {
  readonly magnitud: string;
  readonly valor: number;
  readonly unidad: string;
  readonly hora: number;
}

// 📌 [OBSERVER - INTERFAZ]
interface ObservadorClima {
  actualizar(m: Medicion): void;
}

// 📌 [OBSERVER - SUJETO] La estación no sabe quién escucha
class Estacion {
  private sensores: Sensor[];
  private observadores: ObservadorClima[];

  constructor(sensores: Sensor[]) {
    this.sensores = sensores;
    this.observadores = [];
  }

  suscribir(o: ObservadorClima): void {
    this.observadores.push(o);
  }

  // 📌 [POLIMORFISMO] Recorre sensores sin preguntar su tipo
  tomarMediciones(hora: number): void {
    for (const s of this.sensores) {
      const m: Medicion = { magnitud: s.magnitud(), valor: s.medir(), unidad: s.unidad(), hora: hora };
      for (const o of this.observadores) {
        o.actualizar(m);
      }
    }
  }
}

// ============================ DIP ===========================================
// 📌 [DIP ✓] DIP: la alerta depende de esta abstracción, no de un canal concreto
interface Notificador {
  enviar(mensaje: string): void;
}

class NotificadorConsola implements Notificador {
  enviar(mensaje: string): void {
    console.log(`📢 ${mensaje}`);
  }
}

class NotificadorMemoria implements Notificador {
  readonly mensajes: string[] = [];
  enviar(mensaje: string): void {
    this.mensajes.push(mensaje);
  }
}

// ============================ Observadores concretos =========================
class PantallaActual implements ObservadorClima {
  actualizar(m: Medicion): void {
    console.log(`[${m.hora}h] ${m.magnitud}: ${m.valor}${m.unidad}`);
  }
}

class Estadisticas implements ObservadorClima {
  private temperaturas: number[];

  constructor() {
    this.temperaturas = [];
  }

  actualizar(m: Medicion): void {
    if (m.magnitud === "temperatura") {
      this.temperaturas.push(m.valor);
    }
  }

  resumen(): string {
    const max = Math.max(...this.temperaturas);
    const min = Math.min(...this.temperaturas);
    const prom = this.temperaturas.reduce((a, b) => a + b, 0) / this.temperaturas.length;
    return `Temp. mín ${min} / máx ${max} / prom ${prom.toFixed(1)}`;
  }
}

class AlertaCalor implements ObservadorClima {
  private umbral: number;
  // 📌 [DIP ✓ INYECCIÓN] El observador recibe su canal por constructor
  private notificador: Notificador;

  constructor(umbral: number, notificador: Notificador) {
    this.umbral = umbral;
    this.notificador = notificador;
  }

  actualizar(m: Medicion): void {
    if (m.magnitud === "temperatura" && m.valor >= this.umbral) {
      this.notificador.enviar(`Alerta de calor: ${m.valor}${m.unidad} a las ${m.hora}h`);
    }
  }
}

// Bloque de prueba
const estacion = new Estacion([new Termometro("T1", [28, 35, 31]), new Higrometro("H1", [60, 40, 55])]);
const estadisticas = new Estadisticas();
const memoria = new NotificadorMemoria();
estacion.suscribir(new PantallaActual());
estacion.suscribir(estadisticas);
estacion.suscribir(new AlertaCalor(33, new NotificadorConsola()));
estacion.suscribir(new AlertaCalor(30, memoria));

for (const hora of [10, 14, 18]) {
  estacion.tomarMediciones(hora);
}
console.log(estadisticas.resumen());
console.log(memoria.mensajes);
