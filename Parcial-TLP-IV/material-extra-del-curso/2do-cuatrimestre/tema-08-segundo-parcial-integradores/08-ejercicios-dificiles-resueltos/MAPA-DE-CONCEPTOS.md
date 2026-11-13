# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **DEFECTO 3 CORREGIDO - R7** → `src/controllers/compra.controller.ts` L12
- **TDD - R8** → `src/controllers/compra.controller.ts` L24–26, `src/services/compra.service.ts` L46–48, `tests/api.test.ts` L48–62
- **DEFECTO 1 CORREGIDO - R4** → `src/cupones/cupones.ts` L33–35
- **FACTORY** → `src/cupones/cupones.ts` L41–54
- **DEFECTO 2 CORREGIDO - R3** → `src/cupones/cupones.ts` L45–52
- **DEFECTO 4 CORREGIDO - R7** → `src/middlewares/manejo-errores.ts` L6–9
- **TDD - R8 · ORDEN** → `src/routes/compra.routes.ts` L8
- **REVELÓ EL DEFECTO 3** → `tests/api.test.ts` L9–13
- **REVELÓ EL DEFECTO 4** → `tests/api.test.ts` L21–25
- **REVELÓ EL DEFECTO 2** → `tests/unitarias.test.ts` L27–29
- **REVELÓ EL DEFECTO 1** → `tests/unitarias.test.ts` L40–42

## Detalle archivo por archivo


### `src/controllers/compra.controller.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 12 | **DEFECTO 3 CORREGIDO - R7** | `res.status(201).json(this.service.registrar(req.body));` | Antes: res.json (200). Crear responde 201 |
| 24–26 | **TDD - R8** | `total = (_req: Request, res: Response): void => {` |  |

### `src/cupones/cupones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 33–35 | **DEFECTO 1 CORREGIDO - R4** | `if (monto < this.minimo) {` | Antes: monto > minimo (con $10.000 exactos rechazaba el cupón) |
| 41–54 | **FACTORY** | `export class FabricaCupones {` | Traduce el código del cupón a una estrategia |
| 45–52 | **DEFECTO 2 CORREGIDO - R3** | `switch (codigo.trim().toUpperCase()) {` | Los códigos no distinguen mayúsculas/minúsculas ni espacios |

### `src/middlewares/manejo-errores.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–9 | **DEFECTO 4 CORREGIDO - R7** | `if (err instanceof ValidacionError \|\| err instanceof CuponInvalid...` | Faltaba CuponInvalidoError: un cupón inexistente terminaba en 500 |

### `src/routes/compra.routes.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8 | **TDD - R8 · ORDEN** | `r.get('/compras/total', c.total);` | /compras/total ANTES de /compras/:id |

### `src/services/compra.service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 46–48 | **TDD - R8** | `totalVendido(): number {` | Escrito después de ver fallar los tests de GET /compras/total |

### `tests/api.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 9–13 | **REVELÓ EL DEFECTO 3** | `it('POST /compras válido → 201 con la compra', async () => {` | Respondía 200 |
| 21–25 | **REVELÓ EL DEFECTO 4** | `it('POST /compras con un cupón inexistente → 400 con { error }', as...` | Respondía 500 |
| 48–62 | **TDD - R8** | `describe('GET /compras/total (TDD)', () => {` | Rojo primero (la ruta no existía: /compras/total caía en /compras/:id → 404) |

### `tests/unitarias.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 27–29 | **REVELÓ EL DEFECTO 2** | `it.each(['desc10', ' Desc10 ', 'menos2000'])('acepta "%s" (R3)', (c...` | R3: sin distinguir mayúsculas ni espacios |
| 40–42 | **REVELÓ EL DEFECTO 1** | `it('MENOS2000 con $10.000 exactos se aplica (R4)', () => {` | Límite exacto de R4 |
