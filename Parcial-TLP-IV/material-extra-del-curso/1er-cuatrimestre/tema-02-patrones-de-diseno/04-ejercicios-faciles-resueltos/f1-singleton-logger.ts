// RESOLUCIÓN F1 · Singleton Logger

class Logger {
  // 📌 [SINGLETON ① ATRIBUTO STATIC] La única instancia
  private static instancia: Logger | undefined;
  private registros: string[];

  // 📌 [SINGLETON ② CONSTRUCTOR PRIVATE]
  private constructor() {
    this.registros = [];
  }

  // 📌 [SINGLETON ③ ACCESO STATIC] Crea solo la primera vez
  static obtenerInstancia(): Logger {
    if (Logger.instancia === undefined) {
      Logger.instancia = new Logger();
    }
    return Logger.instancia;
  }

  registrar(mensaje: string): void {
    this.registros.push(`[${this.registros.length + 1}] ${mensaje}`);
  }

  get cantidad(): number {
    return this.registros.length;
  }

  obtenerRegistros(): string[] {
    return [...this.registros];
  }
}

// Bloque de prueba
function iniciarSesion(usuario: string): void {
  // 📌 [ACCESO GLOBAL] Cualquier parte del programa obtiene el mismo logger sin recibirlo por parámetro
  Logger.obtenerInstancia().registrar(`Inicio de sesión: ${usuario}`);
}

function cerrarSesion(usuario: string): void {
  Logger.obtenerInstancia().registrar(`Cierre de sesión: ${usuario}`);
}

iniciarSesion("ana");
cerrarSesion("ana");
const logger = Logger.obtenerInstancia();
console.log(logger.obtenerRegistros());
console.log(`Cantidad: ${logger.cantidad}`);
console.log(`Misma instancia: ${logger === Logger.obtenerInstancia()}`);
