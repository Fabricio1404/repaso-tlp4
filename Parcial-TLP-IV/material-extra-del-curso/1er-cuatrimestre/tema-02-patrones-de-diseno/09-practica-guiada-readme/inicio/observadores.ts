// INICIO · observadores.ts (el nombre del archivo es una pista...)

export class Mozo {
  readonly nombre: string;
  constructor(nombre: string) {
    this.nombre = nombre;
  }
  avisar(pedido: number, destino: string, estado: string): void {
    console.log(`  [Mozo ${this.nombre}] Pedido #${pedido} (${destino}): ${estado}`);
  }
}

export class PantallaCocina {
  mostrar(pedido: number, estado: string): void {
    if (estado === "confirmado") {
      console.log(`  [Pantalla] NUEVO #${pedido}`);
    }
  }
}
