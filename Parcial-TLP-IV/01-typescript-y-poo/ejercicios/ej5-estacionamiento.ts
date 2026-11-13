// Ejercicio 5 · Estacionamiento (INTEGRADOR: abstracta, herencia, polimorfismo,
// Consigna completa y salida esperada: ver EJERCICIOS.md (en esta misma carpeta).
//
// 1. Escribí tu código ACÁ ABAJO (tipos, clases, funciones).
// 2. Cuando termines, descomentá el bloque de prueba del final.
// 3. Ejecutá:  node 01-typescript-y-poo/ejercicios/ej5-estacionamiento.ts
// 4. Verificá: npx tsc

export {};   // hace que este archivo sea un módulo independiente (no lo borres)

// ✏️ Tu código:



// ---------------- Bloque de prueba ----------------
// const centro = new Estacionamiento(2);
// const norte = new Estacionamiento(5);

// centro.ingresar(new Auto("ab123cd"));
// centro.ingresar(new Moto("A001XYZ"));
// console.log(`Centro: ${centro.ocupados} ocupados, ${centro.libres} libres`);

// try {
//   centro.ingresar(new Camioneta("AE999ZZ"));
// } catch (e) {
//   if (e instanceof EstacionamientoLlenoError) console.log(`${e.name}: ${e.message}`);
// }

// console.log(`Cobro AB123CD (2.5 h): $${centro.egresar("AB123CD", 2.5)}`);
// console.log(`Cobro A001XYZ (1 h): $${centro.egresar("A001XYZ", 1)}`);

// norte.ingresar(new Camioneta("AE999ZZ"));
// console.log(`Cobro AE999ZZ (0.5 h): $${norte.egresar("AE999ZZ", 0.5)}`);

// console.log(`Recaudado en Centro: $${centro.recaudado}`);
// console.log(`Recaudado en Norte: $${norte.recaudado}`);
// console.log(`Recaudación histórica: $${Estacionamiento.recaudacionHistorica}`);
