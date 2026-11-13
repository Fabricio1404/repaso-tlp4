import type { CambioEstadoEvento } from '../domain/tipos';
import type { IObserver } from './IObserver';
import type { ISubject } from './ISubject';

// 📌 [OBSERVER - SUBJECT CONCRETO] Implementado a mano (prohibido EventEmitter). No sabe quiénes son los observers
export class EventPublisher implements ISubject {
  private observers: IObserver[];

  constructor() {
    this.observers = [];
  }

  attach(observer: IObserver): void {
    this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  // 📌 [NOTIFY ASÍNCRONO] await en cada observer: el servicio que publicó espera a que todos terminen
  async notify(evento: CambioEstadoEvento): Promise<void> {
    for (const observer of this.observers) {
      await observer.update(evento);
    }
  }
}
