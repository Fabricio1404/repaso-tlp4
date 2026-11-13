// RESOLUCIÓN D1 · Almacén con reposición automática — los 4 patrones juntos
//   Singleton → Almacen        Factory → FabricaProductos
//   Observer  → Almacen (sujeto) + AlertaConsola / ReponedorAutomatico (observadores)
//   Adapter   → ProveedorMayoristaAdapter sobre una API vieja que habla XML

// ============================ PRODUCTOS (Factory) ============================

interface DatosProducto {
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  diasParaVencer?: number;
}

// 📌 [FACTORY - TIPO COMÚN] Clase abstracta con el stock encapsulado
abstract class Producto {
  readonly codigo: string;
  readonly nombre: string;
  protected precio: number;
  private _stock: number;
  readonly stockMinimo: number;

  constructor(datos: DatosProducto) {
    if (datos.stock < 0 || datos.stockMinimo < 0) {
      throw new Error("Stock inválido");
    }
    this.codigo = datos.codigo;
    this.nombre = datos.nombre;
    this.precio = datos.precio;
    this._stock = datos.stock;
    this.stockMinimo = datos.stockMinimo;
  }

  get stock(): number {
    return this._stock;
  }

  get bajoMinimo(): boolean {
    return this._stock < this.stockMinimo;
  }

  descontar(cantidad: number): void {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("Cantidad inválida");
    }
    if (cantidad > this._stock) {
      throw new Error(`Stock insuficiente de ${this.nombre} (hay ${this._stock})`);
    }
    this._stock -= cantidad;
  }

  sumar(cantidad: number): void {
    this._stock += cantidad;
  }

  abstract precioFinal(): number;
}

class ProductoNoPerecedero extends Producto {
  precioFinal(): number {
    return this.precio;
  }
}

class ProductoPerecedero extends Producto {
  private diasParaVencer: number;

  constructor(datos: DatosProducto, diasParaVencer: number) {
    super(datos);
    this.diasParaVencer = diasParaVencer;
  }

  // 📌 [POLIMORFISMO] Regla propia: 30 % de descuento si vence en 3 días o menos
  precioFinal(): number {
    return this.diasParaVencer <= 3 ? Math.round(this.precio * 0.7) : this.precio;
  }
}

type TipoProducto = "perecedero" | "no-perecedero";

class FabricaProductos {
  // 📌 [FACTORY] Único lugar con new de productos; valida lo específico de cada tipo
  static crear(tipo: TipoProducto, datos: DatosProducto): Producto {
    if (tipo === "perecedero") {
      if (datos.diasParaVencer === undefined) {
        throw new Error(`${datos.nombre}: un perecedero necesita días para vencer`);
      }
      return new ProductoPerecedero(datos, datos.diasParaVencer);
    }
    return new ProductoNoPerecedero(datos);
  }
}

// ============================ OBSERVER (interfaz) ============================

interface EventoStockBajo {
  readonly codigo: string;
  readonly nombre: string;
  readonly stock: number;
  readonly minimo: number;
}

// 📌 [OBSERVER - INTERFAZ OBSERVADOR]
interface ObservadorStock {
  stockBajo(evento: EventoStockBajo): void;
}

// ============================== ALMACÉN (Singleton + Sujeto) ==================

class Almacen {
  // 📌 [SINGLETON] Un único almacén para todo el sistema
  private static instancia: Almacen | undefined;
  private productos: Producto[];
  // 📌 [OBSERVER - SUJETO] El almacén avisa cuando un producto queda bajo el mínimo
  private observadores: ObservadorStock[];

  private constructor() {
    this.productos = [];
    this.observadores = [];
  }

  static obtenerInstancia(): Almacen {
    if (Almacen.instancia === undefined) {
      Almacen.instancia = new Almacen();
    }
    return Almacen.instancia;
  }

  suscribir(o: ObservadorStock): void {
    this.observadores.push(o);
  }

  agregar(producto: Producto): void {
    if (this.productos.some((p) => p.codigo === producto.codigo)) {
      throw new Error(`Ya existe el producto ${producto.codigo}`);
    }
    this.productos.push(producto);
  }

  vender(codigo: string, cantidad: number): number {
    const p = this.buscar(codigo);
    p.descontar(cantidad);
    const total = p.precioFinal() * cantidad;
    // 📌 [OBSERVER - NOTIFICAR SOLO SI CORRESPONDE] Cambió el estado y quedó bajo el mínimo
    if (p.bajoMinimo) {
      this.notificar({ codigo: p.codigo, nombre: p.nombre, stock: p.stock, minimo: p.stockMinimo });
    }
    return total;
  }

