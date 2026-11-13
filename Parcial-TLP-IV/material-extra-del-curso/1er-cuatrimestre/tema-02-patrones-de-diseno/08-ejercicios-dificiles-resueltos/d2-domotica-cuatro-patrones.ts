// RESOLUCIÓN D2 · Casa inteligente — los 4 patrones juntos
//   Singleton → CentralDomotica (registro único de dispositivos y bitácora)
//   Factory   → FabricaDispositivos (la fábrica devuelve un ADAPTER para el termostato viejo)
//   Observer  → SensorMovimiento (sujeto) + ModoNoche / Alarma (observadores)
//   Adapter   → TermostatoAdapter sobre TermostatoX10 (API vieja en Fahrenheit)

type TipoDispositivo = "luz" | "persiana" | "termostato";

// 📌 [FACTORY - TIPO COMÚN] Todos los dispositivos se controlan igual: ejecutar(comando, valor)
abstract class Dispositivo {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract ejecutar(comando: string, valor?: number): string;
  abstract estado(): string;
}

class Luz extends Dispositivo {
  private encendida = false;

  ejecutar(comando: string): string {
    if (comando !== "encender" && comando !== "apagar") {
      throw new Error(`${this.id}: comando desconocido "${comando}"`);
    }
    this.encendida = comando === "encender";
    return `${this.id} ${this.encendida ? "encendida" : "apagada"}`;
  }

  estado(): string {
    return `${this.id}: ${this.encendida ? "ON" : "OFF"}`;
  }
}

class Persiana extends Dispositivo {
  private apertura = 100;

  ejecutar(comando: string, valor?: number): string {
    if (comando !== "abrir") {
      throw new Error(`${this.id}: comando desconocido "${comando}"`);
    }
    // 📌 [VALOR POR DEFECTO CON ??] Si no mandan valor, abre del todo
    const porcentaje = valor ?? 100;
    if (porcentaje < 0 || porcentaje > 100) {
      throw new RangeError(`${this.id}: apertura entre 0 y 100`);
    }
    this.apertura = porcentaje;
    return `${this.id} al ${this.apertura}%`;
  }

  estado(): string {
    return `${this.id}: ${this.apertura}%`;
  }
}

// 📌 [ADAPTER - ADAPTEE] Termostato viejo con protocolo X10: Fahrenheit y otros nombres. No se modifica
class TermostatoX10 {
  private tempF = 68;
  setTempF(f: number): void {
    this.tempF = f;
  }
  getTempF(): number {
    return this.tempF;
  }
}

// 📌 [ADAPTER - ADAPTADOR] Se presenta como un Dispositivo más (el target) y traduce °C ↔ °F
class TermostatoAdapter extends Dispositivo {
  private x10: TermostatoX10;

  constructor(id: string, x10: TermostatoX10) {
    super(id);
    this.x10 = x10;
  }

  ejecutar(comando: string, valor?: number): string {
    if (comando !== "temperatura" || valor === undefined) {
      throw new Error(`${this.id}: use "temperatura" con un valor en °C`);
    }
    this.x10.setTempF(Math.round((valor * 9) / 5 + 32));
    return `${this.id} a ${valor}°C`;
  }

  estado(): string {
    const c = Math.round(((this.x10.getTempF() - 32) * 5) / 9);
    return `${this.id}: ${c}°C`;
  }
}

class FabricaDispositivos {
  // 📌 [FACTORY] El cliente pide "termostato" y recibe un Dispositivo: no sabe que es un adapter sobre un X10
  static crear(tipo: TipoDispositivo, id: string): Dispositivo {
    switch (tipo) {
      case "luz":
        return new Luz(id);
      case "persiana":
        return new Persiana(id);
      case "termostato":
        return new TermostatoAdapter(id, new TermostatoX10());
    }
  }
}

class CentralDomotica {
  // 📌 [SINGLETON] Una sola central por casa
  private static instancia: CentralDomotica | undefined;
  private dispositivos: Dispositivo[];
  private bitacora: string[];

