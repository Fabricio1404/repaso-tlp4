# Tema 4 · Integrador difícil: Gimnasio (todo el primer cuatrimestre)

Tiempo sugerido: 75 minutos. Es más largo que un ejercicio de parcial a propósito: si lo resolvés, el parcial te va a resultar corto.
No te dicen qué patrón usar: lo deducís de las frases. Al terminar, escribí arriba del archivo una tabla `clase → concepto/patrón/principio`.

## Precios
- Hay **un único lugar** en todo el sistema donde se definen: cuota base $20000, descuento trimestral 15 %, recargo del plan libre 50 %. Nadie puede reasignar esos valores.

## Planes
- No hay "plan genérico". Cada plan informa `nombre()`, `cuotaMensual()` y qué actividades incluye (esto último **no** se consulta desde afuera: desde afuera solo se pregunta `permite(actividad)`).
  - Mensual: cuota base; solo musculación.
  - Trimestral: cuota con descuento (redondeada); musculación y funcional.
  - Libre: cuota con recargo (redondeada); todo (musculación, funcional, spinning).
- Los planes se crean **solo** con `FabricaPlanes.crear(tipo)`.
- Agregar un plan nuevo no debe obligar a modificar ninguna otra clase (salvo la fábrica).

## Socios
- `Socio(dni, nombre, plan)`: DNI de 7 u 8 dígitos (`"DNI inválido: <dni>"`). `dni` y `nombre` no cambian.
- `plan` y `activo` se leen sin paréntesis, pero solo cambian con `cambiarPlan(plan)` y `suspender()`.
- `Socio.totalAltas()`: cantidad de socios creados en la historia.
- `describir()` → `Ana (Libre, $30000)` y, si está suspendido, agrega ` [SUSPENDIDO]`.

## Clases grupales
- `ClaseGrupal(actividad, horario, cupo)` con `inscribir(socio)` y `darDeBaja(dni)`.
- Si el plan del socio no incluye la actividad → `"El plan <nombre> no incluye <actividad>"` (sin preguntar qué tipo de plan es).
- Si hay cupo, queda inscripto; si no, queda en lista de espera. Al dar de baja a alguien, el **primero** en espera pasa a inscripto.
- Cada uno de esos tres hechos (`inscripto`, `en-espera`, `promovido`) se **avisa** a los interesados, sin que la clase grupal los conozca.
- `ocupacion` → `funcional 19h: 2/2 (espera: 1)`.
- Interesados:
  - `AvisoSocio`: le manda al socio un mensaje por un canal **que recibe por constructor** (`NotificadorWhatsapp` imprime `  [WhatsApp a <nombre>] <mensaje>`, con 2 espacios). Mensajes: `Te inscribiste en <act> <hora>`, `Quedaste en lista de espera de <act> <hora>`, `¡Se liberó un lugar! Ya estás en <act> <hora>`.
  - `RegistroRecepcion`: guarda `"<dni> <tipo> <actividad>"`; `obtener()` devuelve una copia.

## Acceso
- En la puerta hay un `MolineteLegacy` (dado, no se modifica) que recibe un código numérico (el DNI como número) y responde 1 o 0. El gimnasio tiene que trabajar con algo que responda `permitirIngreso(dni: string): boolean` y **recibirlo por constructor**.

## Gimnasio
- `Gimnasio(acceso)`: `alta(dni, nombre, tipoPlan): Socio` (DNI repetido → `"Ya existe el socio <dni>"`), `ingresar(dni): string`:
  - no es socio → `Acceso denegado: <dni> no es socio`
  - suspendido → `Acceso denegado: <nombre> está suspendido`
  - si el molinete abre → `Bienvenido/a <nombre>`
- `recaudacionMensual` (solo socios activos) y `listado()`.

## Salida esperada
```
Ya existe el socio 30111222
  [WhatsApp a Ana] Te inscribiste en funcional 19h
  [WhatsApp a Beto] Te inscribiste en funcional 19h
  [WhatsApp a Dani] Quedaste en lista de espera de funcional 19h
El plan Mensual no incluye funcional
funcional 19h: 2/2 (espera: 1)
  [WhatsApp a Dani] ¡Se liberó un lugar! Ya estás en funcional 19h
funcional 19h: 2/2 (espera: 0)
Ana (Libre, $30000)
Beto (Trimestral, $17000)
Caro (Trimestral, $17000)
Dani (Libre, $30000) [SUSPENDIDO]
Bienvenido/a Ana
Acceso denegado: Dani está suspendido
Acceso denegado: 99999999 no es socio
Recaudación mensual: $64000
Aperturas del molinete: 1
Altas históricas: 4
[
  '30111222 inscripto funcional',
  '30333444 inscripto funcional',
  '30777888 en-espera funcional',
  '30777888 promovido funcional'
]
```
