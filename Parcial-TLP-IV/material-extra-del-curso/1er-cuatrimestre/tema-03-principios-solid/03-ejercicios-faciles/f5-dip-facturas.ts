// EJERCICIO F5 · DIP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona, pero está mal diseñado. Refactorizalo.

class ExportadorPDF {
  exportar(contenido: string): string {
    return `[PDF] ${contenido}`;
  }
}

class GeneradorFacturas {
  private exportador: ExportadorPDF;

  constructor() {
    this.exportador = new ExportadorPDF();
  }

  generar(cliente: string, monto: number): string {
    const contenido = `Factura para ${cliente} por $${monto}`;
    return this.exportador.exportar(contenido);
  }
}

// Bloque de prueba
const generador = new GeneradorFacturas();
console.log(generador.generar("ACME SA", 150000));
