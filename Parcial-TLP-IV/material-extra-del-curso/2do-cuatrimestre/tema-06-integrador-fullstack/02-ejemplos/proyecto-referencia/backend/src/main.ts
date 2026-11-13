import { crearApp } from './app';
import { env } from './config/env';
import { crearServicios } from './contenedor';
import { DatabaseConnection } from './database/DatabaseConnection';
import { definirModelos } from './database/models';
import { seed } from './database/seed';
import {
  LibroSequelizeRepository,
  NotificationSequelizeRepository,
  RoleSequelizeRepository,
  SubscriptionSequelizeRepository,
  UserSequelizeRepository,
} from './repositories/sequelize';

// 📌 [COMPOSITION ROOT] El único lugar donde se crean (new) y conectan las piezas reales del sistema
async function main(): Promise<void> {
  // 📌 [SINGLETON EN USO]
  const db = DatabaseConnection.getInstance();
  definirModelos(db.sequelize);
  await db.sequelize.authenticate();
  await db.sequelize.sync();
  // 📌 [SEED AUTOMÁTICO AL LEVANTAR] Roles, permisos, usuarios de prueba y libros (idempotente)
  await seed();

  const servicios = crearServicios(
    {
      libros: new LibroSequelizeRepository(),
      usuarios: new UserSequelizeRepository(),
      roles: new RoleSequelizeRepository(),
      suscripciones: new SubscriptionSequelizeRepository(),
      notificaciones: new NotificationSequelizeRepository(),
    },
    env.JWT_SECRET,
    env.JWT_EXPIRES_IN,
  );

  crearApp(servicios, env.CORS_ORIGIN).listen(env.PORT, () => {
    console.log(`API de la Biblioteca escuchando en el puerto ${env.PORT}`);
  });
}

main().catch((error: unknown) => {
  console.error('No se pudo iniciar el backend:', error);
  process.exit(1);
});
