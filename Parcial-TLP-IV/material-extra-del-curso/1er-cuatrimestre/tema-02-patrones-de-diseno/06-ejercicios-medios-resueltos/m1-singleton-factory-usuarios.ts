// RESOLUCIÓN M1 · Singleton + Factory: alta de usuarios con roles

// 📌 [SINGLETON] Generador de ids único para toda la aplicación (si hubiera dos, se repetirían ids)
class GeneradorDeIds {
  private static instancia: GeneradorDeIds | undefined;
  private ultimo: number;

  private constructor() {
    this.ultimo = 0;
  }

  static obtenerInstancia(): GeneradorDeIds {
    if (GeneradorDeIds.instancia === undefined) {
      GeneradorDeIds.instancia = new GeneradorDeIds();
    }
    return GeneradorDeIds.instancia;
  }

  siguiente(prefijo: string): string {
    this.ultimo++;
    return `${prefijo}-${String(this.ultimo).padStart(3, "0")}`;
  }
}

type Rol = "admin" | "cliente" | "invitado";

// 📌 [FACTORY - TIPO COMÚN] Clase abstracta: todos los usuarios tienen id, nombre y permisos
abstract class Usuario {
  readonly id: string;
  readonly nombre: string;

  constructor(nombre: string) {
    // 📌 [SINGLETON EN USO] El id lo pide al Singleton; ningún usuario elige su propio id
    this.id = GeneradorDeIds.obtenerInstancia().siguiente(this.prefijo());
    this.nombre = nombre;
  }

  protected abstract prefijo(): string;
  abstract permisos(): string[];

  puede(permiso: string): boolean {
    return this.permisos().includes(permiso);
  }

  describir(): string {
    return `${this.id} ${this.nombre} [${this.permisos().join(", ")}]`;
  }
}

class Admin extends Usuario {
  protected prefijo(): string {
    return "ADM";
  }
  permisos(): string[] {
    return ["leer", "escribir", "borrar", "administrar"];
  }
}

class Cliente extends Usuario {
  protected prefijo(): string {
    return "CLI";
  }
  permisos(): string[] {
    return ["leer", "escribir"];
  }
}

class Invitado extends Usuario {
  protected prefijo(): string {
    return "INV";
  }
  permisos(): string[] {
    return ["leer"];
  }
}

// 📌 [FACTORY] Único lugar con new de las clases concretas. Valida el nombre antes de crear
class FabricaUsuarios {
  static crear(rol: Rol, nombre: string): Usuario {
    if (nombre.trim() === "") {
      throw new Error("El nombre es obligatorio");
    }
    switch (rol) {
      case "admin":
        return new Admin(nombre.trim());
      case "cliente":
        return new Cliente(nombre.trim());
      case "invitado":
        return new Invitado(nombre.trim());
    }
  }
}

// Bloque de prueba
const altas: { rol: Rol; nombre: string }[] = [
  { rol: "admin", nombre: "Ana" },
  { rol: "cliente", nombre: " Beto " },
  { rol: "invitado", nombre: "Caro" },
  { rol: "cliente", nombre: "Dani" },
];
const usuarios: Usuario[] = altas.map((a) => FabricaUsuarios.crear(a.rol, a.nombre));
for (const u of usuarios) {
  console.log(u.describir());
}
console.log(`¿Beto puede borrar? ${usuarios[1].puede("borrar")}`);
console.log(`¿Ana puede borrar? ${usuarios[0].puede("borrar")}`);
try {
  FabricaUsuarios.crear("cliente", "   ");
} catch (e) {
  if (e instanceof Error) console.log(e.message);
}
console.log(`Próximo id: ${GeneradorDeIds.obtenerInstancia().siguiente("TEST")}`);
