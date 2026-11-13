# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **CLASE ABSTRACTA** → `f1-poo-singleton-biblioteca.ts` L4–21
- **MÉTODO ABSTRACTO** → `f1-poo-singleton-biblioteca.ts` L14
- **POLIMORFISMO** → `f1-poo-singleton-biblioteca.ts` L18–20
- **SINGLETON** → `f1-poo-singleton-biblioteca.ts` L42–73
- **GETTER** → `f1-poo-singleton-biblioteca.ts` L70–72
- **SINGLETON EN USO** → `f1-poo-singleton-biblioteca.ts` L78
- **OCP ✓** → `f2-poo-ocp-impuestos.ts` L4–7
- **COMPOSICIÓN** → `f2-poo-ocp-impuestos.ts` L34
- **SETTER CON VALIDACIÓN** → `f2-poo-ocp-impuestos.ts` L48–53
- **OCP ✓ SIN IF POR CATEGORÍA** → `f2-poo-ocp-impuestos.ts` L56–58
- **OCP ✓ EXTENSIÓN** → `f2-poo-ocp-impuestos.ts` L90–95
- **DIP ✓** → `f3-factory-dip-alertas.ts` L4–6
- **FACTORY** → `f3-factory-dip-alertas.ts` L29–40
- **DIP ✓ INYECCIÓN POR CONSTRUCTOR** → `f3-factory-dip-alertas.ts` L47–50
- **COMPOSITION ROOT + FACTORY** → `f3-factory-dip-alertas.ts` L65–69

## Detalle archivo por archivo


### `f1-poo-singleton-biblioteca.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–21 | **CLASE ABSTRACTA** | `abstract class Material {` | No hay "material genérico" |
| 14 | **MÉTODO ABSTRACTO** | `abstract diasDePrestamo(): number;` | Cada tipo define sus días de préstamo |
| 18–20 | **POLIMORFISMO** | `describir(): string {` | Escrito una vez, usa los abstractos |
| 42–73 | **SINGLETON** | `class RegistroPrestamos {` | Un solo registro de préstamos para toda la escuela |
| 70–72 | **GETTER** | `get cantidad(): number {` | cantidad actual |
| 78 | **SINGLETON EN USO** | `console.log(`[${aula}] ${RegistroPrestamos.obtenerInstancia().prest...` | Cada aula obtiene el MISMO registro |

### `f2-poo-ocp-impuestos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–7 | **OCP ✓** | `interface Categoria {` | OCP: se agregan categorías sin modificar Producto ni Factura |
| 34 | **COMPOSICIÓN** | `private categoria: Categoria;` | El producto TIENE una categoría y le delega la alícuota |
| 48–53 | **SETTER CON VALIDACIÓN** | `set precio(valor: number) {` |  |
| 56–58 | **OCP ✓ SIN IF POR CATEGORÍA** | `get iva(): number {` |  |
| 90–95 | **OCP ✓ EXTENSIÓN** | `class Medicamentos implements Categoria {` | Categoría nueva: Producto y Factura no se tocaron |

### `f3-factory-dip-alertas.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–6 | **DIP ✓** | `interface Notificador {` | DIP: ServicioAlertas depende de esta interfaz, no de un canal concreto |
| 29–40 | **FACTORY** | `class FabricaNotificadores {` | Traduce una configuración (texto) a un objeto concreto. Único lugar con estos new |
| 47–50 | **DIP ✓ INYECCIÓN POR CONSTRUCTOR** | `constructor(notificador: Notificador) {` | No sabe si recibe email, sms o slack |
| 65–69 | **COMPOSITION ROOT + FACTORY** | `const configuracion: { canal: TipoCanal; destino: string }[] = [` | La "configuración" decide el canal; el servicio no cambia |
