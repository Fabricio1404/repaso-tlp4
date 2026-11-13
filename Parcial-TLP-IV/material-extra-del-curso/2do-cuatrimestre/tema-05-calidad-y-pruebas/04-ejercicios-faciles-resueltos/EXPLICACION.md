# Tema 5 · Ejercicios fáciles: resolución explicada

## Defectos encontrados (2)

| Test que lo reveló | Regla | Defecto | Corrección |
|---|---|---|---|
| `borde: IMC 25 es "sobrepeso"` | R3: "de 25 a menos de 30 → sobrepeso" | `clasificarIMC` usaba `imc > 25`: un IMC de 25 exacto caía en "normal" | `imc >= 25` |
| `acepta exactamente 8 caracteres` | R4: "al menos 8 caracteres" | `validarPassword` usaba `length <= 8`: rechazaba 8 exactos | `length < 8` |

`calcularEnvio` y `calcularIMC` estaban bien: sus tests pasan desde el principio. **Que un test pase de entrada también es información útil**: confirma que esa regla está cumplida.

## Respuestas
1. Dos defectos, ambos en **bordes** (`>` vs `>=`, `<=` vs `<`). Es el error más común en programación ("off-by-one").
2. **No.** Con 20, 27 y 35 la función devuelve lo correcto. El defecto solo aparece **exactamente en 25**. Por eso se piden casos límite: los bugs se esconden en los bordes.
3. `toEqual`, porque compara el **contenido** del arreglo. `toBe` compara referencias: `expect(validarPassword('x')).toBe([...])` falla siempre porque son dos arreglos distintos aunque tengan lo mismo.

## Técnicas usadas
- **`it.each`** para no repetir el mismo test con distintos datos. `%d` y `%s` en el nombre se reemplazan por los valores.
- **`as const`** en la tabla de `it.each`: hace que `'normal'` se tipe como el literal `'normal'` (y no como `string`), así coincide con el tipo `Clasificacion` y con `Zona`.
- **Valores justo debajo del borde** (18.4, 24.9, 29.9) y **justo afuera** (300.1, 2.51, 5.1): análisis de valores límite.
- **`NaN`**: `NaN <= 0` es `false` y `NaN > 300` también, así que sin `Number.isFinite` pasaría la validación. Por eso se incluye siempre como caso inválido.
- **"Kilo o fracción"**: 5.1 kg → `Math.ceil(0.1) = 1` → +$300. El test de 5.1 verifica que se entendió "fracción".
