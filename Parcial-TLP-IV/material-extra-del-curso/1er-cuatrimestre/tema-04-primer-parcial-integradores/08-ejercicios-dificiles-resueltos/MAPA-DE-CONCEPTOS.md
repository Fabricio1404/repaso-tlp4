# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **SINGLETON** → `d1-gimnasio-integrador.ts` L14
- **CLASE ABSTRACTA + OCP ✓** → `d1-gimnasio-integrador.ts` L31–40
- **POLIMORFISMO** → `d1-gimnasio-integrador.ts` L37–39
- **SINGLETON EN USO** → `d1-gimnasio-integrador.ts` L48
- **FACTORY** → `d1-gimnasio-integrador.ts` L84–93
- **STATIC** → `d1-gimnasio-integrador.ts` L99
- **ENCAPSULAMIENTO** → `d1-gimnasio-integrador.ts` L103–104
- **DIP ✓** → `d1-gimnasio-integrador.ts` L144–146
- **OBSERVER - INTERFAZ** → `d1-gimnasio-integrador.ts` L163–165
- **OBSERVER - SUJETO** → `d1-gimnasio-integrador.ts` L168–223
- **POLIMORFISMO / OCP** → `d1-gimnasio-integrador.ts` L191–193
- **OBSERVER** → `d1-gimnasio-integrador.ts` L206
- **OBSERVER CONCRETO + DIP** → `d1-gimnasio-integrador.ts` L226–241
- **ISP ✓ / ADAPTER - TARGET** → `d1-gimnasio-integrador.ts` L258–260
- **ADAPTER - ADAPTEE** → `d1-gimnasio-integrador.ts` L263–273
- **ADAPTER** → `d1-gimnasio-integrador.ts` L276–284
- **SRP ✓** → `d1-gimnasio-integrador.ts` L288–325
- **DIP ✓ INYECCIÓN** → `d1-gimnasio-integrador.ts` L291

## Detalle archivo por archivo


### `d1-gimnasio-integrador.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14 | **SINGLETON** | `private static instancia: ConfiguracionGimnasio \| undefined;` | Los precios se definen en un único lugar |
| 31–40 | **CLASE ABSTRACTA + OCP ✓** | `abstract class Plan {` | OCP: un plan nuevo es una clase nueva; Gimnasio y ClaseGrupal no cambian |
| 37–39 | **POLIMORFISMO** | `permite(actividad: Actividad): boolean {` | Método concreto que usa el abstracto |
| 48 | **SINGLETON EN USO** | `return ConfiguracionGimnasio.obtenerInstancia().cuotaBase;` | El precio no está escrito acá |
| 84–93 | **FACTORY** | `static crear(tipo: TipoPlan): Plan {` | Único lugar con new de los planes |
| 99 | **STATIC** | `private static altas: number = 0;` | Total histórico de altas (todas las sedes) |
| 103–104 | **ENCAPSULAMIENTO** | `private _plan: Plan;` | El plan y el estado solo cambian por métodos |
| 144–146 | **DIP ✓** | `interface Notificador {` | DIP: los avisos dependen de esta abstracción |
| 163–165 | **OBSERVER - INTERFAZ** | `interface ObservadorClase {` |  |
| 168–223 | **OBSERVER - SUJETO** | `class ClaseGrupal {` | La clase grupal avisa sin conocer a los observadores |
| 191–193 | **POLIMORFISMO / OCP** | `if (!socio.plan.permite(this.actividad)) {` | Pregunta al plan, sin if por tipo de plan |
| 206 | **OBSERVER** | `const siguiente = this.espera.shift();` | Se libera un cupo: se promueve al primero en espera y se avisa |
| 226–241 | **OBSERVER CONCRETO + DIP** | `class AvisoSocio implements ObservadorClase {` | Recibe el canal por constructor |
| 258–260 | **ISP ✓ / ADAPTER - TARGET** | `interface ControlAcceso {` | Interfaz chica: lo único que el gimnasio necesita del molinete |
| 263–273 | **ADAPTER - ADAPTEE** | `class MolineteLegacy {` | Molinete viejo: trabaja con códigos numéricos y responde 1/0. No se modifica |
| 276–284 | **ADAPTER** | `class MolineteAdapter implements ControlAcceso {` | Traduce DNI (texto) → código numérico, y 1/0 → boolean |
| 288–325 | **SRP ✓** | `class Gimnasio {` | El gimnasio administra socios e ingresos; no calcula precios, no notifica, no abre puertas |
| 291 | **DIP ✓ INYECCIÓN** | `private acceso: ControlAcceso;` | Depende de ControlAcceso, no del molinete concreto |
