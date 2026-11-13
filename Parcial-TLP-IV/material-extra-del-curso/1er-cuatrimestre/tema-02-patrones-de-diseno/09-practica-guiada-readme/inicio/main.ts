// INICIO · main.ts
// Ejecutar desde 1er-cuatrimestre/: node tema-02-patrones-de-diseno/09-practica-guiada-readme/inicio/main.ts
// A medida que resuelvas las tareas vas a tener que adaptar este archivo (ver README, sección 5).
import { Pedido } from "./pedido.ts";
import { Cocina } from "./cocina.ts";
import { Empanada, Ensalada, Pizza } from "./modelos.ts";

const mesa = new Pedido("Mesa 4");
mesa.agregar(new Pizza());
mesa.agregar(new Empanada(), 6);
console.log(mesa.detalle());
mesa.confirmar();

const envio = new Pedido("Delivery Ana");
envio.agregar(new Ensalada(), 2);
console.log(envio.detalle());
envio.confirmar();

const cocina = new Cocina();
console.log(`Pendientes en cocina: ${cocina.pendientes()}`);
console.log(`Despachado: ${cocina.despachar()}`);
mesa.cambiarEstado("listo");

// TAREA 5: descomentar cuando exista RappiAdapter (y agregar el import)
// const rappi = new RappiAdapter(new RappiLegacyAPI());
// console.log(`Seguimiento: ${envio.enviarPorDelivery(rappi, "Av. Mate de Luna 1234")}`);
try {
  new Pedido("Vacío").confirmar();
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
// try {
//   envio.enviarPorDelivery(rappi, "   ");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
console.log(`Pendientes en cocina: ${cocina.pendientes()}`);
