# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **APP SIN LISTEN** → `proyecto-referencia/backend/src/app.ts` L26–45
- **CORS** → `proyecto-referencia/backend/src/app.ts` L29
- **CABLEADO DE DEPENDENCIAS** → `proyecto-referencia/backend/src/contenedor.ts` L26–40
- **OBSERVER - REGISTRO** → `proyecto-referencia/backend/src/contenedor.ts` L28
- **COMPOSITION ROOT** → `proyecto-referencia/backend/src/main.ts` L16–40
- **SINGLETON EN USO** → `proyecto-referencia/backend/src/main.ts` L18
- **SEED AUTOMÁTICO AL LEVANTAR** → `proyecto-referencia/backend/src/main.ts` L23
- **CONFIGURACIÓN CENTRALIZADA** → `proyecto-referencia/backend/src/config/env.ts` L4–7
- **CONTROLLER** → `proyecto-referencia/backend/src/controllers/AuthController.ts` L5–26
- **FUNCIONES FLECHA** → `proyecto-referencia/backend/src/controllers/LibroController.ts` L13–15
- **SINGLETON** → `proyecto-referencia/backend/src/database/DatabaseConnection.ts` L5–28
- **SINGLETON ① ATRIBUTO STATIC** → `proyecto-referencia/backend/src/database/DatabaseConnection.ts` L7–8
- **SINGLETON ② CONSTRUCTOR PRIVATE** → `proyecto-referencia/backend/src/database/DatabaseConnection.ts` L11–19
- **DATOS DE ENTORNO** → `proyecto-referencia/backend/src/database/DatabaseConnection.ts` L13–18
- **SINGLETON ③ ACCESO** → `proyecto-referencia/backend/src/database/DatabaseConnection.ts` L22–27
- **MODELOS DE SEQUELIZE** → `proyecto-referencia/backend/src/database/models.ts` L14–17
- **DEFINICIÓN DE TABLAS Y RELACIONES** → `proyecto-referencia/backend/src/database/models.ts` L63–134
- **ENUM DE POSTGRES ≠ ENUM DE TS** → `proyecto-referencia/backend/src/database/models.ts` L98–102
- **ASOCIACIONES** → `proyecto-referencia/backend/src/database/models.ts` L123
- **MATRIZ DE PERMISOS DEL ENUNCIADO** → `proyecto-referencia/backend/src/database/seed-datos.ts` L4–15
- **SEED IDEMPOTENTE** → `proyecto-referencia/backend/src/database/seed.ts` L7–41
- **ERRORES DE DOMINIO** → `proyecto-referencia/backend/src/domain/errores.ts` L2–7
- **UNIÓN DE LITERALES** → `proyecto-referencia/backend/src/domain/tipos.ts` L2
- **TIPO PÚBLICO** → `proyecto-referencia/backend/src/domain/tipos.ts` L26
- **EVENTO DEL OBSERVER** → `proyecto-referencia/backend/src/domain/tipos.ts` L29–33
- **AUTENTICACIÓN - MIDDLEWARE** → `proyecto-referencia/backend/src/middlewares/authenticate.ts` L5–28
- **401** → `proyecto-referencia/backend/src/middlewares/authenticate.ts` L9–12
- **PERMISOS DESDE LA BASE** → `proyecto-referencia/backend/src/middlewares/authenticate.ts` L16
- **AUTORIZACIÓN - MIDDLEWARE** → `proyecto-referencia/backend/src/middlewares/authorize.ts` L5–15
- **403** → `proyecto-referencia/backend/src/middlewares/authorize.ts` L9–12
- **MIDDLEWARE DE ERRORES** → `proyecto-referencia/backend/src/middlewares/errorHandler.ts` L5–18
- **ADAPTER** → `proyecto-referencia/backend/src/notifications/ConsoleNotifierAdapter.ts` L5–12
- **TRADUCCIÓN** → `proyecto-referencia/backend/src/notifications/ConsoleNotifierAdapter.ts` L8–10
- **FACTORY - TIPO COMÚN / ADAPTER - TARGET** → `proyecto-referencia/backend/src/notifications/INotifier.ts` L4–6
- **CANAL IN-APP** → `proyecto-referencia/backend/src/notifications/InAppNotifier.ts` L6–16
- **FACTORY** → `proyecto-referencia/backend/src/notifications/NotifierFactory.ts` L7–20
- **OBSERVER - SUBJECT CONCRETO** → `proyecto-referencia/backend/src/observer/EventPublisher.ts` L6–27
- **NOTIFY ASÍNCRONO** → `proyecto-referencia/backend/src/observer/EventPublisher.ts` L22–26
- **OBSERVER - INTERFAZ OBSERVER** → `proyecto-referencia/backend/src/observer/IObserver.ts` L4–6
- **OBSERVER - INTERFAZ SUBJECT** → `proyecto-referencia/backend/src/observer/ISubject.ts` L5–9
- **ISP + DIP** → `proyecto-referencia/backend/src/repositories/interfaces.ts` L14–21
- **REPOSITORIOS EN MEMORIA** → `proyecto-referencia/backend/src/repositories/memory/index.ts` L23–58
- **FÁBRICA ASÍNCRONA** → `proyecto-referencia/backend/src/repositories/memory/index.ts` L65–71
- **REPOSITORIO = ÚNICO ACCESO A LA BASE** → `proyecto-referencia/backend/src/repositories/sequelize/index.ts` L29–31
- **INCLUDE = JOIN** → `proyecto-referencia/backend/src/repositories/sequelize/index.ts` L97
- **ROUTES** → `proyecto-referencia/backend/src/routes/index.ts` L18–47
- **RF1 AUTENTICACIÓN** → `proyecto-referencia/backend/src/services/AuthService.ts` L19–78
- **BCRYPT HASH** → `proyecto-referencia/backend/src/services/AuthService.ts` L40
- **RF2** → `proyecto-referencia/backend/src/services/AuthService.ts` L42
- **BCRYPT COMPARE** → `proyecto-referencia/backend/src/services/AuthService.ts` L49–51
- **JWT VERIFY** → `proyecto-referencia/backend/src/services/AuthService.ts` L56–62
- **JWT SIGN** → `proyecto-referencia/backend/src/services/AuthService.ts` L73
- **SERVICE** → `proyecto-referencia/backend/src/services/LibroService.ts` L7–61
- **OBSERVER** → `proyecto-referencia/backend/src/services/LibroService.ts` L10
- **FLUJO DE LOS 4 PATRONES - PASO 1** → `proyecto-referencia/backend/src/services/LibroService.ts` L38–49
- **OBSERVER CONCRETO** → `proyecto-referencia/backend/src/services/NotificationService.ts` L9–48
- **OCP** → `proyecto-referencia/backend/src/services/NotificationService.ts` L14
- **SIN NEW NI CONSOLE.LOG** → `proyecto-referencia/backend/src/services/NotificationService.ts` L33
- **SUSCRIPCIONES = DATOS** → `proyecto-referencia/backend/src/services/SubscriptionService.ts` L5–25
- **RF6** → `proyecto-referencia/backend/src/services/UserService.ts` L6–21
- **FETCH NATIVO** → `proyecto-referencia/frontend/src/api.ts` L2
- **AUTHORIZATION: BEARER** → `proyecto-referencia/frontend/src/api.ts` L15
- **CONTEXTO DE AUTENTICACIÓN** → `proyecto-referencia/frontend/src/auth/AuthContext.tsx` L26–49
- **PERMISOS EN EL FRONT** → `proyecto-referencia/frontend/src/auth/AuthContext.tsx` L42
- **CONTROL DE ACCESO EN LA INTERFAZ** → `proyecto-referencia/frontend/src/components/Can.tsx` L5–8
- **BOTÓN SEGÚN PERMISO** → `proyecto-referencia/frontend/src/pages/Libros.tsx` L51
- **RF5 EN LA INTERFAZ** → `proyecto-referencia/frontend/src/pages/Notificaciones.tsx` L7–40

