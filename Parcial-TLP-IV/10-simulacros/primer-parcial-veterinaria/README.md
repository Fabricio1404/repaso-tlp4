# Simulacro · Primer parcial · Parte práctica · Tema D (Veterinaria)

> Mismo formato que el primer parcial: **1,5 h · 3 ejercicios · se aprueba con 2 de 3**.
> Las soluciones están en `solucion/`. **No las abras** hasta terminar.

## Reglas (como en el examen)
- Proyecto propio: `npm init -y` → `"type": "module"` → `npm i -D typescript` → `tsconfig.json` de la cátedra → `npx tsc` sin errores.
- **Prohibido:** `enum`, parameter properties, `any`. Constructores en **forma larga**.
- Cada archivo (`ej1.ts`, `ej2.ts`, `ej3.ts`) termina con un **bloque de prueba**.
- La salida debe coincidir **exactamente** con la esperada (tildes y `$` incluidos).
- **Puntos de control con Git** (sin el commit, el ejercicio no cuenta):

| Momento | Commit |
|---|---|
| Proyecto configurado | `chore: configuración inicial` |
| Termina el ej. 1 | `feat(ej1): pacientes de la veterinaria` |
| Termina el ej. 2 | `feat(ej2): vacunas con singleton y factory` |
| **Antes** de tocar el ej. 3 | `chore(ej3): código original` |
| Termina el ej. 3 | `refactor(ej3): aplicar OCP y DIP` |
| Al final | `docs: entrega final` |

---

## Ejercicio 1 · Pacientes (POO)

1. Tipo `Especie` = `"perro"` | `"gato"` | `"ave"`.
2. Clase **abstracta** `Paciente`:
   - `nombre` **readonly**, `edad` **protected**, `especie` **readonly**. Si la edad es negativa → `RangeError`.
   - **static** `totalConsultas` (cuenta todas las consultas atendidas, de cualquier veterinaria).
   - Método **abstracto** `costoBase(): number`.
   - `costoConsulta(): number`: si el paciente tiene **más de 10 años**, paga un **20 % extra** sobre el costo base.
   - `atender(): string`: suma 1 a `totalConsultas` y devuelve `Atendiendo a <nombre> (<especie>, <edad> años): $<costo>`.
3. Subclases `Perro` ($15000), `Gato` ($12000), `Ave` ($8000).
4. Clase `Veterinaria` con un arreglo **privado** de pacientes, `registrar(p)`, un **getter** `cantidad` y `atenderTodos(): number` que atiende a todos (mostrando cada línea) y devuelve el total. **Sin preguntar el tipo** de ningún paciente.

**Bloque de prueba:** registrar Perro "Firulais" 3 años, Gato "Michi" 12 años, Ave "Pepe" 1 año.

**Salida esperada:**
```
Pacientes registrados: 3
Atendiendo a Firulais (perro, 3 años): $15000
Atendiendo a Michi (gato, 12 años): $14400
Atendiendo a Pepe (ave, 1 años): $8000
Total recaudado: $37400
Consultas realizadas: 3
```

---

## Ejercicio 2 · Vacunas (Singleton + Factory Method)

1. Interface `Vacuna` con `nombre(): string` y `precio(): number`.
2. Clases `VacunaAntirrabica` ("Antirrábica", $9000), `VacunaQuintuple` ("Quíntuple", $14000), `VacunaTriple` ("Triple felina", $11000).
3. **Singleton** `Tarifario` con un recargo a domicilio de $5000 y un método `obtenerRecargoDomicilio()`.
4. **Factory** `FabricaVacunas` con `static crear(tipo)`, donde tipo es `"antirrabica"` | `"quintuple"` | `"triple"`. **Nadie más** hace `new` de las vacunas.
5. Función `presupuesto(tipos, aDomicilio): number` que muestra cada vacuna y devuelve el total. Si es a domicilio, suma el recargo **leído del Singleton** (no escribas 5000 en la función).

**Salida esperada:**
```
Presupuesto para Firulais:
- Antirrábica: $9000
- Quíntuple: $14000
Total: $28000
Presupuesto para Michi:
- Triple felina: $11000
Total: $11000
¿Mismo tarifario? true
```

---

## Ejercicio 3 · Recordatorios (refactor OCP + DIP)

El archivo [inicio/ej3.ts](inicio/ej3.ts) **funciona**, pero:
- tiene un `if` que crece con cada canal nuevo,
- crea su `AgendaArchivo` con `new` adentro del constructor.

1. **Commit del original** antes de tocarlo.
2. Aplicá **OCP** con una interface `CanalRecordatorio` y una clase por canal.
3. Aplicá **DIP** con una interface `Agenda` recibida por constructor.
4. Arriba de **cada interface**, un comentario con el principio: `// OCP: ...` / `// DIP: ...`.
5. La salida tiene que ser **idéntica** a la original:
```
[agenda] recordatorio para Firulais
Email a Ana: Firulais tiene vacuna pendiente
[agenda] recordatorio para Michi
SMS a Beto: vacuna de Michi
[agenda] recordatorio para Pepe
Llamando a Caro por Pepe...
```

---

## Para corregirte
- `npx tsc` sin errores.
- Comparar tu salida con la esperada (en VS Code: guardá las dos en `.txt`, seleccioná los dos archivos → clic derecho → *Compare Selected*).
- Recién ahí, abrí `solucion/`.

## Más simulacros del primer parcial
En [material-extra-del-curso/1er-cuatrimestre/tema-04-primer-parcial-integradores](../../material-extra-del-curso/1er-cuatrimestre/tema-04-primer-parcial-integradores/) están el **Tema B original** (Hotel · Envíos · Notificaciones) resuelto y los simulacros **Tema A (Cine)** y **Tema C (Viajes)**.
