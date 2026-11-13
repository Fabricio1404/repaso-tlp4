# Tema 5 · Ejercicios medios: interpretar fallas y dobles de prueba

```bash
npm install
npm test     # al principio: 4 tests fallan y hay 4 "todo"
```

## Reglas de negocio (son el requisito: ante cualquier duda, manda esta tabla)

| Regla | Descripción |
|---|---|
| **R1** | Cada nota es un **entero de 1 a 10**. Si no, `RangeError`. |
| **R2** | **Promociona** si el promedio de los dos parciales es **7 o más** y **ambas** notas son 6 o más. |
| **R3** | Queda **regular** si no promociona y **ambas** notas son **4 o más**. |
| **R4** | Si alguna nota es menor a 4 y rindió el recuperatorio, la nota del recuperatorio **reemplaza la más baja** y se vuelve a evaluar, **pero quien recupera no puede promocionar** (como máximo queda regular). |
| **R5** | En cualquier otro caso, queda **libre**. |
| **R6** | Solo un alumno **regular** puede inscribirse a final. Si está promocionado o libre: `CondicionInvalidaError`. |
| **R7** | Si el alumno no existe: `NoEncontradoError`. |
| **R8** | No se puede inscribir dos veces a la misma materia: `InscripcionDuplicadaError`. |
| **R9** | Una inscripción válida se **guarda una sola vez** y se **notifica** al alumno con el mensaje `"Inscripto al final de <materia>"`. Si la inscripción no es válida, **no** se guarda ni se notifica. |

## Ejercicio 1 · Interpretar fallas (`tests/ej1-condicion.test.ts`)
1. Ejecutá `npm test`. Fallan 4 tests del Ej. 1.
2. Para **cada** uno, decidí si el error está **en el código** o **en el test**, usando las reglas. *No todos los fallos se deben al código.*
3. Corregí lo que corresponda. **Si el error está en el código, no modifiques el test.**
4. Completá la tabla de `RESPUESTAS.md`.

## Ejercicio 2 · Dobles de prueba (`tests/ej2-inscripcion.test.ts`)
1. Completá los 4 `it.todo` usando `crearRepositorioFalso` y `crearNotificadorFalso` (ya están en el archivo) y matchers de espías (`toHaveBeenCalledTimes`, `toHaveBeenCalledWith`, `not.toHaveBeenCalled`).
2. Si algún test que escribiste revela un defecto del servicio, **corregí el código** (`src/inscripcion.service.ts`).
3. Anotá en `RESPUESTAS.md` qué defecto encontraste.

## Al terminar
`npm test` → todo en verde, sin `todo`. `npm run typecheck` sin errores.
