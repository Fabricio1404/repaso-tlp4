import type { INotificationRepository } from './repos';
import type { Notification } from './tipos';

export type Canal = 'inapp' | 'console';

// 📌 [FACTORY - TIPO COMÚN / ADAPTER - TARGET]
export interface INotifier {
  send(n: Notification): Promise<void>;
}

export class InAppNotifier implements INotifier {
  private repo: INotificationRepository;
  constructor(repo: INotificationRepository) {
    this.repo = repo;
  }
  async send(n: Notification): Promise<void> {
    await this.repo.save(n);
  }
}

// 📌 [ADAPTER] Objeto Notification → línea de texto para console.log
export class ConsoleNotifierAdapter implements INotifier {
  async send(n: Notification): Promise<void> {
    console.log(`[NOTIFICACIÓN] Para: ${n.destinatario} | Libro #${n.libroId} | Estado: ${n.estadoAnterior} → ${n.estadoNuevo}`);
  }
}

// 📌 [FACTORY] Único lugar con los new de los canales
export class NotifierFactory {
  private repo: INotificationRepository;
  constructor(repo: INotificationRepository) {
    this.repo = repo;
  }
  create(canal: Canal): INotifier {
    if (canal === 'inapp') return new InAppNotifier(this.repo);
    return new ConsoleNotifierAdapter();
  }
}
