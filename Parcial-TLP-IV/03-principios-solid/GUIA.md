# 03 · Principios SOLID

> **Requisito:** temas 01 y 02.
> **Objetivo:** reconocer **qué principio se viola** en un código, explicarlo con tus palabras y **refactorizarlo** (el ejercicio 3 del primer parcial es exactamente eso).

---

## 1. Conceptos previos

Antes de SOLID hay que entender tres palabras que aparecen en todas las preguntas:

| Concepto | Qué es | ¿Bueno alto o bajo? |
|---|---|---|
| **Acoplamiento** | Cuánto **depende** una clase de otras. Si cambiar A obliga a cambiar B, están acopladas. | **Bajo** es bueno |
| **Cohesión** | Qué tan **relacionadas** están las cosas dentro de una clase. Una clase que solo hace "facturas" es cohesiva; una que hace facturas, mails y PDFs, no. | **Alta** es bueno |
| **Abstracción** (en SOLID) | Una **interface** o clase abstracta: el "qué" sin el "cómo". | Depender de abstracciones es bueno |

> **Meta de SOLID:** código con **bajo acoplamiento y alta cohesión**, fácil de cambiar sin romper otras cosas y fácil de probar.

**SOLID** son 5 principios que juntó **Robert C. Martin ("Uncle Bob")** a principios de los 2000:

| Letra | Nombre | En una frase |
|---|---|---|
| **S** | Single Responsibility · Responsabilidad única | Una clase, **un motivo para cambiar** |
| **O** | Open/Closed · Abierto/Cerrado | **Abierto a extensión, cerrado a modificación** |
| **L** | Liskov Substitution · Sustitución de Liskov | Una subclase debe poder **reemplazar** a la base **sin sorpresas** |
| **I** | Interface Segregation · Segregación de interfaces | **Interfaces chicas**: nadie implementa lo que no usa |
| **D** | Dependency Inversion · Inversión de dependencias | Depender de **abstracciones**, recibirlas **por constructor** |

---

## 2. S · Responsabilidad Única (SRP)

> **"Una clase debe tener una sola razón para cambiar."**

"Razón para cambiar" = un **actor** o área distinta que podría pedir cambios (el contador, el de sistemas, el de diseño...).

### Señal de que se viola
Una clase que hace cosas de **naturaleza distinta**: calcular + guardar + enviar mails + imprimir. Nombres como `Manager`, `Gestor`, `Utils` que hacen de todo. Métodos que no usan los mismos atributos.

```ts
// ❌ Viola SRP: tres razones para cambiar
class GestorUsuarios {
  registrar(nombre: string, email: string): void {
    // 1) validación (cambia si cambian las reglas de negocio)
    if (!email.includes("@")) throw new Error("Email inválido");
    // 2) persistencia (cambia si cambia la base de datos)
    console.log(`INSERT INTO usuarios VALUES ('${nombre}', '${email}')`);
    // 3) notificación (cambia si cambia el proveedor de mails)
    console.log(`Enviando mail de bienvenida a ${email}`);
  }
}
```

### Solución
Separar cada responsabilidad en **su propia clase** y que una clase coordine:

```ts
// ✅ Cada clase tiene una sola razón para cambiar
class ValidadorUsuario {
  validar(email: string): void {
    if (!email.includes("@")) throw new Error("Email inválido");
  }
}
class RepositorioUsuarios {
  guardar(nombre: string, email: string): void {
    console.log(`Guardado: ${nombre} <${email}>`);
  }
}
class ServicioMail {
  enviarBienvenida(email: string): void {
    console.log(`Bienvenida enviada a ${email}`);
  }
}

class RegistroUsuarios {                         // coordina, no hace el trabajo
  private validador: ValidadorUsuario;
  private repo: RepositorioUsuarios;
  private mail: ServicioMail;
  constructor(v: ValidadorUsuario, r: RepositorioUsuarios, m: ServicioMail) {
    this.validador = v; this.repo = r; this.mail = m;
  }
  registrar(nombre: string, email: string): void {
    this.validador.validar(email);
    this.repo.guardar(nombre, email);
    this.mail.enviarBienvenida(email);
  }
}
```

