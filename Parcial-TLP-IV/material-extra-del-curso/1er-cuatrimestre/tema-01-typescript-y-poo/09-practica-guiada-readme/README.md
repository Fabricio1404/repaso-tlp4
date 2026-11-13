# Práctica guiada · Tema 1 · Veterinaria "Patitas"

> **Modalidad:** igual que en el parcial. Te dan un proyecto con código **ya hecho por otra persona**, que funciona a medias, tiene **defectos de diseño** y partes **sin terminar**. Tenés que **leerlo, analizarlo, corregirlo y completarlo**.
> **Tiempo sugerido:** 60 minutos. **Trabajá en la carpeta `inicio/`.** No abras `solucion/` hasta terminar.

## 1. Contexto

La veterinaria registra mascotas (perros y gatos), las atiende y cobra cada consulta. El costo base depende de la especie: **Perro $8000**, **Gato $7000**. Las mascotas de **10 años o más** pagan un **recargo geriátrico del 20 %**.

## 2. Archivos

```
inicio/
├── mascota.ts       ← Mascota (abstracta), Perro, Gato, tipos Especie y Consulta
├── veterinaria.ts   ← Veterinaria
└── main.ts          ← bloque de prueba (NO cambies la lógica, solo descomentá lo indicado)
```

Ejecutar: `node tema-01-typescript-y-poo/09-practica-guiada-readme/inicio/main.ts` (desde `1er-cuatrimestre/`).
Verificar tipos: `npx tsc` (desde `1er-cuatrimestre/`).

## 3. Requisitos de negocio

| Regla | Descripción |
|---|---|
| **R1** | Cada mascota tiene un `id` automático (1, 2, 3...) y un `nombre` que no cambian nunca. |
| **R2** | La edad es un **entero entre 0 y 30**. Si no, `Error("Edad inválida")`. Vale también al crear la mascota. |
| **R3** | El historial de consultas de una mascota **solo** se modifica cuando la veterinaria la atiende. Nadie de afuera puede agregar, quitar ni cambiar consultas. |
| **R4** | El costo de una consulta lo determina **la propia mascota** (base de su especie + recargo geriátrico). |
| **R5** | Agregar una especie nueva **no** debe obligar a modificar `Veterinaria`. |
| **R6** | El total de atenciones es de **todas** las veterinarias y **no** se puede modificar desde afuera. |
| **R7** | No puede haber dos pacientes con el mismo nombre y la misma especie. |

## 4. Consigna

### Tarea 1 · Análisis (escribilo en un archivo `ANALISIS.md`)
Antes de tocar código, encontrá **4 defectos** del código actual. Para cada uno indicá: archivo y línea, qué regla incumple (R1 a R7) y qué pilar de la POO viola (abstracción, encapsulamiento, herencia, polimorfismo). Pistas de dónde mirar: atributos públicos, lo que devuelve un método, un `if` con `instanceof`, un `static`.

### Tarea 2 · Corrección
Corregí los 4 defectos **sin cambiar el comportamiento esperado** (la salida de abajo).
- Si un atributo pasa a ser privado y se usa desde afuera para leer, agregá un getter.
- Si corregís el `static`, en `main.ts` vas a tener que cambiar `Veterinaria.totalAtenciones` por `Veterinaria.totalAtenciones()`.

### Tarea 3 · Extensión
Agregá la especie **Conejo** (costo base $6000) **sin modificar `veterinaria.ts`** (R5). Descomentá las líneas `[TAREA 3]` de `main.ts`.

### Tarea 4 · Completar los TODO de `veterinaria.ts`
- `facturacion(): number` → suma el costo de **todas** las consultas de **todos** los pacientes.
- `pacientesPorEspecie(especie): Mascota[]`.

## 5. Salida esperada (al terminar las 4 tareas)

```
Toby ya es paciente
[
  '#1 Perro Toby (3 años)',
  '#2 Gato Michi (12 años)',
  '#3 Conejo Copo (1 años)'
]
Toby paga $8000
Michi paga $8400
Copo paga $6000
No existe el paciente #99
Edad inválida
Consultas de Toby: 2
Facturación: $30400
Gatos: Michi
Atenciones: 4
```

Fijate en dos líneas que hoy salen **distintas** y te delatan los defectos:
- `Edad inválida` hoy **no aparece** (la edad −1 se acepta en silencio).
- `Consultas de Toby` hoy da **3** (el `push` del bloque de prueba metió una consulta falsa en el historial real).

## 6. Checklist antes de entregar

- [ ] `npx tsc` sin errores.
- [ ] La salida coincide **carácter por carácter** (incluidas tildes y espacios).
- [ ] No queda ningún `instanceof` en `veterinaria.ts`.
- [ ] `veterinaria.ts` no se modificó para agregar Conejo (podés comprobarlo con `git diff`).
- [ ] Ningún atributo con regla de negocio es público.
- [ ] Ningún método devuelve una lista interna.
- [ ] Sin `any`, sin `enum`, sin parameter properties.
- [ ] `ANALISIS.md` con los 4 defectos.

## 7. Commits sugeridos

```
chore: código original de la veterinaria
docs: análisis de defectos
refactor: encapsular edad e historial
refactor: costo polimórfico por especie
feat: especie Conejo
feat: facturación y filtro por especie
```
