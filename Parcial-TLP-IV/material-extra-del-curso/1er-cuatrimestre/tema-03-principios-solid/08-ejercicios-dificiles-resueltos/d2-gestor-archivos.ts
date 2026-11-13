// RESOLUCIÓN D2 · Gestor de archivos — los 5 principios

// ============================== ISP ==========================================
// 📌 [ISP ✓ INTERFACES CHICAS] ISP: el disco local no está obligado a versionar
interface Almacenamiento {
  subir(nombre: string, datos: string): void;
  bajar(nombre: string): string;
  borrar(nombre: string): void;
}

interface Versionable {
  listarVersiones(nombre: string): string[];
}

class NubeS3 implements Almacenamiento, Versionable {
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

// 📌 [ISP ✓ SIN THROW] Implementa solo lo que puede hacer
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
}

// ============================== LSP ==========================================
// 📌 [LSP ✓ BASE = LO QUE TODOS CUMPLEN] Todo archivo se puede leer
interface Legible {
  readonly nombre: string;
  leer(): string;
}

// 📌 [LSP ✓ CAPACIDAD APARTE] LSP: solo los archivos que se pueden escribir prometen escribir()
interface Editable extends Legible {
  escribir(texto: string): void;
}

class Archivo implements Editable {
  readonly nombre: string;
  private contenido: string;
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

// 📌 [LSP ✓ SIN HERENCIA QUE ROMPE] Ya no extiende Archivo ni tiene un escribir() que lance error
class ArchivoSoloLectura implements Legible {
  readonly nombre: string;
  private readonly contenido: string;
  constructor(nombre: string, contenido: string) {
    this.nombre = nombre;
    this.contenido = contenido;
  }
  leer(): string {
    return this.contenido;
  }
}

// ============================== OCP ==========================================
// 📌 [OCP ✓ ABSTRACCIÓN] OCP: formatos nuevos sin modificar GestorArchivos
interface Formato {
  readonly extension: string;
  convertir(contenido: string): string;
}

class FormatoTexto implements Formato {
  readonly extension = "texto";
  convertir(contenido: string): string {
    return contenido;
  }
}

class FormatoBase64 implements Formato {
  readonly extension = "base64";
  convertir(contenido: string): string {
    return btoa(contenido);
  }
}

class FormatoMayusculas implements Formato {
  readonly extension = "mayusculas";
  convertir(contenido: string): string {
    return contenido.toUpperCase();
  }
}

// ============================== DIP ==========================================
// 📌 [DIP ✓ ABSTRACCIÓN] DIP: el gestor no conoce console.log
interface Registro {
  escribir(linea: string): void;
}

class RegistroConsola implements Registro {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

// ============================== SRP ==========================================
// 📌 [SRP ✓ REGLA DE TAMAÑO] Cambia solo si cambia el límite
class ValidadorTamano {
  private maximo: number;
  constructor(maximo: number) {
    this.maximo = maximo;
  }
  validar(nombre: string, datos: string): void {
    if (datos.length > this.maximo) {
      throw new Error(`${nombre} supera el tamaño máximo`);
    }
  }
}

// 📌 [SRP ✓ COORDINADOR + DIP ✓ INYECCIÓN] Convierte (delegando), valida (delegando), sube (delegando) y loguea (delegando)
class GestorArchivos {
  private almacenamiento: Almacenamiento;
  private validador: ValidadorTamano;
  private registro: Registro;

  constructor(almacenamiento: Almacenamiento, validador: ValidadorTamano, registro: Registro) {
    this.almacenamiento = almacenamiento;
    this.validador = validador;
    this.registro = registro;
  }

  publicar(archivo: Legible, formato: Formato): void {
    const datos = formato.convertir(archivo.leer());
    this.validador.validar(archivo.nombre, datos);
    this.almacenamiento.subir(`${archivo.nombre}.${formato.extension}`, datos);
    this.registro.escribir(`publicado ${archivo.nombre} como ${formato.extension}`);
  }

  // 📌 [LSP ✓ TIPO PRECISO] Solo recibe archivos editables: ya no hace falta try/catch
  normalizarTodos(archivos: Editable[]): void {
    for (const a of archivos) {
      a.escribir(a.leer().trim());
    }
  }
}

// Bloque de prueba
const nube = new NubeS3();
const gestor = new GestorArchivos(nube, new ValidadorTamano(40), new RegistroConsola());
const notas = new Archivo("notas", "  hola mundo  ");
const licencia = new ArchivoSoloLectura("licencia", "MIT");
gestor.normalizarTodos([notas]);
gestor.publicar(notas, new FormatoTexto());
gestor.publicar(notas, new FormatoBase64());
gestor.publicar(licencia, new FormatoMayusculas());
try {
  gestor.publicar(new Archivo("largo", "x".repeat(50)), new FormatoTexto());
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
const disco = new DiscoLocal();
disco.subir("backup", "datos");
console.log(nube.listarVersiones("notas"));
// gestor.normalizarTodos([licencia]); ❌ no compila (LSP)
// disco.listarVersiones("backup");    ❌ no compila (ISP)
// gestor.publicar(notas, "pdf");      ❌ no compila (OCP: un formato es una clase)
