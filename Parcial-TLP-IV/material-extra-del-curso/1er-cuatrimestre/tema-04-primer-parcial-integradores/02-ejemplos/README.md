# Primer parcial · Tema B · resuelto y anotado

Los tres ejercicios del parcial que aparece en la guía de la cátedra. Abrí `MAPA-DE-CONCEPTOS.md` para ver en qué línea se aplica cada concepto.

| Archivo | Ejercicio | Temas |
|---|---|---|
| `ej1-hotel.ts` | Hotel | Clase abstracta, herencia, polimorfismo, `static`, getter, `readonly` |
| `ej2-envios.ts` | Envíos | Interfaces, Singleton, Factory Method |
| `ej3-notificaciones-original.ts` | Notificaciones (original) | Código con las violaciones marcadas (reconstruido a partir de la consigna) |
| `ej3-notificaciones.ts` | Notificaciones (refactor) | OCP y DIP con comentario del principio |

## Consignas (tal como las resume la guía)

**Ejercicio 1 · Hotel:** clase abstracta `Habitacion` con `numero` readonly y `calcularPrecio(noches)` abstracto; `Simple` ($20000 por noche) y `Suite` ($50000); `Hotel` con arreglo privado, `checkIn`, atributo `static` que cuenta los ingresos, getter `cantidad` y `mostrarPrecios(noches)` sin `if` por tipo.

**Ejercicio 2 · Envíos:** Singleton `ConfiguracionEmpresa` con `recargoExpress = 2500`; interfaz `Envio`; `EnvioEstandar` devuelve la base y `EnvioExpress` suma el recargo leído del Singleton; `FabricaEnvios.crear(tipo)` estático, y nadie más usa `new` sobre los envíos.

**Ejercicio 3 · Refactorizar notificaciones (OCP y DIP):** el código original tiene un `if (canal === "sms")` que crece con cada canal y crea un `ArchivoLog` con `new` dentro del método. Refactorizar con la interfaz `Canal` (Email $0, SMS $15), la interfaz `Registro` (`RegistroArchivo` con `[LOG]`, `RegistroBaseDeDatos` con `[DB]`) y un comentario arriba de cada interfaz nueva con el principio que aplica.

## Cómo practicar con esto
1. Leé solo la consigna de arriba.
2. Resolvé en un archivo aparte, con cronómetro (30 minutos por ejercicio).
3. Compará con estos archivos y con el mapa de conceptos.
