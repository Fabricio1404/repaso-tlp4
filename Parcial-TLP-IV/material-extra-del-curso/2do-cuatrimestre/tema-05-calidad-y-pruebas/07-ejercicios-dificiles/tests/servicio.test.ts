import { describe, expect, it, vi } from 'vitest';
import type { Turno } from '../src/models/turno';
import type { TurnoRepository } from '../src/repositories/turno.repository';
import type { Notificador } from '../src/services/notificador';
import { TurnoService } from '../src/services/turno.service';

// Dobles de prueba
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

describe('TurnoService (unitaria con dobles)', () => {
  // Ejemplo dado
  it('reservar guarda una vez con el paciente sin espacios', () => {
    const repo = crearRepositorioFalso();
    new TurnoService(repo, crearNotificadorFalso()).reservar({ paciente: '  Ana  ', fecha: '2026-03-10', hora: '10:00' });
    expect(repo.guardar).toHaveBeenCalledTimes(1);
    expect(repo.guardar).toHaveBeenCalledWith({ paciente: 'Ana', fecha: '2026-03-10', hora: '10:00' });
  });

  it.todo('reservar notifica al paciente con el mensaje de R6');
  it.todo('reservar en un horario ocupado lanza ConflictoError y NO guarda ni notifica');
  it.todo('cancelar un turno reservado llama a actualizar con estado "cancelado" y notifica');
  it.todo('cancelar un turno ya cancelado lanza ConflictoError y NO actualiza ni notifica');
});

