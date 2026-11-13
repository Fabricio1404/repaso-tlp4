import {
  type CreationOptional,
  DataTypes,
  type ForeignKey,
  type InferAttributes,
  type InferCreationAttributes,
  Model,
  type Sequelize,
} from 'sequelize';
import type { EstadoLibro, NombreRol } from '../domain/tipos';

// 📌 [MODELOS DE SEQUELIZE] Cada clase representa una tabla. "declare" solo informa el tipo: los getters reales los crea Sequelize

export class RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
  declare id: CreationOptional<number>;
  declare nombre: NombreRol;
}

export class PermissionModel extends Model<InferAttributes<PermissionModel>, InferCreationAttributes<PermissionModel>> {
  declare id: CreationOptional<number>;
  declare codigo: string;
}

export class RolePermissionModel extends Model<
  InferAttributes<RolePermissionModel>,
  InferCreationAttributes<RolePermissionModel>
> {
  declare roleId: ForeignKey<RoleModel['id']>;
  declare permissionId: ForeignKey<PermissionModel['id']>;
}

export class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare nombre: string;
  declare email: string;
  declare passwordHash: string;
  declare roleId: ForeignKey<RoleModel['id']>;
}

export class LibroModel extends Model<InferAttributes<LibroModel>, InferCreationAttributes<LibroModel>> {
  declare id: CreationOptional<number>;
  declare titulo: string;
  declare autor: string;
  declare estado: CreationOptional<EstadoLibro>;
}

export class SubscriptionModel extends Model<InferAttributes<SubscriptionModel>, InferCreationAttributes<SubscriptionModel>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<UserModel['id']>;
  declare libroId: ForeignKey<LibroModel['id']>;
}

export class NotificationModel extends Model<InferAttributes<NotificationModel>, InferCreationAttributes<NotificationModel>> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<UserModel['id']>;
  declare libroId: ForeignKey<LibroModel['id']>;
  declare mensaje: string;
  declare leida: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
}

// 📌 [DEFINICIÓN DE TABLAS Y RELACIONES] Se llama UNA vez desde main.ts con la instancia del Singleton
export function definirModelos(sequelize: Sequelize): void {
  RoleModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize, tableName: 'roles', timestamps: false },
  );

  PermissionModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { sequelize, tableName: 'permissions', timestamps: false },
  );

  RolePermissionModel.init({}, { sequelize, tableName: 'role_permissions', timestamps: false });

  UserModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, tableName: 'users' },
  );

  LibroModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      titulo: { type: DataTypes.STRING, allowNull: false },
      autor: { type: DataTypes.STRING, allowNull: false },
      // 📌 [ENUM DE POSTGRES ≠ ENUM DE TS] Es un tipo de COLUMNA; en el código TS se usa la unión EstadoLibro
      estado: {
        type: DataTypes.ENUM('DISPONIBLE', 'PRESTADO', 'EN_REPARACION'),
        allowNull: false,
        defaultValue: 'DISPONIBLE',
      },
    },
    { sequelize, tableName: 'libros' },
  );

  SubscriptionModel.init(
    { id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } },
    { sequelize, tableName: 'subscriptions', indexes: [{ unique: true, fields: ['userId', 'libroId'] }] },
  );

  NotificationModel.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      mensaje: { type: DataTypes.STRING, allowNull: false },
      leida: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'notifications', updatedAt: false },
  );

  // 📌 [ASOCIACIONES] usuario → rol (N:1), rol ↔ permiso (N:M), suscripciones y notificaciones
  RoleModel.hasMany(UserModel, { foreignKey: 'roleId' });
  UserModel.belongsTo(RoleModel, { foreignKey: 'roleId' });
  RoleModel.belongsToMany(PermissionModel, { through: RolePermissionModel, foreignKey: 'roleId', otherKey: 'permissionId' });
  PermissionModel.belongsToMany(RoleModel, { through: RolePermissionModel, foreignKey: 'permissionId', otherKey: 'roleId' });
  UserModel.hasMany(SubscriptionModel, { foreignKey: 'userId' });
  SubscriptionModel.belongsTo(UserModel, { foreignKey: 'userId' });
  LibroModel.hasMany(SubscriptionModel, { foreignKey: 'libroId', onDelete: 'CASCADE' });
  SubscriptionModel.belongsTo(LibroModel, { foreignKey: 'libroId' });
  UserModel.hasMany(NotificationModel, { foreignKey: 'userId' });
  NotificationModel.belongsTo(UserModel, { foreignKey: 'userId' });
  LibroModel.hasMany(NotificationModel, { foreignKey: 'libroId', onDelete: 'CASCADE' });
}
