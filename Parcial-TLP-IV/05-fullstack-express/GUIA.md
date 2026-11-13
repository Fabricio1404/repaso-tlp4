# 05 · Aplicación full stack: Express en capas, JWT, permisos, Sequelize y Docker

> **Requisito:** temas 01 a 04.
> **Para qué sirve:** es el **integrador** (Biblioteca) y es el tipo de proyecto que te dan en el segundo parcial. Aunque el parcial evalúe solo testing, **tenés que entender cómo está armado** el proyecto para encontrar los defectos.
> **Para profundizar:** [material-extra-del-curso/2do-cuatrimestre/tema-06-integrador-fullstack/01-teoria.md](../material-extra-del-curso/2do-cuatrimestre/tema-06-integrador-fullstack/01-teoria.md) tiene el detalle completo del integrador y las preguntas de la defensa oral.

---

## 1. Las piezas de una aplicación web

```
┌────────────────┐     HTTP (JSON)      ┌──────────────────┐     SQL      ┌──────────────┐
│  FRONTEND      │  ───────────────────►│  BACKEND (API)   │ ───────────► │ BASE DE DATOS│
│  React         │  ◄───────────────────│  Express + TS    │ ◄─────────── │ PostgreSQL   │
│  (navegador)   │     respuesta        │  (servidor)      │              │              │
└────────────────┘                      └──────────────────┘              └──────────────┘
```

| Pieza | Qué hace | Con qué |
|---|---|---|
| **Frontend** | Lo que ve el usuario. Pide datos al backend | React + Vite + `react-router` + `fetch` |
| **Backend / API** | Recibe peticiones, aplica reglas de negocio, habla con la base | Node + Express + TypeScript |
| **Base de datos** | Guarda los datos de forma permanente | PostgreSQL + Sequelize (ORM) |
| **Infraestructura** | Levanta todo junto igual en cualquier compu | Docker + Docker Compose |

**API REST** = una forma de diseñar el backend donde cada **recurso** (libros, usuarios) tiene una URL y se manipula con los **métodos HTTP**:

| Método | Para qué | Ejemplo | Respuesta típica |
|---|---|---|---|
| `GET` | Leer | `GET /libros`, `GET /libros/1` | 200 |
| `POST` | Crear | `POST /libros` con un JSON | 201 |
| `PUT` / `PATCH` | Modificar (todo / una parte) | `PATCH /libros/1/estado` | 200 |
| `DELETE` | Borrar | `DELETE /libros/1` | 204 |

Una **petición** tiene: método, URL (con **params** `/libros/:id` y **query** `?dias=3`), **headers** (ej. `Authorization: Bearer <token>`) y **body** (JSON). Una **respuesta** tiene un **código de estado** (200, 404...) y un **body**.

---

## 2. Express desde cero

**Express** es una librería de Node para armar servidores HTTP.

```ts
import express from 'express';

const app = express();
app.use(express.json());             // middleware: convierte el body JSON en req.body

app.get('/saludo/:nombre', (req, res) => {          // ruta + handler
  res.json({ mensaje: `Hola ${req.params.nombre}` }); // responde 200 con JSON
});

app.listen(3000, () => console.log('Escuchando en http://localhost:3000'));
```

| Objeto | Qué tiene |
|---|---|
| `req.params` | Parámetros de la ruta: `/libros/:id` → `req.params.id` (¡siempre **string**! por eso `Number(req.params.id)`) |
| `req.query` | Query string: `/multas?dias=3` → `req.query.dias` (string) |
| `req.body` | Cuerpo JSON (necesita `express.json()`) |
| `req.headers` | Encabezados (`req.headers.authorization`) |
| `res.status(n)` | Pone el código de estado |
| `res.json(obj)` | Responde con JSON (si no pusiste status, es 200) |
| `res.locals` | "Mochila" para pasar datos entre middlewares de **una misma** petición (ej. el usuario autenticado) |

### 2.1 Middleware

Un **middleware** es una función `(req, res, next)` que se ejecuta **en cadena** antes de llegar al handler final. Puede: modificar `req`/`res`, **cortar** la cadena respondiendo, o pasar al siguiente con `next()`.

```ts
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();                       // ← sin esto, la petición queda colgada
}
app.use(logger);                // se aplica a todas las rutas
```

Orden de una petición típica:
```
express.json() → cors() → router → authenticate → authorize('libro:create') → controller → (si hay error) → manejarErrores
```

El **middleware de errores** tiene **4 parámetros** `(err, req, res, next)` y va **al final**. En **Express 5**, si un controlador lanza un error (o una promesa se rechaza), llega solo a este middleware.

