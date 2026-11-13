# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **UNIÓN DE LITERALES** → `mascota.ts` L4
- **INTERFACE CON READONLY** → `mascota.ts` L7–11
- **CLASE ABSTRACTA** → `mascota.ts` L14–67
- **ENCAPSULAMIENTO** → `mascota.ts` L19, `mascota.ts` L21
- **SETTER CON REGLA** → `mascota.ts` L37–42
- **POLIMORFISMO** → `mascota.ts` L48–51, `veterinaria.ts` L37
- **COPIA DEFENSIVA** → `mascota.ts` L60–62
- **OCP / EXTENSIÓN** → `mascota.ts` L88–95
- **IMPORT TYPE** → `veterinaria.ts` L4
- **STATIC PRIVADO** → `veterinaria.ts` L8
- **TODO 1 RESUELTO** → `veterinaria.ts` L43–51
- **TODO 2 RESUELTO** → `veterinaria.ts` L54–56

## Detalle archivo por archivo


### `mascota.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4 | **UNIÓN DE LITERALES** | `export type Especie = "Perro" \| "Gato" \| "Conejo";` | En lugar de enum |
| 7–11 | **INTERFACE CON READONLY** | `export interface Consulta {` | Una consulta registrada no se puede alterar |
| 14–67 | **CLASE ABSTRACTA** | `export abstract class Mascota {` | No existe una "mascota genérica"; cada especie completa lo que falta |
| 19 | **ENCAPSULAMIENTO** | `private _edad: number;` | (DEFECTO 2 CORREGIDO) La edad era pública y sin validar |
| 21 | **ENCAPSULAMIENTO** | `private historial: Consulta[];` | (DEFECTO 1 CORREGIDO) El historial era público |
| 37–42 | **SETTER CON REGLA** | `set edad(valor: number) {` | Valida también al crear, porque el constructor usa this.edad |
| 48–51 | **POLIMORFISMO** | `calcularCosto(): number {` | (DEFECTO 3 CORREGIDO) El costo lo calcula la mascota, no la veterinaria con instanceof |
| 60–62 | **COPIA DEFENSIVA** | `obtenerHistorial(): Consulta[] {` | (DEFECTO 1 CORREGIDO) Antes devolvía this.historial |
| 88–95 | **OCP / EXTENSIÓN** | `export class Conejo extends Mascota {` | Especie nueva: una clase nueva, Veterinaria no se toca |

### `veterinaria.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4 | **IMPORT TYPE** | `import type { Especie, Mascota } from "./mascota.ts";` | Mascota y Especie solo se usan como TIPOS acá: con Node hay que importarlos con "import type" |
| 8 | **STATIC PRIVADO** | `private static atenciones: number = 0;` | (DEFECTO 4 CORREGIDO) Antes era public: cualquiera podía hacer Veterinaria.totalAtenciones = 0 |
| 37 | **POLIMORFISMO** | `const consulta = mascota.registrarConsulta(fecha, motivo);` | Sin if (m instanceof Perro): cada mascota sabe su costo |
| 43–51 | **TODO 1 RESUELTO** | `facturacion(): number {` | Suma los costos de todas las consultas de todos los pacientes |
| 54–56 | **TODO 2 RESUELTO** | `pacientesPorEspecie(especie: Especie): Mascota[] {` | filter devuelve un arreglo nuevo (copia) |
