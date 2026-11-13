// EJERCICIO D3 · Gestión de cursos — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const curso = new Curso("Programación IV", 3);
// const ana = new Alumno("30111222", "Ana");
// const beto = new Alumno("30333444", "Beto");
// const caro = new Alumno("30555666", "Caro");
//
// for (const linea of curso.reporte()) console.log(linea);
// curso.asignarDocente(new Docente("20999888", "Prof. Díaz", "TLP IV"));
// curso.inscribir(ana);
// curso.inscribir(beto);
// try {
//   curso.inscribir(new Alumno("30111222", "Ana (otra vez)"));
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// curso.inscribir(caro);
// try {
//   curso.inscribir(new Alumno("40000000", "Dani"));
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
//
// ana.agregarNota(8);
// ana.agregarNota(9);
// beto.agregarNota(4);
// beto.agregarNota(7);
// caro.agregarNota(10);
// try {
//   caro.agregarNota(11);
// } catch (e) {
//   if (e instanceof RangeError) console.log(`RangeError: ${e.message}`);
// }
// try {
//   new Alumno("12A", "X");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
//
// for (const linea of curso.reporte()) console.log(linea);
// console.log(`Aprobados: ${curso.aprobados().map((a) => a.nombre).join(", ")}`);
// console.log(`Mejor promedio: ${curso.mejorPromedio()?.nombre}`);
// curso.darDeBaja("30333444");
// for (const p of curso.integrantes()) console.log(p.presentarse());
