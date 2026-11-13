# 06 · Arquitecturas de software (Unidad 3)

> **De la monolítica al microkernel: cómo se estructuran los sistemas y cuándo elegir cada enfoque.**
> Tema de **teoría**: se evalúa con preguntas de opción múltiple y de desarrollo ("¿qué arquitectura usarías para...?", "compará SOA con microservicios").
> **Truco de estudio:** para cada arquitectura memorizá **5 cosas**: qué es, dibujo, ventajas, desventajas, cuándo usarla / evitarla.

---

## 1. ¿Qué es una arquitectura de software?

La **arquitectura de software** es la disciplina que define la **estructura de un sistema**: **cómo se descompone** en módulos o componentes y **cómo se relacionan** entre sí.

Las decisiones arquitectónicas se toman **temprano** porque afectan cuatro atributos:

| Atributo | Pregunta que responde |
|---|---|
| **Escalabilidad** | ¿Puede crecer para atender más carga? |
| **Mantenibilidad** | ¿Es fácil corregirlo y modificarlo? |
| **Seguridad** | ¿Está protegido? |
| **Flexibilidad** | ¿Se adapta a cambios y requisitos nuevos? |

### ¿Por qué importa?
Establece las bases sobre las que la aplicación se desarrolla y **evoluciona**. Sin una arquitectura adecuada aparecen: **dificultad para escalar**, **tiempos de respuesta elevados** y **mantenimiento costoso**. Una buena arquitectura resuelve el presente **y** permite adaptarse a cambios futuros.

> **Analogía:** los planos de un edificio. Cambiar el color de una pared es barato; mover los cimientos cuando ya hay diez pisos construidos, no. **La arquitectura es el conjunto de decisiones que después cuesta cambiar.**

> **Dato:** los sistemas que crecen sin arquitectura se llaman **"Big Ball of Mud"** (gran bola de barro), término de **Foote y Yoder (1997)**.

### Una evolución, no una competencia

```
Monolítica  →  Por capas  →  Hexagonal  →  SOA  →  Microservicios
(todo junto)  (responsab.   (núcleo       (servicios   (servicios
               separadas)    aislado)      reutilizables) autónomos)

Enfoques COMPLEMENTARIOS (se combinan con los anteriores):
   Event-Driven · Serverless · CQRS · Microkernel
```

> Ninguna arquitectura "reemplaza" a la anterior. Muchas empresas grandes conviven con monolitos, SOA y microservicios **en el mismo ecosistema**.

---

## 2. Arquitectura monolítica

**Toda la aplicación en una única unidad de código** que maneja todas las responsabilidades: interfaz de usuario, lógica de negocio y acceso a datos. Debajo, una base de datos.

```
┌──────────────────────────┐
│     UNA SOLA APLICACIÓN  │
│  ┌────────────────────┐  │
│  │ Interfaz de usuario│  │
│  ├────────────────────┤  │
│  │ Lógica de negocio  │  │
│  ├────────────────────┤  │
│  │ Acceso a datos     │  │
│  └────────────────────┘  │
└────────────┬─────────────┘
             ▼
       [ Base de datos ]
```

| Ventajas | Desventajas |
|---|---|
| **Desarrollo inicial fácil**: un solo código base, rápido para proyectos chicos/medianos | **Escalabilidad limitada**: todo está interconectado; para escalar una parte hay que escalar todo |
| **Despliegue sencillo**: una única unidad en el servidor | **Cambios inadvertidos**: tocar una parte impacta en otras |
| | **Difícil introducir nuevas tecnologías**: no se puede modernizar solo una parte |

**Ejemplos:** apps hechas con **Django** o **Laravel**: el código está en módulos, pero es **un único sistema desplegable**.

**Usala cuando** el proyecto es chico o mediano y el equipo es reducido. **Evitala cuando** necesitás escalar partes por separado.

> **"Monolito primero"** (Martin Fowler): empezar con un monolito **bien modularizado** y extraer microservicios solo cuando duele.

---

## 3. Arquitectura de capas

