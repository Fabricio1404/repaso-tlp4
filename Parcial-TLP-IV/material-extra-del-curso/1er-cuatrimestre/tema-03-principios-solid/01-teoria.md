# Tema 3 · Principios SOLID

> **Objetivo:** ante un código que **funciona pero está mal diseñado**, reconocer **qué principio viola**, explicarlo con el vocabulario correcto y **refactorizarlo sin cambiar el comportamiento visible** (la salida tiene que ser la misma).

Índice:
1. [Conceptos previos: cohesión, acoplamiento, refactorizar](#1-conceptos-previos)
2. [S: Responsabilidad única (SRP)](#2-s--principio-de-responsabilidad-única-srp)
3. [O: Abierto/cerrado (OCP)](#3-o--principio-abiertocerrado-ocp)
4. [L: Sustitución de Liskov (LSP)](#4-l--principio-de-sustitución-de-liskov-lsp)
5. [I: Segregación de interfaces (ISP)](#5-i--principio-de-segregación-de-interfaces-isp)
6. [D: Inversión de dependencias (DIP)](#6-d--principio-de-inversión-de-dependencias-dip)
7. [Tabla de señales (la que hay que saber de memoria)](#7-tabla-de-señales)
8. [SOLID y los patrones de diseño](#8-solid-y-los-patrones-de-diseño)
9. [Cómo encarar un ejercicio de refactor en el examen](#9-cómo-encarar-un-ejercicio-de-refactor)
10. [Trampas y diferencias que se preguntan](#10-trampas-y-diferencias-que-se-preguntan)

---

## 1. Conceptos previos

**SOLID** es un acrónimo de cinco principios de diseño orientado a objetos popularizados por Robert C. Martin ("Uncle Bob"). No son reglas del compilador: el código que los viola **compila y funciona**. Lo que logran es que el código sea **fácil de cambiar, extender y probar**.

- **Cohesión:** qué tan relacionadas están las cosas **dentro** de una clase. **Alta cohesión = bueno**: todo lo de la clase apunta a un mismo propósito.
- **Acoplamiento:** cuánto depende una clase de **otras**. **Bajo acoplamiento = bueno**: un cambio en una clase no obliga a cambiar muchas otras.
- **Refactorizar:** cambiar la **estructura interna** del código **sin cambiar su comportamiento visible**. En el examen: la salida por consola antes y después tiene que ser **idéntica**.
- **Code smell ("olor"):** una señal en el código de que algo está mal diseñado (una clase gigante, un `switch` que crece, un `new` escondido...).

> "Que el programa funcione no significa que esté bien diseñado: en SOLID, el código de los ejemplos corre, pero igual está mal." (guía de la cátedra)

---

## 2. S · Principio de Responsabilidad Única (SRP)

> **"Una clase debe tener una sola razón para cambiar."**

"Responsabilidad" = **motivo de cambio**. No es "un solo método": es que la clase responda a **un solo actor o preocupación**.

### Señal
Una clase **valida, guarda y manda mails**. Te preguntás "¿por qué podría cambiar esta clase?" y aparecen varias respuestas distintas.

```ts
// ❌ UserManager tiene TRES motivos para cambiar
class UserManager {
  private users: User[] = [];
  register(username: string, email: string): string {
    if (!email.includes("@")) throw new Error("El correo no es valido");  // 1) regla de validación
    this.users.push({ username, email });                                  // 2) forma de guardar
    return `Email enviado a ${email}`;                                     // 3) forma de avisar
  }
}
```
Si cambia la regla del email, si se pasa a una base de datos o si se cambia el proveedor de mails... siempre se toca `UserManager`. Y cada cambio puede romper las otras dos cosas.

### Solución
**Una clase por responsabilidad**, coordinadas por **composición**:

```ts
class UserValidator   { validate(email: string): void { /* ... */ } }
class UserRepository  { save(user: User): void { /* ... */ } findAll(): User[] { /* ... */ } }
class EmailService    { sendWelcomeEmail(email: string): string { /* ... */ } }

class UserRegistrationService {                 // coordina, no hace el trabajo
  private validator: UserValidator;
  private repository: UserRepository;
  private emailService: EmailService;
  constructor(v: UserValidator, r: UserRepository, e: EmailService) { /* asignar */ }

  register(username: string, email: string): string {
    this.validator.validate(email);
    this.repository.save({ username, email });
    return this.emailService.sendWelcomeEmail(email);
  }
}
```

### Claves
- El servicio coordinador **delega**: no valida ni guarda ni manda nada él mismo.
- Si cambia el almacenamiento, **solo** se toca `UserRepository`.
- SRP en arquitectura (segundo cuatrimestre): **controllers** (HTTP), **services** (negocio), **repositories** (datos). Cada capa tiene un solo motivo para cambiar.
- No llevarlo al extremo: separar en 20 clases de un método no mejora nada. La pregunta es "¿estas cosas cambian por motivos distintos?".

---

## 3. O · Principio Abierto/Cerrado (OCP)

> **"Las entidades de software deben estar abiertas a la extensión, pero cerradas a la modificación."**

Se debe poder **agregar comportamiento nuevo** (extender) **sin modificar el código que ya funciona** (cerrado).

### Señal
Un **`switch` o `if/else` que crece con cada opción nueva**:

```ts
// ❌ cada medio de pago nuevo obliga a agregar un case
class PaymentProcessor {
  pay(method: string, amount: number): void {
    switch (method) {
      case "card":     console.log(`Pagando $${amount} con tarjeta`); break;
      case "cash":     console.log(`Pagando $${amount} en efectivo`); break;
      case "transfer": console.log(`Pagando $${amount} por transferencia`); break;
      // case "crypto": ... ← modificar una clase que ya funcionaba
    }
  }
}
```

### Solución
**Interfaz común y una clase por opción**. Se usa **polimorfismo** en lugar del `switch`:

```ts
interface PaymentMethod { pay(amount: number): void; }

class CardPayment     implements PaymentMethod { pay(a: number): void { console.log(`Pagando $${a} con tarjeta`); } }
class CashPayment     implements PaymentMethod { pay(a: number): void { console.log(`Pagando $${a} en efectivo`); } }
class TransferPayment implements PaymentMethod { pay(a: number): void { console.log(`Pagando $${a} por transferencia`); } }

class PaymentProcessor {
  pay(method: PaymentMethod, amount: number): void {
    method.pay(amount);                          // sin switch: delega
  }
}
// Nuevo medio: class CryptoPayment implements PaymentMethod {...}  → PaymentProcessor NO se toca
```

### Claves
- Todos los medios comparten un comportamiento (`pay`): eso se vuelve la interfaz.
- "Cerrado" no significa "nunca se toca": significa que **para agregar una opción** no hay que tocarlo.
- El `switch` no desaparece del sistema: suele quedar **uno solo**, en una **Factory**, que es el único lugar que se modifica (y está aislado). Lo malo es tener el `switch` repetido en la lógica de negocio.
- Frase del examen: **"sin modificar el código existente"** → pensá en OCP (o en un patrón que lo permite: Factory, Adapter, Observer).

---

## 4. L · Principio de Sustitución de Liskov (LSP)

> **"Los objetos de una subclase deben poder reemplazar a los de su clase base sin alterar el correcto funcionamiento del programa."** (Barbara Liskov, 1987)

Si una función funciona con un `Rectangle`, tiene que funcionar **igual de bien** con cualquier subclase de `Rectangle`, **sin sorpresas**.

### Señal
La subclase **cambia el comportamiento esperado** de la base: ignora un método, lanza una excepción donde la base no lanzaba, exige más condiciones, devuelve otra cosa.

### El ejemplo clásico: cuadrado y rectángulo

```ts
// ❌ Square hereda de Rectangle pero cambia setWidth y setHeight
class Rectangle {
  protected width: number; protected height: number;
  constructor(w: number, h: number) { this.width = w; this.height = h; }
  setWidth(w: number): void { this.width = w; }
  setHeight(h: number): void { this.height = h; }
  area(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  constructor(side: number) { super(side, side); }
  override setWidth(w: number): void { this.width = w; this.height = w; }   // ← sorpresa
  override setHeight(h: number): void { this.width = h; this.height = h; }  // ← sorpresa
}

function resizeRectangle(r: Rectangle): void {
  r.setWidth(5);
  r.setHeight(10);
  console.log(`Area esperada: 50. Area obtenida: ${r.area()}`);
}
resizeRectangle(new Square(1));  // Area obtenida: 100  ← la función esperaba un rectángulo y la subclase la sorprendió
```

Un cuadrado **es** un rectángulo en matemática, pero **no se comporta igual** en código cuando se le puede cambiar el tamaño: un rectángulo permite cambiar ancho y alto **independientemente**; un cuadrado no.

### Solución
**Sacar la herencia** y modelar un **contrato común** que ambos puedan cumplir **de verdad**:

```ts
interface Shape { area(): number; }

class Rectangle implements Shape { /* width, height, setWidth, setHeight, area */ }
class Square    implements Shape { private side: number; setSide(s: number): void {...} area(): number {...} }

function resizeRectangle(r: Rectangle): void { /* ... */ }   // ahora SOLO acepta Rectangle
// resizeRectangle(new Square(4));  ❌ ya no compila: no se puede pasar un Square por error
```

### Reglas formales de Liskov (para responder "por qué")
Una subclase **no puede**:
- **Exigir más** (endurecer precondiciones): si la base acepta cualquier monto > 0, la hija no puede exigir > 100.
- **Garantizar menos** (debilitar postcondiciones): si la base garantiza que `setWidth` cambia solo el ancho, la hija no puede cambiar también el alto.
- **Lanzar excepciones nuevas** donde la base no lanzaba (`Pinguino.volar()` → `throw "no puedo volar"`).
- **Romper invariantes** de la base.

### Otros ejemplos típicos
- `Pajaro.volar()` con `Pinguino extends Pajaro` que lanza error → separar `PajaroVolador`.
- `CuentaBancaria.retirar()` con `CuentaPlazoFijo` que lanza "no se puede retirar" → la plazo fijo no es una cuenta de la que se retira: otro contrato.
- `ArchivoSoloLectura extends Archivo` con `escribir()` que lanza error.

### Claves
- **LSP es el principio que valida si una herencia está bien usada.** "Es un" en el mundo real no alcanza: tiene que "**comportarse como** un".
- Si para usar una subclase tenés que preguntar `if (x instanceof Square)`, es señal de violación de LSP.
- La solución típica: **composición o un contrato común (interfaz)** en lugar de herencia.

---

## 5. I · Principio de Segregación de Interfaces (ISP)

> **"Los clientes no deberían verse obligados a depender de interfaces que no usan."**

Mejor **varias interfaces chicas y específicas** que una grande "que hace todo".

### Señal
Una clase implementa métodos que **lanzan `throw`** (o están vacíos) **porque no le corresponden**:

```ts
// ❌ una interfaz "gorda"
interface MultifunctionDevice {
  print(document: string): void;
  scan(document: string): void;
  fax(document: string): void;
}

class SimplePrinter implements MultifunctionDevice {
  print(d: string): void { console.log(`Imprimiendo: ${d}`); }
  scan(d: string): void { throw new Error("No puedo escanear"); }   // ← obligada a implementarlo
  fax(d: string): void { throw new Error("No puedo enviar fax"); }  // ← compila, pero explota en ejecución
}
```

### Solución
**Partir la interfaz** en capacidades:

```ts
interface Printer { print(document: string): void; }
interface Scanner { scan(document: string): void; }
interface Fax     { fax(document: string): void; }

class SimplePrinter implements Printer { print(d: string): void { /* ... */ } }
class MultifunctionPrinter implements Printer, Scanner, Fax { /* las tres */ }
```

### Claves
- Implementar métodos que lanzan error es **peligroso**: el código compila (el contrato "se cumple"), pero **explota en ejecución** cuando alguien los llama.
- Con interfaces chicas, cada clase implementa **solo las capacidades que tiene**; una clase puede implementar varias (`implements Printer, Scanner, Fax`).
- Una función que solo necesita imprimir pide un `Printer`, no un `MultifunctionDevice` → depende de lo mínimo.
- En el integrador: repositorios con interfaces **chicas y específicas** (`ILibroRepository`, `IUserRepository`...) en vez de un `IRepository` gigante con todos los métodos.
- **ISP vs. LSP:** en los dos aparece "un método que lanza error porque no le corresponde". Si el problema es una **herencia** donde la hija no puede cumplir lo que promete el padre → LSP. Si es una **interfaz demasiado grande** que obliga a implementar cosas de más → ISP. Muchas veces la misma corrección arregla los dos.

---

## 6. D · Principio de Inversión de Dependencias (DIP)

> **"Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones."**
> **"Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones."**

- **Alto nivel:** la lógica de negocio (`OrderService`: "crear un pedido y avisar").
- **Bajo nivel:** detalles técnicos (`EmailSender`, `SmsSender`, la base de datos, el archivo de log).
- **Abstracción:** una interfaz (`Notifier`).

### Señal
**Un `new` de una clase concreta dentro de otra clase**:

```ts
// ❌ OrderService crea su propia dependencia concreta
class OrderService {
  private emailSender = new EmailSender();          // ← acoplado a EMAIL para siempre
  createOrder(customer: string): void {
    console.log("Pedido creado");
    this.emailSender.send(customer, "Tu pedido fue creado");
  }
}
```
Problemas: no se puede cambiar a SMS sin modificar `OrderService`, y **no se puede probar** sin mandar un correo real.

### Solución
Definir una **interfaz** y **recibirla por el constructor** (*inyección de dependencias por constructor*):

```ts
interface Notifier { send(to: string, message: string): void; }

class EmailSender implements Notifier { send(to: string, m: string): void { console.log(`Correo para ${to}: ${m}`); } }
class SmsSender   implements Notifier { send(to: string, m: string): void { console.log(`SMS para ${to}: ${m}`); } }

class OrderService {
  private notifier: Notifier;                        // depende de la ABSTRACCIÓN
  constructor(notifier: Notifier) {                  // la recibe desde AFUERA
    this.notifier = notifier;
  }
  createOrder(customer: string): void {
    console.log("Pedido creado");
    this.notifier.send(customer, "Tu pedido fue creado");
  }
}

new OrderService(new EmailSender()).createOrder("ana@example.com");
new OrderService(new SmsSender()).createOrder("1155550000");
```

### ¿Por qué "inversión"?
Antes: `OrderService` (alto nivel) → depende de → `EmailSender` (bajo nivel).
Después: `OrderService` → depende de → `Notifier` ← implementa ← `EmailSender`.
La flecha del detalle ahora **apunta hacia la abstracción**: se invirtió.

### Probar sin enviar un correo real: el **doble de prueba**

```ts
class NotifierFalso implements Notifier {
  enviados: string[] = [];
  send(to: string, message: string): void { this.enviados.push(`${to}: ${message}`); }
}
const falso = new NotifierFalso();
new OrderService(falso).createOrder("x@test.com");
console.log(falso.enviados);   // [ 'x@test.com: Tu pedido fue creado' ]
```
Esto es **la base de las pruebas unitarias del segundo cuatrimestre** (`vi.fn()`, repositorios falsos).

### DIP, DI e IoC (no son lo mismo)
| Término | Qué es |
|---|---|
| **DIP** (principio) | Depender de abstracciones, no de detalles |
| **DI** (inyección de dependencias, técnica) | Pasarle a un objeto sus dependencias desde afuera (por constructor, normalmente) |
| **IoC** (inversión de control) | El objeto no controla la creación de sus dependencias; las crea otro |
| **Composition root** | El **único lugar** donde se hacen los `new` y se conectan las piezas (`main.ts` en el integrador) |

En la materia está **prohibido usar librerías de inyección de dependencias**: se inyecta a mano por constructor y se conecta todo en `main.ts`.

### Claves
- Los `new` de las dependencias **se mueven** al composition root (o a una Factory). No desaparecen.
- No todo `new` viola DIP: crear un `Date`, un arreglo o un objeto de datos está bien. Lo que importa es **depender de un servicio/infraestructura concreto** que podría cambiar.
- Un Singleton usado con `X.obtenerInstancia()` **dentro** de un servicio también es una dependencia concreta escondida (por eso dificulta las pruebas).

---

## 7. Tabla de señales

| Principio | Señal en el código | Solución |
|---|---|---|
| **SRP** (responsabilidad única) | Una clase valida, guarda y manda mails | Una clase por responsabilidad, coordinadas por composición |
| **OCP** (abierto/cerrado) | Un `switch` o `if` que crece con cada opción nueva | Interfaz común y una clase por opción |
| **LSP** (sustitución de Liskov) | La subclase cambia el comportamiento esperado de la base | Sacar la herencia y usar un contrato común |
| **ISP** (segregación de interfaces) | Una clase implementa métodos que lanzan `throw` porque no le corresponden | Interfaces chicas |
| **DIP** (inversión de dependencias) | Un `new` de una clase concreta dentro de otra clase | Recibir una interfaz por el constructor |

Frases de consigna → principio:
- "cada opción nueva agrega un `if`" → **OCP**
- "la clase crea su propia dependencia" / "no se puede probar sin..." → **DIP**
- "la clase hace demasiadas cosas" / "tiene varios motivos para cambiar" → **SRP**
- "la subclase rompe lo que esperaba la función" / "el área da 100 en vez de 50" → **LSP**
- "está obligada a implementar métodos que no usa" → **ISP**

## 8. SOLID y los patrones de diseño

| Patrón | Principios que ayuda a cumplir |
|---|---|
| Factory | **SRP** (separa crear de usar), **OCP** (nuevo tipo = nueva clase + un case aislado), **DIP** (el cliente depende del tipo común) |
| Observer | **OCP** (nuevo observador sin tocar el sujeto), **DIP** (el sujeto depende de la interfaz Observador) |
| Adapter | **SRP** (la traducción vive en un solo lugar), **OCP** (se integra lo viejo sin modificarlo) |
| Singleton | Ojo: puede **violar SRP** (controla su ciclo de vida además de su trabajo) y esconder dependencias (**contra DIP**) |

## 9. Cómo encarar un ejercicio de refactor

1. **Ejecutá el código original y guardá la salida.** Es tu "contrato": al final tiene que salir igual.
2. **Commit del original** (`chore(ej3): código original`). Es un punto de control obligatorio en el parcial.
3. **Identificá la señal** (tabla de la sección 7) y nombrá el principio.
4. **Creá la abstracción** (interfaz) primero.
5. **Mové cada comportamiento a su clase** (una por opción / una por responsabilidad).
6. **Cambiá la clase original** para que dependa de la abstracción (constructor o parámetro).
7. **Mové los `new` al bloque de prueba** (composition root).
8. **Escribí el comentario** con el principio arriba de cada interfaz nueva (el parcial lo pide: `// OCP: ...`, `// DIP: ...`).
9. **Ejecutá y compará la salida.** `npx tsc` sin errores.
10. **Commit** (`refactor(ej3): ejercicio 3 completo`).

## 10. Trampas y diferencias que se preguntan

1. **"SRP = una clase con un solo método"** → falso: es **una razón para cambiar**.
2. **"OCP = no se puede modificar nunca el código"** → falso: cerrado **para agregar opciones**; los bugs se corrigen igual.
3. **"Si compila, cumple LSP"** → falso: LSP es sobre **comportamiento**. El cuadrado compila y viola LSP.
4. **"DIP = usar inyección de dependencias"** → incompleto: DIP es el principio (depender de abstracciones); DI es una técnica para lograrlo.
5. **ISP vs SRP:** SRP habla de **clases** (motivos de cambio); ISP habla de **interfaces** (lo que el cliente está obligado a conocer).
6. **"La interfaz debe estar en el módulo de bajo nivel"** → no: la abstracción la "define" quien la necesita (alto nivel); los detalles la implementan.
7. Que el código **funcione** no significa que esté **bien diseñado**: en los ejercicios de SOLID, el original corre perfecto.
8. **Refactorizar no es agregar funcionalidad**: si tu salida cambió, no refactorizaste.
