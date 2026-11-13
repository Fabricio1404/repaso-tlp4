# Tema 3 · Ejercicios medios: resolución explicada

## M1 · SRP + DIP
- **Motivos de cambio del original:** (1) reglas de formato (DNI, nombre), (2) dónde se guarda, (3) por dónde se notifica, (4) cómo se loguea, (5) reglas del proceso (cupo, duplicados). El servicio conserva solo la (5).
- **SRP:** `ValidadorAlumno` y `RepositorioInscripciones` separan responsabilidades. Fijate que la validación de **formato** está en el validador, pero la regla de **cupo** queda en el servicio: depende del estado del proceso, no del alumno.
- **DIP:** `Notificador` y `Registro` son interfaces. El servicio ya no hace `new NotificadorWhatsapp()`. Agregar `NotificadorEmail` no tocó el servicio.
- **Detalle de diseño:** el notificador recibe el `Alumno` (no solo el teléfono) para que cada canal elija el dato que necesita (WhatsApp usa el teléfono, Email usa el DNI). Si la interfaz recibiera `telefono`, el email no podría funcionar: una abstracción que "huele" a una implementación concreta es una abstracción mal elegida.
- **El cupo por constructor:** antes era un `readonly cupo = 2` fijo. Ahora se configura desde afuera (el segundo servicio tiene 30).
- **Mismo orden de operaciones** → misma salida. Si validaras el cupo antes que el DNI, `"DNI inválido: 12"` igual saldría, pero en otro escenario podría cambiar el mensaje: al refactorizar, **conservá el orden**.

## M2 · OCP + LSP
- **OCP:** el `switch (e.tipo)` desaparece. Cada clase implementa `sueldo()`. `Consultor` se agregó sin tocar `Liquidador`.
- **LSP:** en el original, `Pasante extends Empleado` heredaba `calcularBono()` y lo rompía con un `throw`. El liquidador tenía que "saber" que no debía llamarlo (`if (e.tipo !== "pasante")`): un cliente que necesita conocer la subclase para no romperse es la señal más clara de violación de LSP.
- **Solución:** el bono es una **capacidad aparte** (`ConBono`) que implementan solo planta y contratado. Nadie promete algo que no puede cumplir.
- **Se eliminó el atributo `tipo` en texto**, que se podía escribir mal (`"plnta"`) sin que el compilador avisara. El "tipo" ahora es la **clase**.
- Se usan interfaces en lugar de herencia porque cada tipo calcula todo distinto. Si hubiera mucho código compartido, una clase abstracta `EmpleadoBase implements Liquidable` también sería válida.

## M3 · ISP + DIP
- **ISP:** la interfaz gorda se parte en `Lectura`, `Escritura`, `Exportable`. `CatalogoPublico` implementa **solo** `Lectura`: desaparecen los tres `throw`.
- **DIP:** catálogo y servicio reciben la fuente por constructor.
- **"Lo mínimo que necesita":** `ServicioPrecios` solo usa `listar()` → depende de `Lectura`. Esto es ISP y DIP **trabajando juntos**: depender de una abstracción **y** de la más chica posible.
- **Bug escondido del original:** `ServicioPrecios` y `CatalogoPublico` creaban **cada uno su propio** `RepositorioMemoria`. Si se guardaba algo en uno, los otros no lo veían. La última línea (`Promedio: $3066.66...`) prueba que ahora comparten el mismo repositorio. Inyectar dependencias también te da **control sobre qué instancia se comparte**.
- `RepositorioMemoria` ahora recibe los datos iniciales por constructor (antes estaban fijos adentro).
