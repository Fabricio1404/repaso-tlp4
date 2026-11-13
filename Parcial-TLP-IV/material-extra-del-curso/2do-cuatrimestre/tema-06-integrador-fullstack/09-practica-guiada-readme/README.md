# Práctica guiada · Tema 6 · Integrador para otro dominio: Laboratorio de equipos

> La guía usa el dominio **C · Biblioteca**. Para practicar **sin copiar**, hacé el mismo TP con otro dominio: **Laboratorio de equipos** (recurso `Equipo`, estados `DISPONIBLE`, `EN_USO`, `EN_MANTENIMIENTO`).
> `inicio/` trae solo la configuración (dos proyectos independientes, Compose, `.env.example`) y un punto de partida del dominio. Todo lo demás lo construís vos. El proyecto de referencia (`../02-ejemplos/proyecto-referencia/`) es la "solución" de otro dominio: consultalo **después** de intentar cada etapa.

## 1. Consigna (adaptada de la guía de la cátedra)

| Capa | Tecnología |
|---|---|
| Frontend | React + TypeScript (Vite), `react-router`, `fetch` nativo |
| Backend | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL con Sequelize (`sequelize` + `pg`) |
| Infraestructura | Docker + Docker Compose |

- `"strict": true` en los dos proyectos; nada de `any` sin un comentario que lo justifique.
- Solo librerías vistas en clase. Backend: `express`, `cors`, `dotenv`, `jsonwebtoken`, `bcrypt`, `sequelize`, `pg`. Frontend: `react`, `react-dom`, `react-router`.
- Backend y frontend: proyectos independientes (cada uno con `package.json`, `tsconfig.json`, `Dockerfile`, `.dockerignore`). En la raíz **no** hay `package.json` ni workspaces.
- Los cuatro patrones **a mano** (sin `EventEmitter`, sin librerías de inyección de dependencias).

### Requisitos funcionales
1. **RF1 Autenticación:** registro y login con email y contraseña; bcrypt + JWT.
2. **RF2 Roles y permisos:** formato `recurso:accion`, cargados con un seed. Todo usuario nuevo es `usuario`. Validados en el backend (403).
3. **RF3 Gestión del equipo:** listar, ver detalle, crear, editar, cambiar estado y eliminar según el rol.
4. **RF4 Suscripciones:** suscribirse y desuscribirse de un equipo (en la base).
5. **RF5 Notificaciones:** al cambiar el estado de un equipo, cada suscriptor recibe una notificación **in-app** (en la base, leída/no leída) y por **consola** (`[NOTIFICACIÓN] Para: <email> | Equipo #<id> | Estado: <anterior> → <nuevo>`).
6. **RF6 Usuarios:** el administrador lista usuarios y les asigna un rol.

| Permiso | admin | operador | usuario |
|---|---|---|---|
| `equipo:read` | Sí | Sí | Sí |
| `equipo:create`, `equipo:update`, `equipo:change-status` | Sí | Sí | No |
| `equipo:delete` | Sí | No | No |
| `subscription:create`, `subscription:delete`, `notification:read` | Sí | Sí | Sí |
| `user:read`, `user:assign-role` | Sí | No | No |

### Arquitectura
`routes → controllers → services → repositories → base de datos`. Repositorios definidos primero como **interfaz**. Dependencias por constructor; todo se conecta en `src/main.ts`. Elegí organización **por tipo** o **por módulo** y respetala.

### Los 4 patrones en el flujo de cambio de estado
`EquipoService.changeStatus()` → `EventPublisher.notify()` (Observer) → `NotificationService.update()` consulta suscripciones (base vía `DatabaseConnection`, Singleton) → `NotifierFactory.create('inapp' | 'console')` (Factory) → `InAppNotifier` guarda / `ConsoleNotifierAdapter` imprime (Adapter).

