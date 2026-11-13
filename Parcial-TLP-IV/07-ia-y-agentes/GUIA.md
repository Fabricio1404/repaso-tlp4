# 07 · Desarrollo de software asistido por IA (Unidad 5)

> **Enfoque de la cátedra:** comprender el ecosistema (**modelos, agentes, contexto, memoria, herramientas, MCP y skills**) y aplicar **criterio de ingeniería** sobre un proyecto real con **OpenCode**. *"De pedir código a orquestar trabajo de ingeniería."*
> Tema de **teoría**. Lo que más se pregunta son **diferencias**: modelo vs agente, contexto vs memoria, skill vs tool vs MCP, AGENTS.md vs skill.

---

## 0. El mapa de la unidad (si te acordás de esto, tenés la mitad)

> **Modelo ≠ agente ≠ herramienta.**
> - Un **modelo** produce predicciones/respuestas a partir de su entrada.
> - Una **aplicación agente** combina ese modelo con un **ciclo de control**, **estado**, **herramientas** y **restricciones** para operar sobre un entorno.
> - El **desarrollador** define los objetivos y **conserva la responsabilidad** de revisar las acciones.

### Propósitos de aprendizaje (lo que te pueden pedir)
- Diferenciar **LLM, chatbot, asistente y agente**, sin atribuirle al modelo aislado capacidades que no tiene.
- Describir el **ciclo de un agente** y el papel de herramientas, permisos, observaciones, contexto y revisión humana.
- Comparar **memoria, recuperación de información (RAG), instrucciones de proyecto, skills y MCP**.
- Usar un agente con una **especificación**, evaluar cambios y **verificar con pruebas**.
- Identificar **riesgos** de seguridad, privacidad, errores y responsabilidades profesionales.

---

## 1. Ecosistema: modelos, productos y proveedores

Un **modelo de lenguaje grande (LLM, *Large Language Model*)** procesa secuencias de **tokens** y genera salidas a partir de **patrones aprendidos** y del **contexto recibido**.

> **Un LLM NO es por sí mismo un editor, ni un repositorio, ni un ejecutor de comandos.** Es la **aplicación anfitriona** la que lo conecta con archivos, consola, buscadores y servicios.

### Las tres capas

| Capa | Qué es | Ejemplo |
|---|---|---|
| **Modelo** | El motor de inferencia | Un modelo concreto de un proveedor, o uno local |
| **Proveedor / servicio** | Cómo se accede (API remota, local) | La API de una empresa; un modelo corriendo en tu PC |
| **Producto / agente** | La interfaz y el flujo operativo | **OpenCode**, un chat web, un plugin del IDE |

**OpenCode** es una herramienta de desarrollo (agente de terminal, **de código abierto**) que puede trabajar con **distintos modelos y proveedores**. Sus funciones **no** deben confundirse con las propiedades de un modelo concreto.

```
Modelo  ──►  Host / agente  ──►  Herramientas  ──►  Integraciones
(genera y    (gestiona sesión    (archivos,          (MCP, servicios
 razona)      y acciones)         terminal, tests)    externos)
```

Un **chatbot**, un **IDE asistido** y un **agente de terminal** pueden usar modelos parecidos, pero **exponen capacidades diferentes**.

| Modelo | Agente / producto |
|---|---|
| Procesa entradas y genera salidas | Orquesta modelo, herramientas y estado |
| **No accede solo** a tu sistema de archivos | Puede inspeccionar, modificar o ejecutar |
| Importan el **límite de contexto** y el proveedor | Depende de **permisos, entorno y configuración** |

### Elegir un modelo
- **Proveedor (API remota)**: disponibilidad, precio, límites y **tratamiento de datos**.
- **Modelo local**: corre en tu hardware; control, pero depende de memoria y rendimiento.
- **Capacidad**: adecuado para código, razonamiento, herramientas y contexto.
- **Costo real**: "gratuito" puede incluir cuotas, cambios de catálogo o restricciones.
- En OpenCode se consulta la oferta vigente con **`/models`**.

---

## 2. Conceptos básicos

