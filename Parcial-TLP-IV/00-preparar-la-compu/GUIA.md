# 00 · Preparar la compu (leer una sola vez)

Antes de programar hay que entender **con qué herramientas** se trabaja y **qué hace cada archivo de configuración**. En el parcial te pueden preguntar por qué `npx tsc` da error o por qué `node archivo.ts` funciona sin compilar.

---

## 1. Las herramientas

| Herramienta | ¿Qué es? | ¿Para qué la usamos? |
|---|---|---|
| **Node.js** | Un programa que ejecuta JavaScript **fuera del navegador** | Correr nuestro código, nuestras APIs y nuestros tests |
| **npm** | El "almacén de librerías" de Node (viene incluido) | Instalar TypeScript, Vitest, Express... |
| **TypeScript** | JavaScript **con tipos** | Que el editor nos avise de errores **antes** de ejecutar |
| **VS Code** | Editor de código | Escribir código y ver los errores subrayados en rojo |
| **Git** | Control de versiones | Guardar "fotos" (commits) del proyecto; el parcial exige commits |

### ¿Qué es JavaScript y qué agrega TypeScript?

JavaScript es el lenguaje de la web. Es **dinámico**: una variable puede ser un número y después un texto, y nadie se queja hasta que el programa se rompe.

```js
let precio = 100;
precio = "cien";          // JavaScript lo permite
console.log(precio * 2);  // NaN  ← error silencioso
```

TypeScript le agrega **tipos**: le decís qué clase de dato guarda cada variable y el **compilador** (`tsc`) revisa todo antes de ejecutar.

```ts
let precio: number = 100;
precio = "cien";   // ❌ Error de TypeScript: Type 'string' is not assignable to type 'number'
```

> **Idea clave:** los tipos **no existen al ejecutar**. TypeScript los usa para revisar y después se "borran". Lo que corre es JavaScript.

### ¿Cómo ejecuta Node un archivo `.ts`?

Desde Node 22.18 (y Node 24), Node hace **type stripping**: borra los tipos del archivo y ejecuta lo que queda. **No revisa** si los tipos están bien. Por eso hay **dos comandos distintos**:

| Comando | Qué hace | ¿Revisa tipos? |
|---|---|---|
| `node archivo.ts` | Borra los tipos y **ejecuta** | ❌ No |
| `npx tsc` | **Revisa** los tipos de todo el proyecto (no ejecuta nada) | ✅ Sí |

En el parcial se exige que **`npx tsc` termine sin errores**. Un archivo puede ejecutarse bien con `node` y aun así tener errores de tipos.

---

## 2. Instalar

1. Descargá Node.js LTS desde nodejs.org (versión 22.18 o superior; ideal 24).
2. Abrí una terminal (en VS Code: menú **Terminal → New Terminal**) y comprobá:

```bash
node --version   # v24.x.x  (o v22.18 o superior)
npm --version    # 10.x o 11.x
```

Si dice "no se reconoce como comando", cerrá y volvé a abrir VS Code (o reiniciá la compu) para que tome la instalación.

---

## 3. Crear un proyecto desde cero (como en el parcial)

Estos son los pasos que pide la cátedra. Hacelos al menos una vez a mano:

```bash
mkdir mi-parcial
cd mi-parcial
npm init -y                 # 1. crea package.json
npm i -D typescript         # 2. instala TypeScript solo para desarrollo
# 3. editar package.json y agregar  "type": "module"
# 4. crear tsconfig.json (ver abajo)
node ej1.ts                 # 5. ejecuta
npx tsc                     # 6. verifica tipos
```

### 3.1 `package.json`, explicado línea por línea

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

- `"name"` / `"version"`: identifican el proyecto.
- `"type": "module"`: los archivos usan **módulos ES** (`import` / `export`). Además hace que **cada archivo sea independiente**: dos archivos pueden tener una `class Producto` cada uno sin chocar.
- `"devDependencies"`: librerías que solo se usan **mientras desarrollás** (TypeScript solo revisa; en producción no hace falta).
- `npm i -D` es la forma corta de `npm install --save-dev`.
- `~5.9.3` significa "la 5.9.x más nueva, pero no la 5.10".

### 3.2 `tsconfig.json`, explicado línea por línea

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

