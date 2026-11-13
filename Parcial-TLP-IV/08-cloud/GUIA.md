# 08 · Cloud computing (Unidad 6)

> Definiciones, historia, IaaS/PaaS/SaaS, el modelo del NIST, modelos de despliegue, proveedores, componentes, el caso Cloudflare y el lab de despliegue con AWS.
> Tema de **teoría**: se preguntan **definiciones**, **clasificaciones** (¿esto es IaaS, PaaS o SaaS?) y el **caso real**.

---

## 1. ¿Qué es el cloud computing?

En simple: **usar recursos informáticos de otra empresa a través de Internet, cuando los necesitás, y pagar solo por lo que usás**. En vez de comprar y mantener tus servidores, se los **alquilás** a un proveedor.

### Primera definición (memorizala)
> **"El acceso bajo demanda a recursos de computación a través de Internet, con precios de pago por uso."**

| Parte | Significa | Ejemplo |
|---|---|---|
| **Bajo demanda** | Pedís recursos en el momento y los tenés en minutos | Crear un servidor en AWS desde la web y usarlo en 2 minutos |
| **Recursos de computación** | Todo lo que ofrece una computadora: servidores físicos y virtuales, almacenamiento, red, herramientas de desarrollo, software, herramientas analíticas con IA | |
| **A través de Internet** | Los recursos están en los centros de datos del proveedor; accedés desde cualquier lugar | |
| **Pago por uso** | Pagás lo que consumís (horas, GB, usuarios), como la luz. Si apagás el servidor, dejás de pagar | |

### Segunda definición
> **"Un paradigma mediante el cual distintas empresas ofrecen servicios de computación, generalmente basados en virtualización y en tecnologías distribuidas, que van desde simples aplicaciones hasta centros de cómputos enteros."**

- **Paradigma**: una forma de pensar y hacer las cosas. **Antes las empresas compraban tecnología; ahora la alquilan.**
- **Virtualización**: una computadora física funciona como varias independientes.
- **Tecnologías distribuidas**: muchas computadoras (a veces en distintos países) trabajando juntas como una sola.

**Ejemplos cotidianos:** Google Drive / Dropbox, Netflix (usa AWS), Gmail.

> **Analogía:** tener tu propio servidor es como tener un **generador eléctrico** en casa. Usar la nube es **conectarte a la red eléctrica**: no producís la energía, la usás y pagás lo que consumís.

---

## 2. Evolución histórica

| Año | Persona | Aporte |
|---|---|---|
| **1961** | **John McCarthy** (MIT, creador de LISP y de la expresión "inteligencia artificial") | "Algún día la computación podrá organizarse como un **servicio público**", como el agua o la electricidad → el actual **pago por uso** |
| **1963** | **J.C.R. Licklider** (ARPA) | Imaginó una **"red de computadoras intergaláctica"**: todos conectados, accediendo a programas y datos desde cualquier lugar. Influyó en **ARPANET (1969)**, origen de Internet |
| **2006** | **George Gilder** | Usó el término **cloud computing** en el artículo **"Las fábricas de información"** (*The Information Factories*), revista **Wired** |

- **2006** también: Amazon lanza **AWS** con **S3** (almacenamiento) y **EC2** (servidores) → inicio de la nube comercial moderna.
- El origen exacto del término es discutido (Compaq 1996, Eric Schmidt 2006); **la guía toma a Gilder**.
- **¿Por qué "nube"?** En los diagramas de redes, Internet se dibujaba como una nube: algo grande y complejo cuyos detalles no importan.

---

## 3. Cambio de paradigma y ventajas

**El gran cambio:** de la **compra de activos físicos** a la **adquisición de recursos según se necesiten**.

- **Activo físico**: bien material que la empresa compra (servidores, discos, aire acondicionado). Implica mucha plata al principio, espacio, personal y renovar equipos.
- Con la nube alquilás lo que necesitás hoy; mañana, más o menos.

