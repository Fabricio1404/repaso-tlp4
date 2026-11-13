# Tema 1 · Ejercicios difíciles (tipo examen, sin pistas)

Acá se escribe **todo desde cero**. El archivo `.ts` solo trae el bloque de prueba comentado: el nombre de las clases y métodos que usa el bloque de prueba **es parte de la consigna**.
Tiempo sugerido: 40 minutos por ejercicio. Reglas del examen: sin `any`, sin `enum`, sin parameter properties, constructor en forma larga, `npx tsc` sin errores, salida idéntica (con tildes).

---

## D1 · Estacionamiento (`d1-estacionamiento.ts`)

**Vehículos**
- Ningún vehículo "genérico" puede crearse: solo `Auto`, `Moto` y `Camioneta`.
- Todo vehículo tiene una `patente` que nunca cambia. Se guarda en mayúsculas y sin espacios. Formatos válidos: viejo `ABC123` (3 letras + 3 números) o nuevo `AB123CD` (2 letras + 3 números + 2 letras). Si no cumple: `Error("Patente inválida: <lo que se recibió>")`.
- Cada tipo **debe** informar su `tarifaPorHora()` y su `tipo()` (texto): Auto $1000, Moto $500, Camioneta $1500.
- `calcularCobro(minutos)`: se cobra **por hora o fracción**, con un **mínimo de 1 hora** (61 minutos = 2 horas). La regla de redondeo se escribe **una sola vez**.
- La camioneta, además, paga un seguro fijo de $2000 por estadía. Reutilizá el cálculo general, no lo copies.

**Estacionamiento**
- `new Estacionamiento(nombre, capacidad)`. La capacidad debe ser un entero mayor a 0.
- `ingresar(vehiculo, minuto)`: si no hay lugar lanza un error **de un tipo propio** `EstacionamientoLlenoError` con el mensaje `"El estacionamiento <nombre> está lleno"`. Si esa patente ya está adentro: `Error("<patente> ya está adentro")`.
- `egresar(patente, minuto): number` devuelve el cobro. La patente se puede escribir en minúsculas. Si no está: `Error("<patente> no está en el estacionamiento")`. Si el minuto es anterior al de ingreso: error.
- `lugaresLibres` y `recaudacion` se leen sin paréntesis y **no** se pueden modificar desde afuera.
- `Estacionamiento.recaudacionHistorica()` devuelve lo recaudado por **todos** los estacionamientos creados.
- `listarOcupados(): string[]` → `"Auto AB123CD"`. Sin exponer la lista interna.
- **Prohibido** preguntar el tipo de vehículo (`instanceof`, `tipo() === ...`) para calcular el cobro.

Salida esperada:
```
[ 'Auto AB123CD', 'Moto XYZ987', 'Camioneta AAA111' ]
Libres: 0
EstacionamientoLlenoError: El estacionamiento Centro está lleno
Cobro: $3000
Cobro: $500
Cobro: $3500
Patente inválida: 123ABC
ZZZ999 no está en el estacionamiento
Cobro: $1000
Recaudación Centro: $7000
Recaudación histórica: $8000
```

---

## D2 · Banco (`d2-banco.ts`)

**Cuentas**
- No existen cuentas "genéricas": solo `CajaAhorro(cbu, titular)` y `CuentaCorriente(cbu, titular, descubierto)`. `cbu` y `titular` nunca cambian. Todas arrancan con saldo 0.
- Error propio `OperacionInvalidaError` para **todos** los errores de este ejercicio.
- `depositar(monto)` y `extraer(monto)`: el monto debe ser un número finito mayor a 0 (`"El monto debe ser mayor a 0"`).
- Regla de extracción, **distinta según el tipo** (y que no forma parte de lo que se puede llamar desde afuera):
  - Caja de ahorro: no puede quedar en negativo (`"Saldo insuficiente"`) y tiene un máximo de 3 extracciones por mes (`"Límite de 3 extracciones mensuales alcanzado"`). Las transferencias enviadas **cuentan** como extracción. `nuevoMes()` reinicia el contador. El contador solo aumenta si la extracción se concreta.
  - Cuenta corriente: puede quedar en negativo hasta su descubierto (`"Supera el descubierto de $<n>"`).
