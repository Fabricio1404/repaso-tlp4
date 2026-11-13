# Respuestas · Segundo parcial TLP IV · Tema B

**Apellido y nombre:** (resolución modelo)
**DNI:** —

## Ejercicio 1

| Test que fallaba | ¿Error en el código o en el test? | ¿Por qué? (citar la regla) |
|---|---|---|
| `rechaza 0 días de retraso` | **Test** | R3: "Sin retraso (0 días) la multa es $0". El 0 es un valor válido; el test esperaba `RangeError`. Se corrigió la expectativa a `toBe(0)` y el nombre del test. |
| `rechaza días de retraso negativos` | **Código** (`multas.ts`) | R3: los días deben ser un entero **≥ 0**; si no, `calcularMulta` lanza `RangeError`. El código no validaba nada y devolvía -1000. Se agregó la validación. |
| `rechaza días de retraso con decimales` | **Código** (`multas.ts`) | R3: los días deben ser un número **entero**. Con 1,5 devolvía 750. Se valida con `Number.isInteger`. |
| `permite prestar todos los ejemplares disponibles` | **Código** (`libro.service.ts`) | R7: se puede prestar una cantidad **menor o igual** a los disponibles. La condición `ejemplares - cantidad <= 0` rechazaba el caso en que quedan 0. Se cambió a `cantidad > ejemplares`. |

## Ejercicio 2

Defectos encontrados en `validarNuevoLibro` (qué test lo reveló y qué corregiste):

- **R5 (autor obligatorio):** los tests `R5: rechaza un autor vacío` y `R5: rechaza un autor con solo espacios` fallaban. El segundo `if` validaba `datos.titulo` otra vez (error de copiar y pegar) en lugar de `datos.autor`. Se corrigió a `datos.autor`.
- **R6 (ejemplares ≥ 1):** el test límite `R6 límite: rechaza 0 ejemplares` fallaba. La condición era `datos.ejemplares < 0`, que acepta 0. Se corrigió a `datos.ejemplares < 1`.

## Ejercicio 3

¿Qué archivo modificaste para que `GET /libros/999` responda 404 y por qué en esa capa?

- `src/controllers/libro.controller.ts`, método `obtener`. El controlador llamaba a `service.buscar(id)`, que devuelve `undefined` si el libro no existe, y `res.json(undefined)` responde **200** con cuerpo vacío. El servicio **ya tenía** el método `obtener(id)` que lanza `NoEncontradoError('Libro no encontrado')`, y el middleware `manejarErrores` **ya traducía** ese error a 404. El defecto estaba en la capa de presentación (el controlador llamaba al método equivocado), así que se corrigió ahí: `this.service.obtener(...)`. La ruta, el servicio y el middleware estaban bien.
