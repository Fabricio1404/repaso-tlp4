import { afterEach, describe, expect, it, vi } from 'vitest';
import { LibroService } from '../src/LibroService';
import { ConsoleNotifierAdapter, InAppNotifier, NotifierFactory } from '../src/notifications';
import { NotificationService } from '../src/NotificationService';
import { EventPublisher, type IObserver } from '../src/observer';
import { LibroMemoria, NotificationMemoria, SubscriptionMemoria } from '../src/repos';

function armar() {
  const notifs = new NotificationMemoria();
  const subs = new SubscriptionMemoria([
    { email: 'ana@tp.com', libroId: 1 },
    { email: 'beto@tp.com', libroId: 1 },
    { email: 'caro@tp.com', libroId: 2 },
  ]);
  const publisher = new EventPublisher();
  const servicioNotif = new NotificationService(subs, new NotifierFactory(notifs));
  publisher.attach(servicioNotif);
  const libros = new LibroService(new LibroMemoria([{ id: 1, titulo: 'Rayuela', estado: 'DISPONIBLE' }, { id: 2, titulo: 'Ficciones', estado: 'DISPONIBLE' }]), publisher);
  return { notifs, publisher, servicioNotif, libros };
}

describe('M1 · flujo Observer + Factory + Adapter', () => {
  afterEach(() => vi.restoreAllMocks());

  it('EventPublisher avisa a cada observer en orden y permite desuscribir', async () => {
    const publisher = new EventPublisher();
    const llamadas: string[] = [];
    const a: IObserver = { update: async () => void llamadas.push('a') };
    const b: IObserver = { update: async () => void llamadas.push('b') };
    publisher.attach(a);
    publisher.attach(b);
    publisher.attach(a); // repetido: no se duplica
    await publisher.notify({ libroId: 1, estadoAnterior: 'DISPONIBLE', estadoNuevo: 'PRESTADO' });
    publisher.detach(a);
    await publisher.notify({ libroId: 1, estadoAnterior: 'PRESTADO', estadoNuevo: 'DISPONIBLE' });
    expect(llamadas).toEqual(['a', 'b', 'b']);
  });

  it('la fábrica devuelve el canal correcto', () => {
    const f = new NotifierFactory(new NotificationMemoria());
    expect(f.create('inapp')).toBeInstanceOf(InAppNotifier);
    expect(f.create('console')).toBeInstanceOf(ConsoleNotifierAdapter);
  });

  it('el adapter imprime la línea con el formato exacto', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    await new ConsoleNotifierAdapter().send({ destinatario: 'ana@tp.com', libroId: 1, estadoAnterior: 'DISPONIBLE', estadoNuevo: 'PRESTADO' });
    expect(log).toHaveBeenCalledWith('[NOTIFICACIÓN] Para: ana@tp.com | Libro #1 | Estado: DISPONIBLE → PRESTADO');
  });

  it('cambiar el estado notifica a cada suscriptor por los dos canales', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { notifs, libros } = armar();
    await libros.changeStatus(1, 'PRESTADO');
    expect(notifs.guardadas.map((n) => n.destinatario)).toEqual(['ana@tp.com', 'beto@tp.com']);
    expect(log).toHaveBeenCalledTimes(2);
    expect(log).toHaveBeenLastCalledWith('[NOTIFICACIÓN] Para: beto@tp.com | Libro #1 | Estado: DISPONIBLE → PRESTADO');
  });

  it('si el estado no cambia, no se notifica a nadie', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { notifs, libros } = armar();
    await libros.changeStatus(1, 'DISPONIBLE');
    expect(notifs.guardadas).toHaveLength(0);
    expect(log).not.toHaveBeenCalled();
  });

  it('NotificationService usa la fábrica (no hace new de los canales)', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const factory = new NotifierFactory(new NotificationMemoria());
    const crear = vi.spyOn(factory, 'create');
    const servicio = new NotificationService(new SubscriptionMemoria([{ email: 'x@tp.com', libroId: 9 }]), factory);
    await servicio.update({ libroId: 9, estadoAnterior: 'DISPONIBLE', estadoNuevo: 'EN_REPARACION' });
    expect(crear.mock.calls).toEqual([['inapp'], ['console']]);
  });
});
