import type { Notification } from '../domain/tipos';

export interface INotifier {
  send(notification: Notification): Promise<void>;
}

// 📌 [MODIFICACIÓN A] Se agrega el literal del canal nuevo
export type Canal = 'inapp' | 'console' | 'email';
