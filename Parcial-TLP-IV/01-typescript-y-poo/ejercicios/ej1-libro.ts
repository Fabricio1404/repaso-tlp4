// Ejercicio 1 · Libro (clases, constructor largo, métodos, validación)
// Consigna completa y salida esperada: ver EJERCICIOS.md (en esta misma carpeta).
//
// 1. Escribí tu código ACÁ ABAJO (tipos, clases, funciones).
// 2. Cuando termines, descomentá el bloque de prueba del final.
// 3. Ejecutá:  node 01-typescript-y-poo/ejercicios/ej1-libro.ts
// 4. Verificá: npx tsc

export {};   // hace que este archivo sea un módulo independiente (no lo borres)

// ✏️ Tu código:



// ---------------- Bloque de prueba ----------------
// const rayuela = new Libro("Rayuela", "Julio Cortázar", 600, "novela");
// const ficciones = new Libro("Ficciones", "Jorge Luis Borges", 200, "novela");

// console.log(rayuela.descripcion());
// console.log(`¿Es largo? ${rayuela.esLargo()}`);
// console.log(ficciones.descripcion());
// console.log(`¿Es largo? ${ficciones.esLargo()}`);

// rayuela.prestar();
// console.log(rayuela.descripcion());

// try {
//   rayuela.prestar();                      // segunda vez: debe fallar
// } catch (e) {
//   if (e instanceof Error) console.log(`Error: ${e.message}`);
// }

// rayuela.devolver();
// console.log(rayuela.descripcion());

// try {
//   new Libro("Vacío", "Nadie", 0, "ensayo");   // páginas inválidas
// } catch (e) {
//   if (e instanceof RangeError) console.log(`Error: ${e.message}`);
// }
