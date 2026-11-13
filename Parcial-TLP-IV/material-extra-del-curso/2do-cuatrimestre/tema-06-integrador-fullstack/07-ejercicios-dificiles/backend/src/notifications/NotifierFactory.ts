import type { INotificationRepository } from '../repositories/interfaces';
import { ConsoleNotifierAdapter } from './ConsoleNotifierAdapter';
import { InAppNotifier } from './InAppNotifier';
import type { Canal, INotifier } from './INotifier';

export class NotifierFactory {
  private notificationRepository: INotificationRepository;

  constructor(notificationRepository: INotificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  create(canal: Canal): INotifier {
    if (canal === 'inapp') {
      return new InAppNotifier(this.notificationRepository);
    }
    return new ConsoleNotifierAdapter();
  }
}
