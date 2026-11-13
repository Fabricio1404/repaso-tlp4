# 00 · Entorno de trabajo (leer una sola vez)

Antes de estudiar código conviene entender **qué hace cada archivo de configuración**, porque en el examen te pueden preguntar por qué `npx tsc` da error, o por qué `node archivo.ts` funciona aunque nunca compilaste.

## 1. Requisitos

| Herramienta | Versión | Para qué |
|---|---|---|
| Node.js | 22.18 o superior (ideal 24) | Ejecuta JavaScript **y también `.ts` directamente** ("type stripping") |
| npm | viene con Node | Instala paquetes |
| Git | cualquiera | Puntos de control del parcial |
| VS Code | recomendado | Muestra los errores de tipos mientras escribís |

Comprobar: `node --version` y `npm --version`.

## 2. El proyecto base de la cátedra (primer cuatrimestre)

Pasos que da la guía, explicados:

```bash
mkdir mi-parcial && cd mi-parcial
npm init -y                 # crea package.json
# editar package.json: "type": "module"
npm i -D typescript         # TypeScript instalado LOCAL (devDependency)
# crear tsconfig.json (ver abajo)
node ej1.ts                 # ejecuta
npx tsc                     # verifica tipos (no genera .js)
```

### 2.1 `package.json`

```json
{
  "name": "mi-parcial",
  "version": "1.0.0",
  "type": "module",
  "devDependencies": {
    "typescript": "~5.9.3"
  }
}
```

- `"type": "module"` → los archivos se tratan como **módulos ES** (`import` / `export`). Además, para TypeScript cada archivo pasa a ser un módulo independiente: dos archivos pueden tener una `class Producto` cada uno sin chocar.
- `devDependencies` → dependencias de **desarrollo**: TypeScript solo se usa para verificar, no hace falta en producción.
- `npm i -D` = `npm install --save-dev`.
- `npx tsc` usa el `tsc` instalado **en el proyecto** (`node_modules/.bin/tsc`), no uno global.

### 2.2 `tsconfig.json` (el de la cátedra)

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "erasableSyntaxOnly": true,
    "allowImportingTsExtensions": true,
    "skipLibCheck": true,
    "target": "es2022",
    "module": "nodenext",
    "moduleResolution": "nodenext"
  }
}
```

| Opción | Qué hace | Por qué importa en el examen |
|---|---|---|
| `strict` | Activa todos los chequeos estrictos (`strictNullChecks`, `noImplicitAny`, `strictPropertyInitialization`, ...) | Si declarás `nombre: string;` y no lo asignás en el constructor → error. Si un parámetro no tiene tipo → error (`any` implícito). |
| `noEmit` | `tsc` **solo verifica**, no genera `.js` | Por eso no aparece ninguna carpeta `dist/`. |
| `erasableSyntaxOnly` | Solo permite sintaxis de TypeScript que se pueda **borrar** sin dejar código JS | **Esta es la razón por la que están prohibidos `enum` y las parameter properties**: ambos generan código JavaScript real, no se pueden "borrar". Node ejecuta `.ts` borrando los tipos, así que no sabría qué hacer con un `enum`. |
| `allowImportingTsExtensions` | Permite `import { X } from "./x.ts"` | Node necesita la extensión real del archivo. |
| `skipLibCheck` | No revisa los `.d.ts` de las librerías | Más rápido y evita errores ajenos. |
| `target: es2022` | Qué versión de JavaScript se asume | Permite `class` con campos, `??`, `?.`, etc. |
| `module` / `moduleResolution: nodenext` | Resuelve imports como lo hace Node con ESM | Obliga a poner la extensión en los imports relativos. |

### 2.3 Ejecutar vs. verificar (pregunta típica)

- `node archivo.ts` → Node **borra los tipos** y ejecuta. **No verifica nada**: si pasás un `string` donde va un `number`, Node lo ejecuta igual.
- `npx tsc` → **verifica tipos** de todo el proyecto, sin ejecutar.
- Por eso el examen pide las dos cosas: que `npx tsc` termine sin errores **y** que la salida por consola sea la esperada.

### 2.4 Imports entre archivos (si un ejercicio tiene varios archivos)

```ts
// modelos.ts
export interface Equipo { nombre: string; }
export class Inventario { /* ... */ }

// main.ts
import type { Equipo } from "./modelos.ts";   // ← solo un TIPO: usar "import type"
import { Inventario } from "./modelos.ts";     // ← una CLASE (existe en ejecución)
```

`import type` es obligatorio para interfaces cuando ejecutás con Node: las interfaces se borran, y si las importás como valor, Node falla con *"does not provide an export named ..."*.

## 3. Segundo cuatrimestre: proyectos con tests

Los proyectos del segundo cuatrimestre (como el parcial de la Biblioteca) traen su propio `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "start": "tsx src/server.ts",
  "test": "vitest run",
  "test:watch": "vitest",
  "typecheck": "tsc --noEmit"
}
```

| Comando | Qué hace |
|---|---|
| `npm install` | Instala lo que dice `package.json` (crea `node_modules/`) |
| `npm test` | Ejecuta **todos** los tests una vez (Vitest) |
| `npm run test:watch` | Ejecuta los tests y los repite cada vez que guardás |
| `npm run typecheck` | `tsc --noEmit`: verifica tipos sin generar JS |
| `npm run dev` | Levanta la API con recarga automática (`tsx watch`) |

Diferencias con el primer cuatrimestre:
- `moduleResolution: "Bundler"` → los imports van **sin** extensión (`from './app'`). Vitest y tsx resuelven solos.
- Se usa `tsx` para ejecutar (un ejecutor de TypeScript) en vez de `node` directo.
- El código de la cátedra usa parameter properties (`constructor(private readonly repo: LibroRepository) {}`), que **no** está prohibido en ese parcial porque el `tsconfig` no tiene `erasableSyntaxOnly`.

## 4. Git: los puntos de control (se repiten en cada parcial)

| # | Momento | Mensaje del commit |
|---|---|---|
| 0 | Proyecto configurado y `npx tsc` corriendo | `chore: configuración inicial` |
| 1 | Ejercicio 1 terminado | `feat(ej1): ejercicio 1 completo` |
| 2 | Ejercicio 2 terminado | `feat(ej2): ejercicio 2 completo` |
| 3 | Ejercicio 3 original, antes de refactorizar | `chore(ej3): código original` |
| 4 | Ejercicio 3 terminado | `refactor(ej3): ejercicio 3 completo` |
| 5 | `ENTREGA.md` con los ejercicios resueltos | `docs: entrega final` |

```bash
git init
git add .
git commit -m "chore: configuración inicial"
git remote add origin https://github.com/usuario/repo-privado.git
git push -u origin main
```

Formato de los mensajes (*Conventional Commits*): `tipo(alcance): descripción`. Tipos que usa la cátedra: `feat` (funcionalidad nueva), `fix` (corrección), `refactor` (cambia el diseño sin cambiar el comportamiento), `chore` (configuración, tareas), `docs` (documentación), `test` (tests).

> Sin el commit del punto de control, el ejercicio se considera **no entregado**. El repo es privado y tiene a los profesores como colaboradores.

## 5. `.gitignore` mínimo

```
node_modules/
coverage/
.env
dist/
```

`node_modules` **nunca** se sube: se regenera con `npm install`. `.env` tampoco (tiene secretos); se sube `.env.example`.
