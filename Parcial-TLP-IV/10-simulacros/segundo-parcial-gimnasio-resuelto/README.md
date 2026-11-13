# TLP IV · Simulacro de segundo parcial · Parte práctica · **GIMNASIO**

> Simulacro armado con el **mismo formato** que el Tema B (Biblioteca). Los defectos son **distintos**, así que no te sirve memorizar la resolución del Tema B: tenés que aplicar el procedimiento.

API REST de las **clases y socios de un gimnasio** hecha con Express + TypeScript y probada con Vitest + supertest.
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
├── app.ts                               # arma la app de Express (se usa en los tests)
├── server.ts                            # levanta el servidor
├── routes/gimnasio.routes.ts            # rutas HTTP
├── controllers/gimnasio.controller.ts   # capa de presentación: HTTP <-> servicio
├── services/
│   ├── gimnasio.service.ts              # capa de negocio
│   ├── cuotas.ts                        # calcularCuota()
│   └── validaciones.ts                  # validarNuevoSocio()
├── repositories/clase.repository.ts     # interfaz ClaseRepository + implementación en memoria
├── middlewares/manejo-errores.ts        # traduce errores del dominio a códigos HTTP
├── models/clase.ts
├── data/clases-iniciales.ts
└── errors.ts                            # ValidacionError, NoEncontradoError, CuposInsuficientesError
tests/
├── ej1-reglas-negocio.test.ts
├── ej2-validaciones.test.ts
└── ej3-servicio-y-api.test.ts
```

No hay base de datos: el repositorio guarda las clases en memoria. Cada llamada a `crearApp()` arranca con las 4 clases de `data/clases-iniciales.ts`.

## 3. Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/clases` | Lista todas las clases |
| GET | `/clases/:id` | Devuelve una clase |
| POST | `/clases/:id/reserva` | Reserva cupos. Body: `{ cantidad }` |
| POST | `/socios` | Registra un socio. Body: `{ nombre, email, edad }` |
| GET | `/cuota?anios=3` | Devuelve `{ cuota }` |

Los errores se responden con el formato `{ "error": "mensaje" }`.

## 4. Reglas de negocio

Estas reglas son **el requisito**. Ante cualquier duda entre lo que dice un test, lo que hace el código y lo que dice esta tabla, manda esta tabla.

| Regla | Descripción |
|---|---|
| **R1** | La cuota mensual base es de **$20.000**. |
| **R2** | Por cada **año completo** de antigüedad se descuenta un **5 %** de la cuota base. El descuento **nunca supera el 25 %**. |
| **R3** | Los años de antigüedad deben ser un número **entero mayor o igual a 0**. Sin antigüedad (0 años) se paga la cuota completa. Si el valor no es válido, `calcularCuota` lanza `RangeError`. |
| **R4** | El nombre es obligatorio: no puede estar vacío ni contener solo espacios. |
| **R5** | El email es obligatorio y **debe contener el carácter `@`**. |
| **R6** | La edad debe ser un número entero **entre 16 y 90 años inclusive**. |
| **R7** | Se puede reservar una cantidad entera mayor a 0 y **menor o igual** a los cupos disponibles. Si se piden más, se lanza `CuposInsuficientesError`. Los cupos nunca quedan negativos. |
| **R8** | La API responde **400** ante datos inválidos (`ValidacionError` o `RangeError`), **404** si la clase no existe (`{ "error": "Clase no encontrada" }`) y **409** si no hay cupos suficientes. |

R4, R5 y R6 se validan en `validarNuevoSocio`; si una no se cumple, se lanza `ValidacionError`.

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

La función `validarNuevoSocio` (`src/services/validaciones.ts`) tiene un solo test.

1. Escribí tests que cubran las reglas **R4, R5 y R6**. Como mínimo:
   - **dos casos límite** (valores justo en el borde de una regla),
   - **tres casos inválidos**, al menos uno por cada regla.
2. Si algún test que escribiste revela un defecto, **corregí el código** de `validaciones.ts` (no el test).
3. En `RESPUESTAS.md`, indicá qué defectos encontraste.

### Ejercicio 3 · Dobles de prueba y prueba de integración

Archivo: `tests/ej3-servicio-y-api.test.ts`

**3a · Repositorio falso (unitaria).** Completá los dos `it.todo` del bloque 3a usando el `crearRepositorioFalso(clase)` que ya está en el archivo (sus métodos son funciones espía `vi.fn()`):
- con cupos suficientes, `GimnasioService.reservar` llama a `repo.actualizar` **una sola vez**, con los cupos ya descontados;
- con cupos insuficientes, lanza `CuposInsuficientesError` y **no** llama a `repo.actualizar`.

**3b · API con supertest (integración).** Hoy, `GET /clases/99` (una clase que no existe) **no** responde lo que dice R8, que es **404** con `{ "error": "Clase no encontrada" }`.
1. Completá los dos `it.todo` del bloque 3b. El de la clase inexistente **tiene que fallar** antes de que corrijas el código (TDD: rojo).
2. Corregí el código para que pase (verde). Pista: seguí el recorrido de la petición desde la ruta hasta el servicio **y de vuelta**.

---

## 6. Entrega

1. `npm test` y `npm run typecheck` deben terminar sin errores. Los tests de los ejercicios que no hayas resuelto pueden quedar en `it.todo`.
2. `RESPUESTAS.md` completo.
3. Comprimí la carpeta del proyecto **sin `node_modules`**.

> Cuando termines, compará con [../SOLUCION-SEGUNDO-PARCIAL-GIMNASIO.md](../SOLUCION-SEGUNDO-PARCIAL-GIMNASIO.md).

---

## 7. Ayuda memoria

```ts
import { describe, it, expect, vi } from 'vitest';

expect(valor).toBe(1500);                    // igualdad estricta (números, strings)
expect(objeto).toEqual({ a: 1 });            // igualdad de contenido (objetos, arrays)
expect(lista).toHaveLength(4);
expect(() => fn(-1)).toThrow(RangeError);    // la función lanza ese tipo de error
expect(() => fn(3)).not.toThrow();

const espia = vi.fn();
expect(espia).toHaveBeenCalledTimes(1);
expect(espia).toHaveBeenCalledWith({ id: 1, cupos: 2 });
expect(espia).not.toHaveBeenCalled();

import request from 'supertest';
const res = await request(crearApp()).get('/ruta/1');
expect(res.status).toBe(200);
expect(res.body).toEqual({ error: '...' });
```
