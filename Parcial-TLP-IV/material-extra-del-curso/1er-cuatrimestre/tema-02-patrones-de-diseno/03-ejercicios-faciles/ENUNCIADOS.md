# Tema 2 · Ejercicios fáciles (un patrón por ejercicio, sin pistas)

Escribí todo desde cero (salvo el código marcado como "dado"). Descomentá el bloque de prueba al terminar.

---

## F1 · Singleton `Logger` (`f1-singleton-logger.ts`)

Un registro de eventos **único** para toda la aplicación.
- Imposible crear un `Logger` con `new` desde afuera. Se obtiene con `Logger.obtenerInstancia()`.
- `registrar(mensaje)` guarda `"[n] mensaje"` (n = número de registro, empezando en 1).
- `cantidad` (sin paréntesis) y `obtenerRegistros(): string[]` sin exponer el arreglo interno.
- Las funciones `iniciarSesion` y `cerrarSesion` del bloque de prueba **no reciben** el logger por parámetro: lo obtienen ellas.

Salida esperada:
```
[ '[1] Inicio de sesión: ana', '[2] Cierre de sesión: ana' ]
Cantidad: 2
Misma instancia: true
```

---

## F2 · Factory de bebidas (`f2-factory-bebidas.ts`)

- Toda bebida tiene `nombre` (no reasignable), `precio(): number` y `preparar(): string`.
- `Cafe` ($1800, "Moliendo granos y pasando agua caliente"), `Te` ($1200, "Infusionando el saquito 3 minutos"), `Mate` ($900, "Cargando yerba y cebando a 80°").
- `FabricaBebidas.crear(tipo)` (sin instanciar la fábrica) recibe `"cafe" | "te" | "mate"` y devuelve el **tipo común**. Nadie fuera de la fábrica hace `new` de una bebida.

Salida esperada:
```
Café: Moliendo granos y pasando agua caliente ($1800)
Mate: Cargando yerba y cebando a 80° ($900)
Té: Infusionando el saquito 3 minutos ($1200)
Café: Moliendo granos y pasando agua caliente ($1800)
Total: $5700
```

---

## F3 · Observer: canal de videos (`f3-observer-canal.ts`)

- Un `Canal` (con `nombre`) permite `suscribir`, `desuscribir` y `subirVideo(titulo)`. Al subir un video, avisa a todos los suscriptores.
- El canal **no** conoce la clase `Usuario`: solo un contrato `Suscriptor` con `notificar(canal, titulo)`.
- Suscribir dos veces al mismo no lo duplica. `cantidadSuscriptores` sin paréntesis.
- `Usuario` imprime `Ana recibió: "<titulo>" de <canal>`.

Salida esperada:
```
Suscriptores: 2
Ana recibió: "Singleton explicado" de TLP en 10 minutos
Beto recibió: "Singleton explicado" de TLP en 10 minutos
Ana recibió: "Observer explicado" de TLP en 10 minutos
```

---

## F4 · Adapter de temperatura (`f4-adapter-temperatura.ts`)

El sistema trabaja con `SensorTemperatura` (`leerCelsius()`). Te dan un `TermometroFahrenheit` viejo (`leerF()`) que **no podés modificar**.
- Creá `AdaptadorFahrenheit` para usar el termómetro viejo como un `SensorTemperatura`. Fórmula: `C = (F − 32) × 5 / 9`, redondeado con `Math.round`.
- `promedio(sensores)` en °C, que funcione con cualquier `SensorTemperatura`.

Salida esperada:
```
20°C
30°C
10°C
Promedio: 20°C
```
