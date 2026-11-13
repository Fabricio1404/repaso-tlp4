# Tema 4 · Integradores medios: tres temas por ejercicio

Tiempo sugerido: 35 minutos cada uno. Al terminar, escribí arriba del archivo qué concepto/patrón/principio aplicaste en cada clase.

---

## M1 · Estación meteorológica (`m1-estacion-meteorologica.ts`) · POO + Observer + DIP

**Sensores**
- No existe un sensor genérico. Todo sensor tiene `id` (no cambia) y una secuencia de lecturas que recibe al crearse (que nadie de afuera pueda alterar después). Cada tipo informa `magnitud()` y `unidad()`: `Termometro` ("temperatura", "°C"), `Higrometro` ("humedad", "%").
- `medir()` devuelve la siguiente lectura de la secuencia y, al terminarse, vuelve a empezar (pista: `shift` + `push`).

**Estación**
- `Estacion(sensores)` con `suscribir(o)` y `tomarMediciones(hora)`: por cada sensor arma una medición `{ magnitud, valor, unidad, hora }` y avisa a todos los interesados (sin conocerlos ni preguntar el tipo de sensor).

**Interesados**
- `PantallaActual`: imprime `[10h] temperatura: 28°C`.
- `Estadisticas`: acumula solo temperaturas; `resumen()` → `Temp. mín 28 / máx 35 / prom 31.3` (promedio con 1 decimal).
- `AlertaCalor(umbral, notificador)`: si la temperatura es **mayor o igual** al umbral, envía `"Alerta de calor: <valor>°C a las <hora>h"` por el notificador **que recibe por constructor**.
- Notificadores: `NotificadorConsola` (imprime `📢 <mensaje>`) y `NotificadorMemoria` (guarda en `mensajes`).

Salida esperada:
```
[10h] temperatura: 28°C
[10h] humedad: 60%
[14h] temperatura: 35°C
📢 Alerta de calor: 35°C a las 14h
[14h] humedad: 40%
[18h] temperatura: 31°C
[18h] humedad: 55%
Temp. mín 28 / máx 35 / prom 31.3
[
  'Alerta de calor: 35°C a las 14h',
  'Alerta de calor: 31°C a las 18h'
]
```

---

## M2 · Reproductor multimedia (`m2-reproductor-multimedia.ts`) · ISP + Factory + Adapter

**Contenidos** (cada uno implementa solo lo que puede hacer):
- Todo contenido es reproducible: `titulo`, `reproducir(): string`, `duracionMinutos()`.
- `Cancion(titulo, minutos)`: se puede descargar (`"<titulo>.mp3 descargado"`). Reproduce `♪ Sonando "<titulo>"`.
- `Pelicula(titulo, minutos)`: se puede descargar (`.mp4`) **y** tiene `subtitulos(idioma)` → `Subtítulos de "<titulo>" en <idioma>`. Reproduce `▶ Proyectando "<titulo>"`.
- **Radio:** solo existe `RadioStreamLegacy` (dada, no se modifica). Tiene que poder agregarse a una lista como un contenido reproducible más: su título es el nombre de la estación, reproduce `📻 En vivo: <estación>` y su duración es 0. No es descargable ni tiene subtítulos.

**Fábrica:** `FabricaContenido.crear(tipo, dato, numero)` con `tipo: "cancion" | "pelicula" | "radio"` (para radio, `numero` es la frecuencia).

**Clientes:**
- `ListaReproduccion` con `agregar`, `reproducirTodo(): string[]` y `duracionTotal`.
- `descargarTodo(items)`: tiene que ser **imposible** (error de compilación) pasarle la radio.

**Pregunta:** en el bloque de prueba, la película se crea con `new Pelicula(...)` y no con la fábrica. ¿Por qué? (Respondé en un comentario.)

Salida esperada:
```
♪ Sonando "Zamba de mi esperanza"
▶ Proyectando "Relatos salvajes"
📻 En vivo: Radio Universidad
Duración total: 126 min
Subtítulos de "Relatos salvajes" en español
[ 'Libertango.mp3 descargado', 'Relatos salvajes.mp4 descargado' ]
```
