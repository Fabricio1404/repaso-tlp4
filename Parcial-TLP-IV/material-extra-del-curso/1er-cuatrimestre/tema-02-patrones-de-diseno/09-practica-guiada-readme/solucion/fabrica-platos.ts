// SOLUCIÓN · fabrica-platos.ts (TAREA 3: Factory)
import type { Plato, TipoPlato } from "./modelos.ts";
import { Empanada, Ensalada, Pizza } from "./modelos.ts";

export class FabricaPlatos {
  // 📌 [FACTORY] Único lugar del sistema con new de un plato concreto; devuelve el tipo común Plato
  static crear(tipo: TipoPlato): Plato {
    switch (tipo) {
      case "pizza":
        return new Pizza();
      case "empanada":
        return new Empanada();
      case "ensalada":
        return new Ensalada();
    }
  }
}
