# Respuestas · API de turnos (resueltas)

## Defectos encontrados

| # | Test que lo reveló | Regla | Archivo y causa | Corrección |
|---|---|---|---|---|
| 1 | `POST /turnos con hora 20:00 (después de 19:30) → 400` | R3 | `services/validaciones.ts`: `h > 20` aceptaba 20:00 y 20:30 | `h > 19` (con minutos 00/30, el máximo queda en 19:30) |
| 2 | `GET /turnos/:id inexistente → 404` | R7 | `controllers/turno.controller.ts`: `obtener` llamaba a `service.buscar`, que devuelve `undefined`; `res.json(undefined)` responde **200** con cuerpo vacío | Llamar a `service.obtener`, que lanza `NoEncontradoError` → el middleware responde 404 |
| 3 | `POST /turnos válido → 201` (y los otros POST válidos) | R7 | `controllers/turno.controller.ts`: `res.json(...)` responde 200 por defecto | `res.status(201).json(...)` |
| 4 | `POST /turnos/:id/cancelar de un turno ya cancelado → 409` y la unitaria `cancelar un turno ya cancelado...` | R5 y R6 | `services/turno.service.ts`: `cancelar` no controlaba el estado; además notificaba otra vez | `if (t.estado === 'cancelado') throw new ConflictoError(...)` **antes** de actualizar y notificar |

## TDD (R8)
- Antes de implementar, `DELETE /turnos/2` respondía **404** con el HTML de Express ("Cannot DELETE /turnos/2"), porque la **ruta no existía**. El test de "existente → 204" fallaba (rojo). Ojo: el de "inexistente → 404" podía parecer que pasaba por el código, pero fallaba por el cuerpo (`toEqual({ error: ... })`).
- Archivos: `routes/turno.routes.ts` (ruta `router.delete`), `controllers/turno.controller.ts` (`eliminar` → `res.status(204).send()`), `services/turno.service.ts` (`eliminar` que usa `repo.eliminar` y lanza `NoEncontradoError` si devuelve `false`). El repositorio ya tenía `eliminar`.

## Preguntas
1. El defecto estaba en el **controlador** (capa de presentación). El servicio estaba bien (`obtener` sí lanzaba). Un test unitario del servicio no pasa por el controlador; hacía falta una prueba de **integración** (Supertest) que recorra ruta → controlador → servicio.
2. Permite **inyectar un doble** en una prueba de integración (`NotificadorMemoria`) y verificar el efecto (el mensaje enviado) sin imprimir ni enviar nada real. Es DIP aplicado al *composition root*.
