# Tema 7 · Ejercicio difícil · Torneo en vivo (Factory + Observer + tabla)

Completá `torneo-en-vivo.ts` hasta que `torneo-en-vivo.test.ts` pase. (Hay un `// @ts-expect-error` en el test porque `tabla` todavía no existe: borralo cuando agregues el atributo.)

- `FabricaDeportes.crear("futbol" | "basquet" | "voley")`.
- `TorneoEnVivo(nombre, tipo)`: el deporte lo fabrica la Factory. `programar(id, local, visitante)` crea y guarda un `Partido` (id repetido → error). `cargarResultado(id, gl, gv)`: partido inexistente → error; ya cargado → error; goles no enteros o negativos → `RangeError`. Si todo es válido, guarda el `Resultado` y **avisa a todos los observadores** con `{ partidoId, local, visitante, resultado: "80 - 75" }` y el partido. Si falla, **nadie** es notificado.
- Observadores: `Prensa` (guarda titulares `"Tigres 80 - 75 Leones"`) y `TablaObservador` (mantiene una `TablaPosiciones` en `tabla`).

Pregunta: ¿qué ganás con que la tabla sea un **observador** y no un método más del torneo?
