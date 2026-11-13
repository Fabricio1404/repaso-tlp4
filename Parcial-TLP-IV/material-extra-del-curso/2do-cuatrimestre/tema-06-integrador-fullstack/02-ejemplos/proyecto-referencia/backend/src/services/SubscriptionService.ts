import { ConflictoError, NoEncontradoError } from '../domain/errores';
import type { ILibroRepository, ISubscriptionRepository } from '../repositories/interfaces';

// 📌 [SUSCRIPCIONES = DATOS] Guardan qué usuario sigue qué libro (RF4). No son observers
export class SubscriptionService {
  private subscriptions: ISubscriptionRepository;
  private libros: ILibroRepository;

  constructor(subscriptions: ISubscriptionRepository, libros: ILibroRepository) {
    this.subscriptions = subscriptions;
    this.libros = libros;
  }

  async suscribir(userId: number, libroId: number): Promise<void> {
    if ((await this.libros.findById(libroId)) === undefined) throw new NoEncontradoError('Libro no encontrado');
    if (await this.subscriptions.exists(userId, libroId)) throw new ConflictoError('Ya estás suscripto a este libro');
    await this.subscriptions.subscribe(userId, libroId);
  }

  async desuscribir(userId: number, libroId: number): Promise<void> {
    if (!(await this.subscriptions.unsubscribe(userId, libroId))) {
      throw new NoEncontradoError('No estabas suscripto a este libro');
    }
  }
}