## Detalle archivo por archivo


### `proyecto-referencia/backend/src/app.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 26–45 | **APP SIN LISTEN** | `export function crearApp(s: Servicios, corsOrigin = '*') {` | Recibe los servicios ya construidos (desde main.ts o desde un test): no sabe si atrás hay Sequelize o memoria |
| 29 | **CORS** | `app.use(cors({ origin: corsOrigin }));` | El navegador bloquea peticiones entre orígenes distintos (5173 → 3000) salvo que el backend las permita |

### `proyecto-referencia/backend/src/contenedor.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 26–40 | **CABLEADO DE DEPENDENCIAS** | `export function crearServicios(repos: Repositorios, jwtSecret: stri...` | Conecta servicios, Observer y Factory a partir de CUALQUIER conjunto de repositorios (DIP) |
| 28 | **OBSERVER - REGISTRO** | `const publisher = new EventPublisher();` | El publisher se crea acá y NotificationService se suscribe como observer |

### `proyecto-referencia/backend/src/main.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 16–40 | **COMPOSITION ROOT** | `async function main(): Promise<void> {` | El único lugar donde se crean (new) y conectan las piezas reales del sistema |
| 18 | **SINGLETON EN USO** | `const db = DatabaseConnection.getInstance();` |  |
| 23 | **SEED AUTOMÁTICO AL LEVANTAR** | `await seed();` | Roles, permisos, usuarios de prueba y libros (idempotente) |

