# Simulacro teórico · 60 preguntas de todos los temas

Elegí **una** opción. Anotá tus respuestas en papel y después corregí con [RESPUESTAS-TEORIA.md](RESPUESTAS-TEORIA.md).

## A · TypeScript y POO
1. ¿Qué diferencia una clase abstracta de una interface?
   a) La interface puede tener código · b) La abstracta puede tener estado y métodos implementados; la interface solo declara el contrato · c) Las dos se instancian · d) Se pueden extender varias abstractas
2. Una hija redefine `calcularSueldo()` con la misma firma. Eso es:
   a) Sobrecarga · b) Sobrescritura (override) · c) Encapsulamiento · d) Composición
3. Un atributo `static total` se accede desde un método de instancia como:
   a) `this.total` · b) `Clase.total` · c) `super.total` · d) `total`
4. ¿Por qué están prohibidos los parameter properties con `erasableSyntaxOnly`?
   a) Son lentos · b) Generan código JS que no se puede borrar · c) No existen · d) Rompen la herencia
5. En lugar de `enum` se usa:
   a) `any` · b) Una unión de literales · c) `number` · d) `class`
6. `obtenerHistorial()` devuelve `[...this.historial]` para:
   a) Ordenarlo · b) No romper el encapsulamiento (copia defensiva) · c) Que sea más rápido · d) Convertirlo en string
7. "Auto tiene un Motor" es:
   a) Herencia · b) Composición · c) Polimorfismo · d) Sobrecarga
8. `private` en el padre: ¿la hija puede usar `this.atributo`?
   a) Sí · b) No compila · c) Solo en el constructor · d) Devuelve undefined

## B · Patrones
9. Singleton y Factory Method son:
   a) Estructurales · b) Comportamentales · c) Creacionales · d) Arquitectónicos
10. El constructor de un Singleton es:
   a) public · b) protected · c) private · d) static
11. Una desventaja del Singleton:
   a) Más clases · b) Dificulta las pruebas unitarias · c) Cascadas de notificaciones · d) Capa extra
12. "Hace que dos interfaces incompatibles trabajen juntas":
   a) Observer · b) Adapter · c) Factory · d) Singleton
13. Una desventaja del Observer:
   a) Instancia única · b) Notificaciones en cascada / orden no garantizado · c) No se puede extender · d) Usa herencia múltiple
14. La fábrica `crear(tipo)` debería devolver:
   a) La clase concreta · b) La interface común · c) `any` · d) Un string

## C · SOLID
15. Un `if` por tipo que crece con cada caso nuevo viola:
   a) SRP · b) OCP · c) LSP · d) ISP
16. Un `new ClaseConcreta()` dentro de un servicio viola:
   a) DIP · b) ISP · c) LSP · d) OCP
17. Un `Pinguino extends Ave` que lanza error en `volar()` viola:
   a) SRP · b) OCP · c) LSP · d) DIP
18. Una interface con 10 métodos donde las clases implementan varios con "No soportado" viola:
   a) ISP · b) SRP · c) DIP · d) OCP
19. "Una clase debe tener una sola razón para cambiar":
   a) OCP · b) SRP · c) LSP · d) DIP
20. El principio que permite pasar un repositorio falso en un test es:
   a) SRP · b) OCP · c) ISP · d) DIP

## D · Testing
21. Una prueba compara:
   a) Dos implementaciones · b) El comportamiento observado con el esperado · c) El código con la cobertura · d) Dos commits
22. El resultado esperado de un test sale de:
   a) Lo que devuelve hoy el código · b) Los requisitos / reglas de negocio · c) La cobertura · d) El compilador
23. `expect({a:1}).toBe({a:1})`:
   a) Pasa · b) Falla, porque `toBe` compara referencias · c) No compila · d) Lanza error
24. ¿Por qué `toThrow` necesita `() =>`?
   a) Por estilo · b) Para que Vitest ejecute la función y atrape el error · c) Para que sea async · d) No la necesita
25. Un doble que registra las llamadas para examinarlas es un:
   a) Fake · b) Stub · c) Spy · d) Dummy
26. Un repositorio en memoria que funciona de verdad es un:
   a) Fake · b) Spy · c) Mock · d) Stub
27. Ante un test que falla y coincide con la regla, hay que:
   a) Cambiar el test · b) Corregir el código · c) Borrarlo · d) Ponerle `it.skip`
28. 401 significa:
   a) Sin permiso · b) No autenticado · c) No encontrado · d) Conflicto
29. TDD es:
   a) Obligatorio para testear · b) Una estrategia: rojo, verde, refactor · c) Un tipo de test E2E · d) Un framework
30. Una cobertura del 100 %:
   a) Garantiza que no hay defectos · b) Indica qué código se ejecutó, no que se verificó bien · c) Es obligatoria · d) Mide la velocidad
