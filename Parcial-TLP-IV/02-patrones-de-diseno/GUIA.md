# 02 · Patrones de diseño

> **Requisito:** haber leído el tema 01 (interfaces, herencia, polimorfismo, `static`).
> **Objetivo:** reconocer y escribir de memoria **Singleton, Factory Method, Observer y Adapter**, y saber su problema, solución, ventajas y desventajas.

---

## 1. ¿Qué es un patrón de diseño?

Un **patrón de diseño** es una **solución probada y reutilizable** a un **problema que aparece una y otra vez** al diseñar software. No es código para copiar y pegar: es una **idea de cómo organizar clases** que podés adaptar a tu caso.

Analogía: en arquitectura de casas, "poner la cocina cerca del comedor" es un patrón. No te dice de qué color pintar, pero resuelve un problema que todos tienen.

Los patrones clásicos los publicaron en 1994 cuatro autores conocidos como **"Gang of Four" (GoF)** en el libro *Design Patterns*. Definieron 23 patrones.

Cada patrón se describe con:
- **Problema**: qué situación lo motiva.
- **Solución**: qué clases y relaciones propone.
- **Consecuencias**: ventajas y desventajas.

---

## 2. Las tres categorías

| Categoría | ¿De qué se ocupa? | Patrones que vemos |
|---|---|---|
| **Creacionales** | **Cómo se crean** los objetos | **Singleton**, **Factory Method** |
| **Estructurales** | **Cómo se combinan** clases y objetos | **Adapter** |
| **Comportamentales** | **Cómo se comunican** y reparten responsabilidades | **Observer** |

> Truco para recordar: **C**rear · **E**structura · **C**omportamiento.
> "Singleton y Factory **crean**; Adapter **adapta una estructura**; Observer **avisa** (comportamiento)".

---

## 3. Singleton (creacional)

### Problema
Necesitás que de una clase exista **una única instancia** en todo el programa y que sea **accesible desde cualquier lado**. Ejemplos: la configuración de la app, la conexión a la base de datos, un logger, el inventario central.

Si cualquiera puede hacer `new Configuracion()`, podrías terminar con dos configuraciones distintas y datos inconsistentes.

### Solución: las 3 piezas (se preguntan siempre)

```ts
class Configuracion {
  // 1️⃣ Atributo ESTÁTICO y PRIVADO que guarda la única instancia
  private static instancia: Configuracion | null = null;

  private moneda: string;

  // 2️⃣ Constructor PRIVADO: nadie de afuera puede hacer "new Configuracion()"
  private constructor() {
    this.moneda = "ARS";
  }

  // 3️⃣ Método ESTÁTICO PÚBLICO que crea la instancia la primera vez y después siempre devuelve la misma
  static obtenerInstancia(): Configuracion {
    if (Configuracion.instancia === null) {
      Configuracion.instancia = new Configuracion();   // adentro de la clase SÍ se puede usar new
    }
    return Configuracion.instancia;
  }

  obtenerMoneda(): string { return this.moneda; }
  cambiarMoneda(m: string): void { this.moneda = m; }
}

// Uso
const a = Configuracion.obtenerInstancia();
const b = Configuracion.obtenerInstancia();
console.log(a === b);          // true → es EL MISMO objeto
a.cambiarMoneda("USD");
console.log(b.obtenerMoneda()); // "USD" → porque a y b son el mismo

new Configuracion();           // ❌ Error: Constructor of class 'Configuracion' is private
```

### ¿Por qué cada pieza?
- **`private static instancia`**: `static` porque tiene que existir **antes** de que haya objetos (es de la clase); `private` para que nadie la pise desde afuera.
- **`private constructor`**: es lo que **impide** crear más instancias.
- **`static obtenerInstancia()`**: `static` porque se llama **sin tener un objeto** (`Clase.obtenerInstancia()`). La creación "la primera vez que se pide" se llama **inicialización perezosa (lazy)**.

### Ventajas
- Garantiza **una única instancia**.
- **Punto de acceso global** controlado.
- Se crea **solo cuando se necesita** (lazy).

### Desventajas (se preguntan)
- **Dificulta las pruebas unitarias**: el estado se **arrastra** de un test a otro (si un test cambia la moneda, el siguiente la ve cambiada) y no se puede reemplazar fácilmente por un doble.
- Es **estado global** disfrazado: cualquier parte del código puede modificarlo → acoplamiento oculto.
- Puede **violar SRP**: la clase hace su trabajo **y además** controla cuántas instancias hay.

### Señales en la consigna
"una única instancia", "debe existir solo un...", "acceso global", "el valor se lee del Singleton".

---

## 4. Factory Method (creacional)

### Problema
El código cliente necesita crear objetos de **distintas clases concretas** según algún dato (un tipo, un texto), y no querés que el cliente esté lleno de `new` y de `if`:

