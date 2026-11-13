// RESOLUCIÓN M4 · Varias interfaces en una clase (polimorfismo sin herencia)

// 📌 [INTERFACE] Tres contratos chicos e independientes
interface Identificable {
  readonly id: string;
}

interface Notificable {
  notificar(mensaje: string): string;
}

interface Facturable {
  montoMensual(): number;
}

type Plan = "basico" | "full";

// 📌 [IMPLEMENTS MÚLTIPLE] Una clase puede cumplir varios contratos a la vez (con extends solo se hereda de UNA clase)
class ClienteParticular implements Identificable, Notificable, Facturable {
  readonly id: string;
  nombre: string;
  private email: string;
  private plan: Plan;

  constructor(id: string, nombre: string, email: string, plan: Plan) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.plan = plan;
  }

  notificar(mensaje: string): string {
    return `Email a ${this.email}: ${mensaje}`;
  }

  montoMensual(): number {
    return this.plan === "basico" ? 5000 : 9000;
  }
}

class ClienteEmpresa implements Identificable, Notificable, Facturable {
  readonly id: string;
  razonSocial: string;
  private telefono: string;
  private empleados: number;

  constructor(id: string, razonSocial: string, telefono: string, empleados: number) {
    this.id = id;
    this.razonSocial = razonSocial;
    this.telefono = telefono;
    this.empleados = empleados;
  }

  // 📌 [MISMO CONTRATO, OTRA IMPLEMENTACIÓN] Notifica por SMS en vez de email
  notificar(mensaje: string): string {
    return `SMS a ${this.telefono}: ${mensaje}`;
  }

  montoMensual(): number {
    return 2000 * this.empleados;
  }
}

// 📌 [INTERFACE SEGREGADA] El proveedor se notifica pero NO se factura: implementa solo lo que le corresponde
class Proveedor implements Identificable, Notificable {
  readonly id: string;
  nombre: string;
  private email: string;

  constructor(id: string, nombre: string, email: string) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
  }

  notificar(mensaje: string): string {
    return `Email a ${this.email}: ${mensaje}`;
  }
}

// 📌 [POLIMORFISMO CON INTERFACES] Acepta cualquier Notificable, sin importar la clase
function avisarATodos(destinatarios: Notificable[], mensaje: string): string[] {
  return destinatarios.map((d) => d.notificar(mensaje));
}

function facturacionTotal(clientes: Facturable[]): number {
  return clientes.reduce((acc, c) => acc + c.montoMensual(), 0);
}

// 📌 [GENÉRICO] T es "cualquier tipo que sea Identificable": devuelve el MISMO tipo que recibe (no pierde información)
function buscarPorId<T extends Identificable>(lista: T[], id: string): T | undefined {
  return lista.find((x) => x.id === id);
}

// Bloque de prueba
const cli1 = new ClienteParticular("C1", "Ana", "ana@mail.com", "full");
const cli2 = new ClienteEmpresa("C2", "ACME SA", "381-555", 10);
const prov = new Proveedor("P1", "Distribuidora Norte", "ventas@norte.com");

const avisos = avisarATodos([cli1, cli2, prov], "Mañana no hay servicio");
for (const a of avisos) {
  console.log(a);
}
console.log(`Facturación: $${facturacionTotal([cli1, cli2])}`);

const clientes = [cli1, cli2];
const encontrado = buscarPorId(clientes, "C2");
console.log(encontrado?.montoMensual());
console.log(buscarPorId(clientes, "X9") === undefined);
// facturacionTotal([prov]); ❌ no compila: Proveedor no es Facturable
