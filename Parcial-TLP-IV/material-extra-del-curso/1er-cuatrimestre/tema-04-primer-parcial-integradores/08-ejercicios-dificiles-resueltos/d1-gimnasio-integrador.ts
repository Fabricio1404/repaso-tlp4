// RESOLUCIÓN D1 · Gimnasio — integrador del primer cuatrimestre
// POO: Plan (abstracta), Socio (encapsulamiento, static, getters)
// Singleton: ConfiguracionGimnasio        Factory: FabricaPlanes
// Observer: ClaseGrupal → AvisoSocio / RegistroRecepcion
// Adapter: MolineteAdapter sobre MolineteLegacy
// SOLID: OCP (planes), DIP (Gimnasio recibe ControlAcceso y repos; AvisoSocio recibe Notificador), SRP, ISP

type TipoPlan = "mensual" | "trimestral" | "libre";
type Actividad = "musculacion" | "funcional" | "spinning";

// ============================== SINGLETON ===================================
class ConfiguracionGimnasio {
  // 📌 [SINGLETON] Los precios se definen en un único lugar
  private static instancia: ConfiguracionGimnasio | undefined;
  readonly cuotaBase = 20000;
  readonly descuentoTrimestral = 0.15;
  readonly recargoLibre = 0.5;

  private constructor() {}

  static obtenerInstancia(): ConfiguracionGimnasio {
    if (ConfiguracionGimnasio.instancia === undefined) {
      ConfiguracionGimnasio.instancia = new ConfiguracionGimnasio();
    }
    return ConfiguracionGimnasio.instancia;
  }
}

// ============================== POO + OCP ===================================
// 📌 [CLASE ABSTRACTA + OCP ✓] OCP: un plan nuevo es una clase nueva; Gimnasio y ClaseGrupal no cambian
abstract class Plan {
  abstract nombre(): string;
  abstract cuotaMensual(): number;
  protected abstract actividades(): Actividad[];

  // 📌 [POLIMORFISMO] Método concreto que usa el abstracto
  permite(actividad: Actividad): boolean {
    return this.actividades().includes(actividad);
  }
}

class PlanMensual extends Plan {
  nombre(): string {
    return "Mensual";
  }
  cuotaMensual(): number {
    // 📌 [SINGLETON EN USO] El precio no está escrito acá
    return ConfiguracionGimnasio.obtenerInstancia().cuotaBase;
  }
  protected actividades(): Actividad[] {
    return ["musculacion"];
  }
}

class PlanTrimestral extends Plan {
  nombre(): string {
    return "Trimestral";
  }
  cuotaMensual(): number {
    const c = ConfiguracionGimnasio.obtenerInstancia();
    return Math.round(c.cuotaBase * (1 - c.descuentoTrimestral));
  }
  protected actividades(): Actividad[] {
    return ["musculacion", "funcional"];
  }
}

class PlanLibre extends Plan {
  nombre(): string {
    return "Libre";
  }
  cuotaMensual(): number {
    const c = ConfiguracionGimnasio.obtenerInstancia();
    return Math.round(c.cuotaBase * (1 + c.recargoLibre));
  }
  protected actividades(): Actividad[] {
    return ["musculacion", "funcional", "spinning"];
  }
}

// ============================== FACTORY =====================================
class FabricaPlanes {
  // 📌 [FACTORY] Único lugar con new de los planes
  static crear(tipo: TipoPlan): Plan {
    switch (tipo) {
      case "mensual":
        return new PlanMensual();
      case "trimestral":
        return new PlanTrimestral();
      case "libre":
        return new PlanLibre();
    }
  }
}

// ============================== POO: Socio ==================================
class Socio {
  // 📌 [STATIC] Total histórico de altas (todas las sedes)
  private static altas: number = 0;
  readonly dni: string;
  readonly nombre: string;
  // 📌 [ENCAPSULAMIENTO] El plan y el estado solo cambian por métodos
  private _plan: Plan;
  private _activo: boolean;

  constructor(dni: string, nombre: string, plan: Plan) {
    if (!/^\d{7,8}$/.test(dni)) {
      throw new Error(`DNI inválido: ${dni}`);
    }
    this.dni = dni;
    this.nombre = nombre;
    this._plan = plan;
    this._activo = true;
    Socio.altas++;
  }

