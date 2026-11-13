import { describe, expect, it, vi } from 'vitest';
import { ConflictoError } from '../src/errors';
import type { Turno } from '../src/models/turno';
import type { TurnoRepository } from '../src/repositories/turno.repository';
import type { Notificador } from '../src/services/notificador';
import { TurnoService } from '../src/services/turno.service';

function crearRepositorioFalso(turno?: Turno, ocupado?: Turno) {
  return {
    listar: vi.fn(() => (turno ? [turno] : [])),
    buscarPorId: vi.fn(() => (turno ? { ...turno } : undefined)),
    buscarReservado: vi.fn(() => ocupado),
    guardar: vi.fn((d: { paciente: string; fecha: string; hora: string }) => ({ id: 50, ...d, estado: 'reservado' as const })),
    actualizar: vi.fn(),
    eliminar: vi.fn(() => turno !== undefined),
  } satisfies TurnoRepository;
}

function crearNotificadorFalso() {
  return { enviar: vi.fn() } satisfies Notificador;
}

const reservado: Turno = { id: 7, paciente: 'Ana', fecha: '2026-03-10', hora: '09:00', estado: 'reservado' };
const cancelado: Turno = { ...reservado, id: 8, estado: 'cancelado' };

describe('TurnoService (unitaria con dobles)', () => {
  it('reservar guarda una vez con el paciente sin espacios', () => {
    const repo = crearRepositorioFalso();
    new TurnoService(repo, crearNotificadorFalso()).reservar({ paciente: '  Ana  ', fecha: '2026-03-10', hora: '10:00' });
    expect(repo.guardar).toHaveBeenCalledTimes(1);
    expect(repo.guardar).toHaveBeenCalledWith({ paciente: 'Ana', fecha: '2026-03-10', hora: '10:00' });
  });

  it('reservar notifica al paciente con el mensaje de R6', () => {
    const notificador = crearNotificadorFalso();
    new TurnoService(crearRepositorioFalso(), notificador).reservar({ paciente: 'Ana', fecha: '2026-03-10', hora: '10:00' });
    expect(notificador.enviar).toHaveBeenCalledWith('Ana', 'Turno reservado para el 2026-03-10 a las 10:00');
  });

  it('reservar en un horario ocupado lanza ConflictoError y NO guarda ni notifica', () => {
    // 📌 [STUB] buscarReservado devuelve un turno → el horario está ocupado
    const repo = crearRepositorioFalso(undefined, reservado);
    const notificador = crearNotificadorFalso();
    const servicio = new TurnoService(repo, notificador);

    expect(() => servicio.reservar({ paciente: 'Beto', fecha: '2026-03-10', hora: '09:00' })).toThrow(ConflictoError);
    expect(repo.guardar).not.toHaveBeenCalled();
    expect(notificador.enviar).not.toHaveBeenCalled();
  });

  it('cancelar un turno reservado llama a actualizar con estado "cancelado" y notifica', () => {
    const repo = crearRepositorioFalso(reservado);
    const notificador = crearNotificadorFalso();
    new TurnoService(repo, notificador).cancelar(7);

    expect(repo.actualizar).toHaveBeenCalledWith({ ...reservado, estado: 'cancelado' });
    expect(notificador.enviar).toHaveBeenCalledWith('Ana', 'Tu turno del 2026-03-10 a las 09:00 fue cancelado');
  });

  // 📌 [REVELÓ EL DEFECTO 4 A NIVEL UNITARIO]
  it('cancelar un turno ya cancelado lanza ConflictoError y NO actualiza ni notifica', () => {
    const repo = crearRepositorioFalso(cancelado);
    const notificador = crearNotificadorFalso();
    const servicio = new TurnoService(repo, notificador);

    expect(() => servicio.cancelar(8)).toThrow(ConflictoError);
    expect(repo.actualizar).not.toHaveBeenCalled();
    expect(notificador.enviar).not.toHaveBeenCalled();
  });
});
