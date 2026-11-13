# Tema 8 · Ejercicios medios · Observer + DIP testeados con espías

```bash
npm install
npm test
```
`ServicioPedidos` es el **sujeto** de un Observer y recibe por constructor un **repositorio** y un **reloj** (DIP). Escribí los `it.todo` usando espías como observadores (`{ notificar: vi.fn() }`) y los dobles dados. Si un test correcto falla, corregí el **código**.

| Regla | Descripción |
|---|---|
| **R1** | Estados: `pendiente → preparando → enviado → entregado`. Además existe `cancelado`. |
| **R2** | `avanzar` pasa al siguiente estado y **guarda** el pedido actualizado una sola vez. |
| **R3** | Un pedido `entregado` o `cancelado` no puede avanzar: `TransicionInvalidaError`. Si falla, no se guarda ni se notifica. |
| **R4** | Solo se puede cancelar un pedido `pendiente` o `preparando`. En cualquier otro estado: `TransicionInvalidaError`. |
| **R5** | Cada cambio se notifica a **todos** los observadores con `{ pedidoId, estadoAnterior, estadoNuevo, fecha }` (fecha `AAAA-MM-DD` del **reloj inyectado**). **Primero se guarda y después se notifica** (si guardar falla, nadie debe enterarse de un cambio que no existe). |
| **R6** | `desuscribir(o)` saca **solo** a ese observador. |

Pistas: `vi.fn().mock.invocationCallOrder[0]` da el número de orden global de la primera llamada; si `guardar` se llamó antes que `notificar`, su número es menor.

Preguntas:
1. ¿Por qué el reloj se inyecta en lugar de usar `new Date()` adentro del servicio?
2. ¿Qué defecto de R6 no habrías visto probando con **un solo** observador?
