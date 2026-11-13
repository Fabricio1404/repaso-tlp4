import type { CambioEstadoEvento } from '../domain/tipos';

export interface IObserver {
  update(evento: CambioEstadoEvento): Promise<void>;
}
