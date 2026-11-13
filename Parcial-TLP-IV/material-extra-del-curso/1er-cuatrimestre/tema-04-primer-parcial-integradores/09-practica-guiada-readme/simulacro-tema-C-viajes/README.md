# Simulacro de primer parcial · TEMA C · Agencia de viajes

> **Duración:** 1,5 horas. **Aprobás resolviendo bien al menos 2 de 3.** Mismas reglas y puntos de control que el Tema A (ver `../simulacro-tema-A-cine/README.md`).
> Trabajá en `inicio/`.

---

## Ejercicio 1 · Paquetes turísticos (clase abstracta, getter/setter, `static`, polimorfismo, `super`)

Clase abstracta `Paquete` con `destino` **readonly** y `noches` con **getter y setter**: entero entre 1 y 30 (si no: `Error("Las noches deben estar entre 1 y 30")`), validado también al crear. `precioPorNoche()` **abstracto** y `precioTotal()` = precio por noche × noches.
- `PaqueteNacional`: $40000 por noche.
- `PaqueteInternacional`: $90000 por noche **más** una tasa aeroportuaria fija de $60000 (constante de clase). Reutilizá el cálculo del padre.

`Agencia` con ventas **privadas**, `vender(paquete)`, atributo **`static`** `paquetesVendidos`, getter `totalVendido` y `resumen()` sin `if` por tipo.

Bloque de prueba: vender `PaqueteNacional("Bariloche", 5)` y `PaqueteInternacional("Madrid", 7)`; cambiar Bariloche a 6 noches; mostrar el resumen; intentar poner 45 noches; mostrar total y cantidad.

```
Bariloche (6 noches): $240000
Madrid (7 noches): $690000
Las noches deben estar entre 1 y 30
Total vendido: $930000
Paquetes vendidos: 2
```

---

## Ejercicio 2 · Servicios con cotización (Singleton + Factory)

Singleton `CotizacionDolar` con `valor = 1000` **readonly**. Interfaz `Servicio` (`descripcion()`, `precioEnPesos()`).
- `Excursion(nombre, pesos)`: descripción `"Excursión <nombre>"`.
- `VueloInternacional(ruta, dolares)`: descripción `"Vuelo <ruta>"`; convierte a pesos **leyendo la cotización del Singleton** (no escribas 1000).
- `FabricaServicios.crear(tipo, nombre, monto)` **estático**, con `tipo: "excursion" | "vuelo"`. Nadie más hace `new` de los servicios.

```
Mismo Singleton: true
Excursión Cerro Catedral: $85000
Vuelo EZE-MAD: $950000
Total: $1035000
```

---

## Ejercicio 3 · Refactorizar transportes (LSP e ISP)

En `inicio/ej3.ts`, `Transporte` obliga a todas las subclases a tener `despacharEquipaje` y `servirComida`. `Colectivo` y `Traslado` los "rompen" lanzando errores, y `servirATodos` necesita un `try/catch`.
Refactorizá con interfaces chicas `Reservable` (`nombre`, `reservarAsiento`), `ConEquipaje` (`despacharEquipaje`) y `ConServicioABordo` (`servirComida`), **sin herencia** entre transportes. `reservarTodos` y `servirATodos` piden solo la capacidad que usan.
**Comentario arriba de cada interfaz nueva con el principio que aplica.**

Las dos líneas `ERROR: ...` del original desaparecen, porque esas llamadas pasan a **no compilar**: dejalas comentadas con `❌` y la explicación.

```
Avión: asiento para Ana
Colectivo: asiento para Ana
Traslado: lugar para Ana
Avión: 23 kg despachados
Colectivo: 15 kg en bodega
Avión: menú servido
```

**Pregunta para `ENTREGA.md`:** ¿qué principio viola cada `throw` del original: LSP, ISP o los dos? Justificá.
