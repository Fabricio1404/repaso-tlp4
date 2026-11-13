# Tema 8 · Segundo parcial: cómo se rinde e integración de todo el año

> El segundo parcial (parte práctica) evalúa **solo testing**, pero sobre un proyecto que usa **todo lo del año**: arquitectura en capas, interfaces (DIP), errores propios (POO), y a veces patrones. Este tema junta las dos cosas.

## 1. Formato (según el Tema B de la Biblioteca)

- **Duración:** 1,5 horas. **Sin asistentes de IA.** Se aprueba la práctica con **al menos 2 de 3 ejercicios** bien resueltos.
- Te dan un **proyecto ya hecho** (API REST Express + TypeScript, probada con Vitest + Supertest) con un `README.md` que tiene: puesta en marcha, estructura, endpoints, **tabla de reglas de negocio (R1, R2...)** y la consigna. Al ejecutar `npm test` por primera vez **hay tests que fallan** (es parte del examen).
- Entregás: el proyecto **sin `node_modules`**, con `npm test` y `npm run typecheck` sin errores (lo no resuelto puede quedar en `it.todo`) y **`RESPUESTAS.md`** completo.

| Ejercicio | Qué evalúa | Lo que hay que hacer |
|---|---|---|
| **1 · Interpretar fallas y corregir** | Leer tests, decidir **código o test** según las reglas | Corregir lo que corresponda; tabla en `RESPUESTAS.md` citando la regla |
| **2 · Casos límite e inválidos** | Diseñar casos | Escribir tests (≥ 2 límites, ≥ 3 inválidos, uno por regla); si revelan defectos, corregir el **código** |
| **3 · Dobles de prueba e integración** | `vi.fn()` + Supertest + TDD | Completar `it.todo` con un repositorio falso; escribir un test que **falla** (rojo), corregir (verde) |

## 2. Estrategia de tiempo (90 minutos)
| Minutos | Qué hacer |
|---|---|
| 0–10 | `npm install`, `npm test`, `npm run typecheck`. Leer **la tabla de reglas** y la estructura. Datos en `RESPUESTAS.md` |
| 10–35 | Ej. 1: un test a la vez → regla → veredicto → corrección → **correr todo** → anotar en la tabla |
| 35–60 | Ej. 2: escribir los casos **desde las reglas** (no desde el código), correr, corregir defectos, anotar |
| 60–85 | Ej. 3: 3a con el repositorio falso; 3b test rojo → seguir el recorrido ruta → controlador → servicio → corregir |
| 85–90 | `npm test` + `npm run typecheck` + `RESPUESTAS.md` + comprimir sin `node_modules` |

## 3. El procedimiento que hay que tener automatizado

**Para cada test que falla:**
1. ¿Qué **espera** el test? (nombre + aserción)
2. ¿Qué **dice la regla**? (buscala en la tabla)
3. ¿Coinciden?
   - **Sí** → el error está en el **código**. Corregí el código. **No toques el test.**
   - **No** → el error está en el **test**. Corregí la expectativa (y el nombre si hace falta).
4. **Corré todo de nuevo.**
5. Anotá: test · código o test · regla citada.

**Para escribir casos:**
- Por cada regla con un rango ("entero ≥ 1", "hasta 10.000", "de 08:00 a 19:30"): el **borde exacto** (válido) y el valor **justo afuera** (inválido).
- Por cada regla "obligatorio": vacío `''` y solo espacios `'   '`.
- Por cada número: negativo, decimal (si debe ser entero), `NaN`.
- Un caso por regla **como mínimo**.

**Para un 200 que debería ser 404 (o similar):** seguí el recorrido de la petición:
`routes` (¿existe la ruta? ¿el orden es correcto?) → `controllers` (¿qué método del servicio llama? ¿qué status pone?) → `services` (¿lanza el error de dominio?) → `middlewares/manejo-errores` (¿traduce ese error al código correcto?).

## 4. Lo del primer cuatrimestre que aparece en el segundo parcial

| Concepto (1.er cuatrimestre) | Dónde aparece en el parcial |
|---|---|
| **Interfaces + DIP** | `LibroRepository` es una interfaz; `LibroService` la recibe por constructor → por eso se puede pasar un repositorio **falso** en los tests |
| **Herencia de `Error`** (errores propios) | `ValidacionError`, `NoEncontradoError`... → el middleware los distingue con `instanceof` |
| **SRP / capas** | routes / controllers / services / repositories: cada defecto está en **una** capa |
| **Encapsulamiento + copias defensivas** | `LibroRepositoryEnMemoria` devuelve copias (`{ ...l }`) para que los tests no se pisen |
| **Uniones de literales** | Tipos de estado, roles |
| **Patrones** | Un Singleton o un Observer puede ser lo que hay que testear (ver ejercicios de este tema) |

### Testear patrones
- **Singleton:** `expect(A.getInstance()).toBe(A.getInstance())` (`toBe` compara referencias: es justo lo que se quiere). Cuidado: el estado del Singleton se **arrastra** entre tests (desventaja "dificulta las pruebas unitarias"): por eso conviene un método para reiniciarlo en tests, o no guardar estado en él.
- **Factory:** `expect(Fabrica.crear('express')).toBeInstanceOf(EnvioExpress)` y probar el comportamiento del objeto devuelto.
- **Observer:** los observadores se reemplazan por espías: `const obs = { actualizar: vi.fn() }` → `expect(obs.actualizar).toHaveBeenCalledWith(...)`, `toHaveBeenCalledTimes`, y después de `desuscribir`, `not.toHaveBeenCalled()`.
- **Adapter:** se le pasa un **stub** del sistema viejo (`{ leerF: () => 86 }`) y se verifica la traducción (`leerCelsius()` → 30).
- **DIP en general:** todo lo que se recibe por constructor se puede reemplazar por un doble (incluso el reloj: `() => new Date('2026-03-10')`, para que los tests no dependan de la fecha real).

## 5. Mapa de este tema

| Carpeta | Qué hay |
|---|---|
| `02-ejemplos/` | **El parcial Tema B (Biblioteca)**: original y resuelto, con `EXPLICACION.md` |
| `03`–`04` | Fáciles: **testear patrones** (Singleton, Factory, Adapter) y encontrar defectos con los tests |
| `05`–`06` | Medios: **Observer + DIP testeados con `vi.fn()`** (incluye un reloj inyectado) |
| `07`–`08` | Difícil: **API con patrones** (Factory de cupones + Observer de auditoría) con defectos en varias capas + TDD |
| `09-practica-guiada-readme/` | **Simulacro completo de segundo parcial** (Tema A · Farmacia) con el mismo formato que el Tema B |
