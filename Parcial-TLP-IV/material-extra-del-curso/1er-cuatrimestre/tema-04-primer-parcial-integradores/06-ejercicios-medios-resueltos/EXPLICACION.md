# Tema 4 · Integradores medios: resolución explicada

## M1 · Estación meteorológica
| Clase | Concepto |
|---|---|
| `Sensor` (abstracta), `Termometro`, `Higrometro` | Clase abstracta, herencia, polimorfismo, encapsulamiento (lecturas privadas + copia defensiva al recibirlas) |
| `Estacion` | Sujeto del **Observer** + polimorfismo sobre `Sensor[]` |
| `ObservadorClima` | Interfaz del Observer |
| `PantallaActual`, `Estadisticas`, `AlertaCalor` | Observadores concretos |
| `Notificador`, `NotificadorConsola`, `NotificadorMemoria` | **DIP**: `AlertaCalor` recibe el canal por constructor |

- **Copia al recibir:** `this.lecturas = [...lecturas]`. Si guardaras el arreglo que te pasan, quien lo creó podría modificarlo después. La copia defensiva sirve en las dos direcciones (al entregar y al recibir).
- **`shift` + `push`:** saca la primera lectura y la pone al final (una cola circular).
- **Dos alertas con umbrales y canales distintos**: la misma clase `AlertaCalor` sirve para la consola (umbral 33) y para la memoria (umbral 30). Eso es lo que te da DIP: la misma lógica con distintos destinos.
- **Orden de la salida:** por cada sensor, se notifica a todos los observadores **en el orden de suscripción** (pantalla, estadísticas, alerta consola, alerta memoria). Por eso `📢` aparece justo después de la temperatura de las 14 h.
- `Math.max(...arr)`: el operador *spread* pasa los elementos como argumentos separados.

## M2 · Reproductor multimedia
| Clase | Concepto |
|---|---|
| `Reproducible`, `ConSubtitulos`, `Descargable` | **ISP**: tres capacidades separadas |
| `Cancion`, `Pelicula` | Implementan solo lo que tienen |
| `RadioStreamLegacy` / `RadioAdapter` | **Adapter**: adaptee y adaptador; target = `Reproducible` |
| `FabricaContenido` | **Factory**: devuelve `Reproducible`; para radio, devuelve un adapter |
| `ListaReproduccion`, `descargarTodo` | Clientes que piden **lo mínimo** (ISP) |

- **ISP + Adapter:** la radio solo puede cumplir `Reproducible`. Gracias a ISP, el adapter no tiene que "inventar" `descargar()` ni `subtitulos()` con un `throw`. Si `Reproducible` incluyera `descargar`, el adapter estaría forzado a lanzar error (violación de ISP y de LSP).
- **El adapter adapta también el significado:** `duracionMinutos()` devuelve 0 porque una transmisión en vivo no tiene duración. Es una decisión de diseño que hay que documentar.
- **Respuesta a la pregunta:** la fábrica devuelve el tipo común `Reproducible`. Con ese tipo, TypeScript **no** te deja llamar a `subtitulos()` (no sabe que es una película). Cuando necesitás una capacidad específica, o creás el objeto concreto directamente (como acá), o hacés una fábrica más específica (`crearPelicula(): Pelicula`). Es el costo del Factory: el cliente **solo conoce el tipo común**, y eso es bueno para desacoplar pero malo si necesitás algo particular. (Lo que **no** hay que hacer es `as Pelicula` para forzar el tipo.)