### `proyecto-referencia/backend/src/config/env.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–7 | **CONFIGURACIÓN CENTRALIZADA** | `function leer(nombre: string, porDefecto: string): string {` | Un solo lugar lee process.env. Los valores por defecto sirven para correr la demo y los tests sin .env |

### `proyecto-referencia/backend/src/controllers/AuthController.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–26 | **CONTROLLER** | `export class AuthController {` | Lee la request, llama al servicio, responde. Sin lógica de negocio |

### `proyecto-referencia/backend/src/controllers/LibroController.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 13–15 | **FUNCIONES FLECHA** | `listar = async (_req: Request, res: Response): Promise<void> => {` | Se pasan sueltas al router; con flecha, this sigue siendo el controlador |

### `proyecto-referencia/backend/src/database/DatabaseConnection.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–28 | **SINGLETON** | `export class DatabaseConnection {` | Una sola conexión (pool) a PostgreSQL en toda la aplicación |
| 7–8 | **SINGLETON ① ATRIBUTO STATIC** | `private static instance: DatabaseConnection \| undefined;` |  |
| 11–19 | **SINGLETON ② CONSTRUCTOR PRIVATE** | `private constructor() {` | Nadie puede hacer new DatabaseConnection() y abrir una segunda conexión |
| 13–18 | **DATOS DE ENTORNO** | `this.sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PAS...` | Nada de valores fijos: host, usuario, etc. vienen de variables de entorno (DB_HOST=db en Compose) |
| 22–27 | **SINGLETON ③ ACCESO** | `static getInstance(): DatabaseConnection {` |  |

### `proyecto-referencia/backend/src/database/models.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14–17 | **MODELOS DE SEQUELIZE** | `export class RoleModel extends Model<InferAttributes<RoleModel>, In...` | Cada clase representa una tabla. "declare" solo informa el tipo: los getters reales los crea Sequelize |
| 63–134 | **DEFINICIÓN DE TABLAS Y RELACIONES** | `export function definirModelos(sequelize: Sequelize): void {` | Se llama UNA vez desde main.ts con la instancia del Singleton |
| 98–102 | **ENUM DE POSTGRES ≠ ENUM DE TS** | `estado: {` | Es un tipo de COLUMNA; en el código TS se usa la unión EstadoLibro |
| 123 | **ASOCIACIONES** | `RoleModel.hasMany(UserModel, { foreignKey: 'roleId' });` | usuario → rol (N:1), rol ↔ permiso (N:M), suscripciones y notificaciones |

### `proyecto-referencia/backend/src/database/seed-datos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–15 | **MATRIZ DE PERMISOS DEL ENUNCIADO** | `export const PERMISOS_POR_ROL: Record<NombreRol, string[]> = {` | Un solo lugar define qué puede cada rol. La usan el seed de Sequelize y el repo en memoria |

### `proyecto-referencia/backend/src/database/seed.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–41 | **SEED IDEMPOTENTE** | `export async function seed(): Promise<void> {` | findOrCreate: se puede ejecutar en cada arranque sin duplicar datos (seed automático al levantar) |

### `proyecto-referencia/backend/src/domain/errores.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 2–7 | **ERRORES DE DOMINIO** | `export class ValidacionError extends Error {` | El middleware de errores los traduce a códigos HTTP con instanceof |

### `proyecto-referencia/backend/src/domain/tipos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 2 | **UNIÓN DE LITERALES** | `export type EstadoLibro = 'DISPONIBLE' \| 'PRESTADO' \| 'EN_REPARAC...` | Estados del libro sin enum de TypeScript |
| 26 | **TIPO PÚBLICO** | `export type UsuarioPublico = Omit<Usuario, 'passwordHash'>;` | Lo que se devuelve por la API: nunca el hash de la contraseña |
| 29–33 | **EVENTO DEL OBSERVER** | `export interface CambioEstadoEvento {` | Lo que el Subject le pasa a cada observer |

