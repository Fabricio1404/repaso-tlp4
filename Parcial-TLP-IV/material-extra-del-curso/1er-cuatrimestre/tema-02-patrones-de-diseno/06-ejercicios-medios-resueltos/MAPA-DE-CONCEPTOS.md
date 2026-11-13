# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SINGLETON** → `m1-singleton-factory-usuarios.ts` L4–23
- **FACTORY - TIPO COMÚN** → `m1-singleton-factory-usuarios.ts` L28–48
- **SINGLETON EN USO** → `m1-singleton-factory-usuarios.ts` L34
- **FACTORY** → `m1-singleton-factory-usuarios.ts` L78–92
- **EVENTO COMO OBJETO** → `m2-observer-subasta.ts` L4–9
- **OBSERVER - INTERFAZ** → `m2-observer-subasta.ts` L12–14
- **OBSERVER - SUJETO** → `m2-observer-subasta.ts` L17–67
- **CAMBIAR ESTADO Y DESPUÉS NOTIFICAR** → `m2-observer-subasta.ts` L49
- **NOTIFICAR** → `m2-observer-subasta.ts` L62–66
- **OBSERVADOR CONCRETO 1** → `m2-observer-subasta.ts` L70–82
- **OBSERVADOR CONCRETO 2** → `m2-observer-subasta.ts` L85–89
- **OBSERVADOR CONCRETO 3** → `m2-observer-subasta.ts` L92–110
- **ADAPTER - TARGET** → `m3-adapter-pagos.ts` L4–7
- **ADAPTEE 1** → `m3-adapter-pagos.ts` L16–22
- **ADAPTEE 2** → `m3-adapter-pagos.ts` L25–29
- **ADAPTER 1** → `m3-adapter-pagos.ts` L33–45
- **ADAPTER 2** → `m3-adapter-pagos.ts` L48–67
- **TRADUCCIÓN DE RESPUESTA** → `m3-adapter-pagos.ts` L62–64
- **CLIENTE** → `m3-adapter-pagos.ts` L70–78

## Detalle archivo por archivo


### `m1-singleton-factory-usuarios.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–23 | **SINGLETON** | `class GeneradorDeIds {` | Generador de ids único para toda la aplicación (si hubiera dos, se repetirían ids) |
| 28–48 | **FACTORY - TIPO COMÚN** | `abstract class Usuario {` | Clase abstracta: todos los usuarios tienen id, nombre y permisos |
| 34 | **SINGLETON EN USO** | `this.id = GeneradorDeIds.obtenerInstancia().siguiente(this.prefijo());` | El id lo pide al Singleton; ningún usuario elige su propio id |
| 78–92 | **FACTORY** | `class FabricaUsuarios {` | Único lugar con new de las clases concretas. Valida el nombre antes de crear |

### `m2-observer-subasta.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–9 | **EVENTO COMO OBJETO** | `interface EventoOferta {` | Notificación "push" con un objeto: agregar un dato no cambia la firma de actualizar |
| 12–14 | **OBSERVER - INTERFAZ** | `interface ObservadorSubasta {` |  |
| 17–67 | **OBSERVER - SUJETO** | `class Subasta {` |  |
| 49 | **CAMBIAR ESTADO Y DESPUÉS NOTIFICAR** | `this.mejorOferta = monto;` | Los observadores ven el estado ya actualizado |
| 62–66 | **NOTIFICAR** | `private notificar(evento: EventoOferta): void {` | Sin saber qué tipo de observador es cada uno |
| 70–82 | **OBSERVADOR CONCRETO 1** | `class Postor implements ObservadorSubasta {` | Reacciona solo si la oferta es de OTRO postor |
| 85–89 | **OBSERVADOR CONCRETO 2** | `class PantallaSala implements ObservadorSubasta {` | Muestra todo |
| 92–110 | **OBSERVADOR CONCRETO 3** | `class Auditoria implements ObservadorSubasta {` | Guarda en vez de imprimir |

### `m3-adapter-pagos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–7 | **ADAPTER - TARGET** | `interface ResultadoPago {` | Lo que espera nuestro checkout |
| 16–22 | **ADAPTEE 1** | `class MercadoPagoSDK {` | Recibe un objeto con nombres en inglés y devuelve un status |
| 25–29 | **ADAPTEE 2** | `class PayPalLegacy {` | Trabaja en centavos de dólar y devuelve un texto "OK:<código>" o "FAIL" |
| 33–45 | **ADAPTER 1** | `class MercadoPagoAdapter implements ProcesadorPago {` | Traduce nombres, formato de entrada y formato de respuesta |
| 48–67 | **ADAPTER 2** | `class PayPalAdapter implements ProcesadorPago {` | Además de traducir, convierte la moneda (pesos → centavos de dólar) |
| 62–64 | **TRADUCCIÓN DE RESPUESTA** | `if (respuesta.startsWith("OK:")) {` | "OK:xxx" → { aprobado: true, comprobante: "xxx" } |
| 70–78 | **CLIENTE** | `function checkout(procesador: ProcesadorPago, monto: number, descri...` | El checkout solo conoce ProcesadorPago: no sabe nada de status, centavos ni "OK:" |
