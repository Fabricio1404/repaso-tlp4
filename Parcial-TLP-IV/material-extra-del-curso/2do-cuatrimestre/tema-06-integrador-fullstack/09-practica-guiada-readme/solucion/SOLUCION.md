# Solución · Integrador "Laboratorio de equipos"

La solución completa es el **proyecto de referencia** (`../../02-ejemplos/proyecto-referencia/`) con el dominio cambiado. La arquitectura, los patrones, la seguridad y Docker son **idénticos**; solo cambian nombres y textos. Esta tabla es la guía de adaptación.

## Renombres
| Biblioteca (referencia) | Laboratorio |
|---|---|
| `Libro`, `DatosLibro`, `EstadoLibro` | `Equipo`, `DatosEquipo`, `EstadoEquipo` |
| `titulo`, `autor` | `nombre`, `ubicacion` |
| `'DISPONIBLE' \| 'PRESTADO' \| 'EN_REPARACION'` | `'DISPONIBLE' \| 'EN_USO' \| 'EN_MANTENIMIENTO'` |
| `LibroModel` / tabla `libros` | `EquipoModel` / tabla `equipos` |
| `ILibroRepository`, `LibroSequelizeRepository`, `LibroMemoryRepository` | `IEquipoRepository`, `EquipoSequelizeRepository`, `EquipoMemoryRepository` |
| `LibroService`, `LibroController` | `EquipoService`, `EquipoController` |
| `libroId` (evento, notificación, suscripción) | `equipoId` |
| Permisos `libro:*` | Permisos `equipo:*` |
| Rutas `/api/libros...` | Rutas `/api/equipos...` |
| `[NOTIFICACIÓN] ... \| Libro #1 \| ...` | `[NOTIFICACIÓN] ... \| Equipo #1 \| ...` |
| Seed: Rayuela, Ficciones, Martín Fierro | Seed: p. ej. "Osciloscopio · Lab 1", "Impresora 3D · Lab 2", "Microscopio · Lab 1" |

## Lo que NO cambia (y es lo que más puntos vale)
- `database/DatabaseConnection.ts` (Singleton), `observer/*` (Observer), `notifications/*` (Factory + Adapter), `middlewares/authenticate.ts` y `authorize.ts`, `middlewares/errorHandler.ts`, `contenedor.ts`, `main.ts`, `docker-compose.yml`, `.env.example`, Dockerfiles.
- `PATTERNS.md`: misma estructura, con las rutas y fragmentos de tu proyecto.

## Pasos para verificar tu versión
```bash
cp .env.example .env
docker compose up --build
# en otra terminal
docker compose logs -f backend
# login como operador, PATCH /api/equipos/1/estado {"estado":"EN_USO"}
# → [NOTIFICACIÓN] Para: usuario@tp.com | Equipo #1 | Estado: DISPONIBLE → EN_USO
```
Sin Docker: `cd backend && npm run demo` (con los repositorios en memoria adaptados) y `npm test`.
