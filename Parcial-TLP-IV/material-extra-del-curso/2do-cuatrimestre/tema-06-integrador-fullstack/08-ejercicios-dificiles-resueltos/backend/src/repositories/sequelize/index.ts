import {
  LibroModel,
  NotificationModel,
  PermissionModel,
  RoleModel,
  SubscriptionModel,
  UserModel,
} from '../../database/models';
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


function aLibro(m: LibroModel): Libro {
  return { id: m.id, titulo: m.titulo, autor: m.autor, estado: m.estado };
}

export class LibroSequelizeRepository implements ILibroRepository {
  async findAll(): Promise<Libro[]> {
    const filas = await LibroModel.findAll({ order: [['id', 'ASC']] });
    return filas.map(aLibro);
  }
  async findById(id: number): Promise<Libro | undefined> {
    const m = await LibroModel.findByPk(id);
    return m === null ? undefined : aLibro(m);
  }
  async create(datos: DatosLibro): Promise<Libro> {
    return aLibro(await LibroModel.create(datos));
  }
  async update(id: number, datos: DatosLibro): Promise<Libro | undefined> {
    const m = await LibroModel.findByPk(id);
    if (m === null) return undefined;
    return aLibro(await m.update(datos));
  }
  async updateEstado(id: number, estado: EstadoLibro): Promise<void> {
    await LibroModel.update({ estado }, { where: { id } });
  }
  async delete(id: number): Promise<boolean> {
    return (await LibroModel.destroy({ where: { id } })) > 0;
  }
}

export class UserSequelizeRepository implements IUserRepository {
  private async aUsuario(m: UserModel): Promise<Usuario> {
    const rol = await RoleModel.findByPk(m.roleId);
    return { id: m.id, nombre: m.nombre, email: m.email, passwordHash: m.passwordHash, rol: rol?.nombre ?? 'usuario' };
  }
  async findByEmail(email: string): Promise<Usuario | undefined> {
    const m = await UserModel.findOne({ where: { email } });
    return m === null ? undefined : this.aUsuario(m);
  }
  async findById(id: number): Promise<Usuario | undefined> {
    const m = await UserModel.findByPk(id);
    return m === null ? undefined : this.aUsuario(m);
  }
  async findAll(): Promise<UsuarioPublico[]> {
    const filas = await UserModel.findAll({ order: [['id', 'ASC']] });
    const lista: UsuarioPublico[] = [];
    for (const m of filas) {
      const { passwordHash: _omitido, ...publico } = await this.aUsuario(m);
      lista.push(publico);
    }
    return lista;
  }
  async create(datos: Omit<Usuario, 'id'>): Promise<Usuario> {
    const rol = await RoleModel.findOne({ where: { nombre: datos.rol } });
    if (rol === null) throw new Error(`No existe el rol ${datos.rol} (¿se ejecutó el seed?)`);
    const m = await UserModel.create({ nombre: datos.nombre, email: datos.email, passwordHash: datos.passwordHash, roleId: rol.id });
    return this.aUsuario(m);
  }
  async updateRol(id: number, rol: NombreRol): Promise<boolean> {
    const r = await RoleModel.findOne({ where: { nombre: rol } });
    if (r === null) return false;
    const [cantidad] = await UserModel.update({ roleId: r.id }, { where: { id } });
    return cantidad > 0;
  }
}

export class RoleSequelizeRepository implements IRoleRepository {
  async permisosDe(rol: NombreRol): Promise<string[]> {
    const r = await RoleModel.findOne({ where: { nombre: rol }, include: [{ model: PermissionModel }] });
    const permisos = (r?.get('PermissionModels') ?? []) as PermissionModel[];
    return permisos.map((p) => p.codigo);
  }
}

export class SubscriptionSequelizeRepository implements ISubscriptionRepository {
  async subscribe(userId: number, libroId: number): Promise<void> {
    await SubscriptionModel.findOrCreate({ where: { userId, libroId } });
  }
  async unsubscribe(userId: number, libroId: number): Promise<boolean> {
    return (await SubscriptionModel.destroy({ where: { userId, libroId } })) > 0;
  }
  async exists(userId: number, libroId: number): Promise<boolean> {
    return (await SubscriptionModel.count({ where: { userId, libroId } })) > 0;
  }
  async findEmailsByLibro(libroId: number): Promise<string[]> {
    const filas = await SubscriptionModel.findAll({ where: { libroId }, include: [{ model: UserModel }] });
    return filas.map((s) => (s.get('UserModel') as UserModel).email);
  }
}

export class NotificationSequelizeRepository implements INotificationRepository {
  async save(n: Notification): Promise<void> {
    const usuario = await UserModel.findOne({ where: { email: n.destinatario } });
    if (usuario === null) return;
    await NotificationModel.create({
      userId: usuario.id,
      libroId: n.libroId,
      mensaje: `El libro #${n.libroId} pasó de ${n.estadoAnterior} a ${n.estadoNuevo}`,
    });
  }
  async findByDestinatario(email: string): Promise<NotificacionGuardada[]> {
    const usuario = await UserModel.findOne({ where: { email } });
    if (usuario === null) return [];
    const filas = await NotificationModel.findAll({ where: { userId: usuario.id }, order: [['id', 'DESC']] });
    return filas.map((f) => ({
      id: f.id,
      destinatario: email,
      libroId: f.libroId,
      mensaje: f.mensaje,
      leida: f.leida,
      fecha: f.createdAt.toISOString(),
    }));
  }
  async markAsRead(id: number, email: string): Promise<boolean> {
    const usuario = await UserModel.findOne({ where: { email } });
    if (usuario === null) return false;
    const [cantidad] = await NotificationModel.update({ leida: true }, { where: { id, userId: usuario.id } });
    return cantidad > 0;
  }
}
