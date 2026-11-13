# Tema 4 · Integradores fáciles: dos temas por ejercicio

Escribí todo desde cero. Reglas del examen. Tiempo sugerido: 20 minutos cada uno.

---

## F1 · POO + Singleton: biblioteca escolar (`f1-poo-singleton-biblioteca.ts`)
- No existe un "material genérico": hay `Libro` (14 días de préstamo) y `Revista` (3 días). Todo material tiene `codigo` y `titulo` que no cambian, y debe informar `diasDePrestamo()` y `tipo()`.
- `describir()` se escribe **una sola vez**: `Libro "Rayuela" (14 días)`.
- `RegistroPrestamos` es **único** para toda la escuela: `prestar(material)` devuelve `"Prestado: <describir>"` (si ya está prestado: `"<titulo> ya está prestado"`), `devolver(codigo)`, `cantidad` sin paréntesis.
- La función `prestarDesdeAula(aula, material)` del bloque de prueba **no recibe** el registro: lo obtiene ella.

Salida esperada:
```
[Aula 1] Prestado: Libro "Rayuela" (14 días)
[Aula 2] Prestado: Revista "Muy Interesante" (3 días)
Rayuela ya está prestado
Prestados: 2
Prestados: 1
```

## F2 · POO + OCP: facturación con IVA por categoría (`f2-poo-ocp-impuestos.ts`)
- Cada **categoría** sabe su `nombre` y su `alicuota()`: Alimentos 10,5 %, Electrónica 21 %, Libros 0 %.
- `Producto(nombre, precio, categoria)`: el precio se valida (mayor a 0, también al crear: `"El precio debe ser mayor a 0"`). `iva` (redondeado con `Math.round`) y `precioFinal` sin paréntesis. `linea()` → `Yerba [Alimentos]: $3000 + IVA $315 = $3315`.
- `Factura` con `agregar`, `total` y `detalle()`.
- **Ningún `if` por categoría.** Al final, agregá la categoría `Medicamentos` (5 %) **sin tocar** `Producto` ni `Factura`, y escribí arriba de la interfaz el comentario del principio.

Salida esperada:
```
Yerba [Alimentos]: $3000 + IVA $315 = $3315
Auriculares [Electrónica]: $20000 + IVA $4200 = $24200
Rayuela [Libros]: $15000 + IVA $0 = $15000
Ibuprofeno [Medicamentos]: $4000 + IVA $200 = $4200
Total: $46715
El precio debe ser mayor a 0
```

## F3 · Factory + DIP: alertas configurables (`f3-factory-dip-alertas.ts`)
- Canales: email (`EMAIL → <destino>: <mensaje>`), sms (`SMS → <destino>: <primeros 30 caracteres>`), slack (`SLACK #<destino>: <mensaje>`).
- `FabricaNotificadores.crear(tipo)` con `tipo: "email" | "sms" | "slack"`.
- `ServicioAlertas` **recibe el canal por constructor** (no sabe cuál es). `alertar(destino, nivel, mensaje)` con `nivel: "info" | "critico"`; si es crítico, antepone `"URGENTE: "`. Devuelve el texto enviado. `cantidadEnviadas` sin paréntesis.
- El bloque de prueba recorre una "configuración" (arreglo de `{ canal, destino }`) y arma un servicio por cada una usando la fábrica.

Salida esperada:
```
EMAIL → ops@empresa.com: URGENTE: Servidor caído en producción
SMS → 3815550000: URGENTE: Servidor caído en pro
SLACK #guardia: URGENTE: Servidor caído en producción
EMAIL → a@b.com: dos
Enviadas: 2
```