### 2.2 Router

Agrupa rutas de un mismo recurso:
```ts
const router = Router();
router.get('/libros', controller.listar);
router.get('/libros/:id', controller.obtener);
router.post('/libros', authenticate, authorize('libro:create'), controller.crear);
app.use('/api', router);        // todas quedan bajo /api
```
> **Ojo con el orden:** `router.get('/libros/:id')` antes de `router.get('/libros/disponibles')` hace que "disponibles" se tome como un `:id`. Las rutas fijas van **antes** que las de parámetro.

### 2.3 Controladores como funciones flecha

```ts
export class LibroController {
  private service: LibroService;
  constructor(service: LibroService) { this.service = service; }

  obtener = (req: Request, res: Response) => {      // ← flecha, no método normal
    res.json(this.service.obtener(Number(req.params.id)));
  };
}
```
**¿Por qué flecha?** Porque se pasa como `router.get('/x', controller.obtener)`: se pasa **la función suelta**, y un método normal perdería el `this` (quedaría `undefined`). La función flecha **captura** el `this` de la instancia.

---

## 3. Arquitectura en capas y composition root

```
routes/        → qué URL va a qué controlador (+ middlewares de auth)
controllers/   → traduce HTTP ↔ servicio. Lee params/body, pone status. SIN reglas de negocio
services/      → REGLAS DE NEGOCIO. Valida, calcula, lanza errores de dominio
repositories/  → acceso a datos (Sequelize / en memoria), detrás de una INTERFACE
models/        → tipos del dominio / modelos de Sequelize
middlewares/   → authenticate, authorize, manejarErrores
errors.ts      → errores propios (ValidacionError, NoEncontradoError...)
app.ts         → COMPOSITION ROOT: crea repos → services → controllers → routes
server.ts      → app.listen(...)
```

- Es **SRP** aplicado (cada capa, un motivo para cambiar) y **DIP** (el servicio recibe la interface del repositorio).
- **Composition root** (`app.ts` / `main.ts`): el **único** lugar donde se hace `new` de las clases concretas y se conectan.
- **¿Por qué `app.ts` separado de `server.ts`?** Para que los tests importen la app (Supertest) sin abrir un puerto.

---

## 4. Autenticación: bcrypt y JWT

**Autenticación** = ¿quién sos? **Autorización** = ¿qué podés hacer?

### 4.1 Contraseñas con bcrypt

**Nunca** se guarda la contraseña en texto plano. Se guarda un **hash**:
- Un **hash** es una función de **un solo sentido**: de la contraseña sale el hash, pero del hash **no** se puede volver a la contraseña.
- **bcrypt** es una función de hash **lenta a propósito** (dificulta probar millones de contraseñas) y con **salt** (un valor aleatorio que hace que dos usuarios con la misma contraseña tengan hashes distintos).

```ts
import bcrypt from 'bcrypt';
const hash = await bcrypt.hash('miClave123', 10);         // al REGISTRAR (10 = costo)
const ok = await bcrypt.compare('miClave123', hash);       // al hacer LOGIN → true/false
```

> SHA-256 directo **no** es apropiado para contraseñas (es demasiado rápido). Se usan **bcrypt, scrypt o Argon2id** (ver tema 09).

### 4.2 Sesión con JWT

**JWT (JSON Web Token)** = un texto con 3 partes separadas por puntos: `header.payload.firma`.

```
eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOjEsImV4cCI6MTczMDAwMH0 . 3kF9...firma
       header               payload (datos, ej. id del usuario)        firma con el SECRETO
```

- El **payload se puede leer** (es Base64, no está cifrado) → **no pongas contraseñas** adentro.
- La **firma** impide **modificarlo**: si alguien cambia el payload, la firma deja de coincidir y el servidor lo rechaza. Solo el servidor conoce el **secreto** (`JWT_SECRET` en `.env`).
- Tiene **vencimiento** (`exp`).

Flujo:
```
1. POST /auth/login { email, password }
2. Backend: busca usuario → bcrypt.compare → jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '2h' })
3. Responde { token }
4. Front guarda el token y lo manda en cada petición:  Authorization: Bearer <token>
5. Middleware authenticate: jwt.verify(token, JWT_SECRET) → si es válido, res.locals.usuarioId = payload.sub
```

```ts
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;               // "Bearer eyJ..."
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Falta el token' });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET);
    res.locals.usuarioId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o vencido' });
  }
}
```

---

## 5. Autorización: roles y permisos `recurso:accion`

