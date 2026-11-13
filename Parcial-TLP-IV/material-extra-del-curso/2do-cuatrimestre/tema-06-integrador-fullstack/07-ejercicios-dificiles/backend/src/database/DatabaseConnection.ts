import { Sequelize } from 'sequelize';
import { env } from '../config/env';

export class DatabaseConnection {
  private static instance: DatabaseConnection | undefined;
  readonly sequelize: Sequelize;

  private constructor() {
    this.sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
      host: env.DB_HOST,
      port: env.DB_PORT,
      dialect: 'postgres',
      logging: false,
    });
  }

  static getInstance(): DatabaseConnection {
    if (DatabaseConnection.instance === undefined) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
