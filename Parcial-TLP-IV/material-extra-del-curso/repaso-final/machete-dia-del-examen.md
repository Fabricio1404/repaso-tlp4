# Machete para el día del examen

## Primer parcial (1,5 h · 2 de 3)
- Proyecto: `npm init -y` → `"type": "module"` → `npm i -D typescript` → `tsconfig` (strict, noEmit, erasableSyntaxOnly, allowImportingTsExtensions, skipLibCheck, es2022, nodenext) → `npx tsc` → **commit 0**.
- Prohibido: `enum`, parameter properties, `any`. Constructor largo. Bloque de prueba al final. **Salida idéntica con tildes.**
- Frases → herramienta: *abstracta / debe* → `abstract`; *no cambia* → `readonly`; *de todos / histórico* → `static`; *sin paréntesis* → getter; *sin if por tipo* → polimorfismo; *única instancia* → Singleton; *nadie más usa new* → Factory; *avisa cuando cambia* → Observer; *clase vieja que no se toca* → Adapter; *if que crece* → OCP; *new adentro* → DIP.
- Ej. 3: commit del **original** antes; comentario `// OCP: ...` / `// DIP: ...` arriba de cada interfaz; salida igual.
- Commits: `chore: configuración inicial`, `feat(ej1)...`, `feat(ej2)...`, `chore(ej3): código original`, `refactor(ej3)...`, `docs: entrega final`.

## Segundo parcial (1,5 h · 2 de 3 · solo testing)
- `npm install` → `npm test` → `npm run typecheck` → leer **la tabla de reglas** → datos en `RESPUESTAS.md`.
- Ej. 1: test → regla → ¿coinciden? Sí → error en el **código** (no tocar el test). No → error en el **test**. **Correr todo.** Citar la regla.
- Ej. 2: por regla con rango: borde exacto + justo afuera. Obligatorio: `''` y `'   '`. Números: negativo, decimal, `NaN`. Si un test correcto falla → corregir el **código**.
- Ej. 3a: `vi.fn` + `toHaveBeenCalledTimes(1)` + `toHaveBeenCalledWith(objetoCompleto)` + `not.toHaveBeenCalled()`.
- Ej. 3b: test **rojo** primero → recorrido ruta → controlador (¿qué método llama? ¿qué status?) → servicio (¿qué error lanza?) → middleware (¿lo traduce?) → **verde**.
- `toThrow` con **flecha**. `toEqual` para objetos. `await` con Supertest. Nada de `it.only`.
- Entregar **sin `node_modules`**.

## Defensa del integrador
- 401 ≠ 403 · `DB_HOST=db` · volumen · healthcheck · `cp .env.example .env && docker compose up --build`.
- Flujo: `LibroService.changeStatus` → `EventPublisher.notify` (Observer) → `NotificationService.update` → suscripciones (base vía `DatabaseConnection`, Singleton) → `NotifierFactory.create` (Factory) → `InAppNotifier` / `ConsoleNotifierAdapter` (Adapter).
- Canal nuevo = clase `INotifier` + caso en la fábrica + nombre en la lista. Permiso nuevo = seed + `authorize('x:y')` en la ruta (+ `<Can>` en el front).
