export interface Notificador {
  enviar(paciente: string, mensaje: string): void;
}

// Implementación por defecto: guarda los mensajes (no imprime nada durante los tests)
export class NotificadorMemoria implements Notificador {
  readonly enviados: string[] = [];
  enviar(paciente: string, mensaje: string): void {
    this.enviados.push(`${paciente}: ${mensaje}`);
  }
}
