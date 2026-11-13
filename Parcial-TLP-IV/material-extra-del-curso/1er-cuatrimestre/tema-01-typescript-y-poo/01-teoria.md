# Tema 1 · TypeScript y Programación Orientada a Objetos (POO)

> **Objetivo del tema:** poder modelar un problema con clases, elegir bien qué es `private`, `protected`, `readonly` o `static`, usar herencia y polimorfismo sin preguntar el tipo de cada objeto, y escribirlo en TypeScript estricto respetando las reglas del examen.

Índice:
1. [TypeScript: lo mínimo indispensable](#1-typescript-lo-mínimo-indispensable)
2. [Clases, objetos, constructor y `this`](#2-clases-objetos-constructor-y-this)
3. [Pilar 1: Abstracción](#3-pilar-1-abstracción)
4. [Pilar 2: Encapsulamiento](#4-pilar-2-encapsulamiento)
5. [Getters y setters](#5-getters-y-setters)
6. [Pilar 3: Herencia](#6-pilar-3-herencia)
7. [Pilar 4: Polimorfismo](#7-pilar-4-polimorfismo)
8. [Clases abstractas e interfaces](#8-clases-abstractas-e-interfaces)
9. [`static` y `readonly`](#9-static-y-readonly)
10. [Relaciones entre clases: herencia vs. composición](#10-relaciones-entre-clases-herencia-vs-composición)
11. [Errores: `throw`, `try/catch` y errores propios](#11-errores-throw-trycatch-y-errores-propios)
12. [Copias defensivas](#12-copias-defensivas)
13. [Leer un diagrama UML de clases](#13-leer-un-diagrama-uml-de-clases)
14. [Reglas del examen y trampas frecuentes](#14-reglas-del-examen-y-trampas-frecuentes)

---

## 1. TypeScript: lo mínimo indispensable

**TypeScript = JavaScript + tipos.** Los tipos existen solo mientras escribís y verificás (`npx tsc`). Cuando se ejecuta, los tipos se borran y queda JavaScript común. Por eso:

- **Tipado estático:** los errores de tipo se detectan *antes* de ejecutar.
- **Los tipos no existen en ejecución:** no podés preguntar `if (x instanceof MiInterfaz)`; las interfaces desaparecen. Sí podés usar `instanceof` con **clases**, porque las clases existen en JavaScript.

### 1.1 Tipos básicos

```ts
let nombre: string = "Ana";
let edad: number = 30;           // no hay int/float: todo es number
let activo: boolean = true;
let nada: null = null;
let sinDefinir: undefined = undefined;

let notas: number[] = [7, 8, 10];          // arreglo de números
let nombres: Array<string> = ["a", "b"];  // misma cosa, otra sintaxis
let par: [string, number] = ["Ana", 30];   // tupla: largo y tipos fijos por posición
```

**Inferencia:** si asignás al declarar, TypeScript deduce el tipo. `let x = 5;` ya es `number`. Igual es buena práctica tipar los **parámetros** y el **retorno** de las funciones y métodos, porque ahí la inferencia no alcanza (y en `strict` un parámetro sin tipo es error).

### 1.2 Funciones tipadas

```ts
function sumar(a: number, b: number): number {
  return a + b;
}

function saludar(nombre: string, titulo?: string): string { // ? = parámetro opcional
  return titulo ? `${titulo} ${nombre}` : nombre;
}

function log(mensaje: string): void {   // void: no devuelve nada útil
  console.log(mensaje);
}

function fallar(mensaje: string): never { // never: nunca termina normalmente
  throw new Error(mensaje);
}

const doble = (n: number): number => n * 2; // función flecha
```

### 1.3 Uniones, literales y alias

```ts
let id: string | number;                       // unión: puede ser una cosa u otra
type Estado = "disponible" | "prestado";       // tipo literal: SOLO esos textos
let e: Estado = "disponible";
// e = "roto";  ❌ error: "roto" no es asignable a Estado
```

**Muy importante para el examen:** como `enum` está **prohibido**, la forma de representar "un conjunto fijo de opciones" es con una **unión de literales** (`"Notebook" | "Desktop" | "Servidor"`). TypeScript detecta un valor mal escrito al compilar, que es justo lo que te daría un `enum`.

```ts
type TipoEquipo = "Notebook" | "Desktop" | "Servidor";
// Si querés también la lista en ejecución:
const TIPOS: TipoEquipo[] = ["Notebook", "Desktop", "Servidor"];
```

### 1.4 `interface` y `type` para objetos

```ts
interface Persona {
  nombre: string;
  edad: number;
  email?: string;          // opcional
  readonly dni: string;    // no se puede reasignar
}

type Punto = { x: number; y: number };
```

Ambos describen la **forma** de un objeto. Regla práctica: `interface` para contratos de objetos y clases (`implements`), `type` para uniones y alias.

### 1.5 `any` vs. `unknown` (y por qué `any` está prohibido)

- `any` **apaga** el chequeo de tipos: todo vale. Es como no usar TypeScript. **Prohibido en el examen.**
- `unknown` es "no sé qué es, pero **antes de usarlo tengo que comprobarlo**". Es la versión segura.

```ts
function procesar(dato: unknown): string {
  if (typeof dato === "string") return dato.toUpperCase(); // acá TS ya sabe que es string
  if (typeof dato === "number") return dato.toFixed(2);
  return "desconocido";
}
```

Eso que hace TS dentro de cada `if` se llama **estrechamiento de tipos (narrowing)**. Se logra con `typeof` (primitivos), `instanceof` (clases), `in` (propiedad existe) o comparando con `undefined`/`null`.

```ts
try {
  // ...
} catch (e) {                 // en strict, e es unknown
  if (e instanceof Error) {   // narrowing → ahora es Error
    console.log(e.message);
  }
}
```

### 1.6 `null` / `undefined` con `strict`

Con `strictNullChecks` (parte de `strict`), `string` **no** incluye `undefined`. Si algo puede no estar, se dice explícitamente:

```ts
function buscar(id: number): Producto | undefined { /* ... */ }

const p = buscar(3);
// p.nombre;              ❌ error: p puede ser undefined
if (p !== undefined) {
  console.log(p.nombre);  // ✅
}
console.log(p?.nombre);    // ✅ encadenamiento opcional: undefined si p es undefined
const nombre = p?.nombre ?? "sin nombre"; // ?? = valor por defecto si es null/undefined
```

### 1.7 Template literals y métodos de arreglo que vas a usar siempre

```ts
`Hola ${nombre}, tenés ${edad} años`   // interpolación
`$${precio}`                           // el primer $ es literal, ${precio} interpola → "$1500"
```

| Método | Para qué | Ejemplo |
|---|---|---|
| `push` | Agrega al final (modifica el arreglo) | `lista.push(x)` |
| `map` | Transforma cada elemento → arreglo nuevo | `nums.map(n => n * 2)` |
| `filter` | Se queda con los que cumplen | `prods.filter(p => p.stock > 0)` |
| `find` | El primero que cumple o `undefined` | `prods.find(p => p.id === 3)` |
| `findIndex` | Índice del primero que cumple o `-1` | |
| `some` / `every` | ¿Alguno / todos cumplen? → `boolean` | `lista.some(x => x.id === id)` |
| `reduce` | Acumula a un solo valor | `nums.reduce((acc, n) => acc + n, 0)` |
| `includes` | ¿Contiene el valor? | `permisos.includes("libro:read")` |
| `[...arr]` | Copia superficial | `return [...this.items]` |

La guía de la cátedra usa mucho el `for` clásico (`for (let i = 0; i < arr.length; i++)`). Las dos formas son válidas; usá la que entiendas mejor.

### 1.8 Genéricos (lo justo)

Un **genérico** es un "tipo como parámetro". Ya los usaste: `Array<string>`, `Promise<void>`.

```ts
function primero<T>(lista: T[]): T | undefined {   // T se deduce al llamar
  return lista[0];
}
const n = primero([1, 2, 3]);        // n: number | undefined
const s = primero(["a", "b"]);       // s: string | undefined

// Con restricción: T tiene que tener al menos un id
function buscarPorId<T extends { id: string }>(lista: T[], id: string): T | undefined {
  return lista.find((x) => x.id === id);   // se puede usar x.id gracias al "extends"
}
```

Ventaja: el resultado conserva el tipo exacto de lo que entró (no se "pierde" información como pasaría con `any` o con un tipo más general). En el segundo cuatrimestre los vas a ver en `Promise<Libro[]>`, `Request<...>` de Express y los modelos de Sequelize.

---

## 2. Clases, objetos, constructor y `this`

- **Clase:** el **molde**. Describe qué datos (atributos) y qué comportamiento (métodos) tendrá cada objeto.
- **Objeto / instancia:** cada cosa concreta creada con `new` a partir del molde.
- **Atributo (propiedad):** dato que guarda cada objeto.
- **Método:** función que pertenece a la clase y trabaja con los datos del objeto.
- **Constructor:** método especial que se ejecuta al hacer `new`. Inicializa los atributos.
- **`this`:** "el objeto actual". Dentro de un método, `this.precio` es el precio **de este** objeto.

```ts
class Producto {
  nombre: string;          // 1) se DECLARA el atributo con su tipo
  precio: number;

  constructor(nombre: string, precio: number) {
    this.nombre = nombre;  // 2) se ASIGNA con this.  ← "constructor en forma larga"
    this.precio = precio;
  }

  describir(): string {
    return `${this.nombre}: $${this.precio}`;
  }
}

const p1 = new Producto("Teclado", 10000);   // instancia 1
const p2 = new Producto("Mouse", 5000);      // instancia 2 (otros datos, mismo molde)
console.log(p1.describir());                 // Teclado: $10000
```

### Forma larga vs. parameter properties (regla del examen)

```ts
// ❌ PROHIBIDO en el primer cuatrimestre (parameter properties)
class Producto {
  constructor(private nombre: string, public precio: number) {}
}

// ✅ OBLIGATORIO: forma larga
class Producto {
  private nombre: string;
  precio: number;
  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }
}
```

¿Por qué? Con `erasableSyntaxOnly`, TypeScript solo acepta sintaxis que se pueda **borrar**. Un parameter property genera código (`this.nombre = nombre`) que no está escrito: no se puede borrar, hay que *transformar*. Node, al ejecutar `.ts`, solo borra tipos.

### `strictPropertyInitialization`

Con `strict`, si declarás un atributo y **no** lo asignás en el constructor, `tsc` da error:

```ts
class Malo {
  nombre: string;          // ❌ Property 'nombre' has no initializer...
  constructor() {}
}
```

Soluciones: asignarlo en el constructor, darle un valor inicial (`nombre: string = "";`) o declararlo opcional (`nombre?: string`).

---

## 3. Pilar 1: Abstracción

> **Abstraer es quedarse solo con lo que importa para el problema y descartar el resto.**

Una persona tiene color de ojos, altura, DNI, comida favorita... Pero si el sistema es de un **banco**, el modelo `Cliente` solo necesita DNI, nombre y cuentas. El color de ojos no aporta nada: se abstrae (se deja afuera).

En código, la abstracción se ve en **qué atributos y métodos elegís** poner en la clase:

```ts
class Producto {
  nombre: string;       // ┐
  precio: number;       // │ ABSTRACCIÓN: solo los datos que importan para VENDER
  categoria: string;    // │ (no hay "colorDelEmbalaje" ni "proveedorDelCartón")
  stock: number;        // ┘

  hayStock(cantidad: number): boolean { ... }       // ┐ ABSTRACCIÓN: solo las
  venderUnidades(cantidad: number): void { ... }    // ┘ operaciones del negocio
}
```

También es abstracción **ocultar el "cómo"** detrás de un nombre claro: quien llama a `venderUnidades(3)` no necesita saber cómo se descuenta el stock ni qué validaciones hay. Usa la operación por su nombre.

Niveles de abstracción en TypeScript (de menor a mayor):
1. Una **clase** concreta (elige atributos y métodos relevantes).
2. Una **clase abstracta** (molde parcial: dice "toda Habitación calcula su precio", sin decir cómo).
3. Una **interface** (contrato puro: "todo lo que sea `Pagable` tiene `pagar()`").

> **Diferencia con encapsulamiento (pregunta típica):** abstracción = **qué** muestro y modelo (lo relevante). Encapsulamiento = **cómo protejo** el estado (nadie lo toca sin pasar por mis métodos).

---

## 4. Pilar 2: Encapsulamiento

> **El objeto protege su propio estado: desde afuera solo se puede modificar a través de sus métodos, que validan.**

Sin encapsulamiento, cualquiera puede romper el objeto:

```ts
cuenta.saldo = -999999;   // nadie validó nada
```

Con encapsulamiento:

```ts
class CuentaBancaria {
  private saldo: number;      // nadie de afuera puede leerlo ni escribirlo directo

  retirar(monto: number): void {
    if (monto <= 0) throw new Error("El monto a retirar debe ser mayor a 0");
    if (monto > this.saldo) throw new Error("Saldo insuficiente");
    this.saldo = this.saldo - monto;   // ← el único camino para cambiar el saldo
  }

  consultarSaldo(): number {           // ← lectura controlada
    return this.saldo;
  }
}
```

### Modificadores de acceso

| Modificador | ¿Quién lo ve? | Uso típico |
|---|---|---|
| `public` (por defecto) | Todos | Operaciones que ofrece el objeto |
| `private` | **Solo la propia clase** | Estado interno, listas internas, helpers |
| `protected` | La clase **y sus hijas** | Datos que las subclases necesitan (ej. `nombre` en `Empleado`) |
| `readonly` | Se puede leer, pero se asigna **una sola vez** (al declarar o en el constructor) | Identificadores: `dni`, `numero`, `id`, `titular` |
| `#campo` | Privado **real de JavaScript** (también en ejecución) | Alternativa a `private` (que solo existe para TS) |

Combinaciones válidas: `private readonly dni: string;`, `protected readonly id: number;`, `static readonly IVA = 0.21;`.

> **Detalle fino:** `private` de TypeScript se borra al ejecutar (en JS es una propiedad normal). Protege **en tiempo de compilación**. `#privado` protege también en ejecución. Para el examen alcanza con `private`.

### Reglas prácticas de encapsulamiento
1. Atributos con regla de negocio → `private` + métodos que validen.
2. **Validar antes de modificar**: si la validación falla, el objeto queda igual que antes (nunca "a medias").
3. **Nunca devolver la referencia a una lista interna** → devolver una copia (`[...this.lista]`). Ver sección 12.
4. Lanzar `Error` en vez de `console.log` cuando algo es inválido: quien llama no puede ignorarlo.

---

## 5. Getters y setters

Un **getter** (`get`) se lee como si fuera un atributo, pero ejecuta código. Un **setter** (`set`) se asigna como un atributo, pero ejecuta código (por ejemplo, una validación).

```ts
class Persona {
  private _edad: number;

  constructor(edad: number) {
    this._edad = 0;
    this.edad = edad;            // ← pasa por el setter: valida también al crear
  }

  get edad(): number {           // lectura: p.edad
    return this._edad;
  }

  set edad(valor: number) {      // escritura: p.edad = 17
    if (valor < 0 || valor > 120) throw new Error("Edad inválida");
    this._edad = valor;
  }

  get esMayorDeEdad(): boolean { // getter CALCULADO, sin setter: solo lectura
    return this._edad >= 18;
  }
}

const p = new Persona(25);
p.edad = 17;                 // llama al setter (sin paréntesis)
console.log(p.esMayorDeEdad);// llama al getter (sin paréntesis) → false
// p.esMayorDeEdad = true;   ❌ no hay setter → error de compilación
```

Puntos clave:
- El atributo real se llama distinto (`_edad`) que el getter/setter (`edad`). **Si se llamaran igual, el setter se llamaría a sí mismo infinitamente** (stack overflow).
- En el constructor se asigna con `this.edad = edad` (el setter) para que la validación corra **también al crear** el objeto. Antes hay que inicializar `this._edad = 0` para que `strict` no se queje.
- Un getter **sin setter** = propiedad de solo lectura calculada. Nunca queda desactualizada porque se calcula al leerla.
- **Getter/setter sin regla = burocracia.** Si el setter solo copia el valor sin validar, da lo mismo que una propiedad pública. Usalos cuando haya una regla o un cálculo.
- Getter vs. método: el getter es para algo que *se siente* un dato (`cantidad`, `area`, `esMayorDeEdad`). Un método es para una acción o algo que recibe parámetros (`calcularPrecio(noches)`).

---

## 6. Pilar 3: Herencia

> **Una clase hija (subclase) toma los atributos y métodos de una clase padre (superclase) y puede agregar o redefinir.** Representa una relación **"es un"**: un `EmpleadoFijo` **es un** `Empleado`.

```ts
class Empleado {
  protected nombre: string;        // protected: las hijas lo pueden leer
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  calcularSueldo(): number {
    return 0;
  }

  describir(): string {
    return `${this.nombre} — sueldo: $${this.calcularSueldo()}`;
  }
}

class EmpleadoFijo extends Empleado {          // extends = hereda
  private sueldoBase: number;                  // atributo NUEVO, propio de la hija

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    super(nombre, antiguedad);                 // 1° SIEMPRE: inicializa la parte del padre
    this.sueldoBase = sueldoBase;              // 2° recién ahora se puede usar this
  }

  override calcularSueldo(): number {          // REDEFINE (sobrescribe) el método del padre
    return this.sueldoBase + this.sueldoBase * 0.02 * this.antiguedad;
  }
}
```

### Lo que tenés que saber

- `extends`: una clase hereda de **una sola** clase (herencia simple).
- `super(...)` en el constructor: **obligatorio** si la hija tiene constructor, y **antes de usar `this`**. Si no, error: *"'super' must be called before accessing 'this'"*.
- Si la hija **no** declara constructor, usa automáticamente el del padre (por eso `class Simple extends Habitacion { calcularPrecio... }` no necesita constructor).
- `super.metodo()` llama a la versión del padre desde la hija:
  ```ts
  override describir(): string {
    return super.describir() + " (fijo)";
  }
  ```
- `protected` vs. `private` en herencia: si `nombre` fuera `private` en `Empleado`, `EmpleadoFijo` **no** podría leer `this.nombre` → error de compilación.
- `override`: palabra clave **opcional** que deja claro que redefinís un método heredado. Si te equivocás en el nombre (`calcularSueldoo`), TS te avisa porque no hay nada que sobrescribir.

### Override vs. overload (pregunta típica)

| | Override (sobrescritura) | Overload (sobrecarga) |
|---|---|---|
| Dónde | En la **subclase** | En la **misma clase** |
| Qué | Redefine un método heredado con la **misma firma** | Declara **varias firmas** del mismo nombre |
| Ejemplo | `EmpleadoFijo.calcularSueldo()` reemplaza a `Empleado.calcularSueldo()` | `crear(tipo: "a"): A; crear(tipo: "b"): B;` |

---

## 7. Pilar 4: Polimorfismo

> **"Muchas formas": el mismo mensaje (llamada a método) produce comportamientos distintos según el objeto real que lo recibe.**

```ts
const equipo: Empleado[] = [
  new EmpleadoFijo("Juan", 3, 100000),
  new EmpleadoPorHoras("Marta", 1, 80, 2500),
  new EmpleadoPorComision("Pedro", 2, 500000, 0.1),
];

function calcularNomina(empleados: Empleado[]): number {
  let total = 0;
  for (let i = 0; i < empleados.length; i++) {
    total = total + empleados[i].calcularSueldo();   // ← POLIMORFISMO
  }
  return total;
}
```

`empleados[i].calcularSueldo()` es **la misma línea** para los tres, pero cada uno ejecuta **su propia versión**. JavaScript decide en **ejecución** qué método correr según el objeto real (esto se llama *despacho dinámico* o *enlace tardío*).

### La señal de que usaste bien el polimorfismo
**No hay ningún `if` / `switch` preguntando el tipo:**

```ts
// ❌ SIN polimorfismo (mal)
if (e instanceof EmpleadoFijo) total += e.sueldoBase...
else if (e instanceof EmpleadoPorHoras) total += e.horas * e.valor...

// ✅ CON polimorfismo
total += e.calcularSueldo();
```

Si mañana aparece `EmpleadoPasante`, con polimorfismo **no se toca** `calcularNomina`: se agrega una clase. (Esto es exactamente el principio **OCP** del tema 3.)

### Polimorfismo también dentro de la clase padre
En `Empleado.describir()` se llama a `this.calcularSueldo()`. Aunque `describir` está escrito en el padre, `this` es el objeto real (un `EmpleadoFijo`, por ejemplo), así que se ejecuta la versión de la hija. Se escribe una vez y sirve para todos.

### Polimorfismo con interfaces
No hace falta herencia. Si `Factura` y `Sueldo` implementan `Pagable`, un `Pagable[]` puede tener ambos y se recorre igual: `p.monto()`.

---

## 8. Clases abstractas e interfaces

### Clase abstracta

```ts
abstract class Habitacion {
  readonly numero: number;                          // puede tener ESTADO
  constructor(numero: number) { this.numero = numero; }

  abstract calcularPrecio(noches: number): number;  // método SIN cuerpo: las hijas
                                                    // están OBLIGADAS a escribirlo
  describir(): string {                             // puede tener métodos CON código
    return `Habitación ${this.numero}`;
  }
}

// new Habitacion(1);   ❌ error: no se puede instanciar una clase abstracta

class Suite extends Habitacion {
  calcularPrecio(noches: number): number { return 50000 * noches; }
}
```

- Es un **molde parcial**: tiene lo común ya implementado y deja "huecos" (métodos `abstract`) que cada hija completa.
- **No se puede instanciar** con `new`.
- Si una hija no implementa un método abstracto → error de compilación. TypeScript te obliga a cumplir.
- Es mejor que el `calcularSueldo() { return 0; }` del ejemplo de empleados: ese `0` es un valor inventado; con `abstract` es imposible olvidarse de redefinirlo.

### Interface

```ts
interface Pagable {
  monto(): number;
  descripcion: string;
}

class Factura implements Pagable {      // implements = "me comprometo a cumplir el contrato"
  descripcion: string;
  private importe: number;
  constructor(descripcion: string, importe: number) {
    this.descripcion = descripcion;
    this.importe = importe;
  }
  monto(): number { return this.importe; }
}
```

- Es un **contrato puro**: dice **qué** métodos y propiedades hay, sin código ni estado.
- Una clase puede implementar **varias** interfaces (`implements Printer, Scanner, Fax`).
- Desaparece al ejecutar (no hay `instanceof Pagable`).
- También sirve para tipar objetos literales: `const e: Equipo = { nombre: "x", tipo: "y", estado: "z" }`.

### Comparación (pregunta típica de múltiple opción)

| | Clase abstracta | Interface |
|---|---|---|
| ¿Tiene código? | Sí, puede tener métodos implementados | No, solo firmas |
| ¿Tiene estado (atributos con valor)? | Sí | No (solo declara propiedades) |
| ¿Constructor? | Sí | No |
| ¿Cuántas puede usar una clase? | **Una** (`extends`) | **Varias** (`implements A, B`) |
| ¿Se instancia? | No | No |
| ¿Existe en ejecución? | Sí (es una clase de JS) | No |
| ¿Cuándo? | Hay código o datos comunes que compartir ("es un") | Solo querés garantizar capacidades ("puede hacer") |

---

## 9. `static` y `readonly`

### `static`: pertenece a la **clase**, no a cada objeto

```ts
class Hotel {
  static totalCheckIns: number = 0;    // UN solo contador para toda la clase
  private habitaciones: Habitacion[];

  checkIn(h: Habitacion): void {
    this.habitaciones.push(h);
    Hotel.totalCheckIns++;             // se accede con el NOMBRE DE LA CLASE, no con this
  }
}

console.log(Hotel.totalCheckIns);      // sin new: es de la clase
```

- Se accede como `Clase.miembro`. Dentro de un método de instancia también: `Hotel.totalCheckIns`, **no** `this.totalCheckIns`.
- Usos: contadores globales, constantes de la clase, métodos utilitarios que no dependen de un objeto (`FabricaEnvios.crear(...)`), y la instancia del **Singleton** (tema 2).
- Un método `static` no tiene `this` de instancia: no puede leer atributos de un objeto.

**Static vs. getter de instancia (caso del parcial):** `Hotel.totalCheckIns` cuenta **todos los check-ins de la historia** (a nivel clase). El getter `hotel.cantidad` mide **cuántas habitaciones hay ahora** en *ese* hotel. Son cosas distintas.

### `readonly`: se asigna una vez

```ts
class Habitacion {
  readonly numero: number;
  constructor(numero: number) { this.numero = numero; }   // ✅ en el constructor sí
  cambiar(): void { /* this.numero = 5; ❌ error */ }
}
```

- Se puede asignar **al declarar** o **en el constructor**. Después, nunca más.
- `readonly` en un arreglo protege la **referencia**, no el contenido: `readonly items: string[]` permite `this.items.push(...)`. Para proteger el contenido: `readonly items: readonly string[]` o `ReadonlyArray<string>`.

---

## 10. Relaciones entre clases: herencia vs. composición

| Relación | Pregunta | En código | Ejemplo |
|---|---|---|---|
| **Herencia** | ¿"**es un**"? | `class B extends A` | `Suite` es una `Habitacion` |
| **Composición** | ¿"**tiene un**" y no vive sin él? | Atributo creado/poseído por la clase | `Pedido` tiene `ItemPedido`s |
| **Agregación** | ¿"tiene un" pero vive por separado? | Atributo que se recibe de afuera | `Equipo` tiene `Jugador`es (existen solos) |
| **Asociación / uso** | ¿"usa un"? | Parámetro de un método | `Hotel.checkIn(habitacion)` |

> **"Preferí composición sobre herencia".** La herencia acopla fuerte (un cambio en el padre afecta a todas las hijas) y solo se puede heredar de una clase. La composición arma objetos a partir de otros objetos y es más flexible. Usá herencia solo cuando la relación "es un" se cumple **también en comportamiento** (ver LSP en el tema 3: el cuadrado *es* un rectángulo en matemática, pero no en código).

Ejemplo de composición (el `UserRegistrationService` del tema 3):

```ts
class UserRegistrationService {
  private validator: UserValidator;      // ┐ TIENE un validador,
  private repository: UserRepository;    // │ un repositorio
  private emailService: EmailService;    // ┘ y un servicio de mail
  // ... y coordina: no hace el trabajo, delega
}
```

---

## 11. Errores: `throw`, `try/catch` y errores propios

```ts
function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error("No se puede dividir por cero");   // corta la ejecución
  }
  return a / b;
}

try {
  dividir(10, 0);
  console.log("esto no se imprime");
} catch (e) {
  if (e instanceof Error) {
    console.log(`Error: ${e.message}`);      // Error: No se puede dividir por cero
  }
}
```

**¿Por qué `throw` y no `console.log`?** Un mensaje por consola se pierde y el programa sigue como si nada. Un error **obliga** a quien llama a enterarse (o el programa se detiene).

### Tipos de error nativos útiles
- `Error`: genérico.
- `RangeError`: el dato es del tipo correcto pero **fuera de rango** (descuento de 150 %, edad −3). Lo usa la cátedra en el segundo cuatrimestre.
- `TypeError`: tipo incorrecto.

### Errores propios (clases que extienden `Error`)

```ts
class SaldoInsuficienteError extends Error {
  constructor(mensaje: string) {
    super(mensaje);                        // Error recibe el mensaje
    this.name = "SaldoInsuficienteError";  // aparece en el stack y en console.log
  }
}

try { /* ... */ } catch (e) {
  if (e instanceof SaldoInsuficienteError) { /* manejo específico */ }
}
```

Esto es exactamente lo que hace `errors.ts` en el parcial de la Biblioteca (`ValidacionError`, `NoEncontradoError`, `EjemplaresInsuficientesError`): cada tipo de error se traduce después a un código HTTP distinto.

### Validar en el constructor
Si un objeto nunca debería existir en estado inválido, validá **en el constructor** y lanzá error. Así es imposible crear un `Partido` con equipos iguales (práctica del Torneo).

---

## 12. Copias defensivas

En JavaScript los arreglos y objetos se pasan **por referencia**. Si devolvés tu arreglo privado, quien lo recibe puede modificarlo y romper tu encapsulamiento:

```ts
class Cuenta {
  private historial: string[] = [];

  obtenerHistorialMAL(): string[] {
    return this.historial;          // ❌ entrega la referencia real
  }
  obtenerHistorial(): string[] {
    return [...this.historial];     // ✅ copia: un arreglo nuevo con los mismos elementos
  }
}

const h = cuenta.obtenerHistorialMAL();
h.push("depósito falso: +1000000");   // ← modificó el historial REAL de la cuenta
```

- `[...arr]` copia un arreglo. `{ ...obj }` copia un objeto. Ambas son **copias superficiales** (si adentro hay objetos, esos objetos se comparten).
- Para una copia profunda de objetos simples: `arr.map(o => ({ ...o }))` (es lo que hace `LibroRepositoryEnMemoria` en el parcial 2).
- `private` en el atributo **no alcanza**: protege el nombre, no el contenido que entregás.

---

## 13. Leer un diagrama UML de clases

```
┌────────────────────────────┐
│        «abstract»          │
│        Habitacion          │
├────────────────────────────┤
│ + numero: number {readOnly}│   + public   - private   # protected
├────────────────────────────┤   subrayado = static
│ + calcularPrecio(n): number│   cursiva / «abstract» = abstracto
└────────────▲───────────────┘
             │  (flecha con triángulo vacío = herencia: extends)
     ┌───────┴────────┐
  ┌──┴───┐        ┌───┴──┐
  │Simple│        │Suite │
  └──────┘        └──────┘

Hotel ◆──────── Habitacion    rombo lleno  = composición
Equipo ◇─────── Jugador       rombo vacío  = agregación
Factura - - - -▷ «interface» Pagable   línea punteada + triángulo = implements
```

---

## 14. Reglas del examen y trampas frecuentes

### Reglas (primer cuatrimestre)
- `npx tsc` sin errores.
- Sin `enum` → usar uniones de literales (`"estandar" | "express"`).
- Sin parameter properties → constructor en forma larga.
- Sin `any` → tipar todo; en un `catch` usar `e instanceof Error`.
- Cada archivo termina con un **bloque de prueba** que muestra la salida. La salida tiene que coincidir **exactamente** con la esperada, **incluidas las tildes** ("histórico" ≠ "historico").

### Trampas frecuentes
1. **Olvidar `super(...)`** o usar `this` antes de `super` → error de compilación.
2. **`private` en el padre** cuando la hija lo necesita → usar `protected`.
3. **Setter con el mismo nombre que el atributo** → recursión infinita. Usar `_atributo`.
4. **Asignar `this._edad = edad` en el constructor** → se saltea la validación del setter.
5. **Devolver la lista interna** en vez de una copia.
6. **Modificar el estado antes de validar** → el objeto queda a medias si la validación falla después.
7. **`if (x instanceof Clase)` para decidir comportamiento** → es la señal de que falta polimorfismo.
8. **Acceder a un `static` con `this`** → `Hotel.totalCheckIns`, no `this.totalCheckIns`.
9. **`aplicarDescuento` que modifica `this.precio`** cuando la consigna dice "devuelve el precio final sin modificar el original".
10. **`node archivo.ts` no verifica tipos.** Que corra no significa que `npx tsc` pase.
11. `readonly` en un arreglo no impide `push`.
12. Imprimir con `console.log` dentro de un método cuando la consigna pide **devolver** un valor (`describir(): string` debe hacer `return`, no `console.log`).

### Glosario rápido

| Término | Definición corta |
|---|---|
| Clase | Molde que define atributos y métodos |
| Objeto / instancia | Elemento concreto creado con `new` |
| Abstracción | Modelar solo lo relevante para el problema |
| Encapsulamiento | Proteger el estado; acceder solo por métodos que validan |
| Herencia | Una clase hija reutiliza y extiende a una padre ("es un") |
| Polimorfismo | Mismo mensaje, distinto comportamiento según el objeto real |
| Clase abstracta | Molde parcial con métodos abstractos; no se instancia |
| Interface | Contrato: qué métodos/propiedades debe tener |
| Composición | Un objeto "tiene" otros objetos y delega en ellos |
| `static` | Miembro de la clase, no de la instancia |
| `readonly` | Se asigna una vez |
| `protected` | Visible en la clase y en sus hijas |
| Override | La hija redefine un método heredado |
| Narrowing | TS deduce un tipo más preciso dentro de un `if` |
