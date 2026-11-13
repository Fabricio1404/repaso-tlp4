// ======================= DADO: repositorios en memoria =======================
import type { EstadoLibro, Libro, Notification } from './tipos';

export interface ILibroRepository {
  findById(id: number): Promise<Libro | undefined>;
  updateEstado(id: number, estado: EstadoLibro): Promise<void>;
}

export interface ISubscriptionRepository {
  findEmailsByLibro(libroId: number): Promise<string[]>;
}

export interface INotificationRepository {
  save(n: Notification): Promise<void>;
}

export class LibroMemoria implements ILibroRepository {
  private libros: Libro[];
  constructor(libros: Libro[]) {
    this.libros = libros.map((l) => ({ ...l }));
  }
  async findById(id: number): Promise<Libro | undefined> {
    const l = this.libros.find((x) => x.id === id);
    return l ? { ...l } : undefined;
  }
  async updateEstado(id: number, estado: EstadoLibro): Promise<void> {
    const l = this.libros.find((x) => x.id === id);
    if (l) l.estado = estado;
  }
}

export class SubscriptionMemoria implements ISubscriptionRepository {
  private subs: { email: string; libroId: number }[];
  constructor(subs: { email: string; libroId: number }[]) {
    this.subs = subs;
  }
  async findEmailsByLibro(libroId: number): Promise<string[]> {
    return this.subs.filter((s) => s.libroId === libroId).map((s) => s.email);
  }
}

export class NotificationMemoria implements INotificationRepository {
  readonly guardadas: Notification[] = [];
  async save(n: Notification): Promise<void> {
    this.guardadas.push(n);
  }
}
