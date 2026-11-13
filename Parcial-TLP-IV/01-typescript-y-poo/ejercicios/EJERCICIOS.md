# Ejercicios · Tema 01 · TypeScript y POO

**Cómo trabajar:**
1. Abrí el archivo `.ts` del ejercicio en esta carpeta. Ya tiene el **bloque de prueba comentado** al final.
2. Escribí las clases que pide la consigna **arriba** del bloque de prueba.
3. Cuando termines, **descomentá** el bloque de prueba (seleccionalo y `Ctrl + K, Ctrl + U` en VS Code).
4. Ejecutá: `node 01-typescript-y-poo/ejercicios/ej1-libro.ts` (desde la carpeta `Parcial-TLP-IV`).
5. Verificá tipos: `npx tsc`.
6. Compará tu salida con la **salida esperada** carácter por carácter (tildes incluidas).
7. Recién ahí abrí `../soluciones/`.

**Reglas (como en el parcial):** sin `enum`, sin `any`, sin parameter properties, constructor en forma larga.

| # | Ejercicio | Dificultad | Conceptos |
|---|---|---|---|
| 1 | Libro | ⭐ Fácil | Clase, constructor largo, métodos, validación, unión de literales |
| 2 | Cuenta bancaria | ⭐⭐ Fácil-medio | Encapsulamiento, getter, `readonly`, error propio, copia defensiva |
| 3 | Empleados | ⭐⭐ Medio | Clase abstracta, herencia, `super`, `override`, polimorfismo, `static` |
| 4 | Figuras | ⭐⭐ Medio | Interface, `implements`, polimorfismo con interfaces |
| 5 | Estacionamiento | ⭐⭐⭐ Tipo parcial | Todo junto + composición |

---

## Ejercicio 1 · Libro ⭐

Archivo: `ej1-libro.ts`

1. Crear el tipo `Genero` que solo pueda valer `"novela"`, `"ensayo"` o `"poesia"` (**no** se permite `enum`).
2. Crear la clase `Libro` con los atributos **privados** `titulo` (string), `autor` (string), `paginas` (number), `genero` (Genero) y `prestado` (boolean).
3. El constructor recibe `titulo`, `autor`, `paginas` y `genero`. `prestado` arranca en `false`.
   - Si `paginas` es menor o igual a 0, lanzar un `RangeError` con el mensaje `La cantidad de páginas debe ser mayor a 0`.
4. Métodos:
   - `prestar()`: si ya está prestado lanza un `Error` con el mensaje `"<titulo>" ya está prestado` (con comillas dobles alrededor del título). Si no, lo marca como prestado.
   - `devolver()`: lo marca como no prestado.
   - `estaPrestado(): boolean`.
   - `esLargo(): boolean`: `true` si tiene **más** de 300 páginas.
   - `descripcion(): string` con el formato: `Rayuela - Julio Cortázar (600 págs., novela) [disponible]` (o `[prestado]`).

**Salida esperada:**
```
Rayuela - Julio Cortázar (600 págs., novela) [disponible]
¿Es largo? true
Ficciones - Jorge Luis Borges (200 págs., novela) [disponible]
¿Es largo? false
Rayuela - Julio Cortázar (600 págs., novela) [prestado]
Error: "Rayuela" ya está prestado
Rayuela - Julio Cortázar (600 págs., novela) [disponible]
Error: La cantidad de páginas debe ser mayor a 0
```

<details><summary>💡 Pista (abrir solo si te trabaste)</summary>

- El estado se calcula con un ternario: `const estado = this.prestado ? "prestado" : "disponible";`
- Para comillas dobles dentro de un template literal: `` `"${this.titulo}" ya está prestado` ``
</details>

---

## Ejercicio 2 · Cuenta bancaria ⭐⭐

Archivo: `ej2-cuenta-bancaria.ts`