  private constructor() {
    this.dispositivos = [];
    this.bitacora = [];
  }

  static obtenerInstancia(): CentralDomotica {
    if (CentralDomotica.instancia === undefined) {
      CentralDomotica.instancia = new CentralDomotica();
    }
    return CentralDomotica.instancia;
  }

  // 📌 [LA CENTRAL USA LA FÁBRICA] La central no hace new de dispositivos
  instalar(tipo: TipoDispositivo, id: string): void {
    if (this.dispositivos.some((d) => d.id === id)) {
      throw new Error(`Ya existe el dispositivo ${id}`);
    }
    this.dispositivos.push(FabricaDispositivos.crear(tipo, id));
  }

  // 📌 [POLIMORFISMO] Un solo método de control para cualquier dispositivo (incluido el adaptado)
  ordenar(id: string, comando: string, valor?: number): void {
    const d = this.dispositivos.find((x) => x.id === id);
    if (d === undefined) {
      throw new Error(`No existe el dispositivo ${id}`);
    }
    this.bitacora.push(d.ejecutar(comando, valor));
  }

  resumen(): string[] {
    return this.dispositivos.map((d) => d.estado());
  }

  obtenerBitacora(): string[] {
    return [...this.bitacora];
  }
}

// 📌 [OBSERVER - INTERFAZ]
interface ObservadorSensor {
  movimientoDetectado(zona: string, hora: number): void;
}

// 📌 [OBSERVER - SUJETO]
class SensorMovimiento {
  readonly zona: string;
  private observadores: ObservadorSensor[];

  constructor(zona: string) {
    this.zona = zona;
    this.observadores = [];
  }

  suscribir(o: ObservadorSensor): void {
    this.observadores.push(o);
  }

  desuscribir(o: ObservadorSensor): void {
    this.observadores = this.observadores.filter((x) => x !== o);
  }

  detectar(hora: number): void {
    for (const o of this.observadores) {
      o.movimientoDetectado(this.zona, hora);
    }
  }
}

// 📌 [OBSERVADOR CONCRETO] De noche enciende la luz de la zona usando la central (Singleton)
class ModoNoche implements ObservadorSensor {
  movimientoDetectado(zona: string, hora: number): void {
    if (hora >= 20 || hora < 7) {
      CentralDomotica.obtenerInstancia().ordenar(`luz-${zona}`, "encender");
    }
  }
}

class Alarma implements ObservadorSensor {
  private armada: boolean;
  private intrusiones: string[];

  constructor() {
    this.armada = false;
    this.intrusiones = [];
  }

  armar(): void {
    this.armada = true;
  }

  movimientoDetectado(zona: string, hora: number): void {
    if (this.armada) {
      this.intrusiones.push(`${zona} a las ${hora}h`);
      console.log(`🚨 Intrusión en ${zona} a las ${hora}h`);
    }
  }

  get cantidadIntrusiones(): number {
    return this.intrusiones.length;
  }
}

// Bloque de prueba
const central = CentralDomotica.obtenerInstancia();
central.instalar("luz", "luz-living");
central.instalar("persiana", "persiana-living");
central.instalar("termostato", "termo-casa");
try {
  central.instalar("luz", "luz-living");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}

central.ordenar("persiana-living", "abrir", 40);
central.ordenar("termo-casa", "temperatura", 22);

const sensor = new SensorMovimiento("living");
const alarma = new Alarma();
sensor.suscribir(new ModoNoche());
sensor.suscribir(alarma);

sensor.detectar(15); // de día y alarma desarmada: no pasa nada
alarma.armar();
sensor.detectar(23); // de noche: enciende la luz y suena la alarma

try {
  central.ordenar("termo-casa", "encender");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(central.resumen());
console.log(central.obtenerBitacora());
console.log(`Intrusiones: ${alarma.cantidadIntrusiones}`);
