# Tema 6 · Ejercicios medios

```bash
npm install
npm test          # al principio fallan todos (TODO)
npm run typecheck
```
Los tests de `tests/` son la especificación. Completá `src/` hasta que pasen **sin modificarlos**. Dados: `src/tipos.ts`, `src/repos.ts` (repositorios en memoria) y los contratos `IObserver`, `ISubject`, `INotifier`.

## M1 · El flujo de los 4 patrones (sin base de datos)
Implementá, **a mano**:
- `EventPublisher` (Subject): `attach` (sin duplicar), `detach`, `notify` que espera (`await`) a cada observer **en orden**.
- `InAppNotifier` (guarda la notificación en el `INotificationRepository` que recibe por constructor).
- `ConsoleNotifierAdapter` (adapta `console.log`): imprime exactamente
  `[NOTIFICACIÓN] Para: <email> | Libro #<id> | Estado: <anterior> → <nuevo>`.
- `NotifierFactory.create(canal)` → `InAppNotifier` para `"inapp"` y `ConsoleNotifierAdapter` para `"console"`.
- `NotificationService` (observer): por cada email suscripto al libro arma una `Notification` y la envía por **cada** canal de su lista (por defecto `["inapp", "console"]`), **pidiéndole cada canal a la fábrica** (sin `new` ni `console.log`).
- `LibroService.changeStatus(id, estado)`: si el libro no existe → `LibroNoEncontradoError`; si el estado es el mismo, devuelve el libro **sin notificar**; si cambia, guarda y avisa al publisher con `{ libroId, estadoAnterior, estadoNuevo }`.

Preguntas: ¿quién es el Subject, quién el Observer, dónde está la Factory y dónde el Adapter? ¿Cuál es la diferencia entre `NotificationService` y las suscripciones de `SubscriptionMemoria`?

## M2 · Autenticación con JWT
- `AuthService.login(email, password)`: compara con `bcrypt.compare`; si el email no existe **o** la contraseña no coincide, lanza `CredencialesInvalidasError` (mismo mensaje en los dos casos). Si es correcto, devuelve un JWT firmado con el secreto, con `sub` = id **como string**, `email` y vencimiento de 1 hora.
- `AuthService.verificar(token)`: `jwt.verify`; devuelve `{ id, permisos }` del usuario (lanza si la firma no coincide, si venció o si el usuario no existe).
- `crearAuthenticate(auth)`: middleware que exige `Authorization: Bearer <token>`; sin cabecera, con otro formato, con firma inválida o vencido → **401**. Si es válido, deja `res.locals.usuarioId` y `res.locals.permisos` y llama a `next()`.

Preguntas: ¿por qué el mismo mensaje para "email inexistente" y "contraseña incorrecta"? ¿Qué impide que alguien cambie el `sub` del token por el id del admin?
