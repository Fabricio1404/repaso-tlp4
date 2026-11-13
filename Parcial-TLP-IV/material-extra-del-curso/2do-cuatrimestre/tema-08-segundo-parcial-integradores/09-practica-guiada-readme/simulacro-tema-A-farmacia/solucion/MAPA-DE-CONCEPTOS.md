# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **EJ1 · CÓDIGO - R3** → `src/services/descuentos.ts` L10–12
- **EJ1 · CÓDIGO - R1** → `src/services/descuentos.ts` L17–19
- **EJ3b · CORRECCIÓN - R8** → `src/services/medicamento.service.ts` L18
- **EJ2 · DEFECTO 1 - R5** → `src/services/validaciones.ts` L13–15
- **EJ2 · DEFECTO 2 - R6** → `src/services/validaciones.ts` L20–22
- **EJ1 · TEST - R3** → `tests/ej1-reglas-negocio.test.ts` L29–31
- **EJ1 · TEST - R7** → `tests/ej1-reglas-negocio.test.ts` L49–51
- **CASOS LÍMITE** → `tests/ej2-validaciones.test.ts` L13–15
- **CASOS INVÁLIDOS** → `tests/ej2-validaciones.test.ts` L26–35
- **EJ3b · ROJO → VERDE** → `tests/ej3-servicio-y-api.test.ts` L53–57

## Detalle archivo por archivo


### `src/services/descuentos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–12 | **EJ1 · CÓDIGO - R3** | `if (!Number.isInteger(edad) \|\| edad < 0 \|\| edad > 120) {` | Faltaba validar la edad (entero de 0 a 120) |
| 17–19 | **EJ1 · CÓDIGO - R1** | `if (edad >= 65) {` | Antes: edad > 65. R1 dice "65 años o más" |

### `src/services/medicamento.service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18 | **EJ3b · CORRECCIÓN - R8** | `throw new NoEncontradoError('Medicamento no encontrado');` | Antes: new Error(...) genérico → el middleware no lo reconocía → 500 |

### `src/services/validaciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 13–15 | **EJ2 · DEFECTO 1 - R5** | `if (typeof datos.laboratorio !== 'string' \|\| datos.laboratorio.tr...` | Faltaba por completo la validación del laboratorio |
| 20–22 | **EJ2 · DEFECTO 2 - R6** | `if (!Number.isInteger(datos.stock) \|\| datos.stock < 0) {` | Antes: typeof number (aceptaba 2.5 y NaN). R6: entero |

### `tests/ej1-reglas-negocio.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 29–31 | **EJ1 · TEST - R3** | `it('con un monto de $0 el descuento es $0', () => {` | "con monto $0 el descuento es $0": 0 es válido |
| 49–51 | **EJ1 · TEST - R7** | `it('rechaza vender 0 unidades', () => {` | Cantidad 0 es un dato inválido → ValidacionError, no falta de stock |

### `tests/ej2-validaciones.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 13–15 | **CASOS LÍMITE** | `it('acepta stock 0 (límite de R6)', () => {` |  |
| 26–35 | **CASOS INVÁLIDOS** | `it.each([` | Uno o más por regla |

### `tests/ej3-servicio-y-api.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 53–57 | **EJ3b · ROJO → VERDE** | `it('GET /medicamentos/:id de un medicamento inexistente responde 40...` | Antes respondía 500 (Error genérico) |
