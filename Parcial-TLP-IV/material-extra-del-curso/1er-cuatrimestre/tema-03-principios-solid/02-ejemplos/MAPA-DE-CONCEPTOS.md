# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SRP ✗ VIOLACIÓN** → `01-srp-user-manager.ts` L15–32
- **SRP ✗ MOTIVO 1** → `01-srp-user-manager.ts` L24–26
- **SRP ✗ MOTIVO 2** → `01-srp-user-manager.ts` L28
- **SRP ✗ MOTIVO 3** → `01-srp-user-manager.ts` L30
- **SRP ✓ RESPONSABILIDAD 1** → `01-srp-user-manager.ts` L36–42
- **SRP ✓ RESPONSABILIDAD 2** → `01-srp-user-manager.ts` L45–59
- **SRP ✓ RESPONSABILIDAD 3** → `01-srp-user-manager.ts` L62–66
- **COMPOSICIÓN** → `01-srp-user-manager.ts` L69–87
- **INYECCIÓN POR CONSTRUCTOR** → `01-srp-user-manager.ts` L75–79, `05-dip-order-service.ts` L49–51
- **MISMO COMPORTAMIENTO VISIBLE** → `01-srp-user-manager.ts` L82–86
- **COMPOSITION ROOT** → `01-srp-user-manager.ts` L95, `05-dip-order-service.ts` L71
- **OCP ✗ VIOLACIÓN** → `02-ocp-payment-processor.ts` L11–24
- **OCP ✗ ERROR EN EJECUCIÓN** → `02-ocp-payment-processor.ts` L23
- **OCP ✓ ABSTRACCIÓN** → `02-ocp-payment-processor.ts` L30–32
- **OCP ✓ UNA CLASE POR OPCIÓN** → `02-ocp-payment-processor.ts` L35–39
- **OCP ✓ EXTENSIÓN** → `02-ocp-payment-processor.ts` L54–58
- **OCP ✓ CERRADO A MODIFICACIÓN** → `02-ocp-payment-processor.ts` L61–65
- **LSP ✗ VIOLACIÓN** → `03-lsp-rectangle-square.ts` L32–47
- **LSP ✗ POSTCONDICIÓN DEBILITADA** → `03-lsp-rectangle-square.ts` L38–41
- **LSP ✗ LA FUNCIÓN CLIENTE** → `03-lsp-rectangle-square.ts` L50–54
- **LSP ✓ CONTRATO COMÚN** → `03-lsp-rectangle-square.ts` L58–60
- **LSP ✓ SIN HERENCIA ENTRE ELLOS** → `03-lsp-rectangle-square.ts` L63–83
- **LSP ✓ OPERACIÓN PROPIA** → `03-lsp-rectangle-square.ts` L93–95
- **LSP ✓ TIPO PRECISO** → `03-lsp-rectangle-square.ts` L103–107
- **POLIMORFISMO SEGURO** → `03-lsp-rectangle-square.ts` L110–112
- **ISP ✗ INTERFAZ GORDA** → `04-isp-printers.ts` L9–13
- **ISP ✗ MÉTODO QUE NO LE CORRESPONDE** → `04-isp-printers.ts` L21–23
- **ISP ✓ INTERFACES CHICAS** → `04-isp-printers.ts` L32–34
- **ISP ✓ IMPLEMENTA SOLO LO QUE TIENE** → `04-isp-printers.ts` L45–49
- **ISP ✓ VARIAS INTERFACES** → `04-isp-printers.ts` L52–64
- **ISP ✓ EL CLIENTE PIDE LO MÍNIMO** → `04-isp-printers.ts` L67–71
- **DIP ✗ VIOLACIÓN** → `05-dip-order-service.ts` L17
- **DIP ✓ ABSTRACCIÓN** → `05-dip-order-service.ts` L27–29
- **DIP ✓ DETALLES QUE DEPENDEN DE LA ABSTRACCIÓN** → `05-dip-order-service.ts` L32–36
- **DIP ✓ DEPENDE DE LA INTERFAZ** → `05-dip-order-service.ts` L46
- **DOBLE DE PRUEBA** → `05-dip-order-service.ts` L60–65

## Detalle archivo por archivo


### `01-srp-user-manager.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 15–32 | **SRP ✗ VIOLACIÓN** | `class UserManager {` | Una sola clase con TRES motivos para cambiar: regla de validación, forma de guardar, forma de avisar |
| 24–26 | **SRP ✗ MOTIVO 1** | `if (!email.includes("@")) {` | Regla de validación mezclada con todo lo demás |
| 28 | **SRP ✗ MOTIVO 2** | `this.users.push({ username: username, email: email });` | Forma de guardar |
| 30 | **SRP ✗ MOTIVO 3** | `return `Email enviado a ${email}`;` | Forma de avisar |
| 36–42 | **SRP ✓ RESPONSABILIDAD 1** | `class UserValidator {` | Solo valida. Cambia únicamente si cambia la regla del correo |
| 45–59 | **SRP ✓ RESPONSABILIDAD 2** | `class UserRepository {` | Solo guarda. Si se pasa a una base de datos, se toca solo esta clase |
| 62–66 | **SRP ✓ RESPONSABILIDAD 3** | `class EmailService {` | Solo avisa |
| 69–87 | **COMPOSICIÓN** | `class UserRegistrationService {` | El coordinador TIENE las tres piezas y delega; no hace el trabajo él mismo |
| 75–79 | **INYECCIÓN POR CONSTRUCTOR** | `constructor(validator: UserValidator, repository: UserRepository, e...` | Las piezas vienen de afuera (también ayuda a DIP) |
| 82–86 | **MISMO COMPORTAMIENTO VISIBLE** | `register(username: string, email: string): string {` | Hace lo mismo que UserManager.register, en el mismo orden |
| 95 | **COMPOSITION ROOT** | `const service = new UserRegistrationService(new UserValidator(), re...` | Los new se hacen acá afuera, en un solo lugar |

