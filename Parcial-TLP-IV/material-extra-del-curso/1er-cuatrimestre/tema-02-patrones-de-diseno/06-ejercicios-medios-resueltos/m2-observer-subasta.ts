// RESOLUCIÓN M2 · Observer: subasta con varios tipos de observadores

// 📌 [EVENTO COMO OBJETO] Notificación "push" con un objeto: agregar un dato no cambia la firma de actualizar
interface EventoOferta {
  readonly articulo: string;
  readonly postor: string;
  readonly monto: number;
  readonly anterior: number;
}

// 📌 [OBSERVER - INTERFAZ]
interface ObservadorSubasta {
  nuevaOferta(evento: EventoOferta): void;
}

// 📌 [OBSERVER - SUJETO]
class Subasta {
  readonly articulo: string;
  private mejorOferta: number;
  private mejorPostor: string | undefined;
  private observadores: ObservadorSubasta[];
  private cerrada: boolean;

  constructor(articulo: string, precioBase: number) {
    this.articulo = articulo;
    this.mejorOferta = precioBase;
    this.mejorPostor = undefined;
    this.observadores = [];
    this.cerrada = false;
  }

  suscribir(o: ObservadorSubasta): void {
    this.observadores.push(o);
  }

  desuscribir(o: ObservadorSubasta): void {
    this.observadores = this.observadores.filter((x) => x !== o);
  }

  ofertar(postor: string, monto: number): void {
    if (this.cerrada) {
      throw new Error("La subasta está cerrada");
    }
    if (monto <= this.mejorOferta) {
      throw new Error(`La oferta debe superar $${this.mejorOferta}`);
    }
    const evento: EventoOferta = { articulo: this.articulo, postor: postor, monto: monto, anterior: this.mejorOferta };
    // 📌 [CAMBIAR ESTADO Y DESPUÉS NOTIFICAR] Los observadores ven el estado ya actualizado
    this.mejorOferta = monto;
    this.mejorPostor = postor;
    this.notificar(evento);
  }

  cerrar(): string {
    this.cerrada = true;
    return this.mejorPostor === undefined
      ? `${this.articulo}: sin ofertas`
      : `${this.articulo}: adjudicado a ${this.mejorPostor} por $${this.mejorOferta}`;
  }

  // 📌 [NOTIFICAR] Sin saber qué tipo de observador es cada uno
  private notificar(evento: EventoOferta): void {
    for (const o of this.observadores) {
      o.nuevaOferta(evento);
    }
  }
}

// 📌 [OBSERVADOR CONCRETO 1] Reacciona solo si la oferta es de OTRO postor
class Postor implements ObservadorSubasta {
  readonly nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  nuevaOferta(evento: EventoOferta): void {
    if (evento.postor !== this.nombre) {
      console.log(`  (${this.nombre}) Te superaron: ${evento.postor} ofreció $${evento.monto}`);
    }
  }
}

// 📌 [OBSERVADOR CONCRETO 2] Muestra todo
class PantallaSala implements ObservadorSubasta {
  nuevaOferta(evento: EventoOferta): void {
    console.log(`[PANTALLA] ${evento.articulo}: $${evento.anterior} → $${evento.monto} (${evento.postor})`);
  }
}

// 📌 [OBSERVADOR CONCRETO 3] Guarda en vez de imprimir
class Auditoria implements ObservadorSubasta {
  private registro: EventoOferta[];

  constructor() {
    this.registro = [];
  }

  nuevaOferta(evento: EventoOferta): void {
    this.registro.push(evento);
  }

  get totalOfertas(): number {
    return this.registro.length;
  }

  mayorSalto(): number {
    return this.registro.reduce((max, e) => Math.max(max, e.monto - e.anterior), 0);
  }
}

// Bloque de prueba
const subasta = new Subasta("Guitarra criolla", 50000);
const pantalla = new PantallaSala();
const auditoria = new Auditoria();
const ana = new Postor("Ana");
const beto = new Postor("Beto");
subasta.suscribir(pantalla);
subasta.suscribir(auditoria);
subasta.suscribir(ana);
subasta.suscribir(beto);

subasta.ofertar("Ana", 55000);
subasta.ofertar("Beto", 60000);
try {
  subasta.ofertar("Ana", 60000);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
subasta.desuscribir(pantalla);
subasta.ofertar("Ana", 80000);
console.log(subasta.cerrar());
console.log(`Ofertas registradas: ${auditoria.totalOfertas}, mayor salto: $${auditoria.mayorSalto()}`);
try {
  subasta.ofertar("Beto", 90000);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