  static totalAltas(): number {
    return Socio.altas;
  }

  get plan(): Plan {
    return this._plan;
  }

  get activo(): boolean {
    return this._activo;
  }

  cambiarPlan(plan: Plan): void {
    this._plan = plan;
  }

  suspender(): void {
    this._activo = false;
  }

  describir(): string {
    return `${this.nombre} (${this._plan.nombre()}, $${this._plan.cuotaMensual()})${this._activo ? "" : " [SUSPENDIDO]"}`;
  }
}

// ============================== DIP: notificador ============================
// 📌 [DIP ✓] DIP: los avisos dependen de esta abstracción
interface Notificador {
  enviar(socio: Socio, mensaje: string): void;
}

class NotificadorWhatsapp implements Notificador {
  enviar(socio: Socio, mensaje: string): void {
    console.log(`  [WhatsApp a ${socio.nombre}] ${mensaje}`);
  }
}

// ============================== OBSERVER ====================================
interface EventoClase {
  readonly actividad: Actividad;
  readonly horario: string;
  readonly socio: Socio;
  readonly tipo: "inscripto" | "en-espera" | "promovido";
}

// 📌 [OBSERVER - INTERFAZ]
interface ObservadorClase {
  notificar(e: EventoClase): void;
}

// 📌 [OBSERVER - SUJETO] La clase grupal avisa sin conocer a los observadores
class ClaseGrupal {
  readonly actividad: Actividad;
  readonly horario: string;
  private readonly cupo: number;
  private inscriptos: Socio[];
  private espera: Socio[];
  private observadores: ObservadorClase[];

  constructor(actividad: Actividad, horario: string, cupo: number) {
    this.actividad = actividad;
    this.horario = horario;
    this.cupo = cupo;
    this.inscriptos = [];
    this.espera = [];
    this.observadores = [];
  }

  suscribir(o: ObservadorClase): void {
    this.observadores.push(o);
  }

  inscribir(socio: Socio): void {
    // 📌 [POLIMORFISMO / OCP] Pregunta al plan, sin if por tipo de plan
    if (!socio.plan.permite(this.actividad)) {
      throw new Error(`El plan ${socio.plan.nombre()} no incluye ${this.actividad}`);
    }
    if (this.inscriptos.length < this.cupo) {
      this.inscriptos.push(socio);
      this.avisar(socio, "inscripto");
    } else {
      this.espera.push(socio);
      this.avisar(socio, "en-espera");
    }
  }

  darDeBaja(dni: string): void {
    this.inscriptos = this.inscriptos.filter((s) => s.dni !== dni);
    // 📌 [OBSERVER] Se libera un cupo: se promueve al primero en espera y se avisa
    const siguiente = this.espera.shift();
    if (siguiente !== undefined) {
      this.inscriptos.push(siguiente);
      this.avisar(siguiente, "promovido");
    }
  }

  get ocupacion(): string {
    return `${this.actividad} ${this.horario}: ${this.inscriptos.length}/${this.cupo} (espera: ${this.espera.length})`;
  }

  private avisar(socio: Socio, tipo: EventoClase["tipo"]): void {
    const e: EventoClase = { actividad: this.actividad, horario: this.horario, socio: socio, tipo: tipo };
    for (const o of this.observadores) {
      o.notificar(e);
    }
  }
}

// 📌 [OBSERVER CONCRETO + DIP] Recibe el canal por constructor
class AvisoSocio implements ObservadorClase {
  private notificador: Notificador;

  constructor(notificador: Notificador) {
    this.notificador = notificador;
  }

  notificar(e: EventoClase): void {
    const textos = {
      inscripto: `Te inscribiste en ${e.actividad} ${e.horario}`,
      "en-espera": `Quedaste en lista de espera de ${e.actividad} ${e.horario}`,
      promovido: `¡Se liberó un lugar! Ya estás en ${e.actividad} ${e.horario}`,
    };
    this.notificador.enviar(e.socio, textos[e.tipo]);
  }
}

class RegistroRecepcion implements ObservadorClase {
  private lineas: string[];
  constructor() {
    this.lineas = [];
  }
  notificar(e: EventoClase): void {
    this.lineas.push(`${e.socio.dni} ${e.tipo} ${e.actividad}`);
  }
  obtener(): string[] {
    return [...this.lineas];
  }
}

