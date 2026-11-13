import type { Notification } from '../domain/tipos';
import type { INotificationRepository } from '../repositories/interfaces';
import type { INotifier } from './INotifier';

export class InAppNotifier implements INotifier {
  private repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  async send(notification: Notification): Promise<void> {
    await this.repository.save(notification);
  }
}
