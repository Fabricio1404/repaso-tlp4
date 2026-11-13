# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SINGLETON ① ATRIBUTO STATIC** → `f1-singleton-logger.ts` L5–6
- **SINGLETON ② CONSTRUCTOR PRIVATE** → `f1-singleton-logger.ts` L9–11
- **SINGLETON ③ ACCESO STATIC** → `f1-singleton-logger.ts` L14–19
- **ACCESO GLOBAL** → `f1-singleton-logger.ts` L37
- **FACTORY - TIPO COMÚN** → `f2-factory-bebidas.ts` L4–8
- **FACTORY - PRODUCTOS CONCRETOS** → `f2-factory-bebidas.ts` L11–19
- **FACTORY - MÉTODO CREADOR STATIC** → `f2-factory-bebidas.ts` L45–54
- **CLIENTE** → `f2-factory-bebidas.ts` L62, `f4-adapter-temperatura.ts` L45–48
- **OBSERVER - INTERFAZ OBSERVADOR** → `f3-observer-canal.ts` L4–6
- **OBSERVER - OBSERVADOR CONCRETO** → `f3-observer-canal.ts` L9–19
- **OBSERVER - SUJETO** → `f3-observer-canal.ts` L22–54
- **LISTA DE LA INTERFAZ** → `f3-observer-canal.ts` L25
- **SUSCRIBIR** → `f3-observer-canal.ts` L33–37
- **DESUSCRIBIR** → `f3-observer-canal.ts` L40–42
- **EL CAMBIO DISPARA LA NOTIFICACIÓN** → `f3-observer-canal.ts` L49–53
- **ADAPTER - TARGET** → `f4-adapter-temperatura.ts` L4–6
- **ADAPTER - ADAPTEE** → `f4-adapter-temperatura.ts` L20–28
- **ADAPTER - ADAPTADOR** → `f4-adapter-temperatura.ts` L31–42
- **TRADUCCIÓN** → `f4-adapter-temperatura.ts` L39–41

## Detalle archivo por archivo


### `f1-singleton-logger.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–6 | **SINGLETON ① ATRIBUTO STATIC** | `private static instancia: Logger \| undefined;` | La única instancia |
| 9–11 | **SINGLETON ② CONSTRUCTOR PRIVATE** | `private constructor() {` |  |
| 14–19 | **SINGLETON ③ ACCESO STATIC** | `static obtenerInstancia(): Logger {` | Crea solo la primera vez |
| 37 | **ACCESO GLOBAL** | `Logger.obtenerInstancia().registrar(`Inicio de sesión: ${usuario}`);` | Cualquier parte del programa obtiene el mismo logger sin recibirlo por parámetro |

### `f2-factory-bebidas.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–8 | **FACTORY - TIPO COMÚN** | `interface Bebida {` | Interfaz que devuelve la fábrica |
| 11–19 | **FACTORY - PRODUCTOS CONCRETOS** | `class Cafe implements Bebida {` |  |
| 45–54 | **FACTORY - MÉTODO CREADOR STATIC** | `static crear(tipo: TipoBebida): Bebida {` | Devuelve Bebida (el tipo común); los new viven solo acá |
| 62 | **CLIENTE** | `const bebida = FabricaBebidas.crear(tipo);` | No hay ningún new de Cafe, Te o Mate fuera de la fábrica |

### `f3-observer-canal.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **OBSERVER - INTERFAZ OBSERVADOR** | `interface Suscriptor {` |  |
| 9–19 | **OBSERVER - OBSERVADOR CONCRETO** | `class Usuario implements Suscriptor {` |  |
| 22–54 | **OBSERVER - SUJETO** | `class Canal {` |  |
| 25 | **LISTA DE LA INTERFAZ** | `private suscriptores: Suscriptor[];` | El canal no sabe que son Usuarios |
| 33–37 | **SUSCRIBIR** | `suscribir(s: Suscriptor): void {` | Evita duplicados |
| 40–42 | **DESUSCRIBIR** | `desuscribir(s: Suscriptor): void {` |  |
| 49–53 | **EL CAMBIO DISPARA LA NOTIFICACIÓN** | `subirVideo(titulo: string): void {` |  |

### `f4-adapter-temperatura.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **ADAPTER - TARGET** | `interface SensorTemperatura {` | Lo que espera el sistema nuevo: grados Celsius |
| 20–28 | **ADAPTER - ADAPTEE** | `class TermometroFahrenheit {` | Sensor viejo importado: mide en Fahrenheit y tiene otro nombre de método. No se modifica |
| 31–42 | **ADAPTER - ADAPTADOR** | `class AdaptadorFahrenheit implements SensorTemperatura {` | Implementa el target y contiene al viejo |
| 39–41 | **TRADUCCIÓN** | `leerCelsius(): number {` | Cambia el nombre del método Y convierte la unidad |
| 45–48 | **CLIENTE** | `function promedio(sensores: SensorTemperatura[]): number {` | Solo conoce SensorTemperatura |
