# Tema 4 · Primer parcial: cómo se rinde y cómo se integran POO + patrones + SOLID

> Este tema **no agrega conceptos nuevos**: enseña a **combinarlos** bajo presión de tiempo. Es lo que más se parece al examen.

## 1. Formato del parcial práctico (según la guía)

- **Duración:** 1,5 horas.
- **Tres ejercicios; hay que resolver al menos 2 de 3** para aprobar la parte práctica.
- Cada ejercicio **mezcla** temas. El Tema B fue:

| Ejercicio | Contenido | Qué se evaluó |
|---|---|---|
| **1 · Hotel** | Clase abstracta, herencia, polimorfismo, `static`, getter | POO pura |
| **2 · Envíos** | Interfaces, **Singleton**, **Factory Method** | Patrones creacionales |
| **3 · Notificaciones** | Refactor con **OCP** y **DIP** + comentario con el principio | SOLID |

- **La salida por consola tiene que coincidir con la esperada, incluidas las tildes**: "un historico sin tilde ya no coincide".
- Reglas de código: `npx tsc` sin errores; sin `enum`, sin parameter properties, sin `any`; constructor en forma larga; bloque de prueba al final de cada archivo.
- **Puntos de control de Git** (ver sección 5). Sin el commit del punto de control, el ejercicio se considera **no entregado**.
- El repositorio es **privado**, con los cuatro profesores como colaboradores, y el último commit tiene que estar **antes de la hora de entrega**.

## 2. Estrategia de tiempo (90 minutos)

| Minutos | Qué hacer |
|---|---|
| 0–5 | Crear el proyecto (`npm init -y`, `"type": "module"`, `npm i -D typescript`, `tsconfig.json`), `npx tsc` corriendo, **commit 0** |
| 5–10 | Leer los **tres** enunciados completos. Elegir el orden: **primero el que más seguro te sale** |
| 10–35 | Ejercicio A → probar → **commit** |
| 35–60 | Ejercicio B → probar → **commit** |
| 60–80 | Ejercicio C (o completar el que falte) |
| 80–90 | `npx tsc`, comparar salidas carácter por carácter, `ENTREGA.md`, **commit final y push** |

> Con 2 de 3 bien hechos se aprueba. **Es mejor 2 completos y prolijos que 3 a medias.**

## 3. Cómo leer una consigna: diccionario frase → herramienta

Esta tabla junta los temas 1, 2 y 3. Subrayá estas frases cuando leas:

| Frase en la consigna | Lo que tenés que escribir |
|---|---|
| "clase abstracta X con método abstracto y()" | `abstract class X { abstract y(): T; }` |
| "no se puede crear un X genérico" | `abstract class` |
| "cada tipo **debe** definir..." | método `abstract` |
| "`numero` readonly", "no cambia nunca" | `readonly` |
| "arreglo privado", "solo se agrega mediante..." | `private` + método que valida |
| "atributo static que cuenta..." | `static` + acceso con `Clase.atributo` |
| "getter `cantidad`", "se lee sin paréntesis" | `get cantidad(): number` |
| "sin `if` por tipo", "sin preguntar el tipo" | polimorfismo (método redefinido en cada hija) |
| "Singleton X" / "una única instancia" | `private static instancia`, `private constructor`, `static obtenerInstancia()` |
| "fábrica estática `crear(tipo)`" / "nadie más usa `new` sobre..." | `class Fabrica { static crear(tipo: "a" \| "b"): Interfaz { ... } }` |
| "avisa a sus observadores cuando cambia" | Observer: interfaz + lista + `notificar()` |
| "adaptar la clase vieja..." / "sin modificar la clase existente" | Adapter: `implements` nueva + contiene la vieja |
| "un `if` que crece con cada canal/opción nueva" | **OCP**: interfaz + una clase por opción |
| "crea un X con `new` dentro del método/clase" | **DIP**: interfaz + recibir por constructor |
| "comentario arriba de cada interfaz con el principio" | `// OCP: ...` / `// DIP: ...` |
| "el valor se lee del Singleton" | No escribir el número: `Config.obtenerInstancia().valor` |

## 4. Errores que más puntos cuestan

