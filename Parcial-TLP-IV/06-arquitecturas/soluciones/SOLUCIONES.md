# Soluciones · Tema 06 · Arquitecturas

## Parte A
1. Monolítica · 2. SOA · 3. Hexagonal · 4. Serverless · 5. CQRS · 6. Microservicios · 7. Event-Driven · 8. Microkernel · 9. Capas

## Parte B
| # | Resp. | Por qué |
|---|---|---|
| 1 | **c** | Puertos = interfaces; el núcleo depende de abstracciones (DIP) |
| 2 | **b** | Todo interconectado: para escalar una parte hay que escalar todo |
| 3 | **c** | ESB = Enterprise Service Bus. El API Gateway es de microservicios |
| 4 | **b** | Corta el circuito ante fallos repetidos para no propagar la caída |
| 5 | **b** | La función "dormida" tarda en arrancar |
| 6 | **b** | |
| 7 | **c** | Docker **crea** contenedores; Kubernetes los **orquesta** |
| 8 | **b** | |
| 9 | **b** | 1967 |
| 10 | **b** | Núcleo + extensiones (plug-ins) |

## Parte C
1. **F**: hay servidores, pero los gestiona el proveedor.
2. **F**: cada microservicio tiene **su propia** base. Compartir la base es típico de SOA.
3. **F**: es una evolución, no una competencia; conviven, y para proyectos chicos el monolito suele ser mejor.
4. **F**: cada capa solo interactúa con la **inmediata inferior**; la presentación pasa por la lógica de negocio.
5. **V**.
6. **F**: recomienda **"monolito primero"** bien modularizado y extraer servicios cuando duela.
7. **V** (2011).
8. **V**.

## Parte D
1. **Monolítica (en capas)**: proyecto chico, equipo chico, plazo corto. Microservicios sería sobreingeniería.
2. **SOA**: muchos sistemas heredados que deben **reutilizar** un servicio común, integrados por un **ESB**.
3. **Microservicios**: muchos equipos autónomos y necesidad de **escalar solo** el servicio de pedidos.
4. **Serverless**: tarea corta, disparada por un evento (subida de foto), carga muy variable; pagás solo lo que se ejecuta.
5. **CQRS + Event Sourcing**: muchas más lecturas que escrituras (escalar por separado) e historial completo para reconstruir el estado (auditoría).
6. **Microkernel**: núcleo estable + plug-ins de la comunidad (como VS Code).
7. **Event-Driven**: el módulo de compras publica "compra confirmada" y cada acción es un suscriptor; agregar una acción nueva no toca al productor.
8. **Hexagonal**: el dominio queda aislado; cambiar de base o de proveedor de pagos = escribir un adaptador nuevo para el puerto.

## Parte E (puntos que no pueden faltar)
1. Estructura del sistema: cómo se descompone en componentes y cómo se relacionan. Temprano porque afecta escalabilidad, mantenibilidad, seguridad y flexibilidad, y **después cuesta mucho cambiarlas** (analogía de los cimientos).
2. Enfoque (reutilización vs independencia), comunicación (ESB vs directa y ligera), tamaño (grande vs un dominio), datos (compartidos vs BD propia), despliegue (coordinado vs independiente), escenario (integrar heredados vs escalar productos con equipos autónomos).
3. Puerto = **interface** que define cómo el núcleo habla con el exterior. Adaptador = **implementación** que conecta con algo concreto. Aplica **DIP**. En el parcial: `LibroRepository` es el puerto; `LibroRepositoryEnMemoria` y el repositorio falso con `vi.fn()` son adaptadores; `LibroService` es el núcleo.
4. Es la demora de una función serverless que estaba inactiva hasta que el proveedor la levanta (cientos de ms). Por eso no sirve cuando se necesita latencia muy baja, ni para procesos largos o constantes (además, las plataformas limitan la duración).
5. Es la **misma idea** a distinta escala: en el Observer, un sujeto notifica a sus observadores **dentro de un programa**; en Event-Driven, un productor publica eventos en un **broker** y los consumen **otros componentes o servicios**, de forma asincrónica. En ambos el emisor no conoce a los receptores.
6. `routes/` + `controllers/` = **presentación** · `services/` = **lógica de negocio** · `repositories/` = **acceso a datos** · `middlewares/` = transversal (errores) · `app.ts` = composition root.