| Concepto | Qué es | Trampa |
|---|---|---|
| **Token** | Unidad de procesamiento del texto | **No** equivale siempre a una palabra. El código y los archivos también consumen tokens. Entradas **y** salidas consumen capacidad |
| **Ventana de contexto** | Máximo de información que entra en **una** interacción | **No** es memoria permanente |
| **Inferencia** | Ejecutar el modelo para producir una respuesta (o llamadas a herramientas) | Puede ser remota o local |
| **Embeddings** | Representaciones **vectoriales** para comparar **similitud semántica** | Útiles para **recuperación** (RAG), pero **no son memoria** ni "recuerdos" |
| **Abierto / comercial / gratuito** | Son **dimensiones distintas** | "Gratis" puede tener límites o disponibilidad variable |

> **Más contexto no garantiza mejor resultado**: el **ruido** y la información **obsoleta** empeoran las respuestas.

> **Ejemplo docente:** el mismo proyecto Express puede revisarse desde un **chatbot** al que le pegás fragmentos, o desde un **agente** con permiso para inspeccionar el repositorio. La diferencia **no depende solo** de cuán potente sea el modelo, sino de lo que el producto le permite hacer.

---

## 3. Agentes: anatomía y funcionamiento

Un **agente** (en desarrollo de software) es un sistema que **interpreta objetivos**, **selecciona acciones** mediante herramientas, **observa resultados** y **ajusta pasos** para avanzar en una tarea.

> **Agente ≠ autonomía ilimitada.** Los **permisos, confirmaciones y límites del anfitrión** determinan lo que efectivamente puede hacer. El grado de autonomía es **configurable**.

### Componentes

| Componente | Función | Ejemplo |
|---|---|---|
| **Modelo** | Razona sobre la información y **propone** acciones | Interpretar un error de TypeScript |
| **Objetivo e instrucciones** | Orientan criterios y restricciones (rol, prioridades, políticas) | "Agregar endpoint sin alterar el contrato" |
| **Contexto / estado** | Información de sesión y del proyecto | Archivos, resultados, conversación |
| **Herramientas** | Operaciones **observables** | Leer, editar, ejecutar Vitest |
| **Orquestador / ciclo** | Gestiona llamadas, respuestas, reintentos, errores y cancelación | Ejecutar la prueba y analizar el fallo |
| **Permisos y supervisión** | Limitan efectos y exigen aprobación; revisión humana y trazabilidad | Preguntar antes de editar o usar la shell |

### El ciclo de ejecución

```
Objetivo → consultar contexto → decidir herramienta → solicitar ejecución
        → observar la salida → revisar hipótesis → ¿continuar o detenerse?
                         ▲                                   │
                         └───────────────────────────────────┘
```

Versión de la presentación (4 pasos):
1. **Analiza** (lee la tarea y el proyecto)
2. **Planea** (descompone el problema)
3. **Actúa** (invoca una herramienta)
4. **Comprueba** (lee la salida y corrige)

El **objetivo lo define el humano**; el **modelo propone**; **se ejecuta una herramienta**; **se lee el resultado**, que **vuelve al contexto** de la siguiente decisión.

> No todos los agentes planifican en una fase explícita, y **ninguna iteración garantiza corrección**.

**Ejemplo:** *"Agregá validación al endpoint POST /empleados y pruebas."* → el agente inspecciona rutas y servicios, localiza contratos, propone cambios, edita (si tiene permiso), ejecuta pruebas y revisa errores. **El humano verifica** que el comportamiento cumple el requisito y que no hay regresiones.

### Asistente, agente, subagente, multiagente

| Término | Qué es |
|---|---|
| **Chatbot** | Conversa; responde con texto |
| **Asistente** | Ayuda a responder, explicar y **sugerir** cambios |
| **Agente** | **Ejecuta un proceso** con pasos, observaciones y herramientas |
| **Subagente** | Agente especializado que recibe una **tarea acotada** y devuelve resultados |
| **Multiagente** | Varios roles coordinados. **Más complejidad no implica mejor calidad** |

Los subagentes son **delegaciones acotadas**: no implican colaboración autónoma ni mejores resultados. Dividir de más **aumenta tiempo, costo y pérdida de contexto**.

### Permisos y niveles de autonomía

