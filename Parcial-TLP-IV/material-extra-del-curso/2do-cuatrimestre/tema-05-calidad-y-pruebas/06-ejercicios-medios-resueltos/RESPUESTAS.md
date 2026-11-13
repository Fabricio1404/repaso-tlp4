# Respuestas · Tema 5 · Ejercicios medios (resueltas)

## Ejercicio 1

| Test que fallaba | ¿Error en el código o en el test? | ¿Por qué? (citar la regla) |
|---|---|---|
| `promociona con 7 y 7` | **Código** | R2: promociona con promedio "7 o más". El código usaba `promedio > 7`. Se cambió a `>= 7`. |
| `con 4 y 4 queda libre` | **Test** | R3: con ambas notas ≥ 4 queda **regular**. El test esperaba "libre". Se corrigió la expectativa (y el nombre del test). |
| `... 2 y 8 con recuperatorio 9 promociona` | **Test** | R4: quien recupera **no puede promocionar** (como máximo regular). El código ya lo hacía bien (`!recupero`). Se corrigió la expectativa a "regular". |
| `rechaza una nota 0` | **Código** | R1: las notas van de **1** a 10. El código validaba `nota < 0` y aceptaba el 0. Se cambió a `nota < 1`. |

## Ejercicio 2

- **Defecto:** el servicio no controlaba R8 (inscripción duplicada). Lo reveló el test *"una inscripción duplicada: lanza InscripcionDuplicadaError y NO guarda ni notifica"*: el servicio guardaba y notificaba igual.
- **Corrección:** antes de guardar, `if (this.repo.existeInscripcion(dni, materia)) throw new InscripcionDuplicadaError(...)`. El control va **antes** de `guardarInscripcion` y `enviar` para cumplir R9.
