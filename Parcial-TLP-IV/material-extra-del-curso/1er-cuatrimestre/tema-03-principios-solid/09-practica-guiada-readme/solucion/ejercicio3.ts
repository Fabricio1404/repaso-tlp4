// SOLUCIÓN · Ejercicio 3 · Refactorizar envíos (OCP y DIP)

// 📌 [OCP ✓] OCP: se pueden agregar métodos de envío nuevos sin modificar ServicioEnvios
interface MetodoEnvio {
  nombre: string;
  calcularCosto(kilos: number): number;
}

class EnvioMoto implements MetodoEnvio {
  nombre: string = "moto";
  calcularCosto(_kilos: number): number {
    return 1500;
  }
}

class EnvioCorreo implements MetodoEnvio {
  nombre: string = "correo";
  calcularCosto(kilos: number): number {
    return 3000 + kilos * 200;
  }
}

class RetiroEnSucursal implements MetodoEnvio {
  nombre: string = "retiro";
  calcularCosto(_kilos: number): number {
    return 0;
  }
}

// 📌 [OCP ✓ EXTENSIÓN] Tarea 4: método nuevo, ServicioEnvios no se tocó
class EnvioDrone implements MetodoEnvio {
  nombre: string = "drone";
  calcularCosto(kilos: number): number {
    if (kilos > 3) {
      throw new Error("El drone lleva hasta 3 kg");
    }
    return 4000;
  }
}

// 📌 [DIP ✓] DIP: el servicio depende de esta abstracción y no de una clase concreta de auditoría
interface Auditoria {
  escribir(linea: string): void;
}

class AuditoriaConsola implements Auditoria {
  escribir(linea: string): void {
    console.log(`[AUD] ${linea}`);
  }
}

// 📌 [DOBLE DE PRUEBA] Guarda las líneas en memoria: permite verificar sin imprimir
class AuditoriaMemoria implements Auditoria {
  readonly lineas: string[] = [];
  escribir(linea: string): void {
    this.lineas.push(linea);
  }
}

class ServicioEnvios {
  private auditoria: Auditoria;

  // 📌 [DIP ✓ INYECCIÓN] Antes: const auditoria = new ArchivoAuditoria() dentro de despachar
  constructor(auditoria: Auditoria) {
    this.auditoria = auditoria;
  }

  // 📌 [OCP ✓ SIN IF] El costo vive dentro de cada método de envío
  despachar(pedido: string, metodo: MetodoEnvio, kilos: number): number {
    const costo = metodo.calcularCosto(kilos);
    this.auditoria.escribir(`${pedido} por ${metodo.nombre}: $${costo}`);
    return costo;
  }
}

// Bloque de prueba (misma salida que el original)
const servicio = new ServicioEnvios(new AuditoriaConsola());
servicio.despachar("P-001", new EnvioMoto(), 2);
servicio.despachar("P-002", new EnvioCorreo(), 5);
servicio.despachar("P-003", new RetiroEnSucursal(), 1);
console.log(`Total: $${servicio.despachar("P-004", new EnvioCorreo(), 1)}`);

// Tarea 4 y 5
servicio.despachar("P-005", new EnvioDrone(), 2);
const memoria = new AuditoriaMemoria();
new ServicioEnvios(memoria).despachar("P-006", new EnvioMoto(), 1);
console.log(memoria.lineas);
