// RESOLUCIÓN F1 · SRP

interface Venta {
  producto: string;
  cantidad: number;
  precioUnitario: number;
}

// 📌 [SRP ✓ CÁLCULO] Cambia solo si cambia la regla de cálculo (por ejemplo, impuestos)
class CalculadoraVentas {
  total(ventas: Venta[]): number {
    return ventas.reduce((acc, v) => acc + v.cantidad * v.precioUnitario, 0);
  }
}

// 📌 [SRP ✓ FORMATO] Cambia solo si cambia cómo se ve el reporte
class FormateadorReporte {
  formatear(ventas: Venta[], total: number): string[] {
    const lineas = ["=== REPORTE DE VENTAS ==="];
    for (const v of ventas) {
      lineas.push(`${v.producto}: ${v.cantidad} x $${v.precioUnitario}`);
    }
    lineas.push(`TOTAL: $${total}`);
    return lineas;
  }
}

// 📌 [SRP ✓ SALIDA] Cambia solo si cambia el destino (consola, archivo, mail...)
class ImpresoraConsola {
  imprimir(lineas: string[]): void {
    for (const l of lineas) {
      console.log(l);
    }
  }
}

// 📌 [COMPOSICIÓN] Coordina las tres piezas, recibidas por constructor
class ServicioReportes {
  private calculadora: CalculadoraVentas;
  private formateador: FormateadorReporte;
  private impresora: ImpresoraConsola;

  constructor(calculadora: CalculadoraVentas, formateador: FormateadorReporte, impresora: ImpresoraConsola) {
    this.calculadora = calculadora;
    this.formateador = formateador;
    this.impresora = impresora;
  }

  generar(ventas: Venta[]): void {
    const total = this.calculadora.total(ventas);
    const lineas = this.formateador.formatear(ventas, total);
    this.impresora.imprimir(lineas);
  }
}

// Bloque de prueba
const ventas: Venta[] = [
  { producto: "Yerba", cantidad: 3, precioUnitario: 3000 },
  { producto: "Azúcar", cantidad: 2, precioUnitario: 1500 },
];
new ServicioReportes(new CalculadoraVentas(), new FormateadorReporte(), new ImpresoraConsola()).generar(ventas);
