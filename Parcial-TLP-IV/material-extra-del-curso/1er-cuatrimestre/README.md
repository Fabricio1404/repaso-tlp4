# Primer cuatrimestre · POO, patrones de diseño y SOLID (TypeScript)

| Tema | Carpeta | Qué se ve |
|---|---|---|
| 1 | `tema-01-typescript-y-poo/` | Tipos, clases, constructor en forma larga, los 4 pilares, getters/setters, abstractas, interfaces, `static`, `readonly`, composición, errores, copias defensivas |
| 2 | `tema-02-patrones-de-diseno/` | Singleton, Factory Method, Observer, Adapter (y combinados) |
| 3 | `tema-03-principios-solid/` | SRP, OCP, LSP, ISP, DIP: señales y refactor sin cambiar la salida |
| 4 | `tema-04-primer-parcial-integradores/` | El parcial Tema B resuelto, integradores de 2, 3 y todos los temas, y **2 simulacros completos** |

## Cómo ejecutar
```bash
cd 1er-cuatrimestre
npm install                 # una sola vez (instala TypeScript local)
npx tsc                     # verifica TODOS los archivos del cuatrimestre
node tema-01-typescript-y-poo/02-ejemplos/01-abstraccion-producto.ts
```

Los archivos de ejercicios sin resolver compilan pero, al ejecutarlos, muestran `TODO` o no imprimen nada (el bloque de prueba está comentado) hasta que los completes.

## Convención de las marcas en el código
```ts
// 📌 [ENCAPSULAMIENTO] saldo es private: desde afuera NO se puede hacer cuenta.saldo = -999
private saldo: number;
```
La marca describe **la línea (o el bloque) que viene abajo**. Cada carpeta de ejemplos y de resoluciones tiene un `MAPA-DE-CONCEPTOS.md` generado a partir de estas marcas con el número de línea exacto.
