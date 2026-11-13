# Respuestas · Laboratorio de pruebas (U4)

## Actividad 1
Primera ejecución: **5 pruebas, pasan 4 y falla 1**. Son **3 unitarias** (`tests/precios.test.ts`, llaman a la función directamente) y **2 de integración** (`tests/api.test.ts`, envían una petición HTTP con Supertest y participan la ruta y el servicio).

## Actividad 2
Falla **"rechaza descuentos superiores al 100 %"** con `expected function to throw an error, but it didn't`. Esperaba que `calcularPrecioFinal(1000, 150)` lanzara un `RangeError`; la función no lanzó nada.

## Actividad 3
El error está en la **implementación**: el requisito dice que el descuento debe estar entre 0 y 100 y que si no, se lanza `RangeError`. La prueba coincide con el requisito. Hoy la función hace la cuenta sin validar y devuelve **−500** (un precio negativo).

## Actividad 4
```ts
export function calcularPrecioFinal(precio: number, descuento: number): number {
  if (!Number.isFinite(precio) || precio < 0) {
    throw new RangeError('El precio debe ser un número mayor o igual a 0');
  }
  if (!Number.isFinite(descuento) || descuento < 0 || descuento > 100) {
    throw new RangeError('El descuento debe estar entre 0 y 100');
  }
  return precio - (precio * descuento) / 100;
}
```
- `RangeError` porque el dato es del **tipo correcto** (`number`) pero está **fuera del rango** permitido.
- `Number.isFinite` también rechaza `NaN` e `Infinity`, que `< 0` o `> 100` solos no atrapan (`NaN < 0` y `NaN > 100` son `false`).
- Se vuelve a ejecutar **todo** el conjunto para comprobar que el arreglo no rompió otro caso.

## Actividad 5 y 6
Ver `tests/precios.test.ts` (6 unitarias) y `tests/api.test.ts` (3 de integración). La del 150 % es de **integración** porque participan la ruta de Express, el middleware que captura el `RangeError` y el servicio de cálculo. Funciona porque `src/app.ts` traduce el `RangeError` a **400** con `{ error }`.

Resultado final: **2 archivos, 9 pruebas, todas pasan**; `typecheck` sin errores.

## Actividad 7
1. `npm test` **ejecuta** el código y comprueba resultados (por ejemplo, que 150 % lance error). `npm run typecheck` (`tsc --noEmit`) **analiza los tipos sin ejecutar** (por ejemplo, que no se pase un `string` donde va un `number`).
2. Casos límite e inválidos que nadie prueba a mano, como un 150 % o un precio negativo. El programa corría sin errores y aun así no cumplía la regla de negocio.
3. Para confirmar que el cambio arregló lo que fallaba y **no rompió** nada que antes andaba.
4. La manual la hace una persona y sirve para explorar; la automatizada está escrita en código, se repite igual cada vez y puede correr en integración continua.
5. Los habituales confirman que funciona lo esperado; los inválidos confirman que el sistema **se defiende** de lo que no debería aceptar.
6. Si se llamara directamente, el error saltaría **antes** de que Vitest pueda inspeccionarlo y el test se rompería en vez de comprobar el error.

## Opcional
`npm ci` instala **exactamente** las versiones del `package-lock.json` (instalación reproducible) y falla si el lock no coincide con el `package.json`. `npm install` puede actualizar versiones dentro de los rangos.