| Modo restringido | Modo operativo |
|---|---|
| Lee e inspecciona archivos | Puede editar y ejecutar comandos |
| Propone diffs **sin aplicarlos** | Debe trabajar en un **entorno controlado** |
| Pide aprobación para acciones sensibles | Requiere **límites, revisión y trazabilidad** |

> En una demo: evitar acceso a **credenciales reales** y **comandos destructivos**.

---

## 4. Contexto, memoria y recuperación

### Contexto **no es** memoria

| Contexto | Memoria |
|---|---|
| Instrucciones, mensajes, código y resultados disponibles **para una llamada** | **Mecanismos explícitos** para **conservar y recuperar** información |
| Información **activa**; puede **truncarse, resumirse o renovarse** | Archivos de proyecto, resúmenes, bases de datos, servicios dedicados |
| Importa la **relevancia**, no la cantidad | **Debe diseñarse**: no es automática en todo agente |

> El **historial del chat**, por sí solo, **no garantiza** persistencia indefinida ni recuperación fiel.

### ¿Qué información ve un modelo?
- **Instrucciones**: reglas del sistema, del agente y del repositorio.
- **Conversación**: mensajes, plan, decisiones y resultados previos.
- **Código**: archivos que el agente decide leer o recibe.
- **Herramientas**: salidas de terminal, tests, búsquedas, servicios externos.

### Capas de información

| Capa | Qué es |
|---|---|
| **Contexto inmediato** | Mensaje actual, instrucciones, fragmentos de archivo, salidas de herramientas |
| **Reglas de proyecto** | `AGENTS.md` u otros archivos de instrucciones que se reincorporan cuando corresponde |
| **Memoria de sesión** | Estado e historial que la app administra **durante una tarea** |
| **Persistencia entre sesiones** | Archivos o almacenamiento explícito que **sobreviven al cierre** |
| **RAG** (*Retrieval-Augmented Generation*) | **Recuperar documentos relevantes** de un índice antes de responder. **No** implica aprendizaje ni modifica los pesos del modelo |
| **Compactación** | Resumir o seleccionar cuando el contexto se llena. **Puede perder matices o decisiones importantes** |

### Tres estrategias para recuperar información
1. **Archivos persistentes**: convenciones, **ADRs** (registros de decisiones de arquitectura) y decisiones en documentos del repo.
2. **Resúmenes**: compactar el historial para recuperar objetivos y acuerdos.
3. **RAG / embeddings**: búsqueda de fragmentos relevantes por similitud semántica (no son "recuerdos").

> **Caso de discusión:** el agente "olvida" que la app usa repository/service. ¿Fue un **límite del contexto**, **falta de reglas persistentes**, **recuperación deficiente** o una **instrucción ambigua**? Cada causa tiene una solución distinta (compactar mejor / escribir AGENTS.md / mejorar el índice / especificar mejor).

### Context engineering en un repositorio
**Seleccionar** (identificar tarea y archivos) → **Reducir ruido** (excluir lo ajeno) → **Estructurar** (dar reglas y criterios) → **Verificar** (corregir contexto erróneo).

> Un buen prompt con **contexto equivocado** sigue siendo una instrucción deficiente.

---

## 5. Herramientas, function calling y MCP

### Function calling
El modelo puede producir una **solicitud estructurada** de uso de una función/herramienta. **La aplicación anfitriona decide** si la ejecuta, **con qué credenciales y permisos**, y le devuelve el resultado al modelo.

> **El modelo no ejecuta la shell por escribir un comando.** Quien ejecuta es el **host**.

### MCP (Model Context Protocol)
**Especificación abierta** para conectar aplicaciones de IA con **capacidades y fuentes externas** (documentación, APIs, bases de datos).
- Distingue **host**, **cliente** y **servidor**.
- Usa mensajes **JSON-RPC**.
- Expone **tools**, **resources** y **prompts**.
- Transportes **locales o remotos**.

```
Host (OpenCode) ──► Cliente MCP ──► Servidor MCP ──► Sistema (docs, API, BD)
                   (conexión y      (expone
                    transporte)      capacidades)
```

