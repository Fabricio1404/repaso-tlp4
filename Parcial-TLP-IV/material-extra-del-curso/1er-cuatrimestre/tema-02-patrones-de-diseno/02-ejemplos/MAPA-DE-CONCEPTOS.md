# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **INTERFACE PARA DATOS** → `01-singleton-inventario.ts` L8–12
- **SINGLETON ① ATRIBUTO STATIC** → `01-singleton-inventario.ts` L16–17
- **SINGLETON ② CONSTRUCTOR PRIVATE** → `01-singleton-inventario.ts` L20–22
- **SINGLETON ③ MÉTODO STATIC DE ACCESO** → `01-singleton-inventario.ts` L25–30
- **COPIA DEFENSIVA** → `01-singleton-inventario.ts` L37–39
- **SINGLETON CON CONFIGURACIÓN** → `01-singleton-inventario.ts` L43–58
- **READONLY** → `01-singleton-inventario.ts` L46
- **CONSTRUCTOR PRIVATE VACÍO** → `01-singleton-inventario.ts` L50
- **MISMA INSTANCIA** → `01-singleton-inventario.ts` L65
- **FACTORY ① PRODUCTO / TIPO COMÚN** → `02-factory-method-equipos.ts` L8–20
- **FACTORY ② PRODUCTOS CONCRETOS** → `02-factory-method-equipos.ts` L23–27
- **UNIÓN DE LITERALES** → `02-factory-method-equipos.ts` L42
- **FACTORY ③ MÉTODO CREADOR** → `02-factory-method-equipos.ts` L47–57
- **FACTORY ④ LOS NEW VIVEN SOLO ACÁ** → `02-factory-method-equipos.ts` L50
- **FACTORY METHOD GOF** → `02-factory-method-equipos.ts` L62–71
- **MÉTODO FÁBRICA ABSTRACTO** → `02-factory-method-equipos.ts` L64
- **LÓGICA COMÚN QUE USA EL MÉTODO FÁBRICA** → `02-factory-method-equipos.ts` L67–70
- **CLIENTE** → `02-factory-method-equipos.ts` L88–91, `04-adapter-inventario-viejo.ts` L63–67
- **OBSERVER ① INTERFAZ OBSERVADOR** → `03-observer-equipo-soporte.ts` L8–10
- **OBSERVER ② OBSERVADOR CONCRETO** → `03-observer-equipo-soporte.ts` L13–17
- **OBSERVER ② OTRO OBSERVADOR** → `03-observer-equipo-soporte.ts` L20–34
- **OBSERVER ③ SUJETO** → `03-observer-equipo-soporte.ts` L37–73
- **OBSERVER ④ LISTA DE LA INTERFAZ** → `03-observer-equipo-soporte.ts` L42
- **OBSERVER ⑤ SUSCRIBIR** → `03-observer-equipo-soporte.ts` L52–54
- **OBSERVER ⑥ DESUSCRIBIR** → `03-observer-equipo-soporte.ts` L57–59
- **OBSERVER ⑦ EL CAMBIO DISPARA LA NOTIFICACIÓN** → `03-observer-equipo-soporte.ts` L62–65
- **OBSERVER ⑧ NOTIFICAR** → `03-observer-equipo-soporte.ts` L68–72
- **ADAPTER ① TARGET** → `04-adapter-inventario-viejo.ts` L14–17
- **ADAPTER ② ADAPTEE** → `04-adapter-inventario-viejo.ts` L20–34
- **ADAPTER ③ ADAPTADOR** → `04-adapter-inventario-viejo.ts` L37–60
- **ADAPTER ④ COMPOSICIÓN** → `04-adapter-inventario-viejo.ts` L39
- **ADAPTER ⑤ TRADUCE LA LLAMADA** → `04-adapter-inventario-viejo.ts` L46–48
- **ADAPTER ⑥ TRADUCE LA RESPUESTA** → `04-adapter-inventario-viejo.ts` L51–59
- **SINGLETON** → `05-combinados-envios-y-notificaciones.ts` L12
- **FACTORY - TIPO COMÚN** → `05-combinados-envios-y-notificaciones.ts` L26–28
- **SINGLETON EN USO** → `05-combinados-envios-y-notificaciones.ts` L39
- **FACTORY ESTÁTICA** → `05-combinados-envios-y-notificaciones.ts` L46–51
- **TARGET** → `05-combinados-envios-y-notificaciones.ts` L63–65
- **ADAPTEE** → `05-combinados-envios-y-notificaciones.ts` L74–79
- **ADAPTER** → `05-combinados-envios-y-notificaciones.ts` L82–92
- **FACTORY** → `05-combinados-envios-y-notificaciones.ts` L97–104
- **OBSERVER - INTERFAZ OBSERVADOR** → `05-combinados-envios-y-notificaciones.ts` L107–109
- **OBSERVER - OBSERVADOR CONCRETO** → `05-combinados-envios-y-notificaciones.ts` L112–124
- **OBSERVER - SUJETO** → `05-combinados-envios-y-notificaciones.ts` L127–148

