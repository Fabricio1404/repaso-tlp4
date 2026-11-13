# Mapa de conceptos

Este archivo se generó leyendo las marcas `📌 [CONCEPTO]` del código. Para cada concepto te dice **en qué archivo y en qué líneas** se aplica. Abrí el archivo en VS Code y usá `Ctrl+G` (ir a línea) para saltar directo.

## Índice por concepto

- **OCP ✓** → `ejercicio3.ts` L4–7
- **OCP ✓ EXTENSIÓN** → `ejercicio3.ts` L31–39
- **DIP ✓** → `ejercicio3.ts` L42–44
- **DOBLE DE PRUEBA** → `ejercicio3.ts` L53–58
- **DIP ✓ INYECCIÓN** → `ejercicio3.ts` L64–66
- **OCP ✓ SIN IF** → `ejercicio3.ts` L69–73

## Detalle archivo por archivo


### `ejercicio3.ts`

| Líneas | Concepto | Código | Qué se ve ahí |
|---|---|---|---|
| 4–7 | **OCP ✓** | `interface MetodoEnvio {` | OCP: se pueden agregar métodos de envío nuevos sin modificar ServicioEnvios |
| 31–39 | **OCP ✓ EXTENSIÓN** | `class EnvioDrone implements MetodoEnvio {` | Tarea 4: método nuevo, ServicioEnvios no se tocó |
| 42–44 | **DIP ✓** | `interface Auditoria {` | DIP: el servicio depende de esta abstracción y no de una clase concreta de auditoría |
| 53–58 | **DOBLE DE PRUEBA** | `class AuditoriaMemoria implements Auditoria {` | Guarda las líneas en memoria: permite verificar sin imprimir |
| 64–66 | **DIP ✓ INYECCIÓN** | `constructor(auditoria: Auditoria) {` | Antes: const auditoria = new ArchivoAuditoria() dentro de despachar |
| 69–73 | **OCP ✓ SIN IF** | `despachar(pedido: string, metodo: MetodoEnvio, kilos: number): numb...` | El costo vive dentro de cada método de envío |
