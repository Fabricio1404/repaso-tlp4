// PRIMER PARCIAL · TEMA B · EJERCICIO 3 · Refactor (OCP y DIP)

// 📌 [OCP ✓ COMENTARIO OBLIGATORIO] La consigna pide un comentario arriba de cada interfaz nueva con el principio
// OCP: se pueden agregar canales nuevos sin modificar ServicioNotificaciones
interface Canal {
  nombre: string;
  calcularCosto(): number;
}

// 📌 [OCP ✓ UNA CLASE POR OPCIÓN] El costo vive dentro de cada canal
class Email implements Canal {
  nombre: string = "Email";

  calcularCosto(): number {
    return 0;
  }
}

class SMS implements Canal {
  nombre: string = "SMS";

  calcularCosto(): number {
    return 15;
  }
}

// 📌 [DIP ✓ COMENTARIO OBLIGATORIO]
// DIP: el servicio depende de esta abstracción y no de una clase concreta de log
interface Registro {
  escribir(linea: string): void;
}

class RegistroArchivo implements Registro {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

class RegistroBaseDeDatos implements Registro {
  escribir(linea: string): void {
    console.log(`[DB] ${linea}`);
  }
}

class ServicioNotificaciones {
  private registro: Registro;

  // 📌 [DIP ✓ INYECCIÓN POR CONSTRUCTOR] Ya no hace new ArchivoLog()
  constructor(registro: Registro) {
    this.registro = registro;
  }

  // 📌 [OCP ✓ SIN IF] Recibe un Canal: un canal nuevo es una clase nueva y el servicio no se toca
  notificar(canal: Canal, mensaje: string): void {
    this.registro.escribir(`${canal.nombre}: "${mensaje}" ($${canal.calcularCosto()})`);
  }
}

// Bloque de prueba
const servicio = new ServicioNotificaciones(new RegistroArchivo());
servicio.notificar(new Email(), "Hola");
servicio.notificar(new SMS(), "Hola");

// 📌 [DIP ✓ BENEFICIO] Cambiar de archivo a base de datos sin modificar ServicioNotificaciones
const servicioDb = new ServicioNotificaciones(new RegistroBaseDeDatos());
servicioDb.notificar(new Email(), "Prueba");
// Salida:
// [LOG] Email: "Hola" ($0)
// [LOG] SMS: "Hola" ($15)
// [DB] Email: "Prueba" ($0)
