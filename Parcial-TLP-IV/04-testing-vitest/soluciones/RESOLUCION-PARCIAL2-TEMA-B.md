# Resolución paso a paso · Segundo parcial · Tema B (Biblioteca)

> Primero intentá resolverlo vos en [../ejercicios/parcial2-tema-b-biblioteca](../ejercicios/parcial2-tema-b-biblioteca/README.md) con **1,5 horas de reloj**.
> El proyecto resuelto está en [parcial2-tema-b-biblioteca-resuelto/](parcial2-tema-b-biblioteca-resuelto/) (todos los cambios están marcados con un comentario `CORRECCIÓN`).

---

## Minuto 0 a 10 · Arranque

```bash
cd 04-testing-vitest/ejercicios/parcial2-tema-b-biblioteca
npm install
npm test
npm run typecheck
```

Resultado inicial:
```
× rechaza 0 días de retraso
× rechaza días de retraso negativos
× rechaza días de retraso con decimales
× permite prestar todos los ejemplares disponibles
Tests  4 failed | 7 passed | 4 todo (15)
```

**Antes de tocar nada:** leé la **tabla de reglas** (R1 a R8) del README. Es **el requisito**: "ante cualquier duda entre lo que dice un test, lo que hace el código y lo que dice esta tabla, manda esta tabla". Completá tus datos en `RESPUESTAS.md`.

---

## Ejercicio 1 · Interpretar fallas (minuto 10 a 35)

El procedimiento para **cada** test que falla:

1. ¿Qué **espera** el test? (leé el nombre y el `expect`)
2. ¿Qué dice **la regla**?
3. ¿Coinciden test y regla?
   - **Sí** → el error está en el **código**. Corregí el código. **No toques el test.**
   - **No** → el error está en el **test**. Corregí el test (expectativa y nombre).
4. Corré **todo** de nuevo.

### Test 1 · `rechaza 0 días de retraso`
```ts
expect(() => calcularMulta(0)).toThrow(RangeError);
```
- **Espera:** que 0 días lance error.
- **R3 dice:** "Los días deben ser un entero **mayor o igual a 0**. Sin retraso (0 días) la multa es **$0**".
- ¿Coinciden? **No.** El 0 es válido y debe dar 0.
- **Veredicto: error en el TEST.** Se corrige:
  ```ts
  it('sin retraso (0 días) la multa es $0', () => {
    expect(calcularMulta(0)).toBe(0);
  });
  ```
> Esta es la trampa del ejercicio: la consigna avisa "*No todos los fallos se deben al código*". Si hubieras "arreglado" el código para que 0 lance error, violarías R3 y te lo marcan mal.

### Test 2 · `rechaza días de retraso negativos`
- **Espera:** `calcularMulta(-2)` lanza `RangeError`.
- **R3:** entero ≥ 0, si no es válido "`calcularMulta` lanza `RangeError`". ¿Coinciden? **Sí.**
- **Veredicto: error en el CÓDIGO.** `calcularMulta` no validaba nada: `Math.min(-2 * 500, 10000)` = **-1000**.

### Test 3 · `rechaza días de retraso con decimales`
- Mismo análisis: R3 dice **entero**. El código devolvía 750 para 1,5. **Error en el CÓDIGO.**

Corrección de los tests 2 y 3 (una sola validación cubre los dos):
```ts
export function calcularMulta(diasDeRetraso: number): number {
  if (!Number.isInteger(diasDeRetraso) || diasDeRetraso < 0) {
    throw new RangeError('Los días de retraso deben ser un número entero mayor o igual a 0');
  }
  return Math.min(diasDeRetraso * MULTA_POR_DIA, MULTA_MAXIMA);
}
```
`Number.isInteger` devuelve `false` para `1.5`, `NaN` e `Infinity`.

