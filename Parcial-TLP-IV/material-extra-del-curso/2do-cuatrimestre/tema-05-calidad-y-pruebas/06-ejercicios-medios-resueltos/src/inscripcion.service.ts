import { CondicionInvalidaError, InscripcionDuplicadaError, NoEncontradoError } from './errors';
import { calcularCondicion } from './condicion';

export interface Alumno {
  dni: string;
  nombre: string;
  notas: [number, number];
  recuperatorio?: number;
}

export interface Inscripcion {
  dni: string;
  materia: string;
}

// Puertos: el servicio depende de estas interfaces
export interface AlumnoRepository {
  buscarPorDni(dni: string): Alumno | undefined;
  existeInscripcion(dni: string, materia: string): boolean;
  guardarInscripcion(inscripcion: Inscripcion): void;
}

export interface Notificador {
  enviar(dni: string, mensaje: string): void;
}

export class InscripcionService {
  private readonly repo: AlumnoRepository;
  private readonly notificador: Notificador;

  constructor(repo: AlumnoRepository, notificador: Notificador) {
    this.repo = repo;
    this.notificador = notificador;
  }

  /** Reglas: R6 a R9. */
  inscribirAFinal(dni: string, materia: string): Inscripcion {
    const alumno = this.repo.buscarPorDni(dni);
    if (alumno === undefined) {
      throw new NoEncontradoError(`No existe el alumno ${dni}`);
    }
    const condicion = calcularCondicion(alumno.notas[0], alumno.notas[1], alumno.recuperatorio);
    if (condicion !== 'regular') {
      throw new CondicionInvalidaError(`${alumno.nombre} está ${condicion} y no puede rendir final`);
    }
    // 📌 [DEFECTO CORREGIDO - R8] Faltaba controlar la inscripción duplicada ANTES de guardar
    if (this.repo.existeInscripcion(dni, materia)) {
      throw new InscripcionDuplicadaError(`${alumno.nombre} ya está inscripto a ${materia}`);
    }
    const inscripcion: Inscripcion = { dni: dni, materia: materia };
    this.repo.guardarInscripcion(inscripcion);
    this.notificador.enviar(dni, `Inscripto al final de ${materia}`);
    return inscripcion;
  }
}
