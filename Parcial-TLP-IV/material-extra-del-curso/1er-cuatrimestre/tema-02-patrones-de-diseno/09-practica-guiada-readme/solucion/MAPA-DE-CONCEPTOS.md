# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SINGLETON ①** → `cocina.ts` L5–6
- **SINGLETON ②** → `cocina.ts` L9–11
- **SINGLETON ③** → `cocina.ts` L14–19
- **ADAPTER - TARGET** → `delivery.ts` L4–6
- **ADAPTER - ADAPTEE** → `delivery.ts` L9–19
- **ADAPTER - ADAPTADOR** → `delivery.ts` L22–36
- **FACTORY** → `fabrica-platos.ts` L7–16
- **FACTORY - TIPO COMÚN** → `modelos.ts` L6–16
- **OBSERVER - INTERFAZ** → `observadores.ts` L10–12
- **OBSERVER - CONCRETO** → `observadores.ts` L15–23
- **OBSERVER - CONCRETO NUEVO** → `observadores.ts` L34–42
- **OBSERVER - SUJETO** → `pedido.ts` L15
- **FACTORY EN USO** → `pedido.ts` L30–34
- **SINGLETON EN USO** → `pedido.ts` L61
- **ADAPTER EN USO** → `pedido.ts` L71–75
- **OBSERVER - NOTIFICAR** → `pedido.ts` L78–83

## Detalle archivo por archivo


### `cocina.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–6 | **SINGLETON ①** | `private static instancia: Cocina \| undefined;` | La única cocina |
| 9–11 | **SINGLETON ②** | `private constructor() {` | Antes era público: Pedido y main hacían new Cocina() y cada uno tenía SU cola |
| 14–19 | **SINGLETON ③** | `static obtenerInstancia(): Cocina {` |  |

### `delivery.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **ADAPTER - TARGET** | `export interface ServicioDelivery {` | Lo que espera nuestro sistema |
| 9–19 | **ADAPTER - ADAPTEE** | `export class RappiLegacyAPI {` | API externa vieja (DADA, no se modifica): recibe "id;direccion;centavos" y devuelve un número de seguimiento o -1 |
| 22–36 | **ADAPTER - ADAPTADOR** | `export class RappiAdapter implements ServicioDelivery {` | Implementa el target, contiene la API vieja y traduce ida y vuelta |

### `fabrica-platos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–16 | **FACTORY** | `static crear(tipo: TipoPlato): Plato {` | Único lugar del sistema con new de un plato concreto; devuelve el tipo común Plato |

### `modelos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–16 | **FACTORY - TIPO COMÚN** | `export abstract class Plato {` | Lo que devuelve la fábrica |

### `observadores.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–12 | **OBSERVER - INTERFAZ** | `export interface ObservadorPedido {` | Pedido depende de esto, no de Mozo ni de PantallaCocina |
| 15–23 | **OBSERVER - CONCRETO** | `export class Mozo implements ObservadorPedido {` |  |
| 34–42 | **OBSERVER - CONCRETO NUEVO** | `export class ClienteApp implements ObservadorPedido {` | Se agregó sin tocar Pedido (TAREA 4, último punto) |

### `pedido.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 15 | **OBSERVER - SUJETO** | `private observadores: ObservadorPedido[];` | Antes tenía "private mozo = new Mozo(...)" y "private pantalla = new PantallaCocina()" |
| 30–34 | **FACTORY EN USO** | `agregar(tipo: TipoPlato, cantidad: number = 1): void {` | Recibe el TIPO y le pide el plato a la fábrica (antes recibía un Plato creado con new en main) |
| 61 | **SINGLETON EN USO** | `Cocina.obtenerInstancia().encolar(`#${this.numero} ${this.destino}`);` | Antes: new Cocina() → una cola nueva por pedido |
| 71–75 | **ADAPTER EN USO** | `enviarPorDelivery(servicio: ServicioDelivery, direccion: string): s...` | Pedido depende de ServicioDelivery (interfaz); no sabe nada de payloads ni centavos |
| 78–83 | **OBSERVER - NOTIFICAR** | `private notificar(): void {` | Recorre sin saber quiénes son |
