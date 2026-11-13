// Ejercicio 1 · SRP · Boletín de notas (RESUELTO)
// Razones para cambiar del original:
//   1) cómo se calcula la condición (reglas académicas)
//   2) cómo se muestra el texto (formato)
//   3) dónde/cómo se guarda (archivo, BD...)
// Cada una pasa a su propia clase.

export {};

type Condicion = "Promocionado" | "Regular" | "Libre";

interface Resultado {
  alumno: string;
  promedio: number;
  condicion: Condicion;
}

// SRP: solo sabe de reglas académicas
class CalculadoraNotas {
  calcular(alumno: string, notas: number[]): Resultado {
    const promedio = notas.reduce((a, n) => a + n, 0) / notas.length;
    let condicion: Condicion;
    if (promedio >= 7) condicion = "Promocionado";
    else if (promedio >= 4) condicion = "Regular";
    else condicion = "Libre";
    return { alumno: alumno, promedio: promedio, condicion: condicion };
  }
}

// SRP: solo sabe de formato
class FormateadorBoletin {
  formatear(r: Resultado): string {
    return `Alumno: ${r.alumno} | Promedio: ${r.promedio.toFixed(2)} | ${r.condicion}`;
  }
}

// SRP: solo sabe de persistencia
class RepositorioBoletines {
  guardar(r: Resultado): void {
    console.log(`[archivo] guardado boletin-${r.alumno.toLowerCase()}.txt`);
  }
}

// Coordina, pero no hace el trabajo de nadie
class Boletin {
  private calculadora: CalculadoraNotas;
  private formateador: FormateadorBoletin;
  private repositorio: RepositorioBoletines;

  constructor(c: CalculadoraNotas, f: FormateadorBoletin, r: RepositorioBoletines) {
    this.calculadora = c;
    this.formateador = f;
    this.repositorio = r;
  }

  procesar(alumno: string, notas: number[]): void {
    const resultado = this.calculadora.calcular(alumno, notas);
    this.repositorio.guardar(resultado);
    console.log(this.formateador.formatear(resultado));
  }
}

// ---------------- Bloque de prueba ----------------
const boletin = new Boletin(new CalculadoraNotas(), new FormateadorBoletin(), new RepositorioBoletines());
boletin.procesar("Ana", [8, 9, 7]);
boletin.procesar("Beto", [5, 4, 6]);
boletin.procesar("Caro", [2, 3, 4]);
