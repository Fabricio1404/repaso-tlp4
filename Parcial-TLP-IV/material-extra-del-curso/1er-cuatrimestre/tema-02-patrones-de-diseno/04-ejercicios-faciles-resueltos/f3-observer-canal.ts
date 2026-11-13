// RESOLUCIÓN F3 · Observer: canal de videos y suscriptores

// 📌 [OBSERVER - INTERFAZ OBSERVADOR]
interface Suscriptor {
  notificar(canal: string, titulo: string): void;
}

// 📌 [OBSERVER - OBSERVADOR CONCRETO]
class Usuario implements Suscriptor {
  readonly nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  notificar(canal: string, titulo: string): void {
    console.log(`${this.nombre} recibió: "${titulo}" de ${canal}`);
  }
}

// 📌 [OBSERVER - SUJETO]
class Canal {
  readonly nombre: string;
  // 📌 [LISTA DE LA INTERFAZ] El canal no sabe que son Usuarios
  private suscriptores: Suscriptor[];

  constructor(nombre: string) {
    this.nombre = nombre;
    this.suscriptores = [];
  }

  // 📌 [SUSCRIBIR] Evita duplicados
  suscribir(s: Suscriptor): void {
    if (!this.suscriptores.includes(s)) {
      this.suscriptores.push(s);
    }
  }

  // 📌 [DESUSCRIBIR]
  desuscribir(s: Suscriptor): void {
    this.suscriptores = this.suscriptores.filter((x) => x !== s);
  }

  get cantidadSuscriptores(): number {
    return this.suscriptores.length;
  }

  // 📌 [EL CAMBIO DISPARA LA NOTIFICACIÓN]
  subirVideo(titulo: string): void {
    for (const s of this.suscriptores) {
      s.notificar(this.nombre, titulo);
    }
  }
}

// Bloque de prueba
const canal = new Canal("TLP en 10 minutos");
const ana = new Usuario("Ana");
const beto = new Usuario("Beto");
canal.suscribir(ana);
canal.suscribir(beto);
canal.suscribir(ana); // repetido: no se agrega
console.log(`Suscriptores: ${canal.cantidadSuscriptores}`);
canal.subirVideo("Singleton explicado");
canal.desuscribir(beto);
canal.subirVideo("Observer explicado");
