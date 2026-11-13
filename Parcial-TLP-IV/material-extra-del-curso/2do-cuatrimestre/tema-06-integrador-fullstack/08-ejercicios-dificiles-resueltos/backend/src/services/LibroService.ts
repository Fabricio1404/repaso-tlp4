import { ConflictoError, NoEncontradoError, ValidacionError } from '../domain/errores';
import { type DatosLibro, ESTADOS_LIBRO, type EstadoLibro, type Libro } from '../domain/tipos';
import type { ISubject } from '../observer/ISubject';
import type { ILibroRepository } from '../repositories/interfaces';

export class LibroService {
  private libros: ILibroRepository;
  private publisher: ISubject;

  constructor(libros: ILibroRepository, publisher: ISubject) {
    this.libros = libros;
    this.publisher = publisher;
  }

  listar(): Promise<Libro[]> {
    return this.libros.findAll();
  }

  async obtener(id: number): Promise<Libro> {
    const libro = await this.libros.findById(id);
    if (libro === undefined) throw new NoEncontradoError('Libro no encontrado');
    return libro;
  }

  crear(datos: DatosLibro): Promise<Libro> {
    return this.libros.create(LibroService.validar(datos));
  }

  async actualizar(id: number, datos: DatosLibro): Promise<Libro> {
    const libro = await this.libros.update(id, LibroService.validar(datos));
    if (libro === undefined) throw new NoEncontradoError('Libro no encontrado');
    return libro;
  }

  async changeStatus(id: number, estadoNuevo: EstadoLibro): Promise<Libro> {
    if (!ESTADOS_LIBRO.includes(estadoNuevo)) {
      throw new ValidacionError(`Estado inválido. Válidos: ${ESTADOS_LIBRO.join(', ')}`);
    }
    const libro = await this.obtener(id);
    if (libro.estado === estadoNuevo) {
      return libro;
    }
    await this.libros.updateEstado(id, estadoNuevo);
    await this.publisher.notify({ libroId: id, estadoAnterior: libro.estado, estadoNuevo });
    return { ...libro, estado: estadoNuevo };
  }

  async eliminar(id: number): Promise<void> {
    const libro = await this.obtener(id);
    // 📌 [MODIFICACIÓN C · REGLA DE NEGOCIO EN EL SERVICE] No en el controller ni en el repositorio
    if (libro.estado === 'PRESTADO') throw new ConflictoError('No se puede eliminar un libro prestado');
    await this.libros.delete(id);
  }

  // 📌 [MODIFICACIÓN B · LÓGICA EN EL SERVICE] Arma el CSV; el controller solo pone la cabecera
  async exportarCsv(): Promise<string> {
    const filas = (await this.libros.findAll()).map((l) => [l.id, l.titulo, l.autor, l.estado].join(','));
    return ['id,titulo,autor,estado', ...filas].join('\n');
  }

  private static validar(datos: DatosLibro): DatosLibro {
    const titulo = typeof datos?.titulo === 'string' ? datos.titulo.trim() : '';
    const autor = typeof datos?.autor === 'string' ? datos.autor.trim() : '';
    if (titulo === '' || autor === '') throw new ValidacionError('El título y el autor son obligatorios');
    return { titulo, autor };
  }
}
