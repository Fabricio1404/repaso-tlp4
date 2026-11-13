import type { INotificationRepository } from '../repositories/interfaces';
import { ConsoleNotifierAdapter } from './ConsoleNotifierAdapter';
import { InAppNotifier } from './InAppNotifier';
import type { Canal, INotifier } from './INotifier';

// 📌 [FACTORY] Único lugar con new de los canales. NotificationService pide por nombre y recibe un INotifier
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