## Detalle archivo por archivo


### `01-singleton-inventario.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–12 | **INTERFACE PARA DATOS** | `interface Equipo {` | Tipa los objetos que guarda el inventario |
| 16–17 | **SINGLETON ① ATRIBUTO STATIC** | `private static instancia: Inventario \| undefined;` | Guarda LA única instancia. static = pertenece a la clase; private = nadie la reemplaza; / undefined = al principio no existe |
| 20–22 | **SINGLETON ② CONSTRUCTOR PRIVATE** | `private constructor() {` | Nadie de afuera puede hacer new Inventario() |
| 25–30 | **SINGLETON ③ MÉTODO STATIC DE ACCESO** | `static obtenerInstancia(): Inventario {` | Única puerta de entrada: crea la instancia solo la primera vez (lazy) y después devuelve siempre la misma |
| 37–39 | **COPIA DEFENSIVA** | `listarEquipos(): Equipo[] {` | El Singleton también protege su estado |
| 43–58 | **SINGLETON CON CONFIGURACIÓN** | `class ConfiguracionEmpresa {` | Variante del primer parcial: un valor fijo que se lee desde un único lugar |
| 46 | **READONLY** | `readonly recargoExpress = 2500;` | Valor de configuración que nadie puede reasignar |
| 50 | **CONSTRUCTOR PRIVATE VACÍO** | `private constructor() {}` | No hay nada que inicializar, pero igual tiene que ser private |
| 65 | **MISMA INSTANCIA** | `const otraReferencia = Inventario.obtenerInstancia();` | Otra parte del programa pide el inventario y recibe EL MISMO objeto (ve el equipo agregado antes) |

### `02-factory-method-equipos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–20 | **FACTORY ① PRODUCTO / TIPO COMÚN** | `abstract class EquipoBase {` | Lo que la fábrica devuelve. Quien usa la fábrica solo conoce esto |
| 23–27 | **FACTORY ② PRODUCTOS CONCRETOS** | `class Notebook extends EquipoBase {` | Cada clase concreta implementa el tipo común |
| 42 | **UNIÓN DE LITERALES** | `type TipoEquipo = "Notebook" \| "Desktop" \| "Servidor";` | Reemplaza al enum: un tipo mal escrito ("Notbook") no compila |
| 47–57 | **FACTORY ③ MÉTODO CREADOR** | `crearEquipo(tipo: TipoEquipo, nombre: string, ram: string, procesad...` | Recibe el tipo y devuelve el TIPO COMÚN (EquipoBase), nunca la clase concreta |
| 50 | **FACTORY ④ LOS NEW VIVEN SOLO ACÁ** | `case "Notebook":` | Si aparece un tipo nuevo, se agrega una clase y un case |
| 62–71 | **FACTORY METHOD GOF** | `abstract class ProveedorDeEquipos {` | El CREADOR es abstracto: declara el método fábrica y lo usa, pero no sabe qué crea |
| 64 | **MÉTODO FÁBRICA ABSTRACTO** | `protected abstract crear(nombre: string): EquipoBase;` | Cada subclase decide QUÉ producto concreto crear |
| 67–70 | **LÓGICA COMÚN QUE USA EL MÉTODO FÁBRICA** | `entregar(nombre: string): string {` | El creador trabaja con el producto sin conocer su clase |
| 88–91 | **CLIENTE** | `const equipos: EquipoBase[] = [` | Solo conoce EquipoBase: no hace new de ninguna clase concreta |

