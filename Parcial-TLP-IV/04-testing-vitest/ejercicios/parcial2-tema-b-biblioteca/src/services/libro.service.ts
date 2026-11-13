import { EjemplaresInsuficientesError, NoEncontradoError, ValidacionError } from '../errors';
import type { Libro, NuevoLibro } from '../models/libro';
import type { LibroRepository } from '../repositories/libro.repository';
import { calcularMulta } from './multas';
import { validarNuevoLibro } from './validaciones';

export class LibroService {
  constructor(private readonly repo: LibroRepository) {}

  listar(): Libro[] {
    return this.repo.listar();
  }

  buscar(id: number): Libro | undefined {
    return this.repo.buscarPorId(id);
  }

  obtener(id: number): Libro {
    const libro = this.repo.buscarPorId(id);
    if (!libro) {
      throw new NoEncontradoError('Libro no encontrado');
    }
    return libro;
  }

  registrar(datos: NuevoLibro): Libro {
    validarNuevoLibro(datos);
    return this.repo.guardar({ ...datos, titulo: datos.titulo.trim(), autor: datos.autor.trim() });
  }

  multa(diasDeRetraso: number): number {
    return calcularMulta(diasDeRetraso);
  }

  prestar(id: number, cantidad: number): Libro {
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new ValidacionError('La cantidad debe ser un número entero mayor a 0');
    }
    const libro = this.obtener(id);
    if (libro.ejemplares - cantidad <= 0) {
      throw new EjemplaresInsuficientesError(
        `Hay ${libro.ejemplares} ejemplares disponibles y se pidieron ${cantidad}`,
      );
    }
    const actualizado: Libro = { ...libro, ejemplares: libro.ejemplares - cantidad };
    this.repo.actualizar(actualizado);
    return actualizado;
  }
}
