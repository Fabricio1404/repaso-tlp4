# Respuestas · API de compras (resueltas)

| # | Test que lo reveló | Regla | Capa / archivo | Corrección |
|---|---|---|---|---|
| 1 | `MENOS2000 con $10.000 exactos se aplica` | R4 ("al menos") | Factory/estrategia · `cupones/cupones.ts` (`CuponMontoFijo`) | `monto <= minimo` → `monto < minimo` |
| 2 | `acepta "desc10"`, `acepta " Desc10 "` | R3 | Factory · `cupones/cupones.ts` (`FabricaCupones`) | `switch (codigo)` → `switch (codigo.trim().toUpperCase())` |
| 3 | `POST /compras válido → 201` | R7 | Controlador · `controllers/compra.controller.ts` | `res.json(...)` → `res.status(201).json(...)` |
| 4 | `POST /compras con un cupón inexistente → 400` | R7 | Middleware · `middlewares/manejo-errores.ts` | Faltaba `CuponInvalidoError` en la rama del 400 (caía en 500) |

Notas:
- El test de la auditoría también fallaba, pero por el **defecto 2** (`'desc10'` en minúsculas lanzaba `CuponInvalidoError`): un mismo defecto puede hacer fallar varios tests. En la tabla va **la causa**, no cada síntoma.
- El servicio **ya** guardaba el cupón normalizado (`trim().toUpperCase()`): por eso, una vez corregida la Factory, todo coincide.

**TDD (R8):** antes de implementarlo, `GET /compras/total` coincidía con la ruta `/compras/:id` (`id = "total"` → `Number("total")` = `NaN`) → `NoEncontradoError` → **404**. Por eso, además de agregar la ruta, hay que registrarla **antes** de `/compras/:id`.

**Patrones:** como `CompraService` recibe los observadores por constructor (DIP), en las unitarias se le pasa un **espía** (`{ compraRegistrada: vi.fn() }`) y se verifica con `toHaveBeenCalledWith(compra)`, y en integración se pasa el observador **real** (`RegistroAuditoria`) para verificar el texto. El mismo diseño permite los dos niveles de prueba.
