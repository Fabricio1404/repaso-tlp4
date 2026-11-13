# Ejercicios · Tema 06 · Arquitecturas

Respuestas en [../soluciones/SOLUCIONES.md](../soluciones/SOLUCIONES.md). Respondé **en papel** antes de mirar.

---

## Parte A · ¿Qué arquitectura es? (identificar)

1. "Toda la aplicación vive en una única unidad que maneja UI, negocio y datos."
2. "Los consumidores no hablan con cada servicio, hablan con el bus."
3. "El núcleo no conoce el mundo exterior; interactúa a través de interfaces e implementaciones."
4. "Se paga solo por el tiempo que se ejecuta la función."
5. "Una BD para escribir y otra para leer, sincronizadas por eventos."
6. "Cada servicio tiene su propia base de datos y se despliega solo."
7. "El productor no sabe ni le importa quién consume el evento."
8. "Un núcleo mínimo al que se le agregan extensiones sin modificarlo."
9. "Cada capa solo interactúa con la inmediata inferior."

---

## Parte B · Opción múltiple

1. La arquitectura hexagonal es una aplicación de:
   a) SRP · b) OCP · c) DIP · d) ISP
2. ¿Cuál es una **desventaja** típica de la arquitectura monolítica?
   a) Despliegue complejo · b) Escalabilidad limitada · c) Muchas bases de datos · d) Cold start
3. En SOA, la comunicación se centraliza en:
   a) Un API Gateway · b) Un broker Kafka · c) Un ESB · d) Un Circuit Breaker
4. El **Circuit Breaker** sirve para:
   a) Autenticar usuarios · b) Manejar fallos de un servicio sin arrastrar al resto · c) Separar lecturas y escrituras · d) Orquestar contenedores
5. ¿Qué limitación es propia de serverless?
   a) Consistencia eventual · b) Latencia inicial (cold start) · c) Bus centralizado · d) Rigidez entre capas
6. En CQRS, que la lectura se actualice poco después de la escritura se llama:
   a) Consistencia fuerte · b) Consistencia eventual · c) Idempotencia · d) Event Sourcing
7. ¿Qué herramienta se usa para **orquestar** contenedores en microservicios?
   a) Docker · b) Kafka · c) Kubernetes · d) RabbitMQ
8. ¿Quién propuso la arquitectura hexagonal y en qué año?
   a) Martin Fowler, 2014 · b) Alistair Cockburn, 2005 · c) Greg Young, 2010 · d) Foote y Yoder, 1997
9. "Los sistemas terminan reflejando la estructura de comunicación de la organización" es:
   a) La regla de las dos pizzas · b) La ley de Conway · c) Big Ball of Mud · d) Monolito primero
10. VS Code con sus extensiones es un ejemplo de:
   a) SOA · b) Microkernel · c) CQRS · d) Serverless

---

## Parte C · Verdadero o falso (justificá los falsos)

1. Serverless significa que no hay servidores.
2. Los microservicios suelen compartir una única base de datos.
3. Una arquitectura moderna como microservicios reemplaza siempre a la monolítica.
4. En la arquitectura de capas, la presentación puede acceder directamente a la base de datos.
5. Event Sourcing guarda la secuencia de eventos y permite reconstruir el estado en cualquier momento.
6. Martin Fowler recomienda empezar con microservicios desde el primer día.
7. Kafka nació en LinkedIn.
8. En CQRS se pueden escalar lecturas y escrituras por separado.

---

## Parte D · Casos: ¿qué arquitectura elegirías y por qué?

1. Un TP de 3 alumnos: un sistema de turnos para un consultorio, 2 meses de plazo.
2. Un banco con 15 sistemas de los años 2000 (COBOL, Java viejo, .NET) que necesita que todos consulten el mismo servicio de clientes.
3. Una app de delivery con 40 equipos de desarrollo y picos enormes los viernes a la noche en el servicio de pedidos, pero no en el de usuarios.
4. Una función que genera una miniatura cada vez que alguien sube una foto (pocas veces al día, a veces 1000 en un minuto).
5. Un sistema de transferencias bancarias donde auditoría necesita saber exactamente cómo llegó cada cuenta a su saldo actual, y hay 100 consultas de saldo por cada transferencia.
6. Un editor de código que quiere que la comunidad agregue soporte para lenguajes nuevos.
7. Un e-commerce donde al confirmar una compra hay que: facturar, descontar stock, avisar al depósito, mandar un mail y sumar puntos; y mañana se van a agregar más acciones.
8. Un sistema que va a durar 15 años y sabemos que la base de datos y el proveedor de pagos van a cambiar.

---

## Parte E · Desarrollo

1. Explicá con tus palabras qué es una arquitectura de software y por qué las decisiones se toman temprano.
2. Compará **SOA** y **microservicios** en al menos 5 aspectos.
3. Explicá la arquitectura **hexagonal**: qué es un puerto, qué es un adaptador, y relacionala con el principio de SOLID que aplica. Dá un ejemplo con el proyecto del segundo parcial.
4. ¿Qué es el **cold start** y por qué hace que serverless no sirva para todo?
5. ¿Qué relación hay entre el **patrón Observer** y la **arquitectura Event-Driven**?
6. Dibujá (en papel) la arquitectura de capas del proyecto Biblioteca del segundo parcial e indicá qué carpeta es cada capa.
