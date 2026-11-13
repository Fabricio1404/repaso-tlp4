// EJERCICIO D2 · Gestor de archivos — los 5 principios — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona, pero viola los cinco principios SOLID.

class NubeS3 {
  private guardados: string[] = [];
  subir(nombre: string, datos: string): void {
    this.guardados.push(nombre);
    console.log(`[S3] subido ${nombre} (${datos.length} bytes)`);
  }
  bajar(nombre: string): string {
    return `contenido de ${nombre}`;
  }
  borrar(nombre: string): void {
    this.guardados = this.guardados.filter((n) => n !== nombre);
    console.log(`[S3] borrado ${nombre}`);
  }
  listarVersiones(nombre: string): string[] {
    return [`${nombre}@v1`, `${nombre}@v2`];
  }
}

interface Almacenamiento {
  subir(nombre: string, datos: string): void;
  bajar(nombre: string): string;
  borrar(nombre: string): void;
  listarVersiones(nombre: string): string[];
}

class DiscoLocal implements Almacenamiento {
  subir(nombre: string, datos: string): void {
    console.log(`[DISCO] guardado ${nombre} (${datos.length} bytes)`);
  }
  bajar(nombre: string): string {
    return `contenido de ${nombre}`;
  }
  borrar(nombre: string): void {
    console.log(`[DISCO] borrado ${nombre}`);
  }
  listarVersiones(_nombre: string): string[] {
    throw new Error("El disco local no guarda versiones");
  }
}

class Archivo {
  readonly nombre: string;
  protected contenido: string;
  constructor(nombre: string, contenido: string) {
    this.nombre = nombre;
    this.contenido = contenido;
  }
  leer(): string {
    return this.contenido;
  }
  escribir(texto: string): void {
    this.contenido = texto;
  }
}

class ArchivoSoloLectura extends Archivo {
  override escribir(_texto: string): void {
    throw new Error(`${this.nombre} es de solo lectura`);
  }
}

class GestorArchivos {
  private nube = new NubeS3();

  publicar(archivo: Archivo, formato: string): void {
    let datos = "";
    if (formato === "texto") {
      datos = archivo.leer();
    } else if (formato === "base64") {
      datos = btoa(archivo.leer());
    } else if (formato === "mayusculas") {
      datos = archivo.leer().toUpperCase();
    } else {
      throw new Error(`Formato desconocido: ${formato}`);
    }
    if (datos.length > 40) {
      throw new Error(`${archivo.nombre} supera el tamaño máximo`);
    }
    this.nube.subir(`${archivo.nombre}.${formato}`, datos);
    console.log(`[LOG] publicado ${archivo.nombre} como ${formato}`);
  }

  normalizarTodos(archivos: Archivo[]): void {
    for (const a of archivos) {
      try {
        a.escribir(a.leer().trim());
      } catch (e) {
        if (e instanceof Error) console.log(`ERROR: ${e.message}`);
      }
    }
  }
}

// Bloque de prueba
const gestor = new GestorArchivos();
const notas = new Archivo("notas", "  hola mundo  ");
const licencia = new ArchivoSoloLectura("licencia", "MIT");
gestor.normalizarTodos([notas, licencia]);
gestor.publicar(notas, "texto");
gestor.publicar(notas, "base64");
gestor.publicar(licencia, "mayusculas");
for (const f of ["pdf", "texto"]) {
  try {
    gestor.publicar(new Archivo("largo", "x".repeat(50)), f);
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
}
const disco = new DiscoLocal();
disco.subir("backup", "datos");
try {
  console.log(disco.listarVersiones("backup"));
} catch (e) {
  if (e instanceof Error) console.log(`ERROR: ${e.message}`);
}
console.log(new NubeS3().listarVersiones("notas"));
