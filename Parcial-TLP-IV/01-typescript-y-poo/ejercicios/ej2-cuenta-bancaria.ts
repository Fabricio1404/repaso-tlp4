// Ejercicio 2 · Cuenta bancaria (encapsulamiento, getter, error propio, copia defensiva)
// Consigna completa y salida esperada: ver EJERCICIOS.md (en esta misma carpeta).
//
// 1. Escribí tu código ACÁ ABAJO (tipos, clases, funciones).
// 2. Cuando termines, descomentá el bloque de prueba del final.
// 3. Ejecutá:  node 01-typescript-y-poo/ejercicios/ej2-cuenta-bancaria.ts
// 4. Verificá: npx tsc

export {};   // hace que este archivo sea un módulo independiente (no lo borres)

// ✏️ Tu código:



// ---------------- Bloque de prueba ----------------
// const cuenta = new CuentaBancaria("Ana Gómez", 1000);
// console.log(`Titular: ${cuenta.titular}`);
// console.log(`Saldo inicial: $${cuenta.saldo}`);

// cuenta.depositar(500);
// cuenta.extraer(300);
// console.log(`Saldo actual: $${cuenta.saldo}`);

// try {
//   cuenta.extraer(5000);
// } catch (e) {
//   if (e instanceof SaldoInsuficienteError) console.log(`${e.name}: ${e.message}`);
// }

// try {
//   cuenta.depositar(-50);
// } catch (e) {
//   if (e instanceof RangeError) console.log(`RangeError: ${e.message}`);
// }

// Intentamos "romper" la cuenta desde afuera modificando la copia
// const copia = cuenta.obtenerMovimientos();
// copia.push({ tipo: "deposito", monto: 1000000 });
// console.log(`Movimientos reales: ${cuenta.obtenerMovimientos().length}`);

// for (const m of cuenta.obtenerMovimientos()) {
//   console.log(`- ${m.tipo}: $${m.monto}`);
// }
