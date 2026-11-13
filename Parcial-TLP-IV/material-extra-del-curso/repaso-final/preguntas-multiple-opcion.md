# Preguntas de múltiple opción (45)

Elegí **una** opción. Respuestas en `respuestas-justificadas.md`.

## A. TypeScript y POO (tema 1)
1. ¿Qué diferencia una clase abstracta de una interface en TypeScript?
   a) La interface puede tener métodos con código y la abstracta no · b) La abstracta puede tener estado y métodos implementados; la interface solo declara el contrato · c) Las dos se pueden instanciar · d) Una clase puede extender varias clases abstractas
2. Una subclase redefine `calcularSueldo()` con la misma firma que en la clase padre. Eso es:
   a) Sobrecarga · b) Sobrescritura (override) · c) Encapsulamiento · d) Composición
3. "El objeto protege su estado y solo se modifica a través de sus métodos" describe:
   a) Abstracción · b) Herencia · c) Encapsulamiento · d) Polimorfismo
4. `nombre` es `private` en `Empleado`. En `EmpleadoFijo extends Empleado`, `this.nombre`:
   a) Funciona · b) No compila · c) Funciona solo en el constructor · d) Devuelve `undefined`
5. Un atributo `static totalCheckIns` se accede desde un método de instancia como:
   a) `this.totalCheckIns` · b) `Hotel.totalCheckIns` · c) `super.totalCheckIns` · d) `totalCheckIns`
6. En el constructor de una subclase, `super(...)` se debe llamar:
   a) Al final · b) Antes de usar `this` · c) Solo si el padre es abstracto · d) Nunca
7. ¿Por qué el atributo de respaldo se llama `_edad` y el getter/setter `edad`?
   a) Por convención, sin efecto · b) Si se llamaran igual, el setter se llamaría a sí mismo infinitamente · c) Porque `_` lo hace privado · d) Porque TypeScript lo exige siempre
8. ¿Qué devuelve `obtenerHistorial()` para no romper el encapsulamiento?
   a) `this.historial` · b) `[...this.historial]` · c) `undefined` · d) `this`
9. ¿Por qué están prohibidos los parameter properties con `erasableSyntaxOnly`?
   a) Son lentos · b) Generan código JavaScript que no se puede "borrar" · c) No existen en TypeScript · d) Rompen la herencia
10. En lugar de un `enum`, para un conjunto fijo de opciones se usa:
   a) `any` · b) Una unión de literales (`"a" | "b"`) · c) Un `number` · d) Un `class`
11. `readonly items: string[]` permite:
   a) Reasignar `this.items = []` · b) Hacer `this.items.push("x")` · c) Nada · d) Cambiar el tipo
12. "Auto tiene un Motor" es una relación de:
   a) Herencia · b) Composición · c) Polimorfismo · d) Sobrecarga

## B. Patrones de diseño (tema 2)
13. Singleton y Factory Method son patrones:
   a) Estructurales · b) Comportamentales · c) Creacionales · d) Arquitectónicos
14. ¿Cuál es una **desventaja** del Singleton?
   a) Agrega una capa extra · b) Dificulta las pruebas unitarias · c) Notificaciones en cascada · d) Más clases
15. El constructor de un Singleton es:
   a) `public` · b) `protected` · c) `private` · d) `static`
16. ¿Qué patrón "hace que dos interfaces incompatibles trabajen juntas"?
   a) Observer · b) Adapter · c) Factory · d) Singleton
17. Una **desventaja** del Observer es:
   a) Notificaciones en cascada difíciles de seguir · b) Dificulta las pruebas · c) Agrega una capa extra · d) Problemas de concurrencia
18. En el Observer, el sujeto guarda una lista de:
   a) Clases concretas de observadores · b) La interfaz `Observador` · c) Strings · d) Promesas
19. En una Factory, el método creador debería devolver:
   a) La clase concreta · b) El tipo común (interfaz o clase abstracta) · c) `any` · d) `void`
20. El Adapter, respecto de la clase vieja:
   a) La modifica · b) La hereda siempre · c) La contiene y traduce sus llamadas sin modificarla · d) La reemplaza
21. En el integrador, ¿por qué no se usa `EventEmitter` para el Observer?
   a) Es lento · b) La consigna exige implementarlo a mano · c) No existe en Node · d) No funciona con TypeScript

## C. SOLID (tema 3)
22. Señal: "un `switch` que crece con cada opción nueva". Principio violado:
   a) SRP · b) OCP · c) LSP · d) ISP
