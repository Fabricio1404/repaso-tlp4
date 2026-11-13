import type { CambioEstadoEvento } from '../domain/tipos';

// 📌 [OBSERVER - INTERFAZ OBSERVER] async: los observers pueden acceder a la base
export interface IObserver {
  update(evento: CambioEstadoEvento): Promise<void>;
}
