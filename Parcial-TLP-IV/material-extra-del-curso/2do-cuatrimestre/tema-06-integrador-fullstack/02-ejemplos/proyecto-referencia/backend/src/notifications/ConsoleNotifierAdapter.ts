import type { Notification } from '../domain/tipos';
import type { INotifier } from './INotifier';

// 📌 [ADAPTER] console.log recibe TEXTO y no devuelve promesa; INotifier recibe un objeto Notification y devuelve Promise<void>
export class ConsoleNotifierAdapter implements INotifier {
  async send(n: Notification): Promise<void> {
    // 📌 [TRADUCCIÓN] Objeto → línea de texto
    console.log(
      `[NOTIFICACIÓN] Para: ${n.destinatario} | Libro #${n.libroId} | Estado: ${n.estadoAnterior} → ${n.estadoNuevo}`,
    );
  }
}
