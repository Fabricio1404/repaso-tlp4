import type { CambioEstadoEvento, NotificacionGuardada, Notification } from '../domain/tipos';
import { NoEncontradoError } from '../domain/errores';
import type { Canal } from '../notifications/INotifier';
import type { NotifierFactory } from '../notifications/NotifierFactory';
import type { IObserver } from '../observer/IObserver';
import type { INotificationRepository, ISubscriptionRepository } from '../repositories/interfaces';

// 📌 [OBSERVER CONCRETO] Reacciona al cambio de estado consultando las SUSCRIPCIONES (datos) y usando la FÁBRICA de canales
export class NotificationService implements IObserver {
  private subscriptions: ISubscriptionRepository;
  private notifications: INotificationRepository;
  private factory: NotifierFactory;
  // 📌 [OCP] Para sumar un canal: una clase INotifier + un caso en la fábrica + agregarlo acá
  private readonly canales: Canal[] = ['inapp', 'console'];

  constructor(subscriptions: ISubscriptionRepository, notifications: INotificationRepository, factory: NotifierFactory) {
    this.subscriptions = subscriptions;
    this.notifications = notifications;
    this.factory = factory;
  }

  async update(evento: CambioEstadoEvento): Promise<void> {
    const emails = await this.subscriptions.findEmailsByLibro(evento.libroId);
    for (const email of emails) {
      const notification: Notification = {
        destinatario: email,
        libroId: evento.libroId,
        estadoAnterior: evento.estadoAnterior,
        estadoNuevo: evento.estadoNuevo,
      };
      for (const canal of this.canales) {
        // 📌 [SIN NEW NI CONSOLE.LOG] Solo conoce INotifier y la fábrica
        await this.factory.create(canal).send(notification);
      }
    }
  }

  // Lectura de las notificaciones in-app del usuario (RF5, frontend)
  listar(email: string): Promise<NotificacionGuardada[]> {
    return this.notifications.findByDestinatario(email);
  }

  async marcarLeida(id: number, email: string): Promise<void> {
    if (!(await this.notifications.markAsRead(id, email))) {
      throw new NoEncontradoError('Notificación no encontrada');
    }
  }
}