- **Permiso**: `recurso:accion` → `libro:create`, `libro:delete`, `user:assign-role`.
- **Rol**: conjunto de permisos (`admin`, `operador`, `usuario`).
- **Usuario → rol → permisos.** Se cargan con un **seed** (script que inserta los datos iniciales).

```ts
export function authorize(permiso: string) {            // función que DEVUELVE un middleware
  return (_req: Request, res: Response, next: NextFunction): void => {
    const permisos = res.locals.permisos as string[] | undefined;
    if (permisos === undefined || !permisos.includes(permiso)) {
      res.status(403).json({ error: 'No tenés permiso para esta acción' });
      return;
    }
    next();
  };
}

router.delete('/libros/:id', authenticate, authorize('libro:delete'), controller.eliminar);
```

| Código | Significa | Ejemplo |
|---|---|---|
| **401** Unauthorized | **No sé quién sos** (sin token / token inválido o vencido) | Llamar sin header `Authorization` |
| **403** Forbidden | **Sé quién sos, pero no podés** | Un `usuario` intenta `DELETE /libros/1` |

> **Los permisos se validan en el BACKEND.** Ocultar un botón en React es solo comodidad: cualquiera puede llamar al endpoint con Postman o `curl`.

---

## 6. Base de datos: PostgreSQL y Sequelize

- **PostgreSQL**: base de datos **relacional** (tablas con filas y columnas, relaciones por claves foráneas).
- **ORM (Object-Relational Mapping)**: traduce entre **tablas** y **objetos**. **Sequelize** es el ORM que se usa.

| Sequelize | SQL |
|---|---|
| `LibroModel.findAll()` | `SELECT * FROM libros` |
| `LibroModel.findByPk(1)` | `SELECT * FROM libros WHERE id = 1` |
| `LibroModel.create({ titulo })` | `INSERT INTO libros ...` |
| `libro.update({ estado })` | `UPDATE libros SET ...` |
| `LibroModel.destroy({ where: { id } })` | `DELETE FROM libros WHERE ...` |

- **El repositorio es el único que conoce Sequelize.** El servicio trabaja con tipos del dominio. Si mañana se cambia de ORM, solo cambian los repositorios (DIP).
- La conexión es un **Singleton** (`DatabaseConnection.getInstance()`): una sola conexión (pool) para toda la app.
- **Inyección SQL**: nunca armar consultas concatenando texto del usuario (`"... WHERE id = " + req.params.id`). Se usan **parámetros** (`$1`) o el ORM.

---

## 7. Los cuatro patrones en el integrador

```
PATCH /api/libros/1/estado   (authenticate → authorize('libro:change-status'))
  └─ LibroController.cambiarEstado
       └─ LibroService.changeStatus(1, "PRESTADO")
            ├─ libroRepo.actualizarEstado(...)
            └─ publisher.notify(evento)                         ← OBSERVER (sujeto)
                 └─ NotificationService.update(evento)          ← OBSERVER (observador)
                      ├─ suscripciones del libro (DatabaseConnection)  ← SINGLETON
                      └─ NotifierFactory.create("inapp" | "console")   ← FACTORY
                           ├─ InAppNotifier (guarda en la base)
                           └─ ConsoleNotifierAdapter (console.log)     ← ADAPTER
```

- **Observers ≠ suscripciones**: los observers son **objetos del backend** que reaccionan; las suscripciones son **datos** (qué usuario sigue qué libro).
- **Canal nuevo** (ej. email) = clase que implementa `INotifier` + caso en `NotifierFactory` + agregarlo a la lista. `NotificationService` no cambia → **OCP**.

---

## 8. Variables de entorno y CORS

- **Variables de entorno** (`.env`): configuración que **no va en el código** (contraseñas, secretos, URLs). Se leen con `dotenv` y `process.env.X`.
  ```
  DB_HOST=db
  DB_USER=postgres
  DB_PASSWORD=postgres
  JWT_SECRET=un-secreto-largo
  ```
- El `.env` **nunca** se sube al repo (va en `.gitignore`). Se sube un **`.env.example`** con las claves y valores de ejemplo.
- **CORS** (*Cross-Origin Resource Sharing*): el **navegador** bloquea las peticiones de una página (origen `localhost:5173`) a otro origen (`localhost:3000`) **salvo** que el servidor lo permita. Se habilita con `app.use(cors({ origin: 'http://localhost:5173' }))`. Postman y curl **no** tienen CORS (es una protección del navegador).

---

## 9. Docker y Docker Compose

