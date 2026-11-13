// SIMULACRO TEMA A · EJERCICIO 3 · Refactor de entradas (SRP y OCP)

// 📌 [OCP ✓]
// OCP: se pueden agregar tipos de descuento sin modificar ServicioEntradas
interface Descuento {
  nombre: string;
  aplicar(precio: number): number;
}

class SinDescuento implements Descuento {
  nombre: string = "general";
  aplicar(precio: number): number {
    return precio;
  }
}

class DescuentoEstudiante implements Descuento {
  nombre: string = "estudiante";
  aplicar(precio: number): number {
    return precio * 0.7;
  }
}

class DescuentoJubilado implements Descuento {
  nombre: string = "jubilado";
  aplicar(precio: number): number {
    return precio * 0.5;
  }
}

// 📌 [SRP ✓]
// SRP: imprimir el ticket es una responsabilidad aparte del cálculo
interface Impresora {
  imprimir(lineas: string[]): void;
}

class ImpresoraConsola implements Impresora {
  imprimir(lineas: string[]): void {
    for (const l of lineas) console.log(l);
  }
}

class ServicioEntradas {
  private impresora: Impresora;

  constructor(impresora: Impresora) {
    this.impresora = impresora;
  }

  // 📌 [SRP + OCP ✓] Calcula delegando en el descuento y delega la impresión
  emitir(pelicula: string, precio: number, descuento: Descuento): number {
    const final = descuento.aplicar(precio);
    this.impresora.imprimir([`*** ${pelicula} ***`, `Tarifa ${descuento.nombre}: $${final}`]);
    return final;
  }
}

// Bloque de prueba (misma salida que el original)
const servicio = new ServicioEntradas(new ImpresoraConsola());
let total = 0;
total += servicio.emitir("Dune", 10000, new SinDescuento());
total += servicio.emitir("Dune", 10000, new DescuentoEstudiante());
total += servicio.emitir("Dune", 10000, new DescuentoJubilado());
console.log(`Recaudado: $${total}`);