```ts
// ❌ Sin fábrica: el cliente conoce TODAS las clases concretas
let envio;
if (tipo === "estandar") envio = new EnvioEstandar();
else if (tipo === "express") envio = new EnvioExpress();
else if (tipo === "internacional") envio = new EnvioInternacional();
// Y este if se repite en cada lugar donde se crea un envío...
```

### Solución
Se **centraliza la creación** en un método (la "fábrica") que **devuelve el tipo común** (una interface o clase abstracta). El cliente pide "un envío express" y recibe un `Envio`, sin saber qué clase concreta es.

```ts
// 1. El producto: la interface común
interface Envio {
  costo(pesoKg: number): number;
  descripcion(): string;
}

// 2. Los productos concretos
class EnvioEstandar implements Envio {
  costo(pesoKg: number): number { return 1000 + pesoKg * 100; }
  descripcion(): string { return "Envío estándar (5 días)"; }
}
class EnvioExpress implements Envio {
  costo(pesoKg: number): number { return 3000 + pesoKg * 200; }
  descripcion(): string { return "Envío express (24 h)"; }
}

type TipoEnvio = "estandar" | "express";

// 3. La fábrica (variante estática, la que se pidió en el primer parcial)
class FabricaEnvios {
  static crear(tipo: TipoEnvio): Envio {      // devuelve la INTERFACE, no la clase concreta
    switch (tipo) {
      case "estandar": return new EnvioEstandar();
      case "express":  return new EnvioExpress();
    }
  }
}

// Uso: el cliente NO usa new sobre las clases concretas
const e = FabricaEnvios.crear("express");
console.log(e.descripcion(), e.costo(2));   // "Envío express (24 h)" 3400
```

> "¿Y el `switch` no es lo mismo que el `if` de antes?" Sí, **pero está en un único lugar**. Si mañana agregás `EnvioInternacional`, tocás solo la fábrica; el resto del programa no se entera.

### Versión "clásica" GoF (con subclases creadoras)

En el libro original, el Factory Method es un **método abstracto** en una clase creadora, y cada subclase decide qué producto crear:

```ts
abstract class Logistica {
  abstract crearTransporte(): Transporte;          // ← el "factory method"
  planificarEntrega(): string {
    const t = this.crearTransporte();               // usa el producto sin saber cuál es
    return t.entregar();
  }
}
class LogisticaTerrestre extends Logistica {
  crearTransporte(): Transporte { return new Camion(); }
}
class LogisticaMaritima extends Logistica {
  crearTransporte(): Transporte { return new Barco(); }
}
```

En el curso se usa mayormente la variante **estática con un parámetro** (`Fabrica.crear(tipo)`), que es la que se pide en el parcial. Conocé las dos.

### Ventajas
- **Desacopla** al cliente de las clases concretas (depende solo de la interface).
- **Centraliza** la creación: un solo lugar para cambiar.
- Facilita agregar productos nuevos.

### Desventajas
- Agrega **más clases** e indirección (más código para un problema chico).
- En la variante con `switch`, la fábrica **sí** se modifica al agregar un producto.

### Señales en la consigna
"fábrica", "`crear(tipo)`", "nadie más usa `new` sobre...", "según el tipo, crear...", "el cliente no debe conocer las clases concretas".

---

## 5. Observer (comportamental)

### Problema
Un objeto (el **sujeto**) cambia de estado y **varios otros objetos** (los **observadores**) necesitan enterarse, **sin que el sujeto los conozca en detalle**. Ejemplos: un pedido cambia de estado → avisar a cocina, al cliente y a delivery; un canal de YouTube publica un video → avisar a los suscriptores.

Sin el patrón, el sujeto termina con algo como:

```ts
cambiarEstado(e) {
  this.estado = e;
  cocina.avisar(e);       // ❌ el pedido conoce a cocina,
  cliente.notificar(e);   //    al cliente,
  delivery.enterar(e);    //    al delivery... y cada nuevo interesado obliga a modificar esto
}
```

### Solución
1. Una **interface `Observador`** con un método (ej.: `actualizar(dato)`).
2. El **sujeto** tiene una **lista de observadores** y métodos para **suscribir**, **desuscribir** y **notificar**.
3. Cuando cambia, recorre la lista y llama `actualizar()` en cada uno.

