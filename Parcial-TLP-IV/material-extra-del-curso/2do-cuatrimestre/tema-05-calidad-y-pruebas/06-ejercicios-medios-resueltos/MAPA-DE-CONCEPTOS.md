# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **DEFECTO CORREGIDO - R1** → `src/condicion.ts` L5–7
- **DEFECTO CORREGIDO - R2** → `src/condicion.ts` L35–37
- **DEFECTO CORREGIDO - R8** → `src/inscripcion.service.ts` L47–49
- **ERROR EN EL TEST - R3** → `tests/ej1-condicion.test.ts` L22–24
- **ERROR EN EL TEST - R4** → `tests/ej1-condicion.test.ts` L31–33
- **CASO AGREGADO** → `tests/ej1-condicion.test.ts` L36–38
- **SPY** → `tests/ej2-inscripcion.test.ts` L33
- **NOT.TOHAVEBEENCALLED** → `tests/ej2-inscripcion.test.ts` L45
- **TEST QUE REVELÓ EL DEFECTO** → `tests/ej2-inscripcion.test.ts` L55–64

## Detalle archivo por archivo


### `src/condicion.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–7 | **DEFECTO CORREGIDO - R1** | `if (!Number.isInteger(nota) \|\| nota < 1 \|\| nota > 10) {` | Antes: nota < 0 (aceptaba 0). Las notas van de 1 a 10 |
| 35–37 | **DEFECTO CORREGIDO - R2** | `if (!recupero && promedio >= 7 && n1 >= 6 && n2 >= 6) {` | Antes: promedio > 7 (con 7 y 7 no promocionaba). R2 dice "7 o más" |

### `src/inscripcion.service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 47–49 | **DEFECTO CORREGIDO - R8** | `if (this.repo.existeInscripcion(dni, materia)) {` | Faltaba controlar la inscripción duplicada ANTES de guardar |

### `tests/ej1-condicion.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 22–24 | **ERROR EN EL TEST - R3** | `it('con 4 y 4 queda regular', () => {` | Con 4 y 4 ambas notas son >= 4: queda REGULAR, no libre. Se corrigió la expectativa |
| 31–33 | **ERROR EN EL TEST - R4** | `it('el recuperatorio reemplaza la nota más baja: 2 y 8 con recupera...` | Quien recupera NO puede promocionar: como máximo queda regular. Se corrigió la expectativa |
| 36–38 | **CASO AGREGADO** | `it('2 y 8 con recuperatorio 3 queda libre', () => {` | El recuperatorio también puede dejar libre si no alcanza |

### `tests/ej2-inscripcion.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 33 | **SPY** | `expect(repo.guardarInscripcion).toHaveBeenCalledTimes(1);` | Verifica la colaboración: guardar una vez y con qué datos |
| 45 | **NOT.TOHAVEBEENCALLED** | `expect(repo.guardarInscripcion).not.toHaveBeenCalled();` | R9: si no es válida, no se guarda ni se notifica |
| 55–64 | **TEST QUE REVELÓ EL DEFECTO** | `it('una inscripción duplicada: lanza InscripcionDuplicadaError y NO...` | Antes de la corrección, este test fallaba: el servicio guardaba y notificaba igual |