Divide la aplicación en **capas**, cada una con una responsabilidad. **Cada capa solo interactúa con la inmediata inferior**.

```
┌─────────────────────────────┐
│ Capa de PRESENTACIÓN        │  interfaz de usuario e interacción con el cliente
├─────────────────────────────┤
│ Capa de LÓGICA DE NEGOCIO   │  las reglas que determinan cómo funciona el sistema
├─────────────────────────────┤
│ Capa de ACCESO A DATOS      │  lectura y escritura en la base de datos
└─────────────────────────────┘
```

| Beneficios | Limitaciones |
|---|---|
| **Separación clara de responsabilidades**: se entiende mejor, los desarrolladores se especializan en una capa | **Puede volverse rígida**: al crecer, la interacción entre capas se vuelve un **cuello de botella de rendimiento** |
| **Más fácil probar y mantener**: se aíslan y corrigen errores | |

**Caso de estudio:** app empresarial con **Angular o React** (presentación), **Node.js o .NET** (negocio) y **PostgreSQL o MongoDB** (datos).

> Es la arquitectura del integrador y del segundo parcial: **routes/controllers** (presentación) → **services** (negocio) → **repositories** (datos).

**Usala cuando** querés responsabilidades claras y equipos especializados. **Evitala cuando** el rendimiento entre capas es crítico.

---

## 4. Arquitectura hexagonal (Ports and Adapters)

Busca **desacoplar la lógica de negocio de las dependencias externas**: bases de datos, APIs, servicios externos, interfaces de usuario. La lógica de negocio está en el **núcleo (dominio)**, y toda interacción con el exterior pasa por **puertos** y **adaptadores**. **El núcleo no conoce el mundo exterior.**

```
          HTTP              SQL
            \               /
        [Adaptador]   [Adaptador]
              \         /
             (Puerto)(Puerto)
               ┌───────────┐
               │  DOMINIO  │   ← reglas de negocio puras
               │  (núcleo) │
               └───────────┘
             (Puerto)(Puerto)
              /         \
        [Adaptador]   [Adaptador]
            /               \
        Broker              SMTP (mails)
```

- **Puertos**: **interfaces** que definen cómo la lógica de negocio interactúa con el exterior.
- **Adaptadores**: **implementaciones** de esas interfaces que conectan con bases de datos, APIs u otros sistemas.

**Patrón aplicable:** es el **Principio de Inversión de Dependencias** (la **D** de SOLID): el núcleo depende de interfaces, no de detalles.

**Casos de uso:** aplicaciones que se quieren **probar de forma aislada** (sin base de datos ni interfaz), sistemas de **larga duración** donde se espera que las dependencias externas **cambien**.

> **Ejemplo:** si cambiás MySQL por MongoDB, solo escribís un **adaptador nuevo** para el puerto "repositorio". El núcleo no se toca.
> En el parcial: `LibroRepository` (interface) es un **puerto**; `LibroRepositoryEnMemoria` es un **adaptador**; el repositorio falso de los tests es **otro adaptador**.

**Dato:** la propuso **Alistair Cockburn en 2005**. **Evitala** en un prototipo descartable (es sobreingeniería).

---

## 5. Arquitectura orientada a servicios (SOA)

Los **servicios** son componentes que realizan una **función específica** e interactúan entre sí mediante **interfaces de red**. SOA se basa en la **reutilización** de servicios y la flexibilidad para sistemas grandes.

La comunicación se centraliza en un **bus de servicios (ESB, Enterprise Service Bus)**: los consumidores no hablan con cada servicio, **hablan con el bus**.

```
Consumidor 1 ─┐                 ┌─► Servicio A
              ├──►  [ ESB ]  ───┼─► Servicio B
Consumidor 2 ─┘     (bus)       └─► Servicio C
```

**Escenarios:**
- Grandes organizaciones con **muchos sistemas heredados** que necesitan integrarse.
- Aplicaciones donde distintos sistemas **reutilizan** los mismos servicios.

