# Tema 3 · Ejercicios difíciles: refactor de los cinco principios

Es el **ejercicio 3 del parcial en versión larga**. El código original funciona y viola **los cinco** principios. No te dicen cuál está dónde: lo tenés que encontrar vos.

Pasos obligatorios (igual que en el parcial):
1. Ejecutá el original y guardá la salida en un archivo `salida-original.txt`.
2. Hacé el commit `chore(d1): código original` **antes** de tocar nada.
3. Escribí arriba del archivo una tabla en comentarios: **principio → clase o línea donde se viola → señal**.
4. Refactorizá. Cada interfaz nueva lleva arriba un comentario con el principio que aplica (`// OCP: ...`).
5. La salida final tiene que ser **idéntica** a la original, **salvo** las líneas que eran bugs y que tu diseño vuelve imposibles (están indicadas abajo). Esas llamadas del bloque de prueba tienen que pasar a **no compilar** (dejalas comentadas con `❌` y explicá por qué).
6. Commit `refactor(d1): ejercicio completo`.

---

## D1 · Turnos médicos (`d1-turnos-medicos.ts`)

Requisitos del diseño final:
- Un turno virtual **solo** se puede crear con un profesional que atiende virtualmente. Un enfermero **no** puede firmar recetas (que no compile).
- Ningún turno puede "explotar" al preguntarle dónde es: el presencial informa su consultorio y el virtual informa `"virtual"`. `agenda()` sin `instanceof`.
- Las obras sociales (particular $20000, OSDE $5000, PAMI $0) se pueden agregar sin tocar el sistema de turnos.
- El sistema recibe por constructor: el validador de horario (8 a 19), el repositorio de turnos, el notificador y el registro (log).

Líneas del bloque de prueba que **dejan de existir** porque pasan a ser errores de compilación:
- La reserva de `TurnoVirtual("Dani", lopez, 11)` (y por lo tanto sus líneas `[SMS 381-444]`, `[LOG] reserva Dani 11h`, la línea de Dani en la agenda y `ERROR: López no hace atención virtual`).
- El intento con la obra social `"galeno"` (y la línea `Obra social desconocida: galeno`).

Salida esperada después del refactor:
```
[SMS 381-111] Turno 9h con García. Abona $5000
[LOG] reserva Ana 9h
[SMS 381-222] Turno 10h con García. Abona $20000
[LOG] reserva Beto 10h
[SMS 381-333] Turno 9h con López. Abona $0
[LOG] reserva Caro 9h
García ya tiene un turno a las 9h
Horario fuera de atención: 22h
[
  '9h Ana con García (Consultorio 5)',
  '10h Beto con García (virtual)',
  '9h Caro con López (Consultorio 5)'
]
Dr/a. García atiende a Ana en persona
Dr/a. García atiende a Beto por videollamada
Enf. López atiende a Caro en persona
Receta de Ibuprofeno para Ana, firma García
```

---

## D2 · Gestor de archivos (`d2-gestor-archivos.ts`)

Requisitos del diseño final:
- Un archivo de solo lectura **no promete** que se puede escribir. `normalizarTodos` solo acepta archivos editables (sin `try/catch`).
- Los formatos (`texto`, `base64`, `mayusculas`) se pueden agregar sin tocar el gestor. Cada formato conoce su `extension`.
- El disco local no está obligado a listar versiones; la nube sí puede.
- El gestor recibe por constructor el almacenamiento (cualquiera), el validador de tamaño (máximo 40) y el registro.
- El gestor solo coordina.

Líneas que **dejan de existir**: `ERROR: licencia es de solo lectura` (normalizar la licencia no compila), `Formato desconocido: pdf` y `ERROR: El disco local no guarda versiones`.

Salida esperada después del refactor:
```
[S3] subido notas.texto (10 bytes)
[LOG] publicado notas como texto
[S3] subido notas.base64 (16 bytes)
[LOG] publicado notas como base64
[S3] subido licencia.mayusculas (3 bytes)
[LOG] publicado licencia como mayusculas
largo supera el tamaño máximo
[DISCO] guardado backup (5 bytes)
[ 'notas@v1', 'notas@v2' ]
```
