// EJERCICIO F2 · OCP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona, pero está mal diseñado. Refactorizalo sin cambiar la salida.

class CalculadoraDescuentos {
  calcular(tipoCliente: string, monto: number): number {
    if (tipoCliente === "comun") {
      return monto;
    } else if (tipoCliente === "vip") {
      return monto * 0.8;
    } else if (tipoCliente === "empleado") {
      return monto * 0.7;
    }
    throw new Error(`Tipo de cliente desconocido: ${tipoCliente}`);
  }
}

// Bloque de prueba
const calc = new CalculadoraDescuentos();
console.log(calc.calcular("comun", 10000));
console.log(calc.calcular("vip", 10000));
console.log(calc.calcular("empleado", 10000));