**Dato:** nació a **fines de los 90** en el mundo empresarial, con **SOAP y XML**. Muchos bancos y organismos públicos siguen usándolo.

**Usala cuando** hay muchos sistemas heredados por integrar. **Evitala cuando** buscás autonomía total por equipo.

### SOA vs Microservicios (tabla que se pregunta SIEMPRE)

| Aspecto | SOA | Microservicios |
|---|---|---|
| **Enfoque principal** | **Reutilización** de servicios | **Independencia total** de cada componente |
| **Comunicación** | **Bus centralizado (ESB)** | **Directa, ligera** (HTTP/REST, mensajería) |
| **Tamaño del servicio** | **Grande**, alcance empresarial | **Pequeño**, un dominio de negocio |
| **Datos** | Suelen **compartir** bases de datos | **Cada servicio tiene su propia base** |
| **Despliegue** | **Coordinado** entre servicios | **Independiente** por servicio |
| **Escenario típico** | Integrar sistemas heredados | Escalar productos digitales con equipos autónomos |

---

## 6. Microservicios

**Evolución de SOA**: la aplicación se divide en servicios **pequeños**, **completamente autónomos** y **desplegables por separado**. Cada uno atiende **un dominio de negocio**. El cliente suele entrar por un **API Gateway**.

```
                 ┌──► Servicio Usuarios ──► [BD usuarios]
Cliente ─► Gateway ├──► Servicio Pedidos  ──► [BD pedidos]
                 └──► Servicio Pagos    ──► [BD pagos]
```

**Principios:**
- **Independencia**: cada uno se desarrolla, despliega y escala **sin afectar al resto**. Los equipos también trabajan independientes.
- **Modularidad**: un servicio, **un dominio de negocio**.

| Desafíos | Patrones y herramientas |
|---|---|
| **Comunicación compleja** entre servicios | **API Gateway**: punto de entrada único |
| **Duplicación de datos** | **Circuit Breaker**: si un servicio falla, se "corta el circuito" para no arrastrar al resto |
| **Transacciones distribuidas** complicadas | **Docker** (contenedores) y **Kubernetes** (orquestación) |

**Ejemplos:** **Netflix** y **Amazon**.

**Datos de color:**
- Se popularizaron en **2014** con el artículo de **Martin Fowler y James Lewis**; muchos los llaman **"SOA bien hecha"**.
- **Netflix** migró tras una falla de base de datos en **2008** que frenó los envíos de DVD por **tres días**.
- **Amazon** usa la **regla de las dos pizzas**: un equipo no debe ser más grande de lo que pueden alimentar dos pizzas.

**Usala cuando** hay equipos autónomos y escalado por dominio. **Evitala cuando** no tenés madurez en DevOps y contenedores.

---

## 7. Arquitectura Event-Driven (dirigida por eventos)

Las acciones del sistema **generan eventos** que otros componentes **capturan, procesan y reaccionan** de forma **asincrónica**.

```
                                    ┌──► Suscriptor A (facturación)
Productor ──► [ Broker de eventos ] ├──► Suscriptor B (stock)
(publisher)   (Kafka, RabbitMQ)     └──► Suscriptor C (notificaciones)
```

**Ventaja clave:** el productor **no sabe ni le importa** quién consume el evento → **desacoplamiento total**.

> **Ejemplo:** se confirma un pedido → facturación genera la factura, stock descuenta productos, notificaciones manda un mail. El módulo de pedidos **solo publicó** "pedido confirmado".
> Es el **patrón Observer** llevado a nivel de sistema.

**Casos de éxito:** **Facebook** (actualizaciones en tiempo real), **Twitter y Uber** (grandes volúmenes en tiempo real).
**Cómo implementarla:** **Apache Kafka** o **RabbitMQ** para la cola de eventos.

**Dato:** **Kafka nació en LinkedIn en 2011**; hoy procesa billones de mensajes por día. Su nombre homenajea al escritor **Franz Kafka**.

**Usala cuando** muchas partes deben reaccionar a un mismo suceso. **Evitala cuando** necesitás respuestas síncronas simples.

