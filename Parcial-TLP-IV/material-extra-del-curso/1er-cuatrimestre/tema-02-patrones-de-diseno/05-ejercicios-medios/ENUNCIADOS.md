# Tema 2 · Ejercicios medios (sin pistas)

---

## M1 · Singleton + Factory: alta de usuarios (`m1-singleton-factory-usuarios.ts`)

- `GeneradorDeIds` es **único** en toda la aplicación. `siguiente(prefijo)` devuelve `"<prefijo>-<n>"` con `n` de 3 dígitos rellenado con ceros (`ADM-001`, `CLI-002`...). La numeración es **una sola** para todos los prefijos.
- `Usuario` no se puede instanciar directamente. Tiene `id` y `nombre` (no reasignables). **El id se asigna solo, al crear el usuario**, pidiéndoselo al generador, con el prefijo que corresponde a cada rol (ADM, CLI, INV). El prefijo no debe poder consultarse desde afuera.
- Cada rol **debe** definir `permisos(): string[]`: admin `leer, escribir, borrar, administrar`; cliente `leer, escribir`; invitado `leer`.
- `puede(permiso): boolean` y `describir()` → `"ADM-001 Ana [leer, escribir, borrar, administrar]"`.
- `FabricaUsuarios.crear(rol, nombre)` es el **único** lugar donde se hace `new` de un usuario. Recorta espacios del nombre; si queda vacío: `Error("El nombre es obligatorio")`.

Salida esperada:
```
ADM-001 Ana [leer, escribir, borrar, administrar]
CLI-002 Beto [leer, escribir]
INV-003 Caro [leer]
CLI-004 Dani [leer, escribir]
¿Beto puede borrar? false
¿Ana puede borrar? true
El nombre es obligatorio
Próximo id: TEST-005
```

---

## M2 · Observer: subasta (`m2-observer-subasta.ts`)

Dados `EventoOferta` y `ObservadorSubasta`:
- `Subasta(articulo, precioBase)`: `suscribir`, `desuscribir`, `ofertar(postor, monto)` y `cerrar(): string`.
  - La oferta debe superar la mejor actual (al inicio, el precio base): `Error("La oferta debe superar $<mejor>")`.
  - Con la subasta cerrada: `Error("La subasta está cerrada")`.
  - Cada oferta válida notifica a todos con un `EventoOferta` (incluye el monto anterior).
  - `cerrar()` → `"<articulo>: adjudicado a <postor> por $<monto>"` o `"<articulo>: sin ofertas"`.
- Observadores:
  - `Postor(nombre)`: avisa `"  (<nombre>) Te superaron: <otro> ofreció $<monto>"` **solo si la oferta es de otro** (fijate los 2 espacios iniciales).
  - `PantallaSala`: `"[PANTALLA] <articulo>: $<anterior> → $<monto> (<postor>)"`.
  - `Auditoria`: no imprime; guarda los eventos. `totalOfertas` (sin paréntesis) y `mayorSalto()` (mayor diferencia entre monto y anterior).

Salida esperada:
```
[PANTALLA] Guitarra criolla: $50000 → $55000 (Ana)
  (Beto) Te superaron: Ana ofreció $55000
[PANTALLA] Guitarra criolla: $55000 → $60000 (Beto)
  (Ana) Te superaron: Beto ofreció $60000
La oferta debe superar $60000
  (Beto) Te superaron: Ana ofreció $80000
Guitarra criolla: adjudicado a Ana por $80000
Ofertas registradas: 3, mayor salto: $20000
La subasta está cerrada
```

---

## M3 · Adapter: pasarelas de pago (`m3-adapter-pagos.ts`)

Nuestro checkout trabaja con `ProcesadorPago` (`nombre`, `pagar(montoPesos, descripcion): ResultadoPago`). Hay dos SDKs externos que **no se pueden modificar**:
- `MercadoPagoSDK.crearCobro({ amount, title })` → `{ status: "approved" | "rejected", id }`.
- `PayPalLegacy.makePayment(usdCents)` → `"OK:<codigo>"` o `"FAIL"`. Trabaja en **centavos de dólar**.

Hacé:
- `MercadoPagoAdapter`: comprobante `"MP-<id>"`.
- `PayPalAdapter(legacy, cotizacion)`: convierte pesos a centavos de dólar (`Math.round(pesos / cotizacion * 100)`); el comprobante es lo que viene después de `"OK:"`.
- `checkout(procesador, monto, descripcion): string`: monto ≤ 0 → `Error("Monto inválido")`. Devuelve `"✔ <nombre>: $<monto> aprobado (<comprobante>)"` o `"✘ <nombre>: $<monto> rechazado"`. No puede saber nada de cada SDK.

Salida esperada:
```
✔ MercadoPago: $25000 aprobado (MP-1001)
✘ MercadoPago: $2000000 rechazado
✔ PayPal: $25000 aprobado (PP2500)
✘ PayPal: $2000000 rechazado
Monto inválido
```
