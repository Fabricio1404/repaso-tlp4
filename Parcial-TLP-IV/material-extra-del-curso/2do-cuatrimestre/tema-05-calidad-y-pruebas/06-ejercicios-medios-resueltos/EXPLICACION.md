# Tema 5 · Ejercicios medios: resolución explicada

## Ejercicio 1: cómo se decidió cada caso
El procedimiento es siempre el mismo: **leer qué espera el test → buscar la regla → comparar**.

1. **`promociona con 7 y 7`** espera "promocionado". R2: "7 o más" → el test tiene razón. El código usaba `>` → **error en el código** (un borde mal puesto). No se toca el test.
2. **`con 4 y 4 queda libre`** espera "libre". R3: "ambas 4 o más → regular" → el test pide algo que la regla **no dice**. **Error en el test**. El código devolvía "regular", que es lo correcto.
3. **`... recuperatorio 9 promociona`** espera "promocionado". R4: "quien recupera no puede promocionar". **Error en el test**. Ojo: es tentador "arreglar" el código sacando `!recupero` para que pase. Eso sería corregir a ciegas y **romper** una regla.
4. **`rechaza una nota 0`** espera `RangeError`. R1: "de 1 a 10" → el test tiene razón. **Error en el código** (`nota < 0`).

Después de corregir, se corre **todo** de nuevo: los otros tests (por ejemplo, `rechaza una nota 11`, `con 6 y 9 promociona`) siguen pasando, así que el arreglo no rompió nada.

**Bonus:** se agregó `2 y 8 con recuperatorio 3 queda libre` para cubrir el caso en que el recuperatorio no alcanza (no estaba probado).

## Ejercicio 2: dobles de prueba
- **Repositorio y notificador falsos** con `vi.fn()`: el servicio se prueba **aislado** (no hay base de datos ni mails reales). Es posible porque el servicio recibe **interfaces** por constructor (DIP).
- **`satisfies AlumnoRepository`**: garantiza que el falso cumple el contrato y conserva el tipo de `vi.fn` (por eso existe `repo.guardarInscripcion.mock`).
- **Qué se verifica:**
  - el **resultado** (la inscripción devuelta),
  - la **colaboración** (se guardó una vez, con qué datos, se notificó con qué mensaje),
  - lo que **no** debe pasar (en los casos inválidos, `not.toHaveBeenCalled()`).
- **El defecto:** el servicio no consultaba `existeInscripcion`. Un test con `crearRepositorioFalso(regular, true)` (el stub responde "ya inscripto") lo dejó en evidencia.
- Fijate que en el test del duplicado también se verifica `toHaveBeenCalledWith('30111222', 'TLP IV')` sobre `existeInscripcion`: comprueba que el servicio consulta con los **datos correctos** (y no, por ejemplo, con la materia equivocada).
