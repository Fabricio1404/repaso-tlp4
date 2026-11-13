# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **ENCAPSULAMIENTO** → `tabla.ts` L18
- **NARROWING** → `tabla.ts` L26–28
- **ORDEN CON COMPARADOR** → `tabla.ts` L35–39

## Detalle archivo por archivo


### `tabla.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18 | **ENCAPSULAMIENTO** | `private filas: Map<string, Fila>;` | Un Map privado: nombre del equipo → fila acumulada |
| 26–28 | **NARROWING** | `if (partido.resultado === undefined) {` | resultado es opcional: sin resultado no se puede registrar |
| 35–39 | **ORDEN CON COMPARADOR** | `posiciones(): Fila[] {` | puntos ↓, diferencia de gol ↓, goles a favor ↓, nombre ↑ |
