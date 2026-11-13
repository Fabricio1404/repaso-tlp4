# TLP IV · Segundo parcial · Parte práctica · **TEMA B**

API REST del **catálogo de una biblioteca escolar** hecha con Express + TypeScript y probada con Vitest + supertest.
La parte práctica evalúa **solo testing**: vas a leer tests, interpretar fallas, escribir tests nuevos y corregir el código que esos tests revelen como defectuoso.

> **Duración:** 1,5 horas · **No está permitido usar asistentes de IA.**
> Antes de empezar, completá tus datos en `RESPUESTAS.md`.

---

## 1. Puesta en marcha

Requisito: Node.js 20 o superior.

```bash
npm install          # instala dependencias
npm test             # ejecuta todos los tests una vez
npm run test:watch   # ejecuta los tests y los repite al guardar cambios
npm run typecheck    # verifica los tipos con tsc (sin generar .js)
npm run dev          # levanta la API en http://localhost:3000 (opcional)
```

Al ejecutar `npm test` por primera vez **vas a ver tests que fallan**. Es parte del examen.

## 2. Estructura del proyecto (arquitectura en capas)

```
src/
├── app.ts                          # arma la app de Express (se usa en los tests)
├── server.ts                       # levanta el servidor
├── routes/libro.routes.ts          # rutas HTTP
├── controllers/libro.controller.ts # capa de presentación: HTTP <-> servicio
├── services/
│   ├── libro.service.ts            # capa de negocio
│   ├── multas.ts                   # calcularMulta()
│   └── validaciones.ts             # validarNuevoLibro()
├── repositories/libro.repository.ts  # interfaz LibroRepository + implementación en memoria
├── middlewares/manejo-errores.ts   # traduce errores del dominio a códigos HTTP
├── models/libro.ts
├── data/libros-iniciales.ts
└── errors.ts                       # ValidacionError, NoEncontradoError, EjemplaresInsuficientesError
tests/
├── ej1-reglas-negocio.test.ts
├── ej2-validaciones.test.ts
└── ej3-servicio-y-api.test.ts
```

No hay base de datos: el repositorio guarda los libros en memoria. Cada llamada a `crearApp()` arranca con los 4 libros de `data/libros-iniciales.ts`.

## 3. Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/libros` | Lista todos los libros |
| GET | `/libros/:id` | Devuelve un libro |
| POST | `/libros` | Registra un libro. Body: `{ titulo, autor, ejemplares }` |
| POST | `/libros/:id/prestamo` | Presta ejemplares. Body: `{ cantidad }` |
| GET | `/multas?dias=3` | Devuelve `{ multa }` |

Los errores se responden con el formato `{ "error": "mensaje" }`.

## 4. Reglas de negocio

Estas reglas son **el requisito**. Ante cualquier duda entre lo que dice un test, lo que hace el código y lo que dice esta tabla, manda esta tabla.

| Regla | Descripción |
|---|---|
| **R1** | La multa por devolución tardía es de **$500 por cada día** de retraso. |
| **R2** | La multa **nunca supera los $10.000** (tope). |
| **R3** | Los días de retraso deben ser un número **entero mayor o igual a 0**. Sin retraso (0 días) la multa es $0. Si el valor no es válido, `calcularMulta` lanza `RangeError`. |
| **R4** | El título es obligatorio: no puede estar vacío ni contener solo espacios. |
| **R5** | El autor es obligatorio: no puede estar vacío ni contener solo espacios. |
| **R6** | La cantidad de ejemplares debe ser un número entero **mayor o igual a 1**. |
| **R7** | Se puede prestar una cantidad entera mayor a 0 y **menor o igual** a los ejemplares disponibles. Si se piden más, se lanza `EjemplaresInsuficientesError`. Los ejemplares nunca quedan negativos. |
| **R8** | La API responde **400** ante datos inválidos (`ValidacionError` o `RangeError`), **404** si el libro no existe (`{ "error": "Libro no encontrado" }`) y **409** si no hay ejemplares suficientes. |

R4, R5 y R6 se validan en `validarNuevoLibro`; si una no se cumple, se lanza `ValidacionError`.

