# Tema 7 · Práctica extra: Torneo Deportivo y repaso de teoría

> Este tema hace dos cosas: (1) un TP de **POO pura** (el del Torneo) que repasa todo el primer cuatrimestre, ahora **con pruebas de Vitest** del segundo; y (2) un **repaso teórico** de todo el año con las trampas más frecuentes.

## 1. El TP del Torneo: qué concepto se practica en cada pieza

| Pieza | Concepto |
|---|---|
| `IIdentificable`, `ICompetidor` | Interfaces como contratos; una clase puede implementar varias |
| `Jugador.posicion?` | Propiedad opcional (`string \| undefined`) y `\|\|` para el valor por defecto |
| `Equipo.jugadores` privado + `agregarJugador` | Encapsulamiento y validación (sin duplicados por id) |
| `get cantidad` | Getter calculado |
| `abstract class Deporte` + `validar` | Clase abstracta, método abstracto, **polimorfismo**, **OCP** |
| `protected maxPorEquipo` | Visibilidad para las hijas |
| Validación en el constructor de `Partido` | Objetos que nunca pueden quedar inválidos |
| `resultado?: Resultado` | Composición opcional + narrowing (`this.resultado ? ... : "sin jugar"`) |
| `listarPartidos(): [...]` | Copia defensiva |
| `ConfigTorneo` en vez de `any` | Tipado estricto con uniones de literales |
| `catch (e)` + `instanceof Error` | Manejo de errores sin `any` |

### Detalle: probar código con azar
`Partido.jugar()` usa `Math.random()`. Un test que dependa del azar sería **no determinista**. Dos soluciones:
- **Espiar** `Math.random` con `vi.spyOn(Math, "random").mockReturnValueOnce(0.5)` (lo hace `02-ejemplos/torneo.test.ts`).
- **Inyectar** un generador (DIP): `new Partido(..., generador)` con `generador.siguiente()`. Es más limpio para diseño; el espía es más rápido si no podés cambiar el código.

### Detalle: módulos para poder testear
En el primer cuatrimestre cada archivo terminaba con un bloque de prueba. Para testear con Vitest, las clases se **exportan** (`export class ...`) desde `torneo.ts` y el bloque de prueba pasa a `demo.ts`: si el archivo testeado imprimiera al importarse, ensuciaría la salida de los tests.

## 2. Repaso rápido de teoría (tabla de la guía, ampliada)

| Pregunta típica | Respuesta corta |
|---|---|
| Clase abstracta vs. interface | La abstracta puede tener estado y métodos con código y no se instancia; la interface solo declara el contrato. Una clase extiende **una** sola clase pero implementa **varias** interfaces |
| Override vs. overload | Override: la subclase redefine un método heredado con la misma firma. Overload: la misma clase declara varias firmas del mismo nombre |
| Abstracción vs. encapsulamiento | Abstracción: modelar solo lo que importa. Encapsulamiento: el objeto protege su estado y se accede por sus métodos |
| `private` vs. `protected` | `private`: solo la propia clase. `protected`: la clase y sus hijas. Ninguno es accesible desde afuera |
| `readonly` | Se asigna una vez (al declarar o en el constructor) y no se puede reasignar |
| `static` | Pertenece a la clase, no a cada instancia; se accede como `Clase.atributo` |
| Herencia vs. composición | Herencia si hay relación "es un" (`EmpleadoFijo` es un `Empleado`); composición si es "tiene un" (`Auto` tiene un `Motor`) |
| Getter sin regla | Si el getter/setter solo copia el valor, es burocracia: da lo mismo que una propiedad pública |
| Qué patrón es cada uno | Singleton y Factory: **creacionales**. Adapter: **estructural**. Observer: **comportamental** |
| Señal de OCP / DIP | OCP: un `switch` o `if` que crece. DIP: un `new` de una clase concreta adentro de otra clase |
| Señal de SRP / LSP / ISP | SRP: una clase con varios motivos de cambio. LSP: una subclase que rompe lo que espera la base. ISP: métodos que lanzan `throw` porque no corresponden |
| Pruebas unitarias vs. integración | Unitaria: una función o clase aislada. Integración: varias partes juntas (ruta de Express + servicio con Supertest) |
| `npm test` vs. `npm run typecheck` | Pruebas: comportamiento (ejecuta). `tsc --noEmit`: tipos, sin ejecutar |
| Stub vs. spy vs. fake | Stub: respuestas preprogramadas. Spy: registra cómo fue llamado (`vi.fn`). Fake: implementación simplificada que funciona (repo en memoria) |
| 401 vs. 403 | 401: no autenticado. 403: autenticado sin permiso |
| Docker: imagen vs. contenedor | La imagen es la plantilla; el contenedor es una instancia en ejecución de esa imagen |
| Docker Compose | Define y levanta varios servicios juntos (`docker compose up --build`); entre servicios se alcanzan por su nombre |

## 3. Trampas de las preguntas de múltiple opción
- En las preguntas de patrones, la opción incorrecta suele ser una ventaja o desventaja de **otro** patrón. Identificá primero el patrón.
- Si el enunciado dice "sin modificar el código existente", pensá en **OCP** o en un patrón que lo permite (Factory, Adapter, Observer).
- "Una clase hija no puede acceder" apunta a `private`; "solo la clase y sus hijas" apunta a `protected`.
- Que el programa funcione no significa que esté bien diseñado: en SOLID, el código de los ejemplos corre, pero igual está mal.
- Ejecutar un `.ts` con Node no verifica tipos: para eso está `tsc`.
- Un test que pasa no prueba que no haya defectos: prueba **ese caso**.
- `toBe` con objetos compara referencias; para contenido, `toEqual`.

Para practicar con preguntas, ver `repaso-final/` en la raíz del curso.
