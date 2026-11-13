// CÓDIGO ORIGINAL · Ejercicio 3 · Refactorizar envíos (OCP y DIP)
// NO lo modifiques antes de hacer el commit "chore(ej3): código original".

class ArchivoAuditoria {
  escribir(linea: string): void {
    console.log(`[AUD] ${linea}`);
  }
}

class ServicioEnvios {
  despachar(pedido: string, metodo: string, kilos: number): number {
    let costo = 0;
    if (metodo === "moto") {
      costo = 1500;
    } else if (metodo === "correo") {
      costo = 3000 + kilos * 200;
    } else if (metodo === "retiro") {
      costo = 0;
    }
    const auditoria = new ArchivoAuditoria();
    auditoria.escribir(`${pedido} por ${metodo}: $${costo}`);
    return costo;
  }
}

// Bloque de prueba
const servicio = new ServicioEnvios();
servicio.despachar("P-001", "moto", 2);
servicio.despachar("P-002", "correo", 5);
servicio.despachar("P-003", "retiro", 1);
console.log(`Total: $${servicio.despachar("P-004", "correo", 1)}`);
