// Demo del flujo de los 4 patrones SIN base de datos (repositorios en memoria).
// Ejecutar: npm run demo
import { crearServicios } from './contenedor';
import {
  LibroMemoryRepository,
  NotificationMemoryRepository,
  RoleMemoryRepository,
  SubscriptionMemoryRepository,
  UserMemoryRepository,
} from './repositories/memory';

async function demo(): Promise<void> {
  const usuarios = await UserMemoryRepository.conUsuariosDePrueba();
  const notificaciones = new NotificationMemoryRepository();
  const suscripciones = new SubscriptionMemoryRepository(usuarios);
  const servicios = crearServicios(
    { libros: new LibroMemoryRepository(), usuarios, roles: new RoleMemoryRepository(), suscripciones, notificaciones },
    'demo',
    '1h',
  );

  const usuario = await usuarios.findByEmail('usuario@tp.com');
  const operador = await usuarios.findByEmail('operador@tp.com');
  if (usuario === undefined || operador === undefined) throw new Error('Faltan usuarios de prueba');

  await servicios.suscripciones.suscribir(usuario.id, 1);
  await servicios.suscripciones.suscribir(operador.id, 1);
  await servicios.libros.changeStatus(1, 'PRESTADO');
  await servicios.libros.changeStatus(2, 'EN_REPARACION'); // nadie suscripto: no se notifica a nadie

  const inapp = await servicios.notificaciones.listar('usuario@tp.com');
  console.log(`In-app de usuario@tp.com: ${inapp.map((n) => `"${n.mensaje}" (leída: ${n.leida})`).join(', ')}`);
}

demo().catch((e: unknown) => {
  console.error(e);
  process.exit(1);
});
