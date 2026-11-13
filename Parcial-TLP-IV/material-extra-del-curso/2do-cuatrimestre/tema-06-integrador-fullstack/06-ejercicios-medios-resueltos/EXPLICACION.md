# Tema 6 · Ejercicios medios: resolución explicada

## M1 · Flujo de los 4 patrones
| Rol | Clase |
|---|---|
| Observer: Subject | `EventPublisher` (implementa `ISubject`) |
| Observer: Observer | `NotificationService` (implementa `IObserver`) |
| Factory | `NotifierFactory.create(canal)` → `INotifier` |
| Adapter | `ConsoleNotifierAdapter` (adapta `console.log` a `INotifier`) |
| (Singleton) | En el proyecto real, la conexión a la base que usan los repositorios |

- **`attach` sin duplicar:** `if (!this.observers.includes(o))`. El test lo verifica suscribiendo `a` dos veces.
- **`notify` con `for...of` + `await`:** respeta el orden y espera a cada uno. Con `forEach(async ...)` **no** se espera (forEach ignora las promesas) y el test del orden o de las notificaciones guardadas podría fallar.
- **`NotificationService` no tiene `new` ni `console.log`:** el test lo comprueba espiando `factory.create` (`vi.spyOn(factory, 'create')`) y verificando que se pidió `inapp` y después `console`.
- **`{ destinatario: email, ...evento }`:** el *spread* copia `libroId`, `estadoAnterior` y `estadoNuevo` del evento.
- **No notificar si el estado no cambia:** decisión de negocio que evita notificaciones vacías. El test "si el estado no cambia..." lo exige.
- **Observer vs. suscripción:** `NotificationService` es un objeto que reacciona; `SubscriptionMemoria` guarda datos (quién sigue qué libro). El observer **consulta** las suscripciones.

## M2 · JWT
- **Mismo mensaje** para email inexistente y contraseña incorrecta: si el mensaje fuera distinto, un atacante podría averiguar qué emails están registrados (enumeración de usuarios).
- **`sub` como string:** el estándar JWT define `sub` como string; `jsonwebtoken` lo valida si es otro tipo. Al verificar se convierte de nuevo con `Number(payload.sub)`.
- **`exp`:** `expiresIn: '1h'` agrega el campo `exp` (segundos desde 1970). `jwt.verify` lanza `TokenExpiredError` si ya pasó.
- **¿Qué impide cambiar el `sub`?** La **firma**. Si alguien edita el payload, la firma (HMAC con el secreto) deja de coincidir y `jwt.verify` lanza. Sin conocer `JWT_SECRET` no se puede generar una firma válida. Por eso el secreto va en `.env` y nunca se sube.
- **`jwt.verify` puede devolver `string`** (si el token se firmó con un payload string): por eso el `typeof payload === 'string'` antes de leer `sub` (narrowing).
- **401 en todos los casos de token**: falta, formato incorrecto, firma inválida, vencido. El `try/catch` del middleware convierte cualquier error de `verificar` en 401.