| Concepto | Qué es | Analogía |
|---|---|---|
| **Imagen** | Plantilla **inmutable** con el SO mínimo + Node + tu código + dependencias | Receta / molde (clase) |
| **Contenedor** | Una **instancia en ejecución** de una imagen, aislada | Torta hecha con la receta (objeto) |
| **Dockerfile** | Archivo con los pasos para **construir** una imagen | La receta escrita |
| **Volumen** | Almacenamiento que **sobrevive** a que el contenedor se borre | Un disco externo |
| **Docker Compose** | Define y levanta **varios contenedores** juntos (`docker-compose.yml`) | El menú completo |

**¿Por qué Docker?** "En mi máquina funciona" → con Docker, funciona **igual en todas**: misma versión de Node, de PostgreSQL, misma configuración.

**Contenedor vs máquina virtual:** una VM simula una **computadora entera** con su propio sistema operativo; un contenedor **comparte el kernel** del sistema anfitrión y solo aísla la aplicación → mucho más liviano y rápido (ver tema 08).

### Dockerfile del backend
```dockerfile
FROM node:22-alpine          # imagen base
WORKDIR /app                 # carpeta de trabajo dentro del contenedor
COPY package*.json ./        # primero solo las dependencias (aprovecha la caché)
RUN npm ci                   # instala
COPY . .                     # después el código
EXPOSE 3000                  # documenta el puerto
CMD ["npm", "start"]         # comando al arrancar
```
`.dockerignore` → `node_modules`, `.env` (que no se copien a la imagen).

### docker-compose.yml
```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: biblioteca
    volumes:
      - db_data:/var/lib/postgresql/data        # los datos sobreviven
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]   # ¿la base ya acepta conexiones?
      interval: 5s
      retries: 10
  backend:
    build: ./backend
    env_file: ./backend/.env
    environment:
      DB_HOST: db                                 # ← el NOMBRE DEL SERVICIO, no "localhost"
    ports:
      - "3000:3000"                               # puertoHost:puertoContenedor
    depends_on:
      db:
        condition: service_healthy                # espera a que la base esté LISTA
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
volumes:
  db_data:
```

**Preguntas de defensa clásicas:**
- **¿Por qué `DB_HOST=db` y no `localhost`?** Porque dentro de un contenedor, `localhost` es **el propio contenedor**. Compose crea una red donde cada servicio se alcanza **por su nombre**.
- **¿Para qué el `healthcheck`?** `depends_on` solo espera a que el contenedor **arranque**, no a que PostgreSQL **acepte conexiones**. Con `service_healthy` el backend espera a que `pg_isready` responda bien.
- **¿Para qué el volumen?** Sin volumen, al borrar el contenedor se pierden los datos.

Comandos:
```bash
cp .env.example .env
docker compose up --build      # construye y levanta todo
docker compose down            # apaga (conserva el volumen)
docker compose down -v         # apaga y BORRA los datos
docker compose logs backend    # ver logs
docker ps                      # contenedores corriendo
```

---

## 10. Frontend React (lo mínimo)

- **Componente**: función que devuelve JSX (HTML dentro de JS).
- **Estado** con `useState`, efectos (cargar datos al montar) con `useEffect`.
- **`fetch`** para llamar a la API, mandando el token: `headers: { Authorization: \`Bearer ${token}\` }`.
- **`react-router`** para las páginas (`/login`, `/libros`, `/libros/:id`).
- `<Can permiso="libro:delete">` → muestra un botón solo si el usuario tiene el permiso (**complemento**, la seguridad real está en el backend).

---

## 📌 Lo que tenés que saber sí o sí

- **REST**: recursos + métodos HTTP (GET leer, POST crear 201, PATCH/PUT modificar, DELETE borrar).
- **Middleware** `(req, res, next)` en cadena; el de errores tiene 4 parámetros y va al final.
- **Capas**: routes → controllers (HTTP) → services (negocio) → repositories (datos). **Composition root** en `app.ts`.
- **bcrypt**: hash lento con salt para contraseñas. **JWT**: `header.payload.firma`; el payload se **lee** pero no se puede **modificar** sin el secreto.
- **401** = no autenticado · **403** = sin permiso. Permisos `recurso:accion`, validados **en el backend**.
- **ORM** (Sequelize) traduce tablas ↔ objetos; solo los repositorios lo conocen. Conexión = **Singleton**.
- **`.env`** fuera del repo; **`.env.example`** sí. **CORS** lo aplica el navegador.
- **Imagen** (plantilla) vs **contenedor** (instancia). `DB_HOST=db`, **volumen** para persistir, **healthcheck** para esperar a la base.

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
