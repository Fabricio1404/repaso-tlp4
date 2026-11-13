# Tema 7 · Ejercicio medio · Tabla de posiciones

Completá `tabla.ts` hasta que `tabla.test.ts` pase (sin modificar el test ni `02-ejemplos/torneo.ts`).

- `registrar(partido)`: suma el partido a la tabla de los dos equipos. Ganador 3 puntos, empate 1 y 1, perdedor 0. Si el partido no tiene resultado: `Error("El partido <id> todavía no se jugó")`.
- `posiciones(): Fila[]` con `{ equipo, pj, pg, pe, pp, gf, gc, dg, pts }`, ordenada por **puntos** (desc), **diferencia de gol** (desc), **goles a favor** (desc) y **nombre** (asc). Devuelve **copias**.

Pistas: un `Map<string, Fila>`; `sort((a, b) => b.pts - a.pts || ...)`; `localeCompare` para comparar textos.
