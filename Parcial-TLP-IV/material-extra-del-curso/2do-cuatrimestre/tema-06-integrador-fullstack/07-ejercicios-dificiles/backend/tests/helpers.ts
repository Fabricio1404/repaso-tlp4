import { crearApp } from '../src/app';
import { crearServicios } from '../src/contenedor';
import {
  LibroMemoryRepository,
  NotificationMemoryRepository,
  RoleMemoryRepository,
  SubscriptionMemoryRepository,
  UserMemoryRepository,
} from '../src/repositories/memory';

// Arma la app completa con repositorios en memoria (sin PostgreSQL)
export async function crearAppDePrueba() {
  const usuarios = await UserMemoryRepository.conUsuariosDePrueba();
  const repos = {
    libros: new LibroMemoryRepository(),
    usuarios,
    roles: new RoleMemoryRepository(),
    suscripciones: new SubscriptionMemoryRepository(usuarios),
    notificaciones: new NotificationMemoryRepository(),
  };
  return { app: crearApp(crearServicios(repos, 'secreto-de-test', '1h')), repos };
}
