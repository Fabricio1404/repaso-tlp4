# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **READONLY** → `ej1.ts` L5
- **ATRIBUTO RESPALDO** → `ej1.ts` L7
- **SETTER EN CONSTRUCTOR** → `ej1.ts` L13
- **SETTER CON VALIDACIÓN** → `ej1.ts` L21–26
- **MÉTODO ABSTRACTO** → `ej1.ts` L29
- **POLIMORFISMO + MÉTODO REDEFINIBLE** → `ej1.ts` L32–34
- **OVERRIDE + SUPER** → `ej1.ts` L51–53
- **STATIC** → `ej1.ts` L59
- **GETTER CALCULADO + POLIMORFISMO** → `ej1.ts` L71–73
- **SINGLETON** → `ej2.ts` L5
- **FACTORY - TIPO COMÚN** → `ej2.ts` L19–22
- **SINGLETON EN USO** → `ej2.ts` L51
- **FACTORY ESTÁTICA** → `ej2.ts` L57–62
- **ISP ✓** → `ej3.ts` L5–8
- **LSP ✓** → `ej3.ts` L32–40
- **ISP ✓ CLIENTES MÍNIMOS** → `ej3.ts` L50–52

## Detalle archivo por archivo


### `ej1.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5 | **READONLY** | `readonly destino: string;` |  |
| 7 | **ATRIBUTO RESPALDO** | `private _noches: number;` |  |
| 13 | **SETTER EN CONSTRUCTOR** | `this.noches = noches;` |  |
| 21–26 | **SETTER CON VALIDACIÓN** | `set noches(valor: number) {` |  |
| 29 | **MÉTODO ABSTRACTO** | `abstract precioPorNoche(): number;` |  |
| 32–34 | **POLIMORFISMO + MÉTODO REDEFINIBLE** | `precioTotal(): number {` | Las hijas pueden sumar extras con override |
| 51–53 | **OVERRIDE + SUPER** | `override precioTotal(): number {` | Reutiliza el cálculo del padre y suma la tasa |
| 59 | **STATIC** | `static paquetesVendidos: number = 0;` |  |
| 71–73 | **GETTER CALCULADO + POLIMORFISMO** | `get totalVendido(): number {` |  |

### `ej2.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5 | **SINGLETON** | `private static instancia: CotizacionDolar \| undefined;` |  |
| 19–22 | **FACTORY - TIPO COMÚN** | `interface Servicio {` |  |
| 51 | **SINGLETON EN USO** | `return this.dolares * CotizacionDolar.obtenerInstancia().valor;` | La cotización no está escrita acá |
| 57–62 | **FACTORY ESTÁTICA** | `static crear(tipo: "excursion" \| "vuelo", nombre: string, monto: n...` | Único lugar con los new de los servicios |

### `ej3.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–8 | **ISP ✓** | `interface Reservable {` |  |
| 32–40 | **LSP ✓** | `class Colectivo implements Reservable, ConEquipaje {` | LSP: el colectivo ya no hereda métodos que no puede cumplir (no hay throw) |
| 50–52 | **ISP ✓ CLIENTES MÍNIMOS** | `function reservarTodos(transportes: Reservable[], pasajero: string)...` | Cada función pide solo la capacidad que usa |
