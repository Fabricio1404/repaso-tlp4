// RESOLUCIÓN F2 · Factory de bebidas

// 📌 [FACTORY - TIPO COMÚN] Interfaz que devuelve la fábrica
interface Bebida {
  readonly nombre: string;
  precio(): number;
  preparar(): string;
}

// 📌 [FACTORY - PRODUCTOS CONCRETOS]
class Cafe implements Bebida {
  readonly nombre = "Café";
  precio(): number {
    return 1800;
  }
  preparar(): string {
    return "Moliendo granos y pasando agua caliente";
  }
}

class Te implements Bebida {
  readonly nombre = "Té";
  precio(): number {
    return 1200;
  }
  preparar(): string {
    return "Infusionando el saquito 3 minutos";
  }
}

class Mate implements Bebida {
  readonly nombre = "Mate";
  precio(): number {
    return 900;
  }
  preparar(): string {
    return "Cargando yerba y cebando a 80°";
  }
}

type TipoBebida = "cafe" | "te" | "mate";

class FabricaBebidas {
  // 📌 [FACTORY - MÉTODO CREADOR STATIC] Devuelve Bebida (el tipo común); los new viven solo acá
  static crear(tipo: TipoBebida): Bebida {
    switch (tipo) {
      case "cafe":
        return new Cafe();
      case "te":
        return new Te();
      case "mate":
        return new Mate();
    }
  }
}

// Bloque de prueba
const pedido: TipoBebida[] = ["cafe", "mate", "te", "cafe"];
let total = 0;
for (const tipo of pedido) {
  // 📌 [CLIENTE] No hay ningún new de Cafe, Te o Mate fuera de la fábrica
  const bebida = FabricaBebidas.crear(tipo);
  console.log(`${bebida.nombre}: ${bebida.preparar()} ($${bebida.precio()})`);
  total += bebida.precio();
}
console.log(`Total: $${total}`);
