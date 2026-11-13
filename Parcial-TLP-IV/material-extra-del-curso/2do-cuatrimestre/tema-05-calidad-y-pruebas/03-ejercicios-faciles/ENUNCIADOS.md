# Tema 5 · Ejercicios fáciles: escribir pruebas unitarias

```bash
npm install
npm test          # al principio: 3 pasan y hay varios "todo"
npm run typecheck
```

Las funciones de `src/` **ya están escritas** por otra persona. Tu trabajo es **escribir los tests** que reemplacen cada `it.todo` en `tests/`. Si algún test que escribiste (y que coincide con las reglas) falla, **encontraste un defecto**: corregí el **código**, no el test. Las reglas de esta tabla son el requisito.

## Reglas de negocio

| Regla | Descripción |
|---|---|
| **R1** | El peso debe ser un número mayor a 0 y **hasta 300 kg inclusive**. Si no: `RangeError`. |
| **R2** | La altura debe ser un número mayor a 0 y **hasta 2.5 m inclusive**. Si no: `RangeError`. El IMC = peso / altura², redondeado a 1 decimal. |
| **R3** | Clasificación: **menor a 18.5** → "bajo peso"; **de 18.5 a menos de 25** → "normal"; **de 25 a menos de 30** → "sobrepeso"; **30 o más** → "obesidad". |
| **R4** | Una contraseña válida tiene **al menos 8 caracteres**, al menos un número y al menos una mayúscula. `validarPassword` devuelve **todos** los mensajes de las reglas que no cumple (en ese orden), o `[]` si es válida. |
| **R5** | Envío: base local $1000, provincial $2500, nacional $4000. |
| **R6** | Hasta 5 kg no hay recargo. Por cada kilo **o fracción** por encima de 5 se suman $300. Los kilos deben ser mayores a 0 (si no, `RangeError`). |

## Mínimos que se piden
- **IMC:** 2 casos límite y 3 inválidos de R1/R2 (incluí `NaN`); un caso habitual por categoría de R3 y **todos los bordes** de R3 (18.5, 25, 30 y algún valor justo debajo de cada uno).
- **Contraseña:** el caso límite de 8 caracteres exactos, un inválido por regla y uno que incumpla las tres.
- **Envío:** la base de cada zona, los bordes del recargo (5 kg, 5.1 kg, 6 kg) e inválidos (0, negativo).

## Preguntas
1. ¿Cuántos defectos encontraste? ¿Qué test los reveló y qué regla incumplían?
2. Si solo hubieras escrito casos habituales (IMC 20, 27 y 35), ¿habrías encontrado el defecto de `clasificarIMC`? ¿Por qué?
3. ¿Qué matcher usaste para comparar arreglos de mensajes y por qué no `toBe`?
