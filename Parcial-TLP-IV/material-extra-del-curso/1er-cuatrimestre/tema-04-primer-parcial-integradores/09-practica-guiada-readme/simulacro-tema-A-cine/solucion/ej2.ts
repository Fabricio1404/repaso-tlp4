// SIMULACRO TEMA A · EJERCICIO 2 · Estrenos (Observer + Adapter)

// 📌 [OBSERVER - INTERFAZ]
interface Suscriptor {
  avisar(pelicula: string, fecha: string): void;
}

// 📌 [OBSERVER - CONCRETO]
class SuscriptorEmail implements Suscriptor {
  private email: string;
  constructor(email: string) {
    this.email = email;
  }
  avisar(pelicula: string, fecha: string): void {
    console.log(`Email a ${this.email}: estreno de ${pelicula} el ${fecha}`);
  }
}

// 📌 [ADAPTER - ADAPTEE] Sistema viejo de notificaciones push (dado, no se modifica)
class SistemaPushViejo {
  mandarPush(token: string, titulo: string, cuerpo: string): boolean {
    console.log(`PUSH[${token}] ${titulo} — ${cuerpo}`);
    return true;
  }
}

// 📌 [ADAPTER] Implementa Suscriptor y traduce a mandarPush
class PushAdapter implements Suscriptor {
  private push: SistemaPushViejo;
  private token: string;

  constructor(push: SistemaPushViejo, token: string) {
    this.push = push;
    this.token = token;
  }

  avisar(pelicula: string, fecha: string): void {
    this.push.mandarPush(this.token, "¡Estreno!", `${pelicula} (${fecha})`);
  }
}

// 📌 [OBSERVER - SUJETO]
class Cartelera {
  private suscriptores: Suscriptor[];

  constructor() {
    this.suscriptores = [];
  }

  suscribir(s: Suscriptor): void {
    this.suscriptores.push(s);
  }

  desuscribir(s: Suscriptor): void {
    this.suscriptores = this.suscriptores.filter((x) => x !== s);
  }

  // 📌 [OBSERVER - NOTIFICAR]
  anunciarEstreno(pelicula: string, fecha: string): void {
    for (const s of this.suscriptores) {
      s.avisar(pelicula, fecha);
    }
  }
}

// Bloque de prueba
const cartelera = new Cartelera();
const ana = new SuscriptorEmail("ana@mail.com");
cartelera.suscribir(ana);
cartelera.suscribir(new PushAdapter(new SistemaPushViejo(), "tok-77"));
cartelera.anunciarEstreno("Dune 3", "12/03");
cartelera.desuscribir(ana);
cartelera.anunciarEstreno("Toy Story 5", "19/06");
