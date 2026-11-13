# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **EJ3b · CORRECCIÓN - R8** → `parcial2-tema-B-biblioteca-resuelto/src/controllers/libro.controller.ts` L15
- **EJ1 · CORRECCIÓN EN EL CÓDIGO - R7** → `parcial2-tema-B-biblioteca-resuelto/src/services/libro.service.ts` L41–45
- **EJ1 · CORRECCIÓN EN EL CÓDIGO - R3** → `parcial2-tema-B-biblioteca-resuelto/src/services/multas.ts` L10–12
- **EJ2 · DEFECTO 1 - R5** → `parcial2-tema-B-biblioteca-resuelto/src/services/validaciones.ts` L13–15
- **EJ2 · DEFECTO 2 - R6** → `parcial2-tema-B-biblioteca-resuelto/src/services/validaciones.ts` L17–19
- **EJ1 · CORRECCIÓN EN EL TEST - R3** → `parcial2-tema-B-biblioteca-resuelto/tests/ej1-reglas-negocio.test.ts` L21–23
- **CASOS LÍMITE** → `parcial2-tema-B-biblioteca-resuelto/tests/ej2-validaciones.test.ts` L14–16
- **CASOS INVÁLIDOS** → `parcial2-tema-B-biblioteca-resuelto/tests/ej2-validaciones.test.ts` L27–35
- **MENSAJE** → `parcial2-tema-B-biblioteca-resuelto/tests/ej2-validaciones.test.ts` L40–42
- **EJ3a · SPY** → `parcial2-tema-B-biblioteca-resuelto/tests/ej3-servicio-y-api.test.ts` L31
- **EJ3a · NOT.TOHAVEBEENCALLED** → `parcial2-tema-B-biblioteca-resuelto/tests/ej3-servicio-y-api.test.ts` L41
- **EJ3b · TDD ROJO → VERDE** → `parcial2-tema-B-biblioteca-resuelto/tests/ej3-servicio-y-api.test.ts` L62–67

## Detalle archivo por archivo


### `parcial2-tema-B-biblioteca-resuelto/src/controllers/libro.controller.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 15 | **EJ3b · CORRECCIÓN - R8** | `res.json(this.service.obtener(Number(req.params.id)));` | Antes: service.buscar → devolvía undefined → res.json(undefined) = 200 con cuerpo vacío. |

### `parcial2-tema-B-biblioteca-resuelto/src/services/libro.service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 41–45 | **EJ1 · CORRECCIÓN EN EL CÓDIGO - R7** | `if (cantidad > libro.ejemplares) {` | Antes: ejemplares - cantidad <= 0 (no dejaba prestar TODOS). Solo falla si se piden MÁS |

### `parcial2-tema-B-biblioteca-resuelto/src/services/multas.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–12 | **EJ1 · CORRECCIÓN EN EL CÓDIGO - R3** | `if (!Number.isInteger(diasDeRetraso) \|\| diasDeRetraso < 0) {` | Faltaba validar: entero >= 0, si no RangeError. 0 es VÁLIDO (multa $0) |

### `parcial2-tema-B-biblioteca-resuelto/src/services/validaciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 13–15 | **EJ2 · DEFECTO 1 - R5** | `if (typeof datos.autor !== 'string' \|\| datos.autor.trim() === '') {` | Antes volvía a validar datos.titulo (copiar y pegar): un autor vacío pasaba |
| 17–19 | **EJ2 · DEFECTO 2 - R6** | `if (!Number.isInteger(datos.ejemplares) \|\| datos.ejemplares < 1) {` | Antes: ejemplares < 0 (aceptaba 0). R6: entero mayor o igual a 1 |

### `parcial2-tema-B-biblioteca-resuelto/tests/ej1-reglas-negocio.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 21–23 | **EJ1 · CORRECCIÓN EN EL TEST - R3** | `it('sin retraso (0 días) la multa es $0', () => {` | "Sin retraso (0 días) la multa es $0": el test esperaba un error que la regla no pide |

### `parcial2-tema-B-biblioteca-resuelto/tests/ej2-validaciones.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14–16 | **CASOS LÍMITE** | `it('acepta exactamente 1 ejemplar (límite inferior de R6)', () => {` | Justo en el borde de cada regla |
| 27–35 | **CASOS INVÁLIDOS** | `it.each([` | Al menos uno por regla (R4, R5 y R6) |
| 40–42 | **MENSAJE** | `it('el autor vacío informa "El autor es obligatorio"', () => {` | Verifica que el error del autor sea el del autor (el defecto devolvía el del título... o nada) |

### `parcial2-tema-B-biblioteca-resuelto/tests/ej3-servicio-y-api.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 31 | **EJ3a · SPY** | `expect(repo.actualizar).toHaveBeenCalledTimes(1);` | Una sola llamada, con el libro completo y los ejemplares ya descontados (3 - 2 = 1) |
| 41 | **EJ3a · NOT.TOHAVEBEENCALLED** | `expect(repo.actualizar).not.toHaveBeenCalled();` | El servicio valida ANTES de guardar |
| 62–67 | **EJ3b · TDD ROJO → VERDE** | `it('GET /libros/:id de un libro inexistente responde 404 con un men...` | Antes de corregir el controlador fallaba: respondía 200 con cuerpo vacío |