### Docker
Mínimo: compose con la base, volumen, `.env` con `.env.example` versionado. Valorado (+1): backend y frontend en Compose, healthcheck + `condition: service_healthy`, seed automático.
La cátedra va a hacer: `cp .env.example .env && docker compose up --build`. Si no levanta → **no entregado**.

## 2. Plan de trabajo sugerido (7 etapas, con commits de los dos integrantes)

| Etapa | Objetivo | Listo cuando... | Commits de ejemplo |
|---|---|---|---|
| 1 | Repo, Compose con la base, backend que conecta (Singleton) | `docker compose up db` y el backend loguea "conectado" | `chore: estructura y docker compose`, `feat(db): conexión Singleton` |
| 2 | Modelos + seed (roles, permisos, usuarios de prueba, equipos) | Las tablas existen y el seed es idempotente | `feat(db): modelos y seed de permisos` |
| 3 | RF1: registro y login (bcrypt + JWT) + `authenticate` | Login devuelve token; sin token → 401 | `feat(auth): login con JWT` |
| 4 | RF2 + RF3: `authorize` y CRUD de equipos en capas | Usuario → 403 en DELETE; admin → 204 | `feat(equipos): CRUD con permisos` |
| 5 | RF4 + RF5: suscripciones y los 4 patrones | Al cambiar estado aparece la línea `[NOTIFICACIÓN]` y la notificación in-app | `feat(notificaciones): observer, factory y adapter` |
| 6 | Frontend + RF6 | Login, listado, detalle, notificaciones, usuarios; botones según permiso | `feat(front): pantallas y control de acceso` |
| 7 | README, PATTERNS.md, prueba "desde cero" y ensayo de la defensa | Un compañero clona, `cp .env.example .env`, `docker compose up --build` y funciona | `docs: README y PATTERNS` |

## 3. Checklist de entrega
- [ ] `docker compose up --build` desde un clon limpio levanta todo.
- [ ] `.env` **no** está en el repo; `.env.example` sí.
- [ ] Sin `node_modules` en el repo. Sin `package.json` en la raíz.
- [ ] Sin `any` sin justificar; `strict` en los dos.
- [ ] Solo las librerías permitidas.
- [ ] Los 4 patrones implementados a mano y documentados en `PATTERNS.md` (ruta, problema, fragmento) junto con los 5 principios SOLID.
- [ ] Sin token → 401; sin permiso → 403 (probado con curl o Postman).
- [ ] La línea `[NOTIFICACIÓN] ...` aparece en `docker compose logs backend` y la notificación in-app en el frontend.
- [ ] README con usuarios de prueba, flujo de notificaciones y endpoints con su permiso.
- [ ] Commits propios y significativos de los dos integrantes.

## 4. Rúbrica (la de la cátedra)
| Criterio | Peso |
|---|---|
| Docker Compose y README (levanta siguiendo las instrucciones) | 15 % |
| Autenticación, roles y permisos | 15 % |
| Funcionalidad del recurso y suscripciones | 10 % |
| Patrones de diseño (Singleton, Factory, Adapter, Observer) | 30 % |
| POO, SOLID, arquitectura en capas y tipado | 15 % |
| Frontend (notificaciones, control de acceso por permisos) | 10 % |
| PATTERNS.md | 5 % |

## 5. Guion de ensayo para la defensa (15 minutos, preguntan a cualquiera)
1. Mostrá `docker-compose.yml` y explicá `DB_HOST=db`, el volumen y el healthcheck.
2. Recorré el flujo del cambio de estado desde la ruta hasta las dos notificaciones, nombrando cada patrón.
3. Mostrá `authenticate` y `authorize`; explicá 401 vs 403 y por qué se valida en el backend.
4. Mostrá un service: ¿por qué no recibe `req` ni `res`? ¿De qué interfaces depende?
5. **Modificación en vivo:** practicá agregar un canal (ver `../07-ejercicios-dificiles`) y un permiso nuevo en menos de 10 minutos.
6. Respondé las preguntas de la sección 13 de `../01-teoria.md` sin mirar.
