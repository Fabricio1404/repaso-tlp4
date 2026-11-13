// EJERCICIO M3 · Socios de biblioteca — consigna en ENUNCIADOS.md

abstract class Socio {
  // TODO: atributos (numero no reasignable, nombre, lista privada de préstamos)

  constructor(numero: number, nombre: string) {
    // TODO
  }

  // TODO: limitePrestamos() obligatorio para cada subclase

  diasDePrestamo(): number {
    throw new Error("TODO");
  }

  prestar(titulo: string): void {
    throw new Error("TODO");
  }

  devolver(titulo: string): void {
    throw new Error("TODO");
  }

  get cantidadPrestamos(): number {
    throw new Error("TODO");
  }

  resumen(): string {
    throw new Error("TODO");
  }
}

class SocioComun extends Socio {
  // TODO
}

class SocioPremium extends Socio {
  // TODO
}

class SocioEstudiante extends Socio {
  // TODO
}

// Bloque de prueba
const ana = new SocioComun(1, "Ana");
const beto = new SocioPremium(2, "Beto");
const caro = new SocioEstudiante(3, "Caro");

ana.prestar("Rayuela");
ana.prestar("Ficciones");
try {
  ana.prestar("El Aleph");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
beto.prestar("Rayuela");
try {
  beto.prestar("Rayuela");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
try {
  caro.devolver("Martín Fierro");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
ana.devolver("Rayuela");

const socios: Socio[] = [ana, beto, caro];
for (const s of socios) {
  console.log(s.resumen());
}
