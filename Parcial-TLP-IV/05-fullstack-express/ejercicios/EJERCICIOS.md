# Ejercicios · Tema 05 · Full stack

Respuestas en [../soluciones/SOLUCIONES.md](../soluciones/SOLUCIONES.md).

---

## Ejercicio 1 · ¿Qué código HTTP corresponde?

Para cada situación, escribí el código de estado y por qué:

1. `POST /libros` con datos válidos: el libro se creó.
2. `GET /libros/999` y el libro no existe.
3. `POST /libros` con `{ titulo: "" }`.
4. `DELETE /libros/1` sin enviar el header `Authorization`.
5. `DELETE /libros/1` con un token válido de un usuario con rol `usuario` (sin `libro:delete`).
6. `POST /libros/1/prestamo` pidiendo 5 ejemplares cuando hay 2.
7. `POST /auth/register` con un email que ya existe.
8. El servicio lanza un `TypeError` inesperado por un bug.
9. `GET /libros` con un token **vencido**.

---

## Ejercicio 2 · Ordenar el recorrido de una petición

Ordená los pasos de `DELETE /api/libros/1` hecho por un admin:

- a) `manejarErrores` (solo si algo falla)
- b) `authorize('libro:delete')` verifica que el permiso esté en `res.locals.permisos`
- c) `LibroRepository.eliminar(1)` borra en la base
- d) `express.json()` parsea el body
- e) `LibroController.eliminar` lee `req.params.id` y responde 204
- f) `authenticate` verifica el JWT y carga usuario y permisos
- g) `LibroService.eliminar(1)` verifica que exista (si no, lanza `NoEncontradoError`)
- h) El router encuentra la ruta `DELETE /libros/:id`

---

## Ejercicio 3 · Escribí el middleware

Escribí en TypeScript:

**3a.** Un middleware `authorize(permiso: string)` que responda **403** `{ error: "No tenés permiso" }` si `res.locals.permisos` no incluye el permiso, y si lo incluye llame a `next()`.

**3b.** Un middleware de errores que traduzca:
- `ValidacionError` → 400
- `NoEncontradoError` → 404
- `ConflictoError` → 409
- cualquier otro → 500 con `{ error: "Error interno del servidor" }`

**3c.** ¿Por qué `authorize` es una función que **devuelve** una función? ¿Cómo se llama ese patrón?

---

## Ejercicio 4 · Encontrá los errores del docker-compose

Este `docker-compose.yml` tiene **4 problemas**. Encontralos y explicá cada uno:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: biblioteca
  backend:
    build: ./backend
    environment:
      DB_HOST: localhost
      JWT_SECRET: secreto123
    ports:
      - "3000"
    depends_on:
      - db
```
Pista: pensá en (1) dónde queda la base para el backend, (2) qué pasa con los datos al hacer `docker compose down`, (3) si el backend espera a que la base acepte conexiones, (4) los secretos y los puertos.

---

## Ejercicio 5 · Preguntas de defensa oral

1. ¿Qué diferencia hay entre **autenticación** y **autorización**?
2. ¿Por qué no se guarda la contraseña en la base? ¿Qué hace bcrypt que no hace SHA-256?
3. Si decodifico un JWT en jwt.io puedo leer el payload. ¿Entonces es inseguro? ¿Qué impide que lo modifique?
4. ¿Por qué ocultar el botón "Eliminar" en React no alcanza como seguridad?
5. ¿Qué es un **ORM**? ¿Qué capa es la única que debería conocer Sequelize y por qué?
6. ¿Por qué `DatabaseConnection` es un Singleton? Nombrá una desventaja.
7. ¿Qué diferencia hay entre un **observer** y una **suscripción** en el integrador?
8. ¿Qué tenés que tocar para agregar un canal de notificación por email? ¿Qué principio cumple eso?
9. ¿Qué es **CORS**? ¿Por qué Postman no tiene problemas de CORS y el navegador sí?
10. ¿Qué diferencia hay entre una **imagen** y un **contenedor** de Docker?
11. ¿Por qué los controladores se escriben como **funciones flecha**?
12. ¿Qué es el **composition root** y dónde está?
13. ¿Por qué el `.env` no se sube y el `.env.example` sí?
14. ¿Qué es la **inyección SQL** y cómo se evita?

---

## Ejercicio 6 · Leer código: ¿qué capa tiene el defecto?

Para cada síntoma, decí en qué **capa** buscarías primero y por qué:

1. `GET /libros/abc` responde 500 en vez de 400.
2. `POST /libros` responde 200 en vez de 201.
3. Un usuario sin permiso puede borrar libros.
4. Prestar 3 ejemplares de un libro con 3 responde 409.
5. `GET /libros/disponibles` responde 404 `{ error: "Libro no encontrado" }`.
6. El servicio lanza `NoEncontradoError` pero la respuesta es 500.
