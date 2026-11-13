# Tema 3 · Ejercicios fáciles: un principio por ejercicio

**Modalidad (igual que el ejercicio 3 del parcial):** cada archivo trae el **código original**, que **funciona** pero viola un principio. Antes de tocarlo, ejecutalo y **copiá la salida**: al terminar el refactor tiene que salir **exactamente igual** (salvo donde la consigna pida agregar algo).
Arriba de cada interfaz nueva, escribí un comentario con el principio que aplica (por ejemplo, `// OCP: ...`).

---

## F1 · SRP (`f1-srp-reporte.ts`)
`ReporteVentas.generar` calcula el total, arma las líneas del reporte **y** las imprime.
Separá en `CalculadoraVentas` (`total(ventas): number`), `FormateadorReporte` (`formatear(ventas, total): string[]`) e `ImpresoraConsola` (`imprimir(lineas)`), coordinadas por `ServicioReportes`, que las recibe por constructor.

## F2 · OCP (`f2-ocp-descuentos.ts`)
Cada tipo de cliente nuevo obliga a agregar un `else if`. Creá una interfaz `Descuento` con `aplicar(monto): number` y una clase por tipo (`DescuentoComun`, `DescuentoVip`, `DescuentoEmpleado`). La calculadora recibe un `Descuento` y no tiene ningún `if`.
**Extra:** agregá `DescuentoJubilado` (15 %) **sin modificar** la calculadora y mostrá `8500`.

## F3 · LSP (`f3-lsp-aves.ts`)
`Pinguino` hereda `volar()` y lo "rompe" lanzando un error: `hacerVolar` recibe aves y se lleva una sorpresa.
Rediseñá para que `hacerVolar` **solo pueda recibir** aves que vuelan (error de compilación si le pasás un pingüino), sin perder `comer()` en todas las aves ni `nadar()` en el pingüino.
La línea `¡Sorpresa! ...` **debe desaparecer** de la salida (es el bug).

## F4 · ISP (`f4-isp-trabajadores.ts`)
`Robot` está obligado a implementar `comer()` y `cobrarSueldo()` (que lanzan error). Partí `Trabajador` en interfaces chicas (`Trabajador`, `Comensal`, `Asalariado`) y que cada clase implemente solo lo que le corresponde.

## F5 · DIP (`f5-dip-facturas.ts`)
`GeneradorFacturas` hace `new ExportadorPDF()` adentro: no se puede exportar a otro formato ni probar sin PDF.
Creá la interfaz `Exportador`, recibila por constructor, y agregá `ExportadorTexto` (`"[TXT] ..."`). Al final del bloque de prueba generá la misma factura con los dos exportadores.

---

### Salidas esperadas después del refactor

F1 (idéntica al original):
```
=== REPORTE DE VENTAS ===
Yerba: 3 x $3000
Azúcar: 2 x $1500
TOTAL: $12000
```
F2: `10000`, `8000`, `7000` y (extra) `8500`.
F3:
```
Gorrión está comiendo
Pingüino está comiendo
Gorrión está volando
Pingüino está nadando
```
F4 (idéntica): `Ana trabaja`, `R2-D2 ensambla piezas`, `Ana almuerza`, `Sueldos: $500000`.
F5: `[PDF] Factura para ACME SA por $150000` y `[TXT] Factura para ACME SA por $150000`.
