# Solución · Simulacro Tema C · Agencia de viajes

## Ejercicio 1
- `_noches` + getter/setter con validación; el constructor asigna con `this.noches = noches` para validar al crear.
- `precioTotal()` es **concreto** en `Paquete` (usa el abstracto `precioPorNoche()`), y `PaqueteInternacional` lo **redefine** con `override` y `super.precioTotal() + TASA`. La consigna decía "reutilizá el cálculo del padre": eso es `super.metodo()`.
- Al cambiar Bariloche a 6 noches **después** de venderlo, el resumen ya muestra $240000: la agencia guarda la **referencia** al objeto y el precio se calcula al leerlo (getter calculado), nunca queda desactualizado.
- Madrid: 90000 × 7 + 60000 = 690000. Total: 930000.

## Ejercicio 2
- Singleton con las tres piezas; `valor` readonly.
- `VueloInternacional.precioEnPesos()` lee `CotizacionDolar.obtenerInstancia().valor`.
- `FabricaServicios.crear` devuelve `Servicio`. El bloque de prueba solo usa la interfaz.

## Ejercicio 3
- Interfaces chicas con comentario `// ISP: ...` (y `// LSP: ...` en la explicación del colectivo).
- Ningún transporte hereda de otro; cada uno implementa lo que ofrece.
- `servirATodos(transportes: ConServicioABordo[])`: ya no necesita `try/catch`.

**Respuesta a la pregunta:** los dos.
- **LSP:** en el original, `Colectivo` y `Traslado` **heredan** de `Transporte` y redefinen métodos para lanzar errores donde la base funcionaba: no pueden sustituir a la base sin romper a quien la usa (`servirATodos`).
- **ISP:** la "interfaz" de `Transporte` es demasiado grande: obliga a todos a tener equipaje y comida.
- La misma corrección (capacidades separadas y sin herencia forzada) resuelve ambos. Si te preguntan "cuál", mirá si el problema está en la **herencia** (LSP) o en el **tamaño del contrato** (ISP).
