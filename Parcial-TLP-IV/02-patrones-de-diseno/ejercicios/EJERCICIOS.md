# Ejercicios · Tema 02 · Patrones de diseño

**Cómo trabajar:** igual que en el tema 01. Escribí el código en el `.ts` de esta carpeta, descomentá el bloque de prueba, ejecutá con `node 02-patrones-de-diseno/ejercicios/<archivo>.ts`, verificá con `npx tsc` y compará la salida.

| # | Ejercicio | Patrón | Dificultad |
|---|---|---|---|
| 1 | Logger | Singleton | ⭐ |
| 2 | Notificaciones | Factory Method | ⭐ |
| 3 | Subasta | Observer | ⭐⭐ |
| 4 | Pasarela de pagos vieja | Adapter | ⭐⭐ |
| 5 | Restaurante | Los cuatro juntos | ⭐⭐⭐ tipo parcial |

---

## Ejercicio 1 · Singleton: Logger ⭐

Archivo: `ej1-singleton-logger.ts`

En una aplicación, distintos módulos registran mensajes y **todos deben escribir en el mismo registro**.

1. Tipo `Nivel` = `"INFO"` | `"ERROR"`.
2. Clase `Logger` como **Singleton** (las tres piezas):
   - atributo estático privado `instancia`,
   - constructor privado (inicializa un arreglo privado `registros`),
   - método estático `obtenerInstancia()`.
3. Método `registrar(nivel, mensaje)` que guarda el texto `[NIVEL] mensaje`.
4. Getter `cantidad` y método `obtenerRegistros()` (copia defensiva).
5. Dos funciones `moduloVentas()` y `moduloStock()` que **no reciben el logger por parámetro**: lo obtienen con `Logger.obtenerInstancia()`. Ventas registra `INFO` "Venta registrada"; Stock registra `ERROR` "Stock insuficiente".

**Salida esperada:**
```
¿Es la misma instancia? true
Registros: 2
[INFO] Venta registrada
[ERROR] Stock insuficiente
```

**Para pensar:** (a) ¿qué error da `npx tsc` si escribís `new Logger()` afuera de la clase? (b) Si tuvieras dos tests, uno que registra 1 mensaje y otro que verifica `cantidad === 0`, ¿qué pasaría? ¿Qué desventaja del Singleton muestra eso?

---

## Ejercicio 2 · Factory Method: notificaciones ⭐

Archivo: `ej2-factory-notificaciones.ts`

1. Interface `Notificador` con `enviar(destino: string, mensaje: string): string`.
2. Tres clases que la implementan:
   - `NotificadorEmail` → `📧 Email a <destino>: <mensaje>`
   - `NotificadorSMS` → `📱 SMS a <destino>: <mensaje>`, pero si el mensaje tiene **más de 20** caracteres se recorta a los primeros 20 y se le agrega `...`.
   - `NotificadorWhatsApp` → `💬 WhatsApp a <destino>: <mensaje>`
3. Tipo `Canal` = `"email"` | `"sms"` | `"whatsapp"`.
4. Clase `FabricaNotificadores` con un método **estático** `crear(canal: Canal): Notificador`. Es el **único** lugar del archivo donde se hace `new` de los notificadores.
5. Función `avisarATodos(canales, destino, mensaje)` que, para cada canal, pide un notificador a la fábrica y muestra lo que devuelve `enviar`.

**Salida esperada:**
```
📧 Email a Ana: Tu pedido fue despachado hoy
📱 SMS a Ana: Tu pedido fue despac...
💬 WhatsApp a Ana: Tu pedido fue despachado hoy
```

**Para pensar:** ¿qué tipo de retorno tiene `crear`? ¿Por qué **no** debería ser `NotificadorEmail | NotificadorSMS | NotificadorWhatsApp`?

---

## Ejercicio 3 · Observer: subasta ⭐⭐

Archivo: `ej3-observer-subasta.ts`

1. Interface `ObservadorSubasta` con `actualizar(producto: string, monto: number, postor: string): void`.
2. Clase `Subasta` (el **sujeto**):
   - constructor `(producto, precioBase)`; la mejor oferta arranca en el precio base;
   - `suscribir(o)`, `desuscribir(o)` y un `notificar` **privado**;
   - `ofertar(postor, monto)`: si el monto **no supera** la mejor oferta → `RangeError("La oferta debe superar $<mejorOferta>")`. Si es válida, actualiza y **notifica**.
3. Observador `Participante(nombre)`:
   - si el postor es él mismo → `[Ana] Vas ganando Guitarra con $120000`
   - si no → `[Beto] Ana ofertó $120000 por Guitarra`
4. Observador `RegistroAuditoria` que cuenta los eventos: `[Auditoría #1] Guitarra: Ana → $120000`

