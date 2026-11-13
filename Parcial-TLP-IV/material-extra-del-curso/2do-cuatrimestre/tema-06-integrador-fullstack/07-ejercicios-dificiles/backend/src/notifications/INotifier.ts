import type { Notification } from '../domain/tipos';

export interface INotifier {
  send(notification: Notification): Promise<void>;
}

export type Canal = 'inapp' | 'console';
