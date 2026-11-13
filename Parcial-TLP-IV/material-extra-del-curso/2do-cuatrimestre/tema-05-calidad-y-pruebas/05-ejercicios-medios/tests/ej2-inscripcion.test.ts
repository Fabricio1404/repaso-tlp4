import { describe, expect, it, vi } from 'vitest';
import type { Alumno, AlumnoRepository, Notificador } from '../src/inscripcion.service';
import { InscripcionService } from '../src/inscripcion.service';

// Dobles de prueba: usalos en lugar de implementaciones reales.
function crearRepositorioFalso(alumno: Alumno | undefined, yaInscripto = false) {
  return {
    buscarPorDni: vi.fn(() => alumno),
    existeInscripcion: vi.fn(() => yaInscripto),
    guardarInscripcion: vi.fn(),
  } satisfies AlumnoRepository;
}

function crearNotificadorFalso() {
  return { enviar: vi.fn() } satisfies Notificador;
}

const regular: Alumno = { dni: '30111222', nombre: 'Ana', notas: [5, 6] };
const promocionado: Alumno = { dni: '30333444', nombre: 'Beto', notas: [9, 9] };

describe('Ej. 2 - InscripcionService.inscribirAFinal', () => {
  // Ejemplo dado
  it('un alumno regular se inscribe y se devuelve la inscripción', () => {
    const servicio = new InscripcionService(crearRepositorioFalso(regular), crearNotificadorFalso());
    expect(servicio.inscribirAFinal('30111222', 'TLP IV')).toEqual({ dni: '30111222', materia: 'TLP IV' });
  });

  it.todo('un alumno regular: guarda la inscripción UNA vez y notifica con el mensaje correcto');
  it.todo('un alumno promocionado: lanza CondicionInvalidaError y NO guarda ni notifica');
  it.todo('un alumno inexistente: lanza NoEncontradoError');
  it.todo('una inscripción duplicada: lanza InscripcionDuplicadaError y NO guarda ni notifica');
});

