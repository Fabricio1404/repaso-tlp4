# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **ABSTRACCIÓN** → `f1-libro.ts` L5–8
- **CONSTRUCTOR FORMA LARGA** → `f1-libro.ts` L11–16
- **MÉTODO** → `f1-libro.ts` L19–21
- **VALIDAR ANTES DE MODIFICAR** → `f1-libro.ts` L29–31, `f2-termometro.ts` L17
- **STATIC READONLY** → `f2-termometro.ts` L5
- **ENCAPSULAMIENTO** → `f2-termometro.ts` L8
- **GETTER CALCULADO** → `f2-termometro.ts` L34–38, `f4-rectangulo.ts` L36–38
- **MÉTODO PRIVADO** → `f2-termometro.ts` L41–45
- **STATIC** → `f2-termometro.ts` L49–51, `f5-ticket.ts` L5, `f5-ticket.ts` L12
- **PROTECTED** → `f3-animales.ts` L5
- **POLIMORFISMO** → `f3-animales.ts` L16–18, `f3-animales.ts` L46
- **HERENCIA SIN CONSTRUCTOR** → `f3-animales.ts` L22–27
- **OVERRIDE** → `f3-animales.ts` L24–26
- **SUSTITUCIÓN** → `f3-animales.ts` L43
- **ATRIBUTO RESPALDO** → `f4-rectangulo.ts` L5–6
- **SETTER EN CONSTRUCTOR** → `f4-rectangulo.ts` L12
- **SETTER CON REGLA** → `f4-rectangulo.ts` L21–24
- **MÉTODO STATIC PRIVADO** → `f4-rectangulo.ts` L49–53
- **READONLY** → `f5-ticket.ts` L7–8
- **MÉTODO STATIC** → `f5-ticket.ts` L18–20

## Detalle archivo por archivo


### `f1-libro.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–8 | **ABSTRACCIÓN** | `titulo: string;` | Solo lo que importa para una biblioteca: título, autor, páginas y disponibilidad |
| 11–16 | **CONSTRUCTOR FORMA LARGA** | `constructor(titulo: string, autor: string, paginas: number) {` | disponible NO se recibe: siempre arranca en true |
| 19–21 | **MÉTODO** | `describir(): string {` | Devuelve el texto (return), no lo imprime |
| 29–31 | **VALIDAR ANTES DE MODIFICAR** | `if (!this.disponible) {` | Si ya está prestado se lanza el error y el estado no cambia |

### `f2-termometro.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5 | **STATIC READONLY** | `static readonly MINIMA = -50;` | Constantes de la CLASE: hay una sola copia (no una por objeto) y no se pueden reasignar |
| 8 | **ENCAPSULAMIENTO** | `private temperatura: number;` | La temperatura solo cambia a través de subir() y bajar() |
| 17 | **VALIDAR ANTES DE MODIFICAR** | `const nueva = this.temperatura + grados;` | Se calcula el valor nuevo en una variable y se valida ANTES de asignarlo |
| 34–38 | **GETTER CALCULADO** | `get estado(): string {` | Se usa como t.estado (sin paréntesis) y no tiene setter: solo lectura |
| 41–45 | **MÉTODO PRIVADO** | `private validarGrados(grados: number): void {` | Ayudante interno: evita repetir la validación en subir y bajar |
| 49–51 | **STATIC** | `if (valor < Termometro.MINIMA \|\| valor > Termometro.MAXIMA) {` | Se accede con el nombre de la clase, no con this |

### `f3-animales.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5 | **PROTECTED** | `protected nombre: string;` | Las subclases lo pueden leer (lo necesitan en presentarse), el código de afuera no |
| 16–18 | **POLIMORFISMO** | `presentarse(): string {` | Escrito una sola vez: this.hacerSonido() ejecuta la versión del objeto real |
| 22–27 | **HERENCIA SIN CONSTRUCTOR** | `class Perro extends Animal {` | Perro no declara constructor: usa el de Animal automáticamente |
| 24–26 | **OVERRIDE** | `override hacerSonido(): string {` | Redefine el método heredado con la misma firma |
| 43 | **SUSTITUCIÓN** | `const animales: Animal[] = [new Perro("Firulais"), new Gato("Michi"...` | Un Animal[] acepta cualquier subclase |
| 46 | **POLIMORFISMO** | `console.log(a.presentarse());` | Ningún if preguntando el tipo |

### `f4-rectangulo.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–6 | **ATRIBUTO RESPALDO** | `private _ancho: number;` | _ancho/_alto guardan el dato; ancho/alto son el getter y setter |
| 12 | **SETTER EN CONSTRUCTOR** | `this.ancho = ancho;` | Así la validación corre también al crear |
| 21–24 | **SETTER CON REGLA** | `set ancho(valor: number) {` | Un setter tiene sentido porque valida; si solo copiara, sería burocracia |
| 36–38 | **GETTER CALCULADO** | `get area(): number {` | No se guarda: se calcula cada vez, nunca queda desactualizado |
| 49–53 | **MÉTODO STATIC PRIVADO** | `private static validar(valor: number): void {` | No usa this: la validación no depende de un rectángulo puntual |

### `f5-ticket.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5 | **STATIC** | `private static emitidos: number = 0;` | Contador de la CLASE: compartido por todos los tickets. private para que nadie lo altere desde afuera |
| 7–8 | **READONLY** | `readonly id: number;` | El id se asigna una vez en el constructor y no cambia nunca |
| 12 | **STATIC** | `Ticket.emitidos++;` | Se incrementa el contador de la clase y se usa como id de ESTE objeto |
| 18–20 | **MÉTODO STATIC** | `static cantidadEmitida(): number {` | Se llama sobre la clase: Ticket.cantidadEmitida() |
