// ============================================================================
// EJEMPLO 3 · HERENCIA y POLIMORFISMO (Empleado, EmpleadoFijo, PorHoras, PorComision)
// Ejercicios 3 y 4 de la guía, resueltos en el mismo archivo.
// ============================================================================

// 📌 [HERENCIA] Clase base (superclase / padre): lo COMÚN a todos los empleados
class Empleado {
  // 📌 [PROTECTED] Las subclases pueden leer nombre y antiguedad; el código de afuera NO
  protected nombre: string;
  protected antiguedad: number;

  constructor(nombre: string, antiguedad: number) {
    this.nombre = nombre;
    this.antiguedad = antiguedad;
  }

  // 📌 [MÉTODO A SOBRESCRIBIR] Versión por defecto; cada hija la redefine (en el tema de clases abstractas verás que conviene que sea abstract)
  calcularSueldo(): number {
    return 0;
  }

  // 📌 [POLIMORFISMO] describir() se escribe UNA vez en el padre, pero this.calcularSueldo() ejecuta la versión del objeto REAL
  describir(): string {
    return `${this.nombre} (${this.antiguedad} años) — sueldo: $${this.calcularSueldo()}`;
  }
}

// 📌 [HERENCIA] extends: EmpleadoFijo ES UN Empleado y hereda nombre, antiguedad y describir()
class EmpleadoFijo extends Empleado {
  // 📌 [ESPECIALIZACIÓN] Atributo propio que el padre no tiene
  private sueldoBase: number;

  constructor(nombre: string, antiguedad: number, sueldoBase: number) {
    // 📌 [SUPER] Primero se inicializa la parte heredada; recién después se puede usar this
    super(nombre, antiguedad);
    this.sueldoBase = sueldoBase;
  }

  // 📌 [OVERRIDE] Sobrescritura: misma firma que en Empleado, comportamiento distinto
  override calcularSueldo(): number {
    // 📌 [PROTECTED] this.antiguedad viene del padre; si fuera private esto no compilaría
    const bono = this.sueldoBase * 0.02 * this.antiguedad;
    return this.sueldoBase + bono;
  }
}

class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private valorHora: number;

  constructor(nombre: string, antiguedad: number, horasTrabajadas: number, valorHora: number) {
    super(nombre, antiguedad);
    this.horasTrabajadas = horasTrabajadas;
    this.valorHora = valorHora;
  }

  // 📌 [OVERRIDE] Otra forma de calcular el sueldo: horas × valor hora
  override calcularSueldo(): number {
    return this.horasTrabajadas * this.valorHora;
  }
}

class EmpleadoPorComision extends Empleado {
  private ventasDelMes: number;
  private porcentajeComision: number;

  constructor(nombre: string, antiguedad: number, ventasDelMes: number, porcentajeComision: number) {
    super(nombre, antiguedad);
    this.ventasDelMes = ventasDelMes;
    this.porcentajeComision = porcentajeComision;
  }

  // 📌 [OVERRIDE] Ventas × porcentaje
  override calcularSueldo(): number {
    return this.ventasDelMes * this.porcentajeComision;
  }
}

// 📌 [POLIMORFISMO] Recibe Empleado[] (el tipo del padre) y nunca pregunta el tipo concreto: no hay if/switch por clase
function calcularNomina(empleados: Empleado[]): number {
  let total: number = 0;
  for (let i = 0; i < empleados.length; i++) {
    // 📌 [DESPACHO DINÁMICO] La misma línea ejecuta tres métodos distintos según el objeto real
    total = total + empleados[i].calcularSueldo();
  }
  return total;
}

// Bloque de prueba
// 📌 [SUSTITUCIÓN] Un arreglo del tipo padre puede guardar cualquier hija
const equipo: Empleado[] = [
  new EmpleadoFijo("Juan", 3, 100000),
  new EmpleadoPorHoras("Marta", 1, 80, 2500),
  new EmpleadoPorComision("Pedro", 2, 500000, 0.1),
];
for (let i = 0; i < equipo.length; i++) {
  console.log(equipo[i].describir());
}
console.log(`Nómina total: $${calcularNomina(equipo)}`);

// Salida esperada:
// Juan (3 años) — sueldo: $106000
// Marta (1 años) — sueldo: $200000
// Pedro (2 años) — sueldo: $50000
// Nómina total: $356000
