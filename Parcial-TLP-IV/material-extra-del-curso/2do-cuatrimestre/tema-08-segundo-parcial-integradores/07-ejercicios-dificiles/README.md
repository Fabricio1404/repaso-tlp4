# Tema 8 · Ejercicio difícil · API de compras con cupones (Factory) y auditoría (Observer)

> Formato del segundo parcial, pero el código usa **patrones del primer cuatrimestre**: los cupones salen de una **Factory** (`FabricaCupones`) y cada compra se avisa a **observadores** (auditoría). Hay **4 defectos** repartidos en distintas capas y un endpoint que falta (TDD).
> Tiempo sugerido: 90 minutos.

```bash
npm install
npm test            # 2 pasan y hay 14 "todo"
npm run typecheck
```

## Estructura
```
src/
├── app.ts                         crearApp(repo?, observadores?)
├── routes/compra.routes.ts
├── controllers/compra.controller.ts
├── services/compra.service.ts     registrar · obtener · listar
├── cupones/cupones.ts             EstrategiaCupon, SinCupon, CuponPorcentaje, CuponMontoFijo, FabricaCupones   ← FACTORY
├── auditoria/auditoria.ts         ObservadorCompra, RegistroAuditoria                                           ← OBSERVER
├── repositories/compra.repository.ts
├── middlewares/manejo-errores.ts
└── dominio/                       compra.ts, errores.ts
```

## Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/compras` | Lista |
| GET | `/compras/:id` | Una compra |
| POST | `/compras` | Registra. Body: `{ cliente, monto, cupon? }` |
| GET | `/compras/total` | **No existe todavía** (R8) |

## Reglas de negocio
| Regla | Descripción |
|---|---|
| **R1** | El cliente es obligatorio (no vacío ni solo espacios) y el monto debe ser un número mayor a 0 (`ValidacionError`). |
| **R2** | Cupones: sin cupón → total = monto; `DESC10` → 10 % de descuento (redondeado); `MENOS2000` → $2.000 menos. |
| **R3** | Los códigos **no distinguen mayúsculas ni espacios** (`" desc10 "` es `DESC10`). Un código inexistente → `CuponInvalidoError`. La compra guarda el código normalizado (`"DESC10"`) o `null`. |
| **R4** | `MENOS2000` requiere una compra de **al menos $10.000** (si no, `CondicionCuponError`). |
| **R5** | Cada compra registrada se guarda **una vez** y se notifica a **todos** los observadores con la compra guardada. La auditoría registra `"#<id> <cliente> $<total>"` y, si hubo cupón, `" (<CUPON>)"`. |
| **R6** | Si la compra no es válida (R1, R3 o R4), **no** se guarda ni se notifica. |
| **R7** | API: **201** al crear; **400** ante `ValidacionError` o `CuponInvalidoError` (`{ error }`); **409** ante `CondicionCuponError`; **404** si la compra no existe (`{ "error": "Compra no encontrada" }`). |
| **R8** | `GET /compras/total` responde `{ "total": <suma de los totales> }` (0 si no hay compras). |

## Consigna
1. **Unitarias (`tests/unitarias.test.ts`):** completá los `it.todo` de la Factory (cada código, mayúsculas/espacios, inexistente, **límites** de R4) y del servicio (con `repoFalso()` y un observador espía `{ compraRegistrada: vi.fn() }`).
2. **Integración (`tests/api.test.ts`):** completá los `it.todo` con Supertest; para la auditoría usá `crearApp(new CompraRepositoryEnMemoria(), [auditoria])`.
3. **Defectos:** tus tests van a revelar 4. Corregilos en el **código** (están en 3 capas distintas y en la Factory).
4. **TDD (R8):** escribí los tests de `GET /compras/total`, velos fallar, implementalo (cuidado con el orden de las rutas).
5. Completá `RESPUESTAS.md`.
