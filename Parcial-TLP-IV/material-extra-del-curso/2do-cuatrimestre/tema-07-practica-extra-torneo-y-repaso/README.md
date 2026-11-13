# Tema 7 · Práctica extra: Torneo Deportivo y repaso

Proyecto único con las reglas del primer cuatrimestre (`erasableSyntaxOnly`, sin `any`, constructor en forma larga) **más** Vitest.

```bash
npm install
npx tsc                          # tipos de todo el tema (menos la práctica guiada, que tiene su propio tsconfig)
node 02-ejemplos/demo.ts         # bloque de prueba del TP
npx vitest run 02-ejemplos       # pruebas del TP resuelto
npx vitest run 03-ejercicios-faciles     # tu ejercicio (falla hasta que lo completes)
```
`npm test` corre **todo**, incluidos los ejercicios sin resolver (que fallan a propósito). Para ver solo lo resuelto:
`npx vitest run 02-ejemplos 04-ejercicios-faciles-resueltos 06-ejercicios-medios-resueltos 08-ejercicios-dificiles-resueltos`.

| Carpeta | Qué hay |
|---|---|
| `01-teoria.md` | Qué concepto practica cada pieza del TP + repaso de teoría + trampas |
| `02-ejemplos/` | El TP resuelto (`torneo.ts`), `demo.ts` y `torneo.test.ts` |
| `03`/`04` | Deportes nuevos sin tocar `Partido` (OCP) |
| `05`/`06` | Tabla de posiciones (ordenamiento con varios criterios, copias) |
| `07`/`08` | Torneo en vivo: Factory de deportes + Observer de resultados |
| `09-practica-guiada-readme/` | El TP con el **enunciado de partida** (con `any` y parameter properties) para reescribir |
