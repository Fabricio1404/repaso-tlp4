# Soluciones explicadas · Tema 01 · TypeScript y POO

> Los archivos `.ts` de esta carpeta están **resueltos y comentados**. Acá se explica **por qué** se resuelve así y se responden las preguntas para pensar.
> Ejecutalos con `node 01-typescript-y-poo/soluciones/ejN-....ts`.

---

## Ejercicio 1 · Libro

### Cómo se razona
1. **"solo puede valer novela, ensayo o poesia"** → no hay `enum`, así que: `type Genero = "novela" | "ensayo" | "poesia";`
2. **"atributos privados"** → `private` en cada uno, declarados **arriba** y asignados en el constructor (forma larga).
3. **"prestado arranca en false"** → no viene por parámetro: se asigna `this.prestado = false;` en el constructor.
4. **"si paginas ≤ 0 lanzar RangeError"** → la validación va **antes** de asignar. Si lanza, el objeto nunca llega a existir.
5. `prestar()` tiene una **regla de negocio**: no se puede prestar dos veces → `if (this.prestado) throw ...`.

### Puntos clave
- `descripcion()` usa un **ternario** para traducir `boolean` → texto: `this.prestado ? "prestado" : "disponible"`.
- `esLargo()` dice "**más** de 300" → `>` y no `>=`. Leé con cuidado los bordes: es lo que más se pregunta en testing.
- En el bloque de prueba, el error se atrapa con `try/catch` y se verifica `e instanceof Error` porque en TypeScript `e` es `unknown`.

---

## Ejercicio 2 · Cuenta bancaria

### Cómo se razona
- **Encapsulamiento**: `_saldo` es privado y **solo cambia** dentro de `depositar` y `extraer`, que validan. No hay forma de dejar la cuenta en un estado inválido.
- **Getter sin setter** → `cuenta.saldo` se puede leer, pero `cuenta.saldo = 99` da error de TypeScript.
- **Método privado `validarMonto`** → evita repetir la misma validación en dos métodos (principio DRY: *Don't Repeat Yourself*). Es privado porque es un detalle interno.
- `Number.isFinite(monto)` rechaza `NaN` e `Infinity` además de no-números.

### Respuestas a las preguntas
- **a)** Si devolviera `this.movimientos`, quien lo recibe tendría **la referencia real** al arreglo interno. Podría hacer `push` de un depósito falso de un millón y la cuenta lo "creería", sin pasar por `depositar()`. Eso **rompe el encapsulamiento**. Por eso se devuelve una copia: `this.movimientos.map(m => ({ ...m }))` (copia el arreglo **y** cada objeto).
- **b)** Porque si el getter se llamara `saldo` y el atributo también `saldo`, chocarían. Y si hubiera un setter `set saldo(v) { this.saldo = v; }`, se llamaría **a sí mismo** infinitamente. El guion bajo es la convención para el "atributo de respaldo".
- **c)** Porque así quien atrapa el error puede **distinguirlo** con `instanceof SaldoInsuficienteError` y reaccionar distinto (por ejemplo, en una API: responder 409 en vez de 500). Con `Error` genérico no sabrías qué pasó salvo leyendo el texto del mensaje.

---

## Ejercicio 3 · Empleados

### Cómo se razona
- **"clase abstracta Empleado"** → `abstract class Empleado`.
- **"método abstracto calcularSueldo"** → `abstract calcularSueldo(): number;` (sin llaves, con punto y coma).
- **"cuenta todos los empleados"** → `static totalEmpleados`. Se incrementa en el constructor **del padre**, así cuenta a todas las hijas automáticamente (porque toda hija llama a `super(...)`).
- **`legajo` readonly** → se asigna una sola vez en el constructor.
- **`Gerente extends EmpleadoFijo`** → herencia de dos niveles. `super.calcularSueldo()` llama a la versión de `EmpleadoFijo` y se le suma el bono.

### Respuestas a las preguntas
- **a)** Error de TypeScript: *"Cannot create an instance of an abstract class"*. Una clase abstracta es un molde **incompleto** (le falta `calcularSueldo`), no tiene sentido crear un "empleado genérico".
- **b)** Si `sueldoMensual` fuera `private`, `Gerente` **no podría** escribir `this.sueldoMensual`. Pero `super.calcularSueldo()` **sí funcionaría**, porque ese método está en `EmpleadoFijo`, que sí puede acceder a su propio atributo privado. Esa es una buena práctica: la hija usa el **comportamiento** del padre, no sus datos.
- **c)** Polimorfismo en:
  1. `resumen()` del padre llama a `this.calcularSueldo()` y se ejecuta la versión de cada hija.
  2. `totalNomina()` llama a `e.calcularSueldo()` sobre un `Empleado[]` sin saber qué es cada uno.
  3. (Bonus) `Gerente.calcularSueldo()` redefine al de `EmpleadoFijo`.

