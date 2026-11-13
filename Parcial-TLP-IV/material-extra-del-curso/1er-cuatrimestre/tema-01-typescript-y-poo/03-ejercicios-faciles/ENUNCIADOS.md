# Tema 1 · Ejercicios fáciles (sin pistas)

Reglas: constructor en forma larga, sin `any`, sin `enum`, sin parameter properties. Cada archivo termina con el bloque de prueba (ya está escrito y comentado en cada `.ts`: descomentalo cuando termines).
Verificá con `npx tsc` (desde `1er-cuatrimestre/`) y ejecutá con `node <ruta-al-archivo>`.

---

## F1 · `Libro` (archivo `f1-libro.ts`)

Modelá un `Libro` con `titulo`, `autor`, `paginas` y si está `disponible` (al crearlo siempre está disponible; no se recibe por constructor).

Métodos:
- `describir(): string` → `"Rayuela de Julio Cortázar (600 págs.)"`
- `esLargo(): boolean` → `true` si tiene más de 300 páginas.
- `prestar(): void` → si no está disponible lanza `Error("El libro ya está prestado")`; si está, lo marca como no disponible.
- `devolver(): void` → lo marca como disponible.

Salida esperada:
```
Rayuela de Julio Cortázar (600 págs.)
true
false
El libro ya está prestado
true
```

---

## F2 · `Termometro` (archivo `f2-termometro.ts`)

- La temperatura es **privada** y se recibe en el constructor.
- Constantes de clase `MINIMA = -50` y `MAXIMA = 60` que **nadie** puede reasignar y que **no** se repiten por cada objeto.
- `subir(grados)` y `bajar(grados)`: los grados deben ser mayores a 0 (si no: `Error("Los grados deben ser positivos")`) y el resultado no puede salir del rango (si no: `Error("Fuera de rango")`). Si hay error, la temperatura **no cambia**.
- `leer(): number`.
- Una propiedad de solo lectura `estado` (se usa sin paréntesis): `"frío"` si es menor a 10, `"calor"` si es mayor a 25, `"templado"` en otro caso.

Salida esperada:
```
20 templado
28 calor
Fuera de rango
28
5 frío
```

---

## F3 · `Animal`, `Perro`, `Gato`, `Vaca` (archivo `f3-animales.ts`)

- `Animal` tiene un `nombre` que las subclases pueden leer pero el código de afuera no.
- `hacerSonido(): string` en `Animal` devuelve `"..."`. Cada subclase lo redefine: `"Guau"`, `"Miau"`, `"Muu"`.
- `presentarse(): string` se escribe **una sola vez** en `Animal` y devuelve `"Soy Firulais y hago Guau"`.
- Armá un arreglo de `Animal` con un animal de cada tipo y recorrelo **sin preguntar el tipo**.

Salida esperada:
```
Soy Firulais y hago Guau
Soy Michi y hago Miau
Soy Lola y hago Muu
```

---

## F4 · `Rectangulo` con getters y setters (archivo `f4-rectangulo.ts`)

- `ancho` y `alto` se leen y se asignan como atributos (`r.ancho = 5`), pero deben ser mayores a 0; si no, `Error("Las medidas deben ser mayores a 0")`. La validación también corre al crear el objeto.
- Propiedades calculadas de solo lectura: `area`, `perimetro` y `esCuadrado`.

Salida esperada:
```
12 14 false
25 20 true
Las medidas deben ser mayores a 0
```

---

## F5 · `Ticket` con numeración automática (archivo `f5-ticket.ts`)

- Cada `Ticket` recibe una `descripcion` y obtiene un `id` automático (1, 2, 3, ...) que no puede cambiar nunca.
- La clase lleva la cuenta de cuántos tickets se emitieron en total: `Ticket.cantidadEmitida()`.
- `toString(): string` → `"#1 - Falla de impresora"`.

Salida esperada:
```
#1 - Falla de impresora
#2 - Sin internet
#3 - Mouse roto
Emitidos: 3
```
