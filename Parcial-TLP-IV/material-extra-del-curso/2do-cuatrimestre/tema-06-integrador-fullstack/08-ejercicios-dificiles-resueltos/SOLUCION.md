# Solución · Modificación en vivo

`npm test` → 16 pruebas en verde. Cambios (todos marcados con `📌 [MODIFICACIÓN ...]` en el código):

## A · Canal de email (Adapter + Factory + OCP)
| Archivo | Cambio |
|---|---|
| `src/notifications/EmailNotifierAdapter.ts` | **Nuevo.** `implements INotifier`, contiene un `ServicioCorreoLegacy` y traduce `Notification` → `(para, asunto, cuerpo)`, y sincrónico → `Promise` |
| `src/notifications/INotifier.ts` | `Canal` suma el literal `'email'` |
| `src/notifications/NotifierFactory.ts` | Un caso nuevo: `if (canal === 'email') return new EmailNotifierAdapter(new ServicioCorreoLegacy())` |
| `src/services/NotificationService.ts` | Solo la lista: `['inapp', 'console', 'email']`. **`update` no cambió** |

**No se tocó:** `LibroService`, `EventPublisher`, rutas, controladores, `ServicioCorreoLegacy`.
**Respuesta para la defensa:** "Es un Adapter porque el servicio de correo tiene otra interfaz; la Factory centraliza el `new`; y gracias a OCP el servicio de notificaciones solo necesitó conocer el nombre del canal". Es exactamente la respuesta que da la guía: "una clase `EmailNotifier implements INotifier`, un caso nuevo en `NotifierFactory` y sumarlo a la lista de canales".

## B · Permiso `libro:export`
| Archivo | Cambio |
|---|---|
| `src/database/seed-datos.ts` | Agregar `'libro:export'` a admin y operador (lo usa el seed de Sequelize **y** el repo en memoria) |
| `src/services/LibroService.ts` | `exportarCsv()`: arma el texto (lógica en el service) |
| `src/controllers/LibroController.ts` | `exportar`: `res.type('text/csv').send(...)` |
| `src/routes/index.ts` | `r.get('/libros/export', authenticate, authorize('libro:export'), c.libros.exportar)` **antes** de `/libros/:id` |

**El orden de rutas:** Express prueba las rutas en el orden en que se registran. Si `/libros/:id` está antes, `GET /libros/export` coincide con `:id = "export"` → `Number("export")` es `NaN` → 404 (y además solo pide `libro:read`, así que un usuario recibiría 404 en vez de 403).
**En una base ya creada**, el seed es idempotente (`findOrCreate`): al reiniciar el backend se crea el permiso nuevo y se asocia a los roles.

## C · No eliminar un libro prestado
| Archivo | Cambio |
|---|---|
| `src/services/LibroService.ts` | `eliminar` obtiene el libro y, si está `PRESTADO`, lanza `ConflictoError` (el middleware de errores ya lo traduce a 409) |

**Capa correcta:** el **service** (lógica de negocio). No va en el controller (solo HTTP) ni en el repositorio (solo acceso a datos). Tampoco hubo que tocar el middleware de errores: `ConflictoError → 409` ya existía.
