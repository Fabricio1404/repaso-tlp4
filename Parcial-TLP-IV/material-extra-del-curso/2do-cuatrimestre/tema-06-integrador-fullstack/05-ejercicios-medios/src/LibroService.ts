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

  // M1 · TODO
  async changeStatus(id: number, estadoNuevo: EstadoLibro): Promise<Libro> {
    throw new Error('TODO');
  }
}
