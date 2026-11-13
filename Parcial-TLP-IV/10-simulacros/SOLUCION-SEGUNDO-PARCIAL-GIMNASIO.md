# Solución · Simulacro de segundo parcial · Gimnasio

> Abrila **después** de intentarlo con reloj. El proyecto corregido completo está en [segundo-parcial-gimnasio-resuelto/](segundo-parcial-gimnasio-resuelto/) (`npm install` y `npm test` → 25 tests en verde).

Estado inicial de `npm test`:
```
× con 1 año de antigüedad paga $19.500
× el descuento nunca supera el 25 %
× rechaza una antigüedad con decimales
× permite reservar todos los cupos disponibles
Tests  4 failed | 7 passed | 4 todo (15)
```

---

## Ejercicio 1

| Test que fallaba | ¿Código o test? | Por qué (regla) | Corrección |
|---|---|---|---|
| `con 1 año de antigüedad paga $19.500` | **Test** | R2: 5 % de $20.000 es $1.000 → con 1 año paga **$19.000**. El test hizo mal la cuenta (descontó 2,5 %). | `it('con 1 año de antigüedad paga $19.000', ...)` y `toBe(19000)` |
| `el descuento nunca supera el 25 %` | **Código** (`cuotas.ts`) | R2: el descuento **nunca supera el 25 %**. Con 10 años el código aplicaba 30 % → $14.000. Lo correcto: 25 % → $15.000. | `DESCUENTO_MAXIMO = 0.25` |
| `rechaza una antigüedad con decimales` | **Código** (`cuotas.ts`) | R3: los años deben ser un **entero** ≥ 0. Solo se validaba `< 0`. | `if (!Number.isInteger(anios) \|\| anios < 0)` |
| `permite reservar todos los cupos disponibles` | **Código** (`gimnasio.service.ts`) | R7: cantidad **menor o igual** a los cupos. `cantidad >= clase.cupos` rechazaba reservar exactamente los 5 de 5. | `if (cantidad > clase.cupos)` |

> **La trampa:** el primer test **parece** correcto porque "19.500" suena razonable. Siempre **hacé la cuenta con la regla**: 20000 × (1 − 0,05) = 19000.
> **Otra trampa:** el test de 3 años (17.000) **pasaba**, y el de 10 años no. Con valores "del medio" el defecto del tope (30 % en vez de 25 %) no se ve: solo aparece **pasando el borde** (6 años o más).

---

## Ejercicio 2

Casos desde las reglas:

| Regla | Límite válido | Límite inválido | Otros inválidos |
|---|---|---|---|
| R4 nombre | — | `''` | `'   '` |
| R5 email con @ | `'a@b'` | `''` | `'ana.mail.com'` (sin @) |
| R6 edad 16–90 inclusive | **16** y **90** | **15** y **91** | `20.5`, `NaN` |

Tests que **revelaron defectos** (estaban bien, falló el código):

- **`R6 límite: acepta 90 años (máximo, inclusive)`** → el código usaba `datos.edad >= 90`, que **rechaza** el 90. R6 dice "inclusive". Corrección: `datos.edad > 90`.
- **`R5: rechaza un email sin @`** → el código solo verificaba que no estuviera vacío. R5 exige `@`. Corrección: agregar `|| !datos.email.includes('@')`.

> Fijate que con `edad: 100` el código original **sí** lanzaba error: el defecto solo lo encuentra el **valor exacto del borde** (90). Por eso la consigna pide casos límite.

---

## Ejercicio 3a

```ts
it('con cupos suficientes llama a actualizar una sola vez con los cupos descontados', () => {
  const repo = crearRepositorioFalso(spinning);   // spinning tiene 4 cupos
  const servicio = new GimnasioService(repo);

  servicio.reservar(2, 3);

  expect(repo.actualizar).toHaveBeenCalledTimes(1);
  expect(repo.actualizar).toHaveBeenCalledWith({ ...spinning, cupos: 1 });   // 4 - 3 = 1
});

it('con cupos insuficientes lanza CuposInsuficientesError y NO llama a actualizar', () => {
  const repo = crearRepositorioFalso(spinning);
  const servicio = new GimnasioService(repo);

  expect(() => servicio.reservar(2, 5)).toThrow(CuposInsuficientesError);
  expect(repo.actualizar).not.toHaveBeenCalled();
});
```

---

## Ejercicio 3b

**Rojo:** el test de `GET /clases/99` falla con `expected 500 to be 404`.

> Ojo: en el Tema B el síntoma era **200 con cuerpo vacío**. Acá es **500**. Distinto síntoma → distinta capa.

**Recorrido:**

| Capa | ¿Qué hace? | ¿Bien? |
|---|---|---|
| `routes` | `router.get('/clases/:id', controller.obtener)` | ✅ |
| `controllers` | `res.json(this.service.obtenerClase(id))` | ✅ llama al método que lanza |
| `services` | `obtenerClase` lanza `NoEncontradoError('Clase no encontrada')` | ✅ |
| `middlewares/manejo-errores` | Maneja `ValidacionError`, `RangeError` y `CuposInsuficientesError`... **no** maneja `NoEncontradoError` → cae al `500` final | ❌ |

Un **500** casi siempre significa: "se lanzó un error que **el middleware no reconoce**". La petición llegó bien hasta el servicio; el problema está **en el camino de vuelta**.

**Verde** (en `manejo-errores.ts`):
```ts
import { CuposInsuficientesError, NoEncontradoError, ValidacionError } from '../errors';
// ...
if (err instanceof NoEncontradoError) {
  res.status(404).json({ error: err.message });
  return;
}
```

**RESPUESTAS.md:** "Modifiqué `src/middlewares/manejo-errores.ts`, porque es la capa que traduce errores de dominio a códigos HTTP. El servicio ya lanzaba `NoEncontradoError` con el mensaje correcto, pero el middleware no lo reconocía y respondía 500. Según R8 debe ser 404."

---

## Resumen de defectos

| # | Archivo | Defecto | Regla |
|---|---|---|---|
| 1 | `tests/ej1...` | El test esperaba 19.500 con 1 año (cuenta mal hecha) | R2 |
| 2 | `services/cuotas.ts` | Tope de descuento 30 % en vez de 25 % | R2 |
| 3 | `services/cuotas.ts` | No rechazaba años con decimales | R3 |
| 4 | `services/gimnasio.service.ts` | `>=` impedía reservar todos los cupos | R7 |
| 5 | `services/validaciones.ts` | `>= 90` rechazaba la edad máxima permitida | R6 |
| 6 | `services/validaciones.ts` | No verificaba que el email tenga `@` | R5 |
| 7 | `middlewares/manejo-errores.ts` | No traducía `NoEncontradoError` → 500 en vez de 404 | R8 |
