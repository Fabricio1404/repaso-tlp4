# Soluciones · Tema 05 · Full stack

## Ejercicio 1
1. **201 Created**: se creó un recurso.
2. **404 Not Found**: el recurso no existe.
3. **400 Bad Request**: datos inválidos (`ValidacionError`).
4. **401 Unauthorized**: no hay token, no sabemos quién es.
5. **403 Forbidden**: sabemos quién es (token válido) pero no tiene el permiso.
6. **409 Conflict**: los datos son válidos, pero chocan con el estado actual (no hay ejemplares suficientes).
7. **409 Conflict**: el email ya existe (conflicto con un dato guardado). (Algunos proyectos usan 400; lo importante es justificarlo.)
8. **500 Internal Server Error**: error no previsto; el middleware no lo reconoce.
9. **401**: token vencido = no autenticado.

## Ejercicio 2
**d → h → f → b → e → g → c** (y **a** solo si algo lanza un error).
`express.json()` → router encuentra la ruta → `authenticate` → `authorize` → controlador → servicio → repositorio. El controlador **llama** al servicio y, cuando este termina, responde 204.

## Ejercicio 3
```ts
// 3a
export function authorize(permiso: string) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const permisos = res.locals.permisos as string[] | undefined;
    if (permisos === undefined || !permisos.includes(permiso)) {
      res.status(403).json({ error: 'No tenés permiso' });
      return;
    }
    next();
  };
}

// 3b
export function manejarErrores(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidacionError) { res.status(400).json({ error: err.message }); return; }
  if (err instanceof NoEncontradoError) { res.status(404).json({ error: err.message }); return; }
  if (err instanceof ConflictoError) { res.status(409).json({ error: err.message }); return; }
  res.status(500).json({ error: 'Error interno del servidor' });
}
```
**3c.** Porque cada ruta necesita un permiso **distinto**, y Express espera un middleware `(req, res, next)` sin parámetros extra. `authorize('libro:delete')` **fabrica** un middleware que **recuerda** el permiso. Es una **factory de middlewares** y funciona gracias a un **closure** (la función interna "recuerda" la variable `permiso` de la externa).

## Ejercicio 4
1. **`DB_HOST: localhost`** → dentro del contenedor del backend, `localhost` es el **propio backend**. Debe ser `DB_HOST: db` (el nombre del servicio).
2. **Falta un volumen** para la base → al borrar el contenedor se pierden los datos. Agregar `volumes: - db_data:/var/lib/postgresql/data` y declarar `db_data` abajo.
3. **`depends_on: - db`** solo espera a que el contenedor **arranque**, no a que PostgreSQL esté listo. Falta un `healthcheck` con `pg_isready` y `depends_on: db: condition: service_healthy`.
4. **`JWT_SECRET` escrito en el archivo** (se sube al repo) → va en un `.env` con `env_file`. Y **`ports: - "3000"`** publica el puerto 3000 del contenedor en un puerto **aleatorio** del host; debe ser `"3000:3000"`.

## Ejercicio 5
1. **Autenticación**: verificar **quién sos** (login, token). **Autorización**: decidir **qué podés hacer** (permisos).
2. Si roban la base, tendrían todas las contraseñas. Se guarda un **hash** (una sola vía). bcrypt es **lento a propósito** y usa **salt**; SHA-256 es rapidísimo (permite probar miles de millones de contraseñas por segundo) y sin salt dos contraseñas iguales dan el mismo hash.
3. No es inseguro: el payload **no es secreto** (por eso no lleva contraseñas), pero está **firmado** con `JWT_SECRET`. Si lo modificás, la firma no coincide y `jwt.verify` lo rechaza. Sin el secreto no podés generar una firma válida.
4. Porque el backend es accesible directamente con Postman o curl. La seguridad tiene que estar en `authorize` en el backend; el front solo mejora la experiencia.
5. Un **ORM** traduce entre tablas y objetos (métodos en vez de SQL). Solo los **repositorios** deberían conocerlo, para que el resto dependa de interfaces (DIP) y cambiar de ORM o de base afecte solo a esa capa.
6. Para tener **una sola conexión (pool)** compartida por toda la app y no abrir conexiones de más. Desventaja: dificulta los tests (estado global compartido) y oculta la dependencia.
7. **Observer**: un **objeto del backend** (`NotificationService`) registrado en el `EventPublisher` que reacciona al evento. **Suscripción**: un **dato en la base** que dice qué usuario sigue qué libro. El observer **consulta** las suscripciones para saber a quién avisar.
8. Una clase `EmailNotifier implements INotifier`, un `case 'email'` en `NotifierFactory` y agregar `'email'` a la lista de canales. `NotificationService` no cambia → **OCP**.
9. CORS es una protección **del navegador**: bloquea que una página de un origen llame a otro origen salvo que el servidor lo permita con headers. Postman no es un navegador, no aplica CORS.
10. **Imagen**: plantilla inmutable (SO mínimo + runtime + código). **Contenedor**: instancia **en ejecución** de una imagen. Como clase y objeto.
11. Porque se pasan "sueltas" al router (`router.get('/x', controller.obtener)`) y un método normal perdería el `this`. La flecha lo captura.
12. Es el único lugar donde se crean las clases concretas y se conectan (repos → services → controllers → routes). Está en `app.ts` / `main.ts`.
13. El `.env` tiene **secretos reales** (contraseñas, `JWT_SECRET`). El `.env.example` documenta **qué variables** hacen falta, con valores de ejemplo, para que otro pueda levantar el proyecto.
14. Es meter código SQL en un dato del usuario para que la base lo ejecute (ej. `1; DROP TABLE users`). Se evita con **consultas parametrizadas** (`$1`) o el ORM, y nunca concatenando texto.

## Ejercicio 6
1. **Controlador o servicio**: `Number('abc')` es `NaN`; nadie lo valida y algo explota. Hay que validar el id (y lanzar `ValidacionError`) o el middleware no traduce ese error.
2. **Controlador**: falta `res.status(201)`.
3. **Rutas**: falta `authorize('libro:delete')` en la ruta (o está mal escrito el permiso / mal el seed).
4. **Servicio**: error de borde (`<=` en vez de `<`) al comparar con los ejemplares disponibles.
5. **Rutas**: `'/libros/:id'` está registrada **antes** que `'/libros/disponibles'`, entonces "disponibles" se toma como un id.
6. **Middleware de errores**: no tiene el `instanceof NoEncontradoError` → cae al 500.
