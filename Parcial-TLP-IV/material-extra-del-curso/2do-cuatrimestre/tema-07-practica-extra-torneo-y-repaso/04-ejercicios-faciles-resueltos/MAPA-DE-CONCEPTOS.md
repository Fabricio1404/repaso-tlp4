# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **OCP** → `deportes-nuevos.ts` L5–12
- **POLIMORFISMO** → `deportes-nuevos.ts` L15–22
- **REGLA COMBINADA** → `deportes-nuevos.ts` L25–34

## Detalle archivo por archivo


### `deportes-nuevos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–12 | **OCP** | `export class Voley extends Deporte {` | Deporte nuevo = clase nueva. Partido no se modifica |
| 15–22 | **POLIMORFISMO** | `export class Tenis extends Deporte {` | Otra regla distinta: exactamente 1 jugador (no "como máximo") |
| 25–34 | **REGLA COMBINADA** | `export class Futbol5 extends Deporte {` | Mínimo y máximo: entre 5 y 7 (fútbol 5 con suplentes) |
