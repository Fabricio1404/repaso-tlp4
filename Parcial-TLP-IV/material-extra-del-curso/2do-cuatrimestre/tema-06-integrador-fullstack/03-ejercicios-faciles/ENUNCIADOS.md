# Tema 6 · Ejercicios fáciles

```bash
npm install
npm test        # al principio fallan los tests de F1 y F2 (TODO)
```
En F1 y F2 **los tests son la especificación**: leelos, entendé qué piden y escribí el código hasta que pasen. No los modifiques.

## F1 · Middleware `authorize` (`src/authorize.ts`)
- `authorize(permiso)` devuelve un middleware de Express. Lee `res.locals.permisos` (`string[]`, lo deja ahí `authenticate`).
  - Si no hay permisos o no incluye el pedido → **403** con `{ "error": "No tenés permiso para esta acción" }` y **no** sigue la cadena.
  - Si lo incluye → `next()`.
- `authorizeAll(...permisos)`: igual, pero exige **todos**; el mensaje de error lista los faltantes separados por coma (`"Faltan permisos: libro:delete, user:read"`).

## F2 · `PasswordService` con bcrypt (`src/PasswordService.ts`)
- `hashear(password)`: valida (al menos 8 caracteres, una mayúscula y un número; si no, `ContrasenaDebilError`) y devuelve el hash de bcrypt con el costo del constructor.
- `verificar(password, hash)`: `true`/`false`.
- Pregunta: ¿por qué dos hashes de la misma contraseña son distintos y aun así `verificar` funciona con los dos?

## F3 · Docker Compose (`docker/`)
Completá los 10 `___` de `docker-compose.incompleto.yml` y `.env.example.incompleto`, y respondé:
1. ¿Qué diferencia hay entre `depends_on: [db]` y `depends_on: { db: { condition: service_healthy } }`?
2. ¿Qué pasa con los datos al hacer `docker compose down`? ¿Y `down -v`?
3. ¿Por qué `DB_HOST` es `db` pero `VITE_API_URL` usa `localhost`?
4. ¿Imagen o contenedor? "Lo que se construye con el Dockerfile" / "lo que está corriendo".
5. ¿Por qué en el Dockerfile se copia `package*.json` y se hace `npm install` **antes** de `COPY . .`?

## F4 · Preguntas cortas (defensa oral)
1. ¿401 o 403? (a) sin token; (b) token vencido; (c) token válido de un `usuario` que intenta `DELETE /libros/1`.
2. ¿Qué viaja en el payload de un JWT? ¿Por qué no se pone la contraseña?
3. ¿Dónde se validan los permisos y por qué no alcanza con ocultar botones?
4. ¿Por qué los services no reciben `req` ni `res`?
5. ¿Qué es `res.locals` y para qué lo usan `authenticate` y `authorize`?
6. ¿Por qué el `.env` no se sube y el `.env.example` sí?
