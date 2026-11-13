# Práctica guiada · Tema 7 · Trabajo Práctico N° 1: Sistema de Gestión de Torneo Deportivo

> El enunciado de partida (abajo) **compila en TypeScript común pero viola las reglas de la cátedra**: usa `any` y parameter properties. Tu trabajo es implementar el sistema **respetando las reglas** y que pasen las pruebas de `inicio/torneo.test.ts`.

## Consigna
Implementar la lógica de un torneo con POO en TypeScript:
- Interfaces `IIdentificable` (id no reasignable) e `ICompetidor` (`nombre`, `listarIntegrantes()`).
- `Jugador` (id, nombre, edad, posición opcional; `toString()` → `"Ana (Arquera)"` o `"Ana (Sin posición)"`).
- `Equipo`: lista **privada** de jugadores, **sin duplicados por id**, getter `cantidad`, `listarIntegrantes()`.
- `Deporte` **abstracta** con `validar(equipo)`; `Futbol` (máximo 11) y `Basquet` (máximo 5).
- `Resultado` (`toString()` → `"2 - 0"`).
- `Partido`: equipos **distintos** y **válidos según el deporte** (si no, `"Los equipos deben ser distintos"` / `"Equipos no válidos para el deporte"`), `jugar()` (goles al azar de 0 a 4) y `toString()`.
- `Torneo`: `programarPartido` (id repetido → error), `listarPartidos` (copia), `buscarPartido`.
- Función `gestionarTorneo(config)` que devuelve `"OK"` o el mensaje del error.

**Restricciones:** clase abstracta para el deporte, **sin `any`**, y la validación de la cantidad **delegada a `Deporte.validar`** (polimorfismo). Además, las reglas generales: sin parameter properties, constructor en forma larga, sin `enum`.

Ejemplos: fútbol con 10 y 11 jugadores → `OK`; básquet con 6 y 4 → `Equipos no válidos para el deporte`.

## Enunciado de partida (lo que NO se puede entregar así)
```ts
class Jugador {
  constructor(public id: string, public nombre: string, public edad: number, public posicion?: string) {}
}

class Partido {
  constructor(public id: string, public local: any, public visitante: any, public deporte: any) {}
  validar(): boolean {
    if (this.deporte.nombre === "Futbol") return this.local.jugadores.length <= 11;
    if (this.deporte.nombre === "Basquet") return this.local.jugadores.length <= 5;
    return false;
  }
}

function gestionarTorneo(config: any): string {
  try { /* ... */ return "OK"; } catch (e: any) { return e.message; }
}
```
Problemas para identificar (escribilos en `RESPUESTAS.md`):
1. ¿Qué reglas de la cátedra viola?
2. ¿Qué principio SOLID viola `Partido.validar` con sus `if` por nombre de deporte? ¿Cómo lo resolvés?
3. ¿Qué pasa con la validación si alguien crea el partido y nunca llama a `validar()`?
4. ¿Por qué `catch (e: any)` es peligroso y cómo se escribe sin `any`?
5. ¿`jugadores` debería ser público? ¿Por qué?

## Cómo trabajar
```bash
# desde la carpeta del tema
npx tsc -p 09-practica-guiada-readme/inicio        # verifica tipos de tu versión
npx vitest run 09-practica-guiada-readme/inicio    # 10 pruebas
```
Bonus: un `demo.ts` con el bloque de prueba que imprima los ejemplos.
