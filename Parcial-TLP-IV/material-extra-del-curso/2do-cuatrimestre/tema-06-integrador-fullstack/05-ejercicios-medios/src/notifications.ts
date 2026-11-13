import type { INotificationRepository } from './repos';
import type { Notification } from './tipos';

export type Canal = 'inapp' | 'console';

// M1 · Contrato (DADO)
export interface INotifier {
  send(n: Notification): Promise<void>;
}

// M1 · TODO: InAppNotifier (guarda en el repositorio que recibe por constructor)
export class InAppNotifier implements INotifier {
  constructor(repo: INotificationRepository) {}
  async send(n: Notification): Promise<void> {
    throw new Error('TODO');
  }
}

// M1 · TODO: ConsoleNotifierAdapter (adapta console.log)
export class ConsoleNotifierAdapter implements INotifier {
  async send(n: Notification): Promise<void> {
    throw new Error('TODO');
  }
}

// M1 · TODO: NotifierFactory
export class NotifierFactory {
  constructor(repo: INotificationRepository) {}
  create(canal: Canal): INotifier {
    throw new Error('TODO');
  }
}
