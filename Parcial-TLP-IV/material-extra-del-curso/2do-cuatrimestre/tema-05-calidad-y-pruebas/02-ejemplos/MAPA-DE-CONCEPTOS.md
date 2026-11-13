# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **APP SEPARADA DEL SERVER** → `api-precios/src/app.ts` L5–28
- **MIDDLEWARE JSON** → `api-precios/src/app.ts` L8
- **RUTA + CONTROLADOR** → `api-precios/src/app.ts` L11–16
- **MIDDLEWARE DE ERRORES** → `api-precios/src/app.ts` L19–25, `catalogo-capas/src/middlewares/manejo-errores.ts` L5–19
- **SERVER** → `api-precios/src/server.ts` L6–8
- **CAPA DE SERVICIO** → `api-precios/src/services/precios.ts` L3, `catalogo-capas/src/services/producto.service.ts` L7–46
- **VALIDACIÓN CON NUMBER.ISFINITE** → `api-precios/src/services/precios.ts` L6–9
- **RANGEERROR** → `api-precios/src/services/precios.ts` L8
- **REGLA DE NEGOCIO** → `api-precios/src/services/precios.ts` L11–13
- **PRUEBA DE INTEGRACIÓN** → `api-precios/tests/api.test.ts` L6–30, `catalogo-capas/tests/03-api-integracion.test.ts` L6–49
- **ASYNC + AWAIT** → `api-precios/tests/api.test.ts` L8–14
- **TOEQUAL** → `api-precios/tests/api.test.ts` L13
- **ACTIVIDAD 6 DEL LABORATORIO** → `api-precios/tests/api.test.ts` L23–29
- **TOHAVEPROPERTY** → `api-precios/tests/api.test.ts` L28
- **PRUEBA UNITARIA** → `api-precios/tests/precios.test.ts` L5–33
- **CASO HABITUAL** → `api-precios/tests/precios.test.ts` L7–9, `catalogo-capas/tests/01-unitarias-validaciones.test.ts` L10–12
- **CASO LÍMITE** → `api-precios/tests/precios.test.ts` L12–14, `api-precios/tests/precios.test.ts` L22–24
- **CASO INVÁLIDO + TOTHROW CON FUNCIÓN** → `api-precios/tests/precios.test.ts` L17–19
- **COMPOSITION ROOT** → `catalogo-capas/src/app.ts` L10–21
- **ORDEN** → `catalogo-capas/src/app.ts` L19
- **ERRORES DE DOMINIO** → `catalogo-capas/src/errors.ts` L2–7
- **CAPA DE PRESENTACIÓN** → `catalogo-capas/src/controllers/producto.controller.ts` L5–30
- **MÉTODOS COMO FUNCIONES FLECHA** → `catalogo-capas/src/controllers/producto.controller.ts` L13–15
- **OBTENER, NO BUSCAR** → `catalogo-capas/src/controllers/producto.controller.ts` L19
- **201 CREATED** → `catalogo-capas/src/controllers/producto.controller.ts` L24
- **TIPO UTILITARIO OMIT** → `catalogo-capas/src/models/producto.ts` L9
- **DIP - INTERFAZ DEL REPOSITORIO** → `catalogo-capas/src/repositories/producto.repository.ts` L4–9
- **FAKE** → `catalogo-capas/src/repositories/producto.repository.ts` L12–43
- **COPIA DEFENSIVA** → `catalogo-capas/src/repositories/producto.repository.ts` L18
- **CAPA DE RUTAS** → `catalogo-capas/src/routes/producto.routes.ts` L5–12
- **DIP + INYECCIÓN POR CONSTRUCTOR** → `catalogo-capas/src/services/producto.service.ts` L9
- **LANZA NOENCONTRADO** → `catalogo-capas/src/services/producto.service.ts` L20–26
- **VALIDAR ANTES DE GUARDAR** → `catalogo-capas/src/services/producto.service.ts` L39–41
- **FUNCIÓN PURA** → `catalogo-capas/src/services/validaciones.ts` L5–16
- **TYPEOF EN EJECUCIÓN** → `catalogo-capas/src/services/validaciones.ts` L7–9
- **PRUEBA UNITARIA DE UNA FUNCIÓN PURA** → `catalogo-capas/tests/01-unitarias-validaciones.test.ts` L8–41
- **CASOS LÍMITE** → `catalogo-capas/tests/01-unitarias-validaciones.test.ts` L15–17
- **IT.EACH** → `catalogo-capas/tests/01-unitarias-validaciones.test.ts` L24–32
- **TOTHROW CON CLASE** → `catalogo-capas/tests/01-unitarias-validaciones.test.ts` L34
- **TOTHROW CON MENSAJE** → `catalogo-capas/tests/01-unitarias-validaciones.test.ts` L38–40
- **DOBLE DE PRUEBA** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L8–16
- **SATISFIES** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L15
- **BEFOREEACH** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L25–28
- **SPY - TOHAVEBEENCALLEDTIMES / WITH** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L34
- **NOT.TOHAVEBEENCALLED** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L42
- **MOCKRETURNVALUE** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L52
- **TOMATCHOBJECT** → `catalogo-capas/tests/02-servicio-con-dobles.test.ts` L66
- **CREARAPP EN CADA TEST** → `catalogo-capas/tests/03-api-integracion.test.ts` L9
- **.SEND** → `catalogo-capas/tests/03-api-integracion.test.ts` L29
- **MISMA APP** → `catalogo-capas/tests/03-api-integracion.test.ts` L34
- **REFERENCIA** → `catalogo-capas/tests/04-referencia-matchers.test.ts` L4–79
- **AFTEREACH + RESTOREALLMOCKS** → `catalogo-capas/tests/04-referencia-matchers.test.ts` L7
- **TOBE CON OBJETOS FALLA** → `catalogo-capas/tests/04-referencia-matchers.test.ts` L14
- **TOBECLOSETO** → `catalogo-capas/tests/04-referencia-matchers.test.ts` L43
- **.MOCK.CALLS** → `catalogo-capas/tests/04-referencia-matchers.test.ts` L69
- **VI.SPYON** → `catalogo-capas/tests/04-referencia-matchers.test.ts` L75

