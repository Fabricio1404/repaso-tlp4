import bcrypt from 'bcrypt';
import { LIBROS_INICIALES, PERMISOS_POR_ROL, USUARIOS_DE_PRUEBA } from '../../database/seed-datos';
import type {
  DatosLibro,
  EstadoLibro,
  Libro,
  NombreRol,
  NotificacionGuardada,
  Notification,
  Usuario,
  UsuarioPublico,
} from '../../domain/tipos';
import type {
  ILibroRepository,
  INotificationRepository,
  IRoleRepository,
  ISubscriptionRepository,
  IUserRepository,
} from '../interfaces';


export class LibroMemoryRepository implements ILibroRepository {
  private libros: Libro[] = [];
  private proximoId = 1;

  constructor(iniciales: DatosLibro[] = LIBROS_INICIALES) {
    for (const l of iniciales) this.libros.push({ id: this.proximoId++, ...l, estado: 'DISPONIBLE' });
  }
  async findAll(): Promise<Libro[]> {
    return this.libros.map((l) => ({ ...l }));
  }
  async findById(id: number): Promise<Libro | undefined> {
    const l = this.libros.find((x) => x.id === id);
    return l ? { ...l } : undefined;
  }
  async create(datos: DatosLibro): Promise<Libro> {
    const nuevo: Libro = { id: this.proximoId++, ...datos, estado: 'DISPONIBLE' };
    this.libros.push(nuevo);
    return { ...nuevo };
  }
  async update(id: number, datos: DatosLibro): Promise<Libro | undefined> {
    const l = this.libros.find((x) => x.id === id);
    if (l === undefined) return undefined;
    l.titulo = datos.titulo;
    l.autor = datos.autor;
    return { ...l };
  }
  async updateEstado(id: number, estado: EstadoLibro): Promise<void> {
    const l = this.libros.find((x) => x.id === id);
    if (l !== undefined) l.estado = estado;
  }
  async delete(id: number): Promise<boolean> {
    const antes = this.libros.length;
    this.libros = this.libros.filter((l) => l.id !== id);
    return this.libros.length < antes;
  }
}

export class UserMemoryRepository implements IUserRepository {
  private usuarios: Usuario[] = [];
  private proximoId = 1;

  static async conUsuariosDePrueba(): Promise<UserMemoryRepository> {
    const repo = new UserMemoryRepository();
    for (const u of USUARIOS_DE_PRUEBA) {
      await repo.create({ nombre: u.nombre, email: u.email, passwordHash: await bcrypt.hash(u.password, 4), rol: u.rol });
    }
    return repo;
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    const u = this.usuarios.find((x) => x.email === email);
    return u ? { ...u } : undefined;
  }
  async findById(id: number): Promise<Usuario | undefined> {
    const u = this.usuarios.find((x) => x.id === id);
    return u ? { ...u } : undefined;
  }
  async findAll(): Promise<UsuarioPublico[]> {
    return this.usuarios.map(({ passwordHash: _omitido, ...publico }) => publico);
  }
  async create(datos: Omit<Usuario, 'id'>): Promise<Usuario> {
    const nuevo: Usuario = { id: this.proximoId++, ...datos };
    this.usuarios.push(nuevo);
    return { ...nuevo };
  }
  async updateRol(id: number, rol: NombreRol): Promise<boolean> {
    const u = this.usuarios.find((x) => x.id === id);
    if (u === undefined) return false;
    u.rol = rol;
    return true;
  }
}

export class RoleMemoryRepository implements IRoleRepository {
  async permisosDe(rol: NombreRol): Promise<string[]> {
    return [...PERMISOS_POR_ROL[rol]];
  }
}

export class SubscriptionMemoryRepository implements ISubscriptionRepository {
  private subs: { userId: number; libroId: number }[] = [];
  private usuarios: IUserRepository;

  constructor(usuarios: IUserRepository) {
    this.usuarios = usuarios;
  }
  async subscribe(userId: number, libroId: number): Promise<void> {
    this.subs.push({ userId, libroId });
  }
  async unsubscribe(userId: number, libroId: number): Promise<boolean> {
    const antes = this.subs.length;
    this.subs = this.subs.filter((s) => !(s.userId === userId && s.libroId === libroId));
    return this.subs.length < antes;
  }
  async exists(userId: number, libroId: number): Promise<boolean> {
    return this.subs.some((s) => s.userId === userId && s.libroId === libroId);
  }
  async findEmailsByLibro(libroId: number): Promise<string[]> {
    const emails: string[] = [];
    for (const s of this.subs.filter((x) => x.libroId === libroId)) {
      const u = await this.usuarios.findById(s.userId);
      if (u !== undefined) emails.push(u.email);
    }
    return emails;
  }
}

export class NotificationMemoryRepository implements INotificationRepository {
  private guardadas: NotificacionGuardada[] = [];
  private proximoId = 1;

  async save(n: Notification): Promise<void> {
    this.guardadas.push({
      id: this.proximoId++,
      destinatario: n.destinatario,
      libroId: n.libroId,
      mensaje: `El libro #${n.libroId} pasó de ${n.estadoAnterior} a ${n.estadoNuevo}`,
      leida: false,
      fecha: new Date().toISOString(),
    });
  }
  async findByDestinatario(email: string): Promise<NotificacionGuardada[]> {
    return this.guardadas.filter((n) => n.destinatario === email).map((n) => ({ ...n }));
  }
  async markAsRead(id: number, email: string): Promise<boolean> {
    const n = this.guardadas.find((x) => x.id === id && x.destinatario === email);
    if (n === undefined) return false;
    n.leida = true;
    return true;
  }
}
