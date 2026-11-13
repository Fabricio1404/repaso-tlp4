// ============================================================================
// TRABAJO PRÁCTICO N° 1 · Sistema de Gestión de Torneo Deportivo (resolución de la guía)
// Las clases se EXPORTAN para poder probarlas con Vitest; el bloque de prueba está en demo.ts.
// ============================================================================

// 📌 [INTERFACE] Contrato mínimo: todo lo identificable tiene un id que no cambia
export interface IIdentificable {
  readonly id: string;
}

// 📌 [INTERFACE] Todo competidor tiene nombre y lista sus integrantes
export interface ICompetidor {
  nombre: string;
  listarIntegrantes(): string[];
}

export class Jugador implements IIdentificable {
  readonly id: string;
  nombre: string;
  edad: number;
  // 📌 [PROPIEDAD OPCIONAL] posicion puede no existir (string | undefined)
  posicion?: string;

  // 📌 [CONSTRUCTOR FORMA LARGA] El enunciado original usaba parameter properties: prohibidas
  constructor(id: string, nombre: string, edad: number, posicion?: string) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.posicion = posicion;
  }

  toString(): string {
    return `${this.nombre} (${this.posicion || "Sin posición"})`;
  }
}

export class Equipo implements ICompetidor {
  nombre: string;
  // 📌 [ENCAPSULAMIENTO] Lista privada: solo se agrega con agregarJugador (que valida duplicados)
  private jugadores: Jugador[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.jugadores = [];
  }

  agregarJugador(jugador: Jugador): void {
    // 📌 [SIN DUPLICADOS POR ID] Se recorre antes de agregar
    for (let i = 0; i < this.jugadores.length; i++) {
      if (this.jugadores[i].id === jugador.id) {
        throw new Error(`El jugador ${jugador.id} ya está en el equipo`);
      }
    }
    this.jugadores.push(jugador);
  }

  // 📌 [GETTER]
  get cantidad(): number {
    return this.jugadores.length;
  }

  listarIntegrantes(): string[] {
    return this.jugadores.map((j) => j.toString());
  }

  toString(): string {
    return `${this.nombre} (${this.cantidad} jugadores)`;
  }
}

// 📌 [CLASE ABSTRACTA vs INTERFACE] Molde parcial con estado (nombre, maxPorEquipo) y un método abstracto. No se instancia
export abstract class Deporte {
  nombre: string;
  // 📌 [PROTECTED] Las hijas lo leen en validar()
  protected maxPorEquipo: number;

  constructor(nombre: string, maxPorEquipo: number) {
    this.nombre = nombre;
    this.maxPorEquipo = maxPorEquipo;
  }

  // 📌 [MÉTODO ABSTRACTO] La validación de cantidad se DELEGA a cada deporte (polimorfismo)
  abstract validar(equipo: Equipo): boolean;
}

export class Futbol extends Deporte {
  constructor() {
    super("Fútbol", 11);
  }

  validar(equipo: Equipo): boolean {
    return equipo.cantidad <= this.maxPorEquipo;
  }
}

export class Basquet extends Deporte {
  constructor() {
    super("Básquet", 5);
  }

  validar(equipo: Equipo): boolean {
    return equipo.cantidad <= this.maxPorEquipo;
  }
}

export class Resultado {
  local: number;
  visitante: number;

  constructor(local: number, visitante: number) {
    this.local = local;
    this.visitante = visitante;
  }

  toString(): string {
    return `${this.local} - ${this.visitante}`;
  }
}

export class Partido implements IIdentificable {
  readonly id: string;
  local: Equipo;
  visitante: Equipo;
  deporte: Deporte;
  resultado?: Resultado;

  constructor(id: string, local: Equipo, visitante: Equipo, deporte: Deporte) {
    // 📌 [VALIDAR EN CONSTRUCTOR] Es imposible crear un partido inválido
    if (local === visitante || local.nombre === visitante.nombre) {
      throw new Error("Los equipos deben ser distintos");
    }
    // 📌 [POLIMORFISMO] Partido no sabe cuántos jugadores admite cada deporte: le pregunta a deporte.validar
    if (!deporte.validar(local) || !deporte.validar(visitante)) {
      throw new Error("Equipos no válidos para el deporte");
    }
    this.id = id;
    this.local = local;
    this.visitante = visitante;
    this.deporte = deporte;
  }

  jugar(): Resultado {
    const golesLocal = Math.floor(Math.random() * 5);
    const golesVisitante = Math.floor(Math.random() * 5);
    this.resultado = new Resultado(golesLocal, golesVisitante);
    return this.resultado;
  }

  toString(): string {
    const marcador = this.resultado ? this.resultado.toString() : "sin jugar";
    return `${this.local.nombre} vs ${this.visitante.nombre} (${this.deporte.nombre}): ${marcador}`;
  }
}

export class Torneo implements IIdentificable {
  readonly id: string;
  nombre: string;
  private partidos: Partido[];

  constructor(id: string, nombre: string) {
    this.id = id;
    this.nombre = nombre;
    this.partidos = [];
  }

  programarPartido(partido: Partido): void {
    if (this.buscarPartido(partido.id) !== undefined) {
      throw new Error(`Ya existe el partido ${partido.id}`);
    }
    this.partidos.push(partido);
  }

  // 📌 [COPIA DEFENSIVA]
  listarPartidos(): Partido[] {
    return [...this.partidos];
  }

  buscarPartido(id: string): Partido | undefined {
    for (let i = 0; i < this.partidos.length; i++) {
      if (this.partidos[i].id === id) {
        return this.partidos[i];
      }
    }
    return undefined;
  }
}

// 📌 [INTERFACE EN LUGAR DE ANY] El enunciado original recibía "config: any"
export interface ConfigTorneo {
  deporte: "Futbol" | "Basquet";
  jugadoresLocal: number;
  jugadoresVisitante: number;
}

export function crearEquipo(nombre: string, cantidad: number): Equipo {
  const equipo = new Equipo(nombre);
  for (let i = 1; i <= cantidad; i++) {
    equipo.agregarJugador(new Jugador(`${nombre}-${i}`, `Jugador ${i}`, 20));
  }
  return equipo;
}

export function gestionarTorneo(config: ConfigTorneo): string {
  try {
    const deporte: Deporte = config.deporte === "Futbol" ? new Futbol() : new Basquet();
    const local = crearEquipo("Local", config.jugadoresLocal);
    const visitante = crearEquipo("Visitante", config.jugadoresVisitante);
    const partido = new Partido("P1", local, visitante, deporte);
    const torneo = new Torneo("T1", "Copa");
    torneo.programarPartido(partido);
    return "OK";
  } catch (e) {
    // 📌 [CATCH SIN ANY] e es unknown: se pregunta instanceof Error
    if (e instanceof Error) {
      return e.message;
    }
    return "Error desconocido";
  }
}
