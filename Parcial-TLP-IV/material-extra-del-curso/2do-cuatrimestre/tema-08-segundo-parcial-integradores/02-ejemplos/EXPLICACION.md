# Segundo parcial · Tema B · resolución paso a paso

## 0. Antes de tocar nada (5 minutos)
1. `npm install`, `npm test`, `npm run typecheck`. Anotá qué falla: **4 tests del Ej. 1** (`rechaza 0 días`, `rechaza negativos`, `rechaza decimales`, `permite prestar todos`).
2. Leé la **tabla de reglas** del README (R1–R8). Es el criterio para todo: "ante cualquier duda entre lo que dice un test, lo que hace el código y lo que dice esta tabla, manda esta tabla".
3. Completá tus datos en `RESPUESTAS.md`.

## 1. Ejercicio 1 · Interpretar fallas y corregir

Para cada test que falla: **¿qué espera? → ¿qué dice la regla? → ¿coinciden?**

| Test | Espera | Regla | Veredicto |
|---|---|---|---|
| `rechaza 0 días de retraso` | `RangeError` con 0 | R3: "Sin retraso (0 días) la multa es $0" | El **test** está mal → se corrige la expectativa a `toBe(0)` |
| `rechaza días de retraso negativos` | `RangeError` con −2 | R3: entero ≥ 0, si no `RangeError` | El **código** está mal (no valida) |
| `rechaza días de retraso con decimales` | `RangeError` con 1,5 | R3: "**entero**" | El **código** está mal |
| `permite prestar todos los ejemplares` | 4 de 4 → quedan 0 | R7: "menor **o igual**" | El **código** está mal (`<= 0` rechaza el caso igual) |

Correcciones:
```ts
// multas.ts
if (!Number.isInteger(diasDeRetraso) || diasDeRetraso < 0) {
  throw new RangeError('Los días de retraso deben ser un número entero mayor o igual a 0');
}
// libro.service.ts
if (cantidad > libro.ejemplares) { throw new EjemplaresInsuficientesError(...); }
```
- `Number.isInteger` rechaza decimales, `NaN` e `Infinity` de una vez.
- **La trampa del ejercicio:** "No todos los fallos se deben al código". Si "arreglás" `calcularMulta` para que lance error con 0, hacés pasar el test pero **rompés R3**. Por eso el primer test se corrige **en el test**.
- Volvé a correr **todo**: `nunca supera el tope` y los demás siguen en verde.

## 2. Ejercicio 2 · Casos límite e inválidos

Se piden **2 límites** y **3 inválidos (uno por regla)**. Se escribieron más:
- Límites: `ejemplares: 1` (válido), `ejemplares: 0` (inválido, justo afuera), título y autor de 1 carácter (válidos).
- Inválidos: título vacío / solo espacios (R4), autor vacío / solo espacios (R5), ejemplares −1 / 2,5 / `NaN` (R6).

Al ejecutarlos aparecen **dos defectos** (y se corrigen en el **código**, no en el test):
1. **Autor vacío pasa.** La segunda condición dice `datos.titulo` (copiado de la primera). Debe decir `datos.autor`. Es un defecto que solo se ve con un test de autor inválido: con datos válidos nunca se nota.
2. **0 ejemplares pasa.** La condición es `ejemplares < 0`; R6 pide `>= 1` → `ejemplares < 1`. Lo revela **el caso límite** (0), no los habituales.

Fijate: el test `rechaza R5 · autor vacío` **necesita** la regla R5 para saber que tiene que fallar. Los tests se escriben **desde las reglas**, no desde el código.

## 3. Ejercicio 3 · Dobles de prueba e integración

### 3a · Repositorio falso
```ts
const repo = crearRepositorioFalso(rayuela);   // ejemplares: 3
new LibroService(repo).prestar(1, 2);
expect(repo.actualizar).toHaveBeenCalledTimes(1);
expect(repo.actualizar).toHaveBeenCalledWith({ id: 1, titulo: 'Rayuela', autor: 'Julio Cortázar', ejemplares: 1 });
```
- El falso usa `vi.fn()`: se puede preguntar **cuántas veces** y **con qué** se llamó.
- En el caso insuficiente: `expect(() => servicio.prestar(1, 4)).toThrow(EjemplaresInsuficientesError)` **y** `expect(repo.actualizar).not.toHaveBeenCalled()` (se valida antes de guardar).
- Ojo con `toHaveBeenCalledWith`: compara el **objeto completo**. Si pasás solo `{ id: 1, ejemplares: 1 }`, falla (usá el objeto entero o `expect.objectContaining`).

### 3b · Supertest + TDD
1. Escribir `GET /libros/1` → 200 con el libro (pasa).
2. Escribir `GET /libros/999` → 404 `{ error: 'Libro no encontrado' }` → **falla** (`expected 200 to be 404`): **rojo**.
3. Seguir el recorrido: ruta `GET /libros/:id` → `controller.obtener` → llama a `service.buscar` (devuelve `undefined`) → `res.json(undefined)` = 200 vacío. El servicio **ya tenía** `obtener`, que lanza `NoEncontradoError`, y el middleware ya lo traducía a 404.
4. Cambiar el controlador a `this.service.obtener(...)`: **verde**.

## 4. Entrega
- `npm test` → 26 en verde. `npm run typecheck` → sin errores.
- `RESPUESTAS.md` completo (ver la carpeta resuelta).
- Comprimir **sin `node_modules`**.

## 5. Errores que restan puntos en este parcial
- Modificar un test para que pase cuando el error está en el código (lo prohíbe la consigna).
- Corregir el código de `calcularMulta(0)` para que lance error (rompe R3).
- No citar la regla en la tabla de `RESPUESTAS.md`.
- Olvidar `await` en Supertest (el test pasa sin comprobar nada).
- Dejar `it.todo` en los ejercicios resueltos, o un `it.only`.
- `toBe` para comparar el body (objeto) en vez de `toEqual`.
