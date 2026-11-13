# Soluciones · Tema 07 · IA y agentes

## Parte A
1. **AGENTS.md** (regla de proyecto que se respeta siempre) · 2. **Skill** · 3. **Tool** · 4. **MCP** (servidor MCP que expone una tool) · 5. **Prompt** · 6. **Memoria** (persistencia entre sesiones)

## Parte B
1 **b** · 2 **b** · 3 **b** · 4 **d** · 5 **b** · 6 **b** · 7 **b** · 8 **b** · 9 **b** · 10 **c**

## Parte C
1. **F**: el modelo solo procesa tokens; es la **aplicación anfitriona** la que lee archivos (si tiene permiso) y le pasa el contenido.
2. **F**: un token es una unidad de procesamiento; una palabra puede ser varios tokens, y el código también consume tokens.
3. **F**: son representaciones vectoriales para comparar similitud y recuperar fragmentos (RAG). No son memoria.
4. **F**: son delegaciones acotadas; dividir de más aumenta tiempo, costo y pérdida de contexto.
5. **F**: el protocolo no hace seguro a un servicio; hay que habilitar solo servidores confiables y validar los datos.
6. **V**.
7. **F**: una skill son **instrucciones** (cómo hacer algo), opcionalmente con scripts; no es por definición una herramienta ni un servidor MCP.
8. **F**: AGENTS.md son convenciones del repo; no guarda las conversaciones.

## Parte D · Ejemplo de especificación
```
Contexto: API Express + TypeScript (Biblioteca) en capas routes/controllers/services/repositories, tests con Vitest + Supertest.
Objetivo: permitir prestar ejemplares de un libro.
Endpoint: POST /libros/:id/prestamo   Body: { cantidad }
Reglas:
 - cantidad entera > 0 y <= ejemplares disponibles
 - si se piden más → EjemplaresInsuficientesError → 409
 - libro inexistente → 404 { error: "Libro no encontrado" }
 - datos inválidos → 400
 - los ejemplares nunca quedan negativos
Diseño:
 - la regla va en LibroService.prestar; el controlador solo traduce HTTP
 - no agregar dependencias nuevas
Criterios de aceptación / pruebas:
 - unitarias: prestar 1, prestar todos (queda 0), pedir de más, cantidad 0, negativa, decimal
 - repositorio falso con vi.fn(): actualizar se llama una vez con los ejemplares descontados; no se llama si falla
 - integración (Supertest): 200, 404, 409, 400
Alcance: no modificar otros endpoints ni el formato de las respuestas existentes.
Entrega: plan por archivos ANTES de implementar; esperar aprobación; al final npm test y npm run typecheck en verde y resumen de cambios.
```

## Parte E
1. Resuelve la validación pedida (o parte de ella).
2. Exceden el alcance: la **librería nueva** (no se pidió y agrega una dependencia/riesgo de cadena de suministro) y el **cambio de contrato público** (puede romper a los clientes de la API).
3. Faltan pruebas de **casos límite e inválidos**, de **integración** del contrato y de **regresión** (que los otros endpoints sigan igual). Que "3 pruebas pasen" no prueba que el requisito se cumpla: pueden estar alineadas con la implementación equivocada.
4. **No aceptar** tal como está: revisar el diff, pedir que revierta lo que excede el alcance (la librería y el cambio de contrato) o justificarlo, y exigir las pruebas que faltan contra los requisitos. La responsabilidad es del desarrollador.
5. Un **AGENTS.md** con "no introducir dependencias sin explicar su necesidad" y "no cambiar contratos públicos"; una **especificación** con alcance explícito; trabajar **plan → aprobación → build**; **modo restringido** (proponer diffs sin aplicarlos) y pedir confirmación para instalar paquetes.

## Parte F (puntos clave)
1. **Modelo**: genera respuestas a partir de tokens. **Agente**: aplicación que combina el modelo con ciclo de control, estado, herramientas y permisos para actuar sobre un entorno. **Herramienta**: operación concreta y observable (leer, editar, ejecutar tests) que ejecuta el host.
2. Objetivo → consultar contexto → decidir herramienta → solicitar ejecución → observar salida → revisar hipótesis → seguir o parar. Ejemplo: "agregá validación a POST /empleados" → lee rutas y servicios, propone cambio, edita (si puede), corre tests, ve un fallo, corrige, vuelve a correr.
3. **Contexto**: información activa en una llamada; se trunca o resume. **Memoria**: mecanismo explícito para conservar y recuperar. Capas: contexto inmediato, reglas de proyecto (AGENTS.md), memoria de sesión, persistencia entre sesiones, RAG, compactación.
4. Protocolo abierto para conectar apps de IA con sistemas externos. **Host**, **cliente**, **servidor**; **JSON-RPC**; expone **tools, resources y prompts**; transporte local o remoto. Límites: no es memoria, no es el modelo, no hace seguro un servicio inseguro, no reemplaza validar datos; agrega superficie de ataque y consumo de contexto.
5. **Skill**: procedimiento especializado (`SKILL.md` con name/description, opcionalmente scripts/references/assets) que se carga **bajo demanda**. **AGENTS.md**: convenciones del repo que se aplican **siempre**.
6. Alucinaciones (verificar docs y ejecutar), prompt injection (tratar archivos y webs como datos, restringir herramientas, confirmar acciones sensibles), fuga de secretos (no mandar `.env` ni datos personales), privilegios excesivos (mínimo privilegio, ambientes aislados), dependencias inseguras (revisar paquetes y licencias), falsa confianza en tests (criterios desde requisitos).
7. Ejemplo:
```markdown
# Reglas del repositorio · API Biblioteca
- Stack: Express 5 + TypeScript (strict) + Vitest + Supertest.
- Capas: routes → controllers (solo HTTP) → services (reglas R1–R8) → repositories (interface LibroRepository).
- Las reglas de negocio del README son el requisito: los tests se escriben desde ellas.
- Errores de dominio en src/errors.ts; el middleware manejo-errores los traduce a HTTP.
- No agregar dependencias ni cambiar el formato de las respuestas sin aprobación.
- No modificar un test para que pase si el error está en el código.
- Antes de terminar: npm test y npm run typecheck sin errores.
- No tocar .env ni exponer secretos.
```
