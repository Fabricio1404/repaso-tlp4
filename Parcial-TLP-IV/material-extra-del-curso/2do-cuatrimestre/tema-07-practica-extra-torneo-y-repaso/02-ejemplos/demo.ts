// Bloque de prueba del TP. Ejecutar: node 02-ejemplos/demo.ts
import { gestionarTorneo } from "./torneo.ts";

console.log(gestionarTorneo({ deporte: "Futbol", jugadoresLocal: 10, jugadoresVisitante: 11 })); // OK
console.log(gestionarTorneo({ deporte: "Basquet", jugadoresLocal: 6, jugadoresVisitante: 4 })); // Equipos no válidos para el deporte
console.log(gestionarTorneo({ deporte: "Futbol", jugadoresLocal: 12, jugadoresVisitante: 11 })); // Equipos no válidos para el deporte
