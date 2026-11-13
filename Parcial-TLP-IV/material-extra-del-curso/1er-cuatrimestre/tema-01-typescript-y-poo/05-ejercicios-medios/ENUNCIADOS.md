# Tema 1 · Ejercicios medios (sin pistas)

En este nivel cada `.ts` trae el **esqueleto**: nombres de clases y firmas de métodos con el cuerpo `throw new Error("TODO")`. Vos agregás los **atributos**, completás los **constructores** y los **métodos**. El bloque de prueba ya está activo: al principio va a fallar con `TODO`.
Al terminar, la salida tiene que coincidir **exactamente** con la esperada, y `npx tsc` no puede dar errores.

---

## M1 · Carrito de compras (`m1-carrito.ts`)

- `Producto` (interface, ya dada): `codigo` (no se puede reasignar), `nombre`, `precio`.
- `Cupon` (ya dado): solo `"DESC10"` o `"DESC20"`.
- `ItemCarrito`: un producto + una cantidad; `subtotal` se lee sin paréntesis.
- `Carrito`:
  - `agregar(producto, cantidad)`: la cantidad debe ser entera y mayor a 0 (`Error("Cantidad inválida")`). Si el producto ya está en el carrito, **suma** la cantidad al ítem existente.
  - `quitar(codigo)`: elimina el ítem completo. Si no existe: `Error("No existe el producto <codigo>")`.
  - `total` y `cantidadDeItems` (suma de cantidades), ambos sin paréntesis.
  - `aplicarCupon(cupon)`: DESC10 = 10 %, DESC20 = 20 %. DESC20 solo si el total es de al menos $10000; si no: `Error("DESC20 requiere un total de al menos $10000")`.
  - `totalConDescuento` sin paréntesis.
  - `listar(): string[]` con el formato `"Yerba x3 = $9000"`. Nadie de afuera puede modificar los ítems del carrito.

Salida esperada:
```
[ 'Yerba x3 = $9000', 'Café x1 = $5000' ]
4 14000
11200
9000 7200
No existe el producto ZZ
Cantidad inválida
DESC20 requiere un total de al menos $10000
```

---

## M2 · Figuras geométricas (`m2-figuras.ts`)

- `Figura` **no** se puede instanciar. Tiene `nombre` (no reasignable), y obliga a sus hijas a implementar `area()` y `perimetro()`.
- `describir()` se escribe **una sola vez** en `Figura`: `"Círculo: área 3.14, perímetro 6.28"` (dos decimales con `toFixed(2)`).
- `Circulo(radio)`, `Rectangulo(ancho, alto)`, `Triangulo(a, b, c)`. Toda medida debe ser mayor a 0 (`Error("Medida inválida")`). El triángulo además valida que cada lado sea menor que la suma de los otros dos (`Error("Los lados no forman un triángulo")`). Área del triángulo: fórmula de Herón (`s = perímetro / 2`, `área = √(s(s−a)(s−b)(s−c))`).
- `figuraMayorArea(figuras)`: devuelve la figura de mayor área; si el arreglo está vacío, `Error("No hay figuras")`. **Sin preguntar el tipo de figura.**
- `areaTotal(figuras)`.

Salida esperada:
```
Círculo: área 3.14, perímetro 6.28
Rectángulo: área 12.00, perímetro 14.00
Triángulo: área 6.00, perímetro 12.00
Mayor área: Rectángulo
Área total: 21.14
Los lados no forman un triángulo
No hay figuras
```

---

## M3 · Socios de biblioteca (`m3-socios.ts`)

- `Socio` (no instanciable): `numero` (no reasignable), `nombre` y la lista de títulos prestados (solo la modifica la propia clase).
- Cada tipo de socio **debe** definir `limitePrestamos()`: Común 2, Premium 5, Estudiante 3.
- `diasDePrestamo()` vale 7 por defecto; Premium tiene 14 y Estudiante 10.
- `prestar(titulo)`: si alcanzó el límite → `Error("<nombre> alcanzó su límite de <n> préstamos")`; si ya tiene ese título → `Error('<nombre> ya tiene "<titulo>"')`.
- `devolver(titulo)`: si no lo tiene → `Error('<nombre> no tiene "<titulo>"')`.
- `cantidadPrestamos` (sin paréntesis) y `resumen()`: `"#1 Ana: 1/2 préstamos, 7 días"`.

Salida esperada:
```
Ana alcanzó su límite de 2 préstamos
Beto ya tiene "Rayuela"
Caro no tiene "Martín Fierro"
#1 Ana: 1/2 préstamos, 7 días
#2 Beto: 1/5 préstamos, 14 días
#3 Caro: 0/3 préstamos, 10 días
```

---

## M4 · Varias interfaces (`m4-interfaces.ts`)

Interfaces (ya dadas): `Identificable` (`id` no reasignable), `Notificable` (`notificar(mensaje): string`), `Facturable` (`montoMensual(): number`).

- `ClienteParticular(id, nombre, email, plan)` es identificable, notificable y facturable. Notifica por email (`"Email a <email>: <mensaje>"`). Plan `"basico"` = $5000, `"full"` = $9000.
- `ClienteEmpresa(id, razonSocial, telefono, empleados)` es identificable, notificable y facturable. Notifica por SMS (`"SMS a <telefono>: <mensaje>"`). Paga $2000 por empleado.
- `Proveedor(id, nombre, email)` es identificable y notificable, pero **no** facturable.
- `avisarATodos(destinatarios, mensaje): string[]`, `facturacionTotal(clientes): number`.
- `buscarPorId(lista, id)`: tiene que servir para una lista de cualquier tipo identificable y devolver **el mismo tipo** que contiene la lista (o `undefined`). Pista de TypeScript: genéricos `<T extends ...>`.
- Tiene que ser **imposible** (error de compilación) pasarle un `Proveedor` a `facturacionTotal`.

Salida esperada:
```
Email a ana@mail.com: Mañana no hay servicio
SMS a 381-555: Mañana no hay servicio
Email a ventas@norte.com: Mañana no hay servicio
Facturación: $29000
20000
true
```