### Claves
- SRP **no** significa "un solo método". Significa "un solo **motivo** para cambiar".
- Es el principio detrás de la **arquitectura en capas** (routes / controllers / services / repositories).

---

## 3. O · Abierto/Cerrado (OCP)

> **"Las entidades deben estar abiertas a la extensión pero cerradas a la modificación."**

Querés poder **agregar comportamiento nuevo** (extender) **sin tocar código que ya funciona** (no modificar).

### Señal de que se viola
Un **`if`/`switch` que crece** cada vez que aparece un caso nuevo:

```ts
// ❌ Viola OCP: cada medio de pago nuevo obliga a MODIFICAR este método
class ProcesadorPagos {
  procesar(tipo: string, monto: number): string {
    if (tipo === "tarjeta") return `Tarjeta: $${monto * 1.1}`;
    else if (tipo === "efectivo") return `Efectivo: $${monto * 0.9}`;
    else if (tipo === "mercadopago") return `MP: $${monto}`;
    // mañana: else if (tipo === "cripto") ...
    throw new Error("Tipo desconocido");
  }
}
```

### Solución
Una **interface** + **una clase por caso**. Lo nuevo se agrega con una **clase nueva**:

```ts
// ✅ OCP: para agregar "cripto" se crea una clase, no se toca nada existente
// OCP: cada medio de pago es una clase nueva; ProcesadorPagos no se modifica
interface MedioPago {
  procesar(monto: number): string;
}
class PagoTarjeta implements MedioPago {
  procesar(monto: number): string { return `Tarjeta: $${monto * 1.1}`; }
}
class PagoEfectivo implements MedioPago {
  procesar(monto: number): string { return `Efectivo: $${monto * 0.9}`; }
}

class ProcesadorPagos {
  procesar(medio: MedioPago, monto: number): string {
    return medio.procesar(monto);       // polimorfismo: no pregunta el tipo
  }
}
```

### Claves
- OCP se logra con **polimorfismo** (interfaces / herencia).
- Patrones que lo cumplen: **Observer** (nuevos observadores sin tocar el sujeto), **Adapter**, **Strategy**.
- En el examen se pide un **comentario arriba de cada interface** que diga el principio: `// OCP: ...`

---

## 4. L · Sustitución de Liskov (LSP)

> **"Si S es subtipo de T, los objetos de tipo T pueden reemplazarse por objetos de tipo S sin alterar el correcto funcionamiento del programa."** (Barbara Liskov, 1987)

En criollo: **donde el código espera la clase padre, tiene que poder recibir cualquier hija y seguir funcionando bien**, sin sorpresas.

### Señal de que se viola
- Una hija que **lanza error** en un método heredado ("este pájaro no vuela").
- Una hija que **deja vacío** un método heredado o lo hace "no hacer nada".
- Una hija que **cambia el significado** del método o **endurece** sus reglas.
- Código cliente con `if (x instanceof HijaRara)` para evitar un caso.

### El ejemplo clásico: cuadrado y rectángulo

En matemática un cuadrado **es un** rectángulo... pero en código:

```ts
class Rectangulo {
  protected ancho: number = 0;
  protected alto: number = 0;
  setAncho(a: number): void { this.ancho = a; }
  setAlto(h: number): void { this.alto = h; }
  area(): number { return this.ancho * this.alto; }
}

class Cuadrado extends Rectangulo {
  override setAncho(a: number): void { this.ancho = a; this.alto = a; }  // fuerza lados iguales
  override setAlto(h: number): void { this.ancho = h; this.alto = h; }
}

function probar(r: Rectangulo): void {
  r.setAncho(5);
  r.setAlto(4);
  console.log(r.area());   // esperado: 20
}

probar(new Rectangulo());  // 20 ✅
probar(new Cuadrado());    // 16 ❌  ← la hija rompió lo que el cliente esperaba
```

