# Tema 8 · Ejercicios medios · resolución explicada

## Defectos
| Test que lo reveló | Regla | Defecto | Corrección |
|---|---|---|---|
| `desuscribir saca SOLO a ese observador` (con 3) | R6 | `splice(i)` sin segundo argumento borra **desde** `i` hasta el final: al sacar a `b` también se iba `c` | `splice(i, 1)` |
| `NO se puede cancelar un pedido enviado` | R4 | La condición prohibía solo `entregado` y `cancelado`; `enviado` pasaba | Permitir solo `pendiente` o `preparando` (lista blanca) |
| `primero se guarda y después se notifica` | R5 | Notificaba antes de guardar | Invertir el orden |

## Técnicas
- **Espías como observadores:** `{ notificar: vi.fn() }` cumple `ObservadorPedido`. No hace falta escribir clases de prueba.
- **Reloj inyectado (DIP):** con `new Date()` adentro, el test de la fecha daría un resultado distinto cada día. Con `relojFijo` el test es **determinista**.
- **`mock.invocationCallOrder`:** Vitest numera todas las llamadas a espías en orden global; comparar esos números prueba el **orden** entre dos dobles distintos.
- **`mockImplementation(() => { throw ... })`:** simula una falla del repositorio para probar qué pasa "si guardar falla".
- **Lista blanca vs. lista negra:** el defecto 2 venía de enumerar lo **prohibido** (y olvidarse uno). Enumerar lo **permitido** (`pendiente`, `preparando`) es más seguro.

## Respuestas
1. Para que el test sea **determinista** (no dependa del día en que se corre) y para poder probar fechas específicas. Es DIP aplicado al tiempo.
2. El de `splice(i)`: con un solo observador, borrar "desde `i` hasta el final" o "solo `i`" da el mismo resultado. Hacen falta **al menos tres** (y sacar el del medio).
