# Respuestas · Simulacro teórico

| # | Resp. | Tema | Por qué |
|---|---|---|---|
| 1 | b | 01 | La interface es solo contrato; la abstracta puede tener estado y código |
| 2 | b | 01 | Override = misma firma en la hija. Overload = mismo nombre, otros parámetros |
| 3 | b | 01 | `static` es de la clase |
| 4 | b | 00/01 | Generan `this.x = x`, que no se puede "borrar" |
| 5 | b | 01 | `type T = "a" \| "b"` |
| 6 | b | 01 | Devolver la referencia interna permite modificarla desde afuera |
| 7 | b | 01 | "Tiene un" = composición; "es un" = herencia |
| 8 | b | 01 | Para que la hija acceda, `protected` |
| 9 | c | 02 | |
| 10 | c | 02 | Impide `new` desde afuera |
| 11 | b | 02 | Estado global compartido entre tests |
| 12 | b | 02 | |
| 13 | b | 02 | |
| 14 | b | 02 | El cliente depende de la abstracción |
| 15 | b | 03 | Se arregla con interface + una clase por caso |
| 16 | a | 03 | Se arregla con interface + inyección por constructor |
| 17 | c | 03 | La hija no puede reemplazar al padre sin sorpresas |
| 18 | a | 03 | Interfaces chicas |
| 19 | b | 03 | |
| 20 | d | 03/04 | El servicio recibe la interface por constructor |
| 21 | b | 04 | |
| 22 | b | 04 | Si sale del código, confirma sus errores |
| 23 | b | 04 | Para contenido, `toEqual` |
| 24 | b | 04 | Sin flecha, el error salta antes de que `expect` lo vea |
| 25 | c | 04 | |
| 26 | a | 04 | |
| 27 | b | 04 | El test coincide con la regla → el error es del código |
| 28 | b | 04/05 | 403 = sin permiso |
| 29 | b | 04 | Es una estrategia, no un requisito para testear |
| 30 | b | 04 | Se puede ejecutar código sin verificar nada |
| 31 | a | 04 | Por eso `app.ts` va separado de `server.ts` |
| 32 | c | 04 | Muchas unitarias, pocas E2E |
| 33 | b | 05/09 | |
| 34 | b | 05 | Base64 legible + firma con el secreto |
| 35 | b | 05 | `localhost` dentro del contenedor es el propio contenedor |
| 36 | b | 05/08 | Contenedor = instancia en ejecución de la imagen |
| 37 | c | 06 | Puertos = interfaces |
| 38 | b | 06 | Enterprise Service Bus |
| 39 | b | 06 | |
| 40 | b | 06 | La función dormida tarda en arrancar |
| 41 | a | 06 | |
| 42 | b | 06 | |
| 43 | a | 06 | Núcleo + plug-ins |
| 44 | a | 06 | 1967 |
| 45 | b | 07 | El modelo solo propone la llamada |
| 46 | b | 07 | No es memoria |
| 47 | b | 07 | Host / cliente / servidor; JSON-RPC; tools, resources, prompts |
| 48 | b | 07 | No es una herramienta ejecutable por definición |
| 49 | b | 07 | Datos tratados como órdenes |
| 50 | b | 07 | No modifica los pesos |
| 51 | b | 07 | |
| 52 | b | 07 | |
| 53 | b | 08 | |
| 54 | b | 08 | Subís código, no tocás el servidor |
| 55 | a | 08 | VMs; vos manejás el SO |
| 56 | b | 08 | NIST SP 800-145, 2011 |
| 57 | c | 08 | |
| 58 | b | 08 | Archivo de más de 200 elementos, límite 200, propagado a todo el mundo |
| 59 | a | 08 | Repetir da el mismo resultado |
| 60 | c | 08 | |

## Puntaje
- **54–60**: listo.
- **45–53**: repasá los temas de las que fallaste.
- **< 45**: volvé a las secciones "📌 Lo que tenés que saber sí o sí" de cada guía.