### Solución
No forzar la herencia. Que ambos implementen una abstracción común **sin** los métodos problemáticos:

```ts
// LSP: ninguna figura promete algo que no puede cumplir
interface Figura {
  area(): number;
}
class Rect implements Figura {
  private ancho: number; private alto: number;
  constructor(ancho: number, alto: number) { this.ancho = ancho; this.alto = alto; }
  area(): number { return this.ancho * this.alto; }
}
class Cuad implements Figura {
  private lado: number;
  constructor(lado: number) { this.lado = lado; }
  area(): number { return this.lado * this.lado; }
}
```

### Otro ejemplo típico: aves

```ts
// ❌
class Ave { volar(): string { return "volando"; } }
class Pinguino extends Ave {
  override volar(): string { throw new Error("No puedo volar"); }   // sorpresa
}

// ✅ separar la capacidad
class AveBase { comer(): string { return "comiendo"; } }
interface Voladora { volar(): string; }
class Gorrion extends AveBase implements Voladora { volar(): string { return "volando"; } }
class Pinguino2 extends AveBase { nadar(): string { return "nadando"; } }
```

### Reglas formales (para responder "por qué")
Una subclase **no** debe:
- **Fortalecer las precondiciones** (pedir más que el padre para funcionar).
- **Debilitar las postcondiciones** (prometer menos de lo que prometía el padre).
- **Romper los invariantes** del padre (lo que siempre es verdad, como "ancho y alto son independientes").
- Lanzar excepciones **nuevas** que el padre no lanzaba.

> Pregunta típica: *"El pingüino que lanza error en volar() viola..."* → **LSP**.

---

## 5. I · Segregación de Interfaces (ISP)

> **"Los clientes no deben verse obligados a depender de interfaces que no usan."**

### Señal de que se viola
Una **interface gorda** y clases que la implementan con métodos vacíos o que lanzan `"no soportado"`:

```ts
// ❌ Viola ISP
interface Multifuncion {
  imprimir(doc: string): string;
  escanear(doc: string): string;
  enviarFax(doc: string): string;
}

class ImpresoraSimple implements Multifuncion {
  imprimir(doc: string): string { return `Imprimiendo ${doc}`; }
  escanear(doc: string): string { throw new Error("No escaneo"); }   // obligada a implementarlo
  enviarFax(doc: string): string { throw new Error("No tengo fax"); }
}
```

### Solución
Partir en **interfaces chicas** y que cada clase implemente **solo las que usa** (una clase puede implementar varias):

```ts
// ✅ ISP: interfaces chicas y específicas
interface Impresora { imprimir(doc: string): string; }
interface Escaner   { escanear(doc: string): string; }
interface Fax       { enviarFax(doc: string): string; }

class ImpresoraSimple2 implements Impresora {
  imprimir(doc: string): string { return `Imprimiendo ${doc}`; }
}
class Multifuncion2 implements Impresora, Escaner, Fax {
  imprimir(doc: string): string { return `Imprimiendo ${doc}`; }
  escanear(doc: string): string { return `Escaneando ${doc}`; }
  enviarFax(doc: string): string { return `Enviando fax de ${doc}`; }
}
```

### ISP vs LSP (se confunden)
- **ISP** mira la **interface**: ¿es demasiado grande? → partirla.
- **LSP** mira la **subclase**: ¿se comporta como prometió el padre? → no heredar mal.
- Muchas veces van juntas: una interface gorda **provoca** implementaciones que violan LSP.

---

## 6. D · Inversión de Dependencias (DIP)

> **"Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones."**
> **"Las abstracciones no deben depender de los detalles; los detalles deben depender de las abstracciones."**

