import { ConflictoError, NoEncontradoError } from '../errors';
import type { NuevoTurno, Turno } from '../models/turno';
import type { TurnoRepository } from '../repositories/turno.repository';
import type { Notificador } from './notificador';
import { validarNuevoTurno } from './validaciones';

export class TurnoService {
  private readonly repo: TurnoRepository;
  private readonly notificador: Notificador;

  constructor(repo: TurnoRepository, notificador: Notificador) {
    this.repo = repo;
    this.notificador = notificador;
  }

  listar(): Turno[] {
    return this.repo.listar();
  }

  buscar(id: number): Turno | undefined {
    return this.repo.buscarPorId(id);
  }

  obtener(id: number): Turno {
    const t = this.repo.buscarPorId(id);
    if (t === undefined) {
      throw new NoEncontradoError('Turno no encontrado');
    }
    return t;
  }

  reservar(datos: NuevoTurno): Turno {
    validarNuevoTurno(datos);
    if (this.repo.buscarReservado(datos.fecha, datos.hora) !== undefined) {
      throw new ConflictoError(`El horario ${datos.fecha} ${datos.hora} ya está ocupado`);
    }
    const turno = this.repo.guardar({ ...datos, paciente: datos.paciente.trim() });
    this.notificador.enviar(turno.paciente, `Turno reservado para el ${turno.fecha} a las ${turno.hora}`);
    return turno;
  }

  cancelar(id: number): Turno {
    const t = this.obtener(id);
    // 📌 [DEFECTO 4 CORREGIDO - R5] Faltaba controlar que ya estuviera cancelado (antes de actualizar y notificar)
    if (t.estado === 'cancelado') {
      throw new ConflictoError('El turno ya estaba cancelado');
    }
    const cancelado: Turno = { ...t, estado: 'cancelado' };
    this.repo.actualizar(cancelado);
    this.notificador.enviar(t.paciente, `Tu turno del ${t.fecha} a las ${t.hora} fue cancelado`);
    return cancelado;
  }

  // 📌 [TDD - R8] Escrito DESPUÉS de los tests (que primero fallaron: rojo)
  eliminar(id: number): void {
    if (!this.repo.eliminar(id)) {
      throw new NoEncontradoError('Turno no encontrado');
    }
  }
}
