# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **MODIFICACIÓN B · CONTROLLER** → `backend/src/controllers/LibroController.ts` L34–36
- **MODIFICACIÓN B** → `backend/src/database/seed-datos.ts` L11
- **MODIFICACIÓN A · ADAPTER** → `backend/src/notifications/EmailNotifierAdapter.ts` L6–23
- **MODIFICACIÓN A** → `backend/src/notifications/INotifier.ts` L8
- **MODIFICACIÓN A · FACTORY** → `backend/src/notifications/NotifierFactory.ts` L20–22
- **MODIFICACIÓN B · ORDEN DE RUTAS** → `backend/src/routes/index.ts` L28
- **MODIFICACIÓN C · REGLA DE NEGOCIO EN EL SERVICE** → `backend/src/services/LibroService.ts` L51
- **MODIFICACIÓN B · LÓGICA EN EL SERVICE** → `backend/src/services/LibroService.ts` L56–59
- **MODIFICACIÓN A · OCP** → `backend/src/services/NotificationService.ts` L13

## Detalle archivo por archivo


### `backend/src/controllers/LibroController.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 34–36 | **MODIFICACIÓN B · CONTROLLER** | `exportar = async (_req: Request, res: Response): Promise<void> => {` | text/csv en lugar de JSON |

### `backend/src/database/seed-datos.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 11 | **MODIFICACIÓN B** | `'libro:read', 'libro:create', 'libro:update', 'libro:change-status'...` | Permiso nuevo en el seed (admin y operador) |

### `backend/src/notifications/EmailNotifierAdapter.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 6–23 | **MODIFICACIÓN A · ADAPTER** | `export class EmailNotifierAdapter implements INotifier {` | El servicio de correo recibe (para, asunto, cuerpo) y es sincrónico; INotifier recibe un Notification y devuelve Promise |

### `backend/src/notifications/INotifier.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 8 | **MODIFICACIÓN A** | `export type Canal = 'inapp' \| 'console' \| 'email';` | Se agrega el literal del canal nuevo |

### `backend/src/notifications/NotifierFactory.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 20–22 | **MODIFICACIÓN A · FACTORY** | `if (canal === 'email') {` | Un caso nuevo; nadie más hace new del adapter |

### `backend/src/routes/index.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 28 | **MODIFICACIÓN B · ORDEN DE RUTAS** | `r.get('/libros/export', authenticate, authorize('libro:export'), c....` | /libros/export ANTES que /libros/:id (si no, "export" se tomaría como un :id) |

### `backend/src/services/LibroService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 51 | **MODIFICACIÓN C · REGLA DE NEGOCIO EN EL SERVICE** | `if (libro.estado === 'PRESTADO') throw new ConflictoError('No se pu...` | No en el controller ni en el repositorio |
| 56–59 | **MODIFICACIÓN B · LÓGICA EN EL SERVICE** | `async exportarCsv(): Promise<string> {` | Arma el CSV; el controller solo pone la cabecera |

### `backend/src/services/NotificationService.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 13 | **MODIFICACIÓN A · OCP** | `private readonly canales: Canal[] = ['inapp', 'console', 'email'];` | La lógica de update NO cambió: solo se sumó el canal a la lista |
