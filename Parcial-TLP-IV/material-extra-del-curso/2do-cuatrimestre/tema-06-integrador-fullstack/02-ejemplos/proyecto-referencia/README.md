# Biblioteca · TP integrador TLP IV (proyecto de referencia)

Aplicación web full stack en TypeScript. **Dominio C · Biblioteca**: recurso `Libro` con estados `DISPONIBLE`, `PRESTADO`, `EN_REPARACION`. Usuarios con roles y permisos, suscripciones a libros y notificaciones (in-app y por consola) cuando cambia el estado de un libro.

- **Base de datos:** PostgreSQL 16 con Sequelize.
- **Integrantes:** (completar: nombre, apellido y usuario de GitHub de cada uno).

## Requisitos previos
- Docker y Docker Compose (v2: `docker compose`).
- Opcional, para desarrollo sin Docker: Node.js 22+ y un PostgreSQL local.

## Cómo levantarlo (lo que hace la cátedra)
```bash
git clone <repo> && cd <repo>
cp .env.example .env
docker compose up --build
```
- Frontend: http://localhost:5173
- API: http://localhost:3000/api (salud: http://localhost:3000/health)
- El backend espera a que PostgreSQL esté listo (healthcheck), crea las tablas (`sequelize.sync()`) y ejecuta el **seed automáticamente** (roles, permisos, usuarios de prueba, 3 libros y una suscripción).

Bajar todo: `docker compose down` (los datos quedan en el volumen `db_data`). Borrar también los datos: `docker compose down -v`.

## Variables de entorno (`.env`)
| Variable | Ejemplo | Para qué |
|---|---|---|
| `DB_HOST` | `db` | Host de PostgreSQL. **Dentro de Compose es el nombre del servicio**, no `localhost` |
| `DB_PORT` | `5432` | Puerto de PostgreSQL |
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` | `tlp4` / `tlp4` / `tp_integrador` | Credenciales (las usa también el contenedor de PostgreSQL) |
| `JWT_SECRET` | `cambiar-esto` | Secreto para firmar los JWT |
| `JWT_EXPIRES_IN` | `2h` | Vencimiento del token |
| `API_PORT` | `3000` | Puerto del **host** donde se publica la API |
| `CORS_ORIGIN` | `http://localhost:5173` | Origen permitido para el frontend |
| `VITE_API_URL` | `http://localhost:3000/api` | URL de la API que usa el frontend (se incrusta al compilar) |

## Usuarios de prueba
| Rol | Email | Contraseña |
|---|---|---|
| admin | `admin@tp.com` | `Admin123` |
| operador | `operador@tp.com` | `Operador123` |
| usuario | `usuario@tp.com` | `Usuario123` |

Todo usuario nuevo (registro) tiene rol `usuario`.

## Cómo probar el flujo de notificaciones
1. Ingresá como **usuario@tp.com** → abrí "Rayuela" → "Suscribirme" (el seed ya lo deja suscripto a Rayuela).
2. En otra ventana (o después de salir), ingresá como **operador@tp.com** → abrí "Rayuela" → cambiá el estado a `PRESTADO`.
3. En la consola del backend (`docker compose logs -f backend`) aparece:
   ```
   [NOTIFICACIÓN] Para: usuario@tp.com | Libro #1 | Estado: DISPONIBLE → PRESTADO
   ```
4. Volvé a ingresar como **usuario@tp.com** → "Notificaciones": aparece la notificación **no leída** (en negrita) → "Marcar como leída".

Con curl:
```bash
TOKEN=$(curl -s -X POST localhost:3000/api/auth/login -H 'Content-Type: application/json' \
  -d '{"email":"operador@tp.com","password":"Operador123"}' | sed -E 's/.*"token":"([^"]+)".*/\1/')
curl -X PATCH localhost:3000/api/libros/1/estado -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' -d '{"estado":"PRESTADO"}'
```

Sin Docker ni base de datos, el flujo se puede ver con la demo en memoria: `cd backend && npm install && npm run demo`.

## Endpoints principales (prefijo `/api`)
| Método | Ruta | Permiso |
|---|---|---|
| POST | `/auth/register` | público |
| POST | `/auth/login` | público |
| GET | `/auth/me` | autenticado |
| GET | `/libros` | `libro:read` |
| GET | `/libros/:id` | `libro:read` |
| POST | `/libros` | `libro:create` |
| PUT | `/libros/:id` | `libro:update` |
| PATCH | `/libros/:id/estado` | `libro:change-status` |
| DELETE | `/libros/:id` | `libro:delete` |
| POST | `/libros/:id/suscripcion` | `subscription:create` |
| DELETE | `/libros/:id/suscripcion` | `subscription:delete` |
| GET | `/notificaciones` | `notification:read` |
| PATCH | `/notificaciones/:id/leida` | `notification:read` |
| GET | `/usuarios` | `user:read` |
| PATCH | `/usuarios/:id/rol` | `user:assign-role` |

Sin token → **401**. Con token válido pero sin el permiso → **403** (aunque se llame con Postman o curl).

## Estructura
```
.
├── docker-compose.yml   .env.example   README.md   PATTERNS.md
├── backend/   (proyecto independiente: package.json, tsconfig.json, Dockerfile, .dockerignore)
│   └── src/
│       ├── main.ts                    ← composition root (arranque real con PostgreSQL)
│       ├── contenedor.ts              ← cableado de servicios + Observer + Factory (lo usa main.ts, la demo y los tests)
│       ├── app.ts                     ← Express (CORS, JSON, rutas, errores)
│       ├── config/env.ts
│       ├── domain/                    ← tipos y errores de dominio
│       ├── database/                  ← DatabaseConnection (Singleton), modelos, seed
│       ├── repositories/              ← interfaces.ts + sequelize/ + memory/
│       ├── observer/                  ← IObserver, ISubject, EventPublisher
│       ├── notifications/             ← INotifier, InAppNotifier, ConsoleNotifierAdapter, NotifierFactory
│       ├── services/                  ← Auth, Libro, Subscription, Notification, User
│       ├── controllers/  middlewares/  routes/
│       └── demo-flujo.ts
└── frontend/  (proyecto independiente: React + Vite + react-router + fetch)
```
Organización del backend: **por tipo de archivo** (se respeta en todo el proyecto).

## Scripts
Backend: `npm run dev` · `npm start` · `npm run demo` · `npm run typecheck` · `npm test` (pruebas opcionales con repositorios en memoria).
Frontend: `npm run dev` · `npm run build` · `npm run typecheck`.

## Librerías
Backend: `express`, `cors`, `dotenv`, `jsonwebtoken`, `bcrypt`, `sequelize`, `pg` (+ herramientas de desarrollo: `typescript`, `tsx`, `@types/*`, `vitest`, `supertest`). Frontend: `react`, `react-dom`, `react-router` (+ `vite`, `@vitejs/plugin-react`, `typescript`, `@types/*`).
