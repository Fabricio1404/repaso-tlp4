# Soluciones explicadas · Tema 02 · Patrones de diseño

Los `.ts` de esta carpeta están resueltos y comentados. Acá va el razonamiento y las respuestas a las preguntas.

---

## Ejercicio 1 · Singleton

**Las tres piezas, siempre:**
```ts
private static instancia: Logger | null = null;   // 1
private constructor() { ... }                       // 2
static obtenerInstancia(): Logger { ... }           // 3
```
- `moduloVentas()` y `moduloStock()` **no reciben** el logger, lo piden. Por eso al final hay 2 registros: los dos escribieron en el mismo objeto.
- `a === b` da `true` porque `===` entre objetos compara **referencias** (si son el mismo objeto en memoria).

**Respuestas**
- **(a)** `Constructor of class 'Logger' is private and only accessible within the class declaration.`
- **(b)** El segundo test **fallaría** si se ejecuta después del primero, porque el registro que dejó el primer test **sigue ahí** (es la misma instancia para todo el programa). Es la desventaja clásica: **el Singleton dificulta las pruebas unitarias**, porque el estado se comparte entre tests. Soluciones típicas: agregar un método para reiniciar el estado en los tests, o directamente recibir el logger por constructor (DIP) para poder pasar uno nuevo en cada test.

---

## Ejercicio 2 · Factory Method

- La fábrica concentra todos los `new`. El cliente (`avisarATodos`) solo conoce `Notificador` y `FabricaNotificadores`.
- El `switch` sobre una unión de literales **no necesita `default`**: TypeScript sabe que cubriste todos los casos. Si agregás `"telegram"` al tipo y te olvidás el `case`, `npx tsc` te avisa que la función puede no devolver nada.
- El SMS: `"Tu pedido fue despachado hoy"` tiene 28 caracteres → `slice(0, 20)` = `"Tu pedido fue despac"` + `"..."`.

**Respuesta:** `crear` devuelve `Notificador` (la **interface**). Si devolviera la unión de clases concretas, el cliente volvería a quedar **acoplado** a ellas, y cada clase nueva obligaría a cambiar la firma. La gracia del patrón es que el cliente dependa **solo de la abstracción**.

---

## Ejercicio 3 · Observer

Flujo del bloque de prueba:
1. Se suscriben **Ana, Beto y Auditoría** (en ese orden → ese es el orden de los avisos).
2. Ana oferta 120000 → válida → notifica a los 3.
3. Beto oferta 110000 → **no supera** 120000 → `RangeError`. **No se notifica** (la notificación está después del `throw`).
4. Se desuscribe Ana → `filter(x => x !== o)` la saca de la lista.
5. Beto oferta 150000 → notifica solo a Beto y a Auditoría.

**Respuestas**
- Ana no recibe el último aviso porque **ya no está en la lista** de observadores.
- No hubo que modificar `Subasta` para agregar `RegistroAuditoria`: solo se creó una clase nueva que implementa la interface. Eso es **OCP** (abierto a extensión, cerrado a modificación).
- `notificar` es **privado** porque es un detalle interno: los de afuera no deberían poder disparar avisos falsos.

---

## Ejercicio 4 · Adapter

| Rol | Clase |
|---|---|
| **Target** (lo que espera el cliente) | `ProcesadorPago` |
| **Adaptee** (lo viejo incompatible) | `PasarelaLegacy` |
| **Adapter** (traductor) | `AdaptadorPasarelaLegacy` |
| **Client** | `cobrarCarrito()` |

- El adaptador **traduce** tres cosas: nombres (`pagar` → `iniciarTransaccion` + `cobrarCentavos`), unidades (pesos → centavos) y tipo de respuesta (`boolean` → `string`).
- `Math.round(1234.5 * 100)` = 123450. Se usa `Math.round` porque multiplicar decimales puede dar cosas como `123449.99999`.
- `cobrarCarrito` recibe tanto `PagoTarjeta` como el adaptador **sin distinguirlos**: polimorfismo vía interface.

---

## Ejercicio 5 · Los cuatro patrones

| Patrón | Dónde | Cómo se nota |
|---|---|---|
| Singleton | `Configuracion` | `private constructor` + `obtenerInstancia()`; `total()` lee `costoEnvio` de ahí |
| Factory | `FabricaPlatos.crear` | `agregar()` nunca hace `new Pizza()` |
| Observer | `Pedido` + `ObservadorPedido` | `cambiarEstado` recorre la lista y llama `actualizar` |
| Adapter | `AdaptadorImpresora` | Implementa `ObservadorPedido` y **contiene** la `ImpresoraTickets` vieja |

**Cuenta del total:** 1 pizza (9000) + 6 empanadas (6 × 1200 = 7200) + envío (1500) = **17700**.

**Detalle interesante:** el **Adapter se usa para enchufar algo viejo a un Observer**. Es exactamente lo que pasa en el integrador de la Biblioteca con `ConsoleNotifierAdapter`.

**Errores típicos:**
- Escribir `+ 1500` en `total()` → la consigna dice "leído del Singleton".
- Que `Pedido` tenga un atributo `cocina: Cocina` → acoplamiento: el sujeto solo debe conocer la interface.
- Modificar `ImpresoraTickets` para que implemente `ObservadorPedido` → eso **no** es un adapter, y la consigna prohíbe modificarla.

---

➡️ Más práctica: [material-extra-del-curso/1er-cuatrimestre/tema-02-patrones-de-diseno](../../material-extra-del-curso/1er-cuatrimestre/tema-02-patrones-de-diseno/).
