# Solución · Práctica guiada Tema 1 · Veterinaria

## Tarea 1 · Análisis (lo que debería decir tu `ANALISIS.md`)

| # | Dónde (en `inicio/`) | Problema | Regla | Pilar violado |
|---|---|---|---|---|
| 1 | `mascota.ts`: `historial: Consulta[];` (público) y `obtenerHistorial()` devuelve `this.historial` | Cualquiera puede agregar/quitar consultas. En `main.ts` el `push` de una consulta falsa modifica el historial real ("Consultas de Toby: 3") | R3 | **Encapsulamiento** |
| 2 | `mascota.ts`: `edad: number;` (público, sin validación) | `toby.edad = -1` se acepta en silencio; tampoco se valida al crear | R2 | **Encapsulamiento** |
| 3 | `veterinaria.ts`: `atender` con `if (mascota instanceof Perro) ... else if (mascota instanceof Gato)` | La veterinaria decide el costo preguntando el tipo. Para agregar Conejo hay que modificarla. Un Conejo cobraría $0 | R4, R5 | **Polimorfismo** (y abstracción: el costo es conocimiento de la mascota) |
| 4 | `veterinaria.ts`: `static totalAtenciones: number = 0;` (público) | Cualquiera puede hacer `Veterinaria.totalAtenciones = 0` | R6 | **Encapsulamiento** |

Bonus (también válido si lo encontraste): `Consulta` sin `readonly` → aunque se devuelva una copia del arreglo, alguien podría cambiar `historial[0].costo`. Y `import { Gato, Perro }` en `veterinaria.ts` es la señal de acoplamiento: la veterinaria conoce las clases concretas.

## Tarea 2 · Corrección (ver `mascota.ts` y `veterinaria.ts`)

1. `private historial` + `obtenerHistorial()` devuelve `[...this.historial]` + `readonly` en los campos de `Consulta`.
2. `private _edad` + `get edad` / `set edad` con validación (entero 0 a 30). El constructor asigna con `this.edad = edad` para validar al crear. Se necesita el **getter** porque `atender` y `describir` leen la edad.
3. Se agrega a `Mascota` el método abstracto `costoBaseConsulta()` y el método concreto `calcularCosto()` (base + recargo). `registrarConsulta` ya no recibe el costo: lo calcula la mascota. `atender` queda sin ningún `if` por tipo y sin importar `Perro` ni `Gato`.
4. `private static atenciones` + `static totalAtenciones(): number`.

**El comportamiento no cambió:** Toby sigue pagando $8000 y Michi $8400. Eso es un *refactor*: mejora el diseño sin cambiar lo que se ve.

## Tarea 3 · Conejo

```ts
export type Especie = "Perro" | "Gato" | "Conejo";   // se agrega el literal

export class Conejo extends Mascota {
  especie(): Especie { return "Conejo"; }
  costoBaseConsulta(): number { return 6000; }
}
```

`veterinaria.ts` **no se tocó**. Eso es posible únicamente gracias a la corrección del defecto 3. Si no lo hubieras corregido, el conejo pagaría $0 (no entra en ningún `if`). Este es el principio **OCP** que vas a ver formalmente en el tema 3.

## Tarea 4 · TODOs

```ts
facturacion(): number {
  let total = 0;
  for (const m of this.pacientes) {
    for (const c of m.obtenerHistorial()) total += c.costo;
  }
  return total;
}
// 8000 + 8400 + 6000 + 8000 = 30400

pacientesPorEspecie(especie: Especie): Mascota[] {
  return this.pacientes.filter((m) => m.especie() === especie);
}
```

## Detalle técnico: `import type`

En `veterinaria.ts`, `Mascota` y `Especie` se usan solo como **tipos** (anotaciones). Con Node ejecutando `.ts` hay que importarlos con `import type`: si no, Node busca un `export` real llamado `Especie` en `mascota.ts` (que no existe en JavaScript, porque los tipos se borran) y falla con *"does not provide an export named 'Especie'"*. `npx tsc` **no** detecta este error con esta configuración, así que siempre ejecutá además de verificar.

## Lo que evalúa el profesor en este tipo de ejercicio

- Que **identifiques** el problema con el vocabulario correcto (encapsulamiento, polimorfismo).
- Que la corrección **no rompa** la salida.
- Que la extensión no toque código existente.
- Que el código siga las reglas (sin `any`, `enum`, parameter properties).
