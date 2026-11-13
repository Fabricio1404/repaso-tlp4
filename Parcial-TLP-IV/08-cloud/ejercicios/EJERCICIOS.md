# Ejercicios · Tema 08 · Cloud

Respuestas en [../soluciones/SOLUCIONES.md](../soluciones/SOLUCIONES.md).

---

## Parte A · ¿IaaS, PaaS o SaaS?

1. Gmail
2. Amazon EC2
3. Subir tu API a Render conectando GitHub
4. Alquilar una VM, instalarle Ubuntu y MySQL
5. Google Docs
6. Heroku
7. Canva
8. Google Compute Engine
9. Vercel
10. Spotify

---

## Parte B · ¿Qué característica del NIST es?

1. Entrás a la consola y creás un servidor sin hablar con nadie.
2. La factura detalla cuántas horas usaste cada servidor.
3. En Hot Sale se suman servidores automáticamente y después se liberan.
4. Usás la app desde el celular, la tablet y la notebook.
5. No sabés en qué servidor físico están tus datos, solo que están en "São Paulo".

---

## Parte C · ¿Qué modelo de despliegue?

1. Un hospital que por ley no puede tener historias clínicas en servidores compartidos.
2. Una startup que paga AWS con tarjeta.
3. Una tienda con datos de tarjetas en su centro de datos y los picos de Black Friday en Azure.
4. Cinco universidades que comparten una nube de investigación con las mismas normas.

---

## Parte D · Opción múltiple

1. ¿Quién usó por primera vez el término "cloud computing" según la guía?
   a) McCarthy · b) Licklider · c) Gilder · d) Bezos
2. ¿En qué año publicó el NIST su definición?
   a) 2006 · b) 2008 · c) 2011 · d) 2015
3. En PaaS, ¿qué gestiona el cliente?
   a) Todo · b) SO y middleware · c) Datos y aplicaciones · d) Nada
4. La tecnología más importante de la nube es:
   a) Blockchain · b) Virtualización · c) Fibra óptica · d) IA
5. El software que crea y administra VMs se llama:
   a) Kernel · b) Middleware · c) Hipervisor · d) Runtime
6. La caída de Cloudflare del 18/11/2025 fue causada por:
   a) Un DDoS · b) Un error interno de configuración · c) Un corte de luz · d) Un hackeo
7. SQS estándar entrega cada mensaje:
   a) Exactamente una vez y en orden · b) Al menos una vez y sin garantizar el orden · c) Nunca · d) Solo si el worker lo pide dos veces
8. Por eso el worker del lab debe ser:
   a) Stateful · b) Idempotente · c) Serverless · d) Público
9. Un bucket de S3 público por error es responsabilidad de:
   a) AWS · b) El cliente · c) Nadie · d) El NIST
10. Para guardar la contraseña de la base de datos se usa:
   a) SSM Parameter Store · b) Secrets Manager · c) S3 · d) El código fuente
11. Google creó:
   a) Docker · b) Kubernetes · c) Kafka · d) Lambda
12. ¿Cuál **no** es una de las 5 características esenciales del NIST?
   a) Pool de recursos · b) Elasticidad rápida · c) Pago anticipado anual · d) Servicio medido

---

## Parte E · Verdadero o falso (justificá)

1. Escalabilidad y elasticidad son lo mismo.
2. En SaaS los datos pasan a ser del proveedor.
3. Un contenedor simula una computadora completa con su propio sistema operativo.
4. La nube privada siempre está en un proveedor externo.
5. En S3 hay carpetas reales.
6. Floci reproduce exactamente la seguridad de IAM de AWS.
7. La infraestructura como código declarativa describe el estado deseado.

---

## Parte F · Desarrollo

1. Definí cloud computing y explicá cada parte de la definición.
2. Explicá el cambio de paradigma que trajo la nube con un ejemplo.
3. Compará IaaS, PaaS y SaaS (qué da el proveedor, qué maneja el cliente, ejemplos). Usá la analogía de la pizza.
4. Explicá las 5 características esenciales del NIST con un ejemplo cada una.
5. Contá el caso Cloudflare: qué pasó, la causa paso a paso y tres lecciones.
6. ¿Por qué en el lab se usa una cola (SQS) entre la API y el worker? ¿Qué es la idempotencia y por qué hace falta?
7. Explicá el modelo de responsabilidad compartida.
8. ¿Qué diferencia hay entre una máquina virtual y un contenedor?
