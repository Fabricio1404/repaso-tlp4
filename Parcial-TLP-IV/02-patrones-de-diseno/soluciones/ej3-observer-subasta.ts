// Ejercicio 3 · Observer: subasta

// Contrato de los observadores
interface ObservadorSubasta {
  actualizar(producto: string, monto: number, postor: string): void;
}

// El sujeto
class Subasta {
  private producto: string;
  private mejorOferta: number;
  private observadores: ObservadorSubasta[];

  constructor(producto: string, precioBase: number) {
    this.producto = producto;
    this.mejorOferta = precioBase;
    this.observadores = [];
  }

  suscribir(o: ObservadorSubasta): void {
    this.observadores.push(o);
  }

  desuscribir(o: ObservadorSubasta): void {
    this.observadores = this.observadores.filter(x => x !== o);
  }

  private notificar(postor: string): void {
    for (const o of this.observadores) {
      o.actualizar(this.producto, this.mejorOferta, postor);
    }
  }

  ofertar(postor: string, monto: number): void {
    if (monto <= this.mejorOferta) {
      throw new RangeError(`La oferta debe superar $${this.mejorOferta}`);
    }
    this.mejorOferta = monto;
    this.notificar(postor);   // solo se avisa si la oferta fue válida
  }
}

// Observadores concretos
class Participante implements ObservadorSubasta {
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  actualizar(producto: string, monto: number, postor: string): void {
    if (postor === this.nombre) {
      console.log(`[${this.nombre}] Vas ganando ${producto} con $${monto}`);
    } else {
      console.log(`[${this.nombre}] ${postor} ofertó $${monto} por ${producto}`);
    }
  }
}

class RegistroAuditoria implements ObservadorSubasta {
  private eventos: number = 0;

  actualizar(producto: string, monto: number, postor: string): void {
    this.eventos++;
    console.log(`[Auditoría #${this.eventos}] ${producto}: ${postor} → $${monto}`);
  }
}

// ---------------- Bloque de prueba ----------------
const subasta = new Subasta("Guitarra", 100000);
const ana = new Participante("Ana");
const beto = new Participante("Beto");
const auditoria = new RegistroAuditoria();

subasta.suscribir(ana);
subasta.suscribir(beto);
subasta.suscribir(auditoria);

subasta.ofertar("Ana", 120000);

try {
  subasta.ofertar("Beto", 110000);
} catch (e) {
  if (e instanceof RangeError) console.log(`Error: ${e.message}`);
}

subasta.desuscribir(ana);
subasta.ofertar("Beto", 150000);