## Detalle archivo por archivo


### `api-precios/src/app.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–28 | **APP SEPARADA DEL SERVER** | `export function crearApp() {` | crearApp arma la app SIN escuchar un puerto: Supertest la usa directamente |
| 8 | **MIDDLEWARE JSON** | `app.use(express.json());` | Convierte el body JSON de la petición en req.body |
| 11–16 | **RUTA + CONTROLADOR** | `app.post('/api/precios/calcular', (req: Request, res: Response) => {` | Traduce HTTP → servicio → HTTP. Sin reglas de negocio acá |
| 19–25 | **MIDDLEWARE DE ERRORES** | `app.use((err: unknown, _req: Request, res: Response, _next: NextFun...` | 4 parámetros; se registra al final. Traduce RangeError → 400 con { error } |

### `api-precios/src/server.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–8 | **SERVER** | `app.listen(PUERTO, () => {` | Solo acá se escucha un puerto. Los tests NO importan este archivo |

### `api-precios/src/services/precios.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 3 | **CAPA DE SERVICIO** | `/** Calcula el precio luego de aplicar un porcentaje de descuento. */` | Lógica de negocio pura: no conoce Express, se puede probar llamándola directo (prueba unitaria) |
| 6–9 | **VALIDACIÓN CON NUMBER.ISFINITE** | `if (!Number.isFinite(precio) \|\| precio < 0) {` | Rechaza NaN e Infinity, que "< 0" solo no atrapa |
| 8 | **RANGEERROR** | `throw new RangeError('El precio debe ser un número mayor o igual a ...` | El dato es de tipo correcto (number) pero está fuera del rango permitido |
| 11–13 | **REGLA DE NEGOCIO** | `if (!Number.isFinite(descuento) \|\| descuento < 0 \|\| descuento >...` | Descuento entre 0 y 100 inclusive: los bordes 0 y 100 son válidos |

### `api-precios/tests/api.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–30 | **PRUEBA DE INTEGRACIÓN** | `describe('API de precios', () => {` | Participan la ruta de Express, el middleware de errores y el servicio |
| 8–14 | **ASYNC + AWAIT** | `it('calcula el precio final con un descuento válido', async () => {` | Sin await, el test terminaría antes de recibir la respuesta |
| 13 | **TOEQUAL** | `expect(respuesta.body).toEqual({ precio: 1000, descuento: 10, preci...` | Compara el CONTENIDO del objeto (toBe compararía referencias y fallaría) |
| 23–29 | **ACTIVIDAD 6 DEL LABORATORIO** | `it('responde 400 si el descuento es del 150 %', async () => {` | 150 % → el servicio lanza RangeError → el middleware responde 400 { error } |
| 28 | **TOHAVEPROPERTY** | `expect(respuesta.body).toHaveProperty('error');` | Solo comprueba que exista la propiedad error (no el texto exacto) |

