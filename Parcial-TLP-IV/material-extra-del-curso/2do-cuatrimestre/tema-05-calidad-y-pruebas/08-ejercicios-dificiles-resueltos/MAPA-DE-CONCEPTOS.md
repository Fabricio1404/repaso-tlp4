# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **DEFECTO 2 CORREGIDO - R7** → `src/controllers/turno.controller.ts` L17
- **DEFECTO 3 CORREGIDO - R7** → `src/controllers/turno.controller.ts` L22
- **TDD - R8** → `src/controllers/turno.controller.ts` L30–33, `src/routes/turno.routes.ts` L11, `src/services/turno.service.ts` L55–59, `tests/api.test.ts` L92–107
- **DEFECTO 4 CORREGIDO - R5** → `src/services/turno.service.ts` L45–47
- **DEFECTO 1 CORREGIDO - R3** → `src/services/validaciones.ts` L17–19
- **REVELÓ EL DEFECTO 2** → `tests/api.test.ts` L20–24
- **REVELÓ EL DEFECTO 3** → `tests/api.test.ts` L27–31
- **HORARIO DE UN TURNO CANCELADO** → `tests/api.test.ts` L40–43
- **IT.EACH + LÍMITES DE R3** → `tests/api.test.ts` L46–53
- **REVELÓ EL DEFECTO 4** → `tests/api.test.ts` L73–76
- **INTEGRACIÓN CON DEPENDENCIA INYECTADA** → `tests/api.test.ts` L84–88
- **STUB** → `tests/servicio.test.ts` L42
- **REVELÓ EL DEFECTO 4 A NIVEL UNITARIO** → `tests/servicio.test.ts` L61–69

## Detalle archivo por archivo


### `src/controllers/turno.controller.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 17 | **DEFECTO 2 CORREGIDO - R7** | `res.json(this.service.obtener(Number(req.params.id)));` | Antes: service.buscar (devolvía undefined → 200 con cuerpo vacío). obtener lanza NoEncontradoError → 404 |
| 22 | **DEFECTO 3 CORREGIDO - R7** | `res.status(201).json(this.service.reservar(req.body));` | Antes: res.json (200). Crear un recurso responde 201 |
| 30–33 | **TDD - R8** | `eliminar = (req: Request, res: Response): void => {` | Método nuevo: 204 sin cuerpo |

### `src/routes/turno.routes.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 11 | **TDD - R8** | `router.delete('/turnos/:id', controller.eliminar);` | Ruta nueva |

### `src/services/turno.service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 45–47 | **DEFECTO 4 CORREGIDO - R5** | `if (t.estado === 'cancelado') {` | Faltaba controlar que ya estuviera cancelado (antes de actualizar y notificar) |
| 55–59 | **TDD - R8** | `eliminar(id: number): void {` | Escrito DESPUÉS de los tests (que primero fallaron: rojo) |

### `src/services/validaciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 17–19 | **DEFECTO 1 CORREGIDO - R3** | `if (h < 8 \|\| h > 19 \|\| (m !== 0 && m !== 30)) {` | Antes: h > 20 (aceptaba 20:00 y 20:30). El último turno es 19:30 |

### `tests/api.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 20–24 | **REVELÓ EL DEFECTO 2** | `it('GET /turnos/:id inexistente → 404 { error: "Turno no encontrado...` | Respondía 200 con cuerpo vacío |
| 27–31 | **REVELÓ EL DEFECTO 3** | `it('POST /turnos válido → 201 con el turno creado en estado "reserv...` | Respondía 200 en vez de 201 |
| 40–43 | **HORARIO DE UN TURNO CANCELADO** | `it('POST /turnos en el horario de un turno cancelado → 201', async ...` | Un turno cancelado libera el horario (R4 habla de turnos reservados) |
| 46–53 | **IT.EACH + LÍMITES DE R3** | `it.each([` | 20:00 reveló el DEFECTO 1; 07:30 y 10:15 son inválidos por otras razones |
| 73–76 | **REVELÓ EL DEFECTO 4** | `it('POST /turnos/:id/cancelar de un turno ya cancelado → 409', asyn...` | Respondía 200 y notificaba de nuevo |
| 84–88 | **INTEGRACIÓN CON DEPENDENCIA INYECTADA** | `it('reservar por la API notifica al paciente', async () => {` | Se le pasa un notificador propio a crearApp para verificar el efecto |
| 92–107 | **TDD - R8** | `describe('DELETE /turnos/:id (TDD)', () => {` | Estos tests se escribieron ANTES que el código: primero fallaron (404 de Express porque no existía la ruta) |

### `tests/servicio.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 42 | **STUB** | `const repo = crearRepositorioFalso(undefined, reservado);` | buscarReservado devuelve un turno → el horario está ocupado |
| 61–69 | **REVELÓ EL DEFECTO 4 A NIVEL UNITARIO** | `it('cancelar un turno ya cancelado lanza ConflictoError y NO actual...` |  |
