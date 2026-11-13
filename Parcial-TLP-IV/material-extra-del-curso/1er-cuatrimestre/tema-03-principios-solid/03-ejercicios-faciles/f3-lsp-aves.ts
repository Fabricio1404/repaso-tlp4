// EJERCICIO F3 · LSP — consigna en ENUNCIADOS.md
// CÓDIGO ORIGINAL: funciona... hasta que aparece el pingüino. Refactorizalo.

class Ave {
  readonly nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  comer(): string {
    return `${this.nombre} está comiendo`;
  }
  volar(): string {
    return `${this.nombre} está volando`;
  }
}

class Gorrion extends Ave {}

class Pinguino extends Ave {
  override volar(): string {
    throw new Error(`${this.nombre} no puede volar`);
  }
  nadar(): string {
    return `${this.nombre} está nadando`;
  }
}

function hacerVolar(aves: Ave[]): void {
  for (const a of aves) {
    try {
      console.log(a.volar());
    } catch (e) {
      if (e instanceof Error) console.log(`¡Sorpresa! ${e.message}`);
    }
  }
}

// Bloque de prueba
const aves: Ave[] = [new Gorrion("Gorrión"), new Pinguino("Pingüino")];
for (const a of aves) {
  console.log(a.comer());
}
hacerVolar(aves);
console.log(new Pinguino("Pingüino").nadar());
