# Solución · Práctica guiada Tema 3

## Diagnóstico (`ENTREGA.md`)

| Principio | Línea (original) | Señal |
|---|---|---|
| **OCP** | `if (metodo === "moto") ... else if (metodo === "correo") ... else if (metodo === "retiro")` | La cadena de `if` crece con cada método de envío nuevo: hay que **modificar** `ServicioEnvios` para extenderlo |
| **DIP** | `const auditoria = new ArchivoAuditoria();` dentro de `despachar` | La clase de alto nivel crea su propia dependencia concreta: no se puede cambiar la auditoría ni probar sin imprimir |

Bug escondido del original: un método desconocido (`"avion"`) no daba error: devolvía costo 0 en silencio. Con el refactor ese caso **no compila**.

## Refactor
Ver `ejercicio3.ts`. Puntos que se corrigen en el examen:
- Comentario `// OCP: ...` arriba de `MetodoEnvio` y `// DIP: ...` arriba de `Auditoria`. **Se pide explícitamente; si falta, se descuenta.**
- `nombre: string = "moto"` en cada clase: el servicio arma el texto con `metodo.nombre`, así la salida queda igual que antes.
- `calcularCosto(_kilos: number)`: el guion bajo indica "parámetro que no uso". En la moto y el retiro el peso no influye, pero la firma tiene que ser la del contrato.
- `ServicioEnvios` no tiene ni un `if` ni un `new`.

## Respuestas teóricas
1. Porque para **agregar** un método de envío hay que **modificar** una clase que ya funciona (y que podría romperse). OCP pide poder extender sin modificar.
2. Pude usar una auditoría distinta (`AuditoriaMemoria`) **sin tocar** `ServicioEnvios`, y verificar lo que se registró sin depender de la consola. Es la base de las pruebas unitarias.
3. Que se viola **OCP**.
4. **d) DIP.**
5. **b)** una abstracción para cumplir OCP. (No es d: ISP trata de partir interfaces grandes; acá no había una interfaz gorda.)
6. En el **bloque de prueba**, que cumple el rol de **composition root** (el único lugar donde se crean y conectan los objetos concretos). En el integrador ese lugar es `main.ts`.

## Commits esperados
```
chore(ej3): código original
refactor(ej3): ejercicio 3 completo
docs: entrega final
```