---

## 8. Arquitectura Serverless

Modelo de ejecución en la nube donde **el proveedor gestiona la infraestructura** y los desarrolladores solo escriben **funciones**. Las funciones se ejecutan **en respuesta a eventos** (una petición HTTP, un cambio en la base) y **se paga solo por el tiempo de ejecución**.

```
Móvil ─┐                 ┌──► Función auth
Web  ──┼──► API Gateway ─┼──► Función pedidos
IoT  ──┘                 └──► Función correos
```

| Beneficios | Limitaciones |
|---|---|
| **Escalabilidad automática**: el proveedor ajusta recursos según la demanda | **Latencia inicial** al activarse la función (**cold start**) |
| **Costos optimizados**: pagás el uso real; ideal para cargas **variables** | **No ideal para cargas largas o constantes**: pensado para tareas **cortas** |

**Servicios:** **AWS Lambda**, **Azure Functions**, **Google Cloud Functions**.

> **"Serverless" no significa que no haya servidores**: los hay, pero son responsabilidad del proveedor.
> **Cold start** (arranque en frío): una función "dormida" puede tardar **cientos de milisegundos** en despertar.

**Usala cuando** hay cargas variables y tareas cortas. **Evitala cuando** hay procesos largos o se necesita latencia muy baja.

---

## 9. CQRS (Command Query Responsibility Segregation)

**Separa** las **consultas** (lecturas, *queries*) de los **comandos** (escrituras, *commands*), para optimizar cada una por separado. Suele haber una **BD de escritura** y una **BD de lectura**, sincronizadas por **eventos**.

```
            ┌──► Comandos (escribir) ──► [BD escritura] ──┐
Cliente ────┤                                              │ eventos
            └──► Consultas (leer)   ◄── [BD lectura]  ◄────┘
```

- **Escrituras**: con transacciones y **consistencia fuerte**.
- **Lecturas**: optimizadas para **rendimiento**.
- **Escalabilidad**: lectura y escritura se escalan **independientemente** (útil con muchísimas más lecturas que escrituras).
- **Consistencia eventual**: la lectura se actualiza **poco después** de la escritura, no en el mismo instante.

### CQRS + Event Sourcing
**Event Sourcing** = en vez de guardar solo el estado actual, se guarda **la secuencia de eventos** que llevó a ese estado. Combinado con CQRS permite **reconstruir el estado del sistema en cualquier momento**. Muy útil en **sistemas financieros** o donde importa el **historial** detallado.

> **Ejemplo:** un cajero automático: **consultar el saldo** y **hacer una extracción** son caminos muy distintos.

**Dato:** el término lo acuñó **Greg Young alrededor de 2010**.

**Usala cuando** hay muchas más lecturas que escrituras. **Evitala cuando** un CRUD simple alcanza.

---

## 10. Microkernel (plug-in)

> Tema **complementario**: no está en el apunte original, se agregó en la presentación.

Un **núcleo mínimo** con la funcionalidad esencial y un conjunto de **módulos o plug-ins** que agregan capacidades **sin modificar el núcleo**. Los plug-ins se comunican con el núcleo mediante **contratos definidos**.

```
   [Plug-in A]   [Plug-in B]
        \           /
       ┌─────────────┐
       │   NÚCLEO    │
       └─────────────┘
        /           \
   [Plug-in C]   [Plug-in D]
```

| Ventajas | Desventajas |
|---|---|
| Extensible **sin tocar el núcleo** (OCP) | Definir bien el **contrato** del núcleo es difícil |
| Plug-ins **aislados**: fallan sin tumbar el sistema | **Gestión de versiones** entre plug-ins |
| Funciones **opcionales** según el cliente | **No escala** tan bien como microservicios |

**Ejemplos:** **VS Code** y **Eclipse** (extensiones), **WordPress** (plugins), **Jenkins**, **navegadores web**. En sistemas operativos, **MINIX** y **QNX**.

**Usala cuando** el producto debe extenderse con módulos opcionales. **Evitala cuando** no hay un núcleo estable que aislar.