- **Alto nivel** = la lógica de negocio (el *qué*): `ServicioPedidos`.
- **Bajo nivel** = los detalles técnicos (el *cómo*): `MySQLDatabase`, `GmailSender`.

### Señal de que se viola
Un **`new` de una clase concreta adentro** de otra clase:

```ts
// ❌ Viola DIP: ServicioPedidos está atado a MySQL y a Gmail
class MySQLDatabase { guardar(dato: string): void { console.log(`MySQL: ${dato}`); } }
class GmailSender   { enviar(msg: string): void { console.log(`Gmail: ${msg}`); } }

class ServicioPedidos {
  private db = new MySQLDatabase();     // ← new adentro
  private mail = new GmailSender();     // ← new adentro
  crear(pedido: string): void {
    this.db.guardar(pedido);
    this.mail.enviar(`Pedido ${pedido} creado`);
  }
}
// ¿Cambiar a PostgreSQL? Hay que modificar ServicioPedidos.
// ¿Probarlo sin mandar mails reales? Imposible.
```

### Solución
1. Crear **interfaces** para las dependencias.
2. La clase de alto nivel **las recibe por constructor** (inyección de dependencias).
3. Las clases concretas **implementan** las interfaces.
4. Un único lugar (el **composition root**, ej. `main.ts`) crea y conecta todo.

```ts
// ✅ DIP
// DIP: ServicioPedidos depende de esta abstracción, no de MySQL
interface RepositorioPedidos { guardar(dato: string): void; }
// DIP: ServicioPedidos depende de esta abstracción, no de Gmail
interface Notificador { enviar(msg: string): void; }

class MySQLRepositorio implements RepositorioPedidos {
  guardar(dato: string): void { console.log(`MySQL: ${dato}`); }
}
class GmailNotificador implements Notificador {
  enviar(msg: string): void { console.log(`Gmail: ${msg}`); }
}

class ServicioPedidos2 {
  private repo: RepositorioPedidos;
  private notificador: Notificador;
  constructor(repo: RepositorioPedidos, notificador: Notificador) {   // se RECIBEN
    this.repo = repo;
    this.notificador = notificador;
  }
  crear(pedido: string): void {
    this.repo.guardar(pedido);
    this.notificador.enviar(`Pedido ${pedido} creado`);
  }
}

// Composition root: el único lugar que conoce las clases concretas
const servicio = new ServicioPedidos2(new MySQLRepositorio(), new GmailNotificador());
servicio.crear("A-100");
```

### ¿Por qué "inversión"?
Sin DIP, la flecha de dependencia va de **alto a bajo**: `ServicioPedidos → MySQL`. Con DIP, **los dos** apuntan a la interface: `ServicioPedidos → RepositorioPedidos ← MySQLRepositorio`. El detalle (MySQL) ahora depende de la abstracción: la dependencia se **invirtió**.

### El gran beneficio: poder probar con un **doble de prueba**

```ts
// En un test: un notificador falso que NO manda mails reales
class NotificadorFalso implements Notificador {
  mensajes: string[] = [];
  enviar(msg: string): void { this.mensajes.push(msg); }
}
const falso = new NotificadorFalso();
new ServicioPedidos2(new MySQLRepositorio(), falso).crear("X");
console.log(falso.mensajes);   // ["Pedido X creado"]  ← verificamos sin mandar nada
```

Esto es **la base del tema 04 (testing)**: en el segundo parcial, `LibroService` recibe un `LibroRepository` por constructor, y por eso se le puede pasar un repositorio falso con `vi.fn()`.

### DIP, DI e IoC (no son lo mismo)
| Sigla | Qué es |
|---|---|
| **DIP** | El **principio** (depender de abstracciones) |
| **DI** (Dependency Injection) | La **técnica** para cumplirlo (pasar las dependencias por constructor) |
| **IoC** (Inversion of Control) | La idea general: el control de crear las dependencias **lo tiene otro** (el composition root o un framework), no la clase |

---

