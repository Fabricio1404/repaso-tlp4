# Glosario del año

| Término | Definición |
|---|---|
| Abstracción | Modelar solo lo relevante para el problema |
| Acoplamiento | Cuánto depende una clase de otras (bajo = bueno) |
| Adapter | Patrón estructural: hace compatibles dos interfaces sin modificar la clase vieja |
| Aserción | Expresión que compara lo obtenido con lo esperado (`expect(x).toBe(y)`) |
| bcrypt | Función de hash lenta y con salt para contraseñas |
| Caso límite | Valor justo en el borde de una regla (y justo afuera) |
| CI | Integración continua: correr typecheck y tests en cada push |
| Clase abstracta | Molde parcial con métodos abstractos; no se instancia |
| Cohesión | Qué tan relacionado está lo que hay dentro de una clase (alta = bueno) |
| Composición | Un objeto "tiene" otros y delega en ellos |
| Composition root | Único lugar donde se crean y conectan las dependencias (`main.ts`) |
| Contenedor | Instancia en ejecución de una imagen de Docker |
| Copia defensiva | Devolver/guardar una copia para no exponer el estado interno |
| CORS | Mecanismo del navegador que bloquea peticiones entre orígenes salvo permiso del servidor |
| DIP | Depender de abstracciones; recibirlas por constructor |
| Doble de prueba | Reemplazo de una dependencia en un test (stub, spy, mock, fake) |
| Docker Compose | Define y levanta varios servicios juntos |
| E2E | Prueba de un flujo completo desde el punto de vista del usuario |
| Encapsulamiento | El objeto protege su estado; se accede por métodos que validan |
| Factory Method | Patrón creacional: delega la creación a una fábrica que devuelve el tipo común |
| Fake | Implementación simplificada que funciona (repo en memoria) |
| Getter / setter | Propiedad que ejecuta código al leer / asignar |
| Healthcheck | Comando que indica si un servicio está listo (`pg_isready`) |
| Herencia | Una clase hija reutiliza y extiende a una padre ("es un") |
| Imagen | Plantilla inmutable de Docker construida con un Dockerfile |
| Integración (prueba) | Prueba de varias partes juntas (ruta + servicio con Supertest) |
| Interface | Contrato que declara métodos/propiedades; sin código |
| ISP | Interfaces chicas: nadie implementa lo que no usa |
| JWT | Token firmado con header.payload.firma; el payload se lee, no se puede modificar sin el secreto |
| LSP | Una subclase debe poder reemplazar a la base sin sorpresas |
| Middleware | Función `(req, res, next)` en la cadena de Express |
| Narrowing | TS deduce un tipo más preciso dentro de un `if` |
| Observer | Patrón comportamental: el sujeto avisa a sus observadores cuando cambia |
| OCP | Abierto a extensión, cerrado a modificación |
| ORM | Traduce entre tablas y objetos (Sequelize) |
| Override | La hija redefine un método heredado con la misma firma |
| Overload | Varias firmas del mismo método en la misma clase |
| Polimorfismo | Mismo mensaje, distinto comportamiento según el objeto real |
| `protected` | Visible en la clase y en sus hijas |
| `readonly` | Se asigna una vez |
| Refactorizar | Cambiar la estructura sin cambiar el comportamiento visible |
| Repositorio | Única capa con acceso a los datos; se define como interfaz |
| `res.locals` | Datos compartidos entre middlewares de una misma petición |
| Seed | Script que carga datos iniciales (roles, permisos, usuarios) |
| Singleton | Patrón creacional: una única instancia con acceso global |
| Spy | Doble que registra cómo fue llamado (`vi.fn`) |
| SRP | Una sola razón para cambiar |
| `static` | Miembro de la clase, no de la instancia |
| Stub | Doble que devuelve respuestas preprogramadas |
| Supertest | Librería para enviar peticiones HTTP a una app de Express en los tests |
| TDD | Test primero (rojo), código mínimo (verde), refactor |
| Unión de literales | Tipo con valores fijos (`"a" \| "b"`); reemplaza al enum |
| Unitaria (prueba) | Prueba de una unidad aislada |
| Vitest | Framework de pruebas |
| Volumen | Almacenamiento de Docker que sobrevive a los contenedores |
