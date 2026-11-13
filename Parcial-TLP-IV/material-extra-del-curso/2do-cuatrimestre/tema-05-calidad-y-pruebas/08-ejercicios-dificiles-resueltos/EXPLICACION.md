# Tema 5 · Ejercicio difícil: resolución explicada

## Estrategia
1. **Primero los tests, después mirar el código.** Si leés el código primero, tendés a escribir tests que confirman lo que hace (y no lo que **debería** hacer). Los tests se escriben **desde las reglas**.
2. **Cada regla, al menos un test** (y los bordes de las que tienen rango).
3. Cuando un test falla, se **sigue el recorrido de la petición**: `routes` (¿existe la ruta?) → `controllers` (¿qué método del servicio llama? ¿qué status devuelve?) → `services` (¿valida? ¿en qué orden?) → `repositories`.

## Los cuatro defectos, por capa
| Capa | Defecto | Tipo de error típico |
|---|---|---|
| Servicio (validación) | `h > 20` | Borde mal puesto |
| Controlador | `service.buscar` en vez de `service.obtener` | Llamar al método equivocado (el que no lanza) |
| Controlador | `res.json` sin `status(201)` | Código HTTP incorrecto |
| Servicio | No controlar "ya cancelado" | Regla de negocio faltante |

Dos defectos estaban en el **controlador**: solo los detecta una prueba de **integración**. Dos estaban en el **servicio**: los detectan tanto las unitarias como las de integración. Por eso se usan **los dos niveles**.

## Técnicas de test usadas
- **`it.each` con objetos como datos** para los inválidos de R3; cada fila tiene un nombre (`%s`) que aparece en la salida.
- **Bordes válidos y bordes inválidos** de la franja horaria: 08:00 y 19:30 válidos; 07:30 y 20:00 inválidos; 10:15 inválido por minutos.
- **Misma `app` para comprobar efectos:** en el POST de los bordes y en el DELETE se usa `const app = crearApp()` y se hacen varias peticiones a **la misma** app (si no, cada `crearApp()` arranca de cero).
- **Inyectar dependencias en la integración:** `crearApp({ notificador })` con un `NotificadorMemoria` para verificar R6 de punta a punta.
- **`toEqual({})` para un 204:** Supertest devuelve `{}` como body cuando no hay contenido.
- **Unitarias con stubs distintos:** `crearRepositorioFalso(undefined, reservado)` simula "horario ocupado"; `crearRepositorioFalso(cancelado)` simula "ya cancelado". El mismo falso, configurado distinto, cubre escenarios distintos.
- **Verificar lo que NO pasa:** en todos los casos de error, `not.toHaveBeenCalled()` sobre `guardar`/`actualizar`/`enviar`. Eso prueba el **orden** correcto (validar → recién después modificar y notificar).

## TDD en la práctica
- **Rojo:** escribir los tests de DELETE y verlos fallar **por el motivo esperado** (no existe la ruta). Si fallaran por otro motivo (un typo en el test), el test está mal.
- **Verde:** lo mínimo: ruta + controlador + método del servicio.
- **Refactor:** no hizo falta, pero sería el momento de, por ejemplo, unificar mensajes de error.