| Elemento | Propósito | Ejemplo |
|---|---|---|
| **Host** | Aplicación que aloja la experiencia de IA | OpenCode |
| **Cliente MCP** | Mantiene la conexión con **un** servidor MCP | Componente de la app |
| **Servidor MCP** | **Publica capacidades** de un sistema | Servidor de documentación |
| **Tools** | Operaciones **invocables** (buscar, consultar, crear, modificar según permisos) | Buscar en la documentación |
| **Resources** | **Datos** consumibles como contexto | Un esquema, un documento |
| **Prompts** | **Plantillas** reutilizables | Guía de consulta |

Configuración conceptual en OpenCode:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "documentacion": {
      "type": "local",
      "command": ["npx", "-y", "paquete-servidor-mcp"],
      "enabled": true
    }
  }
}
```

### Límites clave de MCP (se preguntan)
- **No todas** las capacidades de un agente vienen de MCP: hay **herramientas nativas** y conectores específicos.
- MCP **no es una base de datos de memoria**.
- MCP **no es el modelo**.
- **No reemplaza** la validación de los datos recibidos.
- **No convierte un servicio inseguro en seguro.**
- Habilitar **solo servidores confiables y necesarios**: aumentan **superficie de ataque**, **permisos** y **consumo de contexto**.

---

## 6. Skills, reglas (AGENTS.md) e instrucciones

### Skill
Agrupa **instrucciones reutilizables** para una **tarea especializada**. La especificación **Agent Skills** usa un **directorio** con:
- **`SKILL.md` obligatorio**, con frontmatter `name` y `description`;
- opcionalmente `scripts/`, `references/` y `assets/`.

Se **carga progresivamente**, cuando el agente la necesita.

```markdown
---
name: revisar-api-express
description: Revisar estructura y riesgos de una API Express
---
# Procedimiento
1. Identificar rutas, controllers, services y repositories.
2. Revisar validación y manejo de errores.
3. Detectar dependencias rígidas y duplicación.
4. Ejecutar tests disponibles antes de recomendar cambios.
5. Informar hallazgos con archivo, causa y propuesta.
```
En OpenCode: `.opencode/skills/revisar-api/SKILL.md`.

| Skill | Tool / MCP |
|---|---|
| **Instrucciones de CÓMO** hacer una tarea | **Capacidad para EJECUTAR** una operación |
| Puede incluir scripts y referencias | Puede acceder a datos o sistemas reales |
| Se carga cuando se la necesita | Su uso implica **permisos y controles** |

> **Una skill no es, por definición, una herramienta ejecutable ni un servidor MCP.**

### AGENTS.md
Documenta **convenciones e instrucciones** para el agente que trabaja en un repositorio: **arquitectura, comandos de build/test, estilo y restricciones**.
- A diferencia de una skill, **no** es un flujo especializado que se carga bajo demanda: son reglas que se respetan **siempre**.
- OpenCode puede crearlo o actualizarlo con **`/init`** (hay que **revisarlo** antes de aceptarlo).
- **No** equivale a memoria automática de todas las conversaciones.

```markdown
# Reglas del repositorio
- Stack: Express + TypeScript + Vitest.
- Controllers: HTTP; services: negocio; repositories: persistencia.
- No editar archivos .env ni exponer secretos.
- Ante cambios de negocio, agregar tests unitarios.
- Antes de finalizar, ejecutar npm test y npm run build.
- No introducir dependencias sin explicar su necesidad.
- Resumir archivos modificados y decisiones tomadas.
```

### Tabla para no confundirse (la más preguntada)

| Mecanismo | Pregunta que responde | Ejemplo |
|---|---|---|
| **Prompt** | ¿Qué necesito **ahora**? | "Implementá el endpoint POST /empleados" |
| **AGENTS.md** | ¿Qué convenciones del proyecto se respetan **siempre**? | "Respetar controller/service/repository" |
| **Skill** | ¿**Cómo** realizamos este procedimiento especializado? | "Auditar una API Express" |
| **Tool** | ¿Qué **operación concreta** puedo ejecutar? | Leer archivo, correr `npm test` |
| **MCP** | ¿Cómo integramos capacidades o **sistemas externos** estandarizados? | Servidor de documentación |
| **Memoria** | ¿Qué información necesitamos **conservar o recuperar**? | Decisiones de la sesión anterior |

---

## 7. Ingeniería asistida: de la consigna a la verificación

**Especificar** es más sólido que pedir *"haceme la aplicación"*. Una instrucción profesional contiene:
**contexto del proyecto · objetivo · restricciones técnicas · criterios de aceptación · alcance de cambios · pruebas · forma de entrega.**

| Pedido vago | Especificación |
|---|---|
| "Creá un CRUD de empleados" | Endpoints y reglas **verificables** |
| Ambigüedad de reglas y errores | Estructura, errores y restricciones |
| Difícil saber si está terminado | **Criterios de aceptación + pruebas** |

```
Funcionalidad: Registrar empleado
POST /empleados
Datos: nombre, email, salarioBase
Reglas:
 - email válido y único
 - salarioBase > 0
 - 201 al crear; 400/409 según el error