### `03-observer-equipo-soporte.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–10 | **OBSERVER ① INTERFAZ OBSERVADOR** | `interface Observador {` | El contrato: todo observador tiene actualizar() |
| 13–17 | **OBSERVER ② OBSERVADOR CONCRETO** | `class Soporte implements Observador {` | Decide QUÉ hacer cuando le avisan |
| 20–34 | **OBSERVER ② OTRO OBSERVADOR** | `class RegistroDeCambios implements Observador {` | Se agregó sin tocar Equipo: guarda un registro en vez de imprimir |
| 37–73 | **OBSERVER ③ SUJETO** | `class Equipo {` | El que cambia y avisa |
| 42 | **OBSERVER ④ LISTA DE LA INTERFAZ** | `private observadores: Observador[];` | Guarda Observador[], no Soporte[]: no sabe quiénes son |
| 52–54 | **OBSERVER ⑤ SUSCRIBIR** | `agregarObservador(observador: Observador): void {` | attach |
| 57–59 | **OBSERVER ⑥ DESUSCRIBIR** | `quitarObservador(observador: Observador): void {` | detach: filter crea un arreglo sin ese observador (compara por referencia) |
| 62–65 | **OBSERVER ⑦ EL CAMBIO DISPARA LA NOTIFICACIÓN** | `cambiarEstado(nuevoEstado: string): void {` |  |
| 68–72 | **OBSERVER ⑧ NOTIFICAR** | `private notificar(): void {` | Recorre la lista y llama a actualizar() en cada uno, sin preguntar el tipo (polimorfismo) |

### `04-adapter-inventario-viejo.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 14–17 | **ADAPTER ① TARGET** | `interface Inventario {` | El contrato que espera el sistema nuevo |
| 20–34 | **ADAPTER ② ADAPTEE** | `class InventarioViejo {` | La clase vieja: otros nombres de métodos y otro formato (texto "nombre/tipo/estado"). NO SE MODIFICA |
| 37–60 | **ADAPTER ③ ADAPTADOR** | `class AdaptadorInventario implements Inventario {` | Implementa el target (lo que espera el sistema nuevo)... |
| 39 | **ADAPTER ④ COMPOSICIÓN** | `private viejo: InventarioViejo;` | ...y GUARDA una referencia al adaptee: no reimplementa nada, delega |
| 46–48 | **ADAPTER ⑤ TRADUCE LA LLAMADA** | `agregarEquipo(nombre: string, tipo: string, estado: string): void {` | agregarEquipo(3 parámetros) → agregarItem(1 texto) |
| 51–59 | **ADAPTER ⑥ TRADUCE LA RESPUESTA** | `listarEquipos(): EquipoRegistrado[] {` | string[] con "/" → EquipoRegistrado[] |
| 63–67 | **CLIENTE** | `function imprimirInventario(inv: Inventario): void {` | Código del sistema nuevo: depende SOLO de la interfaz Inventario, no sabe que atrás hay una clase vieja |

### `05-combinados-envios-y-notificaciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 12 | **SINGLETON** | `private static instancia: ConfiguracionEmpresa \| undefined;` | constructor private + atributo static + obtenerInstancia() |
| 26–28 | **FACTORY - TIPO COMÚN** | `interface Envio {` | La fábrica devuelve Envio (interfaz) |
| 39 | **SINGLETON EN USO** | `const configuracion = ConfiguracionEmpresa.obtenerInstancia();` | No escribe 2500: lo pide al Singleton (un único lugar donde cambiarlo) |
| 46–51 | **FACTORY ESTÁTICA** | `static crear(tipo: "estandar" \| "express"): Envio {` | Se usa sin crear la fábrica: FabricaEnvios.crear(...). Nadie más hace new de los envíos |
| 63–65 | **TARGET** | `interface Notificador {` | Contrato de un canal de notificación |
| 74–79 | **ADAPTEE** | `class LibreriaSmsExterna {` | Una "librería" de SMS de terceros con otra interfaz (no se puede modificar) |
| 82–92 | **ADAPTER** | `class SmsAdapter implements Notificador {` | Implementa Notificador y traduce a la librería de SMS |
| 97–104 | **FACTORY** | `class FabricaNotificadores {` | Crea el canal pedido; el observador nunca hace new de un canal |
| 107–109 | **OBSERVER - INTERFAZ OBSERVADOR** | `interface ObservadorPedido {` |  |
| 112–124 | **OBSERVER - OBSERVADOR CONCRETO** | `class ServicioNotificaciones implements ObservadorPedido {` | Reacciona usando la fábrica; no sabe nada de SMS ni de email |
| 127–148 | **OBSERVER - SUJETO** | `class Pedido {` |  |
