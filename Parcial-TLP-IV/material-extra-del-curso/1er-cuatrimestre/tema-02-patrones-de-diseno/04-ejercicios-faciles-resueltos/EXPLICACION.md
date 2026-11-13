# Tema 2 · Ejercicios fáciles: resolución explicada

## F1 · Singleton `Logger`
- Las tres piezas: `private static instancia: Logger | undefined`, `private constructor()`, `static obtenerInstancia()`.
- **Por qué Singleton acá:** si cada función hiciera `new Logger()`, cada una tendría su propio arreglo y los registros quedarían repartidos. Con el Singleton, `iniciarSesion` y `cerrarSesion` escriben en **el mismo** registro sin recibirlo por parámetro (acceso global).
- El número `[n]` sale de `this.registros.length + 1`: no hace falta otro contador.
- **Desventaja visible:** si escribieras tests, el logger "arrastraría" los registros de un test al siguiente (estado global). Es la desventaja "dificulta las pruebas unitarias".

## F2 · Factory de bebidas
- **Tipo común:** la interfaz `Bebida`. La fábrica devuelve `Bebida`, no `Cafe`.
- `readonly nombre = "Café";` declara e inicializa en la misma línea. No hace falta constructor porque no recibe nada.
- `static crear(...)`: la consigna dice "sin instanciar la fábrica".
- El `switch` sobre una unión de literales **cubre todos los casos**: TypeScript sabe que no falta un `return` (análisis de exhaustividad). Si agregás `"chocolate"` al tipo y no al `switch`, `tsc` avisa que la función puede no devolver nada.
- El bloque de prueba recorre `TipoBebida[]` y nunca hace `new` de una bebida.

## F3 · Observer
- **Sujeto:** `Canal`. **Observador (interfaz):** `Suscriptor`. **Observador concreto:** `Usuario`.
- El canal guarda `Suscriptor[]`. Si guardara `Usuario[]`, dependería de una clase concreta y no podría notificar, por ejemplo, a un `BotDeDiscord implements Suscriptor`.
- `includes(s)` evita duplicados (compara referencias). `filter(x => x !== s)` desuscribe.
- Después de `desuscribir(beto)`, el segundo video solo le llega a Ana.

## F4 · Adapter
- **Target:** `SensorTemperatura`. **Adaptee:** `TermometroFahrenheit` (no se toca). **Adapter:** `AdaptadorFahrenheit implements SensorTemperatura` y **contiene** un `TermometroFahrenheit`.
- El adaptador traduce **dos cosas**: el nombre del método (`leerCelsius` → `leerF`) y la unidad (°F → °C).
- `promedio` recibe `SensorTemperatura[]` y mezcla sensores nuevos y viejos adaptados sin distinguirlos. (86 °F = 30 °C, 50 °F = 10 °C → promedio 20).
- Error típico: modificar `TermometroFahrenheit` para agregarle `leerCelsius()`. Funciona, pero **no** es un Adapter y viola la consigna ("no podés modificarlo").