### Test 4 · `permite prestar todos los ejemplares disponibles`
```ts
// el libro tiene 4 ejemplares
expect(servicio.prestar(1, 4).ejemplares).toBe(0);
```
- **R7:** "una cantidad entera mayor a 0 y **menor o igual** a los ejemplares disponibles". Prestar 4 de 4 es válido. ¿Coinciden test y regla? **Sí.**
- **Veredicto: error en el CÓDIGO.** En `libro.service.ts`:
  ```ts
  if (libro.ejemplares - cantidad <= 0) {   // 4 - 4 = 0 → 0 <= 0 → ¡lanza error!
  ```
  El `<=` hace que quedar en 0 se considere insuficiente. Es un clásico **error de borde** (*off-by-one*).
- **Corrección:**
  ```ts
  if (cantidad > libro.ejemplares) {
  ```
  (Equivale a `libro.ejemplares - cantidad < 0`.)

✅ `npm test` → todo el Ej. 1 en verde. Anotá la tabla en `RESPUESTAS.md` citando R3 y R7.

---

## Ejercicio 2 · Casos límite e inválidos (minuto 35 a 60)

**Los casos se escriben desde las REGLAS, no desde el código.**

| Regla | Borde exacto (válido) | Justo afuera (inválido) | Otros inválidos |
|---|---|---|---|
| R4 título obligatorio | `'X'` (1 carácter) | `''` | `'   '` (solo espacios) |
| R5 autor obligatorio | `'X'` | `''` | `'   '` |
| R6 ejemplares entero ≥ 1 | `1` | `0` | `-1`, `2.5`, `NaN` |

Consigna mínima: **2 límites + 3 inválidos (uno por regla)**. En la resolución hay de más (está bien sumar).

Truco del spread para no repetir el objeto válido:
```ts
const valido = { titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 };
expect(() => validarNuevoLibro({ ...valido, autor: '' })).toThrow(ValidacionError);
//                               ^^^^^^^^^ copia todo y pisa solo "autor"
```

Al correr, **fallan** estos tests nuevos:
```
× R6 límite: rechaza 0 ejemplares
× R5: rechaza un autor vacío
× R5: rechaza un autor con solo espacios
```
Los tests están bien (coinciden con las reglas), entonces **el defecto está en el código**:

```ts
// ❌ original: el segundo if valida OTRA VEZ el título (copiar y pegar)
if (typeof datos.titulo !== 'string' || datos.titulo.trim() === '') {
  throw new ValidacionError('El autor es obligatorio');
}
// ❌ original: < 0 acepta el 0
if (!Number.isInteger(datos.ejemplares) || datos.ejemplares < 0) {
```
Corrección: `datos.autor` en el segundo `if` y `< 1` en el tercero.

> Sin el test **límite** del 0 nunca hubieras visto el error de R6: con `-1` el código original **sí** lanzaba error. Por eso se piden **bordes**: los errores viven en los bordes.

---

## Ejercicio 3a · Repositorio falso con `vi.fn()` (minuto 60 a 75)

El archivo ya trae:
```ts
function crearRepositorioFalso(libro: Libro) {
  return {
    listar: vi.fn(() => [libro]),
    buscarPorId: vi.fn(() => ({ ...libro })),
    guardar: vi.fn((datos: NuevoLibro) => ({ id: 99, ...datos })),
    actualizar: vi.fn(),
  } satisfies LibroRepository;
}
```
**¿Por qué se puede hacer esto?** Porque `LibroService` recibe un `LibroRepository` (una **interface**) por constructor. Eso es **DIP** (tema 03). Cualquier objeto que cumpla la interface sirve, incluso uno falso.

```ts
it('con ejemplares suficientes llama a actualizar una sola vez con los ejemplares descontados', () => {
  const repo = crearRepositorioFalso(rayuela);   // rayuela tiene 3 ejemplares
  const servicio = new LibroService(repo);

  servicio.prestar(1, 2);

  expect(repo.actualizar).toHaveBeenCalledTimes(1);                              // "una sola vez"
  expect(repo.actualizar).toHaveBeenCalledWith({ ...rayuela, ejemplares: 1 });   // objeto COMPLETO, 3-2=1
});

it('con ejemplares insuficientes lanza EjemplaresInsuficientesError y NO llama a actualizar', () => {
  const repo = crearRepositorioFalso(rayuela);
  const servicio = new LibroService(repo);

  expect(() => servicio.prestar(1, 4)).toThrow(EjemplaresInsuficientesError);   // con FLECHA
  expect(repo.actualizar).not.toHaveBeenCalled();
});
```