### `api-precios/tests/precios.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–33 | **PRUEBA UNITARIA** | `describe('calcularPrecioFinal', () => {` | Llama a la función directamente, sin HTTP |
| 7–9 | **CASO HABITUAL** | `it('aplica un descuento del 10 %', () => {` |  |
| 12–14 | **CASO LÍMITE** | `it('conserva el precio si el descuento es cero', () => {` | Borde inferior del descuento |
| 17–19 | **CASO INVÁLIDO + TOTHROW CON FUNCIÓN** | `it('rechaza descuentos superiores al 100 %', () => {` | La flecha es obligatoria: si se llamara directo, el error saltaría antes de que Vitest lo vea |
| 22–24 | **CASO LÍMITE** | `it('con un descuento del 100 % el precio final es cero', () => {` | Borde superior |

### `catalogo-capas/src/app.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 10–21 | **COMPOSITION ROOT** | `export function crearApp(repo: ProductoRepository = new ProductoRep...` | Acá se crean y conectan las capas. Cada llamada crea un repo nuevo: los tests no se pisan |
| 19 | **ORDEN** | `app.use(manejarErrores);` | El manejador de errores va DESPUÉS de las rutas |

### `catalogo-capas/src/errors.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 2–7 | **ERRORES DE DOMINIO** | `export class ValidacionError extends Error {` | Clases propias para distinguir cada problema con instanceof y traducirlo a un código HTTP |

### `catalogo-capas/src/controllers/producto.controller.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–30 | **CAPA DE PRESENTACIÓN** | `export class ProductoController {` | Traduce HTTP ↔ servicio. Sin reglas de negocio |
| 13–15 | **MÉTODOS COMO FUNCIONES FLECHA** | `listar = (_req: Request, res: Response): void => {` | Se pasan sueltos al router (router.get('/x', controller.listar)): con flecha, this sigue apuntando al controlador |
| 19 | **OBTENER, NO BUSCAR** | `res.json(this.service.obtener(Number(req.params.id)));` | Llama al método que LANZA si no existe; así el middleware responde 404 |
| 24 | **201 CREATED** | `res.status(201).json(this.service.crear(req.body));` | Al crear un recurso |

### `catalogo-capas/src/middlewares/manejo-errores.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–19 | **MIDDLEWARE DE ERRORES** | `export function manejarErrores(err: unknown, _req: Request, res: Re...` | 4 parámetros = Express lo reconoce como manejador de errores. Traduce dominio → HTTP |

### `catalogo-capas/src/models/producto.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 9 | **TIPO UTILITARIO OMIT** | `export type NuevoProducto = Omit<Producto, 'id'>;` | Un producto nuevo es igual a Producto pero sin id (lo asigna el repositorio) |

### `catalogo-capas/src/repositories/producto.repository.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–9 | **DIP - INTERFAZ DEL REPOSITORIO** | `export interface ProductoRepository {` | El servicio depende de esto. En los tests se reemplaza por un falso |
| 12–43 | **FAKE** | `export class ProductoRepositoryEnMemoria implements ProductoReposit...` | Implementación simplificada pero funcional (sin base de datos) |
| 18 | **COPIA DEFENSIVA** | `this.productos = iniciales.map((p) => ({ ...p }));` | Cada repositorio tiene sus propias copias: los tests no se pisan |

### `catalogo-capas/src/routes/producto.routes.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–12 | **CAPA DE RUTAS** | `export function crearProductoRouter(controller: ProductoController)...` | Solo asocia método HTTP + URL con un controlador |

### `catalogo-capas/src/services/producto.service.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 7–46 | **CAPA DE SERVICIO** | `export class ProductoService {` | Toda la lógica de negocio. No conoce Express (no recibe req ni res) |
| 9 | **DIP + INYECCIÓN POR CONSTRUCTOR** | `private readonly repo: ProductoRepository;` | Recibe la INTERFAZ: en producción el repo en memoria, en tests un falso con vi.fn() |
| 20–26 | **LANZA NOENCONTRADO** | `obtener(id: number): Producto {` | Si no existe, error de dominio (que el middleware traduce a 404) |
| 39–41 | **VALIDAR ANTES DE GUARDAR** | `if (cantidad > p.stock) {` | Si no alcanza, se lanza el error y repo.actualizar NUNCA se llama |

