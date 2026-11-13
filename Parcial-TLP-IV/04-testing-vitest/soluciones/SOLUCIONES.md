# Soluciones · Tema 04 · Testing

La resolución del parcial (Parte C) está en [RESOLUCION-PARCIAL2-TEMA-B.md](RESOLUCION-PARCIAL2-TEMA-B.md).

---

## Parte A · Teoría

1. Compara el **comportamiento observado** con un **resultado esperado**.
2. Caso de prueba: **entrada/condición**, **acción**, **resultado esperado**. Fases: **Preparar** (Arrange), **Ejecutar** (Act), **Comprobar** (Assert).
3. De los **requisitos / reglas de negocio**. Si sale del código, el test "confirma" lo que el código hace, incluidos sus errores, y nunca los detecta.
4. - **Unitaria**: `calcularMulta(3)` devuelve 1500 (una función aislada).
   - **Integración**: `GET /libros/1` con Supertest (ruta + controlador + servicio + repositorio juntos).
   - **E2E**: abrir el front en un navegador, iniciar sesión, prestar un libro y ver que el stock baja.
5. Que conviene tener **muchas unitarias** (base), **algunas de integración** y **pocas E2E** (punta), para equilibrar rapidez, alcance y mantenimiento. **No** es una regla fija: es una orientación.
6. No se reemplazan, son **complementarias**. La manual sirve para **explorar** y observar la experiencia de usuario; la automatizada para **verificar comportamientos conocidos** después de cada cambio, de forma repetible.
7. `toBe` usa igualdad **estricta** (`===`, misma referencia en objetos); `toEqual` compara **contenido**. `expect({ a: 1 }).toBe({ a: 1 })` falla (son dos objetos distintos) y con `toEqual` pasa.
8. Porque Vitest tiene que **ejecutar la función él mismo** dentro de un try/catch para ver si lanza. Sin la flecha, la llamada se ejecuta antes, el error salta en el test y `toThrow` nunca llega a inspeccionarlo.
9. **Stub**: devuelve respuestas predeterminadas. **Mock**: permite verificar interacciones (se llamó, cuántas veces, con qué). **Spy**: registra las llamadas (puede envolver a la función real). **Fake**: implementación simplificada que funciona de verdad (repositorio en memoria).
10. **DIP** (inversión de dependencias): `LibroService` depende de la **interface** `LibroRepository` y la **recibe por constructor**. Por eso se le puede pasar cualquier objeto que cumpla la interface, incluido uno falso. Si hiciera `new` del repositorio real adentro, no se podría reemplazar.
11. Supertest envía peticiones HTTP a la app Express **sin levantar el servidor en un puerto**. Se separa para que los tests importen la app (`crearApp()`) sin ejecutar el `listen` (que dejaría un puerto abierto y podría chocar entre tests).
12. **401**: no estás autenticado (sin token o token inválido). **403**: estás autenticado pero **no tenés permiso**. **400**: los datos son inválidos. **409**: los datos son válidos pero hay un **conflicto con el estado** actual (no hay stock, ya existe).
13. 🔴 Rojo: escribir un test que falle. 🟢 Verde: implementar lo mínimo para que pase. 🔵 Refactor: mejorar sin romper. **No** es obligatorio: TDD es una estrategia de desarrollo, se puede probar después de escribir el código.
14. **No.** La cobertura mide qué código **se ejecutó**, no si se **verificó**. Ejemplo: `it('x', () => { calcularMulta(5); })` sin ningún `expect` cubre la función al 100 % y no comprueba nada.
15. Es ejecutar **automáticamente** la verificación (instalar dependencias, typecheck, tests) **en cada cambio** que se sube al repositorio. Un workflow típico: `checkout` → `setup-node` → `npm ci` → `npm run typecheck` → `npm test`.
16. Error en el **código**, en el **test** o en el **requisito**. Se decide comparando lo que espera el test con **la regla**: si coinciden, el error es del código; si no, del test; si la regla no dice nada, es del requisito (hay que preguntar).
17. `npm test` **ejecuta** las pruebas (Vitest no revisa tipos); `npm run typecheck` (`tsc --noEmit`) **revisa los tipos** sin ejecutar nada. Se piden los dos sin errores.

---

## Parte B · Predecir el resultado

| Test | Resultado | Por qué |
|---|---|---|
| **B1** | ✅ Pasa | 1000 - 100 = 900 |
| **B2** | ❌ Falla (se rompe) | Falta la flecha: `calcularPrecioFinal(1000, 150)` lanza **antes** de que `expect` exista. Correcto: `expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError)` |
| **B3** | ❌ Falla | 100 es un valor **válido** (el código rechaza `> 100`, no `>= 100`): devuelve 0 y no lanza. Si la regla dice "0 a 100 inclusive", el error está en el **test** |
| **B4** | ❌ Falla | `toBe` con objetos compara **referencias**: son dos objetos distintos. Correcto: `toEqual` |
| **B5** | ❌ Falla, **y revela un defecto** | `NaN < 0` y `NaN > 100` son los dos `false`, así que el código **no** lanza y devuelve `NaN`. Si la regla dice que el descuento debe ser un número válido, el error está en el **código**: hay que agregar `!Number.isFinite(descuento)` |
| **B6** | ❌ Falla | Falta `await`: `res` es una **Promise** y `res.status` es `undefined` |
| **B7** | ❌ Falla | `toHaveBeenCalledWith` compara el objeto **completo**: se llamó con `{ id: 7, estado: 'confirmado' }`. Correcto: el objeto entero, o `expect.objectContaining({ estado: 'confirmado' })` |
