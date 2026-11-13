// RESOLUCIÓN F4 · Rectangulo con getters y setters

class Rectangulo {
  // 📌 [ATRIBUTO RESPALDO] _ancho/_alto guardan el dato; ancho/alto son el getter y setter
  private _ancho: number;
  private _alto: number;

  constructor(ancho: number, alto: number) {
    this._ancho = 0;
    this._alto = 0;
    // 📌 [SETTER EN CONSTRUCTOR] Así la validación corre también al crear
    this.ancho = ancho;
    this.alto = alto;
  }

  get ancho(): number {
    return this._ancho;
  }

  // 📌 [SETTER CON REGLA] Un setter tiene sentido porque valida; si solo copiara, sería burocracia
  set ancho(valor: number) {
    Rectangulo.validar(valor);
    this._ancho = valor;
  }

  get alto(): number {
    return this._alto;
  }

  set alto(valor: number) {
    Rectangulo.validar(valor);
    this._alto = valor;
  }

  // 📌 [GETTER CALCULADO] No se guarda: se calcula cada vez, nunca queda desactualizado
  get area(): number {
    return this._ancho * this._alto;
  }

  get perimetro(): number {
    return 2 * (this._ancho + this._alto);
  }

  get esCuadrado(): boolean {
    return this._ancho === this._alto;
  }

  // 📌 [MÉTODO STATIC PRIVADO] No usa this: la validación no depende de un rectángulo puntual
  private static validar(valor: number): void {
    if (valor <= 0) {
      throw new Error("Las medidas deben ser mayores a 0");
    }
  }
}

// Bloque de prueba
const r = new Rectangulo(3, 4);
console.log(r.area, r.perimetro, r.esCuadrado);
r.ancho = 5;
r.alto = 5;
console.log(r.area, r.perimetro, r.esCuadrado);
try {
  new Rectangulo(0, 2);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