## 7. Tabla de señales (la más útil para el examen)

| Si en el código ves... | Se viola... | Se arregla con... |
|---|---|---|
| Una clase que valida, guarda, manda mails e imprime | **SRP** | Una clase por responsabilidad |
| Un `if`/`switch` por tipo que crece con cada caso nuevo | **OCP** | Interface + una clase por caso |
| Una hija que lanza error / deja vacío un método heredado / cambia su sentido | **LSP** | No heredar; interface común más chica |
| Una interface con muchos métodos y clases que implementan algunos "de mentira" | **ISP** | Partir en interfaces chicas |
| `new ClaseConcreta()` adentro de otra clase / imposible de probar sin lo real | **DIP** | Interface + recibir por constructor |

---

## 8. SOLID y los patrones

| Patrón | Principios que aplica |
|---|---|
| **Observer** | **OCP** (observadores nuevos sin tocar el sujeto), **DIP** (el sujeto depende de la interface `Observador`) |
| **Factory** | **SRP** (la creación en un solo lugar), **DIP** (el cliente depende de la interface del producto) |
| **Adapter** | **OCP** (se reutiliza lo viejo sin modificarlo), **SRP** (la traducción aparte) |
| **Singleton** | Puede **violar SRP** (gestiona su instancia + su trabajo) y complica **DIP** (se obtiene, no se inyecta) |
| **Arquitectura hexagonal** | **DIP** a nivel arquitectura (puertos = interfaces) |

---

## 9. Cómo encarar un ejercicio de refactor (el ejercicio 3 del primer parcial)

1. **Ejecutá el original** y guardá la salida. Hacé **commit del original** antes de tocar nada (`chore(ej3): código original`).
2. **Buscá las señales** de la tabla: ¿hay un `if` que crece? (OCP) ¿hay `new` adentro? (DIP).
3. **Creá la interface** y arriba poné el comentario con el principio:
   ```ts
   // OCP: cada canal nuevo se agrega con una clase que implementa Canal, sin modificar Notificador
   interface Canal { ... }
   ```
4. **Mové cada rama del `if`** a su propia clase.
5. **Recibí las dependencias por constructor** y crealas en el bloque de prueba.
6. **Ejecutá de nuevo**: la salida tiene que ser **idéntica** a la original (un refactor **no cambia el comportamiento**).
7. Commit: `refactor(ej3): aplicar OCP y DIP`.

---

## 10. Trampas y diferencias que se preguntan

1. **SRP ≠ "un método por clase".** Es un motivo de cambio.
2. **OCP no prohíbe tocar código nunca**: prohíbe tener que modificar código **estable** para **agregar** casos.
3. **LSP** es sobre **herencia/subtipos**; **ISP** es sobre **interfaces grandes**.
4. **DIP** no es "usar interfaces porque sí": es que **lo de alto nivel no conozca lo de bajo nivel**.
5. **Refactorizar** = cambiar la estructura **sin cambiar el comportamiento**. Si la salida cambió, no es refactor.
6. Un **switch dentro de una Factory** es aceptable: está **en un solo lugar** y su trabajo es justamente decidir qué crear.
7. **Composition root**: el único lugar donde se hace `new` de las clases concretas y se conectan.

---

## 📌 Lo que tenés que saber sí o sí

- **S**: una razón para cambiar. **O**: extender sin modificar (interface + clase por caso). **L**: la hija reemplaza al padre sin sorpresas. **I**: interfaces chicas. **D**: depender de abstracciones y recibirlas por constructor.
- Señales: clase que hace de todo (S) · `if` que crece (O) · hija que lanza "no soportado" (L) · interface gorda (I) · `new` adentro (D).
- Bajo **acoplamiento**, alta **cohesión**.
- DIP permite **dobles de prueba** → base del testing.
- En el examen: comentario `// OCP: ...` / `// DIP: ...` arriba de cada interface y **misma salida** que el original.

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
