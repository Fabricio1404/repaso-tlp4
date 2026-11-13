// EJERCICIO D1 · Almacén con los 4 patrones — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO (no lo modifiques) =======================
interface DatosProducto {
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  diasParaVencer?: number;
}

// API vieja del mayorista: recibe y devuelve XML como texto. NO SE PUEDE MODIFICAR.
class ApiMayoristaXML {
  private numero = 0;
  enviarOrdenXML(xml: string): string {
    if (!xml.includes("<cantidad>")) {
      return "<error>formato</error>";
    }
    this.numero++;
    return `<ok>ORD-${this.numero}</ok>`;
  }
}
// ===============================================================================

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const almacen = Almacen.obtenerInstancia();
// almacen.suscribir(new AlertaConsola());
// almacen.suscribir(new ReponedorAutomatico(new ProveedorMayoristaAdapter(new ApiMayoristaXML())));
//
// almacen.agregar(FabricaProductos.crear("perecedero", { codigo: "L1", nombre: "Leche", precio: 1500, stock: 10, stockMinimo: 4, diasParaVencer: 2 }));
// almacen.agregar(FabricaProductos.crear("no-perecedero", { codigo: "A1", nombre: "Arroz", precio: 2000, stock: 20, stockMinimo: 5 }));
//
// console.log(`Venta: $${almacen.vender("L1", 3)}`);
// console.log(`Venta: $${almacen.vender("L1", 4)}`);
// console.log(`Stock de leche: ${almacen.stockDe("L1")}`);
// console.log(`Venta: $${almacen.vender("A1", 10)}`);
// try {
//   almacen.vender("A1", 50);
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// try {
//   FabricaProductos.crear("perecedero", { codigo: "Q1", nombre: "Queso", precio: 5000, stock: 3, stockMinimo: 1 });
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// console.log(`Mismo almacén: ${almacen === Almacen.obtenerInstancia()}`);
