# Práctica guiada · Tema 5 · Laboratorio de pruebas: API de precios

> Es el laboratorio de la U4 tal como lo describe la guía de la cátedra. La API Express tiene una función `calcularPrecioFinal` que **no valida nada**. La prueba que rechaza un descuento del 150 % **falla a propósito**: hay que diagnosticar, corregir y ampliar las pruebas.
> Trabajá en `inicio/`. Respondé en `RESPUESTAS.md` (creálo en `inicio/`).

```bash
cd inicio
npm install
npm test
npm run typecheck
```

## Estructura
```
inicio/
├── src/services/precios.ts      ← calcularPrecioFinal (el defecto está acá)
├── src/app.ts                   ← POST /api/precios/calcular; captura RangeError y responde 400 { error }
├── src/server.ts
├── tests/precios.test.ts        ← pruebas UNITARIAS
├── tests/api.test.ts            ← pruebas de INTEGRACIÓN (Supertest)
└── .github/workflows/pruebas.yml
```

## Requisito
`calcularPrecioFinal(precio, descuento)` devuelve `precio − precio × descuento / 100`.
- El **precio** debe ser un número finito **mayor o igual a 0**.
- El **descuento** debe ser un número finito **entre 0 y 100 inclusive**.
- Si no se cumple, lanza **`RangeError`**.
- La API responde **400** con un JSON que tiene la propiedad `error` cuando el servicio lanza `RangeError`.

## Actividades

### Actividad 1 · Primera ejecución
Ejecutá `npm test`. ¿Cuántas pruebas hay? ¿Cuántas pasan y cuántas fallan? ¿Cuáles son **unitarias** y cuáles de **integración**? ¿Cómo lo sabés?

### Actividad 2 · Leer la falla
Copiá el nombre de la prueba que falla y el mensaje de error. ¿Qué **esperaba** la prueba y qué **obtuvo**?

### Actividad 3 · Diagnóstico
¿El error está en la implementación, en la expectativa de la prueba o en un requisito poco claro? Justificá con el requisito. ¿Qué devuelve hoy `calcularPrecioFinal(1000, 150)`?

### Actividad 4 · Corrección
Corregí `src/services/precios.ts` para que cumpla el requisito. **No modifiques la prueba.** Explicá por qué usás `RangeError` y por qué `Number.isFinite`. Después, volvé a ejecutar **todo** el conjunto.

### Actividad 5 · Pruebas unitarias nuevas (`tests/precios.test.ts`)
Agregá, como mínimo:
- con un descuento del 100 % el precio final es cero (caso límite),
- rechaza un precio negativo (inválido),
- rechaza un descuento negativo (inválido).

### Actividad 6 · Prueba de integración HTTP 400 (`tests/api.test.ts`)
Agregá: *"responde 400 si el descuento es del 150 %"*, comprobando `status` y que el body tenga la propiedad `error`. ¿Por qué es una prueba de **integración** y no unitaria?

### Actividad 7 · Preguntas de cierre
1. ¿Qué diferencia hay entre `npm test` y `npm run typecheck`?
2. ¿Qué descubrió el test que una prueba manual podría haber pasado por alto?
3. ¿Por qué se vuelve a ejecutar **todo** el conjunto después de corregir?
4. Diferencias entre prueba manual y automatizada.
5. ¿Por qué incluir casos **inválidos** y no solo habituales?
6. ¿Por qué `toThrow` recibe una función (`() => calcularPrecioFinal(1000, 150)`)?

### Opcional · Integración continua
Subí el proyecto a GitHub (sin `node_modules`). El workflow `.github/workflows/pruebas.yml` corre `typecheck` y `test` en cada `push`. ¿Por qué conviene `npm ci` en lugar de `npm install` si el `package-lock.json` está versionado?

## Resultado esperado
`npm test` → **2 archivos, 9 pruebas, todas pasan**. `npm run typecheck` sin errores.
