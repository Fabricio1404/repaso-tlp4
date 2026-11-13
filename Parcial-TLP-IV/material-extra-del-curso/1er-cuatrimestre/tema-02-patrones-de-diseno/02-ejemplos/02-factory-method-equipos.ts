// ============================================================================
// EJEMPLO 2 · FACTORY METHOD (EquipoFactory) — tomado de la guía
// Parte A: la versión de la materia ("fábrica simple"): un método con switch.
// Parte B: la versión "de libro" (GoF): las SUBCLASES del creador deciden qué crear.
// ============================================================================

// 📌 [FACTORY ① PRODUCTO / TIPO COMÚN] Lo que la fábrica devuelve. Quien usa la fábrica solo conoce esto
abstract class EquipoBase {
  protected nombre: string;
  protected ram: string;
  protected procesador: string;

  constructor(nombre: string, ram: string, procesador: string) {
    this.nombre = nombre;
    this.ram = ram;
    this.procesador = procesador;
  }

  abstract detalles(): string;
}

// 📌 [FACTORY ② PRODUCTOS CONCRETOS] Cada clase concreta implementa el tipo común
class Notebook extends EquipoBase {
  detalles(): string {
    return `Tipo: Notebook, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
  }
}

class Desktop extends EquipoBase {
  detalles(): string {
    return `Tipo: Desktop, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
  }
}

class Servidor extends EquipoBase {
  detalles(): string {
    return `Tipo: Servidor, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
  }
}

// 📌 [UNIÓN DE LITERALES] Reemplaza al enum: un tipo mal escrito ("Notbook") no compila
type TipoEquipo = "Notebook" | "Desktop" | "Servidor";

// -------------------------- PARTE A: fábrica simple --------------------------
class EquipoFactory {
  // 📌 [FACTORY ③ MÉTODO CREADOR] Recibe el tipo y devuelve el TIPO COMÚN (EquipoBase), nunca la clase concreta
  crearEquipo(tipo: TipoEquipo, nombre: string, ram: string, procesador: string): EquipoBase {
    switch (tipo) {
      // 📌 [FACTORY ④ LOS NEW VIVEN SOLO ACÁ] Si aparece un tipo nuevo, se agrega una clase y un case
      case "Notebook":
        return new Notebook(nombre, ram, procesador);
      case "Desktop":
        return new Desktop(nombre, ram, procesador);
      case "Servidor":
        return new Servidor(nombre, ram, procesador);
    }
  }
}

// ---------------------- PARTE B: Factory Method de libro ---------------------
// 📌 [FACTORY METHOD GOF] El CREADOR es abstracto: declara el método fábrica y lo usa, pero no sabe qué crea
abstract class ProveedorDeEquipos {
  // 📌 [MÉTODO FÁBRICA ABSTRACTO] Cada subclase decide QUÉ producto concreto crear
  protected abstract crear(nombre: string): EquipoBase;

  // 📌 [LÓGICA COMÚN QUE USA EL MÉTODO FÁBRICA] El creador trabaja con el producto sin conocer su clase
  entregar(nombre: string): string {
    const equipo = this.crear(nombre);
    return `Entregado → ${equipo.detalles()}`;
  }
}

class ProveedorOficina extends ProveedorDeEquipos {
  protected crear(nombre: string): EquipoBase {
    return new Desktop(nombre, "8GB", "i5");
  }
}

class ProveedorDataCenter extends ProveedorDeEquipos {
  protected crear(nombre: string): EquipoBase {
    return new Servidor(nombre, "128GB", "Xeon");
  }
}

// Bloque de prueba
const factory = new EquipoFactory();
// 📌 [CLIENTE] Solo conoce EquipoBase: no hace new de ninguna clase concreta
const equipos: EquipoBase[] = [
  factory.crearEquipo("Notebook", "Dell XPS", "16GB", "i7"),
  factory.crearEquipo("Servidor", "PowerEdge", "64GB", "Xeon"),
];
for (const e of equipos) {
  console.log(e.detalles());
}
// Tipo: Notebook, Nombre: Dell XPS, RAM: 16GB, Procesador: i7
// Tipo: Servidor, Nombre: PowerEdge, RAM: 64GB, Procesador: Xeon

const proveedores: ProveedorDeEquipos[] = [new ProveedorOficina(), new ProveedorDataCenter()];
for (const p of proveedores) {
  console.log(p.entregar("Equipo-01"));
}
// Entregado → Tipo: Desktop, Nombre: Equipo-01, RAM: 8GB, Procesador: i5
// Entregado → Tipo: Servidor, Nombre: Equipo-01, RAM: 128GB, Procesador: Xeon

// factory.crearEquipo("Tablet", "x", "y", "z");  ❌ "Tablet" no es asignable a TipoEquipo
