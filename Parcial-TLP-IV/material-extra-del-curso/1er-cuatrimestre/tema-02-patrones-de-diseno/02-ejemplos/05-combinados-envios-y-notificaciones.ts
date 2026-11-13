// ============================================================================
// EJEMPLO 5 · PATRONES COMBINADOS
// Parte A: Singleton + Factory (primer parcial, Tema B, ejercicio 2: Envíos).
// Parte B: Observer + Factory + Adapter (versión sincrónica y en miniatura del flujo
//          del integrador: un pedido cambia de estado y se notifica por varios canales).
// ============================================================================

// --------------------- PARTE A: Singleton + Factory -------------------------

class ConfiguracionEmpresa {
  // 📌 [SINGLETON] constructor private + atributo static + obtenerInstancia()
  private static instancia: ConfiguracionEmpresa | undefined;
  readonly recargoExpress = 2500;

  private constructor() {}

  static obtenerInstancia(): ConfiguracionEmpresa {
    if (ConfiguracionEmpresa.instancia === undefined) {
      ConfiguracionEmpresa.instancia = new ConfiguracionEmpresa();
    }
    return ConfiguracionEmpresa.instancia;
  }
}

// 📌 [FACTORY - TIPO COMÚN] La fábrica devuelve Envio (interfaz)
interface Envio {
  calcularCosto(base: number): number;
}

class EnvioEstandar implements Envio {
  calcularCosto(base: number): number {
    return base;
  }
}

class EnvioExpress implements Envio {
  calcularCosto(base: number): number {
    // 📌 [SINGLETON EN USO] No escribe 2500: lo pide al Singleton (un único lugar donde cambiarlo)
    const configuracion = ConfiguracionEmpresa.obtenerInstancia();
    return base + configuracion.recargoExpress;
  }
}

class FabricaEnvios {
  // 📌 [FACTORY ESTÁTICA] Se usa sin crear la fábrica: FabricaEnvios.crear(...). Nadie más hace new de los envíos
  static crear(tipo: "estandar" | "express"): Envio {
    if (tipo === "estandar") {
      return new EnvioEstandar();
    }
    return new EnvioExpress();
  }
}

// ----------------- PARTE B: Observer + Factory + Adapter --------------------

interface Notificacion {
  destinatario: string;
  pedido: number;
  estado: string;
}

// 📌 [TARGET] Contrato de un canal de notificación
interface Notificador {
  enviar(n: Notificacion): void;
}

class NotificadorEmail implements Notificador {
  enviar(n: Notificacion): void {
    console.log(`[EMAIL] ${n.destinatario}: tu pedido #${n.pedido} está ${n.estado}`);
  }
}

// 📌 [ADAPTEE] Una "librería" de SMS de terceros con otra interfaz (no se puede modificar)
class LibreriaSmsExterna {
  mandarMensaje(numero: string, texto: string): boolean {
    console.log(`[SMS ${numero}] ${texto}`);
    return true;
  }
}

// 📌 [ADAPTER] Implementa Notificador y traduce a la librería de SMS
class SmsAdapter implements Notificador {
  private sms: LibreriaSmsExterna;

  constructor(sms: LibreriaSmsExterna) {
    this.sms = sms;
  }

  enviar(n: Notificacion): void {
    this.sms.mandarMensaje(n.destinatario, `Pedido ${n.pedido}: ${n.estado}`);
  }
}

type Canal = "email" | "sms";

// 📌 [FACTORY] Crea el canal pedido; el observador nunca hace new de un canal
class FabricaNotificadores {
  static crear(canal: Canal): Notificador {
    if (canal === "email") {
      return new NotificadorEmail();
    }
    return new SmsAdapter(new LibreriaSmsExterna());
  }
}

// 📌 [OBSERVER - INTERFAZ OBSERVADOR]
interface ObservadorPedido {
  actualizar(pedido: number, estado: string): void;
}

// 📌 [OBSERVER - OBSERVADOR CONCRETO] Reacciona usando la fábrica; no sabe nada de SMS ni de email
class ServicioNotificaciones implements ObservadorPedido {
  private contactos: { destinatario: string; canal: Canal }[];

  constructor(contactos: { destinatario: string; canal: Canal }[]) {
    this.contactos = contactos;
  }

  actualizar(pedido: number, estado: string): void {
    for (const c of this.contactos) {
      FabricaNotificadores.crear(c.canal).enviar({ destinatario: c.destinatario, pedido: pedido, estado: estado });
    }
  }
}

// 📌 [OBSERVER - SUJETO]
class Pedido {
  readonly numero: number;
  private estado: string;
  private observadores: ObservadorPedido[];

  constructor(numero: number) {
    this.numero = numero;
    this.estado = "creado";
    this.observadores = [];
  }

  suscribir(o: ObservadorPedido): void {
    this.observadores.push(o);
  }

  cambiarEstado(estado: string): void {
    this.estado = estado;
    for (const o of this.observadores) {
      o.actualizar(this.numero, this.estado);
    }
  }
}

// Bloque de prueba
const config1 = ConfiguracionEmpresa.obtenerInstancia();
const config2 = ConfiguracionEmpresa.obtenerInstancia();
console.log(`Mismo Singleton: ${config1 === config2}`);
console.log(`Estándar: $${FabricaEnvios.crear("estandar").calcularCosto(3000)}`);
console.log(`Express: $${FabricaEnvios.crear("express").calcularCosto(3000)}`);
// Mismo Singleton: true
// Estándar: $3000
// Express: $5500

const pedido = new Pedido(42);
pedido.suscribir(
  new ServicioNotificaciones([
    { destinatario: "ana@mail.com", canal: "email" },
    { destinatario: "3815550000", canal: "sms" },
  ]),
);
pedido.cambiarEstado("en camino");
// [EMAIL] ana@mail.com: tu pedido #42 está en camino
// [SMS 3815550000] Pedido 42: en camino
