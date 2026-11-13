# Tema 6 · Ejercicios fáciles: resolución explicada

## F1 · `authorize`
- Es una **función que devuelve una función** (factory de middlewares). Cuando escribís `authorize('libro:delete')` en la ruta, se ejecuta **una vez** al definir la ruta y devuelve el middleware que **recuerda** `'libro:delete'` (closure).
- Si no tiene el permiso: `res.status(403).json(...)` **y `return`**. Sin el `return`, el código seguiría y llamaría a `next()` → el controlador también respondería → error "Cannot set headers after they are sent".
- `permisos === undefined` cubre el caso en que alguien se olvidó de poner `authenticate` antes: falla cerrado (403) en vez de dejar pasar.
- `includes` compara el string exacto: `'libro:delete-all'` no es `'libro:delete'`.
- `authorizeAll` usa `filter` para calcular los faltantes y `join(', ')` para el mensaje.

## F2 · `PasswordService`
- Validar **antes** de hashear (bcrypt es costoso: no tiene sentido hashear algo que se va a rechazar).
- `bcrypt.hash(password, costo)` genera un **salt aleatorio** en cada llamada y lo guarda **dentro** del hash (`$2b$04$<salt><hash>`). Por eso dos hashes de la misma contraseña son distintos.
- `bcrypt.compare(password, hash)` lee el salt y el costo **del propio hash**, recalcula y compara. Por eso funciona con cualquiera de los dos hashes.
- Tests con `resolves` / `rejects`: como `hashear` y `verificar` devuelven promesas, se usa `await expect(promesa).resolves.toBe(true)` y `await expect(promesa).rejects.toThrow(ContrasenaDebilError)`.
- Costo 4 en los tests para que sean rápidos; en producción, 10 o más.

## F3 · Docker Compose (ver `docker/`)
1. `depends_on: [db]` solo espera a que el contenedor **arranque**; PostgreSQL puede tardar unos segundos más en aceptar conexiones y el backend fallaría. Con `condition: service_healthy` espera a que el **healthcheck** (`pg_isready`) dé OK.
2. `down` borra los contenedores, pero los datos quedan en el **volumen** `db_data`. `down -v` borra también los volúmenes (se pierden los datos).
3. `DB_HOST` lo usa el **backend**, que corre **dentro** de la red de Compose: ahí cada servicio se alcanza por su nombre (`db`). `VITE_API_URL` la usa el **navegador**, que corre en tu máquina (fuera de la red de Compose): llega a la API por el puerto publicado en `localhost`.
4. Imagen = lo que se construye (plantilla). Contenedor = lo que está corriendo (instancia).
5. Por la **caché de capas**: si solo cambia el código, Docker reutiliza la capa de `npm install` (que es la lenta) porque `package*.json` no cambió.

## F4 · Preguntas cortas
1. (a) 401; (b) 401; (c) 403.
2. Identificador del usuario (`sub`), email y el vencimiento (`exp`). El payload solo está codificado en Base64URL, **no cifrado**: cualquiera lo puede leer. La firma impide modificarlo, no leerlo.
3. En el backend, con `authorize` (403). Ocultar botones es un complemento de usabilidad: cualquiera puede llamar al endpoint con curl o Postman.
4. Para que la lógica de negocio no dependa de Express: se reutiliza (seed, scripts) y se prueba sin HTTP.
5. Un objeto que vive durante **una** petición y sirve para pasar datos entre middlewares: `authenticate` guarda el usuario y sus permisos; `authorize` los lee.
6. El `.env` tiene secretos (contraseñas, `JWT_SECRET`); el `.env.example` documenta qué variables hacen falta, con valores de ejemplo.
