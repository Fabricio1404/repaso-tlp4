// RESOLUCIÓN F5 · Ticket con numeración automática

class Ticket {
  // 📌 [STATIC] Contador de la CLASE: compartido por todos los tickets. private para que nadie lo altere desde afuera
  private static emitidos: number = 0;
  // 📌 [READONLY] El id se asigna una vez en el constructor y no cambia nunca
  readonly id: number;
  descripcion: string;

  constructor(descripcion: string) {
    // 📌 [STATIC] Se incrementa el contador de la clase y se usa como id de ESTE objeto
    Ticket.emitidos++;
    this.id = Ticket.emitidos;
    this.descripcion = descripcion;
  }

  // 📌 [MÉTODO STATIC] Se llama sobre la clase: Ticket.cantidadEmitida()
  static cantidadEmitida(): number {
    return Ticket.emitidos;
  }

  toString(): string {
    return `#${this.id} - ${this.descripcion}`;
  }
}

// Bloque de prueba
const tickets = [new Ticket("Falla de impresora"), new Ticket("Sin internet"), new Ticket("Mouse roto")];
for (const t of tickets) {
  console.log(t.toString());
}
console.log(`Emitidos: ${Ticket.cantidadEmitida()}`);
