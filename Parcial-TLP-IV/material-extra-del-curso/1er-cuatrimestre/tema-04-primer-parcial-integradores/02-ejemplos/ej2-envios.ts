// PRIMER PARCIAL · TEMA B · EJERCICIO 2 · Envíos
// (interfaces, Singleton, Factory Method)

class ConfiguracionEmpresa {
  // 📌 [SINGLETON ① ATRIBUTO STATIC] Guarda la única instancia
  private static instancia: ConfiguracionEmpresa | undefined;
  // 📌 [READONLY] Valor fijo de configuración que nadie puede reasignar
  readonly recargoExpress = 2500;

  // 📌 [SINGLETON ② CONSTRUCTOR PRIVATE] Nadie puede hacer new ConfiguracionEmpresa()
  private constructor() {}

  // 📌 [SINGLETON ③ ACCESO] Crea la instancia solo si todavía no existe
  static obtenerInstancia(): ConfiguracionEmpresa {
    if (ConfiguracionEmpresa.instancia === undefined) {
      ConfiguracionEmpresa.instancia = new ConfiguracionEmpresa();
    }
    return ConfiguracionEmpresa.instancia;
  }
}

// 📌 [INTERFACE / FACTORY - TIPO COMÚN] Lo que devuelve la fábrica
interface Envio {
  calcularCosto(base: number): number;
}

class EnvioEstandar implements Envio {
  calcularCosto(base: number): number {
    return base;
  }
}

class EnvioExpress implements Envio {
  calcularCosto(base: number): number {
    // 📌 [SINGLETON EN USO] No escribe 2500: lo pide al Singleton (un único lugar donde cambiarlo)
    const configuracion = ConfiguracionEmpresa.obtenerInstancia();
    return base + configuracion.recargoExpress;
  }
}

class FabricaEnvios {
  // 📌 [FACTORY ESTÁTICA] Devuelve la interfaz Envio; tipo con unión de literales (sin enum). Únicos new de los envíos
  static crear(tipo: "estandar" | "express"): Envio {
    if (tipo === "estandar") {
      return new EnvioEstandar();
    }
    return new EnvioExpress();
  }
}

// Bloque de prueba
const config1 = ConfiguracionEmpresa.obtenerInstancia();
const config2 = ConfiguracionEmpresa.obtenerInstancia();
console.log(`Mismo Singleton: ${config1 === config2}`);
console.log(`Estándar: $${FabricaEnvios.crear("estandar").calcularCosto(3000)}`);
console.log(`Express: $${FabricaEnvios.crear("express").calcularCosto(3000)}`);
// Salida:
// Mismo Singleton: true
// Estándar: $3000
// Express: $5500