```ts
// 1. El contrato de los observadores
interface Observador {
  actualizar(estado: string): void;
}

// 2. El sujeto
class Pedido {
  private observadores: Observador[] = [];
  private estado: string = "creado";

  suscribir(o: Observador): void {
    this.observadores.push(o);
  }

  desuscribir(o: Observador): void {
    this.observadores = this.observadores.filter(x => x !== o);
  }

  private notificar(): void {
    for (const o of this.observadores) {
      o.actualizar(this.estado);       // no sabe QUÉ es cada observador: polimorfismo
    }
  }

  cambiarEstado(nuevo: string): void {
    this.estado = nuevo;
    this.notificar();                  // cada cambio avisa a todos
  }
}

// 3. Observadores concretos
class Cocina implements Observador {
  actualizar(estado: string): void { console.log(`[Cocina] pedido ${estado}`); }
}
class Cliente implements Observador {
  private nombre: string;
  constructor(nombre: string) { this.nombre = nombre; }
  actualizar(estado: string): void { console.log(`[${this.nombre}] tu pedido está ${estado}`); }
}

// Uso
const p = new Pedido();
const cocina = new Cocina();
p.suscribir(cocina);
p.suscribir(new Cliente("Ana"));
p.cambiarEstado("en preparación");
// [Cocina] pedido en preparación
// [Ana] tu pedido está en preparación
p.desuscribir(cocina);
p.cambiarEstado("enviado");
// [Ana] tu pedido está enviado
```

### Vocabulario
| Término | Sinónimos |
|---|---|
| Sujeto | Subject, Observable, Publicador (publisher) |
| Observador | Observer, Suscriptor (subscriber), Listener |
| suscribir / desuscribir | attach / detach, subscribe / unsubscribe |
| notificar | notify |

### Ventajas
- **Bajo acoplamiento**: el sujeto solo conoce la interface `Observador`.
- Se agregan observadores nuevos **sin modificar** el sujeto (cumple OCP).
- Relación **uno a muchos** dinámica (se suscriben y desuscriben en tiempo de ejecución).

### Desventajas
- **Orden de notificación** no garantizado / difícil de controlar.
- **Notificaciones en cascada**: un observador que a su vez modifica otro sujeto puede disparar cadenas difíciles de seguir.
- Si te olvidás de desuscribir, quedan observadores "colgados" (pérdidas de memoria).
- Más difícil de **depurar**: no se ve en el código quién reacciona.

### Señales en la consigna
"avisa a...", "notifica cuando cambia", "suscribirse", "los interesados", "cada vez que cambia el estado".

> Conexión con la teoría de arquitecturas: el Observer es la versión "dentro de un programa" de la **arquitectura dirigida por eventos** (Productor → Broker → Suscriptores).

---

## 6. Adapter (estructural)

### Problema
Tenés una clase **vieja o externa** (de una librería, de otro equipo, de un sistema heredado) que hace lo que necesitás, pero con una **interface incompatible** (otros nombres de métodos, otras unidades, otros formatos). **No podés o no querés modificarla.**

Ejemplo: tu sistema trabaja con `obtenerCelsius()`, pero el sensor viejo solo tiene `leerFahrenheit()`.

### Solución
Crear una clase **adaptador** que:
1. **Implementa** la interface **nueva** (la que tu sistema espera).
2. **Contiene** (composición) un objeto de la clase **vieja**.
3. **Traduce** cada llamada nueva a la vieja.

```ts
// La interface que espera nuestro sistema (el "Target")
interface SensorTemperatura {
  obtenerCelsius(): number;
}

// La clase vieja que NO podemos modificar (el "Adaptee")
class SensorViejoFahrenheit {
  leerFahrenheit(): number { return 86; }
}

// El Adapter
class AdaptadorSensor implements SensorTemperatura {
  private sensorViejo: SensorViejoFahrenheit;        // CONTIENE a la vieja

  constructor(sensorViejo: SensorViejoFahrenheit) {
    this.sensorViejo = sensorViejo;
  }

  obtenerCelsius(): number {                          // TRADUCE
    const f = this.sensorViejo.leerFahrenheit();
    return Math.round((f - 32) * 5 / 9);
  }
}

// El cliente solo conoce SensorTemperatura
function mostrar(s: SensorTemperatura): void {
  console.log(`Temperatura: ${s.obtenerCelsius()} °C`);
}

mostrar(new AdaptadorSensor(new SensorViejoFahrenheit()));   // Temperatura: 30 °C
```

### Partes (nombres del libro)
| Parte | Qué es | En el ejemplo |
|---|---|---|
| **Target** | La interface que el cliente espera | `SensorTemperatura` |
| **Adaptee** | La clase existente incompatible | `SensorViejoFahrenheit` |
| **Adapter** | La que implementa Target y usa al Adaptee | `AdaptadorSensor` |
| **Client** | Quien usa el Target | `mostrar()` |

> La versión que vemos es el **adaptador de objetos** (por **composición**). Existe también el **adaptador de clases** (por herencia), menos usado.

### Ventajas
- Permite **reutilizar** código existente **sin modificarlo** (cumple OCP).
- Cumple **SRP**: la traducción queda separada en su propia clase.
- El cliente queda desacoplado del sistema viejo.

