# Ejercicios · Tema 04 · Testing

| Parte | Qué | Dónde | Tiempo |
|---|---|---|---|
| A | Preguntas cortas de teoría (en papel) | Acá abajo | 20 min |
| B | Leer tests y predecir el resultado | Acá abajo | 20 min |
| C | **Tu segundo parcial real (Tema B · Biblioteca)**, sin resolver | [parcial2-tema-b-biblioteca/](parcial2-tema-b-biblioteca/README.md) | **90 min con reloj** |
| D | Simulacro nuevo con el mismo formato (Gimnasio) | [../../10-simulacros/segundo-parcial-gimnasio/](../../10-simulacros/segundo-parcial-gimnasio/README.md) | 90 min |
| E | (Extra) Laboratorio de precios de la cátedra | Acá abajo | — |

Las respuestas de A y B están en [../soluciones/SOLUCIONES.md](../soluciones/SOLUCIONES.md). La de C en [../soluciones/RESOLUCION-PARCIAL2-TEMA-B.md](../soluciones/RESOLUCION-PARCIAL2-TEMA-B.md).

---

## Parte A · Teoría (respondé en papel)

1. ¿Qué compara una prueba?
2. Nombrá las tres partes de un caso de prueba y las tres fases de un test (AAA).
3. ¿De dónde tiene que salir el **resultado esperado** de un test? ¿Por qué no del código?
4. Diferenciá prueba **unitaria**, de **integración** y **E2E** con un ejemplo de la Biblioteca para cada una.
5. ¿Qué dice la pirámide de pruebas? ¿Es una regla obligatoria?
6. ¿Una prueba manual y una automatizada se reemplazan? ¿Para qué sirve cada una?
7. ¿Qué diferencia hay entre `toBe` y `toEqual`? Dá un caso donde `toBe` falla y `toEqual` pasa.
8. ¿Por qué `toThrow` necesita `() =>`?
9. Diferenciá **stub, mock, spy y fake**.
10. ¿Qué principio SOLID hace posible usar un repositorio falso? Explicá por qué.
11. ¿Qué hace Supertest y por qué la app se separa en `app.ts` y `server.ts`?
12. ¿Qué diferencia hay entre 401 y 403? ¿Y entre 400 y 409?
13. Explicá el ciclo de TDD. ¿Es obligatorio hacer TDD para poder testear?
14. ¿Una cobertura del 100 % garantiza que no hay defectos? Justificá con un ejemplo.
15. ¿Qué es la integración continua y qué hace un workflow de GitHub Actions típico?
16. Un test falla. ¿Cuáles son las tres posibles causas? ¿Cómo decidís?
17. ¿Qué diferencia hay entre `npm test` y `npm run typecheck`?

---

## Parte B · Predecir el resultado

Para cada test, decí si **pasa o falla** y **por qué**. Suponé esta función:

```ts
export function calcularPrecioFinal(precio: number, descuento: number): number {
  if (descuento < 0 || descuento > 100) throw new RangeError('Descuento inválido');
  return precio - (precio * descuento) / 100;
}
```

```ts
// B1
it('a', () => { expect(calcularPrecioFinal(1000, 10)).toBe(900); });

// B2
it('b', () => { expect(calcularPrecioFinal(1000, 150)).toThrow(RangeError); });

// B3
it('c', () => { expect(() => calcularPrecioFinal(1000, 100)).toThrow(); });

// B4
it('d', () => { expect({ total: calcularPrecioFinal(1000, 0) }).toBe({ total: 1000 }); });

// B5
it('e', () => { expect(() => calcularPrecioFinal(1000, NaN)).toThrow(RangeError); });

// B6
it('f', async () => {
  const res = request(app).post('/api/precios/calcular').send({ precio: 1000, descuento: 10 });
  expect(res.status).toBe(200);
});

// B7
const notificar = vi.fn();
servicio.confirmarPedido(7, notificar);   // llama notificar({ id: 7, estado: 'confirmado' })
it('g', () => { expect(notificar).toHaveBeenCalledWith({ estado: 'confirmado' }); });
```

---

## Parte C · Tu segundo parcial (Tema B · Biblioteca)

Es **exactamente** el parcial que te pasaron, sin resolver. Hacelo **como si fuera el examen**:

```bash
cd 04-testing-vitest/ejercicios/parcial2-tema-b-biblioteca
npm install
npm test
```

- Poné un reloj de **90 minutos**.
- **No mires** la resolución ni uses IA (en el examen no se puede).
- Seguí el procedimiento de la sección 15 de la guía.
- Al terminar: `npm test` y `npm run typecheck` sin errores y `RESPUESTAS.md` completo.
- Después comparalo con [la resolución paso a paso](../soluciones/RESOLUCION-PARCIAL2-TEMA-B.md).

> Si querés volver a empezarlo de cero: borrá la carpeta y volvé a descomprimir el zip `tlp4-parcial2-tema-b-biblioteca.zip` que está en el Escritorio.

---

## Parte E (extra) · Laboratorio de precios de la cátedra

El laboratorio `api-precios` (el del descuento del 150 %) está en
[material-extra-del-curso/2do-cuatrimestre/tema-05-calidad-y-pruebas/02-ejemplos/api-precios](../../material-extra-del-curso/2do-cuatrimestre/tema-05-calidad-y-pruebas/02-ejemplos/api-precios/).
Tiene más ejercicios fáciles, medios y difíciles en las carpetas `03` a `09` del mismo tema.