### `02-ocp-payment-processor.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 11–24 | **OCP ✗ VIOLACIÓN** | `switch (method) {` | switch que CRECE con cada medio nuevo: hay que MODIFICAR una clase que ya funcionaba |
| 23 | **OCP ✗ ERROR EN EJECUCIÓN** | `throw new Error(`Medio de pago desconocido: ${method}`);` | Un texto mal escrito ("crad") recién se detecta al ejecutar |
| 30–32 | **OCP ✓ ABSTRACCIÓN** | `interface PaymentMethod {` | El comportamiento que comparten todos los medios de pago se vuelve la interfaz |
| 35–39 | **OCP ✓ UNA CLASE POR OPCIÓN** | `class CardPayment implements PaymentMethod {` |  |
| 54–58 | **OCP ✓ EXTENSIÓN** | `class CryptoPayment implements PaymentMethod {` | Medio NUEVO agregado después: es una clase nueva, PaymentProcessor NO se tocó |
| 61–65 | **OCP ✓ CERRADO A MODIFICACIÓN** | `class PaymentProcessor {` | Delega en el medio recibido. Nunca más hay que editarlo para agregar opciones |

### `03-lsp-rectangle-square.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 32–47 | **LSP ✗ VIOLACIÓN** | `class SquareOriginal extends RectangleOriginal {` | "Un cuadrado ES un rectángulo" en matemática, pero en código no se COMPORTA igual |
| 38–41 | **LSP ✗ POSTCONDICIÓN DEBILITADA** | `override setWidth(width: number): void {` | La base garantiza que setWidth cambia SOLO el ancho; la hija cambia también el alto |
| 50–54 | **LSP ✗ LA FUNCIÓN CLIENTE** | `function resizeRectangleOriginal(rectangle: RectangleOriginal): void {` | Espera un rectángulo y es "sorprendida" por la subclase |
| 58–60 | **LSP ✓ CONTRATO COMÚN** | `interface Shape {` | Lo único que los dos pueden prometer de verdad: tener área |
| 63–83 | **LSP ✓ SIN HERENCIA ENTRE ELLOS** | `class Rectangle implements Shape {` | Rectangle y Square son hermanos que cumplen Shape |
| 93–95 | **LSP ✓ OPERACIÓN PROPIA** | `setSide(side: number): void {` | El cuadrado tiene SU forma de cambiar de tamaño, sin fingir ser rectángulo |
| 103–107 | **LSP ✓ TIPO PRECISO** | `function resizeRectangle(rectangle: Rectangle): void {` | Ahora solo acepta Rectangle: ya no puede recibir un Square por error |
| 110–112 | **POLIMORFISMO SEGURO** | `function areaTotal(formas: Shape[]): number {` | Lo que sí sirve para todos: un Shape[] |

### `04-isp-printers.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 9–13 | **ISP ✗ INTERFAZ GORDA** | `interface MultifunctionDevice {` | Obliga a todos a implementar las tres capacidades |
| 21–23 | **ISP ✗ MÉTODO QUE NO LE CORRESPONDE** | `scan(document: string): void {` | Compila (cumple el contrato) pero EXPLOTA en ejecución |
| 32–34 | **ISP ✓ INTERFACES CHICAS** | `interface Printer {` | Una por capacidad |
| 45–49 | **ISP ✓ IMPLEMENTA SOLO LO QUE TIENE** | `class SimplePrinter implements Printer {` |  |
| 52–64 | **ISP ✓ VARIAS INTERFACES** | `class MultifunctionPrinter implements Printer, Scanner, Fax {` | La multifunción combina las tres |
| 67–71 | **ISP ✓ EL CLIENTE PIDE LO MÍNIMO** | `function digitalizar(documentos: string[], scanner: Scanner): void {` | Esta función solo necesita escanear: acepta cualquier Scanner |

### `05-dip-order-service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 17 | **DIP ✗ VIOLACIÓN** | `private emailSender: EmailSenderOriginal = new EmailSenderOriginal();` | new de una clase CONCRETA dentro de otra clase: OrderService queda atado al email para siempre |
| 27–29 | **DIP ✓ ABSTRACCIÓN** | `interface Notifier {` | El contrato común que pueden cumplir el correo y el SMS |
| 32–36 | **DIP ✓ DETALLES QUE DEPENDEN DE LA ABSTRACCIÓN** | `class EmailSender implements Notifier {` | Los módulos de bajo nivel implementan la interfaz |
| 46 | **DIP ✓ DEPENDE DE LA INTERFAZ** | `private notifier: Notifier;` | El módulo de alto nivel no conoce EmailSender ni SmsSender |
| 49–51 | **INYECCIÓN POR CONSTRUCTOR** | `constructor(notifier: Notifier) {` | La dependencia viene desde afuera |
| 60–65 | **DOBLE DE PRUEBA** | `class NotifierFalso implements Notifier {` | Implementa Notifier y GUARDA los mensajes en vez de enviarlos: permite probar sin mandar correos reales |
| 71 | **COMPOSITION ROOT** | `new OrderService(new EmailSender()).createOrder("ana@example.com");` | Acá (y solo acá) se decide qué implementación concreta usar |
