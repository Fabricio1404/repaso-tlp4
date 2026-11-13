// RESOLUCIÓN F3 · Animales

class Animal {
  // 📌 [PROTECTED] Las subclases lo pueden leer (lo necesitan en presentarse), el código de afuera no
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  hacerSonido(): string {
    return "...";
  }

  // 📌 [POLIMORFISMO] Escrito una sola vez: this.hacerSonido() ejecuta la versión del objeto real
  presentarse(): string {
    return `Soy ${this.nombre} y hago ${this.hacerSonido()}`;
  }
}

// 📌 [HERENCIA SIN CONSTRUCTOR] Perro no declara constructor: usa el de Animal automáticamente
class Perro extends Animal {
  // 📌 [OVERRIDE] Redefine el método heredado con la misma firma
  override hacerSonido(): string {
    return "Guau";
  }
}

class Gato extends Animal {
  override hacerSonido(): string {
    return "Miau";
  }
}

class Vaca extends Animal {
  override hacerSonido(): string {
    return "Muu";
  }
}

// Bloque de prueba
// 📌 [SUSTITUCIÓN] Un Animal[] acepta cualquier subclase
const animales: Animal[] = [new Perro("Firulais"), new Gato("Michi"), new Vaca("Lola")];
for (const a of animales) {
  // 📌 [POLIMORFISMO] Ningún if preguntando el tipo
  console.log(a.presentarse());
}
