// Ejercicio 3 · Empleados (clase abstracta, herencia, polimorfismo, static, protected)

abstract class Empleado {
  static totalEmpleados: number = 0;     // static: uno solo para TODA la clase

  protected nombre: string;              // protected: las hijas lo pueden usar
  readonly legajo: number;

  constructor(nombre: string) {
    Empleado.totalEmpleados++;           // static se accede con el nombre de la clase
    this.nombre = nombre;
    this.legajo = Empleado.totalEmpleados;
  }

  // Método abstracto: cada tipo de empleado DEBE definir cómo se calcula
  abstract calcularSueldo(): number;

  // Método concreto que usa al abstracto (polimorfismo dentro del padre)
  resumen(): string {
    return `#${this.legajo} ${this.nombre}: $${this.calcularSueldo()}`;
  }
}

class EmpleadoFijo extends Empleado {
  protected sueldoMensual: number;

  constructor(nombre: string, sueldoMensual: number) {
    super(nombre);                       // primero super(...)
    this.sueldoMensual = sueldoMensual;  // después lo propio
  }

  override calcularSueldo(): number {
    return this.sueldoMensual;
  }
}

class EmpleadoPorHora extends Empleado {
  private horas: number;
  private valorHora: number;

  constructor(nombre: string, horas: number, valorHora: number) {
    super(nombre);
    this.horas = horas;
    this.valorHora = valorHora;
  }

  override calcularSueldo(): number {
    return this.horas * this.valorHora;
  }
}

// Gerente ES UN EmpleadoFijo: reutiliza el sueldo y le suma un bono
class Gerente extends EmpleadoFijo {
  private bono: number;

  constructor(nombre: string, sueldoMensual: number, bono: number) {
    super(nombre, sueldoMensual);
    this.bono = bono;
  }

  override calcularSueldo(): number {
    return super.calcularSueldo() + this.bono;   // versión del padre + lo propio
  }
}

// Función polimórfica: NO pregunta el tipo de ningún empleado
function totalNomina(empleados: Empleado[]): number {
  return empleados.reduce((acum, e) => acum + e.calcularSueldo(), 0);
}

// ---------------- Bloque de prueba ----------------
const plantel: Empleado[] = [
  new EmpleadoFijo("Carlos", 800000),
  new EmpleadoPorHora("Sofía", 120, 5000),
  new Gerente("Lucía", 1000000, 250000),
];

for (const e of plantel) {
  console.log(e.resumen());
}
console.log(`Total de la nómina: $${totalNomina(plantel)}`);
console.log(`Empleados creados: ${Empleado.totalEmpleados}`);
