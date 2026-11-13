# Tema 7 · Difícil · resolución

- **Factory:** `FabricaDeportes.crear` centraliza los `new`. `TorneoEnVivo` guarda un `Deporte` (tipo común) y nunca sabe cuál es.
- **Observer:** `TorneoEnVivo` es el sujeto; `Prensa` y `TablaObservador` son observadores. El torneo **no conoce** la tabla ni la prensa: si mañana se suma "estadísticas de jugadores", es otra clase que implementa `ObservadorTorneo` (OCP).
- **Validar todo antes de modificar y de notificar:** partido existente, sin resultado previo, goles enteros ≥ 0. El `it.each` de errores verifica además `not.toHaveBeenCalled()` sobre el espía.
- **Reutilización:** `TablaObservador` **contiene** una `TablaPosiciones` (composición) y le delega `registrar`.
- **Respuesta:** el torneo queda con una sola responsabilidad (programar y cargar resultados) y la tabla se puede activar, desactivar o reemplazar sin tocarlo (SRP + OCP). Además, en los tests se reemplaza por un espía.
