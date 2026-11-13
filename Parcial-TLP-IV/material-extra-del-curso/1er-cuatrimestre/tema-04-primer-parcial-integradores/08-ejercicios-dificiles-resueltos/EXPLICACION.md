# Tema 4 · Integrador difícil (Gimnasio): resolución explicada

## Tabla clase → concepto

| Clase / elemento | Concepto, patrón o principio | Frase del enunciado que lo delata |
|---|---|---|
| `ConfiguracionGimnasio` | **Singleton** + `readonly` | "un único lugar en todo el sistema", "nadie puede reasignar" |
| `Plan` (abstracta) + 3 hijas | **Clase abstracta, herencia, polimorfismo**, **OCP** | "no hay plan genérico", "agregar un plan no obliga a modificar otra clase" |
| `Plan.actividades()` `protected abstract` | **Encapsulamiento** | "no se consulta desde afuera" |
| `FabricaPlanes` | **Factory** | "se crean solo con FabricaPlanes.crear" |
| `Socio` | **Encapsulamiento** (getters sin setter + métodos), **static**, `readonly`, validación en constructor | "se leen sin paréntesis pero solo cambian con..." |
| `ClaseGrupal` | **Observer (sujeto)** | "se avisa a los interesados sin que la clase los conozca" |
| `ObservadorClase`, `AvisoSocio`, `RegistroRecepcion` | **Observer** | |
| `Notificador` + `AvisoSocio(notificador)` | **DIP** | "un canal que recibe por constructor" |
| `ControlAcceso`, `MolineteAdapter`, `MolineteLegacy` | **Adapter** + **ISP** (interfaz de un método) + **DIP** | "no se modifica", "tiene que trabajar con algo que responda...", "recibirlo por constructor" |
| `Gimnasio` | **SRP** (no calcula precios ni notifica ni abre puertas) + **DIP** | |

## Puntos finos
- **El Singleton dentro de las hijas de `Plan`:** cada plan lee los precios de `ConfiguracionGimnasio`. Si mañana sube la cuota base, se cambia en un solo lugar y los tres planes se actualizan.
- **`permite()` en el padre usa `actividades()` de la hija:** la regla "¿incluye esta actividad?" se escribe una vez. `ClaseGrupal` pregunta `socio.plan.permite(...)` y nunca `instanceof PlanLibre`.
- **`EventoClase["tipo"]`** es un *indexed access type*: "el tipo de la propiedad `tipo` de `EventoClase`" (o sea, `"inscripto" | "en-espera" | "promovido"`). Evita repetir la unión.
- **`const textos = { inscripto: ..., "en-espera": ..., promovido: ... }`** y `textos[e.tipo]`: un objeto como tabla de traducción en lugar de un `switch`. Como las claves coinciden con la unión, TypeScript sabe que el acceso es válido.
- **El adapter traduce dos cosas:** `Number(dni)` (texto → número) y `=== 1` (número → boolean).
- **El orden importa en `ingresar`:** primero se verifica que sea socio y que esté activo, y **recién después** se abre el molinete. Por eso el contador de aperturas da 1: Dani (suspendido) y el no socio nunca llegaron al molinete.
- **`Socio.totalAltas()` da 4:** el alta duplicada de Ana falla **antes** de hacer `new Socio`, así que no cuenta.
- **Recaudación:** Ana 30000 + Beto 17000 + Caro 17000 (cambió a trimestral) = 64000. Dani está suspendida y no suma.
- **Detalle de diseño discutible (buena pregunta de defensa oral):** `Gimnasio.alta` usa la fábrica directamente (`FabricaPlanes.crear`). Es una dependencia concreta escondida, igual que usar un Singleton desde adentro. Una alternativa más "DIP" sería inyectar la fábrica. En la materia se acepta usar la fábrica estática, pero tenés que saber explicar la diferencia.
