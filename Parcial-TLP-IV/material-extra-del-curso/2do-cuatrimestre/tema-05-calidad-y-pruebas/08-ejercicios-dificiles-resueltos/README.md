# Tema 5 · Ejercicio difícil · API de turnos de un consultorio

> Mismo formato que el segundo parcial: una API en capas (Express + TypeScript) que **tiene defectos**. Hay que **escribir tests** (unitarios con dobles y de integración con Supertest), **descubrir** los defectos con ellos, **corregir el código** y agregar una funcionalidad **con TDD**.
> Tiempo sugerido: 90 minutos.

```bash
npm install
npm test            # al principio: 2 pasan y hay 12 "todo"
npm run typecheck
npm run dev         # opcional
```

## Estructura
```
src/
├── app.ts                       # crearApp({ repo?, notificador? }) — se usa en los tests
├── server.ts
├── routes/turno.routes.ts
├── controllers/turno.controller.ts
├── services/
│   ├── turno.service.ts
│   ├── validaciones.ts          # validarNuevoTurno()
│   └── notificador.ts           # interfaz Notificador + NotificadorMemoria
├── repositories/turno.repository.ts   # interfaz TurnoRepository + implementación en memoria
├── middlewares/manejo-errores.ts
├── models/turno.ts
├── data/turnos-iniciales.ts     # 3 turnos (el 3 está cancelado)
└── errors.ts                    # ValidacionError, NoEncontradoError, ConflictoError
```

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/turnos` | Lista todos |
| GET | `/turnos/:id` | Un turno |
| POST | `/turnos` | Reserva. Body: `{ paciente, fecha, hora }` |
| POST | `/turnos/:id/cancelar` | Cancela |
| DELETE | `/turnos/:id` | **No existe todavía** (tarea 4) |

## Reglas de negocio (mandan sobre el código y los tests)
| Regla | Descripción |
|---|---|
| **R1** | El paciente es obligatorio (no vacío ni solo espacios). Se guarda sin espacios al principio y al final. |
| **R2** | La fecha tiene formato `AAAA-MM-DD`. |
| **R3** | La hora tiene formato `HH:MM`. Los turnos son **de 08:00 a 19:30 inclusive**, cada media hora (minutos `00` o `30`). |
| **R4** | No puede haber dos turnos **reservados** en la misma fecha y hora (`ConflictoError`). Un turno cancelado libera su horario. |
| **R5** | Cancelar un turno reservado lo pasa a `"cancelado"`. Cancelar uno **ya cancelado** → `ConflictoError`. Si no existe → `NoEncontradoError`. |
| **R6** | Al reservar se notifica `"Turno reservado para el <fecha> a las <hora>"`; al cancelar, `"Tu turno del <fecha> a las <hora> fue cancelado"`. Si la operación falla, **no** se notifica. |
| **R7** | La API responde **201** al crear, **400** ante `ValidacionError`, **404** si no existe (`{ "error": "Turno no encontrado" }`) y **409** ante `ConflictoError`. |
| **R8** | `DELETE /turnos/:id` elimina el turno y responde **204** sin cuerpo; si no existe, **404** con `{ "error": "Turno no encontrado" }`. |

## Consigna
1. **Integración (`tests/api.test.ts`):** completá los 8 `it.todo` con Supertest. En el de datos inválidos usá `it.each` e incluí **los bordes de R3** (y escribí un test aparte para los bordes **válidos** 08:00 y 19:30).
2. **Unitarias (`tests/servicio.test.ts`):** completá los 4 `it.todo` con los dobles dados (`vi.fn()`), verificando lo que se llama **y lo que no** se llama.
3. **Defectos:** los tests (que coinciden con las reglas) van a revelar **4 defectos** en el código. Corregilos **sin tocar los tests**. Pista: seguí el recorrido de la petición desde la ruta hasta el servicio.
4. **TDD (R8):** escribí primero los tests de `DELETE /turnos/:id` (existente → 204 y ya no aparece en la lista; inexistente → 404). Ejecutalos: **tienen que fallar** (rojo). Después implementá ruta, controlador y servicio (verde).
5. Completá `RESPUESTAS.md`.

## Entrega
`npm test` todo en verde (sin `todo`) y `npm run typecheck` sin errores.
