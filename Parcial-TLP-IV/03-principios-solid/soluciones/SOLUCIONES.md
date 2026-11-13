# Soluciones explicadas · Tema 03 · SOLID

Cada `.ts` de esta carpeta tiene el refactor completo y comentado. Acá están las respuestas a las preguntas teóricas y los puntos clave.

---

## Ej. 1 · SRP
- **Tres razones para cambiar:** (1) la regla académica (¿se promociona con 7 o con 8?), (2) el formato del texto, (3) dónde se guarda (archivo, base de datos...). Cada una la pediría alguien distinto: dirección académica, diseño, sistemas.
- Se crean `CalculadoraNotas`, `FormateadorBoletin` y `RepositorioBoletines`. `Boletin` queda como **coordinador**.
- Fijate que también se aplica DIP de paso: las tres piezas se reciben por constructor.

## Ej. 2 · OCP
- La señal era el `if/else if` por `tipoCliente`.
- Para agregar "empleado" se creó **solo una clase nueva** (`ClienteEmpleado`). `Caja` **no se tocó**. Eso es exactamente "abierto a extensión, cerrado a modificación".
- Bonus: desapareció el `throw new Error("Tipo de cliente desconocido")`, porque ya no se puede pasar un tipo inexistente: TypeScript solo acepta objetos que implementen `PoliticaDescuento`.

## Ej. 3 · LSP
- `procesarRetiros` recibía `Cuenta[]` y **confiaba** en que toda `Cuenta` puede extraer (eso promete el padre). `PlazoFijo` rompe esa promesa lanzando un error: **no se puede sustituir** al padre sin sorpresas.
- El `try/catch` era la señal: el cliente se estaba **defendiendo de una subclase**. Si para usar una jerarquía tenés que preguntar `instanceof` o atrapar errores de "no soportado", hay una violación de LSP.
- Solución: la base `Cuenta` solo tiene lo que **todas** cumplen (depositar, consultar saldo). La capacidad de extraer pasa a la interface `Extraible`, que solo implementa `CajaAhorro`. Ahora `procesarRetiros([beto])` **ni siquiera compila**: el error se detecta antes de ejecutar.

## Ej. 4 · ISP
- Métodos de mentira: `Lampara.fijarTemperatura`, `AireAcondicionado.regularIntensidad`, `Enchufe.regularIntensidad` y `Enchufe.fijarTemperatura`.
- **Diferencia con el ej. 3:** en ISP el problema está en la **interface** (demasiado grande, obliga a implementar de más). En LSP el problema está en la **subclase** (hereda un comportamiento y lo rompe). Están relacionados: una interface gorda empuja a escribir implementaciones que violan LSP ("No soportado").
- Las funciones ahora piden **lo mínimo**: `modoNoche` pide `Regulable[]`, `apagarTodo` pide `Encendible[]`.

## Ej. 5 · OCP + DIP
- **OCP:** el `if (canal === "email") ... else if` → interface `CanalAviso` + `AvisoEmail`, `AvisoSms`, `AvisoWhatsapp`.
- **DIP:** `this.registro = new RegistroTurnosArchivo()` → interface `RepositorioTurnos` recibida por constructor.
- Los comentarios `// OCP: ...` y `// DIP: ...` van **arriba de cada interface** (lo pide el parcial).

**Pregunta 5 · Probar sin efectos reales:**
```ts
class RepositorioFalso implements RepositorioTurnos {
  guardados: string[] = [];
  guardar(paciente: string, fecha: string): void {
    this.guardados.push(`${paciente}@${fecha}`);
  }
}
class CanalFalso implements CanalAviso {
  avisos: number = 0;
  avisar(): void { this.avisos++; }
}

const repo = new RepositorioFalso();
const canal = new CanalFalso();
new ServicioTurnos(repo, [canal]).reservar("Ana", "10/12");
console.log(repo.guardados);   // ["Ana@10/12"]
console.log(canal.avisos);     // 1
```
Con Vitest se hace lo mismo con `vi.fn()` (tema 04).

**Pregunta 6 · Composition root:** es el **único lugar** donde se crean las clases concretas y se conectan entre sí. En el ej. 5 es el bloque de prueba:
```ts
new ServicioTurnos(new RegistroTurnosArchivo(), [new AvisoEmail(), new AvisoWhatsapp()]);
```
En una API Express es `app.ts` (ahí se hace `new LibroService(new LibroRepositoryEnMemoria(...))`).

---

## Commits sugeridos (como en el parcial)
```
chore(ej5): código original
refactor(ej5): aplicar OCP en canales de aviso
refactor(ej5): aplicar DIP en el repositorio de turnos
```

➡️ Más práctica: [material-extra-del-curso/1er-cuatrimestre/tema-03-principios-solid](../../material-extra-del-curso/1er-cuatrimestre/tema-03-principios-solid/) y los simulacros del primer parcial en [material-extra-del-curso/1er-cuatrimestre/tema-04-primer-parcial-integradores](../../material-extra-del-curso/1er-cuatrimestre/tema-04-primer-parcial-integradores/).
