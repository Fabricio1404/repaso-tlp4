# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **INTERFACE PARA DATOS** → `m1-carrito.ts` L4–8
- **UNIÓN DE LITERALES** → `m1-carrito.ts` L11
- **AGREGACIÓN** → `m1-carrito.ts` L15–16
- **COMPOSICIÓN** → `m1-carrito.ts` L30–31
- **VALIDACIÓN** → `m1-carrito.ts` L40–42
- **BUSCAR ANTES DE AGREGAR** → `m1-carrito.ts` L44
- **SPLICE** → `m1-carrito.ts` L58
- **DELEGACIÓN** → `m1-carrito.ts` L62–64
- **COPIA DEFENSIVA** → `m1-carrito.ts` L82–84
- **CLASE ABSTRACTA** → `m2-figuras.ts` L4–28
- **MÉTODO ABSTRACTO** → `m2-figuras.ts` L12, `m3-socios.ts` L16
- **POLIMORFISMO** → `m2-figuras.ts` L16–18, `m2-figuras.ts` L98–109, `m3-socios.ts` L25, `m3-socios.ts` L48–50
- **MÉTODO PROTECTED STATIC** → `m2-figuras.ts` L21–27
- **IMPLEMENTACIÓN DE ABSTRACTO** → `m2-figuras.ts` L40–42
- **VALIDAR EN CONSTRUCTOR** → `m2-figuras.ts` L78–80
- **ENCAPSULAMIENTO** → `m3-socios.ts` L7
- **MÉTODO CONCRETO REDEFINIBLE** → `m3-socios.ts` L19–21
- **OVERRIDE** → `m3-socios.ts` L65–67
- **INTERFACE** → `m4-interfaces.ts` L4–6
- **IMPLEMENTS MÚLTIPLE** → `m4-interfaces.ts` L19–39
- **MISMO CONTRATO, OTRA IMPLEMENTACIÓN** → `m4-interfaces.ts` L55–57
- **INTERFACE SEGREGADA** → `m4-interfaces.ts` L65–79
- **POLIMORFISMO CON INTERFACES** → `m4-interfaces.ts` L82–84
- **GENÉRICO** → `m4-interfaces.ts` L91–93

## Detalle archivo por archivo


### `m1-carrito.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–8 | **INTERFACE PARA DATOS** | `interface Producto {` | El producto es un dato simple, sin comportamiento |
| 11 | **UNIÓN DE LITERALES** | `type Cupon = "DESC10" \| "DESC20";` | Reemplaza al enum prohibido: un cupón mal escrito no compila |
| 15–16 | **AGREGACIÓN** | `readonly producto: Producto;` | El producto existe por fuera del carrito; el ítem solo lo referencia |
| 30–31 | **COMPOSICIÓN** | `private items: ItemCarrito[];` | El carrito crea y administra sus ítems; nadie de afuera hace new ItemCarrito |
| 40–42 | **VALIDACIÓN** | `if (!Number.isInteger(cantidad) \|\| cantidad <= 0) {` | Number.isInteger también rechaza NaN y decimales |
| 44 | **BUSCAR ANTES DE AGREGAR** | `const existente = this.items.find((i) => i.producto.codigo === prod...` | Si el producto ya está, se suma la cantidad (no se duplica el ítem) |
| 58 | **SPLICE** | `this.items.splice(indice, 1);` | Quita 1 elemento en la posición indice |
| 62–64 | **DELEGACIÓN** | `get total(): number {` | El carrito no multiplica precios: le pide el subtotal a cada ítem |
| 82–84 | **COPIA DEFENSIVA** | `listar(): string[] {` | Devuelve textos nuevos: la lista interna nunca sale de la clase |

### `m2-figuras.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–28 | **CLASE ABSTRACTA** | `abstract class Figura {` | Molde parcial: tiene estado (nombre) y un método con código (describir), pero area y perimetro quedan como "huecos" |
| 12 | **MÉTODO ABSTRACTO** | `abstract area(): number;` | Sin cuerpo: cada hija está obligada a implementarlo |
| 16–18 | **POLIMORFISMO** | `describir(): string {` | Método concreto en la abstracta que usa los abstractos: funciona para cualquier hija |
| 21–27 | **MÉTODO PROTECTED STATIC** | `protected static validarPositivo(...medidas: number[]): void {` | Validación compartida que las hijas pueden usar |
| 40–42 | **IMPLEMENTACIÓN DE ABSTRACTO** | `area(): number {` | Cada figura calcula a su manera |
| 78–80 | **VALIDAR EN CONSTRUCTOR** | `if (a + b <= c \|\| a + c <= b \|\| b + c <= a) {` | Es imposible crear un triángulo que no cumpla la desigualdad triangular |
| 98–109 | **POLIMORFISMO** | `function figuraMayorArea(figuras: Figura[]): Figura {` | Recibe Figura[] y compara áreas sin saber qué figura es cada una |

### `m3-socios.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7 | **ENCAPSULAMIENTO** | `private prestamos: string[];` | La lista de préstamos solo cambia con prestar() y devolver() |
| 16 | **MÉTODO ABSTRACTO** | `abstract limitePrestamos(): number;` | Cada tipo de socio DEBE decir su límite (no hay un valor "por defecto" razonable) |
| 19–21 | **MÉTODO CONCRETO REDEFINIBLE** | `diasDePrestamo(): number {` | Hay un valor por defecto (7) que algunas hijas sobrescriben |
| 25 | **POLIMORFISMO** | `const limite = this.limitePrestamos();` | La regla está UNA vez acá; el límite lo aporta cada subclase |
| 48–50 | **POLIMORFISMO** | `resumen(): string {` | resumen() combina métodos que cada hija puede haber redefinido |
| 65–67 | **OVERRIDE** | `override diasDePrestamo(): number {` | Redefine el valor por defecto heredado |

### `m4-interfaces.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **INTERFACE** | `interface Identificable {` | Tres contratos chicos e independientes |
| 19–39 | **IMPLEMENTS MÚLTIPLE** | `class ClienteParticular implements Identificable, Notificable, Fact...` | Una clase puede cumplir varios contratos a la vez (con extends solo se hereda de UNA clase) |
| 55–57 | **MISMO CONTRATO, OTRA IMPLEMENTACIÓN** | `notificar(mensaje: string): string {` | Notifica por SMS en vez de email |
| 65–79 | **INTERFACE SEGREGADA** | `class Proveedor implements Identificable, Notificable {` | El proveedor se notifica pero NO se factura: implementa solo lo que le corresponde |
| 82–84 | **POLIMORFISMO CON INTERFACES** | `function avisarATodos(destinatarios: Notificable[], mensaje: string...` | Acepta cualquier Notificable, sin importar la clase |
| 91–93 | **GENÉRICO** | `function buscarPorId<T extends Identificable>(lista: T[], id: strin...` | T es "cualquier tipo que sea Identificable": devuelve el MISMO tipo que recibe (no pierde información) |
