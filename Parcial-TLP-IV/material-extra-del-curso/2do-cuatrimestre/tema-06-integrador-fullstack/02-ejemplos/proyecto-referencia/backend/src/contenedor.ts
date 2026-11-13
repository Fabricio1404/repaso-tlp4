import { NotifierFactory } from './notifications/NotifierFactory';
import { EventPublisher } from './observer/EventPublisher';
import type {
  ILibroRepository,
  INotificationRepository,
  IRoleRepository,
  ISubscriptionRepository,
  IUserRepository,
} from './repositories/interfaces';
import { AuthService } from './services/AuthService';
import { LibroService } from './services/LibroService';
import { NotificationService } from './services/NotificationService';
import { SubscriptionService } from './services/SubscriptionService';
import { UserService } from './services/UserService';
import type { Servicios } from './app';

export interface Repositorios {
  libros: ILibroRepository;
  usuarios: IUserRepository;
  roles: IRoleRepository;
  suscripciones: ISubscriptionRepository;
  notificaciones: INotificationRepository;
}

// 📌 [CABLEADO DE DEPENDENCIAS] Conecta servicios, Observer y Factory a partir de CUALQUIER conjunto de repositorios (DIP)
export function crearServicios(repos: Repositorios, jwtSecret: string, jwtExpiresIn: string): Servicios {
  // 📌 [OBSERVER - REGISTRO] El publisher se crea acá y NotificationService se suscribe como observer
  const publisher = new EventPublisher();
  const factory = new NotifierFactory(repos.notificaciones);
  const notificationService = new NotificationService(repos.suscripciones, repos.notificaciones, factory);
  publisher.attach(notificationService);

  return {
    auth: new AuthService(repos.usuarios, repos.roles, jwtSecret, jwtExpiresIn),
    libros: new LibroService(repos.libros, publisher),
    suscripciones: new SubscriptionService(repos.suscripciones, repos.libros),
    notificaciones: notificationService,
    usuarios: new UserService(repos.usuarios),
  };
}
