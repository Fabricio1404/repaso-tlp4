// Simulacro primer parcial · Tema D · Ejercicio 2 · Vacunas (Singleton + Factory Method) — SOLUCIÓN

interface Vacuna {
  nombre(): string;
  precio(): number;
}

// Singleton: configuración de precios única para toda la veterinaria
class Tarifario {
  private static instancia: Tarifario | null = null;
  private recargoDomicilio: number;

  private constructor() {
    this.recargoDomicilio = 5000;
  }

  static obtenerInstancia(): Tarifario {
    if (Tarifario.instancia === null) {
      Tarifario.instancia = new Tarifario();
    }
    return Tarifario.instancia;
  }

  obtenerRecargoDomicilio(): number {
    return this.recargoDomicilio;
  }
}

class VacunaAntirrabica implements Vacuna {
  nombre(): string { return "Antirrábica"; }
  precio(): number { return 9000; }
}

class VacunaQuintuple implements Vacuna {
  nombre(): string { return "Quíntuple"; }
  precio(): number { return 14000; }
}

class VacunaTriple implements Vacuna {
  nombre(): string { return "Triple felina"; }
  precio(): number { return 11000; }
}

type TipoVacuna = "antirrabica" | "quintuple" | "triple";

// Factory: nadie más hace new de las vacunas concretas
class FabricaVacunas {
  static crear(tipo: TipoVacuna): Vacuna {
    switch (tipo) {
      case "antirrabica": return new VacunaAntirrabica();
      case "quintuple": return new VacunaQuintuple();
      case "triple": return new VacunaTriple();
    }
  }
}

function presupuesto(tipos: TipoVacuna[], aDomicilio: boolean): number {
  let total = 0;
  for (const t of tipos) {
    const v = FabricaVacunas.crear(t);
    console.log(`- ${v.nombre()}: $${v.precio()}`);
    total += v.precio();
  }
  if (aDomicilio) {
    total += Tarifario.obtenerInstancia().obtenerRecargoDomicilio();   // leído del Singleton
  }
  return total;
}

// ---------------- Bloque de prueba ----------------
console.log("Presupuesto para Firulais:");
console.log(`Total: $${presupuesto(["antirrabica", "quintuple"], true)}`);
console.log("Presupuesto para Michi:");
console.log(`Total: $${presupuesto(["triple"], false)}`);
console.log(`¿Mismo tarifario? ${Tarifario.obtenerInstancia() === Tarifario.obtenerInstancia()}`);
