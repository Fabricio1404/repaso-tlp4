# Parcial TLP IV · Guía de estudio desde cero

Material pensado para alguien que **no sabe nada** de estos temas. Cada carpeta es un tema y siempre tiene la misma estructura:

```
NN-tema/
├── GUIA.md          ← la explicación completa, desde cero, con ejemplos
├── ejercicios/      ← consignas para practicar (sin la respuesta a la vista)
└── soluciones/      ← la resolución + explicación de POR QUÉ se resuelve así
```

> **Regla de oro:** leé la guía → hacé el ejercicio **sin mirar** → recién después abrí la solución y comparála con lo tuyo. Si leés la solución primero, el parcial te va a parecer más fácil de lo que es.

---

## Índice

| # | Carpeta | Tema | Tipo | Tiempo aprox. |
|---|---|---|---|---|
| 0 | [00-preparar-la-compu](00-preparar-la-compu/GUIA.md) | Node, npm, TypeScript, tsconfig, Git | Práctico | 30 min |
| 1 | [01-typescript-y-poo](01-typescript-y-poo/GUIA.md) | TypeScript, clases, los 4 pilares de la POO | Código | 4–6 h |
| 2 | [02-patrones-de-diseno](02-patrones-de-diseno/GUIA.md) | Singleton, Factory Method, Observer, Adapter | Código | 3–4 h |
| 3 | [03-principios-solid](03-principios-solid/GUIA.md) | SRP, OCP, LSP, ISP, DIP (refactors) | Código | 3–4 h |
| 4 | [04-testing-vitest](04-testing-vitest/GUIA.md) | **U4** Pruebas, Vitest, Supertest, dobles, TDD, CI + **tu parcial 2 (Tema B)** | Código | 5–7 h |
| 5 | [05-fullstack-express](05-fullstack-express/GUIA.md) | Express en capas, JWT, permisos, Sequelize, Docker | Código + teoría | 3 h |
| 6 | [06-arquitecturas](06-arquitecturas/GUIA.md) | **U3** Monolítica → microkernel | Teoría | 2–3 h |
| 7 | [07-ia-y-agentes](07-ia-y-agentes/GUIA.md) | **U5** LLM, agentes, contexto, MCP, skills, OpenCode | Teoría | 2–3 h |
| 8 | [08-cloud](08-cloud/GUIA.md) | **U6** IaaS/PaaS/SaaS, NIST, despliegue, Cloudflare, lab AWS | Teoría | 2–3 h |
| 9 | [09-criptografia-docker-openssl](09-criptografia-docker-openssl/GUIA.md) | Hash, AES, RSA, firma, TLS (⚠️ es de *Seminario III*, confirmá si entra) | Teoría + práctico | 2 h |
| 10 | [10-simulacros](10-simulacros/README.md) | Simulacro 1er parcial, simulacro 2do parcial, 60 preguntas, machete | Repaso | 4–5 h |
| + | [material-extra-del-curso](material-extra-del-curso/README.md) | El zip `TLP-IV-Curso-Completo` descomprimido: muchos más ejercicios por tema | Extra | — |

---

## Qué entra en cada parcial

| | Primer parcial | Segundo parcial |
|---|---|---|
| **Práctica** | POO + patrones + SOLID (temas 01–03). Formato: [simulacro Veterinaria](10-simulacros/primer-parcial-veterinaria/README.md) | **Solo testing** sobre una API en capas (tema 04). Formato: [tu Tema B](04-testing-vitest/ejercicios/parcial2-tema-b-biblioteca/README.md) |
| **Teoría** | POO, patrones, SOLID | Arquitecturas (U3), Testing (U4), IA (U5), Cloud (U6) |

---

## Orden recomendado (y por qué)

```
00 entorno
   │
01 POO ──► 02 Patrones ──► 03 SOLID          (cómo escribir buenas clases)
                             │
                             ▼
             04 Testing ──► 05 Full stack     (cómo probar y cómo está armada una API real)
                             │
                             ▼
          06 Arquitecturas ──► 08 Cloud       (cómo se organiza un sistema y dónde corre)
                             │
             07 IA ◄─────────┘                (cómo trabajar con IA sobre todo lo anterior)
                             │
                             ▼
                      10 Simulacros
```

- **Patrones** usan interfaces, herencia y polimorfismo → necesitás POO primero.
- **SOLID** se entiende mejor después de patrones (Observer, Adapter y Factory son SOLID aplicado).
- **Testing** se apoya en **DIP**: sin inyección de dependencias no hay dobles de prueba.
- **Arquitecturas, IA y Cloud** son teoría: se leen rápido, pero hay que memorizar definiciones y diferencias.

## Plan si tenés una semana

| Día | Qué hacer |
|---|---|
| 1 | 00 + 01 (guía + ejercicios 1 a 3) |
| 2 | 01 (ejercicios 4 y 5) + 02 |
| 3 | 03 + simulacro de primer parcial (Veterinaria) |
| 4 | **04 completo + tu parcial 2 con reloj** |
| 5 | 05 + 06 + simulacro Gimnasio |
| 6 | 07 + 08 (+ 09 si entra) |
| 7 | 60 preguntas del simulacro teórico + machete + repasar lo que fallaste |

## Plan si tenés dos o tres días
1. Leé los cuadros **"📌 Lo que tenés que saber sí o sí"** del final de cada guía.
2. Hacé **tu parcial 2** y el **simulacro Gimnasio** con reloj.
3. Hacé las **60 preguntas** y volvé a la guía de cada una que fallaste.
4. La noche anterior: [MACHETE.md](10-simulacros/MACHETE.md).

---

## Cómo ejecutar el código

```bash
# Temas 01, 02, 03 y el simulacro del primer parcial (una sola vez, en esta carpeta)
cd Parcial-TLP-IV
npm install
npx tsc                                              # revisa que TODO compile sin errores de tipos
node 01-typescript-y-poo/soluciones/ej1-libro.ts     # ejecuta un archivo

# Proyectos de testing (cada uno es independiente, con su package.json)
cd 04-testing-vitest/ejercicios/parcial2-tema-b-biblioteca
npm install
npm test
npm run typecheck
```

Requisito: **Node.js 22.18 o superior** (tenés la 24). Detalle en [00-preparar-la-compu/GUIA.md](00-preparar-la-compu/GUIA.md).

### Proyectos de testing incluidos
| Proyecto | Estado |
|---|---|
| `04-testing-vitest/ejercicios/parcial2-tema-b-biblioteca` | Tu parcial **sin resolver** (4 tests fallan a propósito) |
| `04-testing-vitest/soluciones/parcial2-tema-b-biblioteca-resuelto` | Resuelto: 26 tests en verde |
| `10-simulacros/segundo-parcial-gimnasio` | Simulacro **sin resolver** (4 tests fallan a propósito) |
| `10-simulacros/segundo-parcial-gimnasio-resuelto` | Resuelto: 25 tests en verde |
