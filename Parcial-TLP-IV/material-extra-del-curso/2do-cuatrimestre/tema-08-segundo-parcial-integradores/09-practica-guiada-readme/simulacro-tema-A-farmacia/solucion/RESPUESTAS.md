# Respuestas · Simulacro segundo parcial · Tema A (Farmacia) · resueltas

## Ejercicio 1

| Test que fallaba | ¿Error en el código o en el test? | ¿Por qué? (citar la regla) |
|---|---|---|
| `65 años ya tiene descuento` | **Código** | **R1:** "65 años **o más**". `calcularDescuento` usaba `edad > 65`; se cambió a `>= 65`. |
| `rechaza una edad negativa` | **Código** | **R3:** la edad debe ser un entero entre 0 y 120; si no, `RangeError`. La función no validaba la edad. Se agregó la validación. |
| `rechaza un monto de $0` | **Test** | **R3:** el monto debe ser ≥ 0 y "con monto $0 el descuento es $0". El test esperaba un error que la regla no pide. Se corrigió la expectativa a `toBe(0)`. |
| `rechaza vender 0 unidades` | **Test** | **R7:** una cantidad que no es entera mayor a 0 es un dato inválido → `ValidacionError`. `StockInsuficienteError` es solo cuando se pide **más** que el stock. El código ya lanzaba `ValidacionError`; se corrigió el tipo de error esperado. |

## Ejercicio 2

- **R5 · laboratorio vacío:** lo revelaron `rechaza R5 · laboratorio vacío` y `... con solo espacios`. `validarNuevoMedicamento` **no validaba** el laboratorio. Se agregó la validación.
- **R6 · stock no entero:** lo revelaron `rechaza R6 · stock con decimales` y `... NaN`. La condición era `typeof datos.stock !== 'number'`, que acepta 2,5 y `NaN`. Se cambió a `!Number.isInteger(datos.stock)`.

## Ejercicio 3

- `src/services/medicamento.service.ts`, método `obtener`. Recorrido: la **ruta** y el **controlador** estaban bien (el controlador ya llamaba a `obtener`). `obtener` lanzaba `new Error('Medicamento no encontrado')` (un error **genérico**); el **middleware** solo traduce a 404 los `NoEncontradoError`, así que respondía **500**. Se corrigió en el **servicio**, que es donde se decide qué error de dominio corresponde: `throw new NoEncontradoError('Medicamento no encontrado')`. El test del 404 se vio fallar primero (`expected 500 to be 404`) y después pasó.