31. Supertest permite:
   a) Probar la API sin levantar el servidor en un puerto · b) Hacer E2E en el navegador · c) Medir cobertura · d) Compilar TS
32. En la pirámide de pruebas, la base son las:
   a) E2E · b) De integración · c) Unitarias · d) Manuales

## E · Full stack
33. bcrypt es preferible a SHA-256 para contraseñas porque:
   a) Es más rápido · b) Es lento a propósito y usa salt · c) Se puede descifrar · d) Es más corto
34. El payload de un JWT:
   a) Está cifrado · b) Se puede leer, pero no modificar sin invalidar la firma · c) Contiene la contraseña · d) No existe
35. Dentro de Docker Compose, el backend se conecta a la base con:
   a) `DB_HOST=localhost` · b) `DB_HOST=db` (nombre del servicio) · c) La IP del host · d) No hace falta
36. Una imagen de Docker es:
   a) Un contenedor en ejecución · b) Una plantilla inmutable a partir de la cual se crean contenedores · c) Un volumen · d) Una VM

## F · Arquitecturas
37. La arquitectura hexagonal aplica:
   a) SRP · b) OCP · c) DIP · d) ISP
38. En SOA la comunicación se centraliza en:
   a) Un API Gateway · b) Un ESB · c) Kafka · d) Kubernetes
39. Cada servicio con su propia base y despliegue independiente:
   a) SOA · b) Microservicios · c) Capas · d) Monolítica
40. El cold start es una limitación de:
   a) CQRS · b) Serverless · c) SOA · d) Microkernel
41. Separar lecturas y escrituras con consistencia eventual:
   a) CQRS · b) Event-Driven · c) Capas · d) Hexagonal
42. Productor → broker → suscriptores, asincrónico:
   a) SOA · b) Event-Driven · c) Microkernel · d) Monolítica
43. VS Code con extensiones es:
   a) Microkernel · b) Serverless · c) SOA · d) CQRS
44. "Los sistemas reflejan la estructura de comunicación de la organización":
   a) Ley de Conway · b) Regla de las dos pizzas · c) Big Ball of Mud · d) Monolito primero

## G · IA y agentes
45. ¿Quién ejecuta una llamada de herramienta?
   a) El modelo · b) La aplicación anfitriona · c) El proveedor · d) Nadie
46. La ventana de contexto:
   a) Es memoria permanente · b) Es el máximo de información en una interacción · c) Son los embeddings · d) Es AGENTS.md
47. MCP:
   a) Es una base de memoria · b) Es un protocolo abierto para conectar apps de IA con sistemas externos · c) Es un modelo · d) Es una skill
48. Una skill:
   a) Ejecuta operaciones · b) Agrupa instrucciones reutilizables (SKILL.md) y se carga bajo demanda · c) Es un servidor MCP · d) Es el historial
49. Instrucciones maliciosas camufladas en un README que lee el agente:
   a) Alucinación · b) Prompt injection · c) Compactación · d) RAG
50. RAG:
   a) Reentrena el modelo · b) Recupera documentos relevantes antes de responder · c) Es una herramienta de Docker · d) Es memoria automática
51. El comando de OpenCode para generar AGENTS.md:
   a) `/models` · b) `/init` · c) `/build` · d) `/mcp`
52. ¿Qué puede perder una compactación?
   a) Nada · b) Matices y decisiones importantes · c) El repositorio · d) Los permisos

## H · Cloud
53. Definición: acceso ____ a recursos de computación por Internet con ____.
   a) permanente / pago fijo · b) bajo demanda / pago por uso · c) local / licencia · d) gratuito / publicidad
54. Render o Heroku son:
   a) IaaS · b) PaaS · c) SaaS · d) On-Premise
55. Amazon EC2 es:
   a) IaaS · b) PaaS · c) SaaS · d) Serverless
56. Las 5 características del NIST incluyen:
   a) Pago anual · b) Autoservicio a demanda, amplio acceso, pool, elasticidad, servicio medido · c) Seguridad total · d) Código abierto
57. Datos de tarjetas en nube privada y picos en la pública:
   a) Pública · b) Privada · c) Híbrida · d) Comunitaria
58. La caída de Cloudflare (18/11/2025) fue:
   a) Un DDoS · b) Un error interno de configuración que se propagó automáticamente · c) Un corte eléctrico · d) Un hackeo
59. SQS puede entregar un mensaje dos veces; por eso el consumidor debe ser:
   a) Idempotente · b) Stateful · c) Público · d) Serverless
60. Quién usó el término "cloud computing" en "Las fábricas de información" (Wired, 2006):
   a) McCarthy · b) Licklider · c) Gilder · d) Fowler