1. **Salida distinta por una tilde, un espacio o un `$`.** `Habitacion 101` ≠ `Habitación 101`. `$40000` ≠ `$ 40000`. Copiá los textos de la consigna.
2. **Olvidar el commit del original** antes del refactor (ejercicio 3).
3. **Parameter properties por costumbre** (`constructor(private x: number)`): con `erasableSyntaxOnly` ni siquiera compila.
4. **`enum`** para los tipos de la fábrica: usar `"estandar" | "express"`.
5. **`if (h instanceof Suite)`** en `mostrarPrecios`: pierde el punto de polimorfismo.
6. **El `2500` escrito en `EnvioExpress`** en vez de leerlo del Singleton.
7. **`new` de una clase concreta fuera de la fábrica** cuando la consigna dice "nadie más usa `new`".
8. **No poner el comentario del principio** arriba de la interfaz en el ejercicio 3.
9. **`this.totalCheckIns`** en vez de `Hotel.totalCheckIns`.
10. Entregar sin haber corrido `npx tsc` (y `node archivo.ts` no detecta errores de tipos).

## 5. Git: puntos de control y `ENTREGA.md`

| # | Momento | Mensaje del commit |
|---|---|---|
| 0 | Proyecto configurado y `npx tsc` corriendo | `chore: configuración inicial` |
| 1 | Ejercicio 1 terminado | `feat(ej1): ejercicio 1 completo` |
| 2 | Ejercicio 2 terminado | `feat(ej2): ejercicio 2 completo` |
| 3 | Ejercicio 3 original, antes de refactorizar | `chore(ej3): código original` |
| 4 | Ejercicio 3 terminado | `refactor(ej3): ejercicio 3 completo` |
| 5 | `ENTREGA.md` con los ejercicios resueltos | `docs: entrega final` |

Plantilla de `ENTREGA.md` (está en `plantilla-ENTREGA.md` en esta carpeta):

```markdown
# Entrega · Primer parcial · Tema X
**Alumno/a:** ...   **Repositorio:** ...

## Ejercicio 1 · <nombre>
- Archivo: `ej1.ts`
- Cómo ejecutar: `node ej1.ts`
- Salida obtenida:
  (pegar)
- Conceptos aplicados: clase abstracta (`Habitacion`), polimorfismo (`mostrarPrecios`), static (`totalCheckIns`)...

## Ejercicio 2 · ...
## Ejercicio 3 · ...
- Principios: OCP (interfaz `Canal`), DIP (interfaz `Registro`).
- Commit del original: <hash>   Commit del refactor: <hash>
```

## 6. Cómo verificar antes de entregar

```bash
npx tsc                       # sin errores
node ej1.ts > salida1.txt     # guardar salida
# comparar con la esperada (en VS Code: clic derecho → "Compare selected")
git status                    # nada sin commitear
git log --oneline             # están los 6 commits
git push
```

## 7. La parte teórica (múltiple opción)

Lo más preguntado según la guía:
- **Clasificación de patrones:** Singleton y Factory creacionales, Adapter estructural, Observer comportamental.
- **Ventajas/desventajas** de cada patrón (la opción incorrecta suele ser de **otro** patrón).
- **Señales de SOLID** (OCP: `switch`/`if` que crece; DIP: `new` de una clase concreta adentro de otra).
- **Clase abstracta vs. interface**, **override vs. overload**, **`private` vs. `protected`**, **`static`**, **`readonly`**, **abstracción vs. encapsulamiento**, **herencia vs. composición**.

Ver `repaso-final/` en la raíz para 40+ preguntas de práctica.

## 8. Mapa de este tema

| Carpeta | Qué hay |
|---|---|
| `02-ejemplos/` | El **parcial Tema B** completo, resuelto y anotado línea por línea |
| `03`–`04` | Integradores fáciles: **2 temas** por ejercicio |
| `05`–`06` | Integradores medios: **3 temas** por ejercicio |
| `07`–`08` | Integrador difícil: **todo** en un solo sistema |
| `09-practica-guiada-readme/` | **Dos simulacros completos** de parcial (Tema A y Tema C) con README, `inicio/` y `solucion/` |
