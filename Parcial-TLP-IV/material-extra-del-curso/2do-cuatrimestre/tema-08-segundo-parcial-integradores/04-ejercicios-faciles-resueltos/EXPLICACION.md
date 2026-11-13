# Tema 8 · Ejercicios fáciles · resolución explicada

## Defectos encontrados
| Test que lo reveló | Regla | Defecto | Corrección |
|---|---|---|---|
| `crea la clase correcta para "jubilado"` | R1 | `case 'jubilado': return new DescuentoEstudiante()` (copiar y pegar) | `new DescuentoJubilado()` |
| `con $50.000 exactos el envío es gratis` | R3 | `conDescuento > envioGratisDesde` | `>=` |

## Cómo se testea cada patrón
- **Singleton:** `expect(A.obtenerInstancia()).toBe(A.obtenerInstancia())`. `toBe` usa `===`: compara **referencias**, que es justo lo que define al Singleton. `toEqual` daría verdadero también con dos objetos distintos de igual contenido (no probaría nada).
- **Factory:** `toBeInstanceOf(Clase)` verifica la clase concreta que fabricó; además se prueba el **comportamiento** (`aplicar`). Con un solo test por tipo habrías detectado el defecto; el ejemplo dado solo probaba "estudiante".
- **Adapter:** se le pasa un **stub** (`{ pesoEnLibras: () => 10 }`) en lugar de la balanza real. Funciona porque el adapter recibe por constructor una **interfaz** (`BalanzaLegacy`): DIP en acción.

## Respuestas
1. Porque el Singleton promete **la misma instancia**; `toBe` lo comprueba, `toEqual` no.
2. "Dificulta las pruebas unitarias": el estado modificado en un test se **arrastra** al siguiente (es global y vive todo el proceso). Habría que agregar un método de reinicio para tests o evitar estado mutable.
3. Que el adapter dependa de una **interfaz** recibida por constructor (DIP): se le puede pasar cualquier objeto que tenga `pesoEnLibras()`.

## Detalles
- `toBeCloseTo` para resultados con decimales (`10000 * 0.9` puede dar `9000.000000000002` en otros casos).
- El test del descuento + envío verifica el **orden** de la regla (primero descuento, después el mínimo).
