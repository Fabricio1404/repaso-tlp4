// RESOLUCIÓN D · Torneo en vivo: Factory de deportes + Observer de resultados + tabla
import { Basquet, type Deporte, type Equipo, Futbol, Partido, Resultado } from "../02-ejemplos/torneo.ts";
import { Voley } from "../04-ejercicios-faciles-resueltos/deportes-nuevos.ts";
import { TablaPosiciones } from "../06-ejercicios-medios-resueltos/tabla.ts";

export type TipoDeporte = "futbol" | "basquet" | "voley";

// 📌 [FACTORY] Único lugar con new de los deportes; devuelve el tipo común Deporte
export class FabricaDeportes {
  static crear(tipo: TipoDeporte): Deporte {
    switch (tipo) {
      case "futbol":
        return new Futbol();
      case "basquet":
        return new Basquet();
      case "voley":
        return new Voley();
    }
  }
}

export interface EventoResultado {
  readonly partidoId: string;
  readonly local: string;
  readonly visitante: string;
  readonly resultado: string;
}

// 📌 [OBSERVER - INTERFAZ]
export interface ObservadorTorneo {
  resultadoCargado(evento: EventoResultado, partido: Partido): void;
}

// 📌 [OBSERVER - SUJETO]
export class TorneoEnVivo {
  readonly nombre: string;
  private readonly deporte: Deporte;
  private partidos: Partido[];
  private observadores: ObservadorTorneo[];

  constructor(nombre: string, tipo: TipoDeporte) {
    this.nombre = nombre;
    this.deporte = FabricaDeportes.crear(tipo);
    this.partidos = [];
    this.observadores = [];
  }

  suscribir(o: ObservadorTorneo): void {
    this.observadores.push(o);
  }

  programar(id: string, local: Equipo, visitante: Equipo): Partido {
    if (this.partidos.some((p) => p.id === id)) {
      throw new Error(`Ya existe el partido ${id}`);
    }
    // 📌 [POLIMORFISMO] Partido valida con el deporte que fabricó la Factory
    const partido = new Partido(id, local, visitante, this.deporte);
    this.partidos.push(partido);
    return partido;
  }

  cargarResultado(id: string, golesLocal: number, golesVisitante: number): void {
    const partido = this.partidos.find((p) => p.id === id);
    if (partido === undefined) throw new Error(`No existe el partido ${id}`);
    if (partido.resultado !== undefined) throw new Error(`El partido ${id} ya tiene resultado`);
    for (const g of [golesLocal, golesVisitante]) {
      if (!Number.isInteger(g) || g < 0) throw new RangeError("Los goles deben ser enteros mayores o iguales a 0");
    }
    partido.resultado = new Resultado(golesLocal, golesVisitante);
    const evento: EventoResultado = {
      partidoId: id,
      local: partido.local.nombre,
      visitante: partido.visitante.nombre,
      resultado: partido.resultado.toString(),
    };
    // 📌 [OBSERVER - NOTIFICAR] Después de guardar el resultado
    for (const o of this.observadores) o.resultadoCargado(evento, partido);
  }
}

// 📌 [OBSERVADOR CONCRETO] Mantiene la tabla actualizada (reutiliza TablaPosiciones)
export class TablaObservador implements ObservadorTorneo {
  readonly tabla = new TablaPosiciones();
  resultadoCargado(_e: EventoResultado, partido: Partido): void {
    this.tabla.registrar(partido);
  }
}

// 📌 [OBSERVADOR CONCRETO] Arma titulares (no imprime: los guarda, así se puede testear)
export class Prensa implements ObservadorTorneo {
  readonly titulares: string[] = [];
  resultadoCargado(e: EventoResultado): void {
    this.titulares.push(`${e.local} ${e.resultado} ${e.visitante}`);
  }
}
