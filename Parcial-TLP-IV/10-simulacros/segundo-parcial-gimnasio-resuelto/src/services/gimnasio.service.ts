import { CuposInsuficientesError, NoEncontradoError, ValidacionError } from '../errors';
import type { Clase, NuevoSocio, Socio } from '../models/clase';
import type { ClaseRepository } from '../repositories/clase.repository';
import { calcularCuota } from './cuotas';
import { validarNuevoSocio } from './validaciones';

export class GimnasioService {
  private socios: Socio[] = [];

  constructor(private readonly repo: ClaseRepository) {}

  listarClases(): Clase[] {
    return this.repo.listar();
  }

  obtenerClase(id: number): Clase {
    const clase = this.repo.buscarPorId(id);
    if (!clase) {
      throw new NoEncontradoError('Clase no encontrada');
    }
    return clase;
  }

  cuota(anios: number): number {
    return calcularCuota(anios);
  }

  registrarSocio(datos: NuevoSocio): Socio {
    validarNuevoSocio(datos);
    const socio: Socio = { id: this.socios.length + 1, ...datos, nombre: datos.nombre.trim() };
    this.socios.push(socio);
    return { ...socio };
  }

  reservar(id: number, cantidad: number): Clase {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new ValidacionError('La cantidad debe ser un número entero mayor a 0');
    }
    const clase = this.obtenerClase(id);
    if (cantidad > clase.cupos) {
      throw new CuposInsuficientesError(`Hay ${clase.cupos} cupos disponibles y se pidieron ${cantidad}`);
    }
    const actualizada: Clase = { ...clase, cupos: clase.cupos - cantidad };
    this.repo.actualizar(actualizada);
    return actualizada;
  }
}
