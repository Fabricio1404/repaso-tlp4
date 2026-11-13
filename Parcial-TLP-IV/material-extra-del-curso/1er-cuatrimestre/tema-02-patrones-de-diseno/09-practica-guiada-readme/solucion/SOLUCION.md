# Solución · Práctica guiada Tema 2 · Restaurante

## Tarea 1 · Diagnóstico

| Síntoma | Causa (en `inicio/`) | Patrón |
|---|---|---|
| "Pendientes en cocina: 0", "Despachado: undefined" | `pedido.ts` → `confirmar()` hace `const cocina = new Cocina()`: **cada confirmación crea una cocina nueva** y encola ahí. `main.ts` hace otro `new Cocina()` (vacía) para consultar. Hay 3 cocinas distintas. | **Singleton** |
| `new Pizza()` en `main.ts` y mismo objeto 6 veces | Los `new` de los platos están repartidos en el código cliente. `agregar(new Empanada(), 6)` hace 6 `push` del **mismo** objeto: si un plato tuviera estado (por ejemplo, "servido"), marcar uno los marcaría a todos. | **Factory** (crea un objeto nuevo por unidad y centraliza los `new`) |
| El delivery avisa al mozo | `Pedido` crea **fijo** `this.mozo = new Mozo("Juan")` y `this.pantalla = new PantallaCocina()` y los llama directo en `cambiarEstado`. No se puede elegir quién escucha; agregar un interesado obliga a modificar `Pedido`. | **Observer** |
| No se puede usar `RappiLegacyAPI` | La API tiene otra interfaz (`createShipment(payload)`, centavos, `-1`) que la que espera el sistema (`ServicioDelivery.enviar(pedido, direccion, total)`). | **Adapter** |

## Tareas 2 a 5 (ver archivos)

- **`cocina.ts`**: `private static instancia`, `private constructor`, `static obtenerInstancia()`. En `pedido.ts` → `Cocina.obtenerInstancia().encolar(...)` y en `main.ts` → `Cocina.obtenerInstancia()`.
- **`fabrica-platos.ts`**: `FabricaPlatos.crear(tipo): Plato` con `switch`. `Pedido.agregar(tipo, cantidad)` llama a la fábrica **una vez por unidad** (6 empanadas = 6 objetos).
- **`observadores.ts`**: interfaz `ObservadorPedido` + evento `EventoPedido`. `Mozo` y `PantallaCocina` la implementan. `ClienteApp` se agregó **sin tocar `pedido.ts`** (OCP).
- **`pedido.ts`**: `private observadores: ObservadorPedido[]`, `suscribir`, `notificar` privado. Ya no importa `Mozo` ni `PantallaCocina` (solo **tipos** de `observadores.ts`, con `import type`).
- **`delivery.ts`**: `RappiAdapter implements ServicioDelivery`, contiene `RappiLegacyAPI`, arma `"id;direccion;centavos"` (pesos × 100) y traduce `-1` a un error y el número a `"RAPPI-<n>"`.
- **`enviarPorDelivery`** recibe un `ServicioDelivery` (interfaz). No sabe nada del formato de Rappi.

## Tarea 6 · `PATRONES.md` (modelo)

### Singleton
1. `cocina.ts`
2. El restaurante tiene una sola cocina con una sola cola. Antes, cada `new Cocina()` creaba una cola vacía y los pedidos confirmados "se perdían". Con el Singleton, todos encolan y consultan la misma instancia.
3. ```ts
   private constructor() { this.cola = []; }
   static obtenerInstancia(): Cocina {
     if (Cocina.instancia === undefined) Cocina.instancia = new Cocina();
     return Cocina.instancia;
   }
   ```

### Factory
1. `fabrica-platos.ts`
2. Centraliza la creación de platos: el pedido pide `"empanada"` y la fábrica decide la clase. Agregar un plato nuevo es una clase y un `case`, sin tocar `Pedido` ni `main`.
3. ```ts
   static crear(tipo: TipoPlato): Plato { switch (tipo) { case "pizza": return new Pizza(); /* ... */ } }
   ```

### Observer
1. `observadores.ts` (interfaz y observadores) y `pedido.ts` (sujeto).
2. El pedido avisa a quien se haya suscripto sin conocer su clase. El delivery ya no le avisa al mozo, y la app del cliente se agregó sin modificar `Pedido`.
3. ```ts
   private notificar(): void {
     for (const o of this.observadores) o.pedidoActualizado({ pedido: this.numero, destino: this.destino, estado: this.estado });
   }
   ```

### Adapter
1. `delivery.ts`
2. La API de Rappi es externa y vieja (texto con `;`, centavos y `-1`). El adapter la presenta como `ServicioDelivery` para que `Pedido` la use sin conocer su formato.
3. ```ts
   enviar(pedido: number, direccion: string, totalPesos: number): string {
     const t = this.api.createShipment(`${pedido};${direccion};${Math.round(totalPesos * 100)}`);
     if (t === -1) throw new Error("El servicio de delivery rechazó el envío");
     return `RAPPI-${t}`;
   }
   ```

## Detalles que suman puntos

- `Pedido` depende de **interfaces** (`ObservadorPedido`, `ServicioDelivery`), no de clases concretas → anticipo de **DIP**.
- `Cocina.despachar()` usa `shift()` (saca el primero: cola FIFO) y devuelve `string | undefined`.
- `"Pendientes en cocina: 1"` al final: se confirmaron 2 y se despachó 1.
- El segundo envío (dirección vacía) falla en el adapter **antes** de cambiar el estado: el pedido sigue "en camino (RAPPI-7001)" y nadie recibe una notificación falsa.
