// ============================================================================
// EJEMPLO 4 · GETTERS y SETTERS (clase Persona) — tomado de la guía
// Consigna: dni privado y readonly, nombre público, edad y email privados con
// validación en el setter, esMayorDeEdad calculado y datosPublicos sin datos sensibles.
// ============================================================================

class Persona {
  // 📌 [PRIVATE READONLY] Dato sensible (privado) que además nunca cambia (readonly)
  private readonly dni: string;
  nombre: string;
  // 📌 [ATRIBUTO RESPALDO] El dato real se llama _edad; el getter/setter se llama edad. Si se llamaran igual, el setter se llamaría a sí mismo sin fin
  private _edad: number;
  private _email: string;

  constructor(dni: string, nombre: string, edad: number, email: string) {
    this.dni = dni;
    this.nombre = nombre;
    // 📌 [STRICT] strict exige inicializar todo atributo en el constructor: se pone un valor neutro primero
    this._edad = 0;
    this._email = "";
    // 📌 [SETTER EN CONSTRUCTOR] Se asigna con this.edad (el setter), NO con this._edad: así la validación corre también al crear
    this.edad = edad;
    this.email = email;
  }

  // 📌 [GETTER] Se lee como atributo: p.edad (sin paréntesis)
  get edad(): number {
    return this._edad;
  }

  // 📌 [SETTER] Se escribe como atributo: p.edad = 17; pero ejecuta la validación
  set edad(valor: number) {
    if (valor < 0 || valor > 120) {
      throw new Error("Edad inválida");
    }
    this._edad = valor;
  }

  get email(): string {
    return this._email;
  }

  // 📌 [SETTER] Validación mínima de formato antes de guardar
  set email(valor: string) {
    if (!valor.includes("@")) {
      throw new Error("Email inválido");
    }
    this._email = valor;
  }

  // 📌 [GETTER CALCULADO] Sin setter = solo lectura. Se calcula al leerlo, nunca queda desactualizado
  get esMayorDeEdad(): boolean {
    return this._edad >= 18;
  }

  // 📌 [ABSTRACCIÓN + ENCAPSULAMIENTO] Expone solo lo público: no incluye dni ni email (datos sensibles)
  get datosPublicos(): string {
    return `${this.nombre} — mayor de edad: ${this.esMayorDeEdad}`;
  }
}

// Bloque de prueba
const p = new Persona("12345678", "Lucía", 25, "lucia@mail.com");
console.log(p.edad); // 25
console.log(p.datosPublicos); // Lucía — mayor de edad: true
p.edad = 17;
console.log(p.esMayorDeEdad); // false

try {
  p.edad = 200;
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Edad inválida
  }
}

try {
  // 📌 [VALIDACIÓN AL CREAR] Como el constructor usa el setter, tampoco se puede CREAR una persona inválida
  new Persona("1", "X", 30, "sin-arroba");
} catch (e) {
  if (e instanceof Error) {
    console.log(e.message); // Email inválido
  }
}
// p.esMayorDeEdad = true; ❌ no compila: no tiene setter
