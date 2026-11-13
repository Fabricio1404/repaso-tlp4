# Respuestas justificadas

| # | Resp. | Por qué (y por qué no las otras) | Tema |
|---|---|---|---|
| 1 | **b** | La abstracta puede tener estado y código; la interface es solo contrato. Ninguna se instancia (c); se extiende **una** clase (d). | 1 |
| 2 | **b** | Misma firma en la subclase = override. Overload es varias firmas en la misma clase. | 1 |
| 3 | **c** | Encapsulamiento. Abstracción es modelar lo relevante. | 1 |
| 4 | **b** | `private` = solo la propia clase. Para las hijas, `protected`. | 1 |
| 5 | **b** | Lo `static` es de la clase: `Hotel.totalCheckIns`. | 1 |
| 6 | **b** | `super` inicializa la parte del padre; usar `this` antes es error de compilación. | 1 |
| 7 | **b** | `set edad(v) { this.edad = v }` se llamaría a sí mismo (stack overflow). | 1 |
| 8 | **b** | Una copia: devolver la referencia permite modificar la lista interna. | 1 |
| 9 | **b** | Generan `this.x = x` implícito: no es sintaxis "borrable" (Node solo borra tipos). | 1 |
| 10 | **b** | Unión de literales: el compilador rechaza valores mal escritos, como haría un enum. | 1 |
| 11 | **b** | `readonly` protege la referencia, no el contenido. | 1 |
| 12 | **b** | "Tiene un" = composición; "es un" = herencia. | 1 |
| 13 | **c** | Se ocupan de **crear** objetos. Adapter es estructural; Observer, comportamental. | 2 |
| 14 | **b** | Estado global que se arrastra entre tests. (a) es del Adapter, (c) del Observer, (d) del Factory. | 2 |
| 15 | **c** | `private` impide `new` desde afuera. Con `protected`, una subclase podría crear instancias. | 2 |
| 16 | **b** | Adapter. | 2 |
| 17 | **a** | Notificaciones en cascada. (b) Singleton, (c) Adapter. | 2 |
| 18 | **b** | De la interfaz: no conoce las clases concretas (bajo acoplamiento). | 2 |
| 19 | **b** | El tipo común: el cliente no conoce la clase concreta. | 2 |
| 20 | **c** | Composición + traducción; la ventaja es no modificar lo viejo. | 2 |
| 21 | **b** | Si lo resuelve una librería, no implementaste el patrón. | 2/6 |
| 22 | **b** | OCP: para agregar una opción hay que modificar código existente. | 3 |
| 23 | **a** | DIP: depender de una abstracción recibida por constructor. | 3 |
| 24 | **c** | LSP: la subclase sorprende a quien esperaba la base (área 100 en vez de 50). | 3 |
| 25 | **a** | ISP: interfaz demasiado grande; partirla en `Printer`, `Scanner`, `Fax`. | 3 |
| 26 | **b** | SRP. | 3 |
| 27 | **b** | La salida antes y después tiene que ser idéntica. | 3 |
| 28 | **b** | Composition root: el único lugar con los `new` de las dependencias. | 3/6 |
| 29 | **c** | Una función aislada = unitaria. Con ruta + servicio vía HTTP sería de integración. | 5 |
| 30 | **b** | `toThrow` necesita una **función**: `() => calcularPrecioFinal(1000, 150)`. | 5 |
| 31 | **b** | `toEqual` compara contenido; `toBe` compara referencias. | 5 |
| 32 | **b** | Verifica tipos sin ejecutar ni generar JS. | 5 |
| 33 | **b** | La regla manda: si el test la contradice, el error está en el test. | 5/8 |
| 34 | **b** | 100 es el borde exacto (también 0, −1, 101). 50 es habitual; "diez" y −500, inválidos. | 5 |
| 35 | **b** | Una función espía (`toHaveBeenCalledWith`, `toHaveBeenCalledTimes`...). | 5 |
| 36 | **b** | El test termina antes de la respuesta y las aserciones no se evalúan a tiempo. | 5 |
| 37 | **b** | `RangeError`: tipo correcto, valor fuera de rango. | 5 |
| 38 | **b** | Es exactamente el defecto del parcial Tema B (`buscar` vs `obtener`). | 8 |
| 39 | **b** | Rojo, verde, refactor. | 5 |
| 40 | **b** | 401 = no autenticado; 403 = sin permiso. | 6 |
| 41 | **a** | En la red de Compose, cada servicio se alcanza por su nombre. | 6 |
| 42 | **b** | | 6 |
| 43 | **b** | `service_healthy` espera el healthcheck (`pg_isready`), no solo el arranque. | 6 |
| 44 | **b** | | 6 |
| 45 | **c** | Adapta `console.log` (texto, sin promesa) a `INotifier` (recibe `Notification`, devuelve `Promise`). | 6 |
