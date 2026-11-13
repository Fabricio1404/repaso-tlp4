import type { Notification } from '../domain/tipos';

// 📌 [FACTORY - TIPO COMÚN / ADAPTER - TARGET] Todo canal de notificación cumple este contrato
export interface INotifier {
  send(notification: Notification): Promise<void>;
}

export type Canal = 'inapp' | 'console';
