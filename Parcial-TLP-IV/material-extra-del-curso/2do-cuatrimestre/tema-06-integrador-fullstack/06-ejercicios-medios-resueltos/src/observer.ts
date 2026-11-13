import type { CambioEstadoEvento } from './tipos';

// 📌 [OBSERVER - CONTRATOS]
export interface IObserver {
  update(evento: CambioEstadoEvento): Promise<void>;
}

export interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(evento: CambioEstadoEvento): Promise<void>;
}

// 📌 [OBSERVER - SUBJECT A MANO] Sin EventEmitter
export class EventPublisher implements ISubject {
  private observers: IObserver[] = [];

  attach(observer: IObserver): void {
    if (!this.observers.includes(observer)) this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  // 📌 [AWAIT EN ORDEN] Espera a cada observer antes de seguir con el siguiente
  async notify(evento: CambioEstadoEvento): Promise<void> {
    for (const o of this.observers) {
      await o.update(evento);
    }
  }
}
