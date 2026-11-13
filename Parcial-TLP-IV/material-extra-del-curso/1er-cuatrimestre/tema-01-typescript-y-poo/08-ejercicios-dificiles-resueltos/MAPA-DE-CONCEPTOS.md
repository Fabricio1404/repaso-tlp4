# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **ERROR PROPIO** → `d1-estacionamiento.ts` L6–11
- **CLASE ABSTRACTA** → `d1-estacionamiento.ts` L14–38
- **STATIC READONLY PRIVADO** → `d1-estacionamiento.ts` L16
- **READONLY** → `d1-estacionamiento.ts` L18
- **VALIDAR EN CONSTRUCTOR** → `d1-estacionamiento.ts` L23–25, `d3-cursos.ts` L17–19
- **MÉTODO ABSTRACTO** → `d1-estacionamiento.ts` L30
- **MÉTODO CONCRETO REUTILIZABLE** → `d1-estacionamiento.ts` L34–37
- **OVERRIDE + SUPER.METODO** → `d1-estacionamiento.ts` L69–71
- **INTERFACE PARA DATOS** → `d1-estacionamiento.ts` L75–78
- **STATIC** → `d1-estacionamiento.ts` L82
- **ENCAPSULAMIENTO** → `d1-estacionamiento.ts` L86–87, `d3-cursos.ts` L34
- **GETTER CALCULADO** → `d1-estacionamiento.ts` L100–102, `d3-cursos.ts` L54–58
- **GETTER SIN SETTER** → `d1-estacionamiento.ts` L105–107
- **POLIMORFISMO** → `d1-estacionamiento.ts` L132, `d2-banco.ts` L55, `d3-cursos.ts` L27–29
- **COPIA DEFENSIVA** → `d1-estacionamiento.ts` L140–142, `d2-banco.ts` L76–78, `d3-cursos.ts` L125–127
- **MÉTODO PRIVADO** → `d1-estacionamiento.ts` L145–148
- **INTERFACE CON READONLY** → `d2-banco.ts` L8–12
- **PROTECTED** → `d2-banco.ts` L29–30
- **MÉTODO ABSTRACTO PROTEGIDO** → `d2-banco.ts` L42
- **GANCHO (HOOK)** → `d2-banco.ts` L45
- **ATOMICIDAD** → `d2-banco.ts` L64
- **PROTECTED ENTRE INSTANCIAS** → `d2-banco.ts` L68
- **IMPLEMENTACIÓN DE ABSTRACTO** → `d2-banco.ts` L116–123
- **OVERRIDE DEL GANCHO** → `d2-banco.ts` L126–128
- **COMPOSICIÓN** → `d2-banco.ts` L156
- **DELEGACIÓN** → `d2-banco.ts` L178–182
- **INTERFACE** → `d3-cursos.ts` L6–8
- **CLASE ABSTRACTA QUE IMPLEMENTA INTERFACE** → `d3-cursos.ts` L11–30
- **RANGEERROR** → `d3-cursos.ts` L47–49
- **OVERRIDE + SUPER** → `d3-cursos.ts` L78–80
- **AGREGACIÓN** → `d3-cursos.ts` L87–88
- **SIN DUPLICADOS** → `d3-cursos.ts` L106–108
- **SUSTITUCIÓN** → `d3-cursos.ts` L140–144
- **NARROWING / OPTIONAL CHAINING** → `d3-cursos.ts` L148

## Detalle archivo por archivo


### `d1-estacionamiento.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–11 | **ERROR PROPIO** | `class EstacionamientoLlenoError extends Error {` | Permite distinguir "lleno" de cualquier otro error con instanceof |
| 14–38 | **CLASE ABSTRACTA** | `abstract class Vehiculo {` | Todo vehículo tiene patente y sabe calcular su cobro, pero la tarifa la define cada tipo |
| 16 | **STATIC READONLY PRIVADO** | `private static readonly FORMATO = /^([A-Z]{3}\d{3}\|[A-Z]{2}\d{3}[A...` | Una sola expresión regular para toda la clase: formato viejo ABC123 o nuevo AB123CD |
| 18 | **READONLY** | `readonly patente: string;` | La patente no cambia nunca |
| 23–25 | **VALIDAR EN CONSTRUCTOR** | `if (!Vehiculo.FORMATO.test(normalizada)) {` | Es imposible crear un vehículo con patente inválida |
| 30 | **MÉTODO ABSTRACTO** | `abstract tarifaPorHora(): number;` | Cada tipo DEBE definir su tarifa y su nombre |
| 34–37 | **MÉTODO CONCRETO REUTILIZABLE** | `calcularCobro(minutos: number): number {` | La regla de redondeo (mínimo 1 hora, fracción = hora completa) está en un solo lugar |
| 69–71 | **OVERRIDE + SUPER.METODO** | `override calcularCobro(minutos: number): number {` | Reutiliza el cálculo del padre y le suma el seguro fijo |
| 75–78 | **INTERFACE PARA DATOS** | `interface Estadia {` | Lo que el estacionamiento guarda de cada vehículo adentro |
| 82 | **STATIC** | `private static recaudado: number = 0;` | Recaudación de TODOS los estacionamientos (nivel clase); privado + método static para leerlo |
| 86–87 | **ENCAPSULAMIENTO** | `private estadias: Estadia[];` | Las estadías solo cambian con ingresar() y egresar() |
| 100–102 | **GETTER CALCULADO** | `get lugaresLibres(): number {` | Nunca se desactualiza porque se calcula al leerlo |
| 105–107 | **GETTER SIN SETTER** | `get recaudacion(): number {` | Se puede leer la recaudación, pero no modificarla desde afuera |
| 132 | **POLIMORFISMO** | `const cobro = estadia.vehiculo.calcularCobro(minuto - estadia.minut...` | Sin preguntar si es Auto, Moto o Camioneta: cada uno calcula su cobro |
| 140–142 | **COPIA DEFENSIVA** | `listarOcupados(): string[] {` | Devuelve textos, nunca la lista interna |
| 145–148 | **MÉTODO PRIVADO** | `private buscar(patente: string): Estadia \| undefined {` | Ayudante interno reutilizado por ingresar y egresar |

