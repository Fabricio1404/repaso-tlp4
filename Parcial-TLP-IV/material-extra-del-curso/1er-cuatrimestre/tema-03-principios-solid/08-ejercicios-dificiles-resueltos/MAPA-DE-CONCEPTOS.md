# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **ISP ✓ INTERFACES CHICAS** → `d1-turnos-medicos.ts` L5–8, `d2-gestor-archivos.ts` L5–9
- **ISP ✓ SIN THROW** → `d1-turnos-medicos.ts` L36–44, `d2-gestor-archivos.ts` L34–44
- **LSP ✓ CONTRATO COMÚN** → `d1-turnos-medicos.ts` L48–54
- **LSP + ISP ✓ TIPO PRECISO** → `d1-turnos-medicos.ts` L81–104
- **LSP ✓ NO LANZA** → `d1-turnos-medicos.ts` L97–99
- **OCP ✓ ABSTRACCIÓN** → `d1-turnos-medicos.ts` L108–110, `d2-gestor-archivos.ts` L88–91
- **DIP ✓ ABSTRACCIÓN** → `d1-turnos-medicos.ts` L132–134, `d2-gestor-archivos.ts` L116–118
- **SRP ✓ REGLA DE HORARIO** → `d1-turnos-medicos.ts` L154–168
- **SRP ✓ ALMACENAMIENTO** → `d1-turnos-medicos.ts` L171–189
- **SRP ✓ COORDINADOR** → `d1-turnos-medicos.ts` L192–230
- **DIP ✓ INYECCIÓN POR CONSTRUCTOR** → `d1-turnos-medicos.ts` L199–204
- **OCP ✓ SIN SWITCH** → `d1-turnos-medicos.ts` L212
- **LSP ✓ SIN INSTANCEOF** → `d1-turnos-medicos.ts` L220–222
- **LSP ✓ SIN TRY/CATCH** → `d1-turnos-medicos.ts` L225–229
- **COMPOSITION ROOT** → `d1-turnos-medicos.ts` L234
- **LSP ✓ BASE = LO QUE TODOS CUMPLEN** → `d2-gestor-archivos.ts` L48–51
- **LSP ✓ CAPACIDAD APARTE** → `d2-gestor-archivos.ts` L54–56
- **LSP ✓ SIN HERENCIA QUE ROMPE** → `d2-gestor-archivos.ts` L74–84
- **SRP ✓ REGLA DE TAMAÑO** → `d2-gestor-archivos.ts` L128–138
- **SRP ✓ COORDINADOR + DIP ✓ INYECCIÓN** → `d2-gestor-archivos.ts` L141–165
- **LSP ✓ TIPO PRECISO** → `d2-gestor-archivos.ts` L160–164

## Detalle archivo por archivo


### `d1-turnos-medicos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–8 | **ISP ✓ INTERFACES CHICAS** | `interface AtencionPresencial {` | ISP: cada profesional implementa solo las capacidades que tiene |
| 36–44 | **ISP ✓ SIN THROW** | `class Enfermero implements AtencionPresencial {` | El enfermero ya no está obligado a implementar atención virtual ni recetas |
| 48–54 | **LSP ✓ CONTRATO COMÚN** | `interface Turno {` | LSP: los dos turnos cumplen este contrato de verdad; ninguno hereda del otro |
| 81–104 | **LSP + ISP ✓ TIPO PRECISO** | `class TurnoVirtual implements Turno {` | Un turno virtual EXIGE un profesional con AtencionVirtual: con un enfermero no compila |
| 97–99 | **LSP ✓ NO LANZA** | `ubicacion(): string {` | Responde algo válido en vez de explotar |
| 108–110 | **OCP ✓ ABSTRACCIÓN** | `interface ObraSocial {` | OCP: se agregan obras sociales sin modificar SistemaTurnos |
| 132–134 | **DIP ✓ ABSTRACCIÓN** | `interface Notificador {` | DIP: el sistema depende de estas interfaces, no de SmsService ni de console.log |
| 154–168 | **SRP ✓ REGLA DE HORARIO** | `class ValidadorHorario {` | Cambia solo si cambia el horario de atención |
| 171–189 | **SRP ✓ ALMACENAMIENTO** | `class AgendaRepositorio {` | Cambia solo si cambia dónde se guardan los turnos |
| 192–230 | **SRP ✓ COORDINADOR** | `class SistemaTurnos {` | Orquesta el proceso; no valida horarios, no guarda, no notifica ni loguea por sí mismo |
| 199–204 | **DIP ✓ INYECCIÓN POR CONSTRUCTOR** | `constructor(validador: ValidadorHorario, agendaRepo: AgendaReposito...` | Antes: private sms = new SmsService() |
| 212 | **OCP ✓ SIN SWITCH** | `const precio = obraSocial.precioConsulta();` | Cada obra social sabe su precio |
| 220–222 | **LSP ✓ SIN INSTANCEOF** | `agenda(): string[] {` | Cada turno informa su ubicación |
| 225–229 | **LSP ✓ SIN TRY/CATCH** | `atenderTodos(): void {` | Ningún turno puede fallar al atender: ya no hace falta defenderse |
| 234 | **COMPOSITION ROOT** | `const sistema = new SistemaTurnos(new ValidadorHorario(8, 19), new ...` |  |

### `d2-gestor-archivos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–9 | **ISP ✓ INTERFACES CHICAS** | `interface Almacenamiento {` | ISP: el disco local no está obligado a versionar |
| 34–44 | **ISP ✓ SIN THROW** | `class DiscoLocal implements Almacenamiento {` | Implementa solo lo que puede hacer |
| 48–51 | **LSP ✓ BASE = LO QUE TODOS CUMPLEN** | `interface Legible {` | Todo archivo se puede leer |
| 54–56 | **LSP ✓ CAPACIDAD APARTE** | `interface Editable extends Legible {` | LSP: solo los archivos que se pueden escribir prometen escribir() |
| 74–84 | **LSP ✓ SIN HERENCIA QUE ROMPE** | `class ArchivoSoloLectura implements Legible {` | Ya no extiende Archivo ni tiene un escribir() que lance error |
| 88–91 | **OCP ✓ ABSTRACCIÓN** | `interface Formato {` | OCP: formatos nuevos sin modificar GestorArchivos |
| 116–118 | **DIP ✓ ABSTRACCIÓN** | `interface Registro {` | DIP: el gestor no conoce console.log |
| 128–138 | **SRP ✓ REGLA DE TAMAÑO** | `class ValidadorTamano {` | Cambia solo si cambia el límite |
| 141–165 | **SRP ✓ COORDINADOR + DIP ✓ INYECCIÓN** | `class GestorArchivos {` | Convierte (delegando), valida (delegando), sube (delegando) y loguea (delegando) |
| 160–164 | **LSP ✓ TIPO PRECISO** | `normalizarTodos(archivos: Editable[]): void {` | Solo recibe archivos editables: ya no hace falta try/catch |
