// ============================================================================
// EJEMPLO 1 · SRP — UserManager (guía de la cátedra)
// Consigna: UserManager registra usuarios, valida el correo, guarda y envía el mail
// de bienvenida. Separar en UserValidator, UserRepository, EmailService y un
// UserRegistrationService que las coordine por composición.
// ============================================================================

interface User {
  username: string;
  email: string;
}

// ------------------------------- ANTES -------------------------------------
// 📌 [SRP ✗ VIOLACIÓN] Una sola clase con TRES motivos para cambiar: regla de validación, forma de guardar, forma de avisar
class UserManager {
  private users: User[];

  constructor() {
    this.users = [];
  }

  register(username: string, email: string): string {
    // 📌 [SRP ✗ MOTIVO 1] Regla de validación mezclada con todo lo demás
    if (!email.includes("@")) {
      throw new Error("El correo no es valido");
    }
    // 📌 [SRP ✗ MOTIVO 2] Forma de guardar
    this.users.push({ username: username, email: email });
    // 📌 [SRP ✗ MOTIVO 3] Forma de avisar
    return `Email enviado a ${email}`;
  }
}

// ------------------------------- DESPUÉS -----------------------------------
// 📌 [SRP ✓ RESPONSABILIDAD 1] Solo valida. Cambia únicamente si cambia la regla del correo
class UserValidator {
  validate(email: string): void {
    if (!email.includes("@")) {
      throw new Error("El correo no es valido");
    }
  }
}

// 📌 [SRP ✓ RESPONSABILIDAD 2] Solo guarda. Si se pasa a una base de datos, se toca solo esta clase
class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  save(user: User): void {
    this.users.push(user);
  }

  findAll(): User[] {
    return [...this.users];
  }
}

// 📌 [SRP ✓ RESPONSABILIDAD 3] Solo avisa
class EmailService {
  sendWelcomeEmail(email: string): string {
    return `Email enviado a ${email}`;
  }
}

// 📌 [COMPOSICIÓN] El coordinador TIENE las tres piezas y delega; no hace el trabajo él mismo
class UserRegistrationService {
  private validator: UserValidator;
  private repository: UserRepository;
  private emailService: EmailService;

  // 📌 [INYECCIÓN POR CONSTRUCTOR] Las piezas vienen de afuera (también ayuda a DIP)
  constructor(validator: UserValidator, repository: UserRepository, emailService: EmailService) {
    this.validator = validator;
    this.repository = repository;
    this.emailService = emailService;
  }

  // 📌 [MISMO COMPORTAMIENTO VISIBLE] Hace lo mismo que UserManager.register, en el mismo orden
  register(username: string, email: string): string {
    this.validator.validate(email);
    this.repository.save({ username: username, email: email });
    return this.emailService.sendWelcomeEmail(email);
  }
}

// Bloque de prueba: la salida de ANTES y DESPUÉS es idéntica
const antes = new UserManager();
console.log(antes.register("ana", "ana@example.com")); // Email enviado a ana@example.com

const repo = new UserRepository();
// 📌 [COMPOSITION ROOT] Los new se hacen acá afuera, en un solo lugar
const service = new UserRegistrationService(new UserValidator(), repo, new EmailService());
console.log(service.register("ana", "ana@example.com")); // Email enviado a ana@example.com
try {
  service.register("beto", "beto-sin-arroba");
} catch (e) {
  if (e instanceof Error) console.log(e.message); // El correo no es valido
}
console.log(repo.findAll()); // [ { username: 'ana', email: 'ana@example.com' } ]
