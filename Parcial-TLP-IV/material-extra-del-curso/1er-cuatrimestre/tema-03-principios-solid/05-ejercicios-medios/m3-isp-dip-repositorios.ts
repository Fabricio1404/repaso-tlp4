// EJERCICIO M3 · ISP + DIP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL (funciona, mal diseñado). Refactorizalo.

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Repositorio {
  listar(): Producto[];
  buscar(id: number): Producto | undefined;
  guardar(p: Producto): void;
  eliminar(id: number): void;
  exportarCSV(): string;
}

class RepositorioMemoria implements Repositorio {
  private datos: Producto[] = [
    { id: 1, nombre: "Yerba", precio: 3000 },
    { id: 2, nombre: "Café", precio: 5000 },
  ];
  listar(): Producto[] {
    return [...this.datos];
  }
  buscar(id: number): Producto | undefined {
    return this.datos.find((p) => p.id === id);
  }
  guardar(p: Producto): void {
    this.datos.push(p);
  }
  eliminar(id: number): void {
    this.datos = this.datos.filter((p) => p.id !== id);
  }
  exportarCSV(): string {
    return this.datos.map((p) => `${p.id},${p.nombre},${p.precio}`).join("\n");
  }
}

class CatalogoPublico implements Repositorio {
  private fuente = new RepositorioMemoria();
  listar(): Producto[] {
    return this.fuente.listar();
  }
  buscar(id: number): Producto | undefined {
    return this.fuente.buscar(id);
  }
  guardar(_p: Producto): void {
    throw new Error("El catálogo público es de solo lectura");
  }
  eliminar(_id: number): void {
    throw new Error("El catálogo público es de solo lectura");
  }
  exportarCSV(): string {
    throw new Error("El catálogo público no exporta");
  }
}

class ServicioPrecios {
  private repo = new RepositorioMemoria();

  precioPromedio(): number {
    const ps = this.repo.listar();
    return ps.reduce((acc, p) => acc + p.precio, 0) / ps.length;
  }

  masCaro(): string {
    const ps = this.repo.listar();
    return ps.reduce((max, p) => (p.precio > max.precio ? p : max)).nombre;
  }
}

// Bloque de prueba
const precios = new ServicioPrecios();
console.log(`Promedio: $${precios.precioPromedio()}`);
console.log(`Más caro: ${precios.masCaro()}`);
const catalogo = new CatalogoPublico();
console.log(catalogo.buscar(2)?.nombre);
const repo = new RepositorioMemoria();
repo.guardar({ id: 3, nombre: "Té", precio: 1200 });
console.log(repo.exportarCSV());
