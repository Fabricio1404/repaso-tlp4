// SOLUCIÓN · cocina.ts (TAREA 2: Singleton)

export class Cocina {
  // 📌 [SINGLETON ①] La única cocina
  private static instancia: Cocina | undefined;
  private cola: string[];

  // 📌 [SINGLETON ②] Antes era público: Pedido y main hacían new Cocina() y cada uno tenía SU cola
  private constructor() {
    this.cola = [];
  }

  // 📌 [SINGLETON ③]
  static obtenerInstancia(): Cocina {
    if (Cocina.instancia === undefined) {
      Cocina.instancia = new Cocina();
    }
    return Cocina.instancia;
  }

  encolar(descripcion: string): number {
    this.cola.push(descripcion);
    return this.cola.length;
  }

  pendientes(): number {
    return this.cola.length;
  }

  despachar(): string | undefined {
    return this.cola.shift();
  }
}
