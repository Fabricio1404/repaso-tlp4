// EJERCICIO M4 · Varias interfaces — consigna en ENUNCIADOS.md

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

// TODO: completá cada clase con su "implements", atributos, constructor y métodos.
class ClienteParticular {
  constructor(id: string, nombre: string, email: string, plan: Plan) {
    // TODO
  }
}

class ClienteEmpresa {
  constructor(id: string, razonSocial: string, telefono: string, empleados: number) {
    // TODO
  }
}

class Proveedor {
  constructor(id: string, nombre: string, email: string) {
    // TODO
  }
}

function avisarATodos(destinatarios: Notificable[], mensaje: string): string[] {
  throw new Error("TODO");
}

function facturacionTotal(clientes: Facturable[]): number {
  throw new Error("TODO");
}

// TODO: buscarPorId genérico. Reemplazá esta firma provisoria por la genérica.
function buscarPorId(lista: Identificable[], id: string): Identificable | undefined {
  throw new Error("TODO");
}

// ------------------------- Bloque de prueba (descomentá) -------------------------
// (está comentado porque no compila hasta que las clases implementen las interfaces)
// const cli1 = new ClienteParticular("C1", "Ana", "ana@mail.com", "full");
// const cli2 = new ClienteEmpresa("C2", "ACME SA", "381-555", 10);
// const prov = new Proveedor("P1", "Distribuidora Norte", "ventas@norte.com");
//
// const avisos = avisarATodos([cli1, cli2, prov], "Mañana no hay servicio");
// for (const a of avisos) {
//   console.log(a);
// }
// console.log(`Facturación: $${facturacionTotal([cli1, cli2])}`);
//
// const clientes = [cli1, cli2];
// const encontrado = buscarPorId(clientes, "C2");
// console.log(encontrado?.montoMensual());
// console.log(buscarPorId(clientes, "X9") === undefined);
