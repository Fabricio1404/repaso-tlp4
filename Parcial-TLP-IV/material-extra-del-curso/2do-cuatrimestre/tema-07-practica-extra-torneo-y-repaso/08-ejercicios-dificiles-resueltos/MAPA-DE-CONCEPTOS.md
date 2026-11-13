# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **FACTORY** → `torneo-en-vivo.ts` L9–20
- **OBSERVER - INTERFAZ** → `torneo-en-vivo.ts` L30–32
- **OBSERVER - SUJETO** → `torneo-en-vivo.ts` L35–79
- **POLIMORFISMO** → `torneo-en-vivo.ts` L57
- **OBSERVER - NOTIFICAR** → `torneo-en-vivo.ts` L77
- **OBSERVADOR CONCRETO** → `torneo-en-vivo.ts` L82–87, `torneo-en-vivo.ts` L90–95

## Detalle archivo por archivo


### `torneo-en-vivo.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 9–20 | **FACTORY** | `export class FabricaDeportes {` | Único lugar con new de los deportes; devuelve el tipo común Deporte |
| 30–32 | **OBSERVER - INTERFAZ** | `export interface ObservadorTorneo {` |  |
| 35–79 | **OBSERVER - SUJETO** | `export class TorneoEnVivo {` |  |
| 57 | **POLIMORFISMO** | `const partido = new Partido(id, local, visitante, this.deporte);` | Partido valida con el deporte que fabricó la Factory |
| 77 | **OBSERVER - NOTIFICAR** | `for (const o of this.observadores) o.resultadoCargado(evento, parti...` | Después de guardar el resultado |
| 82–87 | **OBSERVADOR CONCRETO** | `export class TablaObservador implements ObservadorTorneo {` | Mantiene la tabla actualizada (reutiliza TablaPosiciones) |
| 90–95 | **OBSERVADOR CONCRETO** | `export class Prensa implements ObservadorTorneo {` | Arma titulares (no imprime: los guarda, así se puede testear) |
