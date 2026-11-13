# Práctica guiada · Tema 2 · Restaurante "La Esquina"

> **Modalidad:** proyecto de varios archivos, escrito por otra persona. **Funciona mal** y está mal diseñado. Tu trabajo: **diagnosticar** cada problema, decidir **qué patrón** lo resuelve, **aplicarlo a mano** y **documentarlo**.
> **Tiempo sugerido:** 90 minutos. Trabajá en `inicio/`. No abras `solucion/` hasta terminar.

## 1. Contexto

El restaurante toma pedidos de mesa y de delivery. Cada pedido tiene platos (pizza $9000, empanada $1200, ensalada $5500), se confirma (va a la cola de la cocina), cambia de estado y avisa a los interesados. Los pedidos de delivery se envían por una app externa.

## 2. Archivos

```
inicio/
├── modelos.ts         ← Plato (abstracta), Pizza, Empanada, Ensalada, TipoPlato   (está bien)
├── cocina.ts          ← Cocina (cola de pedidos)
├── observadores.ts    ← Mozo, PantallaCocina
├── fabrica-platos.ts  ← vacío
├── delivery.ts        ← ServicioDelivery (interfaz) + RappiLegacyAPI (API externa, NO se modifica)
├── pedido.ts          ← Pedido
└── main.ts            ← bloque de prueba
```

Ejecutar (desde `1er-cuatrimestre/`): `node tema-02-patrones-de-diseno/09-practica-guiada-readme/inicio/main.ts`

## 3. Salida actual (con errores)

```
#1 Mesa 4: 1x Pizza muzzarella, 6x Empanada de carne = $16200 (~20 min)
  [Mozo Juan] Pedido #1 (Mesa 4): confirmado
  [Pantalla] NUEVO #1
#2 Delivery Ana: 2x Ensalada mixta = $11000 (~5 min)
  [Mozo Juan] Pedido #2 (Delivery Ana): confirmado      ← ¿un mozo para un delivery?
  [Pantalla] NUEVO #2
Pendientes en cocina: 0                                  ← ¡se confirmaron 2!
Despachado: undefined                                    ← no hay nada para despachar
  [Mozo Juan] Pedido #1 (Mesa 4): listo
No se puede confirmar un pedido vacío
Pendientes en cocina: 0
```

## 4. Requisitos

| # | Requisito |
|---|---|
| **R1** | Hay **una sola cocina**: todos los pedidos confirmados van a la **misma** cola, y cualquiera que la consulte ve la misma. |
| **R2** | Los platos se crean **en un único lugar** a partir de su tipo (`"pizza" \| "empanada" \| "ensalada"`). Fuera de ese lugar no puede haber `new Pizza()` ni similares. `Pedido.agregar` recibe el **tipo**, no un `Plato`. |
| **R3** | Cuando un pedido cambia de estado, avisa a **quienes estén suscriptos a ese pedido**, sin conocer sus clases. Cada pedido decide quién lo escucha (`suscribir`). El mozo y la pantalla son interesados posibles, no fijos. |
| **R4** | Debe poder agregarse un interesado nuevo, `ClienteApp(cliente)` que imprime `"  [App de <cliente>] Tu pedido está <estado>"`, **sin modificar `pedido.ts`**. |
| **R5** | Los pedidos de delivery se envían con `RappiLegacyAPI`, que **no se puede modificar**. Su método `createShipment("id;direccion;centavos")` devuelve el número de seguimiento o `-1`. Nuestro sistema debe usarla a través de `ServicioDelivery`, que devuelve `"RAPPI-<numero>"`. Si la API devuelve `-1`: `Error("El servicio de delivery rechazó el envío")`. |
| **R6** | `Pedido.enviarPorDelivery(servicio, direccion)` envía el pedido, cambia su estado a `"en camino (<seguimiento>)"` (lo que notifica) y devuelve el seguimiento. |

## 5. Consigna

