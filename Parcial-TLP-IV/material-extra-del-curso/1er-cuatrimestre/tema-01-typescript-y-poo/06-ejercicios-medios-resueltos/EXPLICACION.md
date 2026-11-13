# Tema 1 · Ejercicios medios: resolución explicada

---

## M1 · Carrito

**Conceptos:** composición, agregación, copia defensiva, unión de literales, delegación, validación.

1. **Composición vs. agregación.** El `Carrito` **crea** los `ItemCarrito` (`new ItemCarrito(...)` está adentro de `agregar`). Nadie de afuera los ve ni los crea: composición. El `Producto` en cambio viene de afuera y existe aunque no haya carrito: agregación.
2. **Buscar antes de agregar.** `find` devuelve el ítem existente o `undefined`. Si existe, se suma la cantidad; si no, se crea el ítem. Error típico: hacer `push` siempre y terminar con dos ítems "Yerba".
3. **`findIndex` + `splice`** para quitar: `findIndex` devuelve `-1` si no lo encuentra. Es la señal para lanzar el error.
4. **Delegación.** `total` no multiplica precio × cantidad: le pide `subtotal` a cada ítem. Cada clase sabe hacer lo suyo (anticipo de SRP).
5. **`reduce`:** `items.reduce((acc, i) => acc + i.subtotal, 0)`. El `0` es el valor inicial del acumulador. Sin él, con el carrito vacío, `reduce` lanza error.
6. **Unión de literales como `Cupon`:** `aplicarCupon("DESC50")` **no compila**. Es la protección que daría un `enum`, sin usar `enum`.
7. **Copia defensiva:** `listar()` devuelve un arreglo **nuevo** de strings (con `map`). El arreglo `items` nunca sale de la clase.
8. Orden en `aplicarCupon`: primero valida (DESC20 con total < 10000 → error), después asigna. Si fallara, el descuento anterior queda intacto.

---

## M2 · Figuras

**Conceptos:** clase abstracta con estado y métodos concretos, métodos abstractos, polimorfismo, validación en constructor.

1. **`abstract area(): number;`** sin cuerpo y con `;`. Cada hija **tiene** que implementarlo: si te olvidás `perimetro()` en `Triangulo`, el error es *"Non-abstract class 'Triangulo' does not implement inherited abstract member 'perimetro'"*.
2. **`describir()` en la clase abstracta** llama a `this.area()` y `this.perimetro()`, que no existen en `Figura`, pero sí en cada hija. Es el patrón *Template Method*: el "esqueleto" del algoritmo vive en el padre y los pasos concretos en las hijas.
3. **`super("Círculo")` primero.** El nombre lo fija cada hija, así que el constructor de la hija no recibe `nombre`.
4. **Validación en el constructor:** un triángulo con lados 1, 2 y 10 **nunca llega a existir**. `validarPositivo` es `protected static` porque la necesitan las hijas y no depende de ningún objeto. Usa *rest parameters* (`...medidas: number[]`) para aceptar 1, 2 o 3 números.
5. **`figuraMayorArea` sin `instanceof`:** solo compara `f.area()`. Si mañana agregás `Hexagono`, la función no cambia.
6. `toFixed(2)` devuelve un **string** con dos decimales (`"3.14"`). Se usa solo para mostrar; para comparar se usan los números.

---

## M3 · Socios

**Conceptos:** método abstracto vs. método concreto redefinible, polimorfismo dentro de la clase padre, encapsulamiento de una lista.

1. **¿Por qué `limitePrestamos()` es abstracto y `diasDePrestamo()` no?** Porque para los días **hay** un valor por defecto razonable (7) y solo algunos tipos lo cambian. Para el límite no hay un valor "por defecto": cada tipo de socio tiene que decirlo. Abstracto = "obligatorio para las hijas". Concreto = "las hijas pueden cambiarlo si quieren".
2. **La regla de préstamo está una sola vez** (en `Socio.prestar`). Las subclases no repiten ni una línea de esa lógica: solo aportan un número. Si la regla cambia, se toca un solo lugar.
3. `SocioComun` no tiene constructor: usa el de `Socio`. Solo implementa `limitePrestamos()`.
4. `includes` comprueba duplicados; `indexOf` + `splice` quita un elemento.
5. El arreglo `prestamos` es `private`: ni las hijas lo tocan. Solo lo modifican `prestar` y `devolver` (encapsulamiento estricto).
6. `resumen()` mezcla `limitePrestamos()` y `diasDePrestamo()`: cada socio muestra sus propios valores.

---

## M4 · Varias interfaces

**Conceptos:** `implements` múltiple, polimorfismo sin herencia, interfaces chicas (anticipo de ISP), genéricos.

1. **Una clase, varios contratos:** `class ClienteParticular implements Identificable, Notificable, Facturable`. Con `extends` solo se puede heredar de **una** clase; con `implements` se pueden cumplir muchas interfaces.
2. **`Proveedor` no implementa `Facturable`** porque no le corresponde. No hay que inventarle un `montoMensual() { return 0; }` ni uno que lance error. Esto es exactamente el principio **ISP** del tema 3.
3. **Polimorfismo sin herencia:** `avisarATodos` recibe `Notificable[]` y mezcla un particular, una empresa y un proveedor, que no tienen ninguna clase padre en común.
4. **El chequeo en compilación:** `facturacionTotal([prov])` da *"Property 'montoMensual' is missing in type 'Proveedor'"*. Eso se logra solo con los tipos.
5. **Genéricos.** `function buscarPorId<T extends Identificable>(lista: T[], id: string): T | undefined`
   - `<T>` es un **parámetro de tipo**: TypeScript lo deduce de lo que le pasás (acá, `ClienteParticular | ClienteEmpresa`).
   - `extends Identificable` **restringe** T: solo acepta tipos que tengan `id`. Por eso adentro se puede usar `x.id`.
   - Ventaja: el resultado es del **mismo tipo** que la lista. Con la versión no genérica (`Identificable | undefined`), `encontrado?.montoMensual()` no compilaría, porque `Identificable` no tiene `montoMensual`.
   - Ya usaste genéricos sin saberlo: `Array<string>`, `Promise<void>`.

---

## Errores comunes en este nivel

| Error | Mensaje de `tsc` | Corrección |
|---|---|---|
| Olvidar implementar un método abstracto | `Non-abstract class 'X' does not implement inherited abstract member 'y'` | Implementarlo en la hija |
| `new Figura(...)` | `Cannot create an instance of an abstract class` | Instanciar una hija |
| Usar `this` antes de `super` | `'super' must be called before accessing 'this' in the constructor of a derived class` | `super(...)` primero |
| Olvidar el `0` en `reduce` sobre arreglos de objetos | No coincide el tipo / falla con arreglo vacío | `reduce((acc, x) => ..., 0)` |
| Declarar `implements` y no poner un método | `Class 'X' incorrectly implements interface 'Y'` | Implementar todo el contrato |