**Errores típicos:**
- `toHaveBeenCalledWith({ ejemplares: 1 })` → **falla**, porque compara el objeto **entero** (`id`, `titulo`, `autor` también). Usá `{ ...rayuela, ejemplares: 1 }`.
- `expect(servicio.prestar(1, 4)).toThrow(...)` sin flecha → el error salta **antes** de que `expect` lo pueda atrapar y el test se cae.
- Usar `LibroRepositoryEnMemoria` en vez del falso → la consigna pide el falso, y con el real no podés verificar llamadas.

---

## Ejercicio 3b · Supertest + TDD (minuto 75 a 85)

**1) Rojo:** escribir el test **antes** de corregir, y verlo fallar.
```ts
it('GET /libros/:id de un libro inexistente responde 404 con un mensaje de error', async () => {
  const respuesta = await request(crearApp()).get('/libros/999');
  expect(respuesta.status).toBe(404);
  expect(respuesta.body).toEqual({ error: 'Libro no encontrado' });
});
```
```
× ... expected 200 to be 404
```

**2) Seguir el recorrido de la petición:**

| Capa | Archivo | ¿Qué hace? | ¿Está bien? |
|---|---|---|---|
| Ruta | `routes/libro.routes.ts` | `router.get('/libros/:id', controller.obtener)` | ✅ existe |
| Controlador | `controllers/libro.controller.ts` | `res.json(this.service.buscar(...))` | ❌ **llama a `buscar`** |
| Servicio | `services/libro.service.ts` | `buscar()` devuelve `undefined`; **`obtener()` lanza `NoEncontradoError('Libro no encontrado')`** | ✅ el método correcto ya existe |
| Middleware | `middlewares/manejo-errores.ts` | `NoEncontradoError` → 404 `{ error: err.message }` | ✅ |

`res.json(undefined)` → Express responde **200** con cuerpo vacío. Ahí está el defecto.

**3) Verde:** en el controlador:
```ts
obtener = (req: Request, res: Response) => {
  res.json(this.service.obtener(Number(req.params.id)));
};
```
> Express 5 manda automáticamente al middleware de errores las excepciones que se lanzan dentro de un controlador. Por eso no hace falta `try/catch` ni `next(err)`.

El test del libro existente:
```ts
it('GET /libros/:id de un libro existente responde 200 con el libro', async () => {
  const respuesta = await request(crearApp()).get('/libros/1');
  expect(respuesta.status).toBe(200);
  expect(respuesta.body).toEqual({ id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 3 });
});
```
No te olvides del **`async`** en el `it` y del **`await`** en `request(...)`.

---

## Minuto 85 a 90 · Entrega

```bash
npm test             # Tests  26 passed (26)
npm run typecheck    # sin errores
```
- `RESPUESTAS.md` completo (ver el del proyecto resuelto).
- Comprimir **sin `node_modules`**.

---

## Resumen de defectos

| # | Archivo | Defecto | Regla | Lo detectó |
|---|---|---|---|---|
| 1 | `tests/ej1...` | El test esperaba error con 0 días | R3 | Ej. 1 (error en el test) |
| 2 | `services/multas.ts` | No validaba negativos ni decimales | R3 | Ej. 1 |
| 3 | `services/libro.service.ts` | `<= 0` impedía prestar todos los ejemplares | R7 | Ej. 1 |
| 4 | `services/validaciones.ts` | Validaba el título dos veces y nunca el autor | R5 | Ej. 2 |
| 5 | `services/validaciones.ts` | `< 0` aceptaba 0 ejemplares | R6 | Ej. 2 (caso límite) |
| 6 | `controllers/libro.controller.ts` | Llamaba a `buscar` en vez de `obtener` → 200 en vez de 404 | R8 | Ej. 3b |
