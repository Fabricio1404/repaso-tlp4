# Tema 2 · Ejercicios difíciles: resolución explicada

## Cómo traducir el enunciado a patrones

| Frase del enunciado | Patrón |
|---|---|
| "hay **un único** X en todo el sistema", "una sola central por casa" | **Singleton** |
| "la creación se hace **solo** desde...", "el resto del sistema los trata a todos igual" | **Factory** (+ tipo común abstracto) |
| "**avisa** a quienes estén interesados **sin conocerlos**", "se puede suscribir y desuscribir" | **Observer** |
| "solo ofrece una API vieja que **no se modifica**", "que se pueda usar **como** un X más" | **Adapter** |

---

## D1 · Almacén

| Patrón | Clases |
|---|---|
| Singleton | `Almacen` |
| Factory | `FabricaProductos` → `Producto` (abstracta), `ProductoPerecedero`, `ProductoNoPerecedero` |
| Observer | Sujeto: `Almacen`. Interfaz: `ObservadorStock`. Concretos: `AlertaConsola`, `ReponedorAutomatico` |
| Adapter | Target: `Proveedor`. Adaptee: `ApiMayoristaXML`. Adapter: `ProveedorMayoristaAdapter` |

Puntos finos:
- **Una clase puede cumplir dos roles.** `Almacen` es Singleton **y** sujeto del Observer. No hay ninguna regla que lo impida.
- **El stock está encapsulado en `Producto`** (`private _stock` + getter + `descontar`/`sumar`). El almacén no hace `p.stock -= n`; le pide al producto que se descuente (y el producto valida).
- **Validación específica en la fábrica:** el perecedero necesita `diasParaVencer`. La fábrica es el lugar natural para esa regla de construcción.
- **El reponedor depende de `Proveedor` (interfaz), no del adapter.** Recibe el proveedor por constructor. Mañana se puede pasar otro proveedor sin tocar el reponedor (anticipo de **DIP**, tema 3).
- **El adapter traduce en las dos direcciones:** arma el XML (entrada) y parsea `<ok>...</ok>` con una expresión regular (salida). `match` devuelve `null` si no coincide: ese es el caso de error.
- **Respuesta a la pregunta del enunciado (notificaciones en cascada):** `console.log(\`Venta: $${almacen.vender(...)}\`)` primero **evalúa** `vender(...)`. Dentro de `vender` se notifica, el reponedor pide y repone, y recién cuando todo eso termina `vender` devuelve el total y se imprime "Venta". Además, el reponedor modifica el almacén **dentro** de la notificación. Esto es exactamente la desventaja del Observer: "notificaciones en cascada difíciles de seguir".
- Cuentas: leche $1500 con 30 % de descuento = $1050. 3 × 1050 = 3150. Queda en 7, no está bajo el mínimo (4). Vender 4 → 4 × 1050 = 4200, queda en 3 → aviso. Reponer 4 × 2 − 3 = 5 → 8.
- **Singleton y pruebas:** si este almacén se usara en tests, cada test vería los productos del anterior. Es la desventaja "dificulta las pruebas unitarias".

---

## D2 · Casa inteligente

| Patrón | Clases |
|---|---|
| Singleton | `CentralDomotica` |
| Factory | `FabricaDispositivos` → `Dispositivo` (abstracta), `Luz`, `Persiana`, `TermostatoAdapter` |
| Observer | Sujeto: `SensorMovimiento`. Interfaz: `ObservadorSensor`. Concretos: `ModoNoche`, `Alarma` |
| Adapter | Target: `Dispositivo`. Adaptee: `TermostatoX10`. Adapter: `TermostatoAdapter` |

Puntos finos:
- **El target del adapter puede ser una clase abstracta**, no solo una interfaz. `TermostatoAdapter extends Dispositivo` y **contiene** un `TermostatoX10` (sigue siendo composición respecto del adaptee).
- **Factory + Adapter:** la fábrica, cuando le piden un `"termostato"`, devuelve un adapter que envuelve un X10. Ni la central ni el usuario saben que hay un aparato viejo atrás. Si mañana se compra un termostato moderno, solo cambia ese `case`.
- **`ejecutar(comando, valor?)`:** `Luz.ejecutar(comando)` declara un parámetro menos y TypeScript lo acepta (una función con menos parámetros es compatible). `Persiana` usa `valor ?? 100`.
- **`RangeError`** en la persiana: el valor es un número válido pero fuera de rango.
- **Observer + Singleton:** `ModoNoche` no recibe la central; la obtiene con `CentralDomotica.obtenerInstancia()`. Es cómodo, pero acopla `ModoNoche` al Singleton (en el tema 3 vas a ver que inyectarla por constructor sería más flexible y testeable: **DIP**).
- La condición nocturna `hora >= 20 || hora < 7` usa **o** porque la noche "cruza" la medianoche.
- La primera detección (15 h) no produce nada: de día y alarma desarmada. La segunda (23 h) enciende la luz (se ve en la bitácora y en el resumen) y dispara la alarma.
