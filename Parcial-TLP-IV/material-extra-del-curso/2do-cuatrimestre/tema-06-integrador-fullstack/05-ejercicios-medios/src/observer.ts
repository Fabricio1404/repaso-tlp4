import type { CambioEstadoEvento } from './tipos';

// M1 · Contratos (DADOS)
export interface IObserver {
  update(evento: CambioEstadoEvento): Promise<void>;
}

export interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(evento: CambioEstadoEvento): Promise<void>;
}

// M1 · TODO: implementá el Subject a mano (prohibido EventEmitter)
export class EventPublisher implements ISubject {
  attach(observer: IObserver): void {
    throw new Error('TODO');
  }
  detach(observer: IObserver): void {
    throw new Error('TODO');
  }
  async notify(evento: CambioEstadoEvento): Promise<void> {
    throw new Error('TODO');
  }
}
