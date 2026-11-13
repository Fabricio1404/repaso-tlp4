// SOLUCIÓN · main.ts
// Ejecutar desde 1er-cuatrimestre/: node tema-02-patrones-de-diseno/09-practica-guiada-readme/solucion/main.ts
import { Pedido } from "./pedido.ts";
import { Cocina } from "./cocina.ts";
import { ClienteApp, Mozo, PantallaCocina } from "./observadores.ts";
import { RappiAdapter, RappiLegacyAPI } from "./delivery.ts";

const mesa = new Pedido("Mesa 4");
mesa.suscribir(new Mozo("Juan"));
mesa.suscribir(new PantallaCocina());
mesa.agregar("pizza");
mesa.agregar("empanada", 6);
console.log(mesa.detalle());
mesa.confirmar();

const envio = new Pedido("Delivery Ana");
envio.suscribir(new ClienteApp("Ana"));
envio.suscribir(new PantallaCocina());
envio.agregar("ensalada", 2);
console.log(envio.detalle());
envio.confirmar();

const cocina = Cocina.obtenerInstancia();
console.log(`Pendientes en cocina: ${cocina.pendientes()}`);
console.log(`Despachado: ${cocina.despachar()}`);
mesa.cambiarEstado("listo");

const rappi = new RappiAdapter(new RappiLegacyAPI());
console.log(`Seguimiento: ${envio.enviarPorDelivery(rappi, "Av. Mate de Luna 1234")}`);
try {
  new Pedido("Vacío").confirmar();
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  envio.enviarPorDelivery(rappi, "   ");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(`Pendientes en cocina: ${cocina.pendientes()}`);
