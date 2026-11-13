# Tema 2 · Ejercicios difíciles: los cuatro patrones en un mismo sistema

En cada ejercicio tenés que **decidir vos** dónde va cada patrón a partir de las pistas del enunciado (no te dicen "hacé un Singleton": te dicen "hay uno solo en todo el sistema"). Al terminar, escribí al principio del archivo un comentario que diga, para cada patrón, qué clase(s) lo implementan.

---

## D1 · Almacén con reposición automática (`d1-almacen-cuatro-patrones.ts`)

**Productos**
- Datos de entrada: `DatosProducto` (dado). Hay productos **perecederos** y **no perecederos**; el resto del sistema los trata a todos igual. `codigo`, `nombre` y `stockMinimo` no cambian. Stock o mínimo negativos → `Error("Stock inválido")`.
- El stock **solo** cambia con `descontar(cantidad)` (entero > 0; si no alcanza: `"Stock insuficiente de <nombre> (hay <n>)"`) y `sumar(cantidad)`. Se lee con `stock` y `bajoMinimo` (stock < mínimo), sin paréntesis.
- `precioFinal()`: el no perecedero cobra su precio; el perecedero tiene un **30 % de descuento** (redondeado) si vence en 3 días o menos.
- La creación se hace **solo** desde `FabricaProductos.crear(tipo, datos)` con `tipo: "perecedero" | "no-perecedero"`. Un perecedero sin `diasParaVencer` → `"<nombre>: un perecedero necesita días para vencer"`.

**Almacén**
- Hay **un único** almacén en todo el sistema (`Almacen.obtenerInstancia()`).
- `agregar(producto)` (código repetido → error), `vender(codigo, cantidad): number` (devuelve precio final × cantidad), `reponer(codigo, cantidad)`, `stockDe(codigo)`. Código inexistente → `"No existe el producto <codigo>"`.
- Cuando una venta deja un producto **bajo su mínimo**, el almacén **avisa** a quienes estén interesados con un evento `{ codigo, nombre, stock, minimo }`, **sin conocerlos**.

**Interesados**
- `AlertaConsola` imprime `"⚠ <nombre> quedó en <stock> (mínimo <minimo>)"`.
- `ReponedorAutomatico` pide al proveedor `minimo × 2 − stock` unidades, repone en el almacén e imprime `"↻ Pedido <orden>: +<cantidad> de <nombre>"`. Trabaja con un contrato `Proveedor { pedir(codigo, cantidad): string }` que devuelve el número de orden.

**Proveedor**
- El mayorista solo ofrece `ApiMayoristaXML` (dada, no se modifica): recibe `<orden><codigo>X</codigo><cantidad>N</cantidad></orden>` y responde `<ok>ORD-n</ok>` o `<error>...</error>`. Hacé que se pueda usar como `Proveedor`. Si responde error → lanzá `"El proveedor rechazó la orden: <respuesta>"`.

Salida esperada:
```
Venta: $3150
⚠ Leche quedó en 3 (mínimo 4)
↻ Pedido ORD-1: +5 de Leche
Venta: $4200
Stock de leche: 8
Venta: $20000
Stock insuficiente de Arroz (hay 10)
Queso: un perecedero necesita días para vencer
Mismo almacén: true
```

> Pregunta para pensar: ¿por qué "⚠" y "↻" aparecen **antes** que "Venta: $4200"? Respondela en un comentario.

---

## D2 · Casa inteligente (`d2-domotica-cuatro-patrones.ts`)

**Dispositivos**
- Todo dispositivo tiene `id` (no cambia), `ejecutar(comando, valor?): string` y `estado(): string`. No existe un dispositivo genérico.
- `Luz`: comandos `"encender"`/`"apagar"` → `"<id> encendida"` / `"<id> apagada"`; estado `"<id>: ON"` / `"<id>: OFF"`.
- `Persiana`: comando `"abrir"` con un porcentaje (por defecto 100). Fuera de 0 a 100 → `RangeError`. Devuelve `"<id> al <n>%"`; estado `"<id>: <n>%"`. Empieza en 100.
- Termostato: el único hardware disponible es `TermostatoX10` (dado, en °F, no se modifica). El sistema tiene que poder usarlo **como un dispositivo más**, en °C: comando `"temperatura"` con valor en °C (`°F = round(°C × 9/5 + 32)`); estado `"<id>: <°C redondeado>°C"`. Sin valor u otro comando → `'<id>: use "temperatura" con un valor en °C'`.
- Comando desconocido en luz o persiana → `'<id>: comando desconocido "<comando>"'`.
- Los dispositivos se crean **solo** con `FabricaDispositivos.crear(tipo, id)`.

**Central**
- **Una sola** central por casa. `instalar(tipo, id)` (id repetido → `"Ya existe el dispositivo <id>"`) usando la fábrica; `ordenar(id, comando, valor?)` guarda en una bitácora el texto que devuelve el dispositivo; `resumen(): string[]` (estados) y `obtenerBitacora(): string[]`.

**Sensores**
- `SensorMovimiento(zona)` con `detectar(hora)` avisa a los interesados (sin conocerlos) la zona y la hora. Se puede suscribir y desuscribir.
- `ModoNoche`: entre las 20 y las 7 enciende la luz `luz-<zona>` **a través de la central**.
- `Alarma`: si está armada (`armar()`), imprime `"🚨 Intrusión en <zona> a las <hora>h"` y cuenta las intrusiones (`cantidadIntrusiones`).

Salida esperada:
```
Ya existe el dispositivo luz-living
🚨 Intrusión en living a las 23h
termo-casa: use "temperatura" con un valor en °C
[ 'luz-living: ON', 'persiana-living: 40%', 'termo-casa: 22°C' ]
[
  'persiana-living al 40%',
  'termo-casa a 22°C',
  'luz-living encendida'
]
Intrusiones: 1
```