### `d2-banco.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–12 | **INTERFACE CON READONLY** | `interface Movimiento {` | Un movimiento, una vez registrado, no se puede alterar |
| 29–30 | **PROTECTED** | `protected saldo: number;` | Las hijas necesitan leer el saldo para validar su regla de extracción |
| 42 | **MÉTODO ABSTRACTO PROTEGIDO** | `protected abstract validarExtraccion(monto: number): void;` | Cada tipo de cuenta define SU regla; no es parte de la interfaz pública |
| 45 | **GANCHO (HOOK)** | `protected alExtraer(): void {}` | Método vacío que las hijas PUEDEN redefinir para reaccionar a una extracción exitosa |
| 55 | **POLIMORFISMO** | `this.validarExtraccion(monto);` | La regla concreta (descubierto o límite de extracciones) la pone cada hija |
| 64 | **ATOMICIDAD** | `Cuenta.validarMonto(monto);` | TODAS las validaciones van antes de modificar algo: si falla, ninguna de las dos cuentas cambia |
| 68 | **PROTECTED ENTRE INSTANCIAS** | `destino.acreditar(monto, "transferencia-recibida");` | Dentro de Cuenta se puede usar un miembro protected de OTRA Cuenta |
| 76–78 | **COPIA DEFENSIVA** | `historial(): Movimiento[] {` | Copia del arreglo; los movimientos son readonly así que tampoco se pueden alterar |
| 116–123 | **IMPLEMENTACIÓN DE ABSTRACTO** | `protected validarExtraccion(monto: number): void {` | Regla propia: sin descubierto y con límite mensual |
| 126–128 | **OVERRIDE DEL GANCHO** | `protected override alExtraer(): void {` | Cuenta las extracciones solo cuando se concretan |
| 156 | **COMPOSICIÓN** | `private cuentas: Cuenta[];` | El banco administra su colección de cuentas |
| 178–182 | **DELEGACIÓN** | `transferir(cbuOrigen: string, cbuDestino: string, monto: number): v...` | El banco busca las cuentas y delega la operación en ellas |

### `d3-cursos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–8 | **INTERFACE** | `interface Identificable {` | Contrato mínimo que comparten todas las entidades con identificador |
| 11–30 | **CLASE ABSTRACTA QUE IMPLEMENTA INTERFACE** | `abstract class Persona implements Identificable {` | Combina contrato (Identificable) con código común (presentarse) |
| 17–19 | **VALIDAR EN CONSTRUCTOR** | `if (!/^\d{7,8}$/.test(dni)) {` | DNI de 7 u 8 dígitos |
| 27–29 | **POLIMORFISMO** | `presentarse(): string {` | Escrito una vez; rol() cambia según la subclase |
| 34 | **ENCAPSULAMIENTO** | `private notas: number[];` | Las notas solo entran por agregarNota (que valida) |
| 47–49 | **RANGEERROR** | `if (!Number.isInteger(nota) \|\| nota < 1 \|\| nota > 10) {` | El dato es un número (tipo correcto) pero está fuera del rango permitido |
| 54–58 | **GETTER CALCULADO** | `get promedio(): number {` | Se calcula a partir de las notas; nunca queda desactualizado |
| 78–80 | **OVERRIDE + SUPER** | `override presentarse(): string {` | Extiende la presentación del padre en vez de reescribirla |
| 87–88 | **AGREGACIÓN** | `private docente: Docente \| undefined;` | El docente existe por fuera del curso; puede no estar asignado todavía |
| 106–108 | **SIN DUPLICADOS** | `if (this.alumnos.some((a) => a.id === alumno.id)) {` | Se compara por id (DNI), no por referencia: dos objetos con el mismo DNI son la misma persona |
| 125–127 | **COPIA DEFENSIVA** | `aprobados(): Alumno[] {` | filter ya devuelve un arreglo nuevo |
| 140–144 | **SUSTITUCIÓN** | `integrantes(): Persona[] {` | Docente y Alumno juntos en un Persona[] |
| 148 | **NARROWING / OPTIONAL CHAINING** | `const encabezado = `${this.nombre} (${this.inscriptos}/${this.cupo}...` | docente puede ser undefined |
