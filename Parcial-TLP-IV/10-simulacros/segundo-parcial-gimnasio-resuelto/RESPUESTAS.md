# Respuestas · Simulacro segundo parcial TLP IV · Gimnasio

**Apellido y nombre:** (resolución modelo)
**DNI:** —

## Ejercicio 1

| Test que fallaba | ¿Error en el código o en el test? | ¿Por qué? (citar la regla) |
|---|---|---|
| `con 1 año de antigüedad paga $19.500` | **Test** | R2: 5 % por año sobre $20.000 → con 1 año paga $19.000. El test hacía mal la cuenta. Se corrigió a `toBe(19000)` y el nombre. |
| `el descuento nunca supera el 25 %` | **Código** (`cuotas.ts`) | R2: tope del 25 %. El código usaba `DESCUENTO_MAXIMO = 0.3`. Se corrigió a `0.25`. |
| `rechaza una antigüedad con decimales` | **Código** (`cuotas.ts`) | R3: entero ≥ 0. Solo se validaba `< 0`. Se agregó `Number.isInteger`. |
| `permite reservar todos los cupos disponibles` | **Código** (`gimnasio.service.ts`) | R7: menor **o igual** a los cupos. `cantidad >= clase.cupos` → `cantidad > clase.cupos`. |

## Ejercicio 2

- **R6 (16 a 90 inclusive):** el test límite `acepta 90 años` fallaba porque el código usaba `edad >= 90`. Se corrigió a `edad > 90`.
- **R5 (email con @):** el test `rechaza un email sin @` fallaba porque solo se validaba que no estuviera vacío. Se agregó `!datos.email.includes('@')`.

## Ejercicio 3

- `src/middlewares/manejo-errores.ts`. El servicio ya lanzaba `NoEncontradoError('Clase no encontrada')`, pero el middleware no lo reconocía y caía en el 500 final. Esa capa es la responsable de traducir errores de dominio a HTTP, y R8 pide 404. Se agregó el `instanceof NoEncontradoError` → 404.
