// EJERCICIO M2 · Reproductor multimedia (ISP + Factory + Adapter) — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO (no lo modifiques) =======================
// Radio vieja por streaming
class RadioStreamLegacy {
  private frecuencia = 0;
  tune(freq: number): void {
    this.frecuencia = freq;
  }
  getStationName(): string {
    return this.frecuencia === 100.7 ? "Radio Universidad" : `FM ${this.frecuencia}`;
  }
}
// ===============================================================================

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const lista = new ListaReproduccion();
// const tema = FabricaContenido.crear("cancion", "Zamba de mi esperanza", 4);
// const peli = new Pelicula("Relatos salvajes", 122); // necesitamos el tipo concreto para pedir subtítulos
// lista.agregar(tema);
// lista.agregar(peli);
// lista.agregar(FabricaContenido.crear("radio", "", 100.7));
// for (const linea of lista.reproducirTodo()) console.log(linea);
// console.log(`Duración total: ${lista.duracionTotal} min`);
// console.log(peli.subtitulos("español"));
// console.log(descargarTodo([new Cancion("Libertango", 3), peli]));
// // descargarTodo([FabricaContenido.crear("radio", "", 99.9)]); ❌ no compila: un Reproducible no es Descargable
