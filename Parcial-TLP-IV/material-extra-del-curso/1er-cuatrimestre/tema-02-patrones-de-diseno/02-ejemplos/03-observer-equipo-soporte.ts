// ============================================================================
// EJEMPLO 3 · OBSERVER (Soporte y Equipo) — tomado de la guía y ampliado
// Consigna: Equipo avisa a sus observadores cuando cambia de estado. Soporte es un
// observador. Equipo depende de una interfaz Observador, no de Soporte.
// ============================================================================

// 📌 [OBSERVER ① INTERFAZ OBSERVADOR] El contrato: todo observador tiene actualizar()
interface Observador {
  actualizar(nombreEquipo: string, nuevoEstado: string): void;
}

// 📌 [OBSERVER ② OBSERVADOR CONCRETO] Decide QUÉ hacer cuando le avisan
class Soporte implements Observador {
  actualizar(nombreEquipo: string, nuevoEstado: string): void {
    console.log(`Soporte notificado: ${nombreEquipo} ha cambiado su estado a ${nuevoEstado}.`);
  }
}

// 📌 [OBSERVER ② OTRO OBSERVADOR] Se agregó sin tocar Equipo: guarda un registro en vez de imprimir
class RegistroDeCambios implements Observador {
  private lineas: string[];

  constructor() {
    this.lineas = [];
  }

  actualizar(nombreEquipo: string, nuevoEstado: string): void {
    this.lineas.push(`${nombreEquipo} → ${nuevoEstado}`);
  }

  obtenerLineas(): string[] {
    return [...this.lineas];
  }
}

// 📌 [OBSERVER ③ SUJETO] El que cambia y avisa
class Equipo {
  nombre: string;
  tipo: string;
  private estado: string;
  // 📌 [OBSERVER ④ LISTA DE LA INTERFAZ] Guarda Observador[], no Soporte[]: no sabe quiénes son
  private observadores: Observador[];

  constructor(nombre: string, tipo: string, estado: string) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.estado = estado;
    this.observadores = [];
  }

  // 📌 [OBSERVER ⑤ SUSCRIBIR] attach
  agregarObservador(observador: Observador): void {
    this.observadores.push(observador);
  }

  // 📌 [OBSERVER ⑥ DESUSCRIBIR] detach: filter crea un arreglo sin ese observador (compara por referencia)
  quitarObservador(observador: Observador): void {
    this.observadores = this.observadores.filter((o) => o !== observador);
  }

  // 📌 [OBSERVER ⑦ EL CAMBIO DISPARA LA NOTIFICACIÓN]
  cambiarEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
    this.notificar();
  }

  // 📌 [OBSERVER ⑧ NOTIFICAR] Recorre la lista y llama a actualizar() en cada uno, sin preguntar el tipo (polimorfismo)
  private notificar(): void {
    for (let i = 0; i < this.observadores.length; i++) {
      this.observadores[i].actualizar(this.nombre, this.estado);
    }
  }
}

// Bloque de prueba
const soporte = new Soporte();
const registro = new RegistroDeCambios();
const equipo = new Equipo("Notebook HP", "Portátil", "disponible");

equipo.agregarObservador(soporte);
equipo.agregarObservador(registro);
equipo.cambiarEstado("en reparación");
// Soporte notificado: Notebook HP ha cambiado su estado a en reparación.

equipo.quitarObservador(soporte);
equipo.cambiarEstado("disponible"); // Soporte ya no se entera; el registro sí

console.log(registro.obtenerLineas());
// [ 'Notebook HP → en reparación', 'Notebook HP → disponible' ]
