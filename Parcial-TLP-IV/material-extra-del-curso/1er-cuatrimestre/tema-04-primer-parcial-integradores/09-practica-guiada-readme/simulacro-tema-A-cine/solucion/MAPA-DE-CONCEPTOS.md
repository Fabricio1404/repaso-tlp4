# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **CLASE ABSTRACTA** → `ej1.ts` L4–16
- **READONLY** → `ej1.ts` L6–7
- **MÉTODO ABSTRACTO** → `ej1.ts` L15
- **STATIC READONLY** → `ej1.ts` L26
- **ENCAPSULAMIENTO** → `ej1.ts` L40
- **STATIC** → `ej1.ts` L42
- **POLIMORFISMO** → `ej1.ts` L59, `ej1.ts` L70
- **GETTER** → `ej1.ts` L63–65
- **OBSERVER - INTERFAZ** → `ej2.ts` L4–6
- **OBSERVER - CONCRETO** → `ej2.ts` L9–17
- **ADAPTER - ADAPTEE** → `ej2.ts` L20–25
- **ADAPTER** → `ej2.ts` L28–40
- **OBSERVER - SUJETO** → `ej2.ts` L43–64
- **OBSERVER - NOTIFICAR** → `ej2.ts` L59–63
- **OCP ✓** → `ej3.ts` L5–8
- **SRP ✓** → `ej3.ts` L33–35
- **SRP + OCP ✓** → `ej3.ts` L51–55

## Detalle archivo por archivo


### `ej1.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–16 | **CLASE ABSTRACTA** | `abstract class Funcion {` |  |
| 6–7 | **READONLY** | `readonly sala: number;` |  |
| 15 | **MÉTODO ABSTRACTO** | `abstract precioEntrada(): number;` |  |
| 26 | **STATIC READONLY** | `static readonly ANTEOJOS = 500;` | Costo de los anteojos, constante de la clase |
| 40 | **ENCAPSULAMIENTO** | `private funciones: Funcion[];` | Arreglo privado: solo se agrega con programar |
| 42 | **STATIC** | `static totalEntradas: number = 0;` | Total de entradas vendidas por todos los complejos |
| 59 | **POLIMORFISMO** | `return f.precioEntrada() * cantidad;` |  |
| 63–65 | **GETTER** | `get cantidadFunciones(): number {` |  |
| 70 | **POLIMORFISMO** | `console.log(`Sala ${f.sala} · ${f.pelicula}: $${f.precioEntrada()}`);` | sin if por tipo |

### `ej2.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **OBSERVER - INTERFAZ** | `interface Suscriptor {` |  |
| 9–17 | **OBSERVER - CONCRETO** | `class SuscriptorEmail implements Suscriptor {` |  |
| 20–25 | **ADAPTER - ADAPTEE** | `class SistemaPushViejo {` | Sistema viejo de notificaciones push (dado, no se modifica) |
| 28–40 | **ADAPTER** | `class PushAdapter implements Suscriptor {` | Implementa Suscriptor y traduce a mandarPush |
| 43–64 | **OBSERVER - SUJETO** | `class Cartelera {` |  |
| 59–63 | **OBSERVER - NOTIFICAR** | `anunciarEstreno(pelicula: string, fecha: string): void {` |  |

### `ej3.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–8 | **OCP ✓** | `interface Descuento {` |  |
| 33–35 | **SRP ✓** | `interface Impresora {` |  |
| 51–55 | **SRP + OCP ✓** | `emitir(pelicula: string, precio: number, descuento: Descuento): num...` | Calcula delegando en el descuento y delega la impresión |
