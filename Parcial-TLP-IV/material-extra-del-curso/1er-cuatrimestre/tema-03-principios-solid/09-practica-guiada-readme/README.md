# Práctica guiada · Tema 3 · "Ejercicio 3 del parcial": refactorizar envíos (OCP y DIP)

> **Modalidad:** idéntica al ejercicio 3 del primer parcial. Se entrega con **commits de control**. Tiempo sugerido: 35 minutos.
> Trabajá en `inicio/ejercicio3.ts`.

## 1. Situación

El `ServicioEnvios` de una tienda calcula el costo del envío según el método (`"moto"`, `"correo"`, `"retiro"`) con una cadena de `if`, y crea un `ArchivoAuditoria` con `new` **dentro** del método para registrar cada despacho.

Costos: moto $1500 fijo; correo $3000 + $200 por kilo; retiro $0.

## 2. Consigna

1. **Commit del original** (punto de control 3): `chore(ej3): código original`. Sin este commit, el ejercicio se considera no entregado.
2. **Identificá** los dos principios violados y la línea exacta de cada señal. Escribilo en `ENTREGA.md`.
3. **Refactorizá** con:
   - Interfaz `MetodoEnvio` (`nombre: string`, `calcularCosto(kilos): number`) y una clase por método: `EnvioMoto`, `EnvioCorreo`, `RetiroEnSucursal`.
   - Interfaz `Auditoria` (`escribir(linea)`) con `AuditoriaConsola` (imprime `[AUD] ...`).
   - `ServicioEnvios` recibe la `Auditoria` **por constructor** y `despachar(pedido, metodo: MetodoEnvio, kilos)` **no tiene ningún `if`**.
   - **Arriba de cada interfaz nueva**, un comentario con el principio que aplica (por ejemplo `// OCP: ...`).
4. La salida del bloque de prueba tiene que ser **idéntica** a la original (incluidos espacios y `$`).
5. **Extensión:** agregá `EnvioDrone` ($4000 fijo, máximo 3 kg; si se excede: `Error("El drone lleva hasta 3 kg")`) **sin modificar** `ServicioEnvios`. Agregá al bloque de prueba `servicio.despachar("P-005", new EnvioDrone(), 2);`.
6. **Prueba sin consola:** creá `AuditoriaMemoria` (guarda las líneas en un arreglo `lineas`). Usala en otro `ServicioEnvios` para despachar `"P-006"` en moto con 1 kg y mostrá `console.log(memoria.lineas)`.
7. **Commit final:** `refactor(ej3): ejercicio 3 completo`. Después `docs: entrega final` con `ENTREGA.md`.

## 3. Salida esperada final

```
[AUD] P-001 por moto: $1500
[AUD] P-002 por correo: $4000
[AUD] P-003 por retiro: $0
[AUD] P-004 por correo: $3200
Total: $3200
[AUD] P-005 por drone: $4000
[ 'P-006 por moto: $1500' ]
```

## 4. Preguntas teóricas (respondelas en `ENTREGA.md`)

1. ¿Por qué el `if (metodo === ...)` viola OCP aunque el programa funcione?
2. ¿Qué ventaja concreta te dio DIP en el punto 6?
3. Si la consigna dijera "cada vez que se agrega un método de envío hay que tocar `ServicioEnvios`", ¿qué principio se está describiendo?
4. Múltiple opción: "Un `new` de una clase concreta dentro de otra clase es señal de violación de..." a) SRP b) OCP c) LSP d) DIP.
5. Múltiple opción: "La interfaz `MetodoEnvio` es un ejemplo de..." a) un Singleton b) una abstracción para cumplir OCP c) un Adapter d) segregación de interfaces.
6. ¿Dónde quedaron los `new` de las clases concretas después del refactor? ¿Cómo se llama ese lugar?

## 5. Checklist

- [ ] Commit `chore(ej3): código original` **antes** de modificar.
- [ ] `npx tsc` sin errores.
- [ ] Salida idéntica (las 5 primeras líneas) + las 2 nuevas.
- [ ] Comentario con el principio arriba de **cada** interfaz nueva.
- [ ] `ServicioEnvios` sin `if` y sin `new`.
- [ ] `EnvioDrone` agregado sin tocar `ServicioEnvios` (verificalo con `git diff` entre commits).
- [ ] `ENTREGA.md` con el diagnóstico y las respuestas.
