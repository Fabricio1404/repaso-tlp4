# Tema 1 · Ejercicios fáciles: resolución explicada

Todos los archivos de esta carpeta compilan con `npx tsc` y producen exactamente la salida esperada. El `MAPA-DE-CONCEPTOS.md` te dice en qué línea se aplica cada concepto.

---

## F1 · `Libro`

**Qué evaluaba:** abstracción (elegir atributos), constructor en forma larga, métodos que devuelven vs. que modifican, lanzar errores.

- `disponible` **no** va como parámetro del constructor porque la consigna dice "al crearlo siempre está disponible". Se inicializa con `this.disponible = true`. Error típico: agregar un cuarto parámetro.
- `describir()` **devuelve** el texto. Si hicieras `console.log` adentro, el bloque de prueba imprimiría `undefined` en la línea `console.log(libro.describir())`.
- `prestar()` valida primero y modifica después. Si ya está prestado, lanza el error y `disponible` sigue en `false` (no se tocó).
- `!this.disponible` se lee "no está disponible".

**Variante que también es correcta:** hacer `disponible` privado con un getter `get disponible(): boolean`. Es más encapsulado (nadie puede hacer `libro.disponible = true` desde afuera). Si lo hacés, el atributo se tiene que llamar `_disponible`.

---

## F2 · `Termometro`

**Qué evaluaba:** `static readonly`, encapsulamiento, getter calculado, validar antes de modificar.

- "Constantes que nadie puede reasignar y que no se repiten por cada objeto" = `static` (una por clase) + `readonly` (no se reasignan). Si fueran solo `readonly`, cada termómetro tendría su propia copia.
- **El truco de validar antes de modificar:** se calcula `const nueva = this.temperatura + grados`, se valida `nueva` y **recién después** se asigna. Si asignás primero y validás después, cuando falla la temperatura ya quedó en 128.
- `estado` es un **getter** porque la consigna dice "se usa sin paréntesis" y "de solo lectura" (sin setter).
- Los métodos `validarGrados` y `validarRango` son `private`: son detalles internos. Evitan repetir el mismo `if` en `subir` y `bajar`.
- Orden de los `if` del estado: primero `< 10`, después `> 25`, y si no es ninguno, `"templado"`. 10 y 25 son templado (límites).

---

## F3 · Animales

**Qué evaluaba:** herencia, `protected`, override y polimorfismo.

- `nombre` es `protected`: la consigna dice "las subclases pueden leer pero el código de afuera no". Con `private`, como `presentarse` está en `Animal` igual funcionaría, pero si una subclase quisiera usar `this.nombre`, no compilaría. `protected` es lo que pide el enunciado.
- `Perro`, `Gato` y `Vaca` **no tienen constructor**: heredan el de `Animal`. Solo redefinen `hacerSonido()`.
- `presentarse()` se escribe **una vez** en `Animal`. Cuando se llama sobre un `Perro`, `this.hacerSonido()` ejecuta la versión de `Perro`. Eso es polimorfismo.
- El `for` del bloque de prueba **no tiene ningún `if`** preguntando el tipo.

**Mejora posible:** declarar `Animal` como `abstract` y `hacerSonido()` como `abstract`. Así nadie puede crear un `new Animal("x")` que haga `"..."`, y si mañana alguien agrega `Pato` y se olvida de `hacerSonido`, no compila. Lo vas a ver en los ejercicios medios.

---

## F4 · `Rectangulo`

**Qué evaluaba:** getters y setters con validación, atributo de respaldo, getters calculados.

- El atributo real es `_ancho` y el getter/setter es `ancho`. Si se llamaran igual, `set ancho(v) { this.ancho = v }` se llamaría a sí mismo infinitamente.
- En el constructor: primero `this._ancho = 0` (para que `strict` vea el atributo inicializado) y después `this.ancho = ancho` (pasa por el setter → valida). Por eso `new Rectangulo(0, 2)` lanza el error.
- `area`, `perimetro` y `esCuadrado` son getters **sin setter**: se calculan al leerlos. Si los guardaras como atributos, al cambiar `ancho` quedarían desactualizados.
- `validar` es `private static`: no usa datos de ningún rectángulo, es una regla de la clase. También podría ser un método `private` normal; las dos opciones son correctas.

---

## F5 · `Ticket`

**Qué evaluaba:** `static` como contador compartido, `readonly`, método `static`.

- `emitidos` es `static` porque es **uno solo para toda la clase**. Si no fuera static, cada ticket tendría su propio contador en 0 y todos tendrían id 1.
- Dentro del constructor se accede como `Ticket.emitidos`, **no** `this.emitidos` (`this` es el ticket, no la clase).
- `id` es `readonly`: se asigna una vez y nunca más.
- `emitidos` es `private static` + un método `static cantidadEmitida()` para leerlo. Así nadie puede hacer `Ticket.emitidos = 0` desde afuera. (Hacerlo `public static` también funciona, pero es menos encapsulado.)
- `toString()` es un método común. Si hacés `` `${t}` `` JavaScript llama a `toString()` automáticamente.

---

## Errores comunes en este nivel

| Error | Síntoma | Corrección |
|---|---|---|
| `console.log` dentro de `describir()` | Se imprime `undefined` | Usar `return` |
| Setter con el mismo nombre que el atributo | `RangeError: Maximum call stack size exceeded` | Atributo `_nombre` |
| `this.contador` en vez de `Clase.contador` | `Property 'contador' does not exist` o ids siempre en 1 | Acceder al static con el nombre de la clase |
| Asignar antes de validar | El objeto queda en estado inválido después del error | Calcular en variable, validar, asignar |
| `private nombre` en el padre | Las hijas no compilan al usar `this.nombre` | `protected` |
