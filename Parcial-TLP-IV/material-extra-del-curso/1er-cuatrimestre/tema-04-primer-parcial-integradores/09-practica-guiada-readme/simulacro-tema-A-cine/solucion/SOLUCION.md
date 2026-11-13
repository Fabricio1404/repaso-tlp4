# Solución · Simulacro Tema A · Cine

## Ejercicio 1
- `Funcion` abstracta con `readonly sala`, `readonly pelicula`, `abstract precioEntrada()`.
- `Funcion3D.ANTEOJOS` es `static readonly`: "constante de clase" = `static` (una por clase) + `readonly` (no se reasigna). Se accede con `Funcion3D.ANTEOJOS`.
- `Complejo.totalEntradas` es `static`: suma de **todos** los complejos. Se incrementa con `Complejo.totalEntradas += cantidad`, no con `this`.
- `cartelera()` y `vender()` llaman a `f.precioEntrada()` sin preguntar el tipo: polimorfismo.
- `vender` busca con `find`; si es `undefined`, lanza el error **antes** de sumar entradas (si no, la sala 9 sumaría 1 entrada fantasma).
- Errores típicos: escribir `9000` en `Funcion3D` (la consigna pide la constante); `this.totalEntradas`; `if (f instanceof Funcion3D)`.

## Ejercicio 2
- **Observer:** `Cartelera` (sujeto) guarda `Suscriptor[]`; `anunciarEstreno` recorre y llama a `avisar`.
- **Adapter:** `PushAdapter implements Suscriptor`, **contiene** un `SistemaPushViejo` y un token; traduce `avisar(pelicula, fecha)` → `mandarPush(token, "¡Estreno!", "pelicula (fecha)")`.
- La combinación muestra por qué el Adapter es útil en un Observer: el sujeto solo acepta `Suscriptor`, y el sistema viejo no lo es. Sin tocar ni `Cartelera` ni `SistemaPushViejo`, lo conectamos.
- `desuscribir` con `filter(x => x !== s)` (compara referencias): por eso en el bloque de prueba se guarda `ana` en una variable.

## Ejercicio 3
- **OCP:** el `switch (tipo)` pasa a ser `Descuento` con una clase por tarifa. Cada clase tiene su `nombre` para que el ticket siga diciendo "general", "estudiante", "jubilado".
- **SRP:** el método hacía dos cosas: calcular e imprimir. Imprimir pasa a `Impresora`. Al recibirla por constructor también se aplica DIP (no lo pide la consigna, pero suma).
- Comentarios `// OCP: ...` y `// SRP: ...` arriba de cada interfaz.
- Salida idéntica.

## Corrección (cómo puntuaría la cátedra)
| Ítem | Ej1 | Ej2 | Ej3 |
|---|---|---|---|
| Compila (`npx tsc`) | ✔ | ✔ | ✔ |
| Salida exacta | ✔ | ✔ | ✔ |
| Concepto pedido (abstracta/static/getter · Observer/Adapter · OCP/SRP) | ✔ | ✔ | ✔ |
| Reglas (sin enum/any/parameter properties) | ✔ | ✔ | ✔ |
| Commit de control | 1 | 2 | 3 y 4 |
