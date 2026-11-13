// EJERCICIO M2 · Observer subasta — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO =======================
interface EventoOferta {
  readonly articulo: string;
  readonly postor: string;
  readonly monto: number;
  readonly anterior: number;
}

interface ObservadorSubasta {
  nuevaOferta(evento: EventoOferta): void;
}
// ============================================================

// TODO: Subasta, Postor, PantallaSala, Auditoria


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const subasta = new Subasta("Guitarra criolla", 50000);
// const pantalla = new PantallaSala();
// const auditoria = new Auditoria();
// const ana = new Postor("Ana");
// const beto = new Postor("Beto");
// subasta.suscribir(pantalla);
// subasta.suscribir(auditoria);
// subasta.suscribir(ana);
// subasta.suscribir(beto);
//
// subasta.ofertar("Ana", 55000);
// subasta.ofertar("Beto", 60000);
// try {
//   subasta.ofertar("Ana", 60000);
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// subasta.desuscribir(pantalla);
// subasta.ofertar("Ana", 80000);
// console.log(subasta.cerrar());
// console.log(`Ofertas registradas: ${auditoria.totalOfertas}, mayor salto: $${auditoria.mayorSalto()}`);
// try {
//   subasta.ofertar("Beto", 90000);
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
