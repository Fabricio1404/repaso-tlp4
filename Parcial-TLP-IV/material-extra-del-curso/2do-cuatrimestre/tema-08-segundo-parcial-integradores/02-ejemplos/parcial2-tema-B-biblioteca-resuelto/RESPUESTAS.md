# Respuestas · Segundo parcial TLP IV · Tema B

**Apellido y nombre:** (resolución modelo)
**DNI:**

## Ejercicio 1

| Test que fallaba | ¿Error en el código o en el test? | ¿Por qué? (citar la regla) |
|---|---|---|
| `rechaza 0 días de retraso` | **En el test** | **R3:** "Sin retraso (0 días) la multa es $0". El test esperaba un `RangeError` que la regla no pide. Se corrigió la expectativa: `expect(calcularMulta(0)).toBe(0)` (y el nombre del test). |
| `rechaza días de retraso negativos` | **En el código** | **R3:** los días deben ser un entero ≥ 0; si no, `RangeError`. `calcularMulta` no validaba y devolvía −1000. Se agregó la validación. |
| `rechaza días de retraso con decimales` | **En el código** | **R3:** "número **entero**". Con 1,5 devolvía 750. La misma validación (`Number.isInteger`) lo corrige. |
| `permite prestar todos los ejemplares disponibles` | **En el código** | **R7:** se puede prestar una cantidad "menor **o igual** a los ejemplares disponibles". `prestar` usaba `libro.ejemplares - cantidad <= 0`, que rechaza pedir exactamente todos (4 de 4). Se cambió a `cantidad > libro.ejemplares`. Los ejemplares siguen sin poder quedar negativos. |

## Ejercicio 2

Defectos encontrados en `validarNuevoLibro` (qué test lo reveló y qué corregiste):

- **R5 · autor vacío:** lo revelaron `rechaza R5 · autor vacío` y `rechaza R5 · autor con solo espacios`. La segunda validación repetía la condición del **título** (`datos.titulo`) en lugar de la del **autor** (error de copiar y pegar). Se cambió a `datos.autor`.
- **R6 · 0 ejemplares:** lo reveló el caso límite `rechaza 0 ejemplares`. La condición era `ejemplares < 0`, que acepta 0. R6 pide "entero **mayor o igual a 1**": se cambió a `ejemplares < 1`.

Casos agregados: 2 límites válidos (1 ejemplar; título y autor de un carácter), 1 límite inválido (0 ejemplares) y 7 inválidos (R4 ×2, R5 ×2, R6 ×3), más uno que verifica el mensaje del autor.

## Ejercicio 3

¿Qué archivo modificaste para que `GET /libros/999` responda 404 y por qué en esa capa?

- `src/controllers/libro.controller.ts`, método `obtener`. Siguiendo el recorrido de la petición: la **ruta** (`GET /libros/:id`) estaba bien; el **controlador** llamaba a `service.buscar(id)`, que devuelve `undefined` cuando no existe, y `res.json(undefined)` responde **200** con cuerpo vacío. El **servicio** ya tenía `obtener(id)`, que lanza `NoEncontradoError('Libro no encontrado')`, y el **middleware de errores** ya traducía ese error a 404. El defecto era que el controlador llamaba al método equivocado: se corrigió en el controlador (capa de presentación) sin tocar la lógica de negocio ni el middleware.
- Primero se escribió el test del 404 y se vio fallar (rojo: `expected 200 to be 404`); después se corrigió el controlador (verde).
