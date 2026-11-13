import type { Notification } from '../domain/tipos';
import type { ServicioCorreoLegacy } from '../externos/ServicioCorreoLegacy';
import type { INotifier } from './INotifier';

// 📌 [MODIFICACIÓN A · ADAPTER] El servicio de correo recibe (para, asunto, cuerpo) y es sincrónico; INotifier recibe un Notification y devuelve Promise
export class EmailNotifierAdapter implements INotifier {
  private correo: ServicioCorreoLegacy;

  constructor(correo: ServicioCorreoLegacy) {
    this.correo = correo;
  }

  async send(n: Notification): Promise<void> {
    const resultado = this.correo.enviarCorreo(
      n.destinatario,
      `Cambio de estado del libro #${n.libroId}`,
      `${n.estadoAnterior} → ${n.estadoNuevo}`,
    );
    if (!resultado.ok) {
      console.error(`No se pudo enviar el correo a ${n.destinatario}`);
    }
  }
}