23. Señal: "un `new` de una clase concreta dentro de otra clase". Principio violado:
   a) DIP · b) ISP · c) OCP · d) LSP
24. `Square extends Rectangle` cambia `setWidth` para cambiar también el alto. Viola:
   a) SRP · b) ISP · c) LSP · d) DIP
25. `SimplePrinter` implementa `scan()` lanzando un error porque no escanea. Viola:
   a) ISP · b) SRP · c) DIP · d) OCP
26. "Una clase debe tener una sola razón para cambiar" es:
   a) OCP · b) SRP · c) LSP · d) DIP
27. Refactorizar es:
   a) Agregar funcionalidad · b) Cambiar la estructura sin cambiar el comportamiento visible · c) Corregir bugs · d) Escribir tests
28. ¿Dónde se crean y conectan las dependencias concretas cuando se aplica DIP?
   a) En cada servicio · b) En el composition root (por ejemplo, `main.ts`) · c) En los repositorios · d) En los controladores

## D. Calidad y pruebas (tema 5 y 8)
29. Una prueba que llama a `calcularPrecioFinal` directamente es:
   a) E2E · b) De integración · c) Unitaria · d) Manual
30. `expect(calcularPrecioFinal(1000, 150)).toThrow(RangeError)` (sin flecha):
   a) Funciona · b) El error salta antes de que Vitest lo inspeccione · c) Siempre pasa · d) No compila
31. Para comparar el **contenido** de dos objetos se usa:
   a) `toBe` · b) `toEqual` · c) `toThrow` · d) `toHaveLength`
32. `npm run typecheck` (`tsc --noEmit`):
   a) Ejecuta los tests · b) Verifica tipos sin ejecutar · c) Genera JavaScript · d) Levanta el servidor
33. Un test falla y su expectativa contradice la regla del README. Hay que:
   a) Corregir el código · b) Corregir el test · c) Borrar el test · d) Dejarlo fallar
34. ¿Qué es un caso **límite** para "descuento entre 0 y 100"?
   a) 50 · b) 100 · c) "diez" · d) -500
35. `vi.fn()` crea:
   a) Un repositorio real · b) Una función espía que registra sus llamadas · c) Un servidor · d) Un error
36. Un test con Supertest sin `await`:
   a) Falla siempre · b) Puede pasar sin comprobar nada · c) No compila · d) Es más rápido y correcto
37. ¿Por qué se usa `RangeError` para un descuento de 150 %?
   a) Es un error de tipo · b) El dato es de tipo correcto pero fuera del rango · c) Es obligatorio en Express · d) Lo exige Vitest
38. `GET /libros/999` responde 200 con cuerpo vacío. La causa más probable en una app en capas es:
   a) La base de datos · b) El controlador llama a un método que devuelve `undefined` en vez de uno que lanza `NoEncontradoError` · c) Vitest · d) El `tsconfig`
39. TDD significa:
   a) Escribir el código y después los tests · b) Escribir el test primero (rojo), el código mínimo (verde) y después refactorizar · c) Probar a mano · d) Testear solo la base de datos

## E. Integrador (tema 6)
40. Sin token → ¿qué código? Con token válido pero sin permiso → ¿qué código?
   a) 403 / 401 · b) 401 / 403 · c) 404 / 403 · d) 400 / 401
41. ¿Por qué el backend usa `DB_HOST=db` dentro de Compose?
   a) Es el nombre del servicio; `localhost` sería el propio contenedor del backend · b) Por seguridad · c) Lo exige PostgreSQL · d) Por el healthcheck
42. Imagen vs. contenedor:
   a) Son lo mismo · b) La imagen es la plantilla; el contenedor, una instancia en ejecución · c) El contenedor es la plantilla · d) La imagen solo existe en Compose
43. ¿Qué hace `depends_on: { db: { condition: service_healthy } }`?
   a) Espera a que el contenedor de la base arranque · b) Espera a que el healthcheck de la base dé OK · c) Reinicia la base · d) Crea el volumen
44. ¿Por qué los services no reciben `req` ni `res`?
   a) Por rendimiento · b) Para que la lógica no dependa de Express y se pueda reutilizar y probar sin HTTP · c) Porque Express lo prohíbe · d) Por Sequelize
45. En el flujo de notificaciones del integrador, `ConsoleNotifierAdapter` es un:
   a) Singleton · b) Observer · c) Adapter · d) Factory
