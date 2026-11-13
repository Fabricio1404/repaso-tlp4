# 04 · Calidad y pruebas de software (Unidad 4): Vitest y Supertest

> **Requisito:** temas 01 y 03 (sobre todo DIP).
> **Importante:** la **parte práctica del segundo parcial evalúa SOLO testing**. Te dan un proyecto Express + TypeScript ya hecho, con tests que fallan a propósito, y tenés que interpretar fallas, escribir casos y usar dobles de prueba. Este tema es **el más importante** para esa parte.

**Contenido**
1. [¿Para qué probar?](#1-para-qué-probar)
2. [Qué es una prueba, caso de prueba y aserción](#2-qué-es-una-prueba)
3. [Manual vs automatizada](#3-prueba-manual-vs-automatizada)
4. [Niveles de prueba y la pirámide](#4-niveles-de-prueba-y-la-pirámide)
5. [Anatomía de un test (preparar, ejecutar, comprobar)](#5-anatomía-de-un-test)
6. [Vitest a fondo](#6-vitest-a-fondo)
7. [Diseñar casos: habituales, límite e inválidos](#7-diseñar-casos)
8. [Interpretar un test que falla](#8-interpretar-un-test-que-falla)
9. [Dobles de prueba: stub, mock, spy, fake y `vi.fn()`](#9-dobles-de-prueba)
10. [Pruebas de integración HTTP con Supertest](#10-supertest)
11. [La arquitectura en capas y dónde buscar un defecto](#11-arquitectura-en-capas)
12. [TDD: rojo, verde, refactor](#12-tdd)
13. [Cobertura](#13-cobertura)
14. [Integración continua (CI) con GitHub Actions](#14-integración-continua)
15. [El procedimiento del segundo parcial](#15-el-procedimiento-del-segundo-parcial)

---

## 1. ¿Para qué probar?

Pregunta de partida: **¿cómo sabemos que una aplicación hace lo que debería hacer?**

> **Funcionar no siempre significa funcionar bien.**

**Situación:** una aplicación de ventas calcula descuentos y no muestra errores al ejecutarse.
**Problema:** si alguien ingresa un descuento del **150 %**, el total da **negativo** (-500).
**Pregunta:** ¿cómo detectamos ese defecto **antes** de entregar el sistema?

Que un programa corra sin errores no garantiza que su comportamiento sea correcto. Para eso están las pruebas.

### Vocabulario básico

| Término | Significado |
|---|---|
| **Error** (equivocación) | Lo que hace mal una **persona** (escribir `<=` en vez de `<`) |
| **Defecto** (bug, falla en el código) | El resultado de ese error **dentro del código** |
| **Falla** | Cuando el defecto **se manifiesta** al ejecutar (el total da negativo) |
| **Calidad** | Mucho más que "no tener errores": también mantenibilidad, confiabilidad, seguridad, usabilidad |

> Las pruebas dan **evidencia** sobre el funcionamiento del software, **no una garantía absoluta** de que no haya errores. Contribuyen a la calidad, pero no la abarcan completa.

---

## 2. Qué es una prueba

Una **prueba** compara el **comportamiento observado** con un **resultado esperado**.

| Entrada | Acción | Esperado |
|---|---|---|
| Precio: $1000 | Aplicar un 10 % | Total: $900 |

Si el sistema devuelve $900, la prueba **pasa**; si devuelve otra cosa, **falla** y revela un posible defecto.

Un **caso de prueba** tiene:
- una **entrada o condición** (precio 1000, descuento 10 %),
- una **acción** (ejecutar `calcularPrecioFinal(1000, 10)`),
- un **resultado esperado** (900).

La **aserción** es la expresión que compara lo obtenido con lo esperado: `expect(total).toBe(900)`.

> ⚠️ **El resultado esperado sale de los REQUISITOS (las reglas del negocio), no de lo que el código devuelve hoy.** Si escribís el esperado mirando el código, vas a "confirmar" los errores en vez de encontrarlos.

---

## 3. Prueba manual vs automatizada

| Manual | Automatizada |
|---|---|
| Una **persona** ejecuta acciones, observa y compara con lo esperado | El **código** ejecuta comprobaciones **repetibles** e informa si pasaron o fallaron |
| Útil para **explorar** y descubrir situaciones nuevas | Verifica comportamientos **conocidos** después de **cada cambio** |
| Permite observar la **experiencia de usuario** | Se ejecuta desde la terminal (`npm test`) o en **integración continua** |
| Lenta, costosa de repetir | Rápida, se corre cientos de veces sin esfuerzo |

Son **complementarias**: una no reemplaza a la otra.

---

## 4. Niveles de prueba y la pirámide

| Nivel | Qué prueba | Ejemplo | Velocidad |
|---|---|---|---|
| **Unitaria** | Una función o comportamiento pequeño, **aislado** | `calcularMulta(3)` devuelve 1500 | Muy rápida |
| **Integración** | **Varias partes** trabajando juntas | Pedir `GET /libros/1` y que pase por ruta + controlador + servicio + repositorio | Media |
| **Extremo a extremo (E2E)** | Un **flujo completo** desde la perspectiva del usuario | Abrir el navegador, loguearse, prestar un libro, ver el cambio | Lenta y frágil |

### La pirámide de pruebas

```
          /\
         /E2E\          pocas: lentas, caras, frágiles, pero cubren todo el flujo
        /------\
       /Integra-\       algunas
      /  ción    \
     /------------\
    /  Unitarias   \    muchas: rápidas, baratas, precisas
   /________________\
```

> La pirámide es una **orientación** para equilibrar **rapidez, alcance y mantenimiento**; **no una regla fija**.

---

## 5. Anatomía de un test

```ts
import { it, expect } from 'vitest';
import { calcularPrecioFinal } from '../src/precios';

it('aplica un descuento del 10 %', () => {
  // 1. PREPARAR (Arrange): armar los datos de entrada
  const precio = 1000;
  const descuento = 10;

  // 2. EJECUTAR (Act): llamar a lo que se prueba
  const total = calcularPrecioFinal(precio, descuento);

  // 3. COMPROBAR (Assert): verificar el resultado
  expect(total).toBe(900);
});
```

A este esquema se le llama **AAA: Arrange, Act, Assert** (preparar, ejecutar, comprobar).

---

## 6. Vitest a fondo

**Vitest** es un framework de pruebas para JavaScript/TypeScript (muy parecido a Jest, pero más rápido e integrado con Vite). Entiende TypeScript sin configuración extra.

### 6.1 Estructura

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('calcularMulta', () => {           // describe: AGRUPA pruebas relacionadas
  it('cobra $500 por un día', () => {        // it: UN caso de prueba (también se puede usar test())
    expect(calcularMulta(1)).toBe(500);      // expect: UNA comprobación
  });

  it.todo('rechaza días negativos');         // pendiente: aparece como "todo", no falla
  it.skip('esto se saltea', () => {});       // se saltea
  // it.only(...)  → corre SOLO ese test. ¡NUNCA lo dejes en la entrega!
});
```

- `beforeEach(() => {...})` → se ejecuta **antes de cada** `it` del `describe` (útil para crear un servicio nuevo cada vez y que los tests **no se pisen**).
- `afterEach`, `beforeAll`, `afterAll` → análogos.

### 6.2 Matchers (comparadores) más usados

| Matcher | Para qué | Ejemplo |
|---|---|---|
| `toBe(x)` | Igualdad **estricta** (`===`). Números, strings, booleanos, **misma referencia** | `expect(total).toBe(900)` |
| `toEqual(obj)` | Igualdad de **contenido** (objetos y arreglos, compara todo en profundidad) | `expect(res.body).toEqual({ total: 900 })` |
| `toMatchObject(obj)` | El objeto **contiene al menos** esas propiedades | `expect(libro).toMatchObject({ id: 1 })` |
| `toHaveProperty('k')` | Tiene esa propiedad | `expect(res.body).toHaveProperty('error')` |
| `toHaveLength(n)` | Largo de arreglo/string | `expect(lista).toHaveLength(4)` |
| `toContain(x)` | Arreglo/string contiene | `expect(nombres).toContain('Ana')` |
| `toBeGreaterThan(n)` / `toBeLessThanOrEqual(n)` | Comparaciones | |
| `toBeCloseTo(n, dec)` | Decimales (evita el problema de `0.1 + 0.2`) | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |
| `toBeUndefined()` / `toBeNull()` / `toBeTruthy()` | | |
| `toBeInstanceOf(Clase)` | Es instancia de | `expect(f.crear('a')).toBeInstanceOf(EnvioA)` |
| `toThrow()` / `toThrow(Tipo)` / `toThrow('mensaje')` | La **función** lanza error | `expect(() => f(-1)).toThrow(RangeError)` |
| `.not` | Niega cualquier matcher | `expect(() => f(3)).not.toThrow()` |

#### `toBe` vs `toEqual` (pregunta típica)

```ts
expect({ a: 1 }).toBe({ a: 1 });      // ❌ falla: son DOS objetos distintos en memoria
expect({ a: 1 }).toEqual({ a: 1 });   // ✅ pasa: mismo contenido
expect(singleton1).toBe(singleton2);  // ✅ para un Singleton, justo queremos misma referencia
```

#### ¿Por qué `toThrow` recibe una **función flecha**?

```ts
expect(() => calcularPrecioFinal(1000, 150)).toThrow(RangeError);   // ✅
expect(calcularPrecioFinal(1000, 150)).toThrow(RangeError);         // ❌
```

Con `() =>` le entregás a Vitest **una función**: Vitest la **ejecuta adentro de un try/catch** y revisa si lanzó el error. Sin la flecha, la llamada se ejecuta **antes** de que `expect` exista, el error salta en tu test y el test se rompe sin que `toThrow` pueda inspeccionarlo.

### 6.3 Asincronía

Si lo que probás devuelve una **Promise** (Supertest, una base de datos, `fetch`), el test tiene que ser `async` y usar `await`:

```ts
it('responde 200', async () => {
  const res = await request(app).get('/libros');   // sin await, res sería una Promise
  expect(res.status).toBe(200);
});

// Para promesas que deben fallar:
await expect(servicio.buscarAsync(999)).rejects.toThrow(NoEncontradoError);
```

### 6.4 Leer la salida de `npm test`

```
 ✓ tests/ej2-validaciones.test.ts (1 test) 3ms
 ❯ tests/ej1-reglas-negocio.test.ts (9 tests | 4 failed)
     ✓ cobra $500 por un día de retraso
     × rechaza días de retraso negativos
 ...
 FAIL  tests/ej1-reglas-negocio.test.ts > Ej. 1 - calcularMulta > rechaza días de retraso negativos
AssertionError: expected [Function] to throw an error
 ❯ tests/ej1-reglas-negocio.test.ts:25:42

      Tests  4 failed | 7 passed | 4 todo (15)
```

- `✓` pasó · `×` falló · `↓` / `todo` pendiente.
- `FAIL archivo > describe > it` te dice **exactamente qué test** falló.
- `AssertionError: expected X to be Y` → **X es lo que obtuvo**, **Y lo que esperaba el test**.
- `❯ archivo:línea:columna` → dónde está el `expect` que falló.

### 6.5 `npm test` vs `npm run typecheck`

| Comando | Qué hace |
|---|---|
| `npm test` (`vitest run`) | **Ejecuta** los tests. Vitest **no revisa tipos** (los borra y ejecuta) |
| `npm run test:watch` (`vitest`) | Igual, pero se repite al guardar |
| `npm run typecheck` (`tsc --noEmit`) | **Revisa los tipos** de `src` y `tests`, no ejecuta |

En la entrega se exigen **los dos sin errores**. Un test puede pasar y aun así tener un error de tipos.

---

## 7. Diseñar casos

| Tipo | Qué es | Ejemplo (descuento de 0 a 100) |
|---|---|---|
| **Habitual** | El uso normal | 10 % → $900 |
| **Límite** | Justo **en el borde** de una regla (y justo afuera) | 0 % → $1000 · 100 % → $0 · 101 % → error |
| **Inválido** | Datos que la regla prohíbe | 150 %, -5 %, `NaN`, `'abc'` |

### La receta para las reglas del parcial

- **Regla con rango** ("entero ≥ 1", "hasta 10.000", "de 08:00 a 19:30"):
  - el **borde exacto** → válido,
  - el valor **justo afuera** → inválido.
- **Regla "obligatorio"**: `''` (vacío) y `'   '` (solo espacios).
- **Números**: **negativo**, **decimal** (si debe ser entero), **`NaN`**.
- **Al menos un caso por regla.**

> **¿Por qué los bordes?** Porque los errores viven ahí: `<` en vez de `<=`, `< 0` en vez de `< 1`. Con un valor "del medio" nunca los ves.

Truco para no repetir datos:
```ts
const valido = { titulo: 'Rayuela', autor: 'Cortázar', ejemplares: 3 };
expect(() => validar({ ...valido, ejemplares: 0 })).toThrow(ValidacionError);
//                      copia todo y pisa SOLO "ejemplares"
```

---

## 8. Interpretar un test que falla

Ante una falla, la pregunta es: **¿el problema está en el código, en la prueba o en el requisito?**

| Posibilidad | Ejemplo |
|---|---|
| **Código** | La función no valida el rango y calcula un total negativo |
| **Prueba** | El test está mal escrito o espera algo que la regla no dice |
| **Requisito** | Nunca se definió qué hacer con descuentos mayores al 100 % |

### Procedimiento (automatizalo)

1. ¿Qué **espera** el test? (nombre + `expect`)
2. ¿Qué dice **la regla**? (buscala en la tabla del README)
3. ¿Coinciden?
   - **Sí** → el error está en el **código**. Corregí el código. **No toques el test.**
   - **No** → el error está en el **test**. Corregí la expectativa (y el nombre si hace falta).
4. **Corré todo de nuevo** (`npm test`): una corrección puede romper otro test.
5. Anotá: test · código o test · regla citada.

> El resultado de un test **se interpreta, no se corrige a ciegas**. "Hacer que pase" cambiando el test cuando el error está en el código es la peor respuesta posible en el parcial.

---

## 9. Dobles de prueba

Cuando el código depende de algo **externo** (una base de datos, una API, un servicio de mails, el reloj), en una prueba unitaria se lo reemplaza por un **doble de prueba** (como el doble de riesgo de una película).

| Doble | Qué hace | Ejemplo |
|---|---|---|
| **Stub** | Da **respuestas predeterminadas** | Un repositorio que siempre devuelve el mismo libro |
| **Mock** | Permite **controlar o verificar interacciones** (que se llamó, cuántas veces, con qué) | Verificar que se llamó a `guardar()` una vez |
| **Spy** | **Registra llamadas** para examinarlas (puede envolver a la función real) | Contar cuántas veces y con qué argumentos se llamó a `enviarMail()` |
| **Fake** | Implementación **simplificada que funciona** | `LibroRepositoryEnMemoria` (un arreglo en vez de PostgreSQL) |

**¿Por qué se puede?** Por **DIP**: si `LibroService` recibe un `LibroRepository` (interface) por constructor, le podés pasar cualquier objeto que cumpla la interface. Si hiciera `new PostgresRepository()` adentro, sería imposible.

### `vi.fn()`: la función espía de Vitest

```ts
import { vi, expect } from 'vitest';

const espia = vi.fn();                    // función que no hace nada pero REGISTRA las llamadas
const conRespuesta = vi.fn(() => 42);     // además devuelve 42 (stub + spy)

espia('hola', 1);

expect(espia).toHaveBeenCalled();                 // se llamó al menos una vez
expect(espia).toHaveBeenCalledTimes(1);           // exactamente una vez
expect(espia).toHaveBeenCalledWith('hola', 1);    // con esos argumentos (comparación como toEqual)
expect(espia).not.toHaveBeenCalled();             // NO se llamó
```

### Repositorio falso (como en el parcial)

```ts
function crearRepositorioFalso(libro: Libro) {
  return {
    listar: vi.fn(() => [libro]),
    buscarPorId: vi.fn(() => ({ ...libro })),
    guardar: vi.fn((datos: NuevoLibro) => ({ id: 99, ...datos })),
    actualizar: vi.fn(),
  } satisfies LibroRepository;   // satisfies: TS verifica que cumpla la interface
}

it('presta y actualiza una vez con los ejemplares descontados', () => {
  const repo = crearRepositorioFalso({ id: 1, titulo: 'Rayuela', autor: 'Cortázar', ejemplares: 3 });
  const servicio = new LibroService(repo);

  servicio.prestar(1, 2);

  expect(repo.actualizar).toHaveBeenCalledTimes(1);
  expect(repo.actualizar).toHaveBeenCalledWith({ id: 1, titulo: 'Rayuela', autor: 'Cortázar', ejemplares: 1 });
});

it('si falla, NO actualiza', () => {
  const repo = crearRepositorioFalso({ id: 1, titulo: 'Rayuela', autor: 'Cortázar', ejemplares: 3 });
  expect(() => new LibroService(repo).prestar(1, 99)).toThrow(EjemplaresInsuficientesError);
  expect(repo.actualizar).not.toHaveBeenCalled();
});
```

> `toHaveBeenCalledWith` compara el objeto **completo**. Si solo ponés `{ ejemplares: 1 }`, falla. Usá el spread: `{ ...libro, ejemplares: 1 }`, o `expect.objectContaining({ ejemplares: 1 })`.

### `vi.spyOn`: espiar un método real

```ts
const spy = vi.spyOn(console, 'log');
miFuncionQueLoguea();
expect(spy).toHaveBeenCalledWith('Listo');
spy.mockRestore();   // devolver el original
```

### Testear patrones de diseño

| Patrón | Cómo se testea |
|---|---|
| **Singleton** | `expect(A.getInstance()).toBe(A.getInstance())` (`toBe` = misma referencia). Ojo: el estado se arrastra entre tests |
| **Factory** | `expect(Fabrica.crear('express')).toBeInstanceOf(EnvioExpress)` + probar el comportamiento del objeto |
| **Observer** | Observadores espía: `const obs = { actualizar: vi.fn() }` → `toHaveBeenCalledWith(...)`; tras desuscribir, `not.toHaveBeenCalled()` |
| **Adapter** | Pasarle un **stub** del sistema viejo (`{ leerF: () => 86 }`) y verificar la traducción (`obtenerCelsius()` → 30) |
| **DIP en general** | Todo lo que llega por constructor se reemplaza por un doble, **incluso el reloj**: `() => new Date('2026-03-10')` |

---

## 10. Supertest

**Supertest** envía peticiones HTTP a una app Express **durante los tests, sin levantar el servidor** en un puerto. Para eso la app se **arma** en `app.ts` (o con una función `crearApp()`) y el `listen` queda aparte en `server.ts`.

```ts
import request from 'supertest';
import { crearApp } from '../src/app';

it('GET /libros/1 responde 200 con el libro', async () => {
  const res = await request(crearApp()).get('/libros/1');
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 });
});

it('POST /libros con datos inválidos responde 400', async () => {
  const res = await request(crearApp())
    .post('/libros')
    .send({ titulo: '', autor: 'X', ejemplares: 1 });   // body en JSON
  expect(res.status).toBe(400);
  expect(res.body).toHaveProperty('error');
});

it('GET /multas?dias=3', async () => {
  const res = await request(crearApp()).get('/multas').query({ dias: 3 });
  expect(res.body).toEqual({ multa: 1500 });
});
```

`crearApp()` crea un **repositorio nuevo cada vez**, así los tests no se pisan entre sí (si un test presta libros, el siguiente arranca con los datos iniciales).

### Códigos HTTP que tenés que saber

| Código | Significado | Cuándo en el parcial |
|---|---|---|
| **200** OK | Todo bien | GET exitoso |
| **201** Created | Se creó un recurso | POST que registra |
| **204** No Content | Bien, sin cuerpo | DELETE |
| **400** Bad Request | Datos inválidos | `ValidacionError`, `RangeError`, `TypeError` |
| **401** Unauthorized | **No estás autenticado** (no hay token o es inválido) | Integrador (JWT) |
| **403** Forbidden | Estás autenticado pero **no tenés permiso** | Integrador (permisos) |
| **404** Not Found | El recurso no existe | `NoEncontradoError` |
| **409** Conflict | Conflicto con el estado actual | Sin stock / duplicado |
| **500** Internal Server Error | Error no previsto del servidor | Cualquier otro error |

### El middleware de errores

```ts
export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ValidacionError || err instanceof RangeError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof NoEncontradoError) {
    res.status(404).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'Error interno del servidor' });
}
```
- Tiene **4 parámetros** (así Express sabe que es de errores) y se registra **al final** con `app.use(manejarErrores)`.
- Usa `instanceof` con los **errores propios** (tema 01: clases que extienden `Error`).
- En **Express 5**, si un controlador **lanza** un error (o una promesa se rechaza), Express lo manda solo a este middleware.

---

## 11. Arquitectura en capas

Los proyectos del parcial están en capas (SRP aplicado):

```
Petición HTTP
   │
   ▼
routes/        ← ¿existe la ruta? ¿método y path correctos? ¿orden correcto?
   │
   ▼
controllers/   ← HTTP ↔ servicio: lee req.params/body/query, llama al servicio, pone el status
   │
   ▼
services/      ← REGLAS DE NEGOCIO: valida, calcula, lanza errores de dominio
   │
   ▼
repositories/  ← persistencia (en memoria / base de datos), detrás de una INTERFACE
   │
   ▲ (si algo lanza un error, salta a...)
middlewares/manejo-errores  ← traduce errores de dominio a códigos HTTP
```

**Para un status equivocado** (200 que debería ser 404, 500 que debería ser 400), seguí el recorrido:
1. **routes**: ¿existe la ruta? ¿apunta al método correcto del controlador?
2. **controllers**: ¿qué método del servicio llama? (¡`buscar` vs `obtener`!) ¿qué status pone?
3. **services**: ¿lanza el error de dominio que corresponde?
4. **middleware**: ¿traduce ese error al código correcto?

Cada defecto suele estar en **una sola** capa. Corregí **ahí**, no en todas.

---

## 12. TDD

**Test-Driven Development**: escribir la prueba **antes** de implementar.

1. 🔴 **Rojo**: escribir una prueba que **falle** (porque la funcionalidad no existe o tiene un defecto).
2. 🟢 **Verde**: implementar **lo mínimo** para que pase.
3. 🔵 **Refactorizar**: mejorar el código **sin romper** las pruebas.

El ciclo se repite por cada comportamiento nuevo.

> TDD es una **estrategia de desarrollo**, **no** una condición para poder probar. También se pueden escribir pruebas después del código.

En el parcial (ej. 3b): "el test del libro inexistente **tiene que fallar** antes de que corrijas el código (rojo)" → escribís el test, ves que falla, corregís, ves que pasa.

---

## 13. Cobertura

La **cobertura** indica **qué partes del código se ejecutaron** durante las pruebas (líneas, ramas, funciones). Se mide con `vitest run --coverage`.

> Una cobertura alta **no implica ausencia de defectos**: el código puede ejecutarse durante un test sin que el test compruebe lo correcto. Es un **indicador** para encontrar zonas sin probar, **no una garantía** de calidad.

Ejemplo: un test que llama `calcularMulta(5)` sin ningún `expect` da 100 % de cobertura de esa función y no verifica nada.

---

## 14. Integración continua

**CI (Continuous Integration)**: cada vez que alguien sube código, un servidor **automáticamente** instala dependencias, revisa tipos y ejecuta las pruebas.

1. **Cambio**: se envía código al repositorio (`git push`).
2. **Verificación**: un flujo automático instala dependencias y ejecuta pruebas.
3. **Resultado**: se informa si pasan o fallan (✅ / ❌ en GitHub).

Con **GitHub Actions** se define en `.github/workflows/pruebas.yml`:

```yaml
name: Pruebas
on: [push, pull_request]          # cuándo se ejecuta
jobs:
  test:
    runs-on: ubuntu-latest         # en qué máquina
    steps:
      - uses: actions/checkout@v4          # baja el código
      - uses: actions/setup-node@v4        # instala Node
        with:
          node-version: 22
      - run: npm ci                        # instala dependencias (exactas del package-lock)
      - run: npm run typecheck             # revisa tipos
      - run: npm test                      # ejecuta pruebas
```

Así cada cambio se verifica solo, sin depender de que alguien se acuerde de correr los tests.

---

## 15. El procedimiento del segundo parcial

**Formato:** 1,5 h · **sin IA** · se aprueba con **2 de 3** ejercicios · se entrega **sin `node_modules`** con `npm test` y `npm run typecheck` sin errores y `RESPUESTAS.md` completo.

| Ejercicio | Qué evalúa | Qué hacer |
|---|---|---|
| **1 · Interpretar fallas** | Decidir **código o test** según las reglas | Procedimiento de la sección 8. Tabla en `RESPUESTAS.md` citando la regla |
| **2 · Casos límite e inválidos** | Diseñar casos | Receta de la sección 7. Si un test correcto falla → corregir el **código** |
| **3 · Dobles e integración** | `vi.fn()` + Supertest + TDD | 3a: repositorio falso. 3b: test rojo → recorrido de capas → verde |

### Reparto del tiempo

| Minutos | Qué hacer |
|---|---|
| 0–10 | `npm install`, `npm test`, `npm run typecheck`. **Leer la tabla de reglas.** Datos en `RESPUESTAS.md` |
| 10–35 | Ej. 1: un test a la vez → regla → veredicto → corrección → correr todo → anotar |
| 35–60 | Ej. 2: casos **desde las reglas**, correr, corregir defectos, anotar |
| 60–85 | Ej. 3: 3a con el falso; 3b rojo → recorrido → verde |
| 85–90 | `npm test` + `npm run typecheck` + `RESPUESTAS.md` + comprimir sin `node_modules` |

### Checklist final
- [ ] Ningún `it.only` olvidado
- [ ] `toThrow` siempre con `() =>`
- [ ] `toEqual` (no `toBe`) para objetos
- [ ] `async` + `await` con Supertest
- [ ] No modifiqué un test para que pase cuando el error era del código
- [ ] Cada fila de `RESPUESTAS.md` cita la regla (R1, R2...)
- [ ] Comprimido **sin** `node_modules`

---

## 📌 Lo que tenés que saber sí o sí

- Una prueba compara lo **observado** con lo **esperado**; el esperado sale de los **requisitos**.
- **Unitaria** (aislada) · **Integración** (varias partes) · **E2E** (flujo completo). Pirámide: muchas unitarias, pocas E2E; es orientación, no regla.
- **AAA**: preparar, ejecutar, comprobar. `describe` agrupa, `it` es un caso, `expect` comprueba.
- `toBe` (estricto/referencia) vs `toEqual` (contenido). `toThrow` con **flecha**.
- Casos **habituales, límite e inválidos**. Los bordes encuentran los errores.
- Test falla → ¿código, test o requisito? La **regla** decide.
- **Stub** (respuestas fijas) · **Mock** (verifica interacciones) · **Spy** (registra llamadas) · **Fake** (implementación simple). `vi.fn()`.
- **Supertest** prueba la API sin levantar el servidor. 200/201/400/401/403/404/409/500.
- **TDD**: rojo → verde → refactor. Es una estrategia, no un requisito para probar.
- **Cobertura** alta ≠ sin defectos. **CI**: cada push ejecuta los tests (GitHub Actions).

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
