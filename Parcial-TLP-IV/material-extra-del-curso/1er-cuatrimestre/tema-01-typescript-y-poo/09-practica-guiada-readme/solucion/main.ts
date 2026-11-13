// SOLUCIÓN · main.ts (bloque de prueba)
// Ejecutar: node tema-01-typescript-y-poo/09-practica-guiada-readme/solucion/main.ts

import { Conejo, Gato, Perro } from "./mascota.ts";
import { Veterinaria } from "./veterinaria.ts";

const vete = new Veterinaria("Patitas");
const toby = new Perro("Toby", 3);
const michi = new Gato("Michi", 12);
const copo = new Conejo("Copo", 1);

vete.registrar(toby);
vete.registrar(michi);
vete.registrar(copo);
try {
  vete.registrar(new Perro("Toby", 5));
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}

console.log(vete.listar());
console.log(`Toby paga $${vete.atender(toby.id, "2026-03-01", "vacunación")}`);
console.log(`Michi paga $${vete.atender(michi.id, "2026-03-02", "control")}`);
console.log(`Copo paga $${vete.atender(copo.id, "2026-03-02", "control")}`);
vete.atender(toby.id, "2026-03-10", "control");

try {
  vete.atender(99, "2026-03-11", "control");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  toby.edad = -1;
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}

const historial = toby.obtenerHistorial();
historial.push({ fecha: "falsa", motivo: "falsa", costo: 1000000 });
console.log(`Consultas de Toby: ${toby.obtenerHistorial().length}`);
console.log(`Facturación: $${vete.facturacion()}`);
console.log(`Gatos: ${vete.pacientesPorEspecie("Gato").map((m) => m.nombre).join(", ")}`);
console.log(`Atenciones: ${Veterinaria.totalAtenciones()}`);
