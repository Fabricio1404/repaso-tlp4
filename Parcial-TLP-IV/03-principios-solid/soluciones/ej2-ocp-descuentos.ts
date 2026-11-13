// Ejercicio 2 · OCP · Descuentos por tipo de cliente (RESUELTO)

export {};

// OCP: cada tipo de cliente nuevo se agrega con una clase que implementa PoliticaDescuento,
// sin modificar Caja.
interface PoliticaDescuento {
  aplicar(monto: number): number;
}

class ClienteComun implements PoliticaDescuento {
  aplicar(monto: number): number {
    return monto;
  }
}

class ClienteSocio implements PoliticaDescuento {
  aplicar(monto: number): number {
    return monto * 0.9;
  }
}

class ClienteVip implements PoliticaDescuento {
  aplicar(monto: number): number {
    return monto > 50000 ? monto * 0.8 : monto * 0.85;
  }
}

// EXTENSIÓN: tipo nuevo agregado sin tocar Caja ni las otras clases
class ClienteEmpleado implements PoliticaDescuento {
  aplicar(monto: number): number {
    return monto * 0.7;
  }
}

class Caja {
  calcularTotal(politica: PoliticaDescuento, monto: number): number {
    return politica.aplicar(monto);   // polimorfismo: no pregunta el tipo
  }
}

// ---------------- Bloque de prueba ----------------
const caja = new Caja();
console.log(`Común: $${caja.calcularTotal(new ClienteComun(), 40000)}`);
console.log(`Socio: $${caja.calcularTotal(new ClienteSocio(), 40000)}`);
console.log(`VIP: $${caja.calcularTotal(new ClienteVip(), 60000)}`);
console.log(`Empleado: $${caja.calcularTotal(new ClienteEmpleado(), 40000)}`);
