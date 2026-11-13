# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **INTERFACE** → `torneo.ts` L7–9, `torneo.ts` L12–15
- **PROPIEDAD OPCIONAL** → `torneo.ts` L22
- **CONSTRUCTOR FORMA LARGA** → `torneo.ts` L25–30
- **ENCAPSULAMIENTO** → `torneo.ts` L40
- **SIN DUPLICADOS POR ID** → `torneo.ts` L49–53
- **GETTER** → `torneo.ts` L58–60
- **CLASE ABSTRACTA vs INTERFACE** → `torneo.ts` L72–84
- **PROTECTED** → `torneo.ts` L75
- **MÉTODO ABSTRACTO** → `torneo.ts` L83
- **VALIDAR EN CONSTRUCTOR** → `torneo.ts` L129–131
- **POLIMORFISMO** → `torneo.ts` L133–135
- **COPIA DEFENSIVA** → `torneo.ts` L174–176
- **INTERFACE EN LUGAR DE ANY** → `torneo.ts` L189–193
- **CATCH SIN ANY** → `torneo.ts` L214–216

## Detalle archivo por archivo


### `torneo.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–9 | **INTERFACE** | `export interface IIdentificable {` | Contrato mínimo: todo lo identificable tiene un id que no cambia |
| 12–15 | **INTERFACE** | `export interface ICompetidor {` | Todo competidor tiene nombre y lista sus integrantes |
| 22 | **PROPIEDAD OPCIONAL** | `posicion?: string;` | posicion puede no existir (string / undefined) |
| 25–30 | **CONSTRUCTOR FORMA LARGA** | `constructor(id: string, nombre: string, edad: number, posicion?: st...` | El enunciado original usaba parameter properties: prohibidas |
| 40 | **ENCAPSULAMIENTO** | `private jugadores: Jugador[];` | Lista privada: solo se agrega con agregarJugador (que valida duplicados) |
| 49–53 | **SIN DUPLICADOS POR ID** | `for (let i = 0; i < this.jugadores.length; i++) {` | Se recorre antes de agregar |
| 58–60 | **GETTER** | `get cantidad(): number {` |  |
| 72–84 | **CLASE ABSTRACTA vs INTERFACE** | `export abstract class Deporte {` | Molde parcial con estado (nombre, maxPorEquipo) y un método abstracto. No se instancia |
| 75 | **PROTECTED** | `protected maxPorEquipo: number;` | Las hijas lo leen en validar() |
| 83 | **MÉTODO ABSTRACTO** | `abstract validar(equipo: Equipo): boolean;` | La validación de cantidad se DELEGA a cada deporte (polimorfismo) |
| 129–131 | **VALIDAR EN CONSTRUCTOR** | `if (local === visitante \|\| local.nombre === visitante.nombre) {` | Es imposible crear un partido inválido |
| 133–135 | **POLIMORFISMO** | `if (!deporte.validar(local) \|\| !deporte.validar(visitante)) {` | Partido no sabe cuántos jugadores admite cada deporte: le pregunta a deporte.validar |
| 174–176 | **COPIA DEFENSIVA** | `listarPartidos(): Partido[] {` |  |
| 189–193 | **INTERFACE EN LUGAR DE ANY** | `export interface ConfigTorneo {` | El enunciado original recibía "config: any" |
| 214–216 | **CATCH SIN ANY** | `if (e instanceof Error) {` | e es unknown: se pregunta instanceof Error |
