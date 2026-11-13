# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **DEFECTO 1 CORREGIDO - R1** → `src/patrones.ts` L52
- **DEFECTO 2 CORREGIDO - R3** → `src/patrones.ts` L68
- **TESTEAR SINGLETON** → `tests/patrones.test.ts` L14–16
- **TESTEAR FACTORY** → `tests/patrones.test.ts` L29–33
- **CASOS LÍMITE R3** → `tests/patrones.test.ts` L52–54
- **STUB DEL ADAPTEE** → `tests/patrones.test.ts` L71–75

## Detalle archivo por archivo


### `src/patrones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 52 | **DEFECTO 1 CORREGIDO - R1** | `case 'jubilado':` | Devolvía DescuentoEstudiante (copiar y pegar): los jubilados recibían 10 % en vez de 20 % |
| 68 | **DEFECTO 2 CORREGIDO - R3** | `return conDescuento >= config.envioGratisDesde ? conDescuento : con...` | Antes: > (con $50.000 exactos cobraba envío). R3: "$50.000 o más" |

### `tests/patrones.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14–16 | **TESTEAR SINGLETON** | `it('obtenerInstancia devuelve siempre el MISMO objeto', () => {` | toBe compara REFERENCIAS: es exactamente "el mismo objeto" |
| 29–33 | **TESTEAR FACTORY** | `it.each([` | El de "jubilado" reveló el DEFECTO 1 |
| 52–54 | **CASOS LÍMITE R3** | `it('con $50.000 exactos el envío es gratis', () => {` | $50.000 exactos reveló el DEFECTO 2 |
| 71–75 | **STUB DEL ADAPTEE** | `it('convierte libras a kg redondeando a 2 decimales (R5)', () => {` | Un objeto literal reemplaza a la balanza real: el adapter depende de una interfaz |
