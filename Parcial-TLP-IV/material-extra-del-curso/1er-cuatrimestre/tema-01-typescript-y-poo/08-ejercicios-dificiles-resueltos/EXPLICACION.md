# Tema 1 · Ejercicios difíciles: resolución explicada

Cómo encarar un ejercicio largo (aplica a los tres):
1. **Subrayá los sustantivos** de la consigna: son candidatos a clases o atributos (vehículo, patente, estacionamiento, capacidad...).
2. **Subrayá los verbos**: son métodos (ingresar, egresar, calcular cobro...).
3. Buscá las **frases clave** que te dicen qué herramienta usar:

| Frase en la consigna | Herramienta |
|---|---|
| "no puede crearse un X genérico", "cada tipo **debe**..." | `abstract class` + `abstract metodo()` |
| "nunca cambia" | `readonly` |
| "se lee sin paréntesis" | `get` |
| "no se puede modificar desde afuera" | `private` + getter sin setter |
| "de **todos** los X creados", "total histórico" | `static` |
| "sin exponer la lista interna" | devolver copia (`[...x]`, `map`, `filter`) |
| "un error de un tipo propio" | `class XError extends Error` |
| "prohibido preguntar el tipo" | polimorfismo |
| "reutilizá el cálculo, no lo copies" | `super.metodo()` |
| "atómica", "ninguna cambia si falla" | todas las validaciones antes de modificar |

---

## D1 · Estacionamiento

- **`abstract class Vehiculo`** con `abstract tarifaPorHora()` y `abstract tipo()`: la consigna dice "ningún vehículo genérico puede crearse" y "cada tipo **debe** informar".
- **La regla de redondeo, una sola vez:** `calcularCobro` está en `Vehiculo` y usa `this.tarifaPorHora()`. `Math.ceil(minutos / 60)` redondea hacia arriba (61 min → 2) y `Math.max(1, ...)` impone el mínimo (10 min → 1, y también 0 min → 1).
- **`super.calcularCobro(minutos) + Camioneta.SEGURO`:** la camioneta reutiliza el cálculo del padre y le suma lo suyo. Si copiaras la fórmula, un cambio en la regla de redondeo habría que hacerlo en dos lugares.
- **Validación en el constructor del vehículo:** la expresión regular `^([A-Z]{3}\d{3}|[A-Z]{2}\d{3}[A-Z]{2})$`: `^` y `$` anclan al principio y final; `[A-Z]{3}` tres letras; `\d{3}` tres dígitos; `|` "o". Se normaliza antes (`trim().toUpperCase()`) y por eso `"ab123cd"` es válida. El mensaje de error usa **lo que se recibió**, no lo normalizado.
- **Error propio** `EstacionamientoLlenoError`: en el bloque de prueba se captura con `instanceof EstacionamientoLlenoError` y se imprime `e.name`. Por eso hay que asignar `this.name`.
- **Dos niveles de recaudación:** `_recaudacion` (de **este** estacionamiento, getter sin setter) y `static recaudado` (de **todos**, método `static`). Mismo concepto que `hotel.cantidad` vs. `Hotel.totalCheckIns` del parcial.
- **`egresar` sin `instanceof`:** `estadia.vehiculo.calcularCobro(...)`. El estacionamiento no sabe qué tipo de vehículo es.
- **Método privado `buscar`:** se usa en `ingresar` (para no repetir patentes) y en `egresar`. Normaliza la patente que recibe, así `egresar("xyz987", 20)` funciona.
- Se quita la estadía con `filter(e => e !== estadia)`: compara por **referencia** (el mismo objeto).

---

## D2 · Banco

- **Método abstracto `protected`:** `validarExtraccion` es distinto en cada cuenta y **no** debe poder llamarse desde afuera (la consigna dice "no forma parte de lo que se puede llamar desde afuera"). `protected abstract` cumple ambas cosas.
- **Patrón *Template Method*:** `extraer()` y `transferir()` están en `Cuenta` y fijan el orden: validar monto → validar regla de la cuenta (polimórfico) → debitar. Las hijas solo completan el paso variable.
- **El gancho `alExtraer()`:** el contador de la caja de ahorro solo debe subir si la extracción **se concreta**. Si lo incrementaras dentro de `validarExtraccion`, un intento fallido (por saldo insuficiente) consumiría una extracción. El gancho se llama en `debitar`, después de modificar el saldo. `Cuenta` lo deja vacío y `CajaAhorro` lo redefine.
- **Transferencia atómica:** primero `validarMonto`, después `this.validarExtraccion(monto)`, y **recién después** `debitar` y `destino.acreditar`. Si la validación falla, no se tocó nada. En la salida: "Saldo de Beto sin cambios: -$4000".
- **`protected` entre instancias:** `destino.acreditar(...)` funciona aunque `acreditar` sea `protected`, porque se llama **desde dentro de la clase `Cuenta`** y `destino` es una `Cuenta`. Desde el `Banco` no se podría.
- **`readonly` en la interface `Movimiento`:** con `historial()` devolviendo `[...this.movimientos]`, el arreglo es otro, pero los objetos son los mismos. Como sus propiedades son `readonly`, nadie puede hacer `historial()[0].monto = 999`.
- **Unión de literales `TipoMovimiento`:** reemplaza un `enum`.
- **Cuenta de extracciones de Ana:** transferencia (1), extracción (2), extracción (3), la cuarta falla. `nuevoMes()` → vuelve a 0.
- **`formatear`:** función común (no método) para mostrar `-$4000`. Detalle de presentación que el enunciado pide explícitamente.

---

## D3 · Cursos

- **Interface + clase abstracta juntas:** `abstract class Persona implements Identificable`. La interface es el contrato mínimo ("tiene id"); la clase abstracta aporta código común (`presentarse`, la validación del DNI).
- **`super.presentarse()` en `Docente`:** se reutiliza la presentación del padre y se le agrega la materia (la consigna dice "reutilizando la del padre").
- **`RangeError`:** se usa cuando el tipo es correcto (un número) pero el valor está fuera de rango (11). En el bloque de prueba se captura con `instanceof RangeError`. Es la misma idea que el `calcularPrecioFinal` del segundo cuatrimestre.
- **Getters calculados `promedio` y `aprobado`:** no se guardan, se calculan. Si se guardaran, al agregar una nota habría que acordarse de actualizarlos.
- **Duplicados por `id`, no por referencia:** `new Alumno("30111222", "Ana (otra vez)")` es otro objeto, pero el mismo DNI. `some(a => a.id === alumno.id)` lo detecta; `includes(alumno)` **no** lo detectaría (compara referencias).
- **`docente: Docente | undefined`:** al principio no hay docente. En el reporte se usa `this.docente?.nombre ?? "sin asignar"`. En `integrantes()` se comprueba con `!== undefined` antes de agregarlo (narrowing).
- **`Persona[]` con docente y alumnos:** sustitución. `p.presentarse()` ejecuta la versión de cada uno (el docente agrega la materia).
- **El caso de Caro:** promedio 10 pero con una sola nota → desaprobada. Pero `mejorPromedio()` igual la devuelve, porque mira solo el promedio. Son dos reglas distintas: leé la consigna literalmente.
