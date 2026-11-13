// Ejercicio 2 · OCP · Descuentos por tipo de cliente
// CONSIGNA: cada vez que el negocio inventa un tipo de cliente nuevo hay que MODIFICAR calcularTotal.
//   1. Refactorizá aplicando OCP: una interface (con el comentario // OCP: ... arriba) y una clase por tipo.
//   2. Después del refactor, agregá el tipo "empleado" (30 % de descuento) SIN modificar la clase Caja.
//   3. La salida de los tres primeros casos debe quedar igual; el cuarto (empleado) es nuevo.
// Ejecutá: node 03-principios-solid/ejercicios/ej2-ocp-descuentos.ts

export {};

class Caja {
  calcularTotal(tipoCliente: string, monto: number): number {
    if (tipoCliente === "comun") {
      return monto;
    } else if (tipoCliente === "socio") {
      return monto * 0.9;
    } else if (tipoCliente === "vip") {
      return monto > 50000 ? monto * 0.8 : monto * 0.85;
    }
    throw new Error("Tipo de cliente desconocido");
  }
}

// ---------------- Bloque de prueba ----------------
const caja = new Caja();
console.log(`Común: $${caja.calcularTotal("comun", 40000)}`);
console.log(`Socio: $${caja.calcularTotal("socio", 40000)}`);
console.log(`VIP: $${caja.calcularTotal("vip", 60000)}`);
// Después del refactor agregá:  Empleado: $28000  (40000 con 30 % de descuento)