### Desventajas
- Agrega **una capa extra** (más clases, una indirección más).
- Si las interfaces son muy distintas, el adaptador puede volverse complejo.

### Señales en la consigna
"adaptar la clase vieja", "sin modificar la clase existente", "sistema heredado / legacy", "librería externa con otros nombres", "convertir unidades/formatos".

---

## 7. Cuadro comparativo (para memorizar)

| | Singleton | Factory Method | Observer | Adapter |
|---|---|---|---|---|
| **Categoría** | Creacional | Creacional | Comportamental | Estructural |
| **Problema** | Una sola instancia global | Crear objetos sin acoplar al cliente a clases concretas | Avisar cambios a muchos interesados | Interfaces incompatibles |
| **Pieza clave** | `private constructor` + `static obtenerInstancia()` | Método que devuelve la interface (`crear(tipo)`) | Lista de observadores + `notificar()` | Implementa la nueva + contiene la vieja |
| **Ventaja típica** | Instancia única, acceso global | Desacopla y centraliza la creación | Bajo acoplamiento uno-a-muchos | Reutilizar sin modificar |
| **Desventaja típica** | **Dificulta los tests**, estado global | Más clases | Orden y cascadas de notificaciones | Capa extra |
| **Ejemplo real** | Conexión a la BD, configuración | Crear notificadores (email/SMS) | Suscripciones, eventos de UI | Integrar un sistema de pagos viejo |

---

## 8. Cómo reconocer un patrón en código ajeno

| Si ves... | Es... |
|---|---|
| `private constructor` y `static getInstance()` / `obtenerInstancia()` | **Singleton** |
| Un método (a menudo `static`) que recibe un tipo y devuelve una interface con `new` adentro | **Factory Method** |
| Una lista de objetos de una interface + `suscribir`/`notificar` con un `for` | **Observer** |
| Una clase que `implements X` y tiene adentro un objeto de **otra** clase a la que le "traduce" llamadas | **Adapter** |

---

## 9. Patrones combinados (lo que aparece en el integrador)

En el proyecto Biblioteca del segundo cuatrimestre, **los cuatro aparecen en un mismo flujo**:

```
LibroService.changeStatus()
   └─► EventPublisher.notify()            ← OBSERVER (el libro cambió de estado)
          └─► NotificationService.update()
                 ├─► DatabaseConnection.getInstance()   ← SINGLETON (busca las suscripciones)
                 └─► NotifierFactory.create(canal)     ← FACTORY (crea el notificador según el canal)
                        ├─► InAppNotifier
                        └─► ConsoleNotifierAdapter    ← ADAPTER (adapta un logger viejo)
```

Agregar un canal nuevo = una clase que implementa `INotifier` + un caso en la fábrica. **Nada más cambia.**

---

## 10. Trampas y preguntas típicas

1. **"El constructor de un Singleton es..."** → `private`.
2. **"Una desventaja del Singleton"** → dificulta las pruebas unitarias (estado compartido entre tests).
3. **"¿Qué patrón hace que dos interfaces incompatibles trabajen juntas?"** → Adapter.
4. **"Singleton y Factory son..."** → creacionales. **Observer** → comportamental. **Adapter** → estructural.
5. **"Una desventaja del Observer"** → notificaciones en cascada / orden no garantizado.
6. **"Una desventaja del Adapter"** → agrega una capa extra.
7. En el Singleton, `obtenerInstancia()` usa `Clase.instancia`, no `this.instancia` (aunque en un método estático `this` es la clase, en el curso se usa el nombre).
8. La fábrica devuelve **la interface**, no la clase concreta: `static crear(tipo): Envio`, no `: EnvioExpress`.
9. En el Adapter **no se modifica** la clase vieja. Si la modificaste, no es un adapter.
10. El Observer **notifica a todos** los suscriptos; si desuscribiste a uno, no debe recibir nada más (en testing: `not.toHaveBeenCalled()`).

---

## 📌 Lo que tenés que saber sí o sí

- **Patrón** = solución probada a un problema recurrente. GoF, 1994, 23 patrones.
- **Creacionales**: Singleton, Factory. **Estructural**: Adapter. **Comportamental**: Observer.
- **Singleton**: `private static instancia` + `private constructor` + `static obtenerInstancia()`. Desventaja: dificulta los tests.
- **Factory**: `static crear(tipo): Interface`. El cliente no hace `new` de clases concretas.
- **Observer**: interface `Observador { actualizar() }` + lista + `suscribir/desuscribir/notificar`.
- **Adapter**: `implements` la interface nueva + **contiene** la vieja + traduce. No se modifica la vieja.

➡️ Ahora andá a [ejercicios/EJERCICIOS.md](ejercicios/EJERCICIOS.md).