### Tarea 1 · Diagnóstico (`DIAGNOSTICO.md`)
Para cada uno de estos síntomas, explicá **la causa en el código** (archivo y línea) y **qué patrón** la resuelve:
1. "Pendientes en cocina: 0" y "Despachado: undefined".
2. `main.ts` tiene `new Pizza()`, `new Empanada()`. Además, `mesa.agregar(new Empanada(), 6)` mete **el mismo objeto** 6 veces en el arreglo (¿por qué puede ser un problema?).
3. El pedido de delivery le avisa al mozo Juan.
4. No hay forma de usar `RappiLegacyAPI` desde `Pedido`.

### Tarea 2 · Singleton en `cocina.ts` (R1)
### Tarea 3 · Factory en `fabrica-platos.ts` (R2) y adaptar `Pedido.agregar` y `main.ts`
### Tarea 4 · Observer (R3 y R4)
- Interfaz `ObservadorPedido` con `pedidoActualizado(evento)`; el evento es `{ pedido, destino, estado }`.
- `Mozo` y `PantallaCocina` la implementan (conservando lo que imprimen). Agregá `ClienteApp`.
- `Pedido` guarda la lista, tiene `suscribir(o)` y notifica en `cambiarEstado`.
### Tarea 5 · Adapter en `delivery.ts` (R5) y `enviarPorDelivery` (R6)
### Tarea 6 · `PATRONES.md`
Igual que el `PATTERNS.md` del integrador: para cada patrón, (1) ruta del archivo, (2) qué problema resuelve **en este proyecto** en 2 o 3 oraciones, (3) un fragmento breve de código.

### `main.ts` final
Tiene que quedar así de comportamiento: el pedido de mesa con suscriptores `Mozo("Juan")` y `PantallaCocina`; el de delivery con `ClienteApp("Ana")` y `PantallaCocina`; se usan tipos (`"pizza"`, `"empanada"`, `"ensalada"`) para agregar platos; la cocina se obtiene con el Singleton; se envía el delivery a `"Av. Mate de Luna 1234"` y se prueba una dirección vacía (`"   "`).

## 6. Salida esperada

```
#1 Mesa 4: 1x Pizza muzzarella, 6x Empanada de carne = $16200 (~20 min)
  [Mozo Juan] Pedido #1 (Mesa 4): confirmado
  [Pantalla] NUEVO #1
#2 Delivery Ana: 2x Ensalada mixta = $11000 (~5 min)
  [App de Ana] Tu pedido está confirmado
  [Pantalla] NUEVO #2
Pendientes en cocina: 2
Despachado: #1 Mesa 4
  [Mozo Juan] Pedido #1 (Mesa 4): listo
  [App de Ana] Tu pedido está en camino (RAPPI-7001)
Seguimiento: RAPPI-7001
No se puede confirmar un pedido vacío
El servicio de delivery rechazó el envío
Pendientes en cocina: 1
```

## 7. Checklist

- [ ] `npx tsc` sin errores y salida idéntica.
- [ ] `grep -n "new Cocina" inicio/` → solo dentro de `cocina.ts`.
- [ ] `grep -n "new Pizza\|new Empanada\|new Ensalada" inicio/` → solo dentro de `fabrica-platos.ts`.
- [ ] `pedido.ts` no importa `Mozo` ni `PantallaCocina`.
- [ ] `RappiLegacyAPI` sin cambios.
- [ ] Agregar `ClienteApp` no tocó `pedido.ts`.
- [ ] Sin `any`, `enum`, parameter properties.
- [ ] `DIAGNOSTICO.md` y `PATRONES.md`.

## 8. Commits sugeridos

```
chore: código original del restaurante
docs: diagnóstico de problemas
refactor(cocina): Singleton
refactor(platos): Factory de platos
refactor(pedido): Observer para notificaciones
feat(delivery): adapter para la API de Rappi
docs: PATRONES.md
```