1. Crear el error propio `SaldoInsuficienteError` que extienda `Error` y cuyo `name` sea `"SaldoInsuficienteError"`.
2. Crear el tipo `TipoMovimiento` (`"deposito"` | `"extraccion"`) y la interface `Movimiento` con `tipo` y `monto`.
3. Crear la clase `CuentaBancaria` con:
   - `titular`: string, **readonly** y público.
   - `_saldo`: number, privado. Exponerlo con un **getter** `saldo` (sin setter: desde afuera no se puede asignar).
   - `movimientos`: arreglo privado de `Movimiento`.
4. El constructor recibe `titular` y `saldoInicial`. Si `saldoInicial` es negativo → `RangeError("El saldo inicial no puede ser negativo")`.
5. Métodos:
   - `depositar(monto)` y `extraer(monto)`: si el monto no es un número finito positivo → `RangeError("El monto debe ser un número positivo")`. Usá un método **privado** `validarMonto` para no repetir código.
   - `extraer` además: si el monto supera el saldo → `SaldoInsuficienteError` con el mensaje `Saldo insuficiente: se pidieron $<monto> y hay $<saldo>`.
   - Cada operación exitosa registra un movimiento.
   - `obtenerMovimientos()`: devuelve una **copia defensiva** (modificar lo devuelto no debe afectar a la cuenta).

**Salida esperada:**
```
Titular: Ana Gómez
Saldo inicial: $1000
Saldo actual: $1200
SaldoInsuficienteError: Saldo insuficiente: se pidieron $5000 y hay $1200
RangeError: El monto debe ser un número positivo
Movimientos reales: 2
- deposito: $500
- extraccion: $300
```

**Preguntas para pensar (respondelas por escrito):**
- a) ¿Qué pasaría si `obtenerMovimientos()` devolviera `this.movimientos` directamente?
- b) ¿Por qué el atributo se llama `_saldo` y el getter `saldo`?
- c) ¿Por qué conviene crear `SaldoInsuficienteError` en vez de usar `Error`?

---

## Ejercicio 3 · Empleados ⭐⭐

Archivo: `ej3-empleados.ts`

1. Clase **abstracta** `Empleado`:
   - `static totalEmpleados: number` que arranca en 0 y se incrementa en cada empleado creado (de cualquier tipo).
   - `nombre`: **protected**.
   - `legajo`: **readonly**, se asigna con el valor de `totalEmpleados` después de incrementarlo (el primero es 1).
   - Método **abstracto** `calcularSueldo(): number`.
   - Método `resumen(): string` con el formato `#1 Carlos: $800000`.
2. `EmpleadoFijo extends Empleado`: recibe `nombre` y `sueldoMensual`. Su sueldo es el mensual.
3. `EmpleadoPorHora extends Empleado`: recibe `nombre`, `horas`, `valorHora`. Sueldo = horas × valorHora.
4. `Gerente extends EmpleadoFijo`: recibe además un `bono`. Sueldo = el del padre **+** el bono. **Tenés que usar `super.calcularSueldo()`**.
5. Función `totalNomina(empleados: Empleado[]): number` que sume los sueldos **sin preguntar el tipo** de ningún empleado.

**Salida esperada:**
```
#1 Carlos: $800000
#2 Sofía: $600000
#3 Lucía: $1250000
Total de la nómina: $2650000
Empleados creados: 3
```

**Preguntas para pensar:**
- a) ¿Qué pasa si intentás `new Empleado("x")`? ¿Por qué?
- b) Si `sueldoMensual` en `EmpleadoFijo` fuera `private`, ¿podría usarlo `Gerente`? ¿Y `super.calcularSueldo()` seguiría funcionando?
- c) ¿Dónde hay polimorfismo en este ejercicio? Nombrá **dos** lugares.

---

## Ejercicio 4 · Figuras ⭐⭐

Archivo: `ej4-figuras.ts`

