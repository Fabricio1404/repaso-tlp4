// Ejercicio 1 · SRP · Boletín de notas
// CONSIGNA: este código FUNCIONA, pero la clase Boletin tiene demasiadas responsabilidades.
//   1. Identificá cuántas "razones para cambiar" tiene Boletin (escribilas en un comentario).
//   2. Refactorizá aplicando SRP: una clase por responsabilidad + una clase que coordine.
//   3. La salida por consola debe quedar EXACTAMENTE igual.
// Ejecutá: node 03-principios-solid/ejercicios/ej1-srp-boletin.ts

export {};

class Boletin {
  private alumno: string;
  private notas: number[];

  constructor(alumno: string, notas: number[]) {
    this.alumno = alumno;
    this.notas = notas;
  }

  procesar(): void {
    // calcula
    const suma = this.notas.reduce((a, n) => a + n, 0);
    const promedio = suma / this.notas.length;
    const condicion = promedio >= 7 ? "Promocionado" : promedio >= 4 ? "Regular" : "Libre";

    // formatea
    const texto = `Alumno: ${this.alumno} | Promedio: ${promedio.toFixed(2)} | ${condicion}`;

    // guarda
    console.log(`[archivo] guardado boletin-${this.alumno.toLowerCase()}.txt`);

    // muestra
    console.log(texto);
  }
}

// ---------------- Bloque de prueba ----------------
new Boletin("Ana", [8, 9, 7]).procesar();
new Boletin("Beto", [5, 4, 6]).procesar();
new Boletin("Caro", [2, 3, 4]).procesar();