// ============================== ADAPTER =====================================
// 📌 [ISP ✓ / ADAPTER - TARGET] Interfaz chica: lo único que el gimnasio necesita del molinete
interface ControlAcceso {
  permitirIngreso(dni: string): boolean;
}

// 📌 [ADAPTER - ADAPTEE] Molinete viejo: trabaja con códigos numéricos y responde 1/0. No se modifica
class MolineteLegacy {
  private aperturas = 0;
  abrirPuerta(codigo: number): number {
    if (codigo <= 0) return 0;
    this.aperturas++;
    return 1;
  }
  contador(): number {
    return this.aperturas;
  }
}

// 📌 [ADAPTER] Traduce DNI (texto) → código numérico, y 1/0 → boolean
class MolineteAdapter implements ControlAcceso {
  private molinete: MolineteLegacy;
  constructor(molinete: MolineteLegacy) {
    this.molinete = molinete;
  }
  permitirIngreso(dni: string): boolean {
    return this.molinete.abrirPuerta(Number(dni)) === 1;
  }
}

// ============================== SRP + DIP: Gimnasio ==========================
// 📌 [SRP ✓] El gimnasio administra socios e ingresos; no calcula precios, no notifica, no abre puertas
class Gimnasio {
  private socios: Socio[];
  // 📌 [DIP ✓ INYECCIÓN] Depende de ControlAcceso, no del molinete concreto
  private acceso: ControlAcceso;

  constructor(acceso: ControlAcceso) {
    this.socios = [];
    this.acceso = acceso;
  }

  alta(dni: string, nombre: string, tipo: TipoPlan): Socio {
    if (this.socios.some((s) => s.dni === dni)) {
      throw new Error(`Ya existe el socio ${dni}`);
    }
    const socio = new Socio(dni, nombre, FabricaPlanes.crear(tipo));
    this.socios.push(socio);
    return socio;
  }

  ingresar(dni: string): string {
    const socio = this.socios.find((s) => s.dni === dni);
    if (socio === undefined) {
      return `Acceso denegado: ${dni} no es socio`;
    }
    if (!socio.activo) {
      return `Acceso denegado: ${socio.nombre} está suspendido`;
    }
    return this.acceso.permitirIngreso(dni) ? `Bienvenido/a ${socio.nombre}` : "Falla del molinete";
  }

  get recaudacionMensual(): number {
    return this.socios.filter((s) => s.activo).reduce((acc, s) => acc + s.plan.cuotaMensual(), 0);
  }

  listado(): string[] {
    return this.socios.map((s) => s.describir());
  }
}

// Bloque de prueba
const molinete = new MolineteLegacy();
const gym = new Gimnasio(new MolineteAdapter(molinete));
const ana = gym.alta("30111222", "Ana", "libre");
const beto = gym.alta("30333444", "Beto", "trimestral");
const caro = gym.alta("30555666", "Caro", "mensual");
const dani = gym.alta("30777888", "Dani", "libre");
try {
  gym.alta("30111222", "Ana bis", "mensual");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}

const funcional = new ClaseGrupal("funcional", "19h", 2);
const recepcion = new RegistroRecepcion();
funcional.suscribir(new AvisoSocio(new NotificadorWhatsapp()));
funcional.suscribir(recepcion);

funcional.inscribir(ana);
funcional.inscribir(beto);
funcional.inscribir(dani);
try {
  funcional.inscribir(caro);
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(funcional.ocupacion);
funcional.darDeBaja("30333444");
console.log(funcional.ocupacion);

caro.cambiarPlan(FabricaPlanes.crear("trimestral"));
dani.suspender();
for (const linea of gym.listado()) console.log(linea);
console.log(gym.ingresar("30111222"));
console.log(gym.ingresar("30777888"));
console.log(gym.ingresar("99999999"));
console.log(`Recaudación mensual: $${gym.recaudacionMensual}`);
console.log(`Aperturas del molinete: ${molinete.contador()}`);
console.log(`Altas históricas: ${Socio.totalAltas()}`);
console.log(recepcion.obtener());
