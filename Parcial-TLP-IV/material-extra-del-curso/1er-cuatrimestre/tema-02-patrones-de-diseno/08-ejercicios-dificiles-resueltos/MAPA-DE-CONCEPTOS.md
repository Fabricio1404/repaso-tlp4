# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **FACTORY - TIPO COMÚN** → `d1-almacen-cuatro-patrones.ts` L18–59, `d2-domotica-cuatro-patrones.ts` L10–19
- **POLIMORFISMO** → `d1-almacen-cuatro-patrones.ts` L76–78, `d2-domotica-cuatro-patrones.ts` L133–139
- **FACTORY** → `d1-almacen-cuatro-patrones.ts` L85–93, `d2-domotica-cuatro-patrones.ts` L94–103
- **OBSERVER - INTERFAZ OBSERVADOR** → `d1-almacen-cuatro-patrones.ts` L106–108
- **SINGLETON** → `d1-almacen-cuatro-patrones.ts` L114–115, `d2-domotica-cuatro-patrones.ts` L108–110
- **OBSERVER - SUJETO** → `d1-almacen-cuatro-patrones.ts` L117, `d2-domotica-cuatro-patrones.ts` L156–178
- **OBSERVER - NOTIFICAR SOLO SI CORRESPONDE** → `d1-almacen-cuatro-patrones.ts` L147–149
- **ADAPTER - TARGET** → `d1-almacen-cuatro-patrones.ts` L179–181
- **ADAPTER - ADAPTEE** → `d1-almacen-cuatro-patrones.ts` L184–193, `d2-domotica-cuatro-patrones.ts` L59–67
- **ADAPTER - ADAPTADOR** → `d1-almacen-cuatro-patrones.ts` L196–212, `d2-domotica-cuatro-patrones.ts` L70–90
- **OBSERVER + ADAPTER + SINGLETON** → `d1-almacen-cuatro-patrones.ts` L223–237
- **DEPENDE DE LA INTERFAZ** → `d1-almacen-cuatro-patrones.ts` L225
- **VALOR POR DEFECTO CON ??** → `d2-domotica-cuatro-patrones.ts` L45
- **LA CENTRAL USA LA FÁBRICA** → `d2-domotica-cuatro-patrones.ts` L125–130
- **OBSERVER - INTERFAZ** → `d2-domotica-cuatro-patrones.ts` L151–153
- **OBSERVADOR CONCRETO** → `d2-domotica-cuatro-patrones.ts` L181–187

## Detalle archivo por archivo


### `d1-almacen-cuatro-patrones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 18–59 | **FACTORY - TIPO COMÚN** | `abstract class Producto {` | Clase abstracta con el stock encapsulado |
| 76–78 | **POLIMORFISMO** | `precioFinal(): number {` | Regla propia: 30 % de descuento si vence en 3 días o menos |
| 85–93 | **FACTORY** | `static crear(tipo: TipoProducto, datos: DatosProducto): Producto {` | Único lugar con new de productos; valida lo específico de cada tipo |
| 106–108 | **OBSERVER - INTERFAZ OBSERVADOR** | `interface ObservadorStock {` |  |
| 114–115 | **SINGLETON** | `private static instancia: Almacen \| undefined;` | Un único almacén para todo el sistema |
| 117 | **OBSERVER - SUJETO** | `private observadores: ObservadorStock[];` | El almacén avisa cuando un producto queda bajo el mínimo |
| 147–149 | **OBSERVER - NOTIFICAR SOLO SI CORRESPONDE** | `if (p.bajoMinimo) {` | Cambió el estado y quedó bajo el mínimo |
| 179–181 | **ADAPTER - TARGET** | `interface Proveedor {` | Lo que necesita nuestro sistema |
| 184–193 | **ADAPTER - ADAPTEE** | `class ApiMayoristaXML {` | API vieja del mayorista: recibe y devuelve XML en texto. No se modifica |
| 196–212 | **ADAPTER - ADAPTADOR** | `class ProveedorMayoristaAdapter implements Proveedor {` | Arma el XML y parsea la respuesta |
| 223–237 | **OBSERVER + ADAPTER + SINGLETON** | `class ReponedorAutomatico implements ObservadorStock {` | Reacciona pidiendo al proveedor (vía Adapter) y repone en el almacén (Singleton) |
| 225 | **DEPENDE DE LA INTERFAZ** | `private proveedor: Proveedor;` | Recibe un Proveedor: no sabe que atrás hay XML |

### `d2-domotica-cuatro-patrones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–19 | **FACTORY - TIPO COMÚN** | `abstract class Dispositivo {` | Todos los dispositivos se controlan igual: ejecutar(comando, valor) |
| 45 | **VALOR POR DEFECTO CON ??** | `const porcentaje = valor ?? 100;` | Si no mandan valor, abre del todo |
| 59–67 | **ADAPTER - ADAPTEE** | `class TermostatoX10 {` | Termostato viejo con protocolo X10: Fahrenheit y otros nombres. No se modifica |
| 70–90 | **ADAPTER - ADAPTADOR** | `class TermostatoAdapter extends Dispositivo {` | Se presenta como un Dispositivo más (el target) y traduce °C ↔ °F |
| 94–103 | **FACTORY** | `static crear(tipo: TipoDispositivo, id: string): Dispositivo {` | El cliente pide "termostato" y recibe un Dispositivo: no sabe que es un adapter sobre un X10 |
| 108–110 | **SINGLETON** | `private static instancia: CentralDomotica \| undefined;` | Una sola central por casa |
| 125–130 | **LA CENTRAL USA LA FÁBRICA** | `instalar(tipo: TipoDispositivo, id: string): void {` | La central no hace new de dispositivos |
| 133–139 | **POLIMORFISMO** | `ordenar(id: string, comando: string, valor?: number): void {` | Un solo método de control para cualquier dispositivo (incluido el adaptado) |
| 151–153 | **OBSERVER - INTERFAZ** | `interface ObservadorSensor {` |  |
| 156–178 | **OBSERVER - SUJETO** | `class SensorMovimiento {` |  |
| 181–187 | **OBSERVADOR CONCRETO** | `class ModoNoche implements ObservadorSensor {` | De noche enciende la luz de la zona usando la central (Singleton) |
