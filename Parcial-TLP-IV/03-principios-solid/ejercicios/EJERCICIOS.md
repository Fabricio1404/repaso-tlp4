# Ejercicios · Tema 03 · Principios SOLID

En este tema los ejercicios son **refactors**, igual que el ejercicio 3 del primer parcial:
cada archivo `.ts` de esta carpeta **ya funciona**, pero está mal diseñado. La consigna completa está **en el comentario de arriba de cada archivo**.

**Procedimiento (practicalo así, es el del parcial):**
1. Ejecutá el original y **guardá la salida** (copiala a un `.txt` o sacale una captura).
2. Identificá el principio violado con la tabla de señales de la guía.
3. Refactorizá. Poné el comentario `// PRINCIPIO: explicación` **arriba de cada interface** nueva.
4. Ejecutá de nuevo: la salida tiene que ser **idéntica** (salvo donde la consigna pide agregar algo).
5. `npx tsc` sin errores.

| # | Archivo | Principio | Dificultad |
|---|---|---|---|
| 1 | `ej1-srp-boletin.ts` | SRP | ⭐ |
| 2 | `ej2-ocp-descuentos.ts` | OCP | ⭐ |
| 3 | `ej3-lsp-cuentas.ts` | LSP | ⭐⭐ |
| 4 | `ej4-isp-dispositivos.ts` | ISP | ⭐⭐ |
| 5 | `ej5-ocp-dip-turnos.ts` | OCP + DIP (formato parcial) | ⭐⭐⭐ |

---

## Salidas esperadas después del refactor

**Ej. 1 (igual al original):**
```
[archivo] guardado boletin-ana.txt
Alumno: Ana | Promedio: 8.00 | Promocionado
[archivo] guardado boletin-beto.txt
Alumno: Beto | Promedio: 5.00 | Regular
[archivo] guardado boletin-caro.txt
Alumno: Caro | Promedio: 3.00 | Libre
```

**Ej. 2 (las 3 primeras iguales + la nueva):**
```
Común: $40000
Socio: $36000
VIP: $48000
Empleado: $28000
```

**Ej. 3:** ya no aparece el error del plazo fijo, porque **ya no se intenta** extraer de él:
```
Ana: retiro OK, saldo $8000
Caro: retiro OK, saldo $1000
Beto: plazo fijo con intereses, saldo $52500
```

**Ej. 4:** desaparecen los "No soportado":
```
Lámpara encendida
Aire a 24 °C
Lámpara al 20%
Lámpara apagada
Aire apagado
Enchufe sin corriente
```

**Ej. 5 (igual al original):**
```
[archivo] turno guardado: Ana - 10/12 09:30
[email] Ana: tu turno es el 10/12 09:30
[whatsapp] Hola Ana! Turno: 10/12 09:30
[archivo] turno guardado: Beto - 11/12 15:00
[email] Beto: tu turno es el 11/12 15:00
[whatsapp] Hola Beto! Turno: 11/12 15:00
```

---

## Preguntas teóricas para responder por escrito

1. En el ej. 1, ¿cuántas razones para cambiar tenía `Boletin`? Nombralas.
2. En el ej. 2, después del refactor, ¿qué archivo/clase tocaste para agregar "empleado"? ¿Por qué eso demuestra OCP?
3. En el ej. 3, ¿por qué el `try/catch` de `procesarRetiros` era una **señal** de que algo estaba mal en la herencia?
4. En el ej. 4, ¿qué diferencia hay entre el problema que resolviste y el del ej. 3? (ISP vs LSP)
5. En el ej. 5, ¿cómo probarías `ServicioTurnos` **sin** escribir en ningún archivo ni mandar mensajes? Escribí el código del repositorio falso.
6. ¿Qué es el **composition root** y dónde está en el ej. 5?