### `catalogo-capas/src/services/validaciones.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 5–16 | **FUNCIÓN PURA** | `export function validarNuevoProducto(datos: NuevoProducto): void {` | Fácil de probar unitariamente: entra un dato, lanza o no lanza |
| 7–9 | **TYPEOF EN EJECUCIÓN** | `if (typeof datos.nombre !== 'string' \|\| datos.nombre.trim() === '...` | Los datos vienen de HTTP: TypeScript no garantiza nada en ejecución |

### `catalogo-capas/tests/01-unitarias-validaciones.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–41 | **PRUEBA UNITARIA DE UNA FUNCIÓN PURA** | `describe('validarNuevoProducto', () => {` |  |
| 10–12 | **CASO HABITUAL** | `it('acepta un producto válido', () => {` | + .not.toThrow() |
| 15–17 | **CASOS LÍMITE** | `it('acepta stock 0 (límite inferior permitido)', () => {` | Justo en el borde de cada regla (valores válidos) |
| 24–32 | **IT.EACH** | `it.each([` | El mismo test con varios datos inválidos (particiones: vacío, solo espacios, negativo, cero, decimal, NaN) |
| 34 | **TOTHROW CON CLASE** | `expect(() => validarNuevoProducto(datos)).toThrow(ValidacionError);` | Verifica el TIPO de error, no solo que haya un error |
| 38–40 | **TOTHROW CON MENSAJE** | `it('informa qué campo es inválido', () => {` | Verifica el texto (útil cuando el mensaje es parte del requisito) |

### `catalogo-capas/tests/02-servicio-con-dobles.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8–16 | **DOBLE DE PRUEBA** | `function crearRepositorioFalso(producto: Producto \| undefined) {` | Repositorio falso: cada método es una función espía (vi.fn) con una implementación stub |
| 15 | **SATISFIES** | `} satisfies ProductoRepository;` | Verifica que cumple la interfaz SIN perder el tipo de vi.fn (por eso después existe .mock) |
| 25–28 | **BEFOREEACH** | `beforeEach(() => {` | Cada test arranca con dobles nuevos: los contadores de llamadas no se arrastran |
| 34 | **SPY - TOHAVEBEENCALLEDTIMES / WITH** | `expect(repo.actualizar).toHaveBeenCalledTimes(1);` | Verifica CÓMO colaboró el servicio con el repositorio |
| 42 | **NOT.TOHAVEBEENCALLED** | `expect(repo.actualizar).not.toHaveBeenCalled();` | Prueba que el servicio valida ANTES de guardar |
| 52 | **MOCKRETURNVALUE** | `repo.buscarPorId.mockReturnValue(undefined);` | Cambia lo que devuelve el stub solo para este test |
| 66 | **TOMATCHOBJECT** | `expect(creado).toMatchObject({ id: 99, nombre: 'Mate' });` | Alcanza con que contenga esas propiedades |

### `catalogo-capas/tests/03-api-integracion.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–49 | **PRUEBA DE INTEGRACIÓN** | `describe('API /productos', () => {` | ruta + controlador + servicio + repo en memoria + middleware de errores |
| 9 | **CREARAPP EN CADA TEST** | `const res = await request(crearApp()).get('/productos');` | Datos limpios en cada prueba (independencia) |
| 29 | **.SEND** | `const res = await request(app).post('/productos').send({ nombre: 'M...` | Envía el body como JSON |
| 34 | **MISMA APP** | `const lista = await request(app).get('/productos');` | Para comprobar el efecto se usa la MISMA instancia de app |

### `catalogo-capas/tests/04-referencia-matchers.test.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–79 | **REFERENCIA** | `describe('Referencia de matchers de Vitest', () => {` | Un test por matcher, para consultar la sintaxis rápido |
| 7 | **AFTEREACH + RESTOREALLMOCKS** | `vi.restoreAllMocks();` | Deshace los vi.spyOn después de cada test |
| 14 | **TOBE CON OBJETOS FALLA** | `expect({ a: 1 }).not.toBe({ a: 1 });` | Dos objetos distintos con el mismo contenido NO son toBe |
| 43 | **TOBECLOSETO** | `expect(0.1 + 0.2).not.toBe(0.3);` | Para decimales: 0.1 + 0.2 da 0.30000000000000004 |
| 69 | **.MOCK.CALLS** | `expect(espia.mock.calls).toEqual([[3], [5]]);` | Todas las llamadas con sus argumentos |
| 75 | **VI.SPYON** | `const log = vi.spyOn(console, 'log').mockImplementation(() => {});` | Espía un método real; mockImplementation lo silencia |
