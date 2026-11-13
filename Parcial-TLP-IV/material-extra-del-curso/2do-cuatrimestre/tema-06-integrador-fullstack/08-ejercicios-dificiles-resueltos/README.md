# Tema 6 · Ejercicio difícil · "Modificación en vivo" en la defensa oral

> En la defensa, la cátedra puede pedir **una modificación en vivo**: "agregá un canal", "agregá un permiso". Este ejercicio simula eso sobre una copia del backend de referencia (`backend/`).
> Tiempo sugerido: 45 minutos para las tres. Corré solo el backend; no hace falta base de datos (los tests usan repositorios en memoria).

```bash
cd backend
npm install
npm test        # al principio: 11 pasan y 5 fallan (tests/modificaciones.test.ts)
npm run typecheck
```

## Modificación A · Canal de email
La universidad tiene un servicio de correo **externo** (`src/externos/ServicioCorreoLegacy.ts`, **no se modifica**) con `enviarCorreo(para, asunto, cuerpo): { ok: boolean }`.
Cuando cambia el estado de un libro, cada suscriptor tiene que recibir **también** un correo con asunto `"Cambio de estado del libro #<id>"` y cuerpo `"<anterior> → <nuevo>"`, **sin dejar** de recibir los otros dos canales.
**Restricción:** la lógica de `NotificationService.update` no puede cambiar.

## Modificación B · Permiso `libro:export`
- Nuevo permiso `libro:export` para **admin** y **operador** (no para usuario).
- Nuevo endpoint `GET /api/libros/export` protegido con ese permiso, que responde **texto CSV** (`Content-Type: text/csv`) con la cabecera `id,titulo,autor,estado` y una línea por libro.
- Ojo con el orden de las rutas.

## Modificación C · Regla de negocio
No se puede eliminar un libro que está `PRESTADO`: responder **409** con `{ "error": "No se puede eliminar un libro prestado" }`. ¿En qué capa va esta regla?

## Para la defensa
Para cada modificación, explicá en voz alta (o en `RESPUESTAS.md`): qué archivos tocaste, qué patrón o principio te permitió hacerlo con pocos cambios, y qué **no** tuviste que tocar.
