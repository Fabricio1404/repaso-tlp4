# Simulacro de primer parcial · TEMA A · Cine

> **Duración:** 1,5 horas. **Aprobás resolviendo bien al menos 2 de 3.** Sin asistentes de IA.
> Trabajá en `inicio/` (`ej1.ts`, `ej2.ts`, `ej3.ts`). La carpeta `solucion/` es para después.

## Reglas
- `npx tsc` tiene que terminar sin errores (desde `1er-cuatrimestre/`, o configurá tu propio proyecto como indica `00-entorno`).
- Prohibido: `enum`, parameter properties (`constructor(private x: T)`), `any`.
- Constructores en forma larga. Cada archivo termina con un bloque de prueba.
- **La salida tiene que coincidir con la esperada, incluidas las tildes.**
- Puntos de control de Git: ver tabla al final. Sin el commit del punto de control, el ejercicio se considera no entregado.

---

## Ejercicio 1 · Complejo de cines (clase abstracta, herencia, polimorfismo, `static`, getter)

Clase abstracta `Funcion` con `sala` y `pelicula` **readonly**, y `precioEntrada()` **abstracto**. `Funcion2D` ($6000), `Funcion3D` ($8500 más $500 de anteojos, con el costo de anteojos como **constante de clase**) y `Funcion4D` ($12000).
`Complejo` con arreglo **privado** de funciones, `programar(funcion)`, `vender(sala, cantidad): number` (devuelve el importe; si no hay función en esa sala: `Error("No hay función en la sala <n>")`), un **atributo `static`** `totalEntradas` que suma todas las entradas vendidas, un **getter** `cantidadFunciones` y `cartelera()` que imprime cada función **sin `if` por tipo**.

Bloque de prueba: programar `Funcion2D(1, "Relatos salvajes")`, `Funcion3D(2, "Avatar")`, `Funcion4D(3, "Dune")`; mostrar la cartelera; vender 3 en sala 2 y 2 en sala 3; intentar vender en la sala 9; mostrar funciones y entradas vendidas.

```
Sala 1 · Relatos salvajes: $6000
Sala 2 · Avatar: $9000
Sala 3 · Dune: $12000
Venta sala 2: $27000
Venta sala 3: $24000
No hay función en la sala 9
Funciones: 3
Entradas vendidas: 5
```

---

## Ejercicio 2 · Aviso de estrenos (Observer + Adapter)

Interfaz `Suscriptor` con `avisar(pelicula, fecha)`. `SuscriptorEmail(email)` imprime `Email a <email>: estreno de <pelicula> el <fecha>`.
La empresa ya tiene un `SistemaPushViejo` (dado en `ej2.ts`, **no se modifica**) con `mandarPush(token, titulo, cuerpo)`. Creá `PushAdapter(push, token)` para que funcione como un `Suscriptor`: título `"¡Estreno!"` y cuerpo `"<pelicula> (<fecha>)"`.
`Cartelera` guarda suscriptores (sin conocer sus clases), con `suscribir`, `desuscribir` y `anunciarEstreno(pelicula, fecha)` que avisa a todos.

Bloque de prueba: suscribir a `ana@mail.com` y un push con token `tok-77`; anunciar "Dune 3" el "12/03"; desuscribir a Ana; anunciar "Toy Story 5" el "19/06".

```
Email a ana@mail.com: estreno de Dune 3 el 12/03
PUSH[tok-77] ¡Estreno! — Dune 3 (12/03)
PUSH[tok-77] ¡Estreno! — Toy Story 5 (19/06)
```

---

## Ejercicio 3 · Refactorizar la emisión de entradas (SRP y OCP)

El código de `inicio/ej3.ts` tiene un `switch (tipo)` que crece con cada tarifa nueva **y además** imprime el ticket con `console.log` dentro del mismo método.
Refactorizá con:
- Interfaz `Descuento` (`nombre`, `aplicar(precio)`) y las clases `SinDescuento` ("general"), `DescuentoEstudiante` (30 %), `DescuentoJubilado` (50 %).
- Interfaz `Impresora` (`imprimir(lineas: string[])`) con `ImpresoraConsola`, que `ServicioEntradas` **recibe por constructor**.
- **Un comentario arriba de cada interfaz nueva con el principio que aplica.**
- La salida **no** cambia:

```
*** Dune ***
Tarifa general: $10000
*** Dune ***
Tarifa estudiante: $7000
*** Dune ***
Tarifa jubilado: $5000
Recaudado: $22000
```

---

## Puntos de control de Git

| # | Momento | Mensaje |
|---|---|---|
| 0 | Proyecto configurado y `npx tsc` corriendo | `chore: configuración inicial` |
| 1 | Ejercicio 1 terminado | `feat(ej1): ejercicio 1 completo` |
| 2 | Ejercicio 2 terminado | `feat(ej2): ejercicio 2 completo` |
| 3 | Ejercicio 3 original, antes de refactorizar | `chore(ej3): código original` |
| 4 | Ejercicio 3 terminado | `refactor(ej3): ejercicio 3 completo` |
| 5 | `ENTREGA.md` | `docs: entrega final` |

Usá `../../plantilla-ENTREGA.md`.
