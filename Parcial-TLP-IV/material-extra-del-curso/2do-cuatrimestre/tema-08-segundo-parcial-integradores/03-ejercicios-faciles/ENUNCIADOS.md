# Tema 8 · Ejercicios fáciles · Testear patrones

```bash
npm install
npm test     # 1 pasa y hay 8 "todo"
```
`src/patrones.ts` tiene un **Singleton**, una **Factory** y un **Adapter** ya implementados por otra persona. Escribí los tests de `tests/patrones.test.ts` (reemplazando cada `it.todo`) **a partir de las reglas**. Si un test correcto falla, encontraste un defecto: corregí el **código**.

| Regla | Descripción |
|---|---|
| **R1** | Descuentos: `ninguno` 0 %, `estudiante` 10 %, `jubilado` 20 %. La fábrica devuelve la clase correspondiente a cada tipo. |
| **R2** | Hay una única configuración de la tienda: envío gratis desde $50.000; costo de envío $3.000. |
| **R3** | `calcularTotal(monto, descuento)`: se aplica el descuento y, si el resultado es **$50.000 o más**, el envío es gratis; si no, se suman $3.000. |
| **R4** | El monto debe ser un número mayor a 0; si no, `RangeError`. |
| **R5** | La balanza vieja informa libras; el adapter devuelve kg = libras × 0,4536 **redondeado a 2 decimales**. |

Pistas de herramientas: `toBe` para comparar **referencias** (Singleton), `toBeInstanceOf` (Factory), `toBeCloseTo` para decimales, y un **stub** (objeto literal) para la balanza vieja: `{ pesoEnLibras: () => 10 }`.

Preguntas:
1. ¿Por qué para el Singleton conviene `toBe` y no `toEqual`?
2. ¿Qué desventaja del Singleton aparecería si `ConfiguracionTienda` guardara datos que los tests modifican?
3. ¿Qué te permitió probar el Adapter sin tener la balanza real?
