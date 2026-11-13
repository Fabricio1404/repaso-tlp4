# Tema 7 · Medio · resolución

- **`Map<string, Fila>`** guarda una fila por equipo; `get(...) ?? filaNueva` crea la fila la primera vez.
- **El partido se registra "dos veces"**: una desde el punto de vista del local (`favor = local`, `contra = visitante`) y otra desde el visitante (al revés). Un solo método privado `sumar` evita repetir la lógica.
- **Ordenamiento con varios criterios:** `b.pts - a.pts || b.dg - a.dg || ...`. Si la primera resta da 0 (empate), `||` pasa al siguiente criterio. Restar `b - a` ordena de mayor a menor; `a.equipo.localeCompare(b.equipo)` ordena alfabéticamente.
- **Copias defensivas:** `[...this.filas.values()].map(f => ({ ...f }))`. Sin el `map`, el test "modificarlas no altera la tabla" fallaría (se devolverían las mismas filas).
- **`partido.resultado` es opcional** (`resultado?: Resultado`): hay que comprobar `undefined` antes de usarlo (narrowing).
