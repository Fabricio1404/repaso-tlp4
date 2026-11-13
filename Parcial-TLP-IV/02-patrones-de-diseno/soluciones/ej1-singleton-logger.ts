// Ejercicio 1 · Singleton: Logger de la aplicación

type Nivel = "INFO" | "ERROR";

class Logger {
  // 1️⃣ Atributo estático y privado que guarda la ÚNICA instancia
  private static instancia: Logger | null = null;

  private registros: string[];

  // 2️⃣ Constructor privado: nadie de afuera puede hacer new Logger()
  private constructor() {
    this.registros = [];
  }

  // 3️⃣ Método estático que devuelve siempre la misma instancia (la crea la primera vez)
  static obtenerInstancia(): Logger {
    if (Logger.instancia === null) {
      Logger.instancia = new Logger();
    }
    return Logger.instancia;
  }

  registrar(nivel: Nivel, mensaje: string): void {
    this.registros.push(`[${nivel}] ${mensaje}`);
  }

  get cantidad(): number {
    return this.registros.length;
  }

  obtenerRegistros(): string[] {
    return [...this.registros];   // copia defensiva
  }
}

// Dos "módulos" distintos del programa que usan el logger sin pasárselo
function moduloVentas(): void {
  Logger.obtenerInstancia().registrar("INFO", "Venta registrada");
}

function moduloStock(): void {
  Logger.obtenerInstancia().registrar("ERROR", "Stock insuficiente");
}

// ---------------- Bloque de prueba ----------------
moduloVentas();
moduloStock();

const a = Logger.obtenerInstancia();
const b = Logger.obtenerInstancia();
console.log(`¿Es la misma instancia? ${a === b}`);
console.log(`Registros: ${a.cantidad}`);
for (const r of b.obtenerRegistros()) {
  console.log(r);
}
// new Logger();   // ❌ si lo descomentás, npx tsc da error: el constructor es privado
