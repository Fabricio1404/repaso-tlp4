// SIMULACRO TEMA A · EJERCICIO 1 · Cine (clase abstracta, herencia, polimorfismo, static, getter)

// 📌 [CLASE ABSTRACTA]
abstract class Funcion {
  // 📌 [READONLY]
  readonly sala: number;
  readonly pelicula: string;

  constructor(sala: number, pelicula: string) {
    this.sala = sala;
    this.pelicula = pelicula;
  }

  // 📌 [MÉTODO ABSTRACTO]
  abstract precioEntrada(): number;
}

class Funcion2D extends Funcion {
  precioEntrada(): number {
    return 6000;
  }
}

class Funcion3D extends Funcion {
  // 📌 [STATIC READONLY] Costo de los anteojos, constante de la clase
  static readonly ANTEOJOS = 500;
  precioEntrada(): number {
    return 8500 + Funcion3D.ANTEOJOS;
  }
}

class Funcion4D extends Funcion {
  precioEntrada(): number {
    return 12000;
  }
}

class Complejo {
  // 📌 [ENCAPSULAMIENTO] Arreglo privado: solo se agrega con programar
  private funciones: Funcion[];
  // 📌 [STATIC] Total de entradas vendidas por todos los complejos
  static totalEntradas: number = 0;

  constructor() {
    this.funciones = [];
  }

  programar(funcion: Funcion): void {
    this.funciones.push(funcion);
  }

  vender(sala: number, cantidad: number): number {
    const f = this.funciones.find((x) => x.sala === sala);
    if (f === undefined) {
      throw new Error(`No hay función en la sala ${sala}`);
    }
    Complejo.totalEntradas += cantidad;
    // 📌 [POLIMORFISMO]
    return f.precioEntrada() * cantidad;
  }

  // 📌 [GETTER]
  get cantidadFunciones(): number {
    return this.funciones.length;
  }

  cartelera(): void {
    for (const f of this.funciones) {
      // 📌 [POLIMORFISMO] sin if por tipo
      console.log(`Sala ${f.sala} · ${f.pelicula}: $${f.precioEntrada()}`);
    }
  }
}

// Bloque de prueba
const complejo = new Complejo();
complejo.programar(new Funcion2D(1, "Relatos salvajes"));
complejo.programar(new Funcion3D(2, "Avatar"));
complejo.programar(new Funcion4D(3, "Dune"));
complejo.cartelera();
console.log(`Venta sala 2: $${complejo.vender(2, 3)}`);
console.log(`Venta sala 3: $${complejo.vender(3, 2)}`);
try {
  complejo.vender(9, 1);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(`Funciones: ${complejo.cantidadFunciones}`);
console.log(`Entradas vendidas: ${Complejo.totalEntradas}`);
