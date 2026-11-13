import type { Canal, NotifierFactory } from './notifications';
import type { IObserver } from './observer';
import type { ISubscriptionRepository } from './repos';
import type { CambioEstadoEvento, Notification } from './tipos';

// 📌 [OBSERVER CONCRETO] Consulta las suscripciones (datos) y usa la fábrica; sin new ni console.log
export class NotificationService implements IObserver {
  private subs: ISubscriptionRepository;
  private factory: NotifierFactory;
  private canales: Canal[];

  constructor(subs: ISubscriptionRepository, factory: NotifierFactory, canales: Canal[] = ['inapp', 'console']) {
    this.subs = subs;
    this.factory = factory;
    this.canales = canales;
  }

  async update(evento: CambioEstadoEvento): Promise<void> {
    const emails = await this.subs.findEmailsByLibro(evento.libroId);
    for (const email of emails) {
      const n: Notification = { destinatario: email, ...evento };
      for (const canal of this.canales) {
        await this.factory.create(canal).send(n);
      }
    }
  }
}
