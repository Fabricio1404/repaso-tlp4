# Tema 4 · Integradores fáciles: resolución explicada

## F1 · POO + Singleton
- **POO:** `Material` abstracta con `diasDePrestamo()` y `tipo()` abstractos; `describir()` concreto que los usa (polimorfismo dentro del padre).
- **Singleton:** "único para toda la escuela" + "la función no recibe el registro: lo obtiene ella" → `RegistroPrestamos.obtenerInstancia()`. Las tres aulas ven el mismo registro, por eso detecta que Rayuela ya estaba prestada desde otra aula.
- **Combinación:** el Singleton guarda objetos polimórficos (`Material[]`) sin saber si son libros o revistas.

## F2 · POO + OCP
- **OCP:** la categoría es un objeto con su alícuota. `Producto.iva` multiplica por `categoria.alicuota()` sin preguntar cuál es. `Medicamentos` se agregó sin tocar nada.
- **Composición en vez de herencia:** no hace falta `ProductoAlimento extends Producto`. Un producto **tiene** una categoría. Si la categoría fuera una subclase, un producto no podría cambiar de categoría y habría una clase por combinación.
- **Encapsulamiento:** el precio con setter validado (y el constructor pasa por el setter).
- `Math.round` porque 3000 × 0,105 = 315 exacto, pero otros precios darían decimales.

## F3 · Factory + DIP
- **DIP:** `ServicioAlertas` depende de `Notificador` (interfaz) y lo recibe por constructor.
- **Factory:** convierte un dato de configuración (`"sms"`) en un objeto. Es la forma típica de decidir **qué implementación inyectar** sin llenar el código de `if`.
- **Factory + DIP son complementarios:** DIP dice "recibí la abstracción desde afuera"; la Factory es **quien la crea** afuera. En el integrador pasa lo mismo: `NotifierFactory` + `NotificationService`.
- `substring(0, 30)` corta el mensaje para el SMS; es un detalle de **ese** canal y por eso vive en `NotificadorSms`, no en el servicio.
