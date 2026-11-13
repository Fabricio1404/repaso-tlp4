// RESOLUCIÓN F5 · DIP

// 📌 [DIP ✓ ABSTRACCIÓN] DIP: GeneradorFacturas depende de esta interfaz y no de una clase concreta de exportación
interface Exportador {
  exportar(contenido: string): string;
}

// 📌 [DIP ✓ DETALLES] Implementan la abstracción
class ExportadorPDF implements Exportador {
  exportar(contenido: string): string {
    return `[PDF] ${contenido}`;
  }
}

class ExportadorTexto implements Exportador {
  exportar(contenido: string): string {
    return `[TXT] ${contenido}`;
  }
}

class GeneradorFacturas {
  private exportador: Exportador;

  // 📌 [DIP ✓ INYECCIÓN POR CONSTRUCTOR] Ya no hay new adentro
  constructor(exportador: Exportador) {
    this.exportador = exportador;
  }

  generar(cliente: string, monto: number): string {
    const contenido = `Factura para ${cliente} por $${monto}`;
    return this.exportador.exportar(contenido);
  }
}

// Bloque de prueba
// 📌 [COMPOSITION ROOT] La decisión de qué exportador usar se toma acá
console.log(new GeneradorFacturas(new ExportadorPDF()).generar("ACME SA", 150000));
console.log(new GeneradorFacturas(new ExportadorTexto()).generar("ACME SA", 150000));
