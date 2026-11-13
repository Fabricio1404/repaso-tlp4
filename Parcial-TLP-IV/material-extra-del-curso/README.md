# Taller de Programación IV: curso completo de estudio (TypeScript)

Material de estudio armado tema por tema a partir de la **guía de actividades para el integrador** y del **segundo parcial (Tema B, Biblioteca)**.
La idea es que cada tema se pueda estudiar como si fuera una clase: primero la **teoría**, después **dónde se ve esa teoría en el código** (línea por línea), y después **ejercicios en tres niveles** con su resolución explicada. Al final de cada tema hay una **práctica con README**, igual que en los exámenes.

---

## Estructura

```
TLP-IV-Curso-Completo/
├── README.md                      ← este archivo (empezá acá)
├── 00-entorno/                    ← cómo configurar y ejecutar todo (leer primero)
├── 1er-cuatrimestre/
│   ├── package.json / tsconfig.json   ← el proyecto base de la cátedra (verifica TODO el cuatrimestre con npx tsc)
│   ├── tema-01-typescript-y-poo/
│   ├── tema-02-patrones-de-diseno/
│   ├── tema-03-principios-solid/
│   └── tema-04-primer-parcial-integradores/   ← POO + patrones + SOLID mezclados
├── 2do-cuatrimestre/
│   ├── tema-05-calidad-y-pruebas/             ← Vitest, Supertest, dobles de prueba
│   ├── tema-06-integrador-fullstack/          ← Express en capas, JWT, permisos, Sequelize, Docker, 4 patrones
│   ├── tema-07-practica-extra-torneo-y-repaso/
│   └── tema-08-segundo-parcial-integradores/  ← el parcial de la Biblioteca resuelto + simulacros nuevos
└── repaso-final/                  ← preguntas de múltiple opción, glosario y trampas típicas
```

### Qué tiene cada tema

| Carpeta | Qué es | Cómo usarla |
|---|---|---|
| `01-teoria.md` | Todos los conceptos del tema, explicados desde cero | Leela entera antes de tocar código |
| `02-ejemplos/` | Código `.ts` comentado con marcas `📌 [CONCEPTO]` | Abrí el `MAPA-DE-CONCEPTOS.md`: te dice **en qué línea** de qué archivo aparece cada concepto |
| `03-ejercicios-faciles/` | Consignas cortas **sin pistas** + archivos `.ts` incompletos | Resolvé sin mirar la solución |
| `04-ejercicios-faciles-resueltos/` | La resolución + `EXPLICACION.md` | Compará con lo tuyo |
| `05-ejercicios-medios/` | Ídem, más integración entre conceptos | |
| `06-ejercicios-medios-resueltos/` | | |
| `07-ejercicios-dificiles/` | Ejercicios tipo examen | |
| `08-ejercicios-dificiles-resueltos/` | | |
| `09-practica-guiada-readme/` | Un proyecto con `README.md` estilo examen: requisitos, reglas, checklist, código base (`inicio/`) y `solucion/` | Hacelo como si fuera el parcial, con tiempo |

> **Regla de oro para estudiar:** leé la consigna, resolvela vos en el archivo `.ts` **sin mirar**, ejecutala, y recién después abrí la resolución. Si leés la solución primero, el examen te va a parecer más fácil de lo que es.

---

## Orden recomendado

1. `00-entorno/README.md` (15 minutos, una sola vez).
2. Primer cuatrimestre en orden: tema 1 → 2 → 3 → 4. El tema 4 **solo** tiene sentido después de los tres anteriores.
3. Segundo cuatrimestre: tema 5 → 6 → 7 → 8. El tema 8 es el simulacro del segundo parcial.
4. `repaso-final/` la semana del examen.

## Las reglas de código del examen (primer cuatrimestre)

Estas reglas vienen de la guía de la cátedra. Todo el código de `1er-cuatrimestre/` las respeta:

- `npx tsc` tiene que terminar **sin errores**.
- **No** se permite `enum`, **ni** parameter properties (`constructor(private x: string)`), **ni** `any`.
- Constructores en **forma larga**: se declara el atributo y se asigna con `this.`.
- **Cada archivo termina con un bloque de prueba** que muestra la salida por consola.

En el segundo cuatrimestre el código de la cátedra (por ejemplo el parcial de la Biblioteca) **sí** usa parameter properties y `vitest`. Eso se explica en `2do-cuatrimestre/README.md`.

## Cómo ejecutar (resumen)

```bash
# Primer cuatrimestre (una sola vez)
cd 1er-cuatrimestre
npm install
npx tsc                                          # verifica tipos de TODOS los archivos
node tema-01-typescript-y-poo/02-ejemplos/01-abstraccion-producto.ts   # ejecuta un archivo

# Segundo cuatrimestre: cada proyecto tiene su propio package.json
cd 2do-cuatrimestre/tema-05-calidad-y-pruebas/02-ejemplos/api-precios
npm install
npm test
npm run typecheck
```

Requisito: **Node.js 22.18 o superior** (ejecuta `.ts` directamente, sin compilar). Ver `00-entorno/README.md`.

## Verificación

Todo el material se compiló y ejecutó antes de entregarlo:

| Parte | Resultado |
|---|---|
| Primer cuatrimestre | `npx tsc` sin errores en todos los archivos; los 67 archivos de ejemplos y resoluciones se ejecutaron con `node` y producen la salida esperada que figura en cada consigna |
| Segundo cuatrimestre: proyectos resueltos y de ejemplo | `tsc --noEmit` sin errores y **todos** los tests en verde (por ejemplo: parcial Tema B resuelto 26/26, proyecto de referencia del integrador 11/11, simulacro Farmacia 26/26) |
| Segundo cuatrimestre: proyectos de inicio | Compilan; sus tests **fallan o quedan en `it.todo` a propósito** (igual que el parcial) |
| Integrador: Sequelize | Los repositorios se ejecutaron contra una base SQLite en memoria (misma API); PostgreSQL y `docker compose up` no se pudieron correr en el entorno de armado: probalos vos con Docker |
| Integrador: frontend | `tsc` y `vite build` sin errores |

Los archivos de ejercicios **sin resolver** compilan, pero al ejecutarlos muestran `TODO` (o no imprimen nada porque el bloque de prueba está comentado) hasta que los completes.

## Requisitos para el segundo cuatrimestre
Node.js 22.18+ (ideal 24), npm, y para el integrador Docker Desktop (o Docker Engine + Compose v2).
