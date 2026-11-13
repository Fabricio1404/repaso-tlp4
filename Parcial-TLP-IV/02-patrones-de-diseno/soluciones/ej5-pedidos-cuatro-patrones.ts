// Ejercicio 5 · Integrador: restaurante con los CUATRO patrones
//   Singleton → Configuracion (costo de envío)
//   Factory   → FabricaPlatos crea los platos
//   Observer  → Pedido avisa a Cocina y Cliente
//   Adapter   → la Impresora vieja de tickets se usa como un observador más

// ---------- SINGLETON ----------
class Configuracion {
  private static instancia: Configuracion | null = null;
  readonly costoEnvio: number;

  private constructor() {
    this.costoEnvio = 1500;
  }

  static obtenerInstancia(): Configuracion {
    if (Configuracion.instancia === null) {
      Configuracion.instancia = new Configuracion();
    }
    return Configuracion.instancia;
  }
}

// ---------- FACTORY ----------
interface Plato {
  nombre: string;
  precio(): number;
}

class Pizza implements Plato {
  nombre: string = "Pizza";
  precio(): number { return 9000; }
}
class Empanada implements Plato {
  nombre: string = "Empanada";
  precio(): number { return 1200; }
}
class Milanesa implements Plato {
  nombre: string = "Milanesa";
  precio(): number { return 7500; }
}

type TipoPlato = "pizza" | "empanada" | "milanesa";

class FabricaPlatos {
  static crear(tipo: TipoPlato): Plato {
    switch (tipo) {
      case "pizza": return new Pizza();
      case "empanada": return new Empanada();
      case "milanesa": return new Milanesa();
    }
  }
}

// ---------- OBSERVER ----------
type EstadoPedido = "recibido" | "en cocina" | "enviado";

interface ObservadorPedido {
  actualizar(numero: number, estado: EstadoPedido): void;
}

class Pedido {
  private static ultimoNumero: number = 0;
  readonly numero: number;
  private platos: Plato[];
  private estado: EstadoPedido;
  private observadores: ObservadorPedido[];

  constructor() {
    Pedido.ultimoNumero++;
    this.numero = Pedido.ultimoNumero;
    this.platos = [];
    this.estado = "recibido";
    this.observadores = [];
  }

  agregar(tipo: TipoPlato, cantidad: number): void {
    for (let i = 0; i < cantidad; i++) {
      this.platos.push(FabricaPlatos.crear(tipo));   // usa la fábrica, nunca new Pizza()
    }
  }

  total(): number {
    const comida = this.platos.reduce((acc, p) => acc + p.precio(), 0);
    return comida + Configuracion.obtenerInstancia().costoEnvio;   // valor leído del Singleton
  }

  suscribir(o: ObservadorPedido): void {
    this.observadores.push(o);
  }

  cambiarEstado(estado: EstadoPedido): void {
    this.estado = estado;
    for (const o of this.observadores) {
      o.actualizar(this.numero, this.estado);
    }
  }
}

class Cocina implements ObservadorPedido {
  actualizar(numero: number, estado: EstadoPedido): void {
    if (estado === "en cocina") console.log(`[Cocina] Preparando pedido #${numero}`);
  }
}

class ClienteApp implements ObservadorPedido {
  actualizar(numero: number, estado: EstadoPedido): void {
    console.log(`[App] Tu pedido #${numero} está: ${estado}`);
  }
}

// ---------- ADAPTER ----------
// Clase vieja que NO se puede modificar
class ImpresoraTickets {
  imprimirLinea(texto: string): void {
    console.log(`🖨  ${texto.toUpperCase()}`);
  }
}

// Adapter: la impresora vieja se "disfraza" de observador
class AdaptadorImpresora implements ObservadorPedido {
  private impresora: ImpresoraTickets;

  constructor(impresora: ImpresoraTickets) {
    this.impresora = impresora;
  }

  actualizar(numero: number, estado: EstadoPedido): void {
    this.impresora.imprimirLinea(`pedido ${numero} - ${estado}`);
  }
}

// ---------------- Bloque de prueba ----------------
const pedido = new Pedido();
pedido.agregar("pizza", 1);
pedido.agregar("empanada", 6);

pedido.suscribir(new Cocina());
pedido.suscribir(new ClienteApp());
pedido.suscribir(new AdaptadorImpresora(new ImpresoraTickets()));

console.log(`Total del pedido #${pedido.numero}: $${pedido.total()}`);
pedido.cambiarEstado("en cocina");
pedido.cambiarEstado("enviado");