---

## 11. Cuadro comparativo general

| Arquitectura | Idea en una frase | Ventaja principal | Desventaja principal | Ejemplo |
|---|---|---|---|---|
| **Monolítica** | Todo en una unidad | Simple de desarrollar y desplegar | Escala mal, cambios con efectos colaterales | Django, Laravel |
| **Capas** | Presentación / negocio / datos | Separación de responsabilidades | Rígida, cuello de botella | App empresarial React + Node + PostgreSQL |
| **Hexagonal** | Núcleo aislado con puertos y adaptadores | Testeable, dependencias intercambiables | Más complejidad inicial | Cambiar MySQL por Mongo con un adaptador |
| **SOA** | Servicios reutilizables con un bus (ESB) | Integrar sistemas heredados | Bus centralizado, servicios grandes | Bancos, organismos públicos |
| **Microservicios** | Servicios chicos, autónomos, BD propia | Escala y despliegue independientes | Comunicación y transacciones complejas | Netflix, Amazon |
| **Event-Driven** | Productor → broker → suscriptores | Desacoplamiento total, asincrónico | Difícil seguir el flujo | Facebook, Uber, Kafka |
| **Serverless** | Funciones que reaccionan a eventos | Escala sola, pagás el uso | Cold start, no para tareas largas | AWS Lambda |
| **CQRS** | Separar lecturas de escrituras | Escalar lectura y escritura por separado | Consistencia eventual, complejidad | Sistemas financieros + Event Sourcing |
| **Microkernel** | Núcleo mínimo + plug-ins | Extensible sin tocar el núcleo | Contrato difícil, versiones | VS Code, WordPress |

---

## 12. Datos para recordar

| Dato | Detalle |
|---|---|
| **Ley de Conway (1967)** | Los sistemas terminan **reflejando la estructura de comunicación** de la organización que los construye |
| **Regla de las dos pizzas** | Amazon: cada equipo, sus servicios; equipos chicos |
| **Cold start** | Por eso serverless no sirve para todo |
| **Big Ball of Mud** | Foote y Yoder, 1997 |
| **Monolito primero** | Martin Fowler |
| **Microservicios** | Fowler y Lewis, 2014; "SOA bien hecha" |
| **Hexagonal** | Alistair Cockburn, 2005 |
| **CQRS** | Greg Young, ~2010 |
| **Kafka** | LinkedIn, 2011 |
| **Netflix** | Falla de BD en 2008 → 3 días sin envíos de DVD → migró a microservicios |

### Para cerrar
- La arquitectura es **el conjunto de decisiones que después cuesta cambiar**.
- **No hay una arquitectura mejor**: hay una **más adecuada al problema, al equipo y al momento**.
- Las modernas (Event-Driven, Serverless, CQRS, Microkernel) **se combinan** con las clásicas, no las reemplazan.
- **Empezar simple y evolucionar** suele ganarle a empezar complejo.

---

## 📌 Lo que tenés que saber sí o sí

- Arquitectura = **estructura** (componentes + relaciones). Afecta **escalabilidad, mantenibilidad, seguridad y flexibilidad**.
- **Monolítica**: una unidad; simple pero escala mal. **Capas**: presentación/negocio/datos, cada una habla con la inferior.
- **Hexagonal**: núcleo + **puertos (interfaces)** + **adaptadores (implementaciones)** = **DIP**. Cockburn 2005.
- **SOA**: reutilización + **ESB**; servicios grandes, BD compartida. **Microservicios**: independencia, BD propia, despliegue independiente, API Gateway, Circuit Breaker.
- **Event-Driven**: productor → **broker** (Kafka/RabbitMQ) → suscriptores, asincrónico.
- **Serverless**: funciones por evento, pago por ejecución, **cold start**.
- **CQRS**: separar comandos (escritura) y consultas (lectura); **consistencia eventual**; con **Event Sourcing** se reconstruye el estado.
- **Microkernel**: núcleo + plug-ins (VS Code, WordPress).

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
