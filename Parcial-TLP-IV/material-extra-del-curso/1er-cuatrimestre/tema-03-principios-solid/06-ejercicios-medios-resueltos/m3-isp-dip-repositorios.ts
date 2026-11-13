// RESOLUCIÓN M3 · ISP + DIP

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

// 📌 [ISP ✓ INTERFACES CHICAS] ISP: cada cliente depende solo de las operaciones que usa
interface Lectura {
  listar(): Producto[];
  buscar(id: number): Producto | undefined;
}

interface Escritura {
  guardar(p: Producto): void;
  eliminar(id: number): void;
}

interface Exportable {
  exportarCSV(): string;
}

// 📌 [ISP ✓ IMPLEMENTA LAS TRES] El repositorio completo sí tiene las tres capacidades
class RepositorioMemoria implements Lectura, Escritura, Exportable {
  private datos: Producto[];

  constructor(iniciales: Producto[]) {
    this.datos = [...iniciales];
  }

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

// 📌 [ISP ✓ SOLO LECTURA] Ya no tiene métodos que lancen error: no los promete
class CatalogoPublico implements Lectura {
  // 📌 [DIP ✓ RECIBE LA ABSTRACCIÓN] Antes: private fuente = new RepositorioMemoria()
  private fuente: Lectura;

  constructor(fuente: Lectura) {
    this.fuente = fuente;
  }

  listar(): Producto[] {
    return this.fuente.listar();
  }

  buscar(id: number): Producto | undefined {
    return this.fuente.buscar(id);
  }
}

class ServicioPrecios {
  // 📌 [ISP + DIP ✓ LO MÍNIMO] Solo lee: pide una Lectura (no un RepositorioMemoria, ni Escritura, ni Exportable)
  private repo: Lectura;

  constructor(repo: Lectura) {
    this.repo = repo;
  }

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
// 📌 [COMPOSITION ROOT] UN repositorio compartido por todos
const repo = new RepositorioMemoria([
  { id: 1, nombre: "Yerba", precio: 3000 },
  { id: 2, nombre: "Café", precio: 5000 },
]);
const precios = new ServicioPrecios(repo);
const catalogo = new CatalogoPublico(repo);
console.log(`Promedio: $${precios.precioPromedio()}`);
console.log(`Más caro: ${precios.masCaro()}`);
console.log(catalogo.buscar(2)?.nombre);
repo.guardar({ id: 3, nombre: "Té", precio: 1200 });
console.log(repo.exportarCSV());
console.log(`Promedio: $${precios.precioPromedio()}`);
// catalogo.guardar(...) ❌ no compila: el catálogo no promete escritura
