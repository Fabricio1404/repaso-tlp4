// SIMULACRO TEMA A · EJERCICIO 3 · CÓDIGO ORIGINAL
// Hacé el commit "chore(ej3): código original" ANTES de modificarlo.

class ServicioEntradas {
  emitir(pelicula: string, precio: number, tipo: string): number {
    let final = precio;
    switch (tipo) {
      case "estudiante":
        final = precio * 0.7;
        break;
      case "jubilado":
        final = precio * 0.5;
        break;
      case "general":
        final = precio;
        break;
    }
    console.log(`*** ${pelicula} ***`);
    console.log(`Tarifa ${tipo}: $${final}`);
    return final;
  }
}

// Bloque de prueba
const servicio = new ServicioEntradas();
let total = 0;
total += servicio.emitir("Dune", 10000, "general");
total += servicio.emitir("Dune", 10000, "estudiante");
total += servicio.emitir("Dune", 10000, "jubilado");
console.log(`Recaudado: $${total}`);