> **Ejemplo:** una tienda online compraba 10 servidores "por las dudas" para el Black Friday; ahora usa 2 en la nube todo el año y sube a 20 solo esa semana.

### Las tres ventajas clave
| Ventaja | Qué es | Ejemplo |
|---|---|---|
| **Escalabilidad** | Aumentar o disminuir recursos según el trabajo | Venta de entradas de un recital: de 100 a 100.000 visitas en minutos |
| **Flexibilidad** | Elegir y cambiar servicios y configuraciones sin quedar atado a un equipo | Probar una base nueva una semana y borrarla |
| **Reducción de costos** | Sin gastos iniciales grandes; pagás el uso; ahorrás mantenimiento, luz y espacio | Una startup de Formosa lanza su app con pocos dólares por mes |

**Desventajas:** depende de **Internet**, los datos quedan en manos de un **tercero**, y si no controlás el consumo **la factura crece** más de lo esperado.

---

## 4. Modelos de servicio: IaaS, PaaS y SaaS

Indican **qué parte te da el proveedor y qué parte manejás vos**. "aaS" = *as a Service*.

| | **IaaS** · Infraestructura | **PaaS** · Plataforma | **SaaS** · Software |
|---|---|---|---|
| **Qué te dan** | VMs, redes, almacenamiento | Plataforma completa para desarrollar y desplegar: **subís tu código** | Software **terminado**, listo para usar en el navegador |
| **Qué manejás vos** | **Sistema operativo**, configuración, todo lo de arriba | Tu **código** y tus **datos** | Nada (solo lo usás) |
| **Quién lo usa** | Administradores de sistemas | **Desarrolladores** | Cualquier persona o empresa |
| **Ventaja** | Máxima libertad | Rapidez | Cero mantenimiento |
| **Desventaja** | Más trabajo (instalar, actualizar, asegurar el SO) | Menos control; lenguajes y versiones del proveedor | Casi nada de control |
| **Ejemplos** | **Amazon EC2**, Google Compute Engine, Azure VMs, DigitalOcean Droplets | **Heroku**, Google App Engine, Azure App Service, AWS Elastic Beanstalk, **Vercel**, **Render** | **Gmail**, Google Docs, Microsoft 365, Canva, Trello, Zoom, Netflix, Spotify |
| **Caso** | Alquilar una VM con Ubuntu, instalar MySQL y el sistema de facturación | Subir tu API Node a Render conectando GitHub | La escuela usa Google Classroom |

### Analogía de la pizza

| Modelo | Analogía | Qué hacés vos |
|---|---|---|
| **On-Premise** | Hacés la pizza en tu casa | Todo: ingredientes, horno, cocina, mesa |
| **IaaS** | Comprás una prepizza y la cocinás en tu horno | Agregás ingredientes y cocinás |
| **PaaS** | Pedís delivery | Solo ponés la mesa y la bebida |
| **SaaS** | Comés en la pizzería | Nada, solo comés |

> **Cómo distinguirlos rápido:** si **vos instalás el SO** → IaaS. Si **programás la app pero no tocás el servidor** → PaaS. Si **solo usás la app** → SaaS.

---

## 5. Cuadro de responsabilidades

✅ = lo gestiona **el cliente** · ☁️ = lo gestiona **el proveedor**

| Capa (de arriba hacia abajo) | On-Premise | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Aplicaciones | ✅ | ✅ | ✅ | ☁️ |
| Datos | ✅ | ✅ | ✅ | ☁️ * |
| Runtime | ✅ | ✅ | ☁️ | ☁️ |
| Middleware | ✅ | ✅ | ☁️ | ☁️ |
| Sistema operativo | ✅ | ✅ | ☁️ | ☁️ |
| Virtualización | ✅ | ☁️ | ☁️ | ☁️ |
| Servidores | ✅ | ☁️ | ☁️ | ☁️ |
| Almacenamiento | ✅ | ☁️ | ☁️ | ☁️ |
| Redes | ✅ | ☁️ | ☁️ | ☁️ |