Diseño:
 - controller / service / repository
Validación:
 - pruebas para éxito y casos inválidos
 - no modificar otros endpoints
```

### Flujo recomendado
1. **Explorar**: identificar estructura y código existente **sin modificar nada**.
2. **Precisar**: comportamientos y casos límite **medibles**.
3. **Planificar**: pedir archivos afectados, dependencias y riesgos.
4. **Implementar**: cambios **pequeños y revisables**.
5. **Verificar**: tipos, lint, pruebas y observación manual.
6. **Revisar**: comparar el **diff**, analizar seguridad y documentar decisiones.

```
Analizá este proyecto Express + TypeScript. No edites nada todavía.
Objetivo: validar salario >= 0 al crear empleados.
Respetá las capas controller/service/repository.
Entregá: archivos afectados, plan, riesgos y casos de prueba.
Esperá mi aprobación antes de implementar.
```

> La IA puede **proponer** un plan; el **desarrollador decide** si lo aprueba. Un prompt detallado **no garantiza** corrección: **reduce ambigüedad** y facilita detectar errores.

### El test también puede estar equivocado
Un agente puede producir **tests que se alinean con una implementación equivocada** (los dos mal, y el test "pasa"). Por eso **los criterios de aceptación deben venir de requisitos revisados**, no del código generado. (Es exactamente lo que practicás en el tema 04.)

- **Prueba unitaria**: valida lógica aislada y casos límite.
- **Prueba de integración**: verifica la interacción real entre capas.
- **Revisión del diff**: detecta cambios no pedidos, regresiones y secretos.
- **Criterio humano**: contrasta código y pruebas con los requisitos.

---

## 8. Calidad, seguridad, ética y responsabilidad

| Riesgo | Qué es | Qué hacer |
|---|---|---|
| **Alucinaciones / APIs inexistentes** | Inventa librerías, parámetros, resultados | Verificar en la documentación y **ejecutando** |
| **Prompt injection** | Archivos, páginas o respuestas de herramientas traen **instrucciones maliciosas** camufladas | Tratar todo eso como **datos no confiables**; separar instrucciones de datos |
| **Secretos y privacidad** | Mandar tokens, credenciales, datos personales o código confidencial a servicios no autorizados | Revisar **qué se envía** al proveedor |
| **Privilegios mínimos** | Dar más permisos de los necesarios | Solo lo necesario; aprobación para lo destructivo; ambientes aislados |
| **Dependencias / cadena de suministro** | Paquetes, scripts, licencias, vulnerabilidades | Revisarlos; **un test no cubre riesgos de seguridad** |
| **Calidad, autoría y licencias** | | La IA **no exime** de revisión, pruebas, atribuciones ni **responsabilidad profesional** |

### Cuatro errores habituales del código generado
- **Alucinación**: API o librería inventada, firma incorrecta, versiones incompatibles.
- **Deuda técnica**: abstracciones innecesarias, duplicación, sobreingeniería.
- **Vulnerabilidad**: validación débil, inyección SQL, secretos o permisos inseguros.
- **Falsa confianza**: tests que solo comprueban lo que el propio código ya supone.

### Prompt injection
```
Entrada (README, issue, web, docs) → contenido hostil (instrucciones camufladas)
   → agente (confunde DATOS con ÓRDENES) → impacto (acción fuera del objetivo)
