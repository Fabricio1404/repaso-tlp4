// Ejercicio 1 · Libro (clases, constructor largo, métodos, validación)

type Genero = "novela" | "ensayo" | "poesia";   // unión de literales en lugar de enum

class Libro {
  // 1. Declaramos los atributos con su tipo y su modificador
  private titulo: string;
  private autor: string;
  private paginas: number;
  private genero: Genero;
  private prestado: boolean;

  // 2. Constructor en forma LARGA: recibimos y asignamos con this
  constructor(titulo: string, autor: string, paginas: number, genero: Genero) {
    // Validamos ANTES de asignar: si los datos son inválidos, el objeto no debe existir
    if (paginas <= 0) {
      throw new RangeError("La cantidad de páginas debe ser mayor a 0");
    }
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.genero = genero;
    this.prestado = false;   // valor inicial que no viene por parámetro
  }

  prestar(): void {
    // Regla de negocio: no se puede prestar un libro que ya está prestado
    if (this.prestado) {
      throw new Error(`"${this.titulo}" ya está prestado`);
    }
    this.prestado = true;
  }

  devolver(): void {
    this.prestado = false;
  }

  estaPrestado(): boolean {
    return this.prestado;
  }

  esLargo(): boolean {
    return this.paginas > 300;
  }

  descripcion(): string {
    const estado = this.prestado ? "prestado" : "disponible";
    return `${this.titulo} - ${this.autor} (${this.paginas} págs., ${this.genero}) [${estado}]`;
  }
}

// ---------------- Bloque de prueba ----------------
const rayuela = new Libro("Rayuela", "Julio Cortázar", 600, "novela");
const ficciones = new Libro("Ficciones", "Jorge Luis Borges", 200, "novela");

console.log(rayuela.descripcion());
console.log(`¿Es largo? ${rayuela.esLargo()}`);
console.log(ficciones.descripcion());
console.log(`¿Es largo? ${ficciones.esLargo()}`);

rayuela.prestar();
console.log(rayuela.descripcion());

try {
  rayuela.prestar();                      // segunda vez: debe fallar
} catch (e) {
  if (e instanceof Error) console.log(`Error: ${e.message}`);
}

rayuela.devolver();
console.log(rayuela.descripcion());

try {
  new Libro("Vacío", "Nadie", 0, "ensayo");   // páginas inválidas
} catch (e) {
  if (e instanceof RangeError) console.log(`Error: ${e.message}`);
}
