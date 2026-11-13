import type { CambioEstadoEvento } from '../domain/tipos';
import type { IObserver } from './IObserver';
import type { ISubject } from './ISubject';

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

  async notify(evento: CambioEstadoEvento): Promise<void> {
    for (const observer of this.observers) {
      await observer.update(evento);
    }
  }
}
