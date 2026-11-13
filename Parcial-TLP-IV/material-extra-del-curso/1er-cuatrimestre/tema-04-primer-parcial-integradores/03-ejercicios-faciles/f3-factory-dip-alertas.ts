// EJERCICIO F3 · Factory + DIP — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// // 📌 [COMPOSITION ROOT + FACTORY] La "configuración" decide el canal; el servicio no cambia
// const configuracion: { canal: TipoCanal; destino: string }[] = [
//   { canal: "email", destino: "ops@empresa.com" },
//   { canal: "sms", destino: "3815550000" },
//   { canal: "slack", destino: "guardia" },
// ];
// for (const c of configuracion) {
//   const servicio = new ServicioAlertas(FabricaNotificadores.crear(c.canal));
//   console.log(servicio.alertar(c.destino, "critico", "Servidor caído en producción"));
// }
// const info = new ServicioAlertas(FabricaNotificadores.crear("email"));
// info.alertar("a@b.com", "info", "uno");
// console.log(info.alertar("a@b.com", "info", "dos"));
// console.log(`Enviadas: ${info.cantidadEnviadas}`);
