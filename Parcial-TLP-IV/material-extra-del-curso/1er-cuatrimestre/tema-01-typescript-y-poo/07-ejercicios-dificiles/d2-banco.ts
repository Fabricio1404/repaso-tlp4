// EJERCICIO D2 · Banco — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// function intentar(accion: () => void): void {
//   try {
//     accion();
//   } catch (e) {
//     if (e instanceof OperacionInvalidaError) console.log(`✗ ${e.message}`);
//   }
// }
//
// const banco = new Banco();
// const ca = new CajaAhorro("001", "Ana");
// const cc = new CuentaCorriente("002", "Beto", 5000);
// banco.abrir(ca);
// banco.abrir(cc);
//
// ca.depositar(10000);
// banco.transferir("001", "002", 3000);
// cc.extraer(7000);
// intentar(() => cc.extraer(2000));
// ca.extraer(1000);
// ca.extraer(1000);
// intentar(() => ca.extraer(1000));
// ca.nuevoMes();
// ca.extraer(1000);
// intentar(() => banco.transferir("001", "002", 99999));
// console.log(`Saldo de Beto sin cambios: ${formatear(cc.saldoActual)}`);
// intentar(() => banco.abrir(new CajaAhorro("001", "Otro")));
// intentar(() => banco.buscar("999"));
// intentar(() => ca.transferir(ca, 10));
// intentar(() => ca.depositar(-5));
// console.log(banco.reporte());
// console.log(ca.historial().map((m) => `${m.tipo} ${m.monto} → ${m.saldoResultante}`));
// console.log(`Total depositado: ${formatear(banco.totalDepositado)}`);