### `proyecto-referencia/backend/src/middlewares/authenticate.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–28 | **AUTENTICACIÓN - MIDDLEWARE** | `export function crearAuthenticate(auth: AuthService): RequestHandler {` | ¿Quién sos? Valida el JWT y deja en res.locals el usuario y los permisos de su rol |
| 9–12 | **401** | `if (header === undefined \|\| !header.startsWith('Bearer ')) {` | Sin token o con formato incorrecto → no autenticado |
| 16 | **PERMISOS DESDE LA BASE** | `const datos = await auth.permisosDeUsuario(Number(payload.sub));` | Si el admin cambia el rol, se aplica en la próxima petición (no hay que esperar a que venza el token) |

### `proyecto-referencia/backend/src/middlewares/authorize.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–15 | **AUTORIZACIÓN - MIDDLEWARE** | `export function authorize(permiso: string) {` | ¿Podés? Función que DEVUELVE un middleware: recuerda el permiso pedido (closure) |
| 9–12 | **403** | `if (permisos === undefined \|\| !permisos.includes(permiso)) {` | Autenticado pero sin permiso. Se valida en el BACKEND aunque llamen con Postman o curl |

### `proyecto-referencia/backend/src/middlewares/errorHandler.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–18 | **MIDDLEWARE DE ERRORES** | `export function errorHandler(err: unknown, _req: Request, res: Resp...` | 4 parámetros. Traduce errores de dominio a códigos HTTP |

### `proyecto-referencia/backend/src/notifications/ConsoleNotifierAdapter.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–12 | **ADAPTER** | `export class ConsoleNotifierAdapter implements INotifier {` | console.log recibe TEXTO y no devuelve promesa; INotifier recibe un objeto Notification y devuelve Promise<void> |
| 8–10 | **TRADUCCIÓN** | `console.log(` | Objeto → línea de texto |

### `proyecto-referencia/backend/src/notifications/INotifier.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **FACTORY - TIPO COMÚN / ADAPTER - TARGET** | `export interface INotifier {` | Todo canal de notificación cumple este contrato |

### `proyecto-referencia/backend/src/notifications/InAppNotifier.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–16 | **CANAL IN-APP** | `export class InAppNotifier implements INotifier {` | Guarda la notificación en la base (leída = false) |

### `proyecto-referencia/backend/src/notifications/NotifierFactory.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–20 | **FACTORY** | `export class NotifierFactory {` | Único lugar con new de los canales. NotificationService pide por nombre y recibe un INotifier |

### `proyecto-referencia/backend/src/observer/EventPublisher.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–27 | **OBSERVER - SUBJECT CONCRETO** | `export class EventPublisher implements ISubject {` | Implementado a mano (prohibido EventEmitter). No sabe quiénes son los observers |
| 22–26 | **NOTIFY ASÍNCRONO** | `async notify(evento: CambioEstadoEvento): Promise<void> {` | await en cada observer: el servicio que publicó espera a que todos terminen |

### `proyecto-referencia/backend/src/observer/IObserver.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **OBSERVER - INTERFAZ OBSERVER** | `export interface IObserver {` | async: los observers pueden acceder a la base |

### `proyecto-referencia/backend/src/observer/ISubject.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–9 | **OBSERVER - INTERFAZ SUBJECT** | `export interface ISubject {` | attach / detach / notify |

### `proyecto-referencia/backend/src/repositories/interfaces.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14–21 | **ISP + DIP** | `export interface ILibroRepository {` | Interfaces de repositorio CHICAS y ESPECÍFICAS. Los servicios dependen de estas, no de Sequelize |

### `proyecto-referencia/backend/src/repositories/memory/index.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 23–58 | **REPOSITORIOS EN MEMORIA** | `export class LibroMemoryRepository implements ILibroRepository {` | Otra implementación de las MISMAS interfaces: sirven para la demo y los tests sin base de datos (LSP + DIP) |
| 65–71 | **FÁBRICA ASÍNCRONA** | `static async conUsuariosDePrueba(): Promise<UserMemoryRepository> {` | bcrypt.hash es async, así que no puede ir en el constructor |

### `proyecto-referencia/backend/src/repositories/sequelize/index.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 29–31 | **REPOSITORIO = ÚNICO ACCESO A LA BASE** | `function aLibro(m: LibroModel): Libro {` | Solo estas clases importan modelos de Sequelize. Devuelven tipos de dominio, no modelos |
| 97 | **INCLUDE = JOIN** | `const r = await RoleModel.findOne({ where: { nombre: rol }, include...` | Trae el rol con sus permisos (relación N:M a través de role_permissions) |

### `proyecto-referencia/backend/src/routes/index.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18–47 | **ROUTES** | `export function crearRouter(c: Controladores, authenticate: Request...` | URL + método + middlewares (authenticate → authorize(permiso)) + controlador. Cada endpoint declara su permiso |

