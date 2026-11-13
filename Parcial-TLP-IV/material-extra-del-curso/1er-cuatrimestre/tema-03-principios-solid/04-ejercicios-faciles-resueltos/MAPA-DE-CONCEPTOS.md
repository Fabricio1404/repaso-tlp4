# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SRP ✓ CÁLCULO** → `f1-srp-reporte.ts` L10–14
- **SRP ✓ FORMATO** → `f1-srp-reporte.ts` L17–26
- **SRP ✓ SALIDA** → `f1-srp-reporte.ts` L29–35
- **COMPOSICIÓN** → `f1-srp-reporte.ts` L38–54
- **OCP ✓ ABSTRACCIÓN** → `f2-ocp-descuentos.ts` L4–6
- **OCP ✓ UNA CLASE POR OPCIÓN** → `f2-ocp-descuentos.ts` L9–13
- **OCP ✓ EXTENSIÓN** → `f2-ocp-descuentos.ts` L28–32
- **OCP ✓ CERRADA A MODIFICACIÓN** → `f2-ocp-descuentos.ts` L35–39
- **LSP ✓ BASE CON LO QUE TODAS CUMPLEN** → `f3-lsp-aves.ts` L4–12
- **LSP ✓ CONTRATO SEPARADO** → `f3-lsp-aves.ts` L15–17
- **LSP ✓ LA SUBCLASE CUMPLE TODO LO QUE PROMETE** → `f3-lsp-aves.ts` L20–24
- **LSP ✓ EL PINGÜINO YA NO PROMETE VOLAR** → `f3-lsp-aves.ts` L27–31
- **LSP ✓ TIPO PRECISO** → `f3-lsp-aves.ts` L34–38
- **ISP ✓ INTERFACES CHICAS** → `f4-isp-trabajadores.ts` L4–6
- **ISP ✓ VARIAS INTERFACES** → `f4-isp-trabajadores.ts` L17–31
- **ISP ✓ SIN MÉTODOS QUE LANCEN ERROR** → `f4-isp-trabajadores.ts` L34–42
- **DIP ✓ ABSTRACCIÓN** → `f5-dip-facturas.ts` L4–6
- **DIP ✓ DETALLES** → `f5-dip-facturas.ts` L9–13
- **DIP ✓ INYECCIÓN POR CONSTRUCTOR** → `f5-dip-facturas.ts` L25–27
- **COMPOSITION ROOT** → `f5-dip-facturas.ts` L37

## Detalle archivo por archivo


### `f1-srp-reporte.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–14 | **SRP ✓ CÁLCULO** | `class CalculadoraVentas {` | Cambia solo si cambia la regla de cálculo (por ejemplo, impuestos) |
| 17–26 | **SRP ✓ FORMATO** | `class FormateadorReporte {` | Cambia solo si cambia cómo se ve el reporte |
| 29–35 | **SRP ✓ SALIDA** | `class ImpresoraConsola {` | Cambia solo si cambia el destino (consola, archivo, mail...) |
| 38–54 | **COMPOSICIÓN** | `class ServicioReportes {` | Coordina las tres piezas, recibidas por constructor |

### `f2-ocp-descuentos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **OCP ✓ ABSTRACCIÓN** | `interface Descuento {` | OCP: se agregan tipos de cliente nuevos sin modificar CalculadoraDescuentos |
| 9–13 | **OCP ✓ UNA CLASE POR OPCIÓN** | `class DescuentoComun implements Descuento {` |  |
| 28–32 | **OCP ✓ EXTENSIÓN** | `class DescuentoJubilado implements Descuento {` | Agregado después, sin tocar la calculadora |
| 35–39 | **OCP ✓ CERRADA A MODIFICACIÓN** | `class CalculadoraDescuentos {` | Sin ningún if |

### `f3-lsp-aves.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–12 | **LSP ✓ BASE CON LO QUE TODAS CUMPLEN** | `class Ave {` | Todas las aves comen; no todas vuelan |
| 15–17 | **LSP ✓ CONTRATO SEPARADO** | `interface Voladora {` | LSP: solo quien puede volar de verdad promete volar() |
| 20–24 | **LSP ✓ LA SUBCLASE CUMPLE TODO LO QUE PROMETE** | `class Gorrion extends Ave implements Voladora {` |  |
| 27–31 | **LSP ✓ EL PINGÜINO YA NO PROMETE VOLAR** | `class Pinguino extends Ave {` | No hay ningún método que "rompa" lo heredado |
| 34–38 | **LSP ✓ TIPO PRECISO** | `function hacerVolar(aves: Voladora[]): void {` | Solo acepta voladoras: el pingüino no compila, el error se detecta antes de ejecutar |

### `f4-isp-trabajadores.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **ISP ✓ INTERFACES CHICAS** | `interface Trabajador {` | ISP: cada clase implementa solo las capacidades que tiene |
| 17–31 | **ISP ✓ VARIAS INTERFACES** | `class Empleado implements Trabajador, Comensal, Asalariado {` | El empleado tiene las tres capacidades |
| 34–42 | **ISP ✓ SIN MÉTODOS QUE LANCEN ERROR** | `class Robot implements Trabajador {` | El robot solo trabaja |

### `f5-dip-facturas.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **DIP ✓ ABSTRACCIÓN** | `interface Exportador {` | DIP: GeneradorFacturas depende de esta interfaz y no de una clase concreta de exportación |
| 9–13 | **DIP ✓ DETALLES** | `class ExportadorPDF implements Exportador {` | Implementan la abstracción |
| 25–27 | **DIP ✓ INYECCIÓN POR CONSTRUCTOR** | `constructor(exportador: Exportador) {` | Ya no hay new adentro |
| 37 | **COMPOSITION ROOT** | `console.log(new GeneradorFacturas(new ExportadorPDF()).generar("ACM...` | La decisión de qué exportador usar se toma acá |
