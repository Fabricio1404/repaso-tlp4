// RESOLUCIÓN F1 · POO + Singleton: biblioteca escolar

// 📌 [CLASE ABSTRACTA] No hay "material genérico"
abstract class Material {
  readonly codigo: string;
  readonly titulo: string;

  constructor(codigo: string, titulo: string) {
    this.codigo = codigo;
    this.titulo = titulo;
  }

  // 📌 [MÉTODO ABSTRACTO] Cada tipo define sus días de préstamo
  abstract diasDePrestamo(): number;
  abstract tipo(): string;

  // 📌 [POLIMORFISMO] Escrito una vez, usa los abstractos
  describir(): string {
    return `${this.tipo()} "${this.titulo}" (${this.diasDePrestamo()} días)`;
  }
}

class Libro extends Material {
  diasDePrestamo(): number {
    return 14;
  }
  tipo(): string {
    return "Libro";
  }
}

class Revista extends Material {
  diasDePrestamo(): number {
    return 3;
  }
  tipo(): string {
    return "Revista";
  }
}

// 📌 [SINGLETON] Un solo registro de préstamos para toda la escuela
class RegistroPrestamos {
  private static instancia: RegistroPrestamos | undefined;
  private prestados: Material[];

  private constructor() {
    this.prestados = [];
  }

  static obtenerInstancia(): RegistroPrestamos {
    if (RegistroPrestamos.instancia === undefined) {
      RegistroPrestamos.instancia = new RegistroPrestamos();
    }
    return RegistroPrestamos.instancia;
  }

  prestar(material: Material): string {
    if (this.prestados.some((m) => m.codigo === material.codigo)) {
      throw new Error(`${material.titulo} ya está prestado`);
    }
    this.prestados.push(material);
    return `Prestado: ${material.describir()}`;
  }

  devolver(codigo: string): void {
    this.prestados = this.prestados.filter((m) => m.codigo !== codigo);
  }

  // 📌 [GETTER] cantidad actual
  get cantidad(): number {
    return this.prestados.length;
  }
}

// Bloque de prueba
function prestarDesdeAula(aula: string, material: Material): void {
  // 📌 [SINGLETON EN USO] Cada aula obtiene el MISMO registro
  console.log(`[${aula}] ${RegistroPrestamos.obtenerInstancia().prestar(material)}`);
}

const rayuela = new Libro("L1", "Rayuela");
prestarDesdeAula("Aula 1", rayuela);
prestarDesdeAula("Aula 2", new Revista("R1", "Muy Interesante"));
try {
  prestarDesdeAula("Aula 3", rayuela);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
const registro = RegistroPrestamos.obtenerInstancia();
console.log(`Prestados: ${registro.cantidad}`);
registro.devolver("L1");
console.log(`Prestados: ${registro.cantidad}`);