### `proyecto-referencia/backend/src/services/AuthService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 19–78 | **RF1 AUTENTICACIÓN** | `export class AuthService {` | bcrypt para las contraseñas y JWT para la sesión |
| 40 | **BCRYPT HASH** | `const passwordHash = await bcrypt.hash(password, 10);` | Nunca se guarda la contraseña: se guarda el hash (con salt, costo 10) |
| 42 | **RF2** | `const creado = await this.usuarios.create({ nombre: nombre.trim(), ...` | Todo usuario nuevo es "usuario" |
| 49–51 | **BCRYPT COMPARE** | `if (usuario === undefined \|\| typeof password !== 'string' \|\| !(...` | Mensaje genérico: no revela si falló el email o la contraseña |
| 56–62 | **JWT VERIFY** | `verificarToken(token: string): PayloadToken {` | Lanza si la firma no coincide o el token venció |
| 73 | **JWT SIGN** | `const token = jwt.sign({ sub: String(id), email }, this.secreto, { ...` | El payload se puede LEER (no está cifrado): solo id y email, nunca la contraseña |

### `proyecto-referencia/backend/src/services/LibroService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–61 | **SERVICE** | `export class LibroService {` | Toda la lógica del libro. No conoce Express ni Sequelize: depende de interfaces (DIP) |
| 10 | **OBSERVER** | `private publisher: ISubject;` | El servicio solo conoce el Subject: no sabe que existe NotificationService |
| 38–49 | **FLUJO DE LOS 4 PATRONES - PASO 1** | `async changeStatus(id: number, estadoNuevo: EstadoLibro): Promise<L...` | Guarda el nuevo estado y le avisa al EventPublisher |

### `proyecto-referencia/backend/src/services/NotificationService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 9–48 | **OBSERVER CONCRETO** | `export class NotificationService implements IObserver {` | Reacciona al cambio de estado consultando las SUSCRIPCIONES (datos) y usando la FÁBRICA de canales |
| 14 | **OCP** | `private readonly canales: Canal[] = ['inapp', 'console'];` | Para sumar un canal: una clase INotifier + un caso en la fábrica + agregarlo acá |
| 33 | **SIN NEW NI CONSOLE.LOG** | `await this.factory.create(canal).send(notification);` | Solo conoce INotifier y la fábrica |

### `proyecto-referencia/backend/src/services/SubscriptionService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–25 | **SUSCRIPCIONES = DATOS** | `export class SubscriptionService {` | Guardan qué usuario sigue qué libro (RF4). No son observers |

### `proyecto-referencia/backend/src/services/UserService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–21 | **RF6** | `export class UserService {` | El administrador lista usuarios y les asigna un rol |

### `proyecto-referencia/frontend/src/api.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 2 | **FETCH NATIVO** | `const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://loc...` | Sin axios (no es una librería vista). Un único lugar arma las peticiones y agrega el token |
| 15 | **AUTHORIZATION: BEARER** | `if (opciones.token) headers.Authorization = `Bearer ${opciones.toke...` | Así viaja el JWT en cada petición |

### `proyecto-referencia/frontend/src/auth/AuthContext.tsx`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 26–49 | **CONTEXTO DE AUTENTICACIÓN** | `export function AuthProvider({ children }: { children: ReactNode }) {` | Guarda token y permisos (en localStorage para no perderlos al recargar) |
| 42 | **PERMISOS EN EL FRONT** | `puede: (permiso) => sesion?.permisos.includes(permiso) ?? false,` | Solo para mostrar u ocultar; la validación real está en el backend (403) |

### `proyecto-referencia/frontend/src/components/Can.tsx`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–8 | **CONTROL DE ACCESO EN LA INTERFAZ** | `export function Can({ permiso, children }: { permiso: string; child...` | <Can permiso="libro:delete">...</Can> muestra el contenido solo si el rol tiene el permiso |

### `proyecto-referencia/frontend/src/pages/Libros.tsx`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 51 | **BOTÓN SEGÚN PERMISO** | `<Can permiso="libro:delete">` | Solo el admin ve "Eliminar"; igual el backend responde 403 si alguien llama directo |

### `proyecto-referencia/frontend/src/pages/Notificaciones.tsx`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–40 | **RF5 EN LA INTERFAZ** | `export function Notificaciones() {` | Lista las notificaciones in-app; las no leídas en negrita. Sin tiempo real: se consulta al entrar y cada 10 s |
