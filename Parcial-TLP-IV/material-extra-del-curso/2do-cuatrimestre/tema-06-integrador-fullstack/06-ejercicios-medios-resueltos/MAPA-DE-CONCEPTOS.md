# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **JWT + BCRYPT** → `src/AuthService.ts` L18–45
- **MENSAJE GENÉRICO** → `src/AuthService.ts` L30–32
- **SUB COMO STRING** → `src/AuthService.ts` L34
- **VERIFY** → `src/AuthService.ts` L38–44
- **PASO 1 DEL FLUJO** → `src/LibroService.ts` L17–24
- **OBSERVER CONCRETO** → `src/NotificationService.ts` L7–27
- **MIDDLEWARE AUTHENTICATE** → `src/authenticate.ts` L5–21
- **FACTORY - TIPO COMÚN / ADAPTER - TARGET** → `src/notifications.ts` L7–9
- **ADAPTER** → `src/notifications.ts` L22–26
- **FACTORY** → `src/notifications.ts` L29–38
- **OBSERVER - CONTRATOS** → `src/observer.ts` L4–6
- **OBSERVER - SUBJECT A MANO** → `src/observer.ts` L15–32
- **AWAIT EN ORDEN** → `src/observer.ts` L27–31

## Detalle archivo por archivo


### `src/AuthService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18–45 | **JWT + BCRYPT** | `export class AuthService {` |  |
| 30–32 | **MENSAJE GENÉRICO** | `if (u === undefined \|\| !(await bcrypt.compare(password, u.passwor...` | Mismo error si no existe el email o si la contraseña es incorrecta |
| 34 | **SUB COMO STRING** | `return jwt.sign({ sub: String(u.id), email: u.email }, this.secreto...` | El estándar define sub como string |
| 38–44 | **VERIFY** | `verificar(token: string): { id: number; permisos: string[] } {` | Lanza si la firma no coincide o si venció |

### `src/LibroService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 17–24 | **PASO 1 DEL FLUJO** | `async changeStatus(id: number, estadoNuevo: EstadoLibro): Promise<L...` | Guarda y avisa. Si el estado no cambia, no avisa |

### `src/NotificationService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–27 | **OBSERVER CONCRETO** | `export class NotificationService implements IObserver {` | Consulta las suscripciones (datos) y usa la fábrica; sin new ni console.log |

### `src/authenticate.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–21 | **MIDDLEWARE AUTHENTICATE** | `export function crearAuthenticate(auth: AuthService) {` | Lee "Authorization: Bearer <token>", verifica y deja usuarioId y permisos en res.locals |

### `src/notifications.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–9 | **FACTORY - TIPO COMÚN / ADAPTER - TARGET** | `export interface INotifier {` |  |
| 22–26 | **ADAPTER** | `export class ConsoleNotifierAdapter implements INotifier {` | Objeto Notification → línea de texto para console.log |
| 29–38 | **FACTORY** | `export class NotifierFactory {` | Único lugar con los new de los canales |

### `src/observer.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **OBSERVER - CONTRATOS** | `export interface IObserver {` |  |
| 15–32 | **OBSERVER - SUBJECT A MANO** | `export class EventPublisher implements ISubject {` | Sin EventEmitter |
| 27–31 | **AWAIT EN ORDEN** | `async notify(evento: CambioEstadoEvento): Promise<void> {` | Espera a cada observer antes de seguir con el siguiente |
