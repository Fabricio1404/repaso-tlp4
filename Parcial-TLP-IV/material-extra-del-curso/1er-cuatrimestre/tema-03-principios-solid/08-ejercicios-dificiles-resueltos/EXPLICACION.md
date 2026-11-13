# Tema 3 · Ejercicios difíciles: resolución explicada

## D1 · Turnos médicos

### Diagnóstico (la tabla que pedía el paso 3)

| Principio | Dónde se viola | Señal |
|---|---|---|
| **SRP** | `SistemaTurnos.reservar` | Valida horario, controla duplicados, calcula precio, guarda, manda SMS y loguea: 6 cosas |
| **OCP** | `switch (obraSocial)` en `reservar` | Cada obra social nueva agrega un `case` |
| **LSP** | `TurnoVirtual extends TurnoPresencial` | `asignarConsultorio()` lanza error; `agenda()` necesita `instanceof TurnoVirtual` para no romperse |
| **ISP** | `interface Profesional` | `Enfermero` implementa `atenderVirtual` y `firmarReceta` con `throw` |
| **DIP** | `private sms = new SmsService()` y `console.log("[LOG]...")` | `new` de una clase concreta dentro del sistema |

### Decisiones
- **ISP primero** (porque condiciona lo demás): `AtencionPresencial`, `AtencionVirtual`, `Prescriptor`. El médico implementa las tres; el enfermero, una.
- **LSP:** `TurnoPresencial` y `TurnoVirtual` **dejan de heredar** uno del otro. Los dos implementan `Turno` con `ubicacion()` y `atender()`, y ninguno lanza error. El turno virtual exige un `AtencionVirtual` en el constructor: **combinar ISP + tipos precisos convierte un error de ejecución en un error de compilación**.
- `agenda()` ya no usa `instanceof` y `atenderTodos()` ya no necesita `try/catch`: dos señales de que LSP quedó resuelto.
- **OCP:** `ObraSocial` con `precioConsulta()`. Se pasa un objeto, no un texto.
- **DIP:** `Notificador` y `Registro` como interfaces, recibidas por constructor.
- **SRP:** `ValidadorHorario` (configurable 8–19), `AgendaRepositorio` (guardar, consultar ocupación, listar) y `SistemaTurnos` solo coordina, **en el mismo orden** que el original (validar → ocupado → precio → guardar → notificar → log), por eso la salida coincide.
- `profesional` en `Turno` es un `string` (el nombre) expuesto con un **getter**: el turno no expone el objeto profesional completo (encapsulamiento).

### Lo que se "pierde" y por qué está bien
La reserva de Dani con un enfermero y la obra social "galeno" ya no compilan. En el original eran bugs que se descubrían **ejecutando**; ahora el compilador los atrapa. Eso **no** es cambiar el comportamiento correcto: es eliminar comportamiento incorrecto. En el examen, si la consigna dice "la salida debe ser idéntica", **no** elimines líneas: solo si te lo indican, como acá.

---

## D2 · Gestor de archivos

| Principio | Dónde | Señal |
|---|---|---|
| **SRP** | `GestorArchivos.publicar` | Convierte formato, valida tamaño, sube y loguea |
| **OCP** | `if / else if (formato === ...)` | Cada formato nuevo agrega un `else if` |
| **LSP** | `ArchivoSoloLectura extends Archivo` | `escribir()` lanza error; `normalizarTodos` necesita `try/catch` |
| **ISP** | `interface Almacenamiento` | `DiscoLocal.listarVersiones` lanza error |
| **DIP** | `private nube = new NubeS3()` | `new` de una clase concreta adentro |

### Decisiones
- **LSP:** `Legible` (todos) y `Editable extends Legible` (solo los que se pueden escribir). Una **interfaz puede extender a otra**: `Editable` incluye todo lo de `Legible` y agrega `escribir`. `publicar` recibe un `Legible` (le alcanza con leer) y `normalizarTodos` un `Editable[]`.
- **OCP:** cada formato es una clase con `extension` y `convertir()`. El gestor arma el nombre con `formato.extension` y no pregunta nada.
- **ISP:** `Almacenamiento` (subir, bajar, borrar) y `Versionable` aparte. La nube implementa las dos.
- **DIP:** el gestor recibe un `Almacenamiento` (podría ser la nube o el disco) por constructor.
- **SRP:** `ValidadorTamano` con el máximo configurable.
- `btoa` convierte un texto a base64 y existe tanto en navegadores como en Node (sin importar nada).

### Principio de "depender de lo mínimo"
`publicar(archivo: Legible, ...)` acepta tanto un `Archivo` como un `ArchivoSoloLectura`, porque solo necesita leer. Si hubieras tipado `publicar(archivo: Archivo, ...)`, la licencia no podría publicarse. Pedir **la interfaz más chica que alcanza** es ISP aplicado a los parámetros.
