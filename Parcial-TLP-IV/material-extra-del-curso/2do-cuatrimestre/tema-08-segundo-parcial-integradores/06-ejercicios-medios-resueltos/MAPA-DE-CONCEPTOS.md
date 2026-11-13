# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **DEFECTO 1 CORREGIDO - R6** → `src/pedidos.ts` L58
- **DEFECTO 2 CORREGIDO - R4** → `src/pedidos.ts` L75–77
- **DEFECTO 3 CORREGIDO - R5** → `src/pedidos.ts` L96
- **ESPÍA COMO OBSERVADOR** → `tests/pedidos.test.ts` L18
- **ORDEN DE LLAMADAS** → `tests/pedidos.test.ts` L46–53
- **IT.EACH POR ESTADO** → `tests/pedidos.test.ts` L78–81
- **TRES OBSERVADORES** → `tests/pedidos.test.ts` L90–101

## Detalle archivo por archivo


### `src/pedidos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 58 | **DEFECTO 1 CORREGIDO - R6** | `if (i !== -1) this.observadores.splice(i, 1);` | splice(i) sin cantidad borraba DESDE i hasta el final (a todos los siguientes) |
| 75–77 | **DEFECTO 2 CORREGIDO - R4** | `if (pedido.estado !== 'pendiente' && pedido.estado !== 'preparando') {` | Antes se permitía cancelar un pedido ENVIADO. Solo pendiente o preparando |
| 96 | **DEFECTO 3 CORREGIDO - R5** | `this.repo.guardar(actualizado);` | Antes notificaba ANTES de guardar. Primero se guarda, después se avisa |

### `tests/pedidos.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18 | **ESPÍA COMO OBSERVADOR** | `const observador = () => ({ notificar: vi.fn() });` | Cualquier objeto con notificar() sirve: el sujeto depende de la interfaz |
| 46–53 | **ORDEN DE LLAMADAS** | `it('primero se guarda y después se notifica (R5)', () => {` | invocationCallOrder: número de orden global. Reveló el DEFECTO 3 |
| 78–81 | **IT.EACH POR ESTADO** | `it.each(['pendiente', 'preparando'] as EstadoPedido[])('se puede ca...` | "enviado" reveló el DEFECTO 2 |
| 90–101 | **TRES OBSERVADORES** | `it('desuscribir saca SOLO a ese observador (R6)', () => {` | Con uno solo el defecto de splice no se ve. Reveló el DEFECTO 1 |
