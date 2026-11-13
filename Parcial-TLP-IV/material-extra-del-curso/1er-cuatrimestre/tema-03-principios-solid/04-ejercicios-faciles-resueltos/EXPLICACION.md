# Tema 3 · Ejercicios fáciles: resolución explicada

## F1 · SRP
- **Tres motivos de cambio** en el original: la regla de cálculo, el formato del reporte y el destino de la salida. Cada uno pasa a su clase.
- `ServicioReportes` **coordina**: pide el total, pide las líneas, manda a imprimir. No hace ninguna de esas cosas él mismo.
- Ganancia concreta: para mandar el reporte por mail, se crea otra clase con `imprimir(lineas)` y no se toca el cálculo ni el formato. (Si además hicieras una interfaz `Salida`, estarías aplicando DIP.)
- El formateador **devuelve** líneas en vez de imprimirlas: así se puede reutilizar (y probar) sin consola.

## F2 · OCP
- **Señal:** la cadena `if / else if` por tipo de cliente que crece con cada tipo nuevo.
- Cada tipo es una clase con `aplicar(monto)`. La calculadora recibe un `Descuento` y delega.
- `DescuentoJubilado` se agregó **sin tocar** `CalculadoraDescuentos`: eso es estar "abierta a la extensión y cerrada a la modificación".
- Efecto secundario bueno: el `throw "Tipo de cliente desconocido"` del original desapareció. Ya no se puede pasar un tipo inexistente: el error es **de compilación**.

## F3 · LSP
- **Señal:** la subclase `Pinguino` sobrescribe `volar()` para lanzar un error: la función `hacerVolar`, que esperaba aves voladoras, se lleva una sorpresa. La subclase **no puede reemplazar** a la base.
- **Solución:** sacar `volar()` de la base. La base `Ave` solo tiene lo que **todas** cumplen (`comer`). `volar` pasa a un contrato aparte (`Voladora`) que solo implementan las que vuelan.
- `hacerVolar(aves: Voladora[])` ya **no puede recibir** un pingüino: el error pasa de ejecución a compilación.
- La línea `¡Sorpresa!` desaparece porque era la manifestación del bug. Ya no hace falta el `try/catch` en `hacerVolar`.
- Fijate que la herencia `Gorrion extends Ave` **sí** está bien: el gorrión cumple todo lo que promete `Ave`.

## F4 · ISP
- **Señal:** `Robot` implementa `comer()` y `cobrarSueldo()` lanzando `throw`. Compila, pero explota si alguien los llama.
- Se parte `Trabajador` en tres interfaces chicas. `Empleado implements Trabajador, Comensal, Asalariado`; `Robot implements Trabajador`.
- `planta: Trabajador[]` sigue funcionando para los dos (solo usa `trabajar`).
- ¿ISP o LSP? Acá no hay herencia de clases: el problema es una **interfaz demasiado grande** → ISP.

## F5 · DIP
- **Señal:** `new ExportadorPDF()` **dentro** del constructor de `GeneradorFacturas`.
- Se crea la abstracción `Exportador`, el generador la recibe por constructor y los `new` se mueven al bloque de prueba (*composition root*).
- Ahora se puede usar `ExportadorTexto` sin tocar el generador, y en un test se podría pasar un exportador falso que guarde el contenido.
- Fijate que el **comentario** arriba de la interfaz (`// DIP: ...`) es lo que pide el parcial: "un comentario arriba de cada interfaz nueva con el principio que aplica".