```
**Defensa:** separar instrucciones de datos, **restringir herramientas** y **pedir confirmación** para acciones sensibles.

### Checklist antes de aceptar cambios
- ¿Resuelve **exactamente** el requisito pedido?
- ¿Mantiene la separación de responsabilidades y un diseño coherente?
- ¿Introduce paquetes, permisos, secretos o cambios **no pedidos**?
- ¿Compila y pasa las pruebas relevantes, **incluidos casos límite**?
- ¿Puedo **explicar y defender** cada decisión importante?

---

## 9. Demostración con OpenCode

**Preparación:** API Express + TypeScript en capas con Vitest; repo Git limpio, **sin secretos reales**. Ver con **`/models`** qué modelo gratuito hay y sus límites. *OpenCode es gratuito como herramienta de código abierto, pero el uso de modelos depende de sus proveedores.*

| Demo | Qué se hace |
|---|---|
| **A · Explorar sin modificar** | Abrir OpenCode en la raíz, elegir modelo con `/models`, pedir *"Explicá arquitectura, rutas, dependencias y cómo ejecutar pruebas. No edites archivos"*. Observar herramientas usadas, archivos leídos, evidencia, suposiciones |
| **B · Reglas persistentes** | Crear `AGENTS.md` o usar **`/init`** y **revisarlo**. Escribir convenciones. Pedir un cambio y comparar el cumplimiento |
| **C · Plan → Build → Test** | Pedir un **plan** (no implementar hasta aprobar) → revisar alcance y casos límite → autorizar cambios pequeños → verificación humana: `git diff`, `npm test`, `npm run build` |
| **D · Skill y MCP (opcional)** | Crear `.opencode/skills/revisar-api/SKILL.md` y ver su carga bajo demanda; configurar un MCP confiable **de solo lectura**; comparar tool nativa vs tool de MCP. ¿Qué vino del modelo, de los archivos y de herramientas externas? |

---

## 10. Repaso con respuesta (de la cátedra)

| Pregunta | Respuesta |
|---|---|
| ¿Modelo y agente son intercambiables? | **No**: el agente combina el modelo con ciclo, estado, herramientas y permisos |
| ¿Qué diferencia una skill de una herramienta? | La **skill da instrucciones**; la **herramienta ejecuta** operaciones |
| ¿MCP proporciona memoria? | **No** |
| ¿Qué puede perder una compactación? | **Matices y decisiones importantes** |
| ¿Quién ejecuta una llamada de herramienta? | La **aplicación anfitriona** (host) |
| ¿Qué evidencia necesitamos antes de desplegar código escrito con IA? | **Diff revisado**, **tests** (incluidos casos límite) y **build en verde**, contrastados con los **requisitos** |

> **Cierre:** en un desarrollador se evalúa no solo escribir código, sino **definir criterios, dar contexto, gobernar herramientas y verificar resultados**. La IA propone y ejecuta según sus capacidades. **La responsabilidad técnica sigue siendo humana.**

---

## 📌 Lo que tenés que saber sí o sí

- **Modelo ≠ agente ≠ herramienta.** El LLM no edita ni ejecuta: lo hace el **host**.
- 3 capas: **modelo · proveedor · producto/agente** (OpenCode).
- **Token** ≠ palabra. **Ventana de contexto** ≠ memoria. **Embeddings** sirven para recuperar, no son recuerdos.
- Agente = modelo + objetivo + contexto + **herramientas** + **ciclo** + **permisos**. Ciclo: analiza → planea → actúa → comprueba.
- **Contexto** (activo, se trunca) vs **memoria** (explícita, diseñada). **RAG** no modifica el modelo. **Compactación** pierde matices.
- **Function calling**: el modelo **pide**, el host **ejecuta**.
- **MCP**: protocolo abierto; host / cliente / servidor; **JSON-RPC**; **tools, resources, prompts**. No es memoria ni el modelo.
- **Skill** (`SKILL.md` con name y description; cómo hacer algo, bajo demanda) vs **AGENTS.md** (reglas siempre; `/init`) vs **Tool** (ejecuta).
- Riesgos: **alucinaciones, prompt injection, secretos, privilegios mínimos, dependencias**. Tests que confirman código equivocado.
- **Especificar > pedir.** Explorar → precisar → planificar → implementar → verificar → revisar. **La responsabilidad es humana.**

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
