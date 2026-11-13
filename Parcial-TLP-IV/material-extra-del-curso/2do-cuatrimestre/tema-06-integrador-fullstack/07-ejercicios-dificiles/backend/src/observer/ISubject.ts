import type { CambioEstadoEvento } from '../domain/tipos';
import type { IObserver } from './IObserver';

export interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(evento: CambioEstadoEvento): Promise<void>;
}
