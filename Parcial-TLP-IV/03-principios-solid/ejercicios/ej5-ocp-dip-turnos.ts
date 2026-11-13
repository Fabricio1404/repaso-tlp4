// Ejercicio 5 · OCP + DIP · Turnos médicos (TIPO EJERCICIO 3 DEL PRIMER PARCIAL)
// CONSIGNA:
//   1. Ejecutá este archivo y guardá la salida (debe quedar IDÉNTICA al final).
//      En el parcial: hacé commit de este original ANTES de tocarlo → "chore(ej5): código original".
//   2. Aplicá OCP: el if por canal crece con cada canal nuevo. Creá una interface CanalAviso
//      con el comentario  // OCP: ...  arriba, y una clase por canal.
//   3. Aplicá DIP: ServicioTurnos crea su propio RegistroTurnosArchivo con new. Creá una interface
//      RepositorioTurnos con el comentario  // DIP: ...  arriba, y recibila por constructor.
//      Los canales también se reciben por constructor.
//   4. En el bloque de prueba, creá las dependencias y pasalas al servicio (composition root).
//   5. Verificá: npx tsc sin errores y la MISMA salida.
// Ejecutá: node 03-principios-solid/ejercicios/ej5-ocp-dip-turnos.ts

export {};

class RegistroTurnosArchivo {
  guardar(paciente: string, fecha: string): void {
    console.log(`[archivo] turno guardado: ${paciente} - ${fecha}`);
  }
}

class ServicioTurnos {
  private registro: RegistroTurnosArchivo;
  private canales: string[];

  constructor(canales: string[]) {
    this.registro = new RegistroTurnosArchivo();   // ← new adentro
    this.canales = canales;
  }

  reservar(paciente: string, fecha: string): void {
    this.registro.guardar(paciente, fecha);
    for (const canal of this.canales) {
      if (canal === "email") {
        console.log(`[email] ${paciente}: tu turno es el ${fecha}`);
      } else if (canal === "sms") {
        console.log(`[sms] Turno ${fecha} confirmado`);
      } else if (canal === "whatsapp") {
        console.log(`[whatsapp] Hola ${paciente}! Turno: ${fecha}`);
      }
    }
  }
}

// ---------------- Bloque de prueba ----------------
const servicio = new ServicioTurnos(["email", "whatsapp"]);
servicio.reservar("Ana", "10/12 09:30");
servicio.reservar("Beto", "11/12 15:00");
