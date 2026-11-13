# Segundo cuatrimestre · Calidad y pruebas, integrador full stack y segundo parcial

| Tema | Carpeta | Qué se ve |
|---|---|---|
| 5 | `tema-05-calidad-y-pruebas/` | Niveles de prueba, Vitest a fondo, casos límite e inválidos, interpretar fallas, dobles de prueba (`vi.fn`), Supertest, TDD, CI. Incluye el **laboratorio de precios** de la cátedra |
| 6 | `tema-06-integrador-fullstack/` | Express en capas, bcrypt + JWT, permisos `recurso:accion`, Sequelize + PostgreSQL, Docker Compose, los 4 patrones en un flujo, React. Incluye un **proyecto de referencia completo** (Biblioteca) |
| 7 | `tema-07-practica-extra-torneo-y-repaso/` | El TP del Torneo Deportivo (POO) con pruebas, extensiones con OCP, Factory y Observer, y el repaso teórico del año |
| 8 | `tema-08-segundo-parcial-integradores/` | El **segundo parcial Tema B (Biblioteca) resuelto**, ejercicios que testean patrones y SOLID, y un **simulacro completo** (Tema A · Farmacia) |

## Cómo se ejecutan
Cada proyecto del segundo cuatrimestre es **independiente** (tiene su propio `package.json`), igual que en el parcial:
```bash
cd <carpeta-del-proyecto>
npm install
npm test
npm run typecheck
```
Las carpetas de **inicio** (ejercicios sin resolver) tienen tests que **fallan a propósito** o quedan en `it.todo`. Las de **resueltos/solución** pasan todas.

## Diferencias con el primer cuatrimestre
- `tsconfig.json` con `moduleResolution: "Bundler"`: los imports van **sin extensión** (`from './app'`). Vitest y `tsx` los resuelven.
- El código de la cátedra usa **parameter properties** (`constructor(private readonly service: LibroService) {}`): en estos proyectos está permitido porque el `tsconfig` no tiene `erasableSyntaxOnly`. En el código nuevo de este material se usa la forma larga igual (funciona en los dos).
- Excepción: el **Tema 7** (Torneo) mantiene las reglas del primer cuatrimestre (`erasableSyntaxOnly`, imports con `.ts`).
