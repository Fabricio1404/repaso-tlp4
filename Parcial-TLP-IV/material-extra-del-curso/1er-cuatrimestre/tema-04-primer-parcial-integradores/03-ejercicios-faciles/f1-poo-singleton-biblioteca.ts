// EJERCICIO F1 · POO + Singleton — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// function prestarDesdeAula(aula: string, material: Material): void {
//   // 📌 [SINGLETON EN USO] Cada aula obtiene el MISMO registro
//   console.log(`[${aula}] ${RegistroPrestamos.obtenerInstancia().prestar(material)}`);
// }
//
// const rayuela = new Libro("L1", "Rayuela");
// prestarDesdeAula("Aula 1", rayuela);
// prestarDesdeAula("Aula 2", new Revista("R1", "Muy Interesante"));
// try {
//   prestarDesdeAula("Aula 3", rayuela);
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// const registro = RegistroPrestamos.obtenerInstancia();
// console.log(`Prestados: ${registro.cantidad}`);
// registro.devolver("L1");
// console.log(`Prestados: ${registro.cantidad}`);