---

## 5. Consigna

Se aprueba la parte práctica resolviendo correctamente **al menos 2 de los 3 ejercicios**.

### Ejercicio 1 · Interpretar fallas y corregir

Archivo: `tests/ej1-reglas-negocio.test.ts`

1. Ejecutá `npm test` y observá qué tests del Ej. 1 fallan.
2. Para **cada** test que falla, decidí dónde está el error: **en el código** o **en el test**. Usá las reglas de negocio de la sección 4 como criterio. *No todos los fallos se deben al código.*
3. Corregí lo que corresponda (el código en `src/` o el test) hasta que todos los tests del Ej. 1 pasen.
4. En `RESPUESTAS.md`, completá la tabla del Ej. 1: test, dónde estaba el error y por qué (citando la regla).

> Si el error está en el código, **no** modifiques el test para que pase.

### Ejercicio 2 · Casos límite e inválidos

Archivo: `tests/ej2-validaciones.test.ts`

La función `validarNuevoLibro` (`src/services/validaciones.ts`) tiene un solo test.

1. Escribí tests que cubran las reglas **R4, R5 y R6**. Como mínimo:
   - **dos casos límite** (valores justo en el borde de una regla),
   - **tres casos inválidos**, al menos uno por cada regla.
2. Si algún test que escribiste revela un defecto, **corregí el código** de `validaciones.ts` (no el test).
3. En `RESPUESTAS.md`, indicá qué defectos encontraste.

### Ejercicio 3 · Dobles de prueba y prueba de integración

Archivo: `tests/ej3-servicio-y-api.test.ts`

**3a · Repositorio falso (unitaria).** Completá los dos `it.todo` del bloque 3a usando el `crearRepositorioFalso(libro)` que ya está en el archivo (sus métodos son funciones espía `vi.fn()`):
- con ejemplares suficientes, `LibroService.prestar` llama a `repo.actualizar` **una sola vez**, con los ejemplares ya descontados;
- con ejemplares insuficientes, lanza `EjemplaresInsuficientesError` y **no** llama a `repo.actualizar`.

**3b · API con supertest (integración).** Hoy, `GET /libros/999` (un libro que no existe) responde **200** con el cuerpo vacío, pero según R8 debe responder **404** con `{ "error": "Libro no encontrado" }`.
1. Completá los dos `it.todo` del bloque 3b. El del libro inexistente **tiene que fallar** antes de que corrijas el código (TDD: rojo).
2. Corregí el código para que pase (verde). Pista: seguí el recorrido de la petición desde la ruta hasta el servicio.

---

## 6. Entrega

1. `npm test` y `npm run typecheck` deben terminar sin errores. Los tests de los ejercicios que no hayas resuelto pueden quedar en `it.todo`.
2. `RESPUESTAS.md` completo.
3. Comprimí la carpeta del proyecto **sin `node_modules`** y entregala como indique el docente.

---

## 7. Ayuda memoria

```ts
import { describe, it, expect, vi } from 'vitest';

describe('grupo', () => {
  it('caso', () => {
    expect(valor).toBe(1500);                // igualdad estricta (números, strings)
    expect(objeto).toEqual({ a: 1 });        // igualdad de contenido (objetos, arrays)
    expect(objeto).toMatchObject({ a: 1 });  // el objeto contiene al menos esas propiedades
    expect(lista).toHaveLength(4);
    expect(() => fn(-1)).toThrow(RangeError);    // la función lanza ese tipo de error
    expect(() => fn(3)).not.toThrow();
  });
});

// Funciones espía
const espia = vi.fn();
expect(espia).toHaveBeenCalled();
expect(espia).toHaveBeenCalledTimes(1);
expect(espia).toHaveBeenCalledWith({ id: 1, ejemplares: 2 });
expect(espia).not.toHaveBeenCalled();

// supertest
import request from 'supertest';
const res = await request(crearApp()).get('/ruta/1');
expect(res.status).toBe(200);
expect(res.body).toEqual({ error: '...' });
```

Recordá: un test con `async` necesita `await` en la llamada de supertest.
