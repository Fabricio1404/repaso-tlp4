import { Sequelize } from 'sequelize';
import { env } from '../config/env';

// 📌 [SINGLETON] Una sola conexión (pool) a PostgreSQL en toda la aplicación
export class DatabaseConnection {
  // 📌 [SINGLETON ① ATRIBUTO STATIC]
  private static instance: DatabaseConnection | undefined;
  readonly sequelize: Sequelize;

  // 📌 [SINGLETON ② CONSTRUCTOR PRIVATE] Nadie puede hacer new DatabaseConnection() y abrir una segunda conexión
  private constructor() {
    // 📌 [DATOS DE ENTORNO] Nada de valores fijos: host, usuario, etc. vienen de variables de entorno (DB_HOST=db en Compose)
    this.sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
      host: env.DB_HOST,
      port: env.DB_PORT,
      dialect: 'postgres',
      logging: false,
    });
  }

  // 📌 [SINGLETON ③ ACCESO]
  static getInstance(): DatabaseConnection {
    if (DatabaseConnection.instance === undefined) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
