import type { Canal, NotifierFactory } from './notifications';
import type { IObserver } from './observer';
import type { ISubscriptionRepository } from './repos';
import type { CambioEstadoEvento } from './tipos';

// M1 · TODO: observer concreto
export class NotificationService implements IObserver {
  constructor(subs: ISubscriptionRepository, factory: NotifierFactory, canales: Canal[] = ['inapp', 'console']) {}

  async update(evento: CambioEstadoEvento): Promise<void> {
    throw new Error('TODO');
  }
}
