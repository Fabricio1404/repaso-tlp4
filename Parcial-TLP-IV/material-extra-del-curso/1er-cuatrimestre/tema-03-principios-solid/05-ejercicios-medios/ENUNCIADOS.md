# Tema 3 · Ejercicios medios: dos principios por ejercicio

Igual que los fáciles: ejecutá el original, guardá la salida, refactorizá y comprobá que la salida sea **idéntica** (salvo lo que la consigna pide cambiar). Comentario con el principio arriba de cada interfaz nueva.

---

## M1 · SRP + DIP (`m1-srp-dip-inscripciones.ts`)
`ServicioInscripcion` valida los datos del alumno, controla cupo y duplicados, guarda, notifica por WhatsApp (creándolo con `new` adentro) y escribe un log.
1. **Identificá** cuántos motivos de cambio tiene (escribilo en un comentario).
2. Separá en: `ValidadorAlumno` (DNI y nombre), `RepositorioInscripciones` (guardar, buscar por DNI, cantidad), interfaz `Notificador` (con `NotificadorWhatsapp` y un nuevo `NotificadorEmail` que imprima `[Email <dni>@alumnos.edu] <texto>`), interfaz `Registro` (con `RegistroConsola` que imprime `[LOG] ...`).
3. `ServicioInscripcion` recibe **todo** por constructor (incluido el cupo) y solo coordina. Las reglas de cupo y duplicados quedan en el servicio (son reglas del proceso de inscripción).
4. Al final del bloque de prueba, creá **otro** servicio con `NotificadorEmail` e inscribí a `{ dni: "40111222", nombre: "Dani", telefono: "381444" }`.

Salida esperada:
```
[WhatsApp 381111] Hola Ana, quedaste inscripto en TLP IV
[LOG] inscripción 30111222 en TLP IV
DNI inválido: 12
Ana ya está inscripto
[WhatsApp 381222] Hola Beto, quedaste inscripto en TLP IV
[LOG] inscripción 30333444 en TLP IV
Sin cupo en TLP IV
Inscriptos: 2
[Email 40111222@alumnos.edu] Hola Dani, quedaste inscripto en TLP IV
[LOG] inscripción 40111222 en TLP IV
```

---

## M2 · OCP + LSP (`m2-ocp-lsp-liquidacion.ts`)
- `Liquidador` tiene un `switch` por tipo de empleado (con un `tipo` en texto que se puede escribir mal) → **OCP**.
- `Pasante` hereda `calcularBono()` y lo rompe con un `throw`; el liquidador tiene que "acordarse" de no llamarlo para pasantes (`if (e.tipo !== "pasante")`) → **LSP**.

Rediseñá:
- Un contrato `Liquidable` (`nombre`, `sueldo(): number`) que el liquidador usa **sin ningún `if` ni `switch`**.
- Una interfaz aparte `ConBono` (`calcularBono(): number`) que solo implementan quienes cobran bono.
- Clases `EmpleadoPlanta` (base + 10 %), `EmpleadoContratado` (90 % de la base + bono del 10 % de la base) y `Pasante` (50 % de la base, sin bono).
- **Extra:** agregá `Consultor` (cobra `horas × valorHora`, sin bono) **sin tocar el liquidador**: `new Consultor("Dani", 20, 15000)`.

Salida esperada (las cuatro primeras líneas idénticas al original):
```
Ana: $1100000
Beto: $800000
Caro: $200000
Total: $2100000
Dani: $300000
```

---

## M3 · ISP + DIP (`m3-isp-dip-repositorios.ts`)
- `Repositorio` es una interfaz gorda: `CatalogoPublico` implementa 3 métodos que lanzan error → **ISP**.
- `CatalogoPublico` y `ServicioPrecios` crean su `RepositorioMemoria` con `new` adentro → **DIP**.

Rediseñá:
- Partí en `Lectura` (`listar`, `buscar`), `Escritura` (`guardar`, `eliminar`) y `Exportable` (`exportarCSV`). `RepositorioMemoria` implementa las tres.
- `CatalogoPublico` implementa **solo** `Lectura` y recibe por constructor la fuente (una `Lectura`).
- `ServicioPrecios` recibe por constructor **lo mínimo que necesita** (¿cuál de las tres?).
- En el bloque de prueba, que el catálogo y el servicio usen **el mismo** repositorio. Agregá al final `console.log(\`Promedio: $${precios.precioPromedio()}\`)` **después** de guardar el té: tiene que dar `3066.6666666666665` (prueba de que comparten los datos).

Salida esperada:
```
Promedio: $4000
Más caro: Café
Café
1,Yerba,3000
2,Café,5000
3,Té,1200
Promedio: $3066.6666666666665
```