---

## Ejercicio 4 · Figuras

### Cómo se razona
- La interface es **el contrato**: cualquier cosa que tenga `nombre`, `area()` y `perimetro()` es una `Figura`.
- Cada clase pone `implements Figura` → TypeScript **obliga** a que tenga esos tres miembros. Si te olvidás `perimetro()`, no compila.
- `describir()` y `mayorArea()` reciben `Figura`, **no** `Circulo` ni `Rectangulo`. Si mañana se agrega `Hexagono implements Figura`, esas funciones funcionan sin tocarlas (eso es **OCP**, que vas a ver en el tema 03).

### Respuesta a la pregunta
Conviene una **interface** porque las tres figuras **no comparten código ni datos**: cada una tiene medidas distintas (radio / base y altura / tres lados) y fórmulas distintas. Lo único que comparten es **qué saben hacer** (el contrato). Una clase abstracta tendría sentido si hubiera atributos comunes o métodos con la misma implementación.

> Nota: en el triángulo, `area()` llama a `this.perimetro()`. Reutilizar tus propios métodos es correcto y evita repetir la fórmula.

---

## Ejercicio 5 · Estacionamiento (integrador)

### Cómo se razona, frase por frase

| Frase de la consigna | Decisión |
|---|---|
| "Tipo `TipoVehiculo` = auto, moto o camioneta" | Unión de literales |
| "clase abstracta Vehiculo" | `abstract class Vehiculo` |
| "patente readonly en mayúsculas" | `readonly patente` + `patente.toUpperCase()` en el constructor |
| "tarifaPorHora abstracto" | Cada subclase lo define → polimorfismo |
| "toda fracción se cobra como hora entera" | `Math.ceil(2.5)` = 3 |
| "Estacionamiento tiene vehículos" | **Composición**: `private vehiculos: Vehiculo[]` |
| "recaudación de todos los estacionamientos" | `static recaudacionHistorica` |
| "ocupados / libres / recaudado" | Getters calculados |
| "sin preguntar el tipo" | `v.calcularCobro(horas)` y listo |

### Las cuentas
- AB123CD (auto) 2,5 h → `Math.ceil(2.5)` = 3 h × $1500 = **$4500**
- A001XYZ (moto) 1 h → 1 × $800 = **$800**
- AE999ZZ (camioneta) 0,5 h → `Math.ceil(0.5)` = 1 × $2000 = **$2000**
- Centro: 4500 + 800 = **$5300** · Norte: **$2000** · Histórica (static, suma de los dos): **$7300**

### Errores típicos en este ejercicio
- ❌ `this.recaudacionHistorica += cobro` → no compila; es `static`, se usa `Estacionamiento.recaudacionHistorica`.
- ❌ Calcular el cobro con `if (v.tipo === "auto") ... else if (v.tipo === "moto")` → funciona, pero **no es polimorfismo** y en el parcial te lo marcan. Cada vehículo ya sabe su tarifa.
- ❌ Comparar patentes sin pasar a mayúsculas → `egresar("ab123cd")` no encontraría el auto.
- ❌ Devolver `this.vehiculos` en `obtenerVehiculos()` → rompe encapsulamiento.
- ❌ Decidir "lleno" con `this.vehiculos.length > this.capacidad` → el borde está mal; está lleno cuando `libres === 0`.

### ¿Qué pilares aparecen?
- **Abstracción**: el vehículo solo tiene patente, tipo y tarifa (lo que el estacionamiento necesita).
- **Encapsulamiento**: lista privada, getters, copia defensiva, validaciones.
- **Herencia**: `Auto`, `Moto`, `Camioneta` extienden `Vehiculo`.
- **Polimorfismo**: `calcularCobro()` usa `tarifaPorHora()` de cada hija.
- Extra: **composición**, **static**, **readonly**, **error propio**.

---

➡️ Más práctica de este tema: [material-extra-del-curso/1er-cuatrimestre/tema-01-typescript-y-poo](../../material-extra-del-curso/1er-cuatrimestre/tema-01-typescript-y-poo/) (12 ejercicios más, con soluciones).
