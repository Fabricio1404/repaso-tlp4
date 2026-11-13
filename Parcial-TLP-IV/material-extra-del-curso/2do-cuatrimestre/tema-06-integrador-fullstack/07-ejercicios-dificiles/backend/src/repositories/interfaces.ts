import type {
  DatosLibro,
  EstadoLibro,
  Libro,
  NombreRol,
  NotificacionGuardada,
  Notification,
  Usuario,
  UsuarioPublico,
} from '../domain/tipos';


export interface ILibroRepository {
  findAll(): Promise<Libro[]>;
  findById(id: number): Promise<Libro | undefined>;
  create(datos: DatosLibro): Promise<Libro>;
  update(id: number, datos: DatosLibro): Promise<Libro | undefined>;
  updateEstado(id: number, estado: EstadoLibro): Promise<void>;
  delete(id: number): Promise<boolean>;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<Usuario | undefined>;
  findById(id: number): Promise<Usuario | undefined>;
  findAll(): Promise<UsuarioPublico[]>;
  create(datos: Omit<Usuario, 'id'>): Promise<Usuario>;
  updateRol(id: number, rol: NombreRol): Promise<boolean>;
}

export interface IRoleRepository {
  permisosDe(rol: NombreRol): Promise<string[]>;
}

export interface ISubscriptionRepository {
  subscribe(userId: number, libroId: number): Promise<void>;
  unsubscribe(userId: number, libroId: number): Promise<boolean>;
  exists(userId: number, libroId: number): Promise<boolean>;
  findEmailsByLibro(libroId: number): Promise<string[]>;
}

export interface INotificationRepository {
  save(notification: Notification): Promise<void>;
  findByDestinatario(email: string): Promise<NotificacionGuardada[]>;
  markAsRead(id: number, email: string): Promise<boolean>;
}
