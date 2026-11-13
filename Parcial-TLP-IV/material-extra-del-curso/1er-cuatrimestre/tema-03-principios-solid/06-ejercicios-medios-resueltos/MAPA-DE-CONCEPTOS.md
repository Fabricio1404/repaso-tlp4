# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SRP ✓ VALIDACIÓN DE DATOS** → `m1-srp-dip-inscripciones.ts` L12–21
- **SRP ✓ ALMACENAMIENTO** → `m1-srp-dip-inscripciones.ts` L24–42
- **DIP ✓ ABSTRACCIÓN** → `m1-srp-dip-inscripciones.ts` L45–47, `m1-srp-dip-inscripciones.ts` L63–65
- **DIP ✓ NUEVA IMPLEMENTACIÓN** → `m1-srp-dip-inscripciones.ts` L56–60
- **SRP ✓ COORDINADOR** → `m1-srp-dip-inscripciones.ts` L74–113
- **DIP ✓ INYECCIÓN POR CONSTRUCTOR** → `m1-srp-dip-inscripciones.ts` L82–88
- **MISMO ORDEN QUE EL ORIGINAL** → `m1-srp-dip-inscripciones.ts` L97–108
- **COMPOSITION ROOT** → `m1-srp-dip-inscripciones.ts` L117–123, `m3-isp-dip-repositorios.ts` L92–95
- **OCP ✓ CONTRATO COMÚN** → `m2-ocp-lsp-liquidacion.ts` L4–7
- **LSP ✓ CAPACIDAD APARTE** → `m2-ocp-lsp-liquidacion.ts` L10–12
- **LSP ✓ NO PROMETE LO QUE NO CUMPLE** → `m2-ocp-lsp-liquidacion.ts` L51–63
- **OCP ✓ EXTENSIÓN** → `m2-ocp-lsp-liquidacion.ts` L66–80
- **OCP ✓ SIN SWITCH NI IF** → `m2-ocp-lsp-liquidacion.ts` L83–87
- **ISP ✓ INTERFACES CHICAS** → `m3-isp-dip-repositorios.ts` L10–13
- **ISP ✓ IMPLEMENTA LAS TRES** → `m3-isp-dip-repositorios.ts` L25–51
- **ISP ✓ SOLO LECTURA** → `m3-isp-dip-repositorios.ts` L54–69
- **DIP ✓ RECIBE LA ABSTRACCIÓN** → `m3-isp-dip-repositorios.ts` L56
- **ISP + DIP ✓ LO MÍNIMO** → `m3-isp-dip-repositorios.ts` L73

## Detalle archivo por archivo


### `m1-srp-dip-inscripciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 12–21 | **SRP ✓ VALIDACIÓN DE DATOS** | `class ValidadorAlumno {` | Cambia solo si cambian las reglas de formato del alumno |
| 24–42 | **SRP ✓ ALMACENAMIENTO** | `class RepositorioInscripciones {` | Cambia solo si cambia dónde se guardan las inscripciones |
| 45–47 | **DIP ✓ ABSTRACCIÓN** | `interface Notificador {` | DIP: el servicio depende de esta interfaz, no de WhatsApp ni de Email |
| 56–60 | **DIP ✓ NUEVA IMPLEMENTACIÓN** | `class NotificadorEmail implements Notificador {` | Se agregó sin tocar ServicioInscripcion |
| 63–65 | **DIP ✓ ABSTRACCIÓN** | `interface Registro {` | DIP: el log se puede cambiar (archivo, base) sin tocar el servicio |
| 74–113 | **SRP ✓ COORDINADOR** | `class ServicioInscripcion {` | Solo contiene las reglas del PROCESO (cupo y duplicados) y delega el resto |
| 82–88 | **DIP ✓ INYECCIÓN POR CONSTRUCTOR** | `constructor(` | Todas las dependencias (y el cupo) vienen de afuera |
| 97–108 | **MISMO ORDEN QUE EL ORIGINAL** | `inscribir(alumno: Alumno, curso: string): void {` | validar → cupo → duplicado → guardar → notificar → log (la salida no cambia) |
| 117–123 | **COMPOSITION ROOT** | `const servicio = new ServicioInscripcion(` | Todos los new, acá |

### `m2-ocp-lsp-liquidacion.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–7 | **OCP ✓ CONTRATO COMÚN** | `interface Liquidable {` | OCP: tipos de empleado nuevos sin modificar Liquidador |
| 10–12 | **LSP ✓ CAPACIDAD APARTE** | `interface ConBono {` | LSP: solo promete un bono quien realmente lo cobra (ya nadie hereda un bono que "rompe") |
| 51–63 | **LSP ✓ NO PROMETE LO QUE NO CUMPLE** | `class Pasante implements Liquidable {` | El pasante no implementa ConBono: no hay método que lance error |
| 66–80 | **OCP ✓ EXTENSIÓN** | `class Consultor implements Liquidable {` | Tipo nuevo agregado sin tocar Liquidador |
| 83–87 | **OCP ✓ SIN SWITCH NI IF** | `class Liquidador {` | Cada empleado sabe calcular su sueldo |

### `m3-isp-dip-repositorios.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–13 | **ISP ✓ INTERFACES CHICAS** | `interface Lectura {` | ISP: cada cliente depende solo de las operaciones que usa |
| 25–51 | **ISP ✓ IMPLEMENTA LAS TRES** | `class RepositorioMemoria implements Lectura, Escritura, Exportable {` | El repositorio completo sí tiene las tres capacidades |
| 54–69 | **ISP ✓ SOLO LECTURA** | `class CatalogoPublico implements Lectura {` | Ya no tiene métodos que lancen error: no los promete |
| 56 | **DIP ✓ RECIBE LA ABSTRACCIÓN** | `private fuente: Lectura;` | Antes: private fuente = new RepositorioMemoria() |
| 73 | **ISP + DIP ✓ LO MÍNIMO** | `private repo: Lectura;` | Solo lee: pide una Lectura (no un RepositorioMemoria, ni Escritura, ni Exportable) |
| 92–95 | **COMPOSITION ROOT** | `const repo = new RepositorioMemoria([` | UN repositorio compartido por todos |
