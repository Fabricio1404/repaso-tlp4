import type { ISubject } from './observer';
import type { ILibroRepository } from './repos';
import type { EstadoLibro, Libro } from './tipos';

export class LibroNoEncontradoError extends Error {}

export class LibroService {
  private repo: ILibroRepository;
  private publisher: ISubject;

  constructor(repo: ILibroRepository, publisher: ISubject) {
    this.repo = repo;
    this.publisher = publisher;
  }

  // 📌 [PASO 1 DEL FLUJO] Guarda y avisa. Si el estado no cambia, no avisa
  async changeStatus(id: number, estadoNuevo: EstadoLibro): Promise<Libro> {
    const libro = await this.repo.findById(id);
    if (libro === undefined) throw new LibroNoEncontradoError(`No existe el libro ${id}`);
    if (libro.estado === estadoNuevo) return libro;
    await this.repo.updateEstado(id, estadoNuevo);
    await this.publisher.notify({ libroId: id, estadoAnterior: libro.estado, estadoNuevo });
    return { ...libro, estado: estadoNuevo };
  }
}