- `transferir(destino, monto)`: **atómica**. Si algo falla, **ninguna** de las dos cuentas cambia. No se puede transferir a la misma cuenta (`"No se puede transferir a la misma cuenta"`).
- Cada operación registra un movimiento inalterable con `tipo` (`"deposito" | "extraccion" | "transferencia-enviada" | "transferencia-recibida"`), `monto` y `saldoResultante`. `historial()` los devuelve sin exponer el arreglo interno.
- `saldoActual` se lee sin paréntesis. `tipo()` devuelve `"CajaAhorro"` o `"CuentaCorriente"`.

**Banco**
- `abrir(cuenta)`: CBU repetido → `"Ya existe una cuenta con CBU <cbu>"`.
- `buscar(cbu): Cuenta` → si no existe `"No existe la cuenta <cbu>"`.
- `transferir(cbuOrigen, cbuDestino, monto)`, `totalDepositado` (suma de saldos) y `reporte(): string[]` con el formato `"CajaAhorro 001 (Ana): $4000"`. Un saldo negativo se muestra `-$4000` (no `$-4000`).

Salida esperada:
```
✗ Supera el descubierto de $5000
✗ Límite de 3 extracciones mensuales alcanzado
✗ Saldo insuficiente
Saldo de Beto sin cambios: -$4000
✗ Ya existe una cuenta con CBU 001
✗ No existe la cuenta 999
✗ No se puede transferir a la misma cuenta
✗ El monto debe ser mayor a 0
[ 'CajaAhorro 001 (Ana): $4000', 'CuentaCorriente 002 (Beto): -$4000' ]
[
  'deposito 10000 → 10000',
  'transferencia-enviada 3000 → 7000',
  'extraccion 1000 → 6000',
  'extraccion 1000 → 5000',
  'extraccion 1000 → 4000'
]
Total depositado: $0
```

---

## D3 · Gestión de cursos (`d3-cursos.ts`)

- `Identificable`: contrato con un `id` no reasignable.
- `Persona` (no instanciable) es identificable: su `id` es el DNI (7 u 8 dígitos; si no, `Error("DNI inválido: <dni>")`). Tiene `nombre`. Cada subclase **debe** decir su `rol()`. `presentarse()` → `"Alumno: Ana (DNI 30111222)"`.
- `Docente(dni, nombre, materia)`: su presentación agrega `" — <materia>"` **reutilizando** la del padre.
- `Alumno(dni, nombre)`:
  - `agregarNota(nota)`: entero entre 1 y 10. Si no, lanzá un **`RangeError`** con `"La nota debe ser un entero entre 1 y 10"`.
  - `promedio` (0 si no tiene notas) y `aprobado` (al menos 2 notas **y** promedio ≥ 6), sin paréntesis.
- `Curso(nombre, cupo)`:
  - `asignarDocente(docente)` (al principio no tiene).
  - `inscribir(alumno)`: sin cupo → `"El curso <nombre> no tiene cupo"`; mismo DNI ya inscripto → `"<nombre del alumno nuevo> ya está inscripto"`.
  - `darDeBaja(dni)`: si no está → error.
  - `inscriptos`, `aprobados(): Alumno[]`, `mejorPromedio(): Alumno | undefined`, `integrantes(): Persona[]` (docente primero, si hay).
  - `reporte(): string[]`: primera línea `"<nombre> (<inscriptos>/<cupo>) — docente: <nombre o 'sin asignar'>"` y una línea por alumno `"- Ana: 8.50 (aprobado)"`.

Salida esperada:
```
Programación IV (0/3) — docente: sin asignar
Ana (otra vez) ya está inscripto
El curso Programación IV no tiene cupo
RangeError: La nota debe ser un entero entre 1 y 10
DNI inválido: 12A
Programación IV (3/3) — docente: Prof. Díaz
- Ana: 8.50 (aprobado)
- Beto: 5.50 (desaprobado)
- Caro: 10.00 (desaprobado)
Aprobados: Ana
Mejor promedio: Caro
Docente: Prof. Díaz (DNI 20999888) — TLP IV
Alumno: Ana (DNI 30111222)
Alumno: Caro (DNI 30555666)
```

> Fijate en Caro: tiene promedio 10 pero está **desaprobada** porque tiene una sola nota. Leer bien las reglas es la mitad del examen.
