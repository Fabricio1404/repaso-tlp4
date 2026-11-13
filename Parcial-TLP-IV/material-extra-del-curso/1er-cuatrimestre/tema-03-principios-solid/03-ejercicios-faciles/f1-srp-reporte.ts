// EJERCICIO F1 · SRP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona, pero está mal diseñado. Refactorizalo sin cambiar la salida.

interface Venta {
  producto: string;
  cantidad: number;
  precioUnitario: number;
}

class ReporteVentas {
  generar(ventas: Venta[]): void {
    let total = 0;
    for (const v of ventas) {
      total += v.cantidad * v.precioUnitario;
    }
    const lineas: string[] = ["=== REPORTE DE VENTAS ==="];
    for (const v of ventas) {
      lineas.push(`${v.producto}: ${v.cantidad} x $${v.precioUnitario}`);
    }
    lineas.push(`TOTAL: $${total}`);
    for (const l of lineas) {
      console.log(l);
    }
  }
}

// Bloque de prueba
const ventas: Venta[] = [
  { producto: "Yerba", cantidad: 3, precioUnitario: 3000 },
  { producto: "Azúcar", cantidad: 2, precioUnitario: 1500 },
];
new ReporteVentas().generar(ventas);
