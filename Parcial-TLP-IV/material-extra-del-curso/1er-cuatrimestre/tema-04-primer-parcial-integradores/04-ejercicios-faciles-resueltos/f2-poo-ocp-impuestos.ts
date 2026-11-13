// RESOLUCIÓN F2 · POO + OCP: facturación con categorías de IVA

// 📌 [OCP ✓] OCP: se agregan categorías sin modificar Producto ni Factura
interface Categoria {
  readonly nombre: string;
  alicuota(): number;
}

class Alimentos implements Categoria {
  readonly nombre = "Alimentos";
  alicuota(): number {
    return 0.105;
  }
}

class Electronica implements Categoria {
  readonly nombre = "Electrónica";
  alicuota(): number {
    return 0.21;
  }
}

class Libros implements Categoria {
  readonly nombre = "Libros";
  alicuota(): number {
    return 0;
  }
}

class Producto {
  readonly nombre: string;
  private _precio: number;
  // 📌 [COMPOSICIÓN] El producto TIENE una categoría y le delega la alícuota
  private categoria: Categoria;

  constructor(nombre: string, precio: number, categoria: Categoria) {
    this.nombre = nombre;
    this._precio = 0;
    this.precio = precio;
    this.categoria = categoria;
  }

  get precio(): number {
    return this._precio;
  }

  // 📌 [SETTER CON VALIDACIÓN]
  set precio(valor: number) {
    if (valor <= 0) {
      throw new Error("El precio debe ser mayor a 0");
    }
    this._precio = valor;
  }

  // 📌 [OCP ✓ SIN IF POR CATEGORÍA]
  get iva(): number {
    return Math.round(this._precio * this.categoria.alicuota());
  }

  get precioFinal(): number {
    return this._precio + this.iva;
  }

  linea(): string {
    return `${this.nombre} [${this.categoria.nombre}]: $${this._precio} + IVA $${this.iva} = $${this.precioFinal}`;
  }
}

class Factura {
  private items: Producto[];

  constructor() {
    this.items = [];
  }

  agregar(p: Producto): void {
    this.items.push(p);
  }

  get total(): number {
    return this.items.reduce((acc, p) => acc + p.precioFinal, 0);
  }

  detalle(): string[] {
    return this.items.map((p) => p.linea());
  }
}

// 📌 [OCP ✓ EXTENSIÓN] Categoría nueva: Producto y Factura no se tocaron
class Medicamentos implements Categoria {
  readonly nombre = "Medicamentos";
  alicuota(): number {
    return 0.05;
  }
}

// Bloque de prueba
const factura = new Factura();
factura.agregar(new Producto("Yerba", 3000, new Alimentos()));
factura.agregar(new Producto("Auriculares", 20000, new Electronica()));
factura.agregar(new Producto("Rayuela", 15000, new Libros()));
factura.agregar(new Producto("Ibuprofeno", 4000, new Medicamentos()));
for (const l of factura.detalle()) console.log(l);
console.log(`Total: $${factura.total}`);
try {
  new Producto("Gratis", 0, new Libros());
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
