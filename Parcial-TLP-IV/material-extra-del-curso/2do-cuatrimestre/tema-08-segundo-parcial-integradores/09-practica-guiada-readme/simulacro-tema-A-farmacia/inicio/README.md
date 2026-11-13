# Simulacro · Segundo parcial · Parte práctica · **TEMA A**

API REST de una **farmacia** hecha con Express + TypeScript y probada con Vitest + supertest.
La parte práctica evalúa **solo testing**: vas a leer tests, interpretar fallas, escribir tests nuevos y corregir el código que esos tests revelen como defectuoso.

> **Duración:** 1,5 horas · **No está permitido usar asistentes de IA.**
> Antes de empezar, completá tus datos en `RESPUESTAS.md`.

## 1. Puesta en marcha
```bash
npm install          # instala dependencias
npm test             # ejecuta todos los tests una vez
npm run test:watch   # los repite al guardar
npm run typecheck    # verifica los tipos con tsc (sin generar .js)
npm run dev          # levanta la API en http://localhost:3000 (opcional)
```
Al ejecutar `npm test` por primera vez **vas a ver tests que fallan**. Es parte del examen.

## 2. Estructura (arquitectura en capas)
```
src/
├── app.ts                                 # arma la app de Express (se usa en los tests)
├── server.ts
├── routes/medicamento.routes.ts
├── controllers/medicamento.controller.ts  # capa de presentación
├── services/
│   ├── medicamento.service.ts             # capa de negocio
│   ├── descuentos.ts                      # calcularDescuento()
│   └── validaciones.ts                    # validarNuevoMedicamento()
├── repositories/medicamento.repository.ts # interfaz + implementación en memoria
├── middlewares/manejo-errores.ts          # errores del dominio → códigos HTTP
├── models/medicamento.ts
├── data/medicamentos-iniciales.ts         # 3 medicamentos
└── errors.ts                              # ValidacionError, NoEncontradoError, StockInsuficienteError
```

## 3. Endpoints
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/medicamentos` | Lista todos |
| GET | `/medicamentos/:id` | Devuelve uno |
| POST | `/medicamentos` | Registra. Body: `{ nombre, laboratorio, precio, stock }` |
| POST | `/medicamentos/:id/venta` | Vende. Body: `{ cantidad }` |
| GET | `/descuento?edad=70&monto=10000` | Devuelve `{ descuento }` |

Los errores se responden con el formato `{ "error": "mensaje" }`.

## 4. Reglas de negocio
Estas reglas son **el requisito**. Ante cualquier duda entre lo que dice un test, lo que hace el código y lo que dice esta tabla, **manda esta tabla**.

| Regla | Descripción |
|---|---|
| **R1** | Las personas de **65 años o más** tienen un **20 %** de descuento sobre el monto. |
| **R2** | El descuento **nunca supera los $5.000**. |
| **R3** | La edad debe ser un número **entero entre 0 y 120** y el monto un número **mayor o igual a 0** (con monto $0 el descuento es $0). Si un valor no es válido, `calcularDescuento` lanza `RangeError`. |
| **R4** | El nombre es obligatorio: no puede estar vacío ni contener solo espacios. |
| **R5** | El laboratorio es obligatorio: no puede estar vacío ni contener solo espacios. |
| **R6** | El precio debe ser un número **mayor a 0** y el stock un número **entero mayor o igual a 0**. |
| **R7** | Se puede vender una cantidad **entera mayor a 0** (si no, `ValidacionError`) y **menor o igual** al stock. Si se pide más, se lanza `StockInsuficienteError`. El stock nunca queda negativo. |
| **R8** | La API responde **400** ante datos inválidos (`ValidacionError` o `RangeError`), **404** si el medicamento no existe (`{ "error": "Medicamento no encontrado" }`) y **409** si no hay stock suficiente. |

R4, R5 y R6 se validan en `validarNuevoMedicamento`; si una no se cumple, se lanza `ValidacionError`.

## 5. Consigna
Se aprueba resolviendo correctamente **al menos 2 de los 3 ejercicios**.

### Ejercicio 1 · Interpretar fallas y corregir (`tests/ej1-reglas-negocio.test.ts`)
1. Ejecutá `npm test` y observá qué tests del Ej. 1 fallan.
2. Para **cada** test que falla, decidí dónde está el error: **en el código** o **en el test**, usando las reglas. *No todos los fallos se deben al código.*
3. Corregí lo que corresponda hasta que todos los tests del Ej. 1 pasen.
4. En `RESPUESTAS.md`, completá la tabla del Ej. 1 (citando la regla).
> Si el error está en el código, **no** modifiques el test.

### Ejercicio 2 · Casos límite e inválidos (`tests/ej2-validaciones.test.ts`)
1. Escribí tests que cubran **R4, R5 y R6**: como mínimo **dos casos límite** y **tres inválidos** (al menos uno por regla).
2. Si algún test revela un defecto, **corregí el código** (`validaciones.ts`), no el test.
3. En `RESPUESTAS.md`, indicá qué defectos encontraste.

### Ejercicio 3 · Dobles de prueba y prueba de integración (`tests/ej3-servicio-y-api.test.ts`)
**3a · Repositorio falso (unitaria).** Completá los dos `it.todo` del bloque 3a usando `crearRepositorioFalso(medicamento)`:
- con stock suficiente, `MedicamentoService.vender` llama a `repo.actualizar` **una sola vez**, con el stock ya descontado;
- con stock insuficiente, lanza `StockInsuficienteError` y **no** llama a `repo.actualizar`.

**3b · API con supertest (integración).** Hoy `GET /medicamentos/999` responde **500**, pero según R8 debe responder **404** con `{ "error": "Medicamento no encontrado" }`.
1. Completá los dos `it.todo` del bloque 3b. El del medicamento inexistente **tiene que fallar** antes de corregir (TDD: rojo).
2. Corregí el código para que pase (verde). Pista: seguí el recorrido de la petición y fijate **qué tipo de error** llega al middleware.

## 6. Entrega
1. `npm test` y `npm run typecheck` sin errores (lo no resuelto puede quedar en `it.todo`).
2. `RESPUESTAS.md` completo.
3. Comprimí la carpeta **sin `node_modules`**.

## 7. Ayuda memoria
```ts
expect(valor).toBe(1500);                     expect(objeto).toEqual({ a: 1 });
expect(lista).toHaveLength(3);                expect(() => fn(-1)).toThrow(RangeError);
const espia = vi.fn();                        expect(espia).toHaveBeenCalledTimes(1);
expect(espia).toHaveBeenCalledWith({ id: 2 }); expect(espia).not.toHaveBeenCalled();
const res = await request(crearApp()).get('/ruta/1');   expect(res.status).toBe(200);
```
