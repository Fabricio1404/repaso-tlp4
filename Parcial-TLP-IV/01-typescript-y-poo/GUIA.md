# 01 · TypeScript y Programación Orientada a Objetos (POO)

> **Objetivo:** que puedas leer una consigna como *"Crear una clase abstracta Empleado con un método abstracto calcularSueldo(), un atributo static que cuente los empleados creados y un getter..."* y saber **exactamente** qué escribir y por qué.

**Contenido**
1. [TypeScript: lo mínimo indispensable](#1-typescript-lo-mínimo-indispensable)
2. [¿Qué es la POO? Clases y objetos](#2-qué-es-la-poo-clases-y-objetos)
3. [Constructor y `this`](#3-constructor-y-this)
4. [Pilar 1 · Abstracción](#4-pilar-1--abstracción)
5. [Pilar 2 · Encapsulamiento (modificadores, getters y setters)](#5-pilar-2--encapsulamiento)
6. [Pilar 3 · Herencia](#6-pilar-3--herencia)
7. [Pilar 4 · Polimorfismo](#7-pilar-4--polimorfismo)
8. [Clases abstractas e interfaces](#8-clases-abstractas-e-interfaces)
9. [`static` y `readonly`](#9-static-y-readonly)
10. [Composición: "tiene un"](#10-composición-tiene-un)
11. [Errores: `throw`, `try/catch` y errores propios](#11-errores)
12. [Copias defensivas](#12-copias-defensivas)
13. [Leer un diagrama UML](#13-leer-un-diagrama-uml)
14. [Diccionario consigna → código y trampas](#14-diccionario-consigna--código)

---

## 1. TypeScript: lo mínimo indispensable

### 1.1 Variables y tipos básicos

```ts
let edad: number = 20;          // números (enteros y decimales, todo es number)
let nombre: string = "Ana";     // texto
let activo: boolean = true;     // verdadero / falso
const PI: number = 3.14;        // const = no se puede reasignar

let notas: number[] = [7, 8, 10];          // arreglo de números
let nombres: Array<string> = ["a", "b"];   // otra forma de escribir lo mismo
```

- `let` → variable que puede cambiar. `const` → no se puede reasignar.
- Muchas veces TypeScript **infiere** el tipo: `let x = 5` ya sabe que es `number`.

### 1.2 Funciones tipadas

```ts
function sumar(a: number, b: number): number {   // tipo de cada parámetro y del resultado
  return a + b;
}

const doble = (n: number): number => n * 2;      // función flecha

function saludar(nombre: string): void {         // void = no devuelve nada
  console.log(`Hola, ${nombre}`);
}

function crearUsuario(nombre: string, edad?: number): string {   // ? = opcional
  return edad === undefined ? nombre : `${nombre} (${edad})`;
}
```

### 1.3 Uniones de literales (lo que reemplaza al `enum`)

Una **unión** dice "puede ser esto **o** esto". Una **unión de literales** limita a valores exactos:

```ts
type Estado = "pendiente" | "enviado" | "entregado";

let e: Estado = "enviado";   // ✅
e = "perdido";               // ❌ Error: no está en la lista
```

En el examen el `enum` está prohibido, así que **siempre** que la consigna diga "tipo puede ser A, B o C" usás una unión de literales.

### 1.4 `interface` y `type` para describir objetos

```ts
interface Producto {
  nombre: string;
  precio: number;
  stock?: number;      // opcional
}

const p: Producto = { nombre: "Mate", precio: 5000 };
```

Una **interface** es un **contrato**: describe qué forma tiene algo, **sin código**.

### 1.5 `any` vs `unknown`

- `any` = "no revises nada". Apaga TypeScript. **Prohibido.**
- `unknown` = "no sé qué es, pero antes de usarlo lo voy a comprobar". Es la opción segura.

```ts
function mostrar(valor: unknown): string {
  if (typeof valor === "number") return valor.toFixed(2);   // acá TS sabe que es number (narrowing)
  return String(valor);
}
```

A esto se le llama **narrowing** (estrechamiento): dentro del `if`, TypeScript deduce un tipo más preciso.

### 1.6 `null` y `undefined` con `strict`

```ts
function buscar(id: number): string | undefined {   // puede devolver un texto o nada
  return id === 1 ? "Ana" : undefined;
}

const r = buscar(2);
console.log(r.toUpperCase());          // ❌ Error: r puede ser undefined
if (r !== undefined) console.log(r.toUpperCase());   // ✅
```

### 1.7 Template literals y métodos de arreglo

```ts
const precio = 1500;
console.log(`Total: $${precio}`);      // "Total: $1500"  ← ojo: $ literal + ${...}

const nums = [1, 2, 3, 4];
nums.map(n => n * 2);                  // [2, 4, 6, 8]       transforma cada uno
nums.filter(n => n % 2 === 0);         // [2, 4]             se queda con los que cumplen
nums.reduce((acc, n) => acc + n, 0);   // 10                 acumula
nums.find(n => n > 2);                 // 3                  el primero que cumple (o undefined)
nums.some(n => n > 3);                 // true               ¿alguno cumple?
nums.every(n => n > 0);                // true               ¿todos cumplen?
nums.forEach(n => console.log(n));     // recorre sin devolver nada
nums.toFixed;                          // (es de number) 1234.5.toFixed(2) → "1234.50"
```

### 1.8 Genéricos (lo justo)

Un genérico es un **tipo como parámetro**. `Array<string>` es un arreglo "de strings".

```ts
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}
primero([1, 2, 3]);       // T = number
primero(["a", "b"]);      // T = string
```

---

## 2. ¿Qué es la POO? Clases y objetos

La **Programación Orientada a Objetos** organiza el programa en **objetos** que combinan **datos** (atributos) y **comportamiento** (métodos).

- Una **clase** es el **molde** (el plano de una casa).
- Un **objeto** (o **instancia**) es una cosa concreta hecha con ese molde (una casa construida).

```ts
class Perro {
  nombre: string;                      // atributo (dato)

  constructor(nombre: string) {        // se ejecuta al hacer "new"
    this.nombre = nombre;
  }

  ladrar(): string {                   // método (comportamiento)
    return `${this.nombre} dice guau`;
  }
}

const firulais = new Perro("Firulais");   // instancia
const toby = new Perro("Toby");           // otra instancia, con sus propios datos
console.log(firulais.ladrar());           // "Firulais dice guau"
```

Cada objeto tiene **su propia copia** de los atributos: cambiar `toby.nombre` no cambia a `firulais`.

---

## 3. Constructor y `this`

- El **constructor** es un método especial que se ejecuta **una sola vez**, al crear el objeto con `new`. Sirve para dejar el objeto en un estado válido.
- `this` significa "**este objeto**", el que se está creando o usando.

### Forma larga (OBLIGATORIA en el primer parcial)

```ts
class Cuenta {
  private titular: string;      // 1. declarar el atributo con su tipo
  private saldo: number;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;     // 2. asignarlo con this
    this.saldo = saldoInicial;
  }
}
```

### Forma corta (parameter properties) — PROHIBIDA con `erasableSyntaxOnly`

```ts
class Cuenta {
  constructor(private titular: string, private saldo: number) {}   // ❌ en el primer parcial
}
```

**¿Por qué está prohibida?** Porque no es solo un tipo: TypeScript tiene que **generar** las líneas `this.titular = titular`. Como no se puede "borrar" sin cambiar el comportamiento, `erasableSyntaxOnly` la rechaza.

### `strictPropertyInitialization`

Con `strict`, si declarás un atributo y no lo asignás en el constructor, da error:

```ts
class X {
  valor: number;            // ❌ "has no initializer and is not definitely assigned"
  constructor() {}
}
```

Solución: asignarlo en el constructor o darle un valor inicial (`valor: number = 0;`).

---

## 4. Pilar 1 · Abstracción

**Abstraer** es quedarse **solo con lo relevante para el problema**. Una persona tiene miles de características, pero en un sistema de biblioteca solo importan `nombre`, `dni` y `librosPrestados`; en un sistema médico, `grupoSanguíneo` y `alergias`.

```ts
// Abstracción de un Producto para una tienda: solo lo que el problema necesita
class Producto {
  nombre: string;
  precio: number;
  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }
  precioConIva(): number {
    return this.precio * 1.21;
  }
}
```

> Pregunta típica: *"Modelar solo lo relevante para el problema"* → **Abstracción**.

---

## 5. Pilar 2 · Encapsulamiento

**Encapsular** es que el objeto **proteja su estado**: los datos no se tocan desde afuera directamente, sino a través de **métodos que validan**.

### 5.1 Modificadores de acceso

| Modificador | ¿Desde la misma clase? | ¿Desde una clase hija? | ¿Desde afuera? |
|---|---|---|---|
| `public` (por defecto) | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |

```ts
class CuentaBancaria {
  private saldo: number;

  constructor(saldoInicial: number) {
    if (saldoInicial < 0) throw new Error("El saldo inicial no puede ser negativo");
    this.saldo = saldoInicial;
  }

  depositar(monto: number): void {
    if (monto <= 0) throw new Error("El monto debe ser positivo");
    this.saldo += monto;
  }

  retirar(monto: number): void {
    if (monto > this.saldo) throw new Error("Saldo insuficiente");
    this.saldo -= monto;
  }

  obtenerSaldo(): number {
    return this.saldo;
  }
}

const c = new CuentaBancaria(1000);
c.saldo = -5000;   // ❌ Error de TS: 'saldo' is private
c.retirar(5000);   // 💥 lanza "Saldo insuficiente" → el objeto se protegió
```

**¿Por qué sirve?** Si `saldo` fuera público, cualquiera podría ponerle un valor absurdo. Al obligar a pasar por `retirar()`, la regla "no podés sacar más de lo que hay" se cumple **siempre**.

> Ojo: `private` de TypeScript solo existe al **revisar**. En JavaScript existe `#saldo` (privado real en ejecución). En el curso se usa `private`.

### 5.2 Getters y setters

Un **getter** es un método que se **lee como si fuera un atributo** (sin paréntesis). Un **setter** se ejecuta al **asignar**.

```ts
class Persona {
  private _edad: number;     // atributo de "respaldo" (con guion bajo)

  constructor(edad: number) {
    this._edad = edad;
  }

  get edad(): number {               // se usa: persona.edad   (sin paréntesis)
    return this._edad;
  }

  set edad(valor: number) {          // se usa: persona.edad = 30
    if (valor < 0) throw new Error("Edad inválida");
    this._edad = valor;
  }
}

const p = new Persona(20);
console.log(p.edad);   // 20      ← llama al getter
p.edad = 30;           // ← llama al setter (valida)
p.edad = -1;           // 💥 Error: Edad inválida
```

**¿Por qué `_edad` y `edad`?** Si el atributo se llamara igual que el getter, dentro del setter `this.edad = valor` se llamaría **a sí mismo infinitamente** (stack overflow). Por eso el dato real se llama `_edad`.

Un getter **sin setter** = propiedad de **solo lectura** desde afuera. Muy común para valores calculados:

```ts
get cantidad(): number { return this.items.length; }
```

---

## 6. Pilar 3 · Herencia

La **herencia** permite que una clase **hija** reutilice y extienda a una clase **padre**. Se lee como "**es un**": un `Gerente` **es un** `Empleado`.

```ts
class Empleado {
  protected nombre: string;            // protected: las hijas lo pueden usar
  protected sueldoBase: number;

  constructor(nombre: string, sueldoBase: number) {
    this.nombre = nombre;
    this.sueldoBase = sueldoBase;
  }

  calcularSueldo(): number {
    return this.sueldoBase;
  }

  describir(): string {
    return `${this.nombre}: $${this.calcularSueldo()}`;
  }
}

class Gerente extends Empleado {          // extends = hereda
  private bono: number;

  constructor(nombre: string, sueldoBase: number, bono: number) {
    super(nombre, sueldoBase);            // 1. SIEMPRE primero: llama al constructor del padre
    this.bono = bono;                     // 2. después, lo propio
  }

  override calcularSueldo(): number {     // redefine (sobrescribe) el método del padre
    return super.calcularSueldo() + this.bono;   // super.metodo() = la versión del padre
  }
}

const g = new Gerente("Lucía", 1000, 500);
console.log(g.describir());   // "Lucía: $1500"   ← describir() es del padre, pero usa el calcularSueldo() de la hija
```

### Reglas que se preguntan

- `super(...)` en el constructor de la hija se llama **antes de usar `this`**. Si no, error.
- Una clase solo puede **extender a una** clase (herencia simple). Pero puede **implementar muchas** interfaces.
- `private` del padre **no** es accesible en la hija → si la hija lo necesita, usá `protected`.
- `override` es una palabra que indica "estoy redefiniendo un método del padre". Ayuda a que TS te avise si te equivocás de nombre.

### Override vs Overload (pregunta típica)

| | Override (sobrescritura) | Overload (sobrecarga) |
|---|---|---|
| Qué es | La **hija redefine** un método heredado con **la misma firma** | **Mismo nombre**, **distintos parámetros** en la misma clase |
| Ejemplo | `Gerente.calcularSueldo()` reemplaza a `Empleado.calcularSueldo()` | `sumar(a, b)` y `sumar(a, b, c)` |
| Relación | Herencia + polimorfismo | Nada que ver con herencia |

---

## 7. Pilar 4 · Polimorfismo

**Polimorfismo** = "muchas formas". El **mismo mensaje** (llamar al mismo método) produce **comportamientos distintos** según el objeto real.

```ts
abstract class Animal {
  abstract hacerSonido(): string;
}
class Perro extends Animal { hacerSonido(): string { return "Guau"; } }
class Gato  extends Animal { hacerSonido(): string { return "Miau"; } }
class Vaca  extends Animal { hacerSonido(): string { return "Muu";  } }

const animales: Animal[] = [new Perro(), new Gato(), new Vaca()];
for (const a of animales) {
  console.log(a.hacerSonido());   // Guau, Miau, Muu  ← mismo llamado, distinto resultado
}
```

### La señal de que usaste bien el polimorfismo: **no hay `if` por tipo**

```ts
// ❌ MAL: preguntar el tipo
function sonido(a: Animal): string {
  if (a instanceof Perro) return "Guau";
  else if (a instanceof Gato) return "Miau";
  else return "Muu";
}
// Cada animal nuevo obliga a modificar este if.

// ✅ BIEN: cada clase sabe responder
function sonido(a: Animal): string {
  return a.hacerSonido();
}
```

Cuando la consigna dice **"sin preguntar el tipo"** o **"sin if por tipo"**, te está pidiendo polimorfismo.

### Polimorfismo dentro de la clase padre (patrón "Template Method")

```ts
abstract class Habitacion {
  protected numero: number;
  constructor(numero: number) { this.numero = numero; }

  abstract precioPorNoche(): number;           // cada hija lo define

  costoEstadia(noches: number): number {       // el padre lo usa SIN saber qué hija es
    return this.precioPorNoche() * noches;
  }
}
class Simple extends Habitacion { precioPorNoche(): number { return 20000; } }
class Suite  extends Habitacion { precioPorNoche(): number { return 50000; } }

new Suite(101).costoEstadia(2);   // 100000
```

---

## 8. Clases abstractas e interfaces

### 8.1 Clase abstracta

- Es un **molde parcial**: tiene atributos, métodos con código **y** métodos `abstract` (sin código).
- **No se puede instanciar**: `new Habitacion(1)` → error.
- Las hijas **deben** implementar los métodos abstractos.

```ts
abstract class Figura {
  protected nombre: string;
  constructor(nombre: string) { this.nombre = nombre; }

  abstract area(): number;                    // sin cuerpo: cada hija lo define

  describir(): string {                       // con cuerpo: se hereda
    return `${this.nombre} con área ${this.area().toFixed(2)}`;
  }
}
```

### 8.2 Interface

- Es un **contrato puro**: solo declara **qué** métodos/propiedades hay, **sin código** y sin estado.
- Una clase la cumple con `implements`.
- Una clase puede implementar **varias** interfaces.

```ts
interface Imprimible {
  imprimir(): string;
}
interface Exportable {
  exportar(formato: "pdf" | "csv"): string;
}

class Factura implements Imprimible, Exportable {
  private total: number;
  constructor(total: number) { this.total = total; }
  imprimir(): string { return `Factura por $${this.total}`; }
  exportar(formato: "pdf" | "csv"): string { return `factura.${formato}`; }
}
```

### 8.3 Comparación (pregunta de opción múltiple segura)

| | Clase abstracta | Interface |
|---|---|---|
| ¿Tiene código? | Sí (métodos implementados) | No, solo declaraciones |
| ¿Tiene estado (atributos con valor)? | Sí | No |
| ¿Constructor? | Sí | No |
| ¿Se instancia? | No | No |
| ¿Cuántas puede usar una clase? | **Una** (`extends`) | **Varias** (`implements`) |
| Relación | "es un" | "puede hacer" / "cumple el contrato" |
| ¿Existe al ejecutar? | Sí (es una clase JS) | No (se borra) |

**¿Cuándo uso cada una?**
- **Abstracta**: cuando las hijas comparten **datos y código** (todas las habitaciones tienen número y calculan la estadía igual).
- **Interface**: cuando clases **sin relación** comparten un **comportamiento** (una Factura y un Informe son "imprimibles").

---

## 9. `static` y `readonly`

### 9.1 `static`: pertenece a la **clase**, no a cada objeto

```ts
class Ticket {
  static totalEmitidos: number = 0;      // UNO solo, compartido por todos
  readonly numero: number;

  constructor() {
    Ticket.totalEmitidos++;              // se accede con el NOMBRE DE LA CLASE
    this.numero = Ticket.totalEmitidos;
  }

  static reiniciar(): void {             // método estático: se llama Ticket.reiniciar()
    Ticket.totalEmitidos = 0;
  }
}

new Ticket(); new Ticket(); new Ticket();
console.log(Ticket.totalEmitidos);   // 3
```

- Frases de consigna: *"de todos"*, *"histórico"*, *"total general"*, *"contador global"* → `static`.
- Se accede con `NombreClase.atributo`, **no** con `this.atributo` (aunque estés en un método de instancia).

### 9.2 `readonly`: se asigna una vez

```ts
class Socio {
  readonly dni: string;
  constructor(dni: string) { this.dni = dni; }   // ✅ en el constructor sí
}
const s = new Socio("123");
s.dni = "999";   // ❌ Error: es readonly
```

**Trampa:** `readonly items: string[]` impide **reasignar** el arreglo (`this.items = []`), pero **sí permite** `this.items.push("x")`. Protege la variable, no el contenido.

---

## 10. Composición: "tiene un"

**Composición** = un objeto **contiene** a otros y **delega** en ellos. "Un Auto **tiene un** Motor".

```ts
class Motor {
  private encendido: boolean = false;
  arrancar(): string { this.encendido = true; return "Motor en marcha"; }
}

class Auto {
  private motor: Motor;                   // el Auto TIENE un Motor
  constructor() { this.motor = new Motor(); }
  arrancar(): string { return this.motor.arrancar(); }   // delega
}
```

| | Herencia | Composición |
|---|---|---|
| Relación | "es un" | "tiene un" |
| Acoplamiento | Fuerte (la hija depende del padre) | Débil |
| Flexibilidad | Se decide al escribir | Se puede cambiar la pieza |

> Consejo clásico: **"preferí composición sobre herencia"**. Usá herencia solo cuando realmente "es un".

---

## 11. Errores

### 11.1 `throw` y `try/catch`

```ts
function dividir(a: number, b: number): number {
  if (b === 0) throw new Error("No se puede dividir por cero");   // lanza: corta la ejecución
  return a / b;
}

try {
  dividir(10, 0);
} catch (e) {                                // e es unknown
  if (e instanceof Error) console.log(e.message);   // "No se puede dividir por cero"
} finally {
  console.log("Esto se ejecuta siempre");
}
```

### 11.2 Errores nativos útiles

| Error | Cuándo |
|---|---|
| `Error` | Genérico |
| `RangeError` | Un número fuera de rango (descuento 150 %) |
| `TypeError` | Un valor del tipo equivocado |

### 11.3 Errores propios

```ts
class SaldoInsuficienteError extends Error {
  constructor(mensaje: string) {
    super(mensaje);                          // pasa el mensaje a Error
    this.name = "SaldoInsuficienteError";
  }
}

try {
  throw new SaldoInsuficienteError("Faltan $500");
} catch (e) {
  if (e instanceof SaldoInsuficienteError) console.log("Saldo:", e.message);
}
```

**¿Para qué?** Para poder **distinguir** errores con `instanceof` (en el segundo cuatrimestre, el middleware de Express traduce `NoEncontradoError` a 404 y `ValidacionError` a 400).

### 11.4 Validar en el constructor

Si los datos son inválidos, el objeto **no debe existir**:

```ts
constructor(precio: number) {
  if (precio < 0) throw new RangeError("El precio no puede ser negativo");
  this.precio = precio;
}
```

---

## 12. Copias defensivas

Si un método devuelve **el arreglo interno**, quien lo recibe puede modificarlo y **romper el encapsulamiento**:

```ts
class Biblioteca {
  private libros: string[] = [];

  agregar(libro: string): void { this.libros.push(libro); }

  obtenerLibrosMAL(): string[] {
    return this.libros;            // ❌ entrega la referencia real
  }
  obtenerLibros(): string[] {
    return [...this.libros];       // ✅ devuelve una COPIA
  }
}

const b = new Biblioteca();
b.agregar("Rayuela");
b.obtenerLibrosMAL().push("libro trucho");   // ¡modificó el interior sin pasar por agregar()!
b.obtenerLibros().push("otro");               // modifica solo la copia, el interior está a salvo
```

- `[...arreglo]` → copia de un arreglo.
- `{ ...objeto }` → copia de un objeto.

---

## 13. Leer un diagrama UML

```
┌───────────────────────────┐
│    <<abstract>>           │
│    Empleado               │   ← nombre en cursiva o <<abstract>> = clase abstracta
├───────────────────────────┤
│ - nombre: string          │   ← "-" private
│ # sueldoBase: number      │   ← "#" protected
│ + {static} total: number  │   ← "+" public, subrayado o {static} = static
├───────────────────────────┤
│ + calcularSueldo(): number│   ← en cursiva = abstracto
│ + describir(): string     │
└───────────────────────────┘
          ▲
          │  (flecha con triángulo vacío, línea llena) = HERENCIA (extends)
┌─────────┴─────┐
│   Gerente     │
└───────────────┘

Línea punteada con triángulo vacío  ─ ─ ─▷  = IMPLEMENTA una interface
Rombo lleno   ◆────   = COMPOSICIÓN (la parte no existe sin el todo)
Rombo vacío   ◇────   = AGREGACIÓN (la parte puede existir sola)
Flecha simple ────>   = ASOCIACIÓN / usa
```

---

## 14. Diccionario consigna → código

| La consigna dice... | Escribís... |
|---|---|
| "clase abstracta X" / "no se puede crear un X genérico" | `abstract class X` |
| "cada tipo **debe** definir y()" | `abstract y(): T;` |
| "no cambia nunca", "se asigna al crear" | `readonly` |
| "solo se modifica mediante...", "privado" | `private` + método que valida |
| "visible para las subclases" | `protected` |
| "contador de todos", "histórico", "total general" | `static` + `Clase.atributo` |
| "se lee sin paréntesis", "getter" | `get nombre(): T` |
| "validar al asignar", "setter" | `set nombre(v: T)` + atributo `_nombre` |
| "sin preguntar el tipo", "sin if por tipo" | Polimorfismo: método redefinido en cada hija |
| "es un" | `extends` |
| "tiene un", "está compuesto por" | Composición: atributo del otro tipo |
| "puede hacer", "cumple el contrato" | `interface` + `implements` |
| "tipo puede ser A, B o C" | `type T = "A" \| "B" \| "C"` (nunca `enum`) |
| "lanzar error si..." | `throw new Error("...")` (o `RangeError`) |
| "devolver el historial sin exponerlo" | `return [...this.historial]` |

### Trampas frecuentes

1. Escribir el texto de salida distinto al pedido (`Habitacion` vs `Habitación`). **Copiá los textos de la consigna.**
2. Usar `this.total` para un `static` → es `Clase.total`.
3. Olvidar `super(...)` o ponerlo después de usar `this`.
4. Atributo `private` en el padre que la hija necesita → `protected`.
5. Usar parameter properties o `enum` → prohibidos.
6. Devolver el arreglo interno → copia defensiva.
7. Getter y atributo con el mismo nombre → recursión infinita.
8. Olvidar el **bloque de prueba** al final del archivo.

---

## 📌 Lo que tenés que saber sí o sí

- **Clase** = molde; **objeto** = instancia hecha con `new`.
- **4 pilares**: Abstracción (solo lo relevante), Encapsulamiento (proteger el estado), Herencia ("es un", `extends`), Polimorfismo (mismo mensaje, distinto comportamiento, sin `if` por tipo).
- `private` (solo la clase) · `protected` (clase + hijas) · `public` (todos).
- **Abstracta**: tiene código y estado, no se instancia, se extiende **una**. **Interface**: solo contrato, se implementan **varias**.
- `static` = de la clase (se accede `Clase.x`); `readonly` = se asigna una vez.
- **Override** = hija redefine misma firma. **Overload** = mismo nombre, distintos parámetros.
- **Composición** = "tiene un"; preferible a la herencia.
- Constructor **largo**, sin `enum`, sin `any`, bloque de prueba al final.

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
