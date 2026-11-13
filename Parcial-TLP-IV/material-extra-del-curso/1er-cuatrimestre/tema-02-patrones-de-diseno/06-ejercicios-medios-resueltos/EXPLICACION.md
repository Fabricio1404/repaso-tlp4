# Tema 2 · Ejercicios medios: resolución explicada

## M1 · Singleton + Factory
- **Por qué el generador es Singleton:** si hubiera dos generadores, los dos empezarían en 0 y se repetirían ids. La consigna dice "la numeración es una sola".
- **El id lo asigna el constructor de `Usuario`**, pidiéndolo al Singleton. Así es imposible crear un usuario sin id o con un id inventado.
- **`protected abstract prefijo()`:** cada rol aporta su prefijo, pero "no debe poder consultarse desde afuera" → `protected`.
- **Cuidado (detalle avanzado):** el constructor de `Usuario` llama a `this.prefijo()`, que está implementado en la hija. Funciona porque `prefijo()` devuelve una constante. Si dependiera de un atributo de la hija, ese atributo **todavía no estaría inicializado** (la hija lo asigna después de `super`). Regla: no llames desde el constructor del padre a métodos de la hija que usen atributos de la hija.
- **`padStart(3, "0")`** rellena con ceros a la izquierda: `"1"` → `"001"`.
- **Factory:** `FabricaUsuarios.crear` es el único lugar con `new Admin/Cliente/Invitado`. Además centraliza la validación del nombre (otra ventaja: la regla de creación está en un solo lugar).
- `Próximo id: TEST-005` demuestra que es **el mismo** generador: siguió desde 4.

## M2 · Observer: subasta
- **Notificación con un objeto evento** (`EventoOferta`) en vez de varios parámetros: si mañana hace falta la hora de la oferta, se agrega un campo y la firma de `nuevaOferta` no cambia.
- **Primero se actualiza el estado y después se notifica.** Así, si un observador consultara la subasta, ya vería la oferta nueva.
- **Tres observadores muy distintos** (uno filtra, uno imprime, uno acumula) con el mismo contrato. La subasta no sabe nada de ninguno.
- **`desuscribir(pantalla)`:** la tercera oferta ya no aparece en pantalla, pero sí en la auditoría (3 ofertas) y le llega a Beto.
- **Validaciones antes de notificar:** la oferta inválida de $60000 lanza error y **nadie** es notificado.
- **Desventaja del patrón a la vista:** el orden de la salida depende del orden de suscripción. Si un observador lanzara un error, los siguientes no se enterarían.

## M3 · Adapter: pagos
- **Target:** `ProcesadorPago`. **Adaptees:** `MercadoPagoSDK` y `PayPalLegacy`. **Adapters:** uno por SDK.
- **Un adapter puede traducir mucho más que un nombre de método:** `MercadoPagoAdapter` traduce el formato de entrada (`{ amount, title }`) y el de salida (`status` → `aprobado`). `PayPalAdapter` además **convierte la moneda** y **parsea** el texto `"OK:..."`.
- `PayPalAdapter` recibe la cotización por constructor: no la inventa adentro (la decisión es de quien lo crea).
- **El cliente (`checkout`) no cambia** si mañana se agrega `StripeAdapter`. Mezcla dos pasarelas en `ProcesadorPago[]` (polimorfismo).
- Composición: cada adapter **tiene** su SDK (`private sdk`), no lo hereda.
