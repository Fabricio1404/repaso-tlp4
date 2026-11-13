// ============================================================================
// EJEMPLO 6 · COMPOSICIÓN, ERRORES PROPIOS y UNIONES DE LITERALES (en lugar de enum)
// Un Pedido TIENE ítems (composición). Cada ítem TIENE un producto (agregación).
// ============================================================================

// 📌 [UNIÓN DE LITERALES] Reemplaza a un enum (prohibido): solo esos tres textos son válidos
type EstadoPedido = "pendiente" | "pagado" | "cancelado";

// 📌 [ERROR PROPIO] Una clase que extiende Error permite distinguir este fallo con instanceof
class PedidoInvalidoError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "PedidoInvalidoError";
  }
}

// 📌 [INTERFACE PARA DATOS] Tipa un objeto simple, sin comportamiento
interface Producto {
  readonly codigo: string;
  nombre: string;
  precio: number;
}

class ItemPedido {
  // 📌 [AGREGACIÓN] El ítem referencia un Producto que existe por fuera del pedido
  readonly producto: Producto;
  private _cantidad: number;

  constructor(producto: Producto, cantidad: number) {
    this.producto = producto;
    this._cantidad = 0;
    this.cantidad = cantidad;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  // 📌 [SETTER CON REGLA] Solo enteros mayores a 0
  set cantidad(valor: number) {
    if (!Number.isInteger(valor) || valor <= 0) {
      throw new PedidoInvalidoError("La cantidad debe ser un entero mayor a 0");
    }
    this._cantidad = valor;
  }

  get subtotal(): number {
    return this.producto.precio * this._cantidad;
  }
}

class Pedido {
  readonly numero: number;
  // 📌 [COMPOSICIÓN] El pedido TIENE sus ítems: los crea y administra él; no existen fuera del pedido
  private items: ItemPedido[];
  private _estado: EstadoPedido;
  // 📌 [STATIC] Contador compartido para numerar pedidos automáticamente
  private static proximoNumero: number = 1;

  constructor() {
    this.numero = Pedido.proximoNumero;
    Pedido.proximoNumero++;
    this.items = [];
    this._estado = "pendiente";
  }

  get estado(): EstadoPedido {
    return this._estado;
  }

  agregar(producto: Producto, cantidad: number): void {
    if (this._estado !== "pendiente") {
      throw new PedidoInvalidoError(`El pedido #${this.numero} ya está ${this._estado}`);
    }
    // 📌 [BUSCAR ANTES DE AGREGAR] Si el producto ya está, suma la cantidad en vez de duplicar el ítem
    const existente = this.items.find((i) => i.producto.codigo === producto.codigo);
    if (existente !== undefined) {
      existente.cantidad = existente.cantidad + cantidad;
      return;
    }
    // 📌 [COMPOSICIÓN] El Pedido crea el ItemPedido: quien usa Pedido nunca hace new ItemPedido
    this.items.push(new ItemPedido(producto, cantidad));
  }

  // 📌 [DELEGACIÓN] El total no calcula precios: le pide a cada ítem su subtotal
  get total(): number {
    return this.items.reduce((acumulado, item) => acumulado + item.subtotal, 0);
  }

  pagar(): void {
    if (this.items.length === 0) {
      throw new PedidoInvalidoError("No se puede pagar un pedido vacío");
    }
    this._estado = "pagado";
  }

  // 📌 [COPIA DEFENSIVA] Devuelve textos nuevos, nunca la lista interna
  detalle(): string[] {
    return this.items.map((i) => `${i.cantidad} x ${i.producto.nombre} = $${i.subtotal}`);
  }
}

// Bloque de prueba
const yerba: Producto = { codigo: "A1", nombre: "Yerba", precio: 3000 };
const azucar: Producto = { codigo: "B2", nombre: "Azúcar", precio: 1500 };

const pedido = new Pedido();
pedido.agregar(yerba, 2);
pedido.agregar(azucar, 1);
pedido.agregar(yerba, 1); // se suma al ítem existente
console.log(pedido.detalle()); // [ '3 x Yerba = $9000', '1 x Azúcar = $1500' ]
console.log(`Pedido #${pedido.numero} total: $${pedido.total}`); // Pedido #1 total: $10500
pedido.pagar();
console.log(pedido.estado); // pagado

try {
  pedido.agregar(azucar, 1);
} catch (e) {
  // 📌 [INSTANCEOF CON ERROR PROPIO] Se distingue el tipo de error para manejarlo de forma específica
  if (e instanceof PedidoInvalidoError) {
    console.log(`${e.name}: ${e.message}`); // PedidoInvalidoError: El pedido #1 ya está pagado
  }
}

const otro = new Pedido();
console.log(`Siguiente número: ${otro.numero}`); // Siguiente número: 2
