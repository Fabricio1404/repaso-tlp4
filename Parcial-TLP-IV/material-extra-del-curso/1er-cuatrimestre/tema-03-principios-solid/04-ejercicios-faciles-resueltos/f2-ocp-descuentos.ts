// RESOLUCIÓN F2 · OCP

// 📌 [OCP ✓ ABSTRACCIÓN] OCP: se agregan tipos de cliente nuevos sin modificar CalculadoraDescuentos
interface Descuento {
  aplicar(monto: number): number;
}

// 📌 [OCP ✓ UNA CLASE POR OPCIÓN]
class DescuentoComun implements Descuento {
  aplicar(monto: number): number {
    return monto;
  }
}

class DescuentoVip implements Descuento {
  aplicar(monto: number): number {
    return monto * 0.8;
  }
}

class DescuentoEmpleado implements Descuento {
  aplicar(monto: number): number {
    return monto * 0.7;
  }
}

// 📌 [OCP ✓ EXTENSIÓN] Agregado después, sin tocar la calculadora
class DescuentoJubilado implements Descuento {
  aplicar(monto: number): number {
    return monto * 0.85;
  }
}

// 📌 [OCP ✓ CERRADA A MODIFICACIÓN] Sin ningún if
class CalculadoraDescuentos {
  calcular(descuento: Descuento, monto: number): number {
    return descuento.aplicar(monto);
  }
}

// Bloque de prueba
const calc = new CalculadoraDescuentos();
console.log(calc.calcular(new DescuentoComun(), 10000));
console.log(calc.calcular(new DescuentoVip(), 10000));
console.log(calc.calcular(new DescuentoEmpleado(), 10000));
console.log(calc.calcular(new DescuentoJubilado(), 10000));