1. Interface `Figura` con `readonly nombre: string`, `area(): number` y `perimetro(): number`.
2. Tres clases que la **implementen**:
   - `Circulo(radio)` → nombre `"Círculo"`. Si el radio es ≤ 0 → `RangeError("El radio debe ser positivo")`.
   - `Rectangulo(base, altura)` → nombre `"Rectángulo"`. Si alguna medida es ≤ 0 → `RangeError("Las medidas deben ser positivas")`.
   - `Triangulo(a, b, c)` → nombre `"Triángulo"`. Si los lados no cumplen la desigualdad triangular (cada lado menor que la suma de los otros dos) → `RangeError("Esos lados no forman un triángulo")`. El área se calcula con la **fórmula de Herón**: `s = perímetro / 2`, `área = √(s·(s−a)·(s−b)·(s−c))`.
3. Función `describir(f: Figura): string` → `Círculo: área 12.57, perímetro 12.57` (dos decimales con `toFixed(2)`).
4. Función `mayorArea(figuras: Figura[]): Figura | undefined` que devuelva la figura de mayor área (o `undefined` si el arreglo está vacío).

**Salida esperada:**
```
Círculo: área 12.57, perímetro 12.57
Rectángulo: área 12.00, perímetro 14.00
Triángulo: área 6.00, perímetro 12.00
La de mayor área es: Círculo
Error: Esos lados no forman un triángulo
```

**Pregunta para pensar:** ¿por qué acá conviene una **interface** y no una clase abstracta? (Pista: ¿qué código o datos comparten las tres figuras?)

---

## Ejercicio 5 · Estacionamiento ⭐⭐⭐ (tipo parcial)

Archivo: `ej5-estacionamiento.ts` · Tiempo sugerido: **30 minutos**

1. Tipo `TipoVehiculo` = `"auto"` | `"moto"` | `"camioneta"`.
2. Error propio `EstacionamientoLlenoError`.
3. Clase **abstracta** `Vehiculo`:
   - `patente` (readonly, se guarda en **mayúsculas**) y `tipo` (readonly). Si la patente está vacía o son solo espacios → `Error("La patente es obligatoria")`.
   - Método abstracto `tarifaPorHora(): number`.
   - Método `calcularCobro(horas: number): number`: **toda fracción de hora se cobra como hora entera** (usá `Math.ceil`) × tarifa.
4. Subclases: `Auto` ($1500/h), `Moto` ($800/h), `Camioneta` ($2000/h). Cada una pasa su tipo al padre.
5. Clase `Estacionamiento` (composición: **tiene** vehículos):
   - `static recaudacionHistorica` (suma de **todos** los estacionamientos).
   - Atributos privados: `capacidad`, `vehiculos`, `recaudacion`.
   - Getters: `ocupados`, `libres`, `recaudado`.
   - `ingresar(v)`: si no hay lugar → `EstacionamientoLlenoError("No hay lugar para <PATENTE>")`. Si la patente ya está adentro → `Error`.
   - `egresar(patente, horas): number`: busca el vehículo (sin importar mayúsculas), calcula el cobro **sin preguntar el tipo**, lo saca, suma la recaudación (propia e histórica) y devuelve el cobro.
   - `obtenerVehiculos()`: copia defensiva.

**Salida esperada:**
```
Centro: 2 ocupados, 0 libres
EstacionamientoLlenoError: No hay lugar para AE999ZZ
Cobro AB123CD (2.5 h): $4500
Cobro A001XYZ (1 h): $800
Cobro AE999ZZ (0.5 h): $2000
Recaudado en Centro: $5300
Recaudado en Norte: $2000
Recaudación histórica: $7300
```

**Checklist antes de mirar la solución:**
- [ ] `npx tsc` sin errores
- [ ] Ningún `enum`, `any` ni parameter property
- [ ] Ningún `if (v instanceof Auto)` ni `if (v.tipo === "auto")` para calcular el cobro
- [ ] `recaudacionHistorica` se accede con `Estacionamiento.recaudacionHistorica`
- [ ] La salida coincide exactamente
