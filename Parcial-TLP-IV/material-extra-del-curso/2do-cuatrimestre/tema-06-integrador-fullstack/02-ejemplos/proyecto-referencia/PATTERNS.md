# PATTERNS.md · Patrones de diseño y principios SOLID

Para cada patrón y principio: (1) ruta completa, (2) qué problema resuelve en este proyecto y (3) un fragmento breve.

---

## Singleton · `backend/src/database/DatabaseConnection.ts`
**Problema:** toda la aplicación necesita **una sola** conexión (pool) a PostgreSQL. Si cada repositorio creara su propio `Sequelize`, habría varias conexiones abiertas y configuración duplicada. El constructor privado impide crear una segunda instancia; la única entrada es `getInstance()`.
```ts
private static instance: DatabaseConnection | undefined;
private constructor() { this.sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, { host: env.DB_HOST, dialect: 'postgres' }); }
static getInstance(): DatabaseConnection {
  if (DatabaseConnection.instance === undefined) DatabaseConnection.instance = new DatabaseConnection();
  return DatabaseConnection.instance;
}
```

## Observer · `backend/src/observer/ISubject.ts`, `backend/src/observer/IObserver.ts`, `backend/src/observer/EventPublisher.ts` y `backend/src/services/NotificationService.ts`
**Problema:** cuando cambia el estado de un libro, hay que notificar a los suscriptores, pero `LibroService` **no debe saber** quién reacciona. `LibroService` solo conoce `ISubject`; `NotificationService` se registra como observer en el cableado. Implementado a mano (sin `EventEmitter`).
```ts
// LibroService.changeStatus
await this.libros.updateEstado(id, estadoNuevo);
await this.publisher.notify({ libroId: id, estadoAnterior: libro.estado, estadoNuevo });
// EventPublisher
async notify(evento: CambioEstadoEvento): Promise<void> { for (const o of this.observers) await o.update(evento); }
```
> Observer ≠ suscripción: el observer es un objeto del backend; la suscripción es un dato guardado (usuario ↔ libro) que `NotificationService` consulta.

## Factory · `backend/src/notifications/NotifierFactory.ts`, `backend/src/notifications/INotifier.ts`
**Problema:** `NotificationService` necesita enviar por varios canales sin hacer `new` de cada uno ni conocer sus clases. La fábrica es el único lugar con esos `new` y devuelve el tipo común `INotifier`.
```ts
create(canal: Canal): INotifier {
  if (canal === 'inapp') return new InAppNotifier(this.notificationRepository);
  return new ConsoleNotifierAdapter();
}
```

## Adapter · `backend/src/notifications/ConsoleNotifierAdapter.ts`
**Problema:** `console.log` recibe **texto** y no devuelve promesa; el sistema espera un `INotifier` que recibe un objeto `Notification` y devuelve `Promise<void>`. El adapter traduce el objeto a una línea de texto.
```ts
export class ConsoleNotifierAdapter implements INotifier {
  async send(n: Notification): Promise<void> {
    console.log(`[NOTIFICACIÓN] Para: ${n.destinatario} | Libro #${n.libroId} | Estado: ${n.estadoAnterior} → ${n.estadoNuevo}`);
  }
}
```

---

## S · Responsabilidad única · `backend/src/routes/`, `backend/src/controllers/`, `backend/src/services/`, `backend/src/repositories/`
**Problema:** mezclar HTTP, reglas de negocio y acceso a datos haría que cualquier cambio toque todo. Cada capa tiene un solo motivo para cambiar: los controllers traducen HTTP, los services tienen la lógica (no reciben `req`/`res`) y los repositories son el único acceso a la base.
```ts
// LibroController: solo HTTP
cambiarEstado = async (req, res) => { res.json(await this.service.changeStatus(Number(req.params.id), req.body?.estado)); };
```

## O · Abierto/cerrado · `backend/src/services/NotificationService.ts` + `backend/src/notifications/`
**Problema:** agregar un canal (por ejemplo, email) no debe obligar a reescribir la lógica de notificación: se crea una clase que implementa `INotifier`, se agrega un caso en la fábrica y el nombre a la lista de canales.
```ts
private readonly canales: Canal[] = ['inapp', 'console'];
for (const canal of this.canales) await this.factory.create(canal).send(notification);
```

## L · Sustitución de Liskov · `backend/src/notifications/InAppNotifier.ts`, `ConsoleNotifierAdapter.ts` y `backend/src/repositories/memory/` vs `sequelize/`
**Problema:** el flujo tiene que funcionar con cualquier implementación del contrato. Cualquier `INotifier` reemplaza a otro, y los repositorios en memoria reemplazan a los de Sequelize (así corren la demo y los tests) sin cambiar los servicios.
```ts
const notifier: INotifier = factory.create(canal);   // InAppNotifier o ConsoleNotifierAdapter: el servicio no distingue
```

## I · Segregación de interfaces · `backend/src/repositories/interfaces.ts`
**Problema:** un repositorio genérico gigante obligaría a cada implementación a tener métodos que no usa. Hay interfaces chicas y específicas: `ILibroRepository`, `IUserRepository`, `IRoleRepository`, `ISubscriptionRepository`, `INotificationRepository`.
```ts
export interface ISubscriptionRepository {
  subscribe(userId: number, libroId: number): Promise<void>;
  unsubscribe(userId: number, libroId: number): Promise<boolean>;
  exists(userId: number, libroId: number): Promise<boolean>;
  findEmailsByLibro(libroId: number): Promise<string[]>;
}
```

## D · Inversión de dependencias · `backend/src/services/*.ts`, `backend/src/contenedor.ts`, `backend/src/main.ts`
**Problema:** si los services crearan sus repositorios con `new`, quedarían atados a Sequelize y no se podrían probar. Dependen de interfaces y las reciben por constructor; los objetos concretos se crean en el composition root (`main.ts`, que usa `crearServicios` de `contenedor.ts` para conectar las piezas).
```ts
export class LibroService {
  constructor(libros: ILibroRepository, publisher: ISubject) { ... }
}
// main.ts
const servicios = crearServicios({ libros: new LibroSequelizeRepository(), ... }, env.JWT_SECRET, env.JWT_EXPIRES_IN);
```
