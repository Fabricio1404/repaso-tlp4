# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **DEFECTO CORREGIDO** → `src/imc.ts` L21, `src/password.ts` L8–10
- **CASOS LÍMITE DEL RECARGO** → `tests/envio.test.ts` L18–23
- **CASO HABITUAL** → `tests/imc.test.ts` L6–8
- **CASOS LÍMITE** → `tests/imc.test.ts` L11–13, `tests/imc.test.ts` L44–51
- **CASOS INVÁLIDOS CON IT.EACH** → `tests/imc.test.ts` L20–27
- **CASOS HABITUALES** → `tests/imc.test.ts` L34–39
- **TOEQUAL CON ARREGLOS** → `tests/password.test.ts` L7
- **CASO LÍMITE** → `tests/password.test.ts` L11–13
- **VARIAS REGLAS A LA VEZ** → `tests/password.test.ts` L28–34

## Detalle archivo por archivo


### `src/imc.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 21 | **DEFECTO CORREGIDO** | `if (imc >= 25 && imc < 30) return 'sobrepeso';` | Antes: imc > 25 (un IMC de 25 exacto daba "normal"). R3: "de 25 a menos de 30" |

### `src/password.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–10 | **DEFECTO CORREGIDO** | `if (password.length < 8) {` | Antes: length <= 8 (rechazaba 8 caracteres exactos). R4: "al menos 8" |

### `tests/envio.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18–23 | **CASOS LÍMITE DEL RECARGO** | `it.each([` | 5 kg sin recargo; 5.1 kg ya es "fracción" → +300; 6 kg → +300; 7 kg → +600 |

### `tests/imc.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–8 | **CASO HABITUAL** | `it('calcula el IMC de 70 kg y 1.75 m', () => {` |  |
| 11–13 | **CASOS LÍMITE** | `it('acepta el peso máximo de 300 kg', () => {` | 300 kg y 2.5 m son válidos (inclusive) |
| 20–27 | **CASOS INVÁLIDOS CON IT.EACH** | `it.each([` | Justo afuera de los bordes, cero, negativos y NaN |
| 34–39 | **CASOS HABITUALES** | `it.each([` | Uno por categoría |
| 44–51 | **CASOS LÍMITE** | `it.each([` | Cada borde y el valor justo debajo. El de 25 reveló el defecto |

### `tests/password.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7 | **TOEQUAL CON ARREGLOS** | `expect(validarPassword('Secreta123')).toEqual([]);` | toBe([]) fallaría: compara referencias |
| 11–13 | **CASO LÍMITE** | `it('acepta exactamente 8 caracteres', () => {` | Exactamente 8 caracteres: válido. Este test reveló el defecto |
| 28–34 | **VARIAS REGLAS A LA VEZ** | `it('informa todas las reglas incumplidas en orden', () => {` | Verifica también el ORDEN de los mensajes |
