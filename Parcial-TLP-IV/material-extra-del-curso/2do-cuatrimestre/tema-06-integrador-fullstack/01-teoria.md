# Tema 6 · Actividad práctica integradora: aplicación full stack (Biblioteca)

> **Objetivo:** construir (y poder **defender oralmente**) una aplicación web full stack en TypeScript que junte **POO, SOLID, los cuatro patrones y Docker**: backend Express en capas con PostgreSQL + Sequelize, autenticación con bcrypt + JWT, permisos `recurso:accion`, suscripciones y notificaciones por dos canales, y un frontend React.
> "Lo que se evalúa es la **arquitectura** y que cada integrante pueda **explicar sus decisiones**, no la cantidad de funcionalidades."

Índice:
1. [Qué se pide (resumen de la consigna)](#1-qué-se-pide)
2. [Express desde cero: petición, middleware, router](#2-express-desde-cero)
3. [Arquitectura en capas y composition root](#3-arquitectura-en-capas-y-composition-root)
4. [Autenticación: bcrypt y JWT](#4-autenticación-bcrypt-y-jwt)
5. [Autorización: roles y permisos `recurso:accion`](#5-autorización-roles-y-permisos)
6. [Base de datos: PostgreSQL y Sequelize](#6-base-de-datos-postgresql-y-sequelize)
7. [Los cuatro patrones en un mismo flujo](#7-los-cuatro-patrones-en-un-mismo-flujo)
8. [SOLID en el proyecto](#8-solid-en-el-proyecto)
9. [Variables de entorno, CORS y configuración](#9-variables-de-entorno-cors-y-configuración)
10. [Docker y Docker Compose](#10-docker-y-docker-compose)
11. [Frontend: React + Vite + react-router + fetch](#11-frontend-react)
12. [Documentación: README.md y PATTERNS.md](#12-documentación)
13. [Defensa oral: preguntas típicas con respuesta](#13-defensa-oral)
14. [Evaluación, prohibiciones y commits](#14-evaluación-prohibiciones-y-commits)

---

## 1. Qué se pide

| Capa | Tecnología |
|---|---|
| Frontend | React + TypeScript (Vite), con `react-router` y `fetch` nativo |
| Backend | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL con Sequelize (`sequelize` + `pg`) |
| Infraestructura | Docker + Docker Compose |

Reglas:
- `"strict": true` en backend y frontend; **nada de `any`** sin un comentario que lo justifique.
- **Solo librerías vistas en clase.** Backend: `express`, `cors`, `dotenv`, `jsonwebtoken`, `bcrypt`, `sequelize`, `pg`. Frontend: `react`, `react-dom`, `react-router`. **Una librería de más invalida el requisito que resuelve.** (Las de desarrollo como `typescript`, `tsx`, `vite`, `@types/*` son herramientas, no resuelven requisitos.)
- Backend y frontend son **dos proyectos independientes** en el mismo repositorio, cada uno con su `package.json`, `tsconfig.json`, `Dockerfile` y `.dockerignore`. **En la raíz no hay `package.json` ni workspaces** (no es un monorepo).
- Los cuatro patrones se implementan **a mano**. Prohibido `EventEmitter` para el Observer y cualquier librería de inyección de dependencias.

Requisitos funcionales (dominio Biblioteca: recurso `Libro`, estados `DISPONIBLE`, `PRESTADO`, `EN_REPARACION`):

| RF | Descripción |
|---|---|
| **RF1** Autenticación | Registro y login con email y contraseña; contraseñas con **bcrypt**, sesión con **JWT** |
| **RF2** Roles y permisos | Permisos `recurso:accion` (ej. `libro:create`) cargados con un **seed**. Todo usuario nuevo es `usuario`. Se validan **en el backend**: sin permiso → **403** aunque se llame con Postman o curl |
| **RF3** Gestión del libro | Listar, ver detalle, crear, editar, cambiar estado y eliminar según el rol |
| **RF4** Suscripciones | Suscribirse y desuscribirse de un libro, guardado en la base |
| **RF5** Notificaciones | Cuando cambia el estado de un libro, cada suscriptor recibe una notificación por **dos canales**: **in-app** (guardada en la base como leída/no leída) y **consola** (una línea en la consola del backend) |
| **RF6** Usuarios | El administrador lista usuarios y les asigna un rol |

Matriz de permisos:

| Permiso | admin | operador | usuario |
|---|---|---|---|
| `libro:read` | Sí | Sí | Sí |
| `libro:create`, `libro:update`, `libro:change-status` | Sí | Sí | No |
| `libro:delete` | Sí | No | No |
| `subscription:create`, `subscription:delete`, `notification:read` | Sí | Sí | Sí |
| `user:read`, `user:assign-role` | Sí | No | No |

**No se pide:** tests automáticos, tiempo real (WebSockets), envío de emails, refresh tokens, ABM de roles ni paginación.

---

## 2. Express desde cero

**Express** es un framework minimalista para crear servidores HTTP en Node.

```ts
import express from "express";
const app = express();
app.use(express.json());                       // middleware: parsea el body JSON → req.body

app.get("/api/libros/:id", (req, res) => {     // ruta: método + path + manejador
  const id = Number(req.params.id);            // parámetros de ruta (/:id)
  const q = req.query.q;                       // query string (?q=...)
  res.status(200).json({ id, q });             // respuesta JSON con código
});

app.listen(3000);
```

### Ciclo de vida de una petición
```
petición → middleware 1 → middleware 2 → ... → manejador de la ruta → respuesta
                                   ↘ (si alguien lanza o llama next(err)) → middleware de errores
```

### Middleware
Función `(req, res, next) => void` que se ejecuta **en cadena**. Puede:
- **modificar** `req`/`res` (ej.: `express.json()` llena `req.body`; `authenticate` guarda el usuario en `res.locals`),
- **cortar** la cadena respondiendo (`res.status(403).json(...)` y `return`),
- **pasar** al siguiente con `next()`,
- **reportar un error** con `next(err)` (o lanzándolo).

```ts
router.delete("/:id", authenticate, authorize("libro:delete"), controller.eliminar);
//                     ↑ 1° ¿quién sos?  ↑ 2° ¿podés?            ↑ 3° hacé el trabajo
```

### `res.locals`
Objeto para pasar datos **entre middlewares** de la misma petición (ej.: `res.locals.usuario`, `res.locals.permisos`). Vive solo durante esa petición.

### Router
Agrupa rutas con un prefijo: `app.use("/api/libros", crearLibroRouter(controller))`.

### Errores en Express 5
En **Express 5**, si un manejador `async` lanza un error o devuelve una promesa rechazada, Express lo envía **automáticamente** al middleware de errores (en Express 4 había que hacer `try/catch` + `next(err)`). El middleware de errores tiene **4 parámetros**:
```ts
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => { ... });
```

### Controladores como funciones flecha
`router.get("/", controller.listar)` pasa el método **suelto**: si fuera un método común, adentro `this` sería `undefined`. Declararlo como propiedad flecha (`listar = async (req, res) => {...}`) mantiene `this` apuntando al controlador.

---

## 3. Arquitectura en capas y composition root

```
routes  →  controllers  →  services  →  repositories  →  base de datos
```

| Capa | Hace | No hace |
|---|---|---|
| **Routes** | Asocia URL + método + middlewares (`authenticate`, `authorize`) + controlador | Lógica |
| **Controllers** | Reciben la request, **validan la entrada**, llaman al servicio y devuelven la respuesta (status + JSON) | Lógica de negocio |
| **Services** | **Toda** la lógica de negocio (reglas, orquestación, avisar al publisher) | No conocen Express: **no reciben `req` ni `res`** |
| **Repositories** | **Único** acceso a la base. Se definen **primero como interfaz** (`ILibroRepository`) y después se implementan (`LibroSequelizeRepository`) | Reglas de negocio |

- **Las dependencias entran por constructor** (DIP).
- Todo se crea y se conecta en **un solo lugar**: `src/main.ts` (**composition root**). Es el único archivo con `new` de servicios, repositorios, publisher, fábrica, etc.
- El backend puede organizarse **por tipo de archivo** (`controllers/`, `services/`...) o **por módulo** (`modules/libros/`...). Cualquiera sirve, pero hay que **elegir una y respetarla** en todo el proyecto.

¿Por qué los services no reciben `req` ni `res`? Para que la lógica de negocio **no dependa de Express** y se pueda **reutilizar y probar sin HTTP** (por ejemplo, desde un script de seed o desde un test con repositorios en memoria).

---

## 4. Autenticación: bcrypt y JWT

**Autenticación** = ¿quién sos? **Autorización** = ¿qué podés hacer?

### 4.1 Contraseñas con bcrypt
Nunca se guarda la contraseña en texto plano. Se guarda un **hash**: el resultado de una función **de un solo sentido** (no se puede "deshashear").

```ts
import bcrypt from "bcrypt";

const hash = await bcrypt.hash("Secreta123", 10);   // 10 = "salt rounds" (costo)
// "$2b$10$N9qo8uLOickgx2ZMRZoMye..."  ← incluye el salt y el costo

const ok = await bcrypt.compare("Secreta123", hash); // true
```
- **Salt:** valor aleatorio que se mezcla con la contraseña antes de hashear. Dos usuarios con la misma contraseña tienen hashes **distintos**, y eso inutiliza las tablas precalculadas (*rainbow tables*).
- **Costo (rounds):** cuántas veces se repite el algoritmo (2^10). bcrypt es **lento a propósito**: frena los ataques de fuerza bruta.
- Para verificar se usa `compare` (no se vuelve a hashear y comparar strings: el salt sería otro).
- **Login:** buscar el usuario por email → `compare` → si falla, responder **401** con un mensaje genérico ("Credenciales inválidas"), **sin decir** si falló el email o la contraseña.

### 4.2 Sesión con JWT
**JWT (JSON Web Token)**: un string firmado con tres partes `header.payload.firma` (en Base64URL).

```ts
import jwt from "jsonwebtoken";

const token = jwt.sign({ sub: usuario.id, email: usuario.email }, process.env.JWT_SECRET!, { expiresIn: "2h" });
const payload = jwt.verify(token, process.env.JWT_SECRET!);   // lanza si la firma no coincide o expiró
```
- El **payload** NO está cifrado: cualquiera lo puede leer (base64). **No poner contraseñas ni datos sensibles.**
- La **firma** (HMAC con `JWT_SECRET`) garantiza que **nadie lo modificó**. Si alguien cambia el payload (por ejemplo, su rol), la firma no coincide y `verify` lanza.
- Es **sin estado** (*stateless*): el servidor no guarda sesiones; cada petición trae el token.
- El cliente lo envía en la cabecera: `Authorization: Bearer <token>`.
- `expiresIn`: el token vence. No se piden refresh tokens.

### 4.3 Middleware `authenticate`
```ts
export function authenticate(req, res, next) {
  const header = req.headers.authorization;               // "Bearer eyJ..."
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Falta el token" });
  try {
    const payload = jwt.verify(header.slice(7), secret);  // valida firma y vencimiento
    res.locals.usuarioId = payload.sub;
    res.locals.permisos = /* permisos del rol del usuario (desde la base) */;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o vencido" });
  }
}
```
¿Por qué buscar los permisos en la base y no guardarlos en el token? Porque si el admin cambia el rol de alguien, con el token viejo seguiría teniendo los permisos anteriores hasta que venza. Las dos opciones son defendibles; hay que saber explicar la elegida.

---

## 5. Autorización: roles y permisos

- **Permiso:** formato `recurso:accion` (`libro:create`, `user:assign-role`).
- **Rol:** conjunto de permisos (`admin`, `operador`, `usuario`).
- **Usuario → rol → permisos.** Todo usuario nuevo es `usuario`.
- Se cargan con un **seed** (script que inserta roles, permisos, la relación rol-permiso y usuarios de prueba).

```ts
// authenticate (antes) deja en res.locals.permisos la lista de permisos del rol
export function authorize(permiso: string) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const permisos = res.locals.permisos as string[] | undefined;
    if (permisos === undefined || !permisos.includes(permiso)) {
      res.status(403).json({ error: "No tenés permiso para esta acción" });
      return;
    }
    next();
  };
}
// router.delete('/:id', authenticate, authorize('libro:delete'), controller.eliminar)
```
- `authorize("libro:delete")` es una **función que devuelve un middleware** (*factory de middlewares* / *closure*): recuerda el permiso pedido.
- **401 vs 403:** **401 Unauthorized** = no estás autenticado (sin token o token inválido). **403 Forbidden** = sé quién sos, pero **no tenés permiso**.
- **Los permisos se validan en el backend.** Ocultar botones en el frontend es **solo un complemento** (cualquiera puede llamar al endpoint con Postman o curl).

---

## 6. Base de datos: PostgreSQL y Sequelize

### 6.1 Modelo relacional del dominio
```
roles (id, nombre)                 permissions (id, codigo)        role_permissions (roleId, permissionId)
users (id, nombre, email UNIQUE, passwordHash, roleId → roles)
libros (id, titulo, autor, estado)
subscriptions (id, userId → users, libroId → libros, UNIQUE(userId, libroId))
notifications (id, userId → users, libroId → libros, mensaje, leida, createdAt)
```

### 6.2 Sequelize (ORM)
Un **ORM** (*Object-Relational Mapping*) traduce entre **tablas** y **objetos**: en vez de escribir SQL, se usan clases y métodos.

```ts
import { DataTypes, Model, Sequelize, type InferAttributes, type InferCreationAttributes, type CreationOptional } from "sequelize";

export class LibroModel extends Model<InferAttributes<LibroModel>, InferCreationAttributes<LibroModel>> {
  declare id: CreationOptional<number>;      // declare: solo tipo (Sequelize define los getters reales)
  declare titulo: string;
  declare estado: "DISPONIBLE" | "PRESTADO" | "EN_REPARACION";
}

LibroModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.ENUM("DISPONIBLE", "PRESTADO", "EN_REPARACION"), allowNull: false, defaultValue: "DISPONIBLE" },
  },
  { sequelize, tableName: "libros" },
);
```
> `DataTypes.ENUM` es un tipo de **columna de PostgreSQL**, no un `enum` de TypeScript. En el código TS se sigue usando una unión de literales.

| Operación | Sequelize | SQL aproximado |
|---|---|---|
| Listar | `LibroModel.findAll()` | `SELECT * FROM libros` |
| Por id | `LibroModel.findByPk(id)` | `... WHERE id = $1` |
| Filtrar | `findAll({ where: { estado: "PRESTADO" } })` | `... WHERE estado = 'PRESTADO'` |
| Crear | `LibroModel.create({ titulo, autor })` | `INSERT ...` |
| Actualizar | `libro.update({ estado })` / `LibroModel.update({...}, { where })` | `UPDATE ...` |
| Eliminar | `LibroModel.destroy({ where: { id } })` | `DELETE ...` |
| Con relaciones | `findAll({ include: [UserModel] })` | `JOIN` |

Asociaciones:
```ts
RoleModel.hasMany(UserModel, { foreignKey: "roleId" });  UserModel.belongsTo(RoleModel, { foreignKey: "roleId" });
RoleModel.belongsToMany(PermissionModel, { through: "role_permissions" });
```
- `sequelize.sync()` crea las tablas a partir de los modelos (suficiente para el integrador). En proyectos grandes se usan **migraciones**.
- `sequelize.authenticate()` prueba la conexión.
- El **repositorio** es el **único** que importa modelos de Sequelize. El servicio trabaja con tipos de dominio (`Libro`), no con `LibroModel`. Así, cambiar de ORM solo afecta a los repositorios.

### 6.3 La conexión como Singleton
```ts
class DatabaseConnection {
  private static instance: DatabaseConnection | undefined;
  readonly sequelize: Sequelize;
  private constructor() {
    this.sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, { host: env.DB_HOST, dialect: "postgres", logging: false });
  }
  static getInstance(): DatabaseConnection { /* ... */ }
}
```
Una sola conexión (pool) para toda la app. Los datos salen de **variables de entorno**, no de valores fijos.

---

## 7. Los cuatro patrones en un mismo flujo

Cuando un operador cambia el estado de un libro, pasa esto, **en orden**:

1. `LibroService.changeStatus()` guarda el nuevo estado y le avisa al **`EventPublisher`** (Observer, el *Subject*).
2. El `EventPublisher` llama a `update()` en cada observer registrado. El que importa es **`NotificationService`**.
3. `NotificationService` consulta las **suscripciones** del libro. La base se alcanza a través de **`DatabaseConnection`** (Singleton).
4. Por cada suscriptor pide los canales a **`NotifierFactory.create('inapp')`** y **`NotifierFactory.create('console')`** (Factory).
5. **`InAppNotifier`** guarda la notificación en la base. **`ConsoleNotifierAdapter`** (Adapter) la convierte en texto y hace `console.log`.

```
PATCH /api/libros/1/estado  (authenticate → authorize('libro:change-status'))
   └─ LibroController.cambiarEstado
        └─ LibroService.changeStatus(1, "PRESTADO")
             ├─ libroRepo.actualizarEstado(...)                         → DB
             └─ publisher.notify({ libroId, estadoAnterior, estadoNuevo })     [Observer: Subject]
                  └─ NotificationService.update(evento)                        [Observer: Observer]
                       ├─ subscriptionRepo.findEmailsByLibro(1)          → DB  [Singleton detrás]
                       └─ por cada email, por cada canal:
                            factory.create("inapp").send(n)   → InAppNotifier → notificationRepo.save → DB   [Factory]
                            factory.create("console").send(n) → ConsoleNotifierAdapter → console.log        [Adapter]
```
Salida en la consola del backend:
```
[NOTIFICACIÓN] Para: usuario@tp.com | Libro #1 | Estado: DISPONIBLE → PRESTADO
```

Puntos clave:
- **Observers y suscripciones son dos cosas distintas:** los observers son **objetos del backend** que reaccionan al evento; las suscripciones son **datos guardados** que dicen qué usuario sigue qué libro. `NotificationService` (observer) **consulta** las suscripciones para saber a quién notificar.
- `NotificationService` **nunca** llama a `console.log` ni hace `new` de un canal: solo conoce `INotifier` y la fábrica.
- Para sumar un canal (por ejemplo, email): una clase que implementa `INotifier`, un caso nuevo en `NotifierFactory` y sumarlo a la lista de canales. `NotificationService` no cambia en su lógica.
- El Observer usa `async`/`Promise` porque los observers acceden a la base: `notify` hace `await observer.update(evento)`.

---

## 8. SOLID en el proyecto

| Principio | Dónde | Qué resuelve |
|---|---|---|
| **S** | Separación controllers / services / repositories | Cada capa tiene un solo motivo para cambiar |
| **O** | Canales de notificación (`INotifier` + fábrica) | Agregar un canal sin modificar `NotificationService` |
| **L** | Implementaciones de `INotifier` | Cualquier `INotifier` puede reemplazar a otro sin romper el flujo |
| **I** | `ILibroRepository`, `IUserRepository`, `ISubscriptionRepository`... | Interfaces de repositorio chicas y específicas |
| **D** | Services y `main.ts` | Los services dependen de interfaces de repositorio, no de implementaciones; todo se inyecta en el composition root |

---

## 9. Variables de entorno, CORS y configuración

- **dotenv** carga el archivo `.env` en `process.env`. El `.env` real **no se sube** (tiene secretos); se versiona **`.env.example`** con las claves y valores de ejemplo.
- Centralizá la lectura en un módulo (`config/env.ts`) que falle temprano si falta algo.
- **CORS** (*Cross-Origin Resource Sharing*): el navegador bloquea las peticiones de `http://localhost:5173` (frontend) a `http://localhost:3000` (backend) porque son **orígenes distintos**, salvo que el backend lo permita con la cabecera adecuada: `app.use(cors({ origin: "http://localhost:5173" }))`.
- `VITE_API_URL`: en Vite, solo las variables que empiezan con `VITE_` llegan al código del frontend (`import.meta.env.VITE_API_URL`), y se **incrustan al compilar** (por eso en Compose se pasan como `args` del build).

---

## 10. Docker y Docker Compose

### 10.1 Conceptos
| Concepto | Qué es |
|---|---|
| **Imagen** | La **plantilla** inmutable (sistema base + dependencias + tu código). Se construye con un `Dockerfile` |
| **Contenedor** | Una **instancia en ejecución** de una imagen |
| **Dockerfile** | Receta para construir una imagen |
| **`.dockerignore`** | Qué **no** copiar a la imagen (`node_modules`, `.env`, `dist`) |
| **Volumen** | Almacenamiento que **sobrevive** a los contenedores (los datos de PostgreSQL) |
| **Docker Compose** | Define y levanta **varios servicios juntos** desde un `docker-compose.yml` (`docker compose up --build`) |
| **Red de Compose** | Los servicios se alcanzan **por su nombre** (`db`, `backend`) |

### 10.2 Dockerfile del backend
```dockerfile
FROM node:24-alpine          # imagen base con Node
WORKDIR /app                 # carpeta de trabajo dentro del contenedor
COPY package*.json ./        # primero solo los package*.json → aprovecha la caché de capas
RUN npm install              # instala dependencias (capa cacheada si no cambió package.json)
COPY . .                     # después el código
EXPOSE 3000                  # documenta el puerto
CMD ["npx", "tsx", "src/main.ts"]
```
¿Por qué copiar `package*.json` antes que el resto? Cada instrucción es una **capa** cacheada. Si solo cambia el código, Docker reutiliza la capa de `npm install` y el build es mucho más rápido.

### 10.3 docker-compose.yml
```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - db_data:/var/lib/postgresql/data      # persistencia
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 10

  backend:
    build: ./backend
    env_file: .env
    ports:
      - "${API_PORT}:3000"                     # puerto_host:puerto_contenedor
    depends_on:
      db:
        condition: service_healthy            # espera a que PostgreSQL esté LISTO (no solo iniciado)

  frontend:
    build:
      context: ./frontend
      args:
        VITE_API_URL: ${VITE_API_URL}
    ports:
      - "5173:80"
    depends_on:
      - backend

volumes:
  db_data:
```
Puntos que se preguntan:
- **Dentro de Compose el backend se conecta a la base por el nombre del servicio** (`DB_HOST=db`), **no por `localhost`** (`localhost` sería el propio contenedor del backend).
- El volumen `db_data` hace que los datos **sobrevivan** si se baja el contenedor (`docker compose down`; solo `down -v` los borra).
- El **healthcheck** evita que el backend arranque antes de que PostgreSQL esté listo.
- **Mínimo obligatorio:** compose en la raíz que levante la base, un volumen, variables en `.env` con `.env.example` versionado. **Valorado (hasta 1 punto extra):** backend y frontend también en Compose, healthcheck con `depends_on` + `condition: service_healthy`, y seed automático al levantar.
- La cátedra va a: clonar el repo, `cp .env.example .env` y `docker compose up --build`. **Si con eso (más lo que diga el README) la app no funciona, el trabajo se considera no entregado.**

Comandos útiles:
```bash
docker compose up --build        # construye y levanta todo
docker compose up -d db          # solo la base, en segundo plano
docker compose logs -f backend   # ver la consola del backend (ahí aparecen las [NOTIFICACIÓN])
docker compose down              # baja (los datos quedan en el volumen)
docker compose down -v           # baja y BORRA el volumen
docker compose ps                # estado de los servicios
docker compose config            # valida y muestra el compose con las variables resueltas
```

---

## 11. Frontend (React)

- **Vite:** herramienta de desarrollo y build (`npm run dev`, `npm run build`).
- **React:** componentes (funciones que devuelven JSX), estado (`useState`), efectos (`useEffect`), contexto (`createContext` + `useContext`).
- **react-router:** `BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`, `Navigate`.
- **fetch nativo** (sin axios: no es una librería vista):
  ```ts
  const res = await fetch(`${API_URL}/libros`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error((await res.json()).error);
  const libros: Libro[] = await res.json();
  ```
- **Contexto de autenticación:** guarda el token y los permisos del usuario (en `localStorage` para no perderlos al recargar).
- **Control de acceso en la interfaz:** un componente `<Can permiso="libro:delete">...</Can>` que solo muestra su contenido si el usuario tiene el permiso. **Es solo un complemento**: la seguridad real está en el backend.
- **Notificaciones en la interfaz:** página que lista las notificaciones in-app (no leídas destacadas) y permite marcarlas como leídas. No se pide tiempo real (alcanza con recargar o consultar cada tanto).

---

## 12. Documentación

**README.md** (para alguien que nunca vio el proyecto): dominio, base de datos, integrantes, requisitos previos, pasos para levantarlo, variables de entorno, **usuarios de prueba** (admin, operador, usuario), **cómo probar el flujo de notificaciones** y los **endpoints principales con su permiso**.

**PATTERNS.md**: para cada patrón **y** cada principio SOLID: (1) la **ruta completa** del archivo, (2) **qué problema resuelve en este proyecto** (2 o 3 oraciones) y (3) un **fragmento breve** de código.

---

## 13. Defensa oral

Dura unos 15 minutos; la cátedra puede preguntarle a **cualquiera** de los dos integrantes sobre **cualquier** parte, o pedir una **modificación en vivo** (agregar un canal o un permiso).

| Pregunta | Respuesta |
|---|---|
| ¿Por qué el constructor del Singleton es privado? | Para que nadie pueda hacer `new DatabaseConnection()` y crear una segunda conexión; la única entrada es `getInstance()`. |
| ¿Qué diferencia hay entre un observer y una suscripción? | El observer es un objeto del backend que reacciona al evento; la suscripción es un dato guardado que indica qué usuario sigue qué libro. |
| ¿Por qué no se usa `EventEmitter`? | La consigna exige implementar el patrón a mano: usar `EventEmitter` lo dejaría resuelto por la librería. |
| ¿Cómo agregar un canal de email? | Una clase `EmailNotifier implements INotifier`, un caso nuevo en `NotifierFactory` y sumarlo a la lista de canales. `NotificationService` no cambia en su lógica. |
| ¿Dónde se validan los permisos y por qué ahí? | En el backend, con un middleware que responde 403. En el frontend solo se ocultan botones, pero alguien puede llamar al endpoint directo. |
| ¿Por qué los services no reciben `req` ni `res`? | Para que la lógica de negocio no dependa de Express y se pueda reutilizar y probar sin HTTP. |
| ¿Por qué el backend usa `DB_HOST=db` y no `localhost`? | Dentro de Compose cada servicio se alcanza por su nombre; `localhost` sería el propio contenedor del backend. |
| ¿Cómo agregarías un permiso nuevo (ej. `libro:export`)? | Agregarlo al seed (tabla de permisos y relación con los roles que corresponda), proteger la ruta con `authorize('libro:export')` y, opcionalmente, mostrar el botón con `<Can>`. |
| ¿Por qué bcrypt y no SHA-256? | bcrypt es lento a propósito y usa salt; SHA-256 es rápido (facilita la fuerza bruta). |
| ¿Qué hay en el JWT y qué no? | El id/email del usuario (`sub`) y el vencimiento. Nunca la contraseña: el payload se puede leer. |
| ¿401 o 403? | 401 si no hay token o es inválido; 403 si el token es válido pero falta el permiso. |
| ¿Qué es el composition root? | `main.ts`: el único lugar donde se crean (`new`) y conectan todas las dependencias. |
| ¿Por qué el repositorio se define como interfaz primero? | Para que los servicios dependan de la abstracción (DIP) y se pueda cambiar la implementación (Sequelize, memoria) sin tocarlos. |
| ¿Qué pasa con los datos si hago `docker compose down`? | Quedan en el volumen `db_data`; solo se borran con `down -v`. |
| ¿Imagen vs contenedor? | La imagen es la plantilla; el contenedor es una instancia en ejecución. |

---

## 14. Evaluación, prohibiciones y commits

| Criterio | Peso |
|---|---|
| Docker Compose y README (la app levanta siguiendo las instrucciones) | 15 % |
| Autenticación, roles y permisos | 15 % |
| Funcionalidad del recurso y suscripciones | 10 % |
| **Patrones de diseño (Singleton, Factory, Adapter, Observer)** | **30 %** |
| POO, SOLID, arquitectura en capas y tipado | 15 % |
| Frontend (notificaciones en la interfaz, control de acceso por permisos) | 10 % |
| `PATTERNS.md` | 5 % |

**No se aprueba si:** la app no levanta siguiendo el README, se usan librerías no vistas en clase, falta alguno de los cuatro patrones o está resuelto con una librería, o backend y frontend están mezclados en una misma carpeta o configurados como monorepo.

**Commits:** ambos integrantes necesitan commits **propios y significativos** a lo largo del desarrollo, con mensajes descriptivos (`feat(auth): login con JWT`). **Un único commit con todo el proyecto es una señal de alerta.**
