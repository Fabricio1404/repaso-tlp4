# Machete · Para leer la noche anterior

## Práctico 1er parcial (POO · patrones · SOLID) · 1,5 h · 2 de 3
- `npm init -y` → `"type": "module"` → `npm i -D typescript` → `tsconfig` (strict, noEmit, erasableSyntaxOnly, allowImportingTsExtensions, skipLibCheck, es2022, nodenext) → `npx tsc` → **commit 0**.
- **Prohibido:** `enum`, parameter properties, `any`. Constructor **largo**. **Bloque de prueba** al final. **Salida idéntica** (tildes, `$`, espacios).
- Frase → código: *abstracta / debe* → `abstract` · *no cambia* → `readonly` · *de todos / histórico* → `static` (`Clase.x`) · *sin paréntesis* → getter · *sin if por tipo* → polimorfismo · *única instancia* → Singleton · *nadie más usa new* → Factory · *avisa cuando cambia* → Observer · *clase vieja que no se toca* → Adapter · *if que crece* → OCP · *new adentro* → DIP.
- Singleton: `private static instancia` + `private constructor` + `static obtenerInstancia()`.
- Ej. 3: **commit del original** → interfaces con `// OCP: ...` / `// DIP: ...` → **misma salida**.
- Commits: `chore: configuración inicial` · `feat(ej1)` · `feat(ej2)` · `chore(ej3): código original` · `refactor(ej3)` · `docs: entrega final`.

## Práctico 2do parcial (testing) · 1,5 h · 2 de 3
- `npm install` → `npm test` → `npm run typecheck` → **leer la tabla de reglas** → datos en `RESPUESTAS.md`.
- **Ej. 1:** test → regla → ¿coinciden? **Sí → error en el código** (no tocar el test). **No → error en el test.** Correr todo. Citar la regla.
- **Ej. 2:** por regla con rango: **borde exacto + justo afuera**. Obligatorio: `''` y `'   '`. Números: negativo, decimal, `NaN`. Test correcto que falla → corregir **código**.
- **Ej. 3a:** `vi.fn` + `toHaveBeenCalledTimes(1)` + `toHaveBeenCalledWith({ ...obj, campo: nuevo })` (objeto **completo**) + `not.toHaveBeenCalled()`.
- **Ej. 3b:** test **rojo** → ruta → controlador (¿qué método llama? ¿qué status?) → servicio (¿qué lanza?) → middleware (¿lo traduce?) → **verde**. **200 vacío** = controlador llama al método que no lanza. **500** = el middleware no reconoce el error.
- `toThrow` **con flecha**. `toEqual` para objetos. `async` + `await` con Supertest. **Nada de `it.only`.** Entregar **sin `node_modules`**.

## Teoría
- **Arquitecturas:** monolítica (una unidad) · capas (cada una con la inferior) · hexagonal (puertos = interfaces, adaptadores; DIP; Cockburn 2005) · SOA (reutilización, **ESB**, BD compartida) · microservicios (independencia, **BD propia**, API Gateway, Circuit Breaker; Fowler y Lewis 2014) · event-driven (productor → broker → suscriptores; Kafka/LinkedIn 2011) · serverless (funciones por evento, pago por ejecución, **cold start**) · CQRS (lectura/escritura separadas, **consistencia eventual**, + Event Sourcing; Greg Young) · microkernel (núcleo + plug-ins; VS Code). Ley de **Conway**, **dos pizzas**, **Big Ball of Mud**, **monolito primero**.
- **Testing:** comparar observado vs esperado (de los **requisitos**) · unitaria/integración/E2E · pirámide (orientación) · AAA · stub/mock/spy/fake · TDD rojo-verde-refactor (estrategia, no requisito) · cobertura ≠ calidad · CI con GitHub Actions.
- **IA:** modelo ≠ agente ≠ herramienta · el **host** ejecuta las tools · token ≠ palabra · contexto ≠ memoria · RAG no reentrena · compactación pierde matices · **MCP** (host/cliente/servidor, JSON-RPC, tools/resources/prompts; no es memoria) · **skill** (SKILL.md, bajo demanda) vs **AGENTS.md** (siempre, `/init`) · riesgos: alucinaciones, prompt injection, secretos, mínimo privilegio, dependencias, tests que confirman errores · **la responsabilidad es humana**.
- **Cloud:** bajo demanda + Internet + pago por uso · McCarthy 1961, Licklider 1963, Gilder 2006 · escalabilidad, flexibilidad, costos · IaaS/PaaS/SaaS (pizza) · **NIST 2011: 5–3–4** · escalabilidad ≠ elasticidad · pública/privada/híbrida/comunitaria · AWS 2006 / Azure 2010 / GCP 2008 · virtualización + hipervisor · **Cloudflare 18/11/2025** (permisos → duplicados → más de 200 elementos con límite 200 → propagación → Rust sin manejar error → 5xx; no fue ataque) · S3, SQS (al menos una vez → idempotencia), SSM, Secrets Manager, responsabilidad compartida, IAM.

## Códigos HTTP
200 OK · 201 creado · 204 sin contenido · **400** datos inválidos · **401** no autenticado · **403** sin permiso · **404** no existe · **409** conflicto · 500 error interno.
