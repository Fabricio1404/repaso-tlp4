# Soluciones · Tema 08 · Cloud

## Parte A
1 SaaS · 2 IaaS · 3 PaaS · 4 IaaS · 5 SaaS · 6 PaaS · 7 SaaS · 8 IaaS · 9 PaaS · 10 SaaS

## Parte B
1 Autoservicio a demanda · 2 Servicio medido · 3 Elasticidad rápida · 4 Amplio acceso a la red · 5 Pool de recursos

## Parte C
1 Privada · 2 Pública · 3 Híbrida · 4 Comunitaria

## Parte D
1 **c** · 2 **c** · 3 **c** · 4 **b** · 5 **c** · 6 **b** · 7 **b** · 8 **b** · 9 **b** (responsabilidad compartida: la configuración es del cliente) · 10 **b** · 11 **b** · 12 **c**

## Parte E
1. **F**: escalabilidad es la capacidad de crecer; elasticidad es crecer **y achicarse** rápida y automáticamente según la demanda.
2. **F**: el proveedor gestiona la capa de datos, pero la información sigue siendo del cliente.
3. **F**: eso es una VM. El contenedor comparte el kernel del anfitrión y aísla la aplicación.
4. **F**: puede estar en las instalaciones de la organización o en un proveedor; lo que la define es el **uso exclusivo**.
5. **F**: los objetos se identifican por una clave; las "carpetas" son solo prefijos de la clave.
6. **F**: no reproduce fielmente IAM, límites, latencia ni durabilidad; hay que probar en AWS real.
7. **V**.

## Parte F (puntos clave)
1. "Acceso **bajo demanda** a **recursos de computación** **a través de Internet** con **pago por uso**." Bajo demanda = en minutos, cuando lo pedís; recursos = servidores, almacenamiento, red, herramientas, software, IA; Internet = están en centros de datos del proveedor; pago por uso = como la luz.
2. De **comprar activos físicos** a **alquilar recursos según la necesidad**. Ejemplo: la tienda que compraba 10 servidores para Black Friday ahora usa 2 todo el año y sube a 20 esa semana.
3. Ver tabla de la guía. IaaS: VMs/red/almacenamiento, el cliente maneja SO para arriba (EC2) → prepizza. PaaS: plataforma, el cliente sube código y datos (Render, Heroku) → delivery. SaaS: app terminada (Gmail) → comer en la pizzería.
4. Autoservicio (crear VM sin hablar con nadie), amplio acceso (Google Fotos en celu y notebook), pool (VMs de varias empresas en un mismo servidor físico; solo sabés la región), elasticidad (Hot Sale), servicio medido (factura de AWS por horas).
5. 18/11/2025, ~3 h sin X, ChatGPT, Spotify, Canva. Cambio de permisos en ClickHouse → filas duplicadas → archivo de configuración de gestión de bots con más de 200 elementos (límite 200, usaba ~60) → se copiaba automáticamente a todos los servidores → el proxy en Rust no manejó el error → 5xx. Creyeron que era un DDoS. Solución: frenar el archivo, volver a la versión anterior, reiniciar. Lecciones: punto único de falla / concentración; la automatización propaga errores; no todo es un ataque; multi-CDN o DNS secundario; validar entradas aunque vengan de tu sistema.
6. La API responde rápido y delega el trabajo pesado al worker; se absorben picos, se reintentan fallos y los workers escalan solos (arquitectura orientada a eventos). **Idempotencia**: repetir la operación da el mismo resultado que hacerla una vez. Hace falta porque SQS puede entregar el mismo mensaje **más de una vez** (clave determinista + `ON CONFLICT DO NOTHING`).
7. El proveedor es responsable de la seguridad **de** la nube (centros de datos, hardware, red); el cliente, de la seguridad **en** la nube (accesos, datos que sube, configuración de cada servicio).
8. La VM simula una computadora completa con su propio SO (hipervisor), es pesada y lenta de arrancar. El contenedor comparte el kernel del anfitrión y solo aísla la aplicación: liviano y rápido (Docker).
