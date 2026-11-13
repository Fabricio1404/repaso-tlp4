# Tema 7 · Fácil · resolución

- **OCP:** cada deporte nuevo es una **clase nueva** que extiende `Deporte`. `Partido` llama a `deporte.validar(equipo)` y no se modificó.
- **Polimorfismo:** la misma llamada ejecuta tres reglas distintas ("como máximo", "exactamente", "entre"). Si `Partido` tuviera un `if (deporte.nombre === "Tenis")`, cada deporte nuevo obligaría a modificarlo.
- `maxPorEquipo` es `protected` en `Deporte`: por eso las hijas lo pueden leer. El mínimo de `Futbol5` es un atributo **propio** de esa clase.
- Los tests prueban los **bordes** de cada regla (6/7, 0/1/2, 4/5/7/8): ahí es donde se equivoca un `<` por un `<=`.
