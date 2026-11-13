// RESOLUCIÓN D3 · Gestión de cursos
// Integra: interface + clase abstracta juntas, herencia, polimorfismo, getters calculados,
// setter/validación con RangeError, composición (Curso tiene Docente y Alumnos), sin duplicados, copias.

// 📌 [INTERFACE] Contrato mínimo que comparten todas las entidades con identificador
interface Identificable {
  readonly id: string;
}

// 📌 [CLASE ABSTRACTA QUE IMPLEMENTA INTERFACE] Combina contrato (Identificable) con código común (presentarse)
abstract class Persona implements Identificable {
  readonly id: string;
  nombre: string;

  constructor(dni: string, nombre: string) {
    // 📌 [VALIDAR EN CONSTRUCTOR] DNI de 7 u 8 dígitos
    if (!/^\d{7,8}$/.test(dni)) {
      throw new Error(`DNI inválido: ${dni}`);
    }
    this.id = dni;
    this.nombre = nombre;
  }

  abstract rol(): string;

  // 📌 [POLIMORFISMO] Escrito una vez; rol() cambia según la subclase
  presentarse(): string {
    return `${this.rol()}: ${this.nombre} (DNI ${this.id})`;
  }
}

class Alumno extends Persona {
  // 📌 [ENCAPSULAMIENTO] Las notas solo entran por agregarNota (que valida)
  private notas: number[];

  constructor(dni: string, nombre: string) {
    super(dni, nombre);
    this.notas = [];
  }

  rol(): string {
    return "Alumno";
  }

  agregarNota(nota: number): void {
    // 📌 [RANGEERROR] El dato es un número (tipo correcto) pero está fuera del rango permitido
    if (!Number.isInteger(nota) || nota < 1 || nota > 10) {
      throw new RangeError("La nota debe ser un entero entre 1 y 10");
    }
    this.notas.push(nota);
  }

  // 📌 [GETTER CALCULADO] Se calcula a partir de las notas; nunca queda desactualizado
  get promedio(): number {
    if (this.notas.length === 0) return 0;
    const suma = this.notas.reduce((acc, n) => acc + n, 0);
    return suma / this.notas.length;
  }

  get aprobado(): boolean {
    return this.notas.length >= 2 && this.promedio >= 6;
  }
}

class Docente extends Persona {
  readonly materia: string;

  constructor(dni: string, nombre: string, materia: string) {
    super(dni, nombre);
    this.materia = materia;
  }

  rol(): string {
    return "Docente";
  }

  // 📌 [OVERRIDE + SUPER] Extiende la presentación del padre en vez de reescribirla
  override presentarse(): string {
    return `${super.presentarse()} — ${this.materia}`;
  }
}

class Curso {
  readonly nombre: string;
  private readonly cupo: number;
  // 📌 [AGREGACIÓN] El docente existe por fuera del curso; puede no estar asignado todavía
  private docente: Docente | undefined;
  private alumnos: Alumno[];

  constructor(nombre: string, cupo: number) {
    this.nombre = nombre;
    this.cupo = cupo;
    this.docente = undefined;
    this.alumnos = [];
  }

  asignarDocente(docente: Docente): void {
    this.docente = docente;
  }

  inscribir(alumno: Alumno): void {
    if (this.alumnos.length >= this.cupo) {
      throw new Error(`El curso ${this.nombre} no tiene cupo`);
    }
    // 📌 [SIN DUPLICADOS] Se compara por id (DNI), no por referencia: dos objetos con el mismo DNI son la misma persona
    if (this.alumnos.some((a) => a.id === alumno.id)) {
      throw new Error(`${alumno.nombre} ya está inscripto`);
    }
    this.alumnos.push(alumno);
  }

  darDeBaja(dni: string): void {
    const antes = this.alumnos.length;
    this.alumnos = this.alumnos.filter((a) => a.id !== dni);
    if (this.alumnos.length === antes) {
      throw new Error(`No hay ningún alumno con DNI ${dni}`);
    }
  }

  get inscriptos(): number {
    return this.alumnos.length;
  }

  // 📌 [COPIA DEFENSIVA] filter ya devuelve un arreglo nuevo
  aprobados(): Alumno[] {
    return this.alumnos.filter((a) => a.aprobado);
  }

  mejorPromedio(): Alumno | undefined {
    let mejor: Alumno | undefined = undefined;
    for (const a of this.alumnos) {
      if (mejor === undefined || a.promedio > mejor.promedio) {
        mejor = a;
      }
    }
    return mejor;
  }

  // 📌 [SUSTITUCIÓN] Docente y Alumno juntos en un Persona[]
  integrantes(): Persona[] {
    const lista: Persona[] = [];
    if (this.docente !== undefined) lista.push(this.docente);
    return lista.concat(this.alumnos);
  }

  reporte(): string[] {
    // 📌 [NARROWING / OPTIONAL CHAINING] docente puede ser undefined
    const encabezado = `${this.nombre} (${this.inscriptos}/${this.cupo}) — docente: ${this.docente?.nombre ?? "sin asignar"}`;
    const filas = this.alumnos.map(
      (a) => `- ${a.nombre}: ${a.promedio.toFixed(2)} (${a.aprobado ? "aprobado" : "desaprobado"})`,
    );
    return [encabezado, ...filas];
  }
}

// Bloque de prueba
const curso = new Curso("Programación IV", 3);
const ana = new Alumno("30111222", "Ana");
const beto = new Alumno("30333444", "Beto");
const caro = new Alumno("30555666", "Caro");

for (const linea of curso.reporte()) console.log(linea);
curso.asignarDocente(new Docente("20999888", "Prof. Díaz", "TLP IV"));
curso.inscribir(ana);
curso.inscribir(beto);
try {
  curso.inscribir(new Alumno("30111222", "Ana (otra vez)"));
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
curso.inscribir(caro);
try {
  curso.inscribir(new Alumno("40000000", "Dani"));
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}

ana.agregarNota(8);
ana.agregarNota(9);
beto.agregarNota(4);
beto.agregarNota(7);
caro.agregarNota(10);
try {
  caro.agregarNota(11);
} catch (e) {
  if (e instanceof RangeError) console.log(`RangeError: ${e.message}`);
}
try {
  new Alumno("12A", "X");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}

for (const linea of curso.reporte()) console.log(linea);
console.log(`Aprobados: ${curso.aprobados().map((a) => a.nombre).join(", ")}`);
console.log(`Mejor promedio: ${curso.mejorPromedio()?.nombre}`);
curso.darDeBaja("30333444");
for (const p of curso.integrantes()) console.log(p.presentarse());
