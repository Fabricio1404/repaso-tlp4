// ============================================================================
// EJEMPLO 4 · ADAPTER (AdaptadorInventario) — tomado de la guía
// Consigna: adaptar la clase vieja InventarioViejo (método agregarItem) a la
// interfaz Inventario que espera el sistema nuevo (agregarEquipo y listarEquipos).
// ============================================================================

interface EquipoRegistrado {
  nombre: string;
  tipo: string;
  estado: string;
}

// 📌 [ADAPTER ① TARGET] El contrato que espera el sistema nuevo
interface Inventario {
  agregarEquipo(nombre: string, tipo: string, estado: string): void;
  listarEquipos(): EquipoRegistrado[];
}

// 📌 [ADAPTER ② ADAPTEE] La clase vieja: otros nombres de métodos y otro formato (texto "nombre|tipo|estado"). NO SE MODIFICA
class InventarioViejo {
  private items: string[];

  constructor() {
    this.items = [];
  }

  agregarItem(texto: string): void {
    this.items.push(texto);
  }

  obtenerItems(): string[] {
    return this.items;
  }
}

// 📌 [ADAPTER ③ ADAPTADOR] Implementa el target (lo que espera el sistema nuevo)...
class AdaptadorInventario implements Inventario {
  // 📌 [ADAPTER ④ COMPOSICIÓN] ...y GUARDA una referencia al adaptee: no reimplementa nada, delega
  private viejo: InventarioViejo;

  constructor(viejo: InventarioViejo) {
    this.viejo = viejo;
  }

  // 📌 [ADAPTER ⑤ TRADUCE LA LLAMADA] agregarEquipo(3 parámetros) → agregarItem(1 texto)
  agregarEquipo(nombre: string, tipo: string, estado: string): void {
    this.viejo.agregarItem(`${nombre}|${tipo}|${estado}`);
  }

  // 📌 [ADAPTER ⑥ TRADUCE LA RESPUESTA] string[] con "|" → EquipoRegistrado[]
  listarEquipos(): EquipoRegistrado[] {
    const resultado: EquipoRegistrado[] = [];
    const items = this.viejo.obtenerItems();
    for (let i = 0; i < items.length; i++) {
      const partes = items[i].split("|");
      resultado.push({ nombre: partes[0], tipo: partes[1], estado: partes[2] });
    }
    return resultado;
  }
}

// 📌 [CLIENTE] Código del sistema nuevo: depende SOLO de la interfaz Inventario, no sabe que atrás hay una clase vieja
function imprimirInventario(inv: Inventario): void {
  for (const e of inv.listarEquipos()) {
    console.log(`${e.nombre} (${e.tipo}): ${e.estado}`);
  }
}

// Bloque de prueba
const inventarioViejo = new InventarioViejo();
inventarioViejo.agregarItem("Impresora HP|Periférico|disponible"); // datos cargados por el sistema viejo
const adaptador = new AdaptadorInventario(inventarioViejo);
adaptador.agregarEquipo("Servidor Dell", "Servidor", "disponible");
console.log(adaptador.listarEquipos());
// [
//   { nombre: 'Impresora HP', tipo: 'Periférico', estado: 'disponible' },
//   { nombre: 'Servidor Dell', tipo: 'Servidor', estado: 'disponible' }
// ]
imprimirInventario(adaptador);
// Impresora HP (Periférico): disponible
// Servidor Dell (Servidor): disponible
