# Tema 5 · Calidad y pruebas de software (U4): Vitest y Supertest

> **Objetivo:** leer tests ajenos, **interpretar por qué fallan** (¿error en el código, en el test o en el requisito?), escribir tests nuevos con **casos habituales, límite e inválidos**, usar **dobles de prueba** (`vi.fn()`, repositorios falsos) y escribir **pruebas de integración HTTP** con Supertest. Es exactamente lo que evalúa el segundo parcial.

Índice:
1. [¿Para qué probar? Calidad, defecto, falla](#1-para-qué-probar)
2. [Niveles de prueba y pirámide](#2-niveles-de-prueba-y-pirámide)
3. [Anatomía de un test: AAA y aserciones](#3-anatomía-de-un-test)
4. [Vitest a fondo](#4-vitest-a-fondo)
5. [Diseño de casos: habituales, límite, inválidos](#5-diseño-de-casos)
6. [Interpretar un test que falla (código, test o requisito)](#6-interpretar-un-test-que-falla)
7. [Dobles de prueba: stub, spy, mock, fake con `vi.fn()`](#7-dobles-de-prueba)
8. [Pruebas de integración HTTP con Supertest](#8-pruebas-de-integración-http-con-supertest)
9. [Arquitectura en capas y por qué facilita probar](#9-arquitectura-en-capas-y-pruebas)
10. [TDD: rojo, verde, refactor](#10-tdd-rojo-verde-refactor)
11. [`npm test` vs. `npm run typecheck`](#11-npm-test-vs-npm-run-typecheck)
12. [Integración continua con GitHub Actions](#12-integración-continua)
13. [Preguntas de cierre y trampas](#13-preguntas-de-cierre-y-trampas)

---

## 1. Para qué probar

- **Calidad de software:** grado en que el software cumple sus requisitos (funcionales y no funcionales) y las expectativas de quien lo usa.
- **Error (equivocación):** la acción humana que introduce el problema ("me olvidé de validar").
- **Defecto (bug):** el problema en el código (`calcularPrecioFinal` no valida el rango).
- **Falla:** lo que se observa al ejecutar (con 150 % devuelve un precio negativo).
- **Probar** es ejecutar el software para **encontrar defectos** y dar **confianza** de que cumple. Una prueba que pasa **no demuestra** que no haya defectos: demuestra que **ese caso** funciona.

> "El programa corría sin errores y aun así no cumplía la regla de negocio." (guía)

### Prueba manual vs. automatizada
| Manual | Automatizada |
|---|---|
| La hace una persona (Postman, el navegador) | Está escrita en código (`*.test.ts`) |
| Sirve para **explorar** | Se **repite igual** cada vez, en segundos |
| Cara de repetir; se olvidan casos | Puede correr en **integración continua** en cada `push` |

## 2. Niveles de prueba y pirámide

| Nivel | Qué comprueba | Ejemplo del laboratorio |
|---|---|---|
| **Unitaria** | Una **unidad pequeña** de comportamiento (una función, un método de un servicio) **aislada** | `tests/precios.test.ts` llama a `calcularPrecioFinal` directamente |
| **Integración** | La **colaboración de varias partes** | `tests/api.test.ts` envía una solicitud HTTP con Supertest: participan la ruta de Express, el controlador y el servicio |
| **E2E (extremo a extremo)** | Un **flujo completo** desde el punto de vista de quien usa el sistema (navegador → frontend → API → base) | No se implementa en el laboratorio |

**Pirámide de pruebas:** muchas unitarias (rápidas, baratas, precisas), algunas de integración, pocas E2E (lentas, frágiles). Es una **orientación**, no una proporción obligatoria.

```
        /\        E2E: pocas
       /  \
      /----\      Integración: algunas
     /      \
    /--------\    Unitarias: muchas
```

## 3. Anatomía de un test

```ts
import { describe, it, expect } from 'vitest';
import { calcularPrecioFinal } from '../src/services/precios';

describe('calcularPrecioFinal', () => {          // agrupa tests relacionados
  it('aplica un descuento del 10 %', () => {     // UN comportamiento, descripto en lenguaje natural
    // Arrange (preparar)
    const precio = 1000;
    const descuento = 10;
    // Act (actuar)
    const resultado = calcularPrecioFinal(precio, descuento);
    // Assert (comprobar)
    expect(resultado).toBe(900);                 // ← la ASERCIÓN
  });
});
```

- **Patrón AAA** (Arrange, Act, Assert): preparar los datos, ejecutar **una** acción, comprobar el resultado.
- **Aserción:** la expresión que compara lo obtenido con lo esperado. `expect(obtenido).toBe(esperado)`.
- Un buen test: tiene un nombre que describe el comportamiento, prueba **una** cosa, es **independiente** (no depende del orden ni de otros tests) y es **determinista** (siempre da lo mismo).

## 4. Vitest a fondo

**Vitest** es el framework de pruebas (corre los tests, compara, informa). Viene configurado en `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/**/*.test.ts'] } });
```

### 4.1 Estructura

| Función | Para qué |
|---|---|
| `describe(nombre, fn)` | Agrupa tests |
| `it(nombre, fn)` / `test(...)` | Define un test (son sinónimos) |
| `it.todo(nombre)` | Test **pendiente** (aparece como "todo", no falla) |
| `it.skip(...)` | Lo saltea |
| `it.only(...)` | Corre **solo** ese (¡no lo dejes en la entrega!) |
| `it.each(tabla)(nombre, fn)` | El mismo test con varios datos |
| `beforeEach(fn)` / `afterEach(fn)` | Se ejecuta antes/después de **cada** test del bloque |
| `beforeAll(fn)` / `afterAll(fn)` | Antes/después de **todos** |

```ts
it.each([
  [1000, 10, 900],
  [1000, 0, 1000],
  [1000, 100, 0],
])('calcularPrecioFinal(%d, %d) = %d', (precio, desc, esperado) => {
  expect(calcularPrecioFinal(precio, desc)).toBe(esperado);
});
```

### 4.2 Matchers (comparadores) más usados

| Matcher | Comprueba | Ejemplo |
|---|---|---|
| `toBe(x)` | Igualdad **estricta** (`===`): números, strings, booleanos, misma referencia | `expect(calcularMulta(3)).toBe(1500)` |
| `toEqual(x)` | Igualdad de **contenido** (objetos y arreglos, recursivo) | `expect(res.body).toEqual({ error: 'Libro no encontrado' })` |
| `toStrictEqual(x)` | Como `toEqual` pero también compara `undefined` y la clase | |
| `toMatchObject(x)` | El objeto **contiene al menos** esas propiedades | `expect(libro).toMatchObject({ id: 1 })` |
| `toHaveProperty(clave, valor?)` | Existe la propiedad (y opcionalmente su valor) | `expect(res.body).toHaveProperty('error')` |
| `toHaveLength(n)` | Largo de un arreglo o string | `expect(res.body).toHaveLength(4)` |
| `toContain(x)` | El arreglo/string contiene el elemento | `expect(permisos).toContain('libro:read')` |
| `toBeDefined()` / `toBeUndefined()` / `toBeNull()` | | |
| `toBeTruthy()` / `toBeFalsy()` | Verdadero/falso en sentido amplio | |
| `toBeGreaterThan(n)` / `toBeLessThanOrEqual(n)` | Comparaciones numéricas | |
| `toBeCloseTo(n, decimales)` | Números con decimales (evita `0.1 + 0.2 !== 0.3`) | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |
| `toThrow()` / `toThrow(Clase)` / `toThrow('texto')` / `toThrow(/regex/)` | La función **lanza** un error (de ese tipo / con ese mensaje) | `expect(() => fn(-1)).toThrow(RangeError)` |
| `.not` | Niega cualquier matcher | `expect(() => fn(3)).not.toThrow()` |

**`toBe` vs. `toEqual` (trampa clásica):**
```ts
expect({ a: 1 }).toBe({ a: 1 });     // ❌ falla: son dos objetos distintos (distinta referencia)
expect({ a: 1 }).toEqual({ a: 1 });  // ✅ mismo contenido
```

**`toThrow` recibe una FUNCIÓN:**
```ts
expect(calcularPrecioFinal(1000, 150)).toThrow(RangeError);       // ❌ el error salta ANTES de que expect lo vea
expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError); // ✅ Vitest llama a la función y atrapa el error
```

### 4.3 Asincronía
```ts
it('responde 200', async () => {                          // la función del test es async
  const res = await request(app).get('/libros');           // y se ESPERA la respuesta
  expect(res.status).toBe(200);
});

await expect(servicio.buscar(99)).rejects.toThrow(NoEncontradoError);  // promesa que rechaza
await expect(servicio.listar()).resolves.toHaveLength(4);             // promesa que resuelve
```
> "Un test con `async` necesita `await` en la llamada de supertest." Sin `await`, el test termina **antes** de la respuesta y **pasa aunque esté mal**.

### 4.4 Leer la salida de `npm test`
```
 ✓ tests/precios.test.ts (5 tests) 4ms
 ❯ tests/api.test.ts (2 tests | 1 failed)
   × rechaza descuentos superiores al 100 %
     → expected function to throw an error, but it didn't
 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 6 passed | 2 todo (9)
```
- `✓` pasó, `×` falló, `↓` salteado, `todo` pendiente.
- El mensaje (`expected ... but ...`) dice **qué esperaba** y **qué obtuvo**. Para `toBe`/`toEqual` muestra un *diff*:
```
AssertionError: expected 1500 to be 2000
- Expected  + Received
- 2000
+ 1500
```

## 5. Diseño de casos

| Tipo | Qué es | Ejemplo con "descuento entre 0 y 100" |
|---|---|---|
| **Habitual** (válido típico) | Un valor normal del uso diario | 10 % |
| **Límite** (borde) | Justo **en** el borde de la regla (y justo afuera) | 0 %, 100 % (válidos); −1 %, 101 % (inválidos) |
| **Inválido** | Lo que el sistema **no debería aceptar** | 150 %, −5 %, `NaN`, `Infinity`, `"10"` |

- **Análisis de valores límite:** los bugs se esconden en los bordes (`<` en vez de `<=`). Por cada regla "entre A y B", probá A, B, A−1, B+1.
- **Particiones de equivalencia:** se divide la entrada en grupos que el sistema trata igual (negativos / 0 a 100 / mayores a 100) y se prueba al menos un valor de cada grupo.
- **¿Por qué incluir inválidos?** Los habituales confirman que funciona lo esperado; los inválidos confirman que el sistema **se defiende** de lo que no debería aceptar.

Ejemplo (Biblioteca, R6: "ejemplares entero ≥ 1"):
- límite válido: `1`; límite inválido: `0`; inválidos: `-1`, `2.5`, `NaN`.

Ejemplo (R4: "título no vacío ni solo espacios"):
- límite: `"a"` (un carácter, válido), `"   "` (solo espacios, inválido), `""` (vacío, inválido).

## 6. Interpretar un test que falla

**Un test que falla no siempre significa que el código está mal.** Puede ser:
1. **Error en la implementación** (el código no cumple el requisito) → se corrige el **código**.
2. **Expectativa equivocada** (el test pide algo que el requisito no dice) → se corrige el **test**.
3. **Requisito poco claro** → se consulta / se documenta la interpretación.

> "Si un test falla, puede ser un error de la implementación, una expectativa equivocada o un requisito poco claro: hay que interpretarlo, no corregirlo a ciegas."

**El criterio es el requisito** (en el parcial: la tabla de reglas de negocio del README, que "manda" sobre el código y los tests).

Procedimiento:
1. Leé el nombre del test y la aserción: ¿qué comportamiento dice que debería pasar?
2. Buscá la **regla** que corresponde (R1, R2...).
3. Compará: ¿el test coincide con la regla?
   - **Sí** → el error está en el **código**. Corregilo. **No toques el test.**
   - **No** → el error está en el **test**. Corregí la expectativa para que coincida con la regla.
4. Volvé a correr **todos** los tests (no solo el que fallaba): así comprobás que el arreglo no rompió otro caso.
5. Documentá: test, dónde estaba el error, por qué (citando la regla).

Ejemplo real del segundo parcial (Biblioteca):
| Test | Regla | ¿Dónde está el error? |
|---|---|---|
| `rechaza 0 días de retraso` espera `RangeError` | R3: "Sin retraso (0 días) la multa es $0" | En el **test**: 0 es válido y debe dar 0 |
| `rechaza días negativos` espera `RangeError` y el código devuelve −1000 | R3: entero ≥ 0, si no `RangeError` | En el **código**: no valida |
| `permite prestar todos los ejemplares` (4 de 4) y el código lanza error | R7: "menor **o igual** a los disponibles" | En el **código**: usa `<= 0` en vez de `< 0` |

## 7. Dobles de prueba

Un **doble de prueba** reemplaza a una dependencia real durante un test (como un doble de riesgo en una película). Permite probar una unidad **aislada**, rápido y sin efectos reales (sin mandar mails, sin base de datos).

| Tipo | Qué hace | Ejemplo |
|---|---|---|
| **Dummy** | Se pasa para completar parámetros, no se usa | `new Servicio(null as never)` (evitarlo) |
| **Stub** | Devuelve respuestas **preprogramadas** | `buscarPorId: () => libro` |
| **Spy (espía)** | **Registra** cómo fue llamado (cuántas veces, con qué) | `vi.fn()` + `toHaveBeenCalledWith` |
| **Mock** | Espía con **expectativas** de cómo debe ser llamado | En la práctica, `vi.fn()` cumple ambos roles |
| **Fake** | Implementación **simplificada pero funcional** | `LibroRepositoryEnMemoria` en vez de una base real |

**Esto solo es posible gracias a DIP** (tema 3): el servicio recibe el repositorio por constructor como **interfaz**, así que en el test se le puede pasar un falso.

### `vi.fn()`
```ts
import { vi } from 'vitest';

const actualizar = vi.fn();                         // función espía vacía (devuelve undefined)
const buscar = vi.fn(() => ({ id: 1, ejemplares: 3 })); // espía con implementación (stub + spy)

actualizar({ id: 1, ejemplares: 2 });

expect(actualizar).toHaveBeenCalled();                          // se llamó al menos una vez
expect(actualizar).toHaveBeenCalledTimes(1);                    // exactamente una vez
expect(actualizar).toHaveBeenCalledWith({ id: 1, ejemplares: 2 }); // con estos argumentos
expect(actualizar).not.toHaveBeenCalled();                      // nunca se llamó

buscar.mockReturnValue(undefined);          // cambia lo que devuelve
buscar.mockReturnValueOnce({ id: 2 });      // solo la próxima vez
buscar.mockImplementation((id) => ...);     // cambia la implementación
actualizar.mock.calls;                      // [[{ id: 1, ejemplares: 2 }]] — todas las llamadas y sus argumentos
```

### Repositorio falso del parcial
```ts
function crearRepositorioFalso(libro: Libro) {
  return {
    listar: vi.fn(() => [libro]),
    buscarPorId: vi.fn(() => ({ ...libro })),
    guardar: vi.fn((datos: NuevoLibro) => ({ id: 99, ...datos })),
    actualizar: vi.fn(),
  } satisfies LibroRepository;     // ← comprueba que cumple la interfaz SIN perder los tipos de vi.fn
}

it('con ejemplares suficientes llama a actualizar una sola vez', () => {
  const repo = crearRepositorioFalso({ id: 1, titulo: 'Rayuela', autor: 'Cortázar', ejemplares: 3 });
  const servicio = new LibroService(repo);

  servicio.prestar(1, 2);

  expect(repo.actualizar).toHaveBeenCalledTimes(1);
  expect(repo.actualizar).toHaveBeenCalledWith({ id: 1, titulo: 'Rayuela', autor: 'Cortázar', ejemplares: 1 });
});
```
- `satisfies` (TypeScript 4.9+) verifica que el objeto cumple `LibroRepository` pero **conserva** el tipo exacto (por eso `repo.actualizar` sigue siendo un `vi.fn()` con `.mock`).
- **Verificar que algo NO pasó** es tan importante como verificar que pasó: "lanza `EjemplaresInsuficientesError` **y NO llama a actualizar**" comprueba que el servicio **valida antes de guardar**.

### `vi.spyOn`
Espía un método de un objeto **real** sin reemplazarlo del todo:
```ts
const espia = vi.spyOn(console, 'log').mockImplementation(() => {});  // silencia y espía console.log
// ...
expect(espia).toHaveBeenCalledWith('[NOTIFICACIÓN] ...');
espia.mockRestore();
```

## 8. Pruebas de integración HTTP con Supertest

**Supertest** envía peticiones HTTP a una app de Express **sin levantar el servidor** en un puerto. Por eso se separa:
- `src/app.ts`: **arma** la app (`crearApp()`) y la **exporta** (la usan los tests).
- `src/server.ts`: la **levanta** con `listen` (no lo usan los tests).

```ts
import request from 'supertest';
import { crearApp } from '../src/app';

it('GET /libros/:id inexistente responde 404', async () => {
  const res = await request(crearApp()).get('/libros/999');
  expect(res.status).toBe(404);
  expect(res.body).toEqual({ error: 'Libro no encontrado' });
});

it('POST /libros con datos inválidos responde 400', async () => {
  const res = await request(crearApp())
    .post('/libros')
    .send({ titulo: '', autor: 'X', ejemplares: 1 });   // .send() manda el body como JSON
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('error');
});
```
- `res.status`: código HTTP. `res.body`: el JSON ya parseado. `res.headers`: cabeceras.
- `crearApp()` en **cada** test → cada test arranca con datos limpios (independencia).

### Códigos HTTP que se usan
| Código | Significado | Cuándo |
|---|---|---|
| **200** OK | Éxito | GET, PUT/PATCH correctos |
| **201** Created | Se creó un recurso | POST correcto |
| **204** No Content | Éxito sin cuerpo | DELETE |
| **400** Bad Request | Datos inválidos | `ValidacionError`, `RangeError` |
| **401** Unauthorized | No autenticado (falta o es inválido el token) | Integrador |
| **403** Forbidden | Autenticado pero **sin permiso** | Integrador |
| **404** Not Found | El recurso no existe | `NoEncontradoError` |
| **409** Conflict | Conflicto con el estado actual | `EjemplaresInsuficientesError`, email ya registrado |
| **500** Internal Server Error | Error inesperado | Cualquier otro error |

### Middleware de manejo de errores (Express)
```ts
export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ValidacionError || err instanceof RangeError) { res.status(400).json({ error: err.message }); return; }
  if (err instanceof NoEncontradoError) { res.status(404).json({ error: err.message }); return; }
  if (err instanceof EjemplaresInsuficientesError) { res.status(409).json({ error: err.message }); return; }
  res.status(500).json({ error: 'Error interno del servidor' });
}
```
- Tiene **4 parámetros** (`err, req, res, next`): así Express sabe que es de errores.
- Se registra **al final** (`app.use(manejarErrores)` después de las rutas).
- En **Express 5**, si un controlador lanza un error (incluso en una función `async`), Express lo pasa automáticamente a este middleware.
- Los **errores propios** (`class NoEncontradoError extends Error`) permiten traducir cada problema de dominio a su código HTTP con `instanceof`.

## 9. Arquitectura en capas y pruebas

```
routes → controllers → services → repositories → datos
```
| Capa | Responsabilidad | Qué NO hace |
|---|---|---|
| **routes** | Asocia método + URL con un controlador | Lógica |
| **controllers** | Traduce HTTP ↔ servicio (lee `req.params`, `req.body`; responde `res.status().json()`) | Reglas de negocio |
| **services** | **Toda** la lógica de negocio. No conocen Express (no reciben `req` ni `res`) | Acceso directo a datos |
| **repositories** | Único acceso a los datos. Se definen como **interfaz** y se implementan | Reglas |

Por qué facilita probar:
- El **servicio** se prueba **unitariamente** pasándole un repositorio falso (sin HTTP, sin base).
- La **API** se prueba **de integración** con Supertest (ruta + controlador + servicio + repo en memoria).
- Si un endpoint responde mal, se **sigue el recorrido** de la petición capa por capa: ruta → controlador → servicio. (Pista del parcial: el controlador `obtener` llamaba a `service.buscar` —que devuelve `undefined`— en vez de a `service.obtener` —que lanza `NoEncontradoError`—, y Express respondía 200 con cuerpo vacío.)

## 10. TDD: rojo, verde, refactor

**Test-Driven Development:** escribir el test **antes** que el código.
1. **Rojo:** escribís un test para el comportamiento nuevo (o el bug). **Tiene que fallar** (si pasa, el test no prueba nada nuevo o el bug no existe).
2. **Verde:** escribís el **mínimo** código para que pase.
3. **Refactor:** mejorás el diseño **sin** que deje de pasar.

En el parcial: "El del libro inexistente **tiene que fallar** antes de que corrijas el código (TDD: rojo). Corregí el código para que pase (verde)."

## 11. `npm test` vs. `npm run typecheck`

| | `npm test` (`vitest run`) | `npm run typecheck` (`tsc --noEmit`) |
|---|---|---|
| ¿Ejecuta el código? | **Sí** | **No** |
| ¿Qué detecta? | **Comportamiento** incorrecto (150 % no lanza error) | Errores de **tipos** (un `string` donde va un `number`) |
| ¿Genera JS? | No | No (`--noEmit`) |

**Hay que usar ambos.** Vitest **no** verifica tipos: un test puede pasar con un error de tipos adentro.

## 12. Integración continua

**CI (integración continua):** en cada `push` o `pull_request`, un servidor descarga el repositorio, instala dependencias, verifica tipos y corre las pruebas. Si algo falla, se ve en GitHub antes de integrar.

```yaml
# .github/workflows/pruebas.yml
name: Pruebas automatizadas
on: [push, pull_request]
jobs:
  pruebas:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
      - run: npm ci              # con package-lock.json versionado: instalación reproducible
      - run: npm run typecheck
      - run: npm test
```
`npm ci` instala **exactamente** lo del `package-lock.json` (reproducible). El repo se sube **sin** `node_modules`.

## 13. Preguntas de cierre y trampas

- **¿Pruebas vs. tipos?** `npm test` ejecuta y comprueba resultados; `typecheck` analiza tipos sin ejecutar.
- **¿Qué descubre un test que una prueba manual podría pasar por alto?** Casos límite e inválidos que nadie prueba a mano (150 %, precio negativo).
- **¿Por qué volver a correr todo después de corregir?** Para confirmar que el cambio arregló lo que fallaba y **no rompió** nada que antes andaba (regresión).
- **¿Por qué `toThrow` recibe una función?** Si se llamara directamente, el error saltaría antes de que Vitest pueda inspeccionarlo.
- **¿Por qué `RangeError`?** El dato es del tipo correcto pero está fuera del rango permitido.
- **¿Por qué `Number.isFinite`?** También rechaza `NaN` e `Infinity`, que `< 0` o `> 100` solos no atrapan (`NaN < 0` es `false` y `NaN > 100` también).
- **¿Por qué `Number.isInteger` y no `% 1 === 0`?** Rechaza `NaN`, `Infinity` y no-números de una sola vez.

Trampas:
1. Modificar el test para que pase cuando el error está en el código → **prohibido** en el parcial.
2. `expect(fn()).toThrow()` sin la flecha.
3. Olvidar `await` con Supertest → el test pasa sin comprobar nada.
4. `toBe` con objetos → usar `toEqual`.
5. Tests que dependen de otros (comparten un repositorio modificado) → crear todo en cada test (o `beforeEach`).
6. Dejar un `it.only` → se saltean los demás.
7. Confiar en que "pasa" = "está bien": un test con una expectativa mal escrita también pasa.
8. Corregir solo el test que fallaba y no volver a correr todo.
