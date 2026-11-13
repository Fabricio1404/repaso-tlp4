# Tema 5 · Ejemplos (proyectos ejecutables)

Cada carpeta es un **proyecto independiente** con su `package.json` (igual que en el parcial).

```bash
cd api-precios        # o catalogo-capas
npm install
npm test              # vitest run
npm run typecheck     # tsc --noEmit
npm run dev           # opcional: levanta la API en http://localhost:3000
```

| Proyecto | Qué muestra | Tests |
|---|---|---|
| `api-precios/` | El **laboratorio de la cátedra ya corregido**: `calcularPrecioFinal` con `RangeError`, 6 unitarias + 3 de integración (incluida la del 150 % → 400) y el workflow de CI | 9 |
| `catalogo-capas/` | La **arquitectura del segundo parcial** (routes → controllers → services → repositories, errores de dominio, middleware de errores) con los tres tipos de test: unitarias de una función pura (`it.each`), unitarias del servicio con **repositorio falso** (`vi.fn`, `satisfies`, `toHaveBeenCalledWith`, `not.toHaveBeenCalled`, `mockReturnValue`, `beforeEach`), integración con **Supertest**, y un archivo de **referencia de matchers** | 31 |

El `MAPA-DE-CONCEPTOS.md` de esta carpeta indica en qué archivo y línea aparece cada concepto (`[CASO LÍMITE]`, `[SPY - ...]`, `[MIDDLEWARE DE ERRORES]`, etc.).

Para probar la API a mano (prueba manual exploratoria):
```bash
curl -X POST http://localhost:3000/api/precios/calcular -H "Content-Type: application/json" -d '{"precio":1000,"descuento":150}'
# {"error":"El descuento debe estar entre 0 y 100"}
```
