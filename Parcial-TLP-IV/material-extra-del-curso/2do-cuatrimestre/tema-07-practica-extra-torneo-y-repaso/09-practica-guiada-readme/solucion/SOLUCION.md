# Solución · TP N° 1 · Torneo Deportivo

La implementación completa es `../../02-ejemplos/torneo.ts` (con `demo.ts` y `torneo.test.ts`). Para verla pasar con las pruebas de esta práctica: `npx vitest run 02-ejemplos`.

## Respuestas
1. **Reglas violadas:** parameter properties (`constructor(public id: string, ...)`) y `any` (`local: any`, `config: any`, `catch (e: any)`). Con `erasableSyntaxOnly`, los parameter properties ni siquiera compilan.
2. **OCP** (y falta de polimorfismo): cada deporte nuevo obliga a agregar un `if` en `Partido`. Solución: `abstract class Deporte` con `abstract validar(equipo)`; `Futbol` y `Basquet` lo implementan, y `Partido` llama `deporte.validar(local)` sin preguntar cuál es.
3. Queda un partido **inválido** en el sistema. Por eso la validación va **en el constructor** de `Partido`: es imposible crear uno inválido.
4. `any` apaga el chequeo de tipos: `e.message` compila aunque `e` no tenga `message` (por ejemplo, si se lanzó un string). Sin `any`: `catch (e) { if (e instanceof Error) return e.message; return "Error desconocido"; }` (en `strict`, `e` es `unknown`).
5. No: si es pública, cualquiera puede hacer `equipo.jugadores.push(...)` y saltarse la validación de duplicados. Va `private` + `agregarJugador` (que valida) + getter `cantidad` + `listarIntegrantes()` (devuelve textos, no la lista).

## Cambios respecto del enunciado de partida
| Antes | Después |
|---|---|
| `constructor(public id: string, ...)` | Atributos declarados + `this.id = id` (forma larga) |
| `local: any`, `deporte: any` | `local: Equipo`, `deporte: Deporte` |
| `config: any` | `interface ConfigTorneo { deporte: "Futbol" \| "Basquet"; jugadoresLocal: number; jugadoresVisitante: number }` |
| `if (deporte.nombre === "Futbol") ...` | `deporte.validar(equipo)` (polimorfismo) |
| `validar()` opcional | Validación en el constructor de `Partido` |
| `catch (e: any)` | `catch (e)` + `e instanceof Error` |
| `jugadores` público | `private jugadores` + `agregarJugador` sin duplicados + `cantidad` |
