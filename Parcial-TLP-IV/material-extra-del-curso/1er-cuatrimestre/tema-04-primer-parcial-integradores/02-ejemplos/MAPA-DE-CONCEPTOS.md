# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **CLASE ABSTRACTA** → `ej1-hotel.ts` L5–15
- **READONLY** → `ej1-hotel.ts` L7, `ej2-envios.ts` L8
- **MÉTODO ABSTRACTO** → `ej1-hotel.ts` L14
- **HERENCIA** → `ej1-hotel.ts` L18–23
- **IMPLEMENTACIÓN DEL ABSTRACTO** → `ej1-hotel.ts` L20–22
- **ENCAPSULAMIENTO** → `ej1-hotel.ts` L33
- **STATIC** → `ej1-hotel.ts` L35, `ej1-hotel.ts` L44
- **GETTER** → `ej1-hotel.ts` L48–50
- **POLIMORFISMO** → `ej1-hotel.ts` L56
- **SINGLETON ① ATRIBUTO STATIC** → `ej2-envios.ts` L6
- **SINGLETON ② CONSTRUCTOR PRIVATE** → `ej2-envios.ts` L11
- **SINGLETON ③ ACCESO** → `ej2-envios.ts` L14–19
- **INTERFACE / FACTORY - TIPO COMÚN** → `ej2-envios.ts` L23–25
- **SINGLETON EN USO** → `ej2-envios.ts` L36
- **FACTORY ESTÁTICA** → `ej2-envios.ts` L43–48
- **OCP ✗ VIOLACIÓN** → `ej3-notificaciones-original.ts` L14–16
- **DIP ✗ VIOLACIÓN** → `ej3-notificaciones-original.ts` L20
- **OCP ✓ COMENTARIO OBLIGATORIO** → `ej3-notificaciones.ts` L5–8
- **OCP ✓ UNA CLASE POR OPCIÓN** → `ej3-notificaciones.ts` L11–17
- **DIP ✓ COMENTARIO OBLIGATORIO** → `ej3-notificaciones.ts` L29–31
- **DIP ✓ INYECCIÓN POR CONSTRUCTOR** → `ej3-notificaciones.ts` L49–51
- **OCP ✓ SIN IF** → `ej3-notificaciones.ts` L54–56
- **DIP ✓ BENEFICIO** → `ej3-notificaciones.ts` L65

## Detalle archivo por archivo


### `ej1-hotel.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–15 | **CLASE ABSTRACTA** | `abstract class Habitacion {` | "clase abstracta Habitacion": no se puede hacer new Habitacion() |
| 7 | **READONLY** | `readonly numero: number;` | "numero readonly": se asigna en el constructor y no cambia |
| 14 | **MÉTODO ABSTRACTO** | `abstract calcularPrecio(noches: number): number;` | "calcularPrecio(noches) abstracto": cada hija lo implementa |
| 18–23 | **HERENCIA** | `class Simple extends Habitacion {` | Simple ES UNA Habitacion; no necesita constructor propio (usa el del padre) |
| 20–22 | **IMPLEMENTACIÓN DEL ABSTRACTO** | `calcularPrecio(noches: number): number {` | $20000 por noche |
| 33 | **ENCAPSULAMIENTO** | `private habitaciones: Habitacion[];` | "arreglo privado": solo se agrega mediante checkIn |
| 35 | **STATIC** | `static totalCheckIns: number = 0;` | "atributo static que cuenta los ingresos": pertenece a la clase Hotel, no a un hotel puntual |
| 44 | **STATIC** | `Hotel.totalCheckIns++;` | Se accede con el nombre de la clase |
| 48–50 | **GETTER** | `get cantidad(): number {` | "getter cantidad": cuántas habitaciones hay AHORA (≠ total histórico) |
| 56 | **POLIMORFISMO** | `console.log(`Habitación ${h.numero} paga $${h.calcularPrecio(noches...` | "sin if por tipo": cada habitación calcula su precio |

### `ej2-envios.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6 | **SINGLETON ① ATRIBUTO STATIC** | `private static instancia: ConfiguracionEmpresa \| undefined;` | Guarda la única instancia |
| 8 | **READONLY** | `readonly recargoExpress = 2500;` | Valor fijo de configuración que nadie puede reasignar |
| 11 | **SINGLETON ② CONSTRUCTOR PRIVATE** | `private constructor() {}` | Nadie puede hacer new ConfiguracionEmpresa() |
| 14–19 | **SINGLETON ③ ACCESO** | `static obtenerInstancia(): ConfiguracionEmpresa {` | Crea la instancia solo si todavía no existe |
| 23–25 | **INTERFACE / FACTORY - TIPO COMÚN** | `interface Envio {` | Lo que devuelve la fábrica |
| 36 | **SINGLETON EN USO** | `const configuracion = ConfiguracionEmpresa.obtenerInstancia();` | No escribe 2500: lo pide al Singleton (un único lugar donde cambiarlo) |
| 43–48 | **FACTORY ESTÁTICA** | `static crear(tipo: "estandar" \| "express"): Envio {` | Devuelve la interfaz Envio; tipo con unión de literales (sin enum). Únicos new de los envíos |

### `ej3-notificaciones-original.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14–16 | **OCP ✗ VIOLACIÓN** | `if (canal === "sms") {` | "un if (canal === "sms") que crece con cada canal": cada canal nuevo obliga a modificar este método |
| 20 | **DIP ✗ VIOLACIÓN** | `const log = new ArchivoLog();` | "crea un ArchivoLog con new dentro del método": no se puede cambiar a base de datos sin tocar el servicio |

### `ej3-notificaciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–8 | **OCP ✓ COMENTARIO OBLIGATORIO** | `interface Canal {` | La consigna pide un comentario arriba de cada interfaz nueva con el principio |
| 11–17 | **OCP ✓ UNA CLASE POR OPCIÓN** | `class Email implements Canal {` | El costo vive dentro de cada canal |
| 29–31 | **DIP ✓ COMENTARIO OBLIGATORIO** | `interface Registro {` |  |
| 49–51 | **DIP ✓ INYECCIÓN POR CONSTRUCTOR** | `constructor(registro: Registro) {` | Ya no hace new ArchivoLog() |
| 54–56 | **OCP ✓ SIN IF** | `notificar(canal: Canal, mensaje: string): void {` | Recibe un Canal: un canal nuevo es una clase nueva y el servicio no se toca |
| 65 | **DIP ✓ BENEFICIO** | `const servicioDb = new ServicioNotificaciones(new RegistroBaseDeDat...` | Cambiar de archivo a base de datos sin modificar ServicioNotificaciones |
