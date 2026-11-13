# Tema 6 · Ejemplos: proyecto de referencia del integrador

`proyecto-referencia/` es una implementación **completa** del TP integrador (dominio C · Biblioteca) que cumple la consigna de la guía:

- Backend Express + TypeScript en capas, PostgreSQL + Sequelize, bcrypt + JWT, permisos `recurso:accion` con seed, los **4 patrones** en el flujo de cambio de estado.
- Frontend React + Vite + react-router + fetch, con control de acceso por permisos (`<Can>`) y página de notificaciones.
- `docker-compose.yml` con healthcheck, volumen, `env_file` y build args; `.env.example`; `README.md` y `PATTERNS.md` como pide la cátedra.

## Verificación hecha sobre este proyecto
- Backend: `tsc --noEmit` sin errores; 11 pruebas (Supertest, repositorios en memoria) en verde: 401/403, login, registro con rol `usuario`, asignación de rol, suscripción, cambio de estado con notificación por los dos canales.
- Los repositorios de Sequelize se ejecutaron contra una base SQLite en memoria (misma API de Sequelize): seed idempotente, login, notificaciones, roles y borrado funcionan.
- Frontend: `tsc --noEmit` y `vite build` sin errores.
- No se ejecutó `docker compose up` (requiere Docker con red). Validalo vos con `docker compose config` y `docker compose up --build`.

## Cómo recorrerlo para estudiar
1. `backend/src/main.ts` → `contenedor.ts`: cómo se conecta todo.
2. El flujo de los 4 patrones: `services/LibroService.ts` (changeStatus) → `observer/EventPublisher.ts` → `services/NotificationService.ts` → `notifications/NotifierFactory.ts` → `InAppNotifier.ts` / `ConsoleNotifierAdapter.ts`.
3. Seguridad: `services/AuthService.ts` → `middlewares/authenticate.ts` → `middlewares/authorize.ts` → `routes/index.ts`.
4. Datos: `database/DatabaseConnection.ts` → `database/models.ts` → `repositories/sequelize/index.ts`.
5. Frontend: `src/api.ts` → `src/auth/AuthContext.tsx` → `src/components/Can.tsx` → `src/pages/`.
6. `MAPA-DE-CONCEPTOS.md` (en esta carpeta) lista cada concepto con su archivo y línea.

```bash
cd proyecto-referencia/backend && npm install && npm run demo && npm test
```
