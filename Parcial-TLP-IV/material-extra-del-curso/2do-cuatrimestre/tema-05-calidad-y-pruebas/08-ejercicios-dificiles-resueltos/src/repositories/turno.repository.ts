import type { NuevoTurno, Turno } from '../models/turno';

export interface TurnoRepository {
  listar(): Turno[];
  buscarPorId(id: number): Turno | undefined;
  buscarReservado(fecha: string, hora: string): Turno | undefined;
  guardar(datos: NuevoTurno): Turno;
  actualizar(turno: Turno): void;
  eliminar(id: number): boolean;
}

export class TurnoRepositoryEnMemoria implements TurnoRepository {
  private turnos: Turno[];
  private proximoId: number;

  constructor(iniciales: Turno[] = []) {
    this.turnos = iniciales.map((t) => ({ ...t }));
    this.proximoId = Math.max(0, ...this.turnos.map((t) => t.id)) + 1;
  }

  listar(): Turno[] {
    return this.turnos.map((t) => ({ ...t }));
  }

  buscarPorId(id: number): Turno | undefined {
    const t = this.turnos.find((x) => x.id === id);
    return t ? { ...t } : undefined;
  }

  buscarReservado(fecha: string, hora: string): Turno | undefined {
    const t = this.turnos.find((x) => x.fecha === fecha && x.hora === hora && x.estado === 'reservado');
    return t ? { ...t } : undefined;
  }

  guardar(datos: NuevoTurno): Turno {
    const nuevo: Turno = { id: this.proximoId++, ...datos, estado: 'reservado' };
    this.turnos.push(nuevo);
    return { ...nuevo };
  }

  actualizar(turno: Turno): void {
    const i = this.turnos.findIndex((t) => t.id === turno.id);
    if (i !== -1) this.turnos[i] = { ...turno };
  }

  eliminar(id: number): boolean {
    const antes = this.turnos.length;
    this.turnos = this.turnos.filter((t) => t.id !== id);
    return this.turnos.length < antes;
  }
}
