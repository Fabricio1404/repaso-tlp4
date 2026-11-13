// RESOLUCIÓN F3 · LSP

// 📌 [LSP ✓ BASE CON LO QUE TODAS CUMPLEN] Todas las aves comen; no todas vuelan
class Ave {
  readonly nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  comer(): string {
    return `${this.nombre} está comiendo`;
  }
}

// 📌 [LSP ✓ CONTRATO SEPARADO] LSP: solo quien puede volar de verdad promete volar()
interface Voladora {
  volar(): string;
}

// 📌 [LSP ✓ LA SUBCLASE CUMPLE TODO LO QUE PROMETE]
class Gorrion extends Ave implements Voladora {
  volar(): string {
    return `${this.nombre} está volando`;
  }
}

// 📌 [LSP ✓ EL PINGÜINO YA NO PROMETE VOLAR] No hay ningún método que "rompa" lo heredado
class Pinguino extends Ave {
  nadar(): string {
    return `${this.nombre} está nadando`;
  }
}

// 📌 [LSP ✓ TIPO PRECISO] Solo acepta voladoras: el pingüino no compila, el error se detecta antes de ejecutar
function hacerVolar(aves: Voladora[]): void {
  for (const a of aves) {
    console.log(a.volar());
  }
}

// Bloque de prueba
const gorrion = new Gorrion("Gorrión");
const pinguino = new Pinguino("Pingüino");
const aves: Ave[] = [gorrion, pinguino];
for (const a of aves) {
  console.log(a.comer());
}
hacerVolar([gorrion]);
console.log(pinguino.nadar());
// hacerVolar([pinguino]); ❌ Property 'volar' is missing in type 'Pinguino'
