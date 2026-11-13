import type { Notification } from '../domain/tipos';
import type { INotifier } from './INotifier';

export class ConsoleNotifierAdapter implements INotifier {
  async send(n: Notification): Promise<void> {
    console.log(
      `[NOTIFICACIÓN] Para: ${n.destinatario} | Libro #${n.libroId} | Estado: ${n.estadoAnterior} → ${n.estadoNuevo}`,
    );
  }
}
