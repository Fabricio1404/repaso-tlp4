// ============================================================================
// EJEMPLO 4 · ISP — MultifunctionPrinter (guía de la cátedra)
// Consigna: SimplePrinter está obligada a implementar scan y fax (que lanzan error)
// aunque solo imprime. Partir la interfaz en Printer, Scanner y Fax.
// ============================================================================

// ------------------------------- ANTES -------------------------------------
// 📌 [ISP ✗ INTERFAZ GORDA] Obliga a todos a implementar las tres capacidades
interface MultifunctionDevice {
  print(document: string): void;
  scan(document: string): void;
  fax(document: string): void;
}

class SimplePrinterOriginal implements MultifunctionDevice {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

  // 📌 [ISP ✗ MÉTODO QUE NO LE CORRESPONDE] Compila (cumple el contrato) pero EXPLOTA en ejecución
  scan(document: string): void {
    throw new Error(`SimplePrinter no puede escanear ${document}`);
  }

  fax(document: string): void {
    throw new Error(`SimplePrinter no puede enviar fax de ${document}`);
  }
}

// ------------------------------- DESPUÉS -----------------------------------
// 📌 [ISP ✓ INTERFACES CHICAS] Una por capacidad
interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(document: string): void;
}

interface Fax {
  fax(document: string): void;
}

// 📌 [ISP ✓ IMPLEMENTA SOLO LO QUE TIENE]
class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }
}

// 📌 [ISP ✓ VARIAS INTERFACES] La multifunción combina las tres
class MultifunctionPrinter implements Printer, Scanner, Fax {
  print(document: string): void {
    console.log(`Imprimiendo: ${document}`);
  }

  scan(document: string): void {
    console.log(`Escaneando: ${document}`);
  }

  fax(document: string): void {
    console.log(`Enviando fax: ${document}`);
  }
}

// 📌 [ISP ✓ EL CLIENTE PIDE LO MÍNIMO] Esta función solo necesita escanear: acepta cualquier Scanner
function digitalizar(documentos: string[], scanner: Scanner): void {
  for (const d of documentos) {
    scanner.scan(d);
  }
}

// Bloque de prueba
const vieja = new SimplePrinterOriginal();
vieja.print("tarea.txt");
try {
  vieja.scan("dni.jpg"); // compiló sin problemas... y explota
} catch (e) {
  if (e instanceof Error) console.log(`ERROR EN EJECUCIÓN: ${e.message}`);
}

new SimplePrinter().print("tarea.txt");
const multi = new MultifunctionPrinter();
multi.print("informe.pdf");
multi.scan("informe.pdf");
digitalizar(["a.pdf", "b.pdf"], multi);
// digitalizar(["a.pdf"], new SimplePrinter()); ❌ no compila: el error se detecta ANTES de ejecutar
