// ============================================================================
// EJEMPLO 1 · SINGLETON (clase Inventario) — tomado de la guía
// Consigna: una clase Inventario Singleton que registre equipos con nombre, tipo y
// estado, con agregarEquipo, listarEquipos y una interfaz Equipo para tipar los datos.
// ============================================================================

// 📌 [INTERFACE PARA DATOS] Tipa los objetos que guarda el inventario
interface Equipo {
  nombre: string;
  tipo: string;
  estado: string;
}

class Inventario {
  // 📌 [SINGLETON ① ATRIBUTO STATIC] Guarda LA única instancia. static = pertenece a la clase; private = nadie la reemplaza; | undefined = al principio no existe
  private static instancia: Inventario | undefined;
  private equipos: Equipo[];

  // 📌 [SINGLETON ② CONSTRUCTOR PRIVATE] Nadie de afuera puede hacer new Inventario()
  private constructor() {
    this.equipos = [];
  }

  // 📌 [SINGLETON ③ MÉTODO STATIC DE ACCESO] Única puerta de entrada: crea la instancia solo la primera vez (lazy) y después devuelve siempre la misma
  static obtenerInstancia(): Inventario {
    if (Inventario.instancia === undefined) {
      Inventario.instancia = new Inventario();
    }
    return Inventario.instancia;
  }

  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.equipos.push({ nombre: nombre, tipo: tipo, estado: estado });
  }

  // 📌 [COPIA DEFENSIVA] El Singleton también protege su estado
  listarEquipos(): Equipo[] {
    return [...this.equipos];
  }
}

// 📌 [SINGLETON CON CONFIGURACIÓN] Variante del primer parcial: un valor fijo que se lee desde un único lugar
class ConfiguracionEmpresa {
  private static instancia: ConfiguracionEmpresa | undefined;
  // 📌 [READONLY] Valor de configuración que nadie puede reasignar
  readonly recargoExpress = 2500;
  readonly moneda = "ARS";

  // 📌 [CONSTRUCTOR PRIVATE VACÍO] No hay nada que inicializar, pero igual tiene que ser private
  private constructor() {}

  static obtenerInstancia(): ConfiguracionEmpresa {
    if (ConfiguracionEmpresa.instancia === undefined) {
      ConfiguracionEmpresa.instancia = new ConfiguracionEmpresa();
    }
    return ConfiguracionEmpresa.instancia;
  }
}

// Bloque de prueba
const inventario = Inventario.obtenerInstancia();
inventario.agregarEquipo("Notebook HP", "Portátil", "disponible");

// 📌 [MISMA INSTANCIA] Otra parte del programa pide el inventario y recibe EL MISMO objeto (ve el equipo agregado antes)
const otraReferencia = Inventario.obtenerInstancia();
otraReferencia.agregarEquipo("Servidor Dell", "Servidor", "en reparación");
console.log(inventario.listarEquipos());
console.log(Inventario.obtenerInstancia() === inventario); // true

const config = ConfiguracionEmpresa.obtenerInstancia();
console.log(`Recargo: ${config.recargoExpress} ${config.moneda}`); // Recargo: 2500 ARS
console.log(config === ConfiguracionEmpresa.obtenerInstancia()); // true

// new Inventario();             ❌ Constructor of class 'Inventario' is private
// config.recargoExpress = 0;    ❌ Cannot assign to 'recargoExpress' because it is a read-only property
