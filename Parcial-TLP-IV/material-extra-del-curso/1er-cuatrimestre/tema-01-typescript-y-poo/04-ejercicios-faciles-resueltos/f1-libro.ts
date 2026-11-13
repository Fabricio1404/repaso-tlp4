// RESOLUCIÓN F1 · Libro

class Libro {
  // 📌 [ABSTRACCIÓN] Solo lo que importa para una biblioteca: título, autor, páginas y disponibilidad
  titulo: string;
  autor: string;
  paginas: number;
  disponible: boolean;

  // 📌 [CONSTRUCTOR FORMA LARGA] disponible NO se recibe: siempre arranca en true
  constructor(titulo: string, autor: string, paginas: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.disponible = true;
  }

  // 📌 [MÉTODO] Devuelve el texto (return), no lo imprime
  describir(): string {
    return `${this.titulo} de ${this.autor} (${this.paginas} págs.)`;
  }

  esLargo(): boolean {
    return this.paginas > 300;
  }

  prestar(): void {
    // 📌 [VALIDAR ANTES DE MODIFICAR] Si ya está prestado se lanza el error y el estado no cambia
    if (!this.disponible) {
      throw new Error("El libro ya está prestado");
    }
    this.disponible = false;
  }

  devolver(): void {
    this.disponible = true;
  }
}

// Bloque de prueba
const libro = new Libro("Rayuela", "Julio Cortázar", 600);
console.log(libro.describir());
console.log(libro.esLargo());
libro.prestar();
console.log(libro.disponible);
try {
  libro.prestar();
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
libro.devolver();
console.log(libro.disponible);