**Bloque de prueba (ya está en el archivo):** se suscriben Ana, Beto y la auditoría; Ana oferta 120000; Beto intenta 110000 (falla); se **desuscribe Ana**; Beto oferta 150000.

**Salida esperada:**
```
[Ana] Vas ganando Guitarra con $120000
[Beto] Ana ofertó $120000 por Guitarra
[Auditoría #1] Guitarra: Ana → $120000
Error: La oferta debe superar $120000
[Beto] Vas ganando Guitarra con $150000
[Auditoría #2] Guitarra: Beto → $150000
```

**Para pensar:** ¿por qué Ana no recibe el último aviso? ¿Hubo que modificar `Subasta` para agregar `RegistroAuditoria`? ¿Qué principio SOLID cumple eso?

---

## Ejercicio 4 · Adapter: pasarela de pagos vieja ⭐⭐

Archivo: `ej4-adapter-pagos.ts`

Nuestro sistema cobra con la interface:
```ts
interface ProcesadorPago {
  pagar(montoEnPesos: number): string;
}
```

1. `PagoTarjeta implements ProcesadorPago` → `Tarjeta: cobrados $1234.50` (dos decimales).
2. Te dan esta clase vieja que **NO podés modificar** (copiala tal cual):
   ```ts
   class PasarelaLegacy {
     iniciarTransaccion(): number { return 4521; }
     cobrarCentavos(transaccion: number, centavos: number): boolean {
       return centavos > 0 && transaccion > 0;
     }
   }
   ```
3. Creá `AdaptadorPasarelaLegacy implements ProcesadorPago` que **contenga** una `PasarelaLegacy` (recibida por constructor) y en `pagar`:
   - inicie una transacción,
   - convierta pesos a centavos (`Math.round(monto * 100)`),
   - cobre, y devuelva `Legacy #4521: cobrados 123450 centavos` o `Legacy #4521: pago rechazado`.
4. Función `cobrarCarrito(procesador: ProcesadorPago, total: number)` que muestre el resultado.

**Salida esperada:**
```
Tarjeta: cobrados $1234.50
Legacy #4521: cobrados 123450 centavos
Legacy #4521: pago rechazado
```

**Para pensar:** identificá **Target, Adaptee, Adapter y Client** en tu código.

---

## Ejercicio 5 · Restaurante con los cuatro patrones ⭐⭐⭐ (tipo parcial)

Archivo: `ej5-pedidos-cuatro-patrones.ts` · Tiempo sugerido: **35 minutos**

1. **Singleton** `Configuracion` con un atributo `readonly costoEnvio = 1500`.
2. **Factory**: interface `Plato { nombre: string; precio(): number }`, clases `Pizza` ($9000), `Empanada` ($1200), `Milanesa` ($7500), tipo `TipoPlato` y `FabricaPlatos.crear(tipo)`.
3. **Observer**:
   - tipo `EstadoPedido` = `"recibido"` | `"en cocina"` | `"enviado"`;
   - interface `ObservadorPedido { actualizar(numero: number, estado: EstadoPedido): void }`;
   - clase `Pedido` con un número autoincremental (**static**), lista de platos, estado, observadores; métodos `agregar(tipo, cantidad)` (**usa la fábrica**), `total()` (suma los platos + el costo de envío **leído del Singleton**, no escrito a mano), `suscribir(o)` y `cambiarEstado(estado)` (notifica).
   - `Cocina`: solo muestra algo cuando el estado es `"en cocina"`: `[Cocina] Preparando pedido #1`.
   - `ClienteApp`: `[App] Tu pedido #1 está: <estado>`.
4. **Adapter**: te dan una clase vieja que no se puede modificar:
   ```ts
   class ImpresoraTickets {
     imprimirLinea(texto: string): void {
       console.log(`🖨  ${texto.toUpperCase()}`);
     }
   }
   ```
   Hacé que la impresora reciba los cambios de estado como un observador más, con un `AdaptadorImpresora` que imprima `pedido <numero> - <estado>`.

**Salida esperada:**
```
Total del pedido #1: $17700
[Cocina] Preparando pedido #1
[App] Tu pedido #1 está: en cocina
🖨  PEDIDO 1 - EN COCINA
[App] Tu pedido #1 está: enviado
🖨  PEDIDO 1 - ENVIADO
```

**Checklist:**
- [ ] En todo el archivo, `new Pizza()` / `new Empanada()` / `new Milanesa()` aparecen **solo** dentro de la fábrica.
- [ ] `1500` aparece **solo** en `Configuracion`.
- [ ] `Pedido` no conoce a `Cocina`, `ClienteApp` ni a la impresora: solo a `ObservadorPedido`.
- [ ] `ImpresoraTickets` no fue modificada.
