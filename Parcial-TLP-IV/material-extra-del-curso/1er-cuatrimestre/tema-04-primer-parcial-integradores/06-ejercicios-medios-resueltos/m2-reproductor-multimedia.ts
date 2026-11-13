// RESOLUCIÓN M2 · Reproductor multimedia — ISP + Factory + Adapter

// ============================ ISP ===========================================
// 📌 [ISP ✓] ISP: capacidades separadas; cada contenido implementa solo las que tiene
interface Reproducible {
  readonly titulo: string;
  reproducir(): string;
  duracionMinutos(): number;
}

interface ConSubtitulos {
  subtitulos(idioma: string): string;
}

interface Descargable {
  descargar(): string;
}

class Cancion implements Reproducible, Descargable {
  readonly titulo: string;
  private minutos: number;

  constructor(titulo: string, minutos: number) {
    this.titulo = titulo;
    this.minutos = minutos;
  }

  reproducir(): string {
    return `♪ Sonando "${this.titulo}"`;
  }
  duracionMinutos(): number {
    return this.minutos;
  }
  descargar(): string {
    return `${this.titulo}.mp3 descargado`;
  }
}

class Pelicula implements Reproducible, ConSubtitulos, Descargable {
  readonly titulo: string;
  private minutos: number;

  constructor(titulo: string, minutos: number) {
    this.titulo = titulo;
    this.minutos = minutos;
  }

  reproducir(): string {
    return `▶ Proyectando "${this.titulo}"`;
  }
  duracionMinutos(): number {
    return this.minutos;
  }
  subtitulos(idioma: string): string {
    return `Subtítulos de "${this.titulo}" en ${idioma}`;
  }
  descargar(): string {
    return `${this.titulo}.mp4 descargado`;
  }
}

// ============================ ADAPTER =======================================
// 📌 [ADAPTER - ADAPTEE] Radio vieja por streaming: otra interfaz, no se puede modificar
class RadioStreamLegacy {
  private frecuencia = 0;
  tune(freq: number): void {
    this.frecuencia = freq;
  }
  getStationName(): string {
    return this.frecuencia === 100.7 ? "Radio Universidad" : `FM ${this.frecuencia}`;
  }
}

// 📌 [ADAPTER] La radio se usa como un Reproducible más (solo eso: no es descargable ni tiene subtítulos)
class RadioAdapter implements Reproducible {
  private radio: RadioStreamLegacy;
  readonly titulo: string;

  constructor(radio: RadioStreamLegacy, frecuencia: number) {
    this.radio = radio;
    this.radio.tune(frecuencia);
    this.titulo = this.radio.getStationName();
  }

  reproducir(): string {
    return `📻 En vivo: ${this.radio.getStationName()}`;
  }

  // 📌 [ADAPTACIÓN DE SEMÁNTICA] Una radio en vivo no tiene duración: se informa 0
  duracionMinutos(): number {
    return 0;
  }
}

// ============================ FACTORY =======================================
type TipoContenido = "cancion" | "pelicula" | "radio";

// 📌 [FACTORY] Único lugar con los new; para "radio" devuelve un adapter
class FabricaContenido {
  static crear(tipo: TipoContenido, dato: string, numero: number): Reproducible {
    switch (tipo) {
      case "cancion":
        return new Cancion(dato, numero);
      case "pelicula":
        return new Pelicula(dato, numero);
      case "radio":
        return new RadioAdapter(new RadioStreamLegacy(), numero);
    }
  }
}

// ============================ CLIENTES ======================================
// 📌 [ISP ✓ CLIENTE MÍNIMO] La lista de reproducción solo necesita Reproducible
class ListaReproduccion {
  private items: Reproducible[];

  constructor() {
    this.items = [];
  }

  agregar(r: Reproducible): void {
    this.items.push(r);
  }

  reproducirTodo(): string[] {
    return this.items.map((i) => i.reproducir());
  }

  get duracionTotal(): number {
    return this.items.reduce((acc, i) => acc + i.duracionMinutos(), 0);
  }
}

// 📌 [ISP ✓] Solo acepta lo descargable: pasar la radio no compila
function descargarTodo(items: Descargable[]): string[] {
  return items.map((i) => i.descargar());
}

// Bloque de prueba
const lista = new ListaReproduccion();
const tema = FabricaContenido.crear("cancion", "Zamba de mi esperanza", 4);
const peli = new Pelicula("Relatos salvajes", 122); // necesitamos el tipo concreto para pedir subtítulos
lista.agregar(tema);
lista.agregar(peli);
lista.agregar(FabricaContenido.crear("radio", "", 100.7));
for (const linea of lista.reproducirTodo()) console.log(linea);
console.log(`Duración total: ${lista.duracionTotal} min`);
console.log(peli.subtitulos("español"));
console.log(descargarTodo([new Cancion("Libertango", 3), peli]));
// descargarTodo([FabricaContenido.crear("radio", "", 99.9)]); ❌ no compila: un Reproducible no es Descargable