| Opción | Qué hace | Por qué importa |
|---|---|---|
| `strict` | Activa todas las revisiones estrictas | Obliga a inicializar atributos, a manejar `null`, prohíbe `any` implícito |
| `noEmit` | `tsc` **no genera** archivos `.js` | Solo lo usamos para revisar; ejecuta Node |
| `erasableSyntaxOnly` | Solo permite sintaxis que se pueda **borrar** | Por esto están **prohibidos** `enum` y parameter properties (generan código JS, no se pueden borrar) |
| `allowImportingTsExtensions` | Permite `import ... from "./x.ts"` | Node necesita la extensión real del archivo |
| `skipLibCheck` | No revisa los tipos de las librerías | Más rápido |
| `target` | Versión de JavaScript destino | ES2022 tiene clases modernas, `#privados`, etc. |
| `module` / `moduleResolution` | Cómo se resuelven los `import` | `nodenext` = como lo hace Node de verdad |

### 3.3 Las reglas de código del examen (primer cuatrimestre)

1. `npx tsc` **sin errores**.
2. **Prohibido** `enum` → se usa una **unión de literales**: `type Estado = "libre" | "ocupado"`.
3. **Prohibido** parameter properties (`constructor(private nombre: string) {}`) → se usa la **forma larga**:
   ```ts
   class Persona {
     private nombre: string;           // 1. se declara
     constructor(nombre: string) {
       this.nombre = nombre;           // 2. se asigna con this
     }
   }
   ```
4. **Prohibido** `any` (apaga la revisión de tipos). Si no sabés el tipo, se usa `unknown`.
5. **Cada archivo termina con un bloque de prueba** que muestra la salida por consola.
6. La **salida tiene que coincidir exactamente** con la esperada, **incluidas las tildes y los espacios**.

---

## 4. Este proyecto de estudio

En la raíz de `Parcial-TLP-IV/` ya hay un `package.json` y un `tsconfig.json` como los de la cátedra que cubren los temas 01, 02 y 03.

```bash
cd Parcial-TLP-IV
npm install          # una sola vez: instala TypeScript en node_modules/
npx tsc              # revisa TODOS los .ts de los temas 01–03
node 01-typescript-y-poo/soluciones/ej1-libro.ts
```

El tema 04 (testing) es **otro proyecto** con su propio `package.json`, porque usa Vitest, Express y Supertest (así es en el segundo parcial).

---

## 5. Git en 5 minutos (lo que pide el parcial)

Git guarda "fotos" del proyecto llamadas **commits**. En el parcial, cada ejercicio tiene un **punto de control**: si no hay commit, el ejercicio se considera no entregado.

```bash
git init                                  # una vez: crea el repositorio
git add .                                 # prepara todos los cambios
git commit -m "chore: configuración inicial"   # saca la foto
git log --oneline                         # lista de commits
git remote add origin <url-del-repo>      # conecta con GitHub (una vez)
git push -u origin main                   # sube los commits
```

Mensajes típicos (convención "conventional commits"):

| Prefijo | Para qué | Ejemplo |
|---|---|---|
| `chore:` | Configuración, tareas sin lógica | `chore: configuración inicial` |
| `feat:` | Funcionalidad nueva | `feat(ej1): sistema de hotel` |
| `refactor:` | Cambiar estructura sin cambiar comportamiento | `refactor(ej3): aplicar OCP y DIP` |
| `fix:` | Corregir un error | `fix: validar descuento negativo` |
| `docs:` | Documentación | `docs: entrega final` |
| `test:` | Agregar o corregir tests | `test: casos límite de stock` |

Antes de hacer commit: **nunca** subas `node_modules/` (pesa muchísimo y se regenera con `npm install`). Creá un archivo `.gitignore` con:

```
node_modules/
.env
```

---

## 6. Errores típicos al empezar

| Error | Causa | Solución |
|---|---|---|
| `Cannot find module 'typescript'` | No instalaste dependencias | `npm install` |
| `'tsc' no se reconoce...` | Escribiste `tsc` en vez de `npx tsc` | Usá `npx tsc` |
| `SyntaxError: Cannot use import statement outside a module` | Falta `"type": "module"` | Agregalo al `package.json` |
| `TS5097: An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled` | Falta esa opción en `tsconfig` | Agregala |
| `TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled` | Usaste `enum` o parameter properties | Unión de literales / constructor largo |
| `Property 'x' has no initializer and is not definitely assigned in the constructor` | Declaraste un atributo y no lo asignaste en el constructor | Asignalo con `this.x = ...` |
| `Duplicate identifier 'Producto'` | Falta `"type": "module"` y los archivos chocan | Agregar `"type": "module"` |

---

## 📌 Lo que tenés que saber sí o sí

- `node archivo.ts` **ejecuta** sin revisar tipos; `npx tsc` **revisa** sin ejecutar.
- `"type": "module"` → módulos ES e independencia entre archivos.
- `erasableSyntaxOnly` → prohíbe `enum` y parameter properties.
- `noEmit` → `tsc` no genera `.js`.
- `devDependencies` → solo para desarrollo (`npm i -D`).
- Nunca subir `node_modules/` ni `.env`.
