# Tema 2 · Patrones de diseño

> **Objetivo:** reconocer y escribir a mano los cuatro patrones de la materia (**Singleton, Factory Method, Observer y Adapter**), saber a qué categoría pertenece cada uno, qué problema resuelven, sus ventajas y desventajas, y **detectarlos dentro de un código ajeno**.

Índice:
1. [¿Qué es un patrón de diseño?](#1-qué-es-un-patrón-de-diseño)
2. [Las tres categorías](#2-las-tres-categorías)
3. [Singleton](#3-singleton-creacional)
4. [Factory Method (y la fábrica simple)](#4-factory-method-creacional)
5. [Observer](#5-observer-comportamental)
6. [Adapter](#6-adapter-estructural)
7. [Cuadro comparativo (el que más se pregunta)](#7-cuadro-comparativo)
8. [Cómo reconocer un patrón en código ajeno](#8-cómo-reconocer-un-patrón-en-código-ajeno)
9. [Patrones combinados](#9-patrones-combinados)
10. [Trampas y preguntas típicas](#10-trampas-y-preguntas-típicas)

---

## 1. ¿Qué es un patrón de diseño?

Un **patrón de diseño** es una **solución probada y reutilizable a un problema que aparece una y otra vez** al diseñar software orientado a objetos. No es código para copiar y pegar ni una librería: es una **plantilla de cómo organizar clases y objetos**, con un nombre que todos los programadores conocen.

Vienen del libro *Design Patterns* (1994) de Gamma, Helm, Johnson y Vlissides, conocidos como la **"Gang of Four" (GoF)**. El libro describe 23 patrones; en la materia se ven 4.

Cada patrón se describe con:
- **Nombre** (vocabulario común: decir "acá va un Observer" ahorra media hora de explicación).
- **Problema** que resuelve.
- **Solución** (estructura de clases e interfaces).
- **Consecuencias** (ventajas y desventajas).

> **Importante para la materia:** los patrones se implementan **a mano**. En el integrador está **prohibido** usar `EventEmitter` de Node para el Observer o una librería de inyección de dependencias. Si lo resuelve una librería, no lo implementaste vos.

## 2. Las tres categorías

| Categoría | Se ocupan de... | Patrones de la materia |
|---|---|---|
| **Creacionales** | **Cómo se crean** los objetos | Singleton, Factory Method |
| **Estructurales** | **Cómo se componen/conectan** clases y objetos | Adapter |
| **Comportamentales** | **Cómo se comunican** los objetos y se reparten responsabilidades | Observer |

Regla mnemotécnica: **crear** → creacional; **conectar estructuras** → estructural; **comunicarse/avisar** → comportamental.

---

## 3. Singleton (creacional)

### Problema
Necesitás que de una clase exista **una única instancia** en todo el programa y que sea **accesible desde cualquier lugar**. Ejemplos: la conexión a la base de datos, la configuración de la empresa, un registro (log) central, el inventario único.

### Solución (las 3 piezas que siempre se preguntan)

```ts
class Inventario {
  private static instancia: Inventario | undefined;  // ① atributo STATIC que guarda la única instancia
  private equipos: Equipo[];

  private constructor() {                             // ② constructor PRIVATE: nadie puede hacer new
    this.equipos = [];
  }

  static obtenerInstancia(): Inventario {             // ③ método STATIC de acceso
    if (Inventario.instancia === undefined) {         //    crea la instancia SOLO la primera vez
      Inventario.instancia = new Inventario();        //    (inicialización perezosa / lazy)
    }
    return Inventario.instancia;                      //    y después siempre devuelve la misma
  }
}

const a = Inventario.obtenerInstancia();
const b = Inventario.obtenerInstancia();
console.log(a === b);          // true: es el MISMO objeto
// new Inventario();           ❌ Constructor of class 'Inventario' is private
```

1. **`private constructor`** → impide `new Inventario()` desde afuera. Es la única forma de garantizar que no se cree una segunda instancia.
2. **`private static instancia`** → `static` porque pertenece a la clase (no a un objeto); `private` para que nadie la reemplace. Tipo `Inventario | undefined` porque al principio no existe.
3. **`static obtenerInstancia()`** → `static` porque se llama **antes** de tener un objeto (no podrías llamar a un método de instancia sin instancia). Crea solo si no existe.

> Se llama `obtenerInstancia()`, `getInstance()` o similar. El nombre no importa; las tres piezas sí.

### Ventajas
- **Control de recursos compartidos** (una sola conexión, una sola configuración).
- Evita crear objetos de más.
- Punto de acceso global y controlado.
- Inicialización perezosa: se crea recién cuando se necesita.

### Desventajas
- **Problemas en entornos concurrentes** (en lenguajes con hilos, dos hilos podrían crear dos instancias a la vez).
- **Dificulta las pruebas unitarias**: el estado persiste entre tests y no se puede reemplazar fácilmente por un doble.
- Es, en el fondo, un **estado global**: acopla a todos los que lo usan.
- Puede violar **SRP**: la clase hace su trabajo **y además** controla cuántas instancias hay.

### Variante: Singleton con datos fijos de configuración
```ts
class ConfiguracionEmpresa {
  private static instancia: ConfiguracionEmpresa | undefined;
  readonly recargoExpress = 2500;            // valor fijo que nadie puede reasignar
  private constructor() {}
  static obtenerInstancia(): ConfiguracionEmpresa { /* igual que arriba */ }
}
// Uso: ConfiguracionEmpresa.obtenerInstancia().recargoExpress
```
Ventaja (primer parcial): `EnvioExpress` no escribe `2500`, lo **pide** al Singleton. Hay **un único lugar** donde cambiarlo.

---

## 4. Factory Method (creacional)

### Problema
El código que **usa** objetos no debería saber **qué clase concreta** crear ni cómo. Si en todo el programa aparece `new Notebook(...)`, `new Desktop(...)`, cada tipo nuevo obliga a tocar muchos lugares.

### Solución
Se **delega la creación** a un método/clase "fábrica" que recibe un parámetro (el tipo) y **devuelve un objeto del tipo común** (interfaz o clase abstracta). Quien la usa solo conoce el tipo común.

```ts
abstract class EquipoBase {                          // ① producto: el TIPO COMÚN
  protected nombre: string;
  constructor(nombre: string) { this.nombre = nombre; }
  abstract detalles(): string;
}

class Notebook extends EquipoBase {                  // ② productos concretos
  detalles(): string { return `Tipo: Notebook, Nombre: ${this.nombre}`; }
}
class Desktop extends EquipoBase {
  detalles(): string { return `Tipo: Desktop, Nombre: ${this.nombre}`; }
}

class EquipoFactory {                                // ③ la fábrica
  crearEquipo(tipo: "Notebook" | "Desktop", nombre: string): EquipoBase {  // devuelve el tipo COMÚN
    switch (tipo) {
      case "Notebook": return new Notebook(nombre);  // los new viven SOLO acá
      case "Desktop":  return new Desktop(nombre);
    }
  }
}

const equipo = new EquipoFactory().crearEquipo("Notebook", "Dell XPS");
console.log(equipo.detalles());   // quien usa solo conoce EquipoBase.detalles()
```

Piezas para reconocerlo:
1. Un **tipo común** (interfaz o clase abstracta) que es lo que la fábrica **devuelve**.
2. Varias **clases concretas** que lo implementan/extienden.
3. Un **método creador** que decide qué clase instanciar según un parámetro. Los `new` de las clases concretas **solo aparecen ahí**.
4. El parámetro tipado con **unión de literales** (`"Notebook" | "Desktop"`): un tipo mal escrito no compila. (Recordá: sin `enum`.)

> **Nota de rigor:** el *Factory Method* "de libro" (GoF) define el método creador en una clase abstracta y deja que **subclases** decidan qué crear. Lo que se ve en la materia (y en la guía) es la versión simplificada, a veces llamada **Simple Factory**: una clase con un método (a veces `static`) y un `switch`/`if`. En el examen se le dice Factory / Factory Method. En la sección de ejemplos tenés las dos versiones.

### Variante estática (primer parcial, Tema B)
```ts
class FabricaEnvios {
  static crear(tipo: "estandar" | "express"): Envio {
    if (tipo === "estandar") return new EnvioEstandar();
    return new EnvioExpress();
  }
}
FabricaEnvios.crear("express").calcularCosto(3000);   // sin new de la fábrica
```

### Ventajas
- **Separa la creación del uso** (responsabilidad única: la fábrica crea, el resto usa).
- **Permite agregar tipos sin tocar el código que usa los objetos** (solo se agrega una clase y un `case`).
- Centraliza los `new`: si cambia cómo se construye un objeto, se cambia en un solo lugar.
- Desacopla: el cliente depende del tipo común, no de las clases concretas.

### Desventajas
- **Más clases y más complejidad** (para dos tipos simples puede ser exagerado).
- La fábrica en sí **sí** se modifica al agregar un tipo (un `case` más). Para evitarlo del todo hay variantes con registro de constructores, que exceden la materia.

---

## 5. Observer (comportamental)

### Problema
Cuando un objeto **cambia de estado**, **varios otros** objetos tienen que enterarse y reaccionar, **sin que el primero sepa quiénes son ni qué hacen**. Ejemplo: cuando un equipo pasa a "en reparación", hay que avisar a soporte, al log y al responsable del área.

Sin el patrón, el objeto que cambia terminaría así:
```ts
cambiarEstado(nuevo: string): void {
  this.estado = nuevo;
  soporte.avisar(...);       // ❌ conoce a todos
  log.escribir(...);         // ❌ cada interesado nuevo obliga a modificar esta clase
  mail.enviar(...);
}
```

### Solución
- **Sujeto (Subject / Observable / Publisher):** el que cambia. Guarda una **lista de observadores** y tiene métodos para **suscribir** (`agregarObservador` / `attach`), **desuscribir** (`quitarObservador` / `detach`) y **notificar** (`notificar` / `notify`).
- **Observador (Observer / Subscriber):** **interfaz** con un método (`actualizar` / `update`) que el sujeto llama cuando algo cambia.
- **Observadores concretos:** clases que implementan esa interfaz y deciden qué hacer.

```ts
interface Observador {                                    // ① el CONTRATO del observador
  actualizar(nombreEquipo: string, nuevoEstado: string): void;
}

class Soporte implements Observador {                     // ② observador concreto
  actualizar(nombreEquipo: string, nuevoEstado: string): void {
    console.log(`Soporte notificado: ${nombreEquipo} ha cambiado su estado a ${nuevoEstado}.`);
  }
}

class Equipo {                                            // ③ el SUJETO
  nombre: string;
  private estado: string;
  private observadores: Observador[];                     //    lista de la INTERFAZ, no de Soporte

  constructor(nombre: string, estado: string) {
    this.nombre = nombre;
    this.estado = estado;
    this.observadores = [];
  }

  agregarObservador(o: Observador): void { this.observadores.push(o); }       // suscribir
  quitarObservador(o: Observador): void {                                     // desuscribir
    this.observadores = this.observadores.filter((x) => x !== o);
  }

  cambiarEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
    this.notificar();                                     // cambia → avisa
  }

  private notificar(): void {                             // recorre y avisa, sin saber quiénes son
    for (const o of this.observadores) o.actualizar(this.nombre, this.estado);
  }
}
```

Puntos clave:
- El sujeto depende de la **interfaz `Observador`**, no de `Soporte`. Por eso se puede agregar un observador de mail o de log **sin tocar `Equipo`**.
- La relación es **uno a muchos**: un sujeto, muchos observadores.
- Variantes de **qué se envía** en la notificación:
  - *push*: el sujeto manda los datos (`actualizar(nombre, estado)` o un objeto evento).
  - *pull*: el sujeto se manda a sí mismo y el observador pide lo que necesita (`actualizar(sujeto)`).
- En el integrador se separa el sujeto en una clase propia (**`EventPublisher implements ISubject`**) y los observadores son servicios (**`NotificationService implements IObserver`**). Con `async`/`Promise` porque los observadores acceden a la base de datos.

> **Observer ≠ suscripción del usuario (pregunta del integrador):** el *observer* es un **objeto del backend** que reacciona al evento. Una *suscripción* es un **dato guardado** en la base que dice qué usuario sigue qué libro. El observer (`NotificationService`) **consulta** las suscripciones para saber a quién notificar.

### Ventajas
- **Bajo acoplamiento** entre quien avisa y quien escucha.
- Se agregan/quitan observadores **en ejecución** y **sin modificar el sujeto** (OCP).
- Modela muy bien eventos ("cuando pase X, hacé Y").

### Desventajas
- **Notificaciones en cascada difíciles de seguir** (un observador modifica algo que a su vez notifica a otros...).
- El **orden** de notificación no siempre está garantizado o es evidente.
- Si nunca se desuscriben, los observadores quedan "vivos" (fugas de memoria).
- Depurar es más difícil: no se ve en un solo lugar quién reacciona.

---

## 6. Adapter (estructural)

### Problema
Tenés una clase que **ya funciona** (código viejo, una librería, una API externa, `console.log`) pero su **interfaz no es la que tu sistema espera**. No podés (o no querés) modificarla.

Analogía: el adaptador de enchufe. El enchufe (clase vieja) no cambia; el tomacorriente (sistema nuevo) no cambia; el adaptador traduce entre los dos.

### Solución

```ts
// ① TARGET: el contrato que espera el sistema nuevo
interface Inventario {
  agregarEquipo(nombre: string, tipo: string, estado: string): void;
  listarEquipos(): EquipoRegistrado[];
}

// ② ADAPTEE: la clase vieja, con otra interfaz. NO SE MODIFICA.
class InventarioViejo {
  private items: string[] = [];
  agregarItem(texto: string): void { this.items.push(texto); }   // guarda "nombre|tipo|estado"
  obtenerItems(): string[] { return this.items; }
}

// ③ ADAPTER: implementa el target y GUARDA una referencia al adaptee (composición)
class AdaptadorInventario implements Inventario {
  private viejo: InventarioViejo;
  constructor(viejo: InventarioViejo) { this.viejo = viejo; }

  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.viejo.agregarItem(`${nombre}|${tipo}|${estado}`);        // TRADUCE la llamada
  }

  listarEquipos(): EquipoRegistrado[] {
    return this.viejo.obtenerItems().map((t) => {                 // TRADUCE la respuesta
      const [nombre, tipo, estado] = t.split("|");
      return { nombre, tipo, estado };
    });
  }
}
```

Las tres piezas (vocabulario GoF):
1. **Target** (objetivo): la interfaz que el cliente espera.
2. **Adaptee** (adaptado): la clase existente incompatible. **No se toca.**
3. **Adapter** (adaptador): implementa el target, **contiene** al adaptee y **traduce** cada llamada (nombres de métodos, formato de datos, sincrónico ↔ asincrónico...).

El adaptador **no reimplementa** la lógica: delega. Si ves que el "adaptador" hace todo el trabajo él mismo, no es un adapter.

Ejemplo del integrador: `ConsoleNotifierAdapter implements INotifier`. `console.log` recibe **texto** y no devuelve promesa; `INotifier.send` recibe un objeto **`Notification`** y devuelve `Promise<void>`. El adaptador convierte el objeto en una línea de texto y llama a `console.log`.

> Hay dos variantes: **adapter de objeto** (por composición, el que se usa en la materia) y **adapter de clase** (por herencia del adaptee). Preferí composición.

### Ventajas
- **Reutiliza sistemas viejos sin modificarlos.**
- El cliente no se entera de que atrás hay otra cosa.
- Aísla la "traducción" en un solo lugar (SRP).

### Desventajas
- **Agrega una capa extra** (una clase más, una indirección más).
- Si las interfaces son muy distintas, la traducción puede ser compleja o perder información.

---

## 7. Cuadro comparativo

| Patrón | Clasificación | Qué resuelve | Ventajas | Desventajas | Señal en el código |
|---|---|---|---|---|---|
| **Singleton** | Creacional | Una única instancia con acceso global | Control de recursos compartidos; evita crear objetos de más | Problemas en entornos concurrentes; dificulta las pruebas unitarias | `private constructor` + `private static instancia` + `static obtenerInstancia()` |
| **Factory Method** | Creacional | Delegar la creación de objetos a una fábrica | Separa la creación (responsabilidad única); permite agregar tipos sin tocar el código existente | Más clases y más complejidad | Método `crear(tipo)` con `switch`/`if` que devuelve una interfaz o clase abstracta |
| **Observer** | Comportamental | Avisar a varios objetos cuando algo cambia | Bajo acoplamiento entre quien avisa y quien escucha | Notificaciones en cascada difíciles de seguir | Lista de una interfaz + `agregar/quitar` + `notificar()` que recorre y llama a `actualizar()` |
| **Adapter** | Estructural | Hacer que dos interfaces incompatibles trabajen juntas | Reutiliza sistemas viejos sin modificarlos | Agrega una capa extra | Clase que `implements` la interfaz nueva y **contiene** un objeto viejo, traduciendo llamadas |

> **Truco para el examen:** en múltiple opción, las opciones incorrectas suelen ser **ventajas o desventajas de otro patrón**. Primero identificá qué patrón es y después elegí.
> Ejemplo: "¿Cuál es una desventaja del Observer?" a) dificulta las pruebas unitarias (Singleton ❌) b) agrega una capa extra (Adapter ❌) c) notificaciones en cascada difíciles de seguir ✅ d) más clases (Factory ❌).

## 8. Cómo reconocer un patrón en código ajeno

Preguntas para hacerse, en orden:
1. ¿Hay un **constructor `private`** y un **`static` que devuelve la instancia**? → **Singleton**.
2. ¿Hay un método que recibe un "tipo" y **devuelve distintas clases concretas** con un tipo de retorno común? → **Factory**.
3. ¿Hay una **lista de objetos de una interfaz** y un método que **la recorre llamando al mismo método** cuando algo cambia? → **Observer**.
4. ¿Hay una clase que **implementa una interfaz** y **guarda adentro un objeto de otra clase** con métodos de nombres distintos, y solo **traduce**? → **Adapter**.

## 9. Patrones combinados

En el examen y en el integrador los patrones aparecen **juntos**:

- **Factory + Singleton** (primer parcial): `EnvioExpress` (creado por la fábrica) lee el recargo del Singleton `ConfiguracionEmpresa`.
- **Observer + Factory + Adapter + Singleton** (integrador):
  1. `LibroService.changeStatus()` guarda el estado y avisa al `EventPublisher` (**Observer**, sujeto).
  2. El publisher llama a `update()` en `NotificationService` (**Observer**, observador).
  3. `NotificationService` lee suscripciones de la base vía `DatabaseConnection` (**Singleton**).
  4. Pide canales a `NotifierFactory.create('inapp' | 'console')` (**Factory**).
  5. `ConsoleNotifierAdapter` (**Adapter**) convierte la notificación en texto para `console.log`.

## 10. Trampas y preguntas típicas

1. **"El Singleton tiene el constructor protected"** → no: es `private` (si fuera `protected`, una subclase podría crear instancias).
2. **"El método getInstance es de instancia"** → no: es `static` (no hay instancia todavía).
3. **"Factory es estructural"** → no: creacional (se ocupa de **crear**).
4. **"Adapter modifica la clase vieja"** → no: justamente **no** la modifica.
5. **"Observer: el sujeto conoce a cada observador concreto"** → no: conoce solo la **interfaz**.
6. **Usar `EventEmitter`** en vez de implementar el Observer → prohibido en la materia.
7. **Fábrica que devuelve la clase concreta** (`crearEquipo(): Notebook`) → pierde el sentido: debe devolver el **tipo común**.
8. **Adapter que hereda en vez de componer** → funciona, pero la materia usa composición (el adaptador **tiene** al viejo).
9. **Singleton con `instancia` pública** → cualquiera podría reemplazarla.
10. En la fábrica, un `new` de una clase concreta **fuera** de la fábrica ("nadie más usa `new` sobre los envíos") → la consigna lo prohíbe.