\* En SaaS el proveedor gestiona la capa de datos, pero **la información sigue siendo del cliente** (tus mails en Gmail son tuyos).

### Las nueve capas
1. **Redes**: cables, routers, switches, conexión a Internet.
2. **Almacenamiento**: discos donde se guardan datos de forma permanente.
3. **Servidores**: computadoras físicas (procesador, RAM, placas de red).
4. **Virtualización**: software que divide un servidor físico en varias VMs (VMware, Hyper-V, KVM).
5. **Sistema operativo**: Linux, Windows Server.
6. **Middleware**: software intermedio que conecta el SO con las aplicaciones, o apps entre sí (Nginx, Apache, RabbitMQ).
7. **Runtime**: lo necesario para que el código de un lenguaje funcione (Node.js, JVM, intérprete de Python, .NET).
8. **Datos**: la información de la app (usuarios, productos, ventas).
9. **Aplicaciones**: el programa que usa la persona final.

> **Idea clave:** pasar de On-Premise a SaaS es **ir delegando responsabilidades** al proveedor. **Ganás comodidad, perdés control.**

---

## 6. El modelo del NIST

El **NIST** (*National Institute of Standards and Technology*, del Departamento de Comercio de EE.UU.) publicó en **2011** la definición **SP 800-145**, la referencia más usada.

Describe la nube en **3 niveles**:
- **5 características esenciales**
- **3 modelos de servicio** (SaaS, PaaS, IaaS)
- **4 modelos de despliegue** (público, privado, híbrido, comunitario)

> Truco: **5 – 3 – 4**.

### Las 5 características esenciales

| Característica | Qué significa | Ejemplo |
|---|---|---|
| **Autoservicio a demanda** | El usuario consigue recursos **por su cuenta**, sin hablar con nadie del proveedor | Clic en "crear máquina virtual" en Google Cloud |
| **Amplio acceso a la red** | Disponible por Internet desde **cualquier dispositivo** | Google Fotos en el celular y en la notebook |
| **Pool de recursos** ("fondo común") | El proveedor junta recursos y los **comparte entre clientes**. El cliente no sabe en qué servidor exacto están sus datos, solo la **región** | En un mismo servidor físico de AWS corren VMs de varias empresas, aisladas |
| **Elasticidad rápida** | Los recursos **crecen o se achican rápido**, incluso automáticamente; parecen ilimitados | Mercado Libre en el Hot Sale |
| **Servicio medido** | El proveedor **mide el consumo** y cobra según eso; los dos pueden verlo | La factura de AWS detalla horas por servidor, como la boleta de luz |

> **Escalabilidad vs elasticidad:** la **escalabilidad** es la **capacidad de crecer**; la **elasticidad** es **crecer y achicarse rápido y automáticamente** según la demanda del momento.

---

## 7. Modelos de despliegue

Los modelos de **servicio** dicen **qué recibís**; los de **despliegue** dicen **para quién es** la infraestructura y dónde está.

| Modelo | Qué es | Ventaja | Desventaja | Ejemplo |
|---|---|---|---|---|
| **Pública** | De un proveedor, ofrecida a **cualquiera** por Internet; recursos compartidos, clientes aislados. La más común | Barata, sin inversión inicial | Menos control sobre dónde están los datos | Una startup en AWS |
| **Privada** | **Uso exclusivo** de una organización (en sus instalaciones o en un proveedor). Para datos muy sensibles o por ley | Máximo control y seguridad | Cara, hay que mantenerla | Hospital, organismo del Estado, banco con OpenStack/VMware |
| **Híbrida** | **Privada + pública** conectadas. Lo sensible en la privada, lo que escala en la pública | Equilibrio control/costo | Más compleja | Tienda: tarjetas en la privada, picos de Black Friday en la pública |
| **Comunitaria** | Compartida por **varias organizaciones** con necesidades o reglas comunes | Costos compartidos | Coordinar normas | Universidades con una nube de investigación; AWS GovCloud |

