# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **CLASE ABSTRACTA** → `m1-estacion-meteorologica.ts` L5–27
- **COPIA DEFENSIVA** → `m1-estacion-meteorologica.ts` L12
- **ENCAPSULAMIENTO** → `m1-estacion-meteorologica.ts` L19–26
- **OBSERVER - INTERFAZ** → `m1-estacion-meteorologica.ts` L56–58
- **OBSERVER - SUJETO** → `m1-estacion-meteorologica.ts` L61–83
- **POLIMORFISMO** → `m1-estacion-meteorologica.ts` L75–82
- **DIP ✓** → `m1-estacion-meteorologica.ts` L87–89
- **DIP ✓ INYECCIÓN** → `m1-estacion-meteorologica.ts` L135
- **ISP ✓** → `m2-reproductor-multimedia.ts` L5–9, `m2-reproductor-multimedia.ts` L135–137
- **ADAPTER - ADAPTEE** → `m2-reproductor-multimedia.ts` L64–72
- **ADAPTER** → `m2-reproductor-multimedia.ts` L75–93
- **ADAPTACIÓN DE SEMÁNTICA** → `m2-reproductor-multimedia.ts` L90–92
- **FACTORY** → `m2-reproductor-multimedia.ts` L99–110
- **ISP ✓ CLIENTE MÍNIMO** → `m2-reproductor-multimedia.ts` L114–132

## Detalle archivo por archivo


### `m1-estacion-meteorologica.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–27 | **CLASE ABSTRACTA** | `abstract class Sensor {` | Todo sensor tiene id y unidad; cada uno mide a su manera |
| 12 | **COPIA DEFENSIVA** | `this.lecturas = [...lecturas];` | Se copia lo que entra para que nadie de afuera altere la secuencia |
| 19–26 | **ENCAPSULAMIENTO** | `medir(): number {` | La lectura avanza una posición por llamada; vuelve a empezar al final |
| 56–58 | **OBSERVER - INTERFAZ** | `interface ObservadorClima {` |  |
| 61–83 | **OBSERVER - SUJETO** | `class Estacion {` | La estación no sabe quién escucha |
| 75–82 | **POLIMORFISMO** | `tomarMediciones(hora: number): void {` | Recorre sensores sin preguntar su tipo |
| 87–89 | **DIP ✓** | `interface Notificador {` | DIP: la alerta depende de esta abstracción, no de un canal concreto |
| 135 | **DIP ✓ INYECCIÓN** | `private notificador: Notificador;` | El observador recibe su canal por constructor |

### `m2-reproductor-multimedia.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–9 | **ISP ✓** | `interface Reproducible {` | ISP: capacidades separadas; cada contenido implementa solo las que tiene |
| 64–72 | **ADAPTER - ADAPTEE** | `class RadioStreamLegacy {` | Radio vieja por streaming: otra interfaz, no se puede modificar |
| 75–93 | **ADAPTER** | `class RadioAdapter implements Reproducible {` | La radio se usa como un Reproducible más (solo eso: no es descargable ni tiene subtítulos) |
| 90–92 | **ADAPTACIÓN DE SEMÁNTICA** | `duracionMinutos(): number {` | Una radio en vivo no tiene duración: se informa 0 |
| 99–110 | **FACTORY** | `class FabricaContenido {` | Único lugar con los new; para "radio" devuelve un adapter |
| 114–132 | **ISP ✓ CLIENTE MÍNIMO** | `class ListaReproduccion {` | La lista de reproducción solo necesita Reproducible |
| 135–137 | **ISP ✓** | `function descargarTodo(items: Descargable[]): string[] {` | Solo acepta lo descargable: pasar la radio no compila |