  reponer(codigo: string, cantidad: number): void {
    this.buscar(codigo).sumar(cantidad);
  }

  stockDe(codigo: string): number {
    return this.buscar(codigo).stock;
  }

  private buscar(codigo: string): Producto {
    const p = this.productos.find((x) => x.codigo === codigo);
    if (p === undefined) {
      throw new Error(`No existe el producto ${codigo}`);
    }
    return p;
  }

  private notificar(evento: EventoStockBajo): void {
    for (const o of this.observadores) {
      o.stockBajo(evento);
    }
  }
}

// ============================ ADAPTER (proveedor) ============================

// 📌 [ADAPTER - TARGET] Lo que necesita nuestro sistema
interface Proveedor {
  pedir(codigo: string, cantidad: number): string;
}

// 📌 [ADAPTER - ADAPTEE] API vieja del mayorista: recibe y devuelve XML en texto. No se modifica
class ApiMayoristaXML {
  private numero = 0;
  enviarOrdenXML(xml: string): string {
    if (!xml.includes("<cantidad>")) {
      return "<error>formato</error>";
    }
    this.numero++;
    return `<ok>ORD-${this.numero}</ok>`;
  }
}

// 📌 [ADAPTER - ADAPTADOR] Arma el XML y parsea la respuesta
class ProveedorMayoristaAdapter implements Proveedor {
  private api: ApiMayoristaXML;

  constructor(api: ApiMayoristaXML) {
    this.api = api;
  }

  pedir(codigo: string, cantidad: number): string {
    const xml = `<orden><codigo>${codigo}</codigo><cantidad>${cantidad}</cantidad></orden>`;
    const respuesta = this.api.enviarOrdenXML(xml);
    const coincidencia = respuesta.match(/^<ok>(.+)<\/ok>$/);
    if (coincidencia === null) {
      throw new Error(`El proveedor rechazó la orden: ${respuesta}`);
    }
    return coincidencia[1];
  }
}

// ============================ OBSERVADORES CONCRETOS ===========================

class AlertaConsola implements ObservadorStock {
  stockBajo(e: EventoStockBajo): void {
    console.log(`⚠ ${e.nombre} quedó en ${e.stock} (mínimo ${e.minimo})`);
  }
}

// 📌 [OBSERVER + ADAPTER + SINGLETON] Reacciona pidiendo al proveedor (vía Adapter) y repone en el almacén (Singleton)
class ReponedorAutomatico implements ObservadorStock {
  // 📌 [DEPENDE DE LA INTERFAZ] Recibe un Proveedor: no sabe que atrás hay XML
  private proveedor: Proveedor;

  constructor(proveedor: Proveedor) {
    this.proveedor = proveedor;
  }

  stockBajo(e: EventoStockBajo): void {
    const cantidad = e.minimo * 2 - e.stock;
    const orden = this.proveedor.pedir(e.codigo, cantidad);
    Almacen.obtenerInstancia().reponer(e.codigo, cantidad);
    console.log(`↻ Pedido ${orden}: +${cantidad} de ${e.nombre}`);
  }
}

// Bloque de prueba
const almacen = Almacen.obtenerInstancia();
almacen.suscribir(new AlertaConsola());
almacen.suscribir(new ReponedorAutomatico(new ProveedorMayoristaAdapter(new ApiMayoristaXML())));

almacen.agregar(FabricaProductos.crear("perecedero", { codigo: "L1", nombre: "Leche", precio: 1500, stock: 10, stockMinimo: 4, diasParaVencer: 2 }));
almacen.agregar(FabricaProductos.crear("no-perecedero", { codigo: "A1", nombre: "Arroz", precio: 2000, stock: 20, stockMinimo: 5 }));

console.log(`Venta: $${almacen.vender("L1", 3)}`);
console.log(`Venta: $${almacen.vender("L1", 4)}`);
console.log(`Stock de leche: ${almacen.stockDe("L1")}`);
console.log(`Venta: $${almacen.vender("A1", 10)}`);
try {
  almacen.vender("A1", 50);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  FabricaProductos.crear("perecedero", { codigo: "Q1", nombre: "Queso", precio: 5000, stock: 3, stockMinimo: 1 });
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(`Mismo almacén: ${almacen === Almacen.obtenerInstancia()}`);
