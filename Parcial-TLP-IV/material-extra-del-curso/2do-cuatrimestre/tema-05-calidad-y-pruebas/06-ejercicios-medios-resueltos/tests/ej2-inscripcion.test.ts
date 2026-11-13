import { describe, expect, it, vi } from 'vitest';
import { CondicionInvalidaError, InscripcionDuplicadaError, NoEncontradoError } from '../src/errors';
import type { Alumno, AlumnoRepository, Notificador } from '../src/inscripcion.service';
import { InscripcionService } from '../src/inscripcion.service';

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
  it('un alumno regular se inscribe y se devuelve la inscripción', () => {
    const servicio = new InscripcionService(crearRepositorioFalso(regular), crearNotificadorFalso());
    expect(servicio.inscribirAFinal('30111222', 'TLP IV')).toEqual({ dni: '30111222', materia: 'TLP IV' });
  });

  it('un alumno regular: guarda la inscripción UNA vez y notifica con el mensaje correcto', () => {
    const repo = crearRepositorioFalso(regular);
    const notificador = crearNotificadorFalso();
    new InscripcionService(repo, notificador).inscribirAFinal('30111222', 'TLP IV');

    // 📌 [SPY] Verifica la colaboración: guardar una vez y con qué datos
    expect(repo.guardarInscripcion).toHaveBeenCalledTimes(1);
    expect(repo.guardarInscripcion).toHaveBeenCalledWith({ dni: '30111222', materia: 'TLP IV' });
    expect(notificador.enviar).toHaveBeenCalledWith('30111222', 'Inscripto al final de TLP IV');
  });

  it('un alumno promocionado: lanza CondicionInvalidaError y NO guarda ni notifica', () => {
    const repo = crearRepositorioFalso(promocionado);
    const notificador = crearNotificadorFalso();
    const servicio = new InscripcionService(repo, notificador);

    expect(() => servicio.inscribirAFinal('30333444', 'TLP IV')).toThrow(CondicionInvalidaError);
    // 📌 [NOT.TOHAVEBEENCALLED] R9: si no es válida, no se guarda ni se notifica
    expect(repo.guardarInscripcion).not.toHaveBeenCalled();
    expect(notificador.enviar).not.toHaveBeenCalled();
  });

  it('un alumno inexistente: lanza NoEncontradoError', () => {
    const servicio = new InscripcionService(crearRepositorioFalso(undefined), crearNotificadorFalso());
    expect(() => servicio.inscribirAFinal('99999999', 'TLP IV')).toThrow(NoEncontradoError);
  });

  // 📌 [TEST QUE REVELÓ EL DEFECTO] Antes de la corrección, este test fallaba: el servicio guardaba y notificaba igual
  it('una inscripción duplicada: lanza InscripcionDuplicadaError y NO guarda ni notifica', () => {
    const repo = crearRepositorioFalso(regular, true);
    const notificador = crearNotificadorFalso();
    const servicio = new InscripcionService(repo, notificador);

    expect(() => servicio.inscribirAFinal('30111222', 'TLP IV')).toThrow(InscripcionDuplicadaError);
    expect(repo.existeInscripcion).toHaveBeenCalledWith('30111222', 'TLP IV');
    expect(repo.guardarInscripcion).not.toHaveBeenCalled();
    expect(notificador.enviar).not.toHaveBeenCalled();
  });
});