---

## 8. Principales proveedores

Un proveedor de nube es un **CSP** (*Cloud Service Provider*). Los tres más grandes: **AWS, Microsoft Azure y Google Cloud (GCP)**. AWS es líder desde 2006. Los tres ofrecen IaaS, PaaS y SaaS y tienen centros de datos en Sudamérica (Brasil).

| Proveedor | Año | Fuerte en | Servicios | Clientes |
|---|---|---|---|---|
| **AWS** (Amazon) | 2006 | El que más servicios y clientes tiene. Nació para alquilar la infraestructura de la tienda | **EC2, S3, Lambda, RDS** | Netflix, Airbnb |
| **Microsoft Azure** | 2010 | Empresas que ya usan Microsoft (Windows Server, Active Directory, Office 365, C#/.NET) | Azure VMs, App Service, Azure SQL | |
| **Google Cloud** | 2008 (App Engine) | Datos, IA y contenedores. **Google creó Kubernetes** | Compute Engine, App Engine, BigQuery, Cloud Storage | Spotify |
| Otros | | Oracle Cloud, IBM Cloud, Alibaba Cloud (Asia), DigitalOcean (simple) | | |

---

## 9. Componentes de la nube

La nube **no está "en el aire"**: funciona gracias a **centros de datos**, **capacidades de red** y **virtualización**.

### Centros de datos
Edificios con miles de servidores, energía de respaldo, refrigeración, seguridad física y conexiones rapidísimas.
- **Bare metal** ("metal desnudo"): servidor físico real, **sin virtualización**, que a veces se alquila entero para máximo rendimiento.
- Se agrupan en **regiones** (São Paulo, Virginia) para elegir la más cercana y que responda más rápido.

### Capacidades de red
Normalmente es **Internet**, que funciona como una **WAN** (red de área amplia). Conecta:
- **Front-end**: lo que ve el usuario (la app de Netflix en tu celular).
- **Back-end**: lo que funciona detrás, en el proveedor.

> Das "Play" en Netflix (front-end) → el pedido viaja por Internet (WAN) → servidores de Netflix en AWS (back-end) → te envían el video.

### Virtualización (la tecnología más importante de la nube)
Un software llamado **hipervisor** **abstrae** el hardware: los recursos físicos (procesador, memoria, disco, red) se **agrupan y dividen** sin depender de los límites de cada máquina.
- **Máquina virtual (VM)**: computadora simulada por software dentro de una real (VirtualBox con Linux dentro de Windows).
- **Hipervisor**: crea y administra VMs → VMware ESXi, Microsoft Hyper-V, **KVM** (Google Cloud), Xen o **Nitro** (AWS).
- **Abstraer**: ocultar los detalles físicos y mostrar solo lo necesario.

> **Analogía:** un servidor físico es un **edificio**; la virtualización lo divide en **departamentos**. Cada inquilino tiene el suyo, pero comparten estructura, agua y luz.

**Contenedores (Docker):** forma **más liviana** de virtualización. En vez de simular una computadora entera, **aíslan aplicaciones que comparten el mismo sistema operativo** (kernel).

| Máquina virtual | Contenedor |
|---|---|
| Simula una computadora **entera**, con su propio SO | Comparte el **kernel** del anfitrión, aísla la app |
| Pesada (GB), arranca en minutos | Liviano (MB), arranca en segundos |
| Hipervisor | Motor de contenedores (Docker) |

---

## 10. Síntesis: las capas de la nube

| Capa | Modelo | Ejemplos |
|---|---|---|
| **Aplicación** | SaaS | Telemedida (medidores inteligentes, GPS de flotas), contenidos (YouTube, Spotify), colaboración (Docs, Trello, Notion), comunicación (WhatsApp Web, Zoom), finanzas (home banking, Mercado Pago) |
| **Plataforma** | PaaS | Almacenaje (**S3**), identificación (Firebase Auth, "Iniciar sesión con Google"), ejecución (App Engine, **Lambda**), **colas** (**SQS**), bases de datos (**RDS**, Azure SQL, Firestore) |
| **Infraestructura** | IaaS | Computación (**EC2**), almacenaje de bloques (**EBS**: discos virtuales para una VM), redes (**VPC**, balanceadores de carga) |

**Dispositivos de acceso:** portátiles, PCs, teléfonos, tablets, servidores → la característica de **amplio acceso a la red** del NIST.

---

## 11. Caso real: Cloudflare, 18 de noviembre de 2025

Una **falla interna** de Cloudflare dejó sin funcionar durante **unas tres horas** a sitios como **X, ChatGPT, Spotify y Canva**.

### ¿Qué es Cloudflare?
Empresa de EE.UU. (2009) de **servicios de red y seguridad en la nube**. Se ubica **entre el usuario y el servidor** de un sitio (funciona como **proxy inverso**). La usa **~20 % de los sitios del mundo**.
- **CDN**: copias del contenido cerca del usuario.
- **Protección DDoS**: filtra millones de pedidos falsos.
- **Gestión de bots**: distingue personas de programas automáticos.
- **WAF**: firewall de aplicaciones web.
- **DNS**: traduce dominios a IPs (su DNS público es **1.1.1.1**).

Es un **CSP de nube pública** que forma parte de las **capacidades de red**.

### Cronología (Argentina = UTC − 3)
| UTC | Argentina | Qué pasó |
|---|---|---|
| 11:05 | 08:05 | Cambio de permisos en una base de datos |
| 11:20 | 08:20 | Empiezan las fallas en todo el mundo |
| 14:24 | 11:24 | Identifican el archivo defectuoso y frenan su distribución |
| 14:30 | 11:30 | El tráfico principal se normaliza |
| 17:06 | 14:06 | Todos los servicios restablecidos |

Se cayó hasta el login del panel de Cloudflare. **La peor caída desde 2019. NO fue un ciberataque: fue un error interno de configuración.**

### La causa, paso a paso
1. Cambiaron los **permisos** de una base de datos (**ClickHouse**) para mejorar la seguridad.
2. Una consulta empezó a devolver **filas duplicadas**; esa consulta armaba un **archivo de configuración** del sistema de **gestión de bots**.
3. El archivo **duplicó su tamaño**: **más de 200 elementos**, cuando el software tenía un **límite de 200** (normalmente usaba ~60).
4. El archivo se generaba cada pocos minutos y **se copiaba automáticamente a todos los servidores del mundo**.
5. El programa que procesa el tráfico (escrito en **Rust**) **no manejó el error**: se detuvo y los sitios devolvieron **errores HTTP 5xx**.

Al principio creyeron que era un **DDoS** gigante, porque el sistema fallaba, se recuperaba y volvía a fallar (a veces salía el archivo bueno y a veces el malo) y, por coincidencia, se cayó también su página de estado. **Solución:** frenar el archivo defectuoso, volver a una versión anterior y reiniciar servidores.

### Lecciones
- **Concentración y punto único de falla**: si muchos dependen de un proveedor, su falla los afecta a todos.
- **La automatización es de doble filo**: la rapidez para actualizar miles de servidores también **propaga un error en minutos**.
- **No todo es un ataque**: muchas caídas son errores humanos o de configuración.
- **Cómo protegerse**: estrategia **multi-CDN** o **DNS secundario**.
- Cloudflare anunció: revisar sus archivos de configuración con el mismo cuidado que los datos de usuarios, sumar **interruptores globales** y revisar cómo reacciona cada módulo ante errores.

> **Lección para programadores:** el error final fue un programa que **no manejó un caso inesperado**. **Validá los datos de entrada aunque vengan de tu propio sistema** y **manejá los errores** en vez de dejar que el programa se detenga. (Lo mismo que practicás en testing: los **casos límite**. El límite era 200 y nadie probó qué pasaba con 201.)

---

## 12. Lab de despliegue (repo `tlp4-u6-deploy`)

Se practican servicios de AWS **en localhost** con **Floci**, un **emulador local de AWS**: **sin cuenta, sin tarjeta y sin costos**. Stack: React, Express, PostgreSQL y MongoDB.

```
React (5173) → Express (3000) ─┬→ S3           archivos subidos
                               ├→ PostgreSQL   metadatos
                               ├→ SQS          cola de eventos
                               ├→ SSM          configuración
                               └→ Secrets Mgr  credenciales
Worker ← SQS → MongoDB (eventos procesados)
       └→ S3 + PostgreSQL (miniaturas de la galería)
```
Floci emula S3, SQS, SSM y Secrets Manager en `http://localhost:4566`.

| Servicio | Qué es | Cuándo usarlo |
|---|---|---|
| **S3** | Almacenamiento de **objetos** en **buckets**, accesible por HTTP | Archivos subidos, imágenes, backups, sitios estáticos |
| **SQS** | **Cola** de mensajes administrada | Desacoplar tareas lentas de la respuesta al usuario |
| **SSM Parameter Store** | Almacén de **configuración** | Valores que cambian sin recompilar y **no son secretos** |
| **Secrets Manager** | Almacén de **secretos** con control de acceso y **rotación** | Contraseñas, claves de API, tokens |
| **RDS / DocumentDB** | Bases **administradas** (relacional / documental) | Cuando no querés operar tu propia base |
| **CloudFormation** | Infraestructura descrita en **plantillas** | Crear y destruir entornos de forma repetible |

- **S3**: objetos identificados por una **clave**; **no hay carpetas reales**; durable (replica); un bucket es **privado por defecto**.
- **SQS estándar**: entrega cada mensaje **al menos una vez** y **no garantiza el orden**. Mientras se procesa, el mensaje queda **invisible** (tiempo de visibilidad); si no se borra antes, **vuelve a la cola**.
- **Parameter Store vs Secrets Manager**: configuración general vs secretos (rotación automática y auditoría).

### Qué pasa al subir una imagen
1. React envía el archivo a la API.
2. La API lo guarda en **S3**, registra metadatos en **PostgreSQL** y publica un mensaje en **SQS**.
3. El **worker** consume el mensaje, guarda el evento en **MongoDB** y genera la miniatura.
4. La imagen aparece en la galería **unos segundos después** (consistencia eventual).

> **¿Por qué una cola?** La API responde rápido y **delega** el trabajo pesado: API → [cola] → worker. Se absorben **picos**, se **reintentan** fallos y los workers **escalan por separado**. Es **arquitectura orientada a eventos**.

### Conceptos transversales
| Concepto | Qué es |
|---|---|
| **Modelo de responsabilidad compartida** | El proveedor es responsable de la seguridad **DE** la nube (centros de datos, hardware, red); vos, de la seguridad **EN** la nube (quién accede, qué subís, cómo configurás). **Un bucket público por error es culpa del cliente** |
| **Región / zona de disponibilidad** | Región = ubicación geográfica con varios centros de datos (`us-east-1`). Zona = uno o más centros aislados dentro de la región. Repartir en varias zonas protege de la caída de una. La región afecta **latencia, costo y normativas** |
| **IAM** | **Usuario** (credenciales propias), **rol** (identidad temporal sin contraseña fija; lo recomendado para apps), **política** (permite o deniega acciones), **credenciales** (`AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`, **nunca en el repo**). **Mínimo privilegio** |
| **Servidor descartable (stateless)** | No guarda estado propio; archivos y sesiones viven en servicios aparte → se puede reemplazar o duplicar |
| **Idempotencia** | Repetir la operación da el mismo resultado que hacerla una vez. Hace falta porque **SQS puede entregar dos veces** (en el lab: clave determinista + `ON CONFLICT DO NOTHING`) |
| **Consistencia eventual** | Tras escribir, distintas partes ven el cambio en momentos distintos |
| **Reintentos** | El worker **no borra** el mensaje hasta terminar con éxito |
| **12 factores** | Configuración **en el entorno** y no en el código; servicios de apoyo intercambiables por URL; logs como flujo de salida |

### Infraestructura como código (IaC)
- **Imperativa**: lista de comandos que dice **cómo** (`npm run init`).
- **Declarativa**: plantilla con el **estado deseado** que dice **qué** debe existir (`infra/stack.yaml`); la herramienta calcula los pasos.
- Un **stack de CloudFormation** agrupa recursos que se crean, actualizan y borran **como unidad**. Beneficios: repetibilidad, revisar cambios como código, destruir un entorno sin olvidar nada.

### Emulador vs AWS real
El código es el mismo; cambian el **endpoint** (`http://localhost:4566`) y las **credenciales** (`test/test`). Floci **no** reproduce fielmente IAM, límites de capacidad, latencia real ni durabilidad → **probar en AWS real antes de producción**.

### Seguridad y costos
- Nunca subir credenciales al repo ni mandar un secreto al navegador.
- **URLs prefirmadas**: acceso **temporal** a un objeto privado sin exponer credenciales.
- Consultas con **parámetros** (`$1`) → evita **inyección SQL**.
- Validar lo que sube el usuario (tipo, tamaño, contenido), no confiar en la extensión.
- **Alerta de presupuesto**, destruir lo que no se usa, **etiquetar** recursos, todo como código.

```bash
docker compose up -d      # Floci + PostgreSQL + MongoDB
cd backend && npm install
npm run init              # crea bucket, cola, parámetro y secreto
npm run check             # todo debe decir OK
npm start                 # API en :3000
npm run worker            # consumidor de SQS (otra terminal)
cd frontend && npm run dev    # React en :5173
docker compose down       # apaga, conserva datos
docker compose down -v    # apaga y BORRA los datos
```

---

## 📌 Lo que tenés que saber sí o sí

- **Definición**: acceso **bajo demanda** a recursos de computación **por Internet** con **pago por uso**. Paradigma basado en **virtualización** y **tecnologías distribuidas**.
- **1961 McCarthy** (servicio público) · **1963 Licklider** (red intergaláctica) · **2006 Gilder** (término, Wired) · 2006 AWS (S3, EC2).
- Ventajas: **escalabilidad, flexibilidad, reducción de costos**. Cambio: de **activos físicos** a **recursos según necesidad**.
- **IaaS** (VMs; vos el SO) · **PaaS** (subís código) · **SaaS** (usás la app). Pizza. Cuadro de 9 capas.
- **NIST 2011 (SP 800-145)**: **5** características (autoservicio, amplio acceso, pool, elasticidad, servicio medido) · **3** servicios · **4** despliegues (pública, privada, híbrida, comunitaria).
- **Escalabilidad** (poder crecer) ≠ **elasticidad** (crecer y achicarse automáticamente).
- **AWS** (2006, líder) · **Azure** (2010, ecosistema Microsoft) · **GCP** (2008, datos/IA, Kubernetes).
- **Virtualización** + **hipervisor**; **contenedor** = más liviano, comparte el SO.
- **Cloudflare 18/11/2025**: cambio de permisos → filas duplicadas → archivo de más de 200 elementos (límite 200) → se propagó solo → programa en Rust no manejó el error → 5xx. **No fue un ataque.** Lecciones: punto único de falla, automatización de doble filo, validar entradas.
- Lab: **S3** (objetos), **SQS** (cola, al menos una vez → **idempotencia**), **SSM** (config), **Secrets Manager** (secretos), **responsabilidad compartida**, **IAM** y **mínimo privilegio**, **IaC**.

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
