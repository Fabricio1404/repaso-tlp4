import type { INotificationRepository } from '../repositories/interfaces';
import { ServicioCorreoLegacy } from '../externos/ServicioCorreoLegacy';
import { ConsoleNotifierAdapter } from './ConsoleNotifierAdapter';
import { EmailNotifierAdapter } from './EmailNotifierAdapter';
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
    // 📌 [MODIFICACIÓN A · FACTORY] Un caso nuevo; nadie más hace new del adapter
    if (canal === 'email') {
      return new EmailNotifierAdapter(new ServicioCorreoLegacy());
    }
    return new ConsoleNotifierAdapter();
  }
}
