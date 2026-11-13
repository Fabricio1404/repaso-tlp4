import bcrypt from 'bcrypt';
import { ROLES } from '../domain/tipos';
import { LibroModel, PermissionModel, RoleModel, RolePermissionModel, SubscriptionModel, UserModel } from './models';
import { LIBROS_INICIALES, PERMISOS_POR_ROL, USUARIOS_DE_PRUEBA } from './seed-datos';

export async function seed(): Promise<void> {
  for (const nombre of ROLES) {
    const [rol] = await RoleModel.findOrCreate({ where: { nombre } });
    for (const codigo of PERMISOS_POR_ROL[nombre]) {
      const [permiso] = await PermissionModel.findOrCreate({ where: { codigo } });
      await RolePermissionModel.findOrCreate({ where: { roleId: rol.id, permissionId: permiso.id } });
    }
  }

  for (const u of USUARIOS_DE_PRUEBA) {
    const rol = await RoleModel.findOne({ where: { nombre: u.rol } });
    if (rol === null) continue;
    const existe = await UserModel.findOne({ where: { email: u.email } });
    if (existe === null) {
      await UserModel.create({
        nombre: u.nombre,
        email: u.email,
        passwordHash: await bcrypt.hash(u.password, 10),
        roleId: rol.id,
      });
    }
  }

  if ((await LibroModel.count()) === 0) {
    for (const l of LIBROS_INICIALES) {
      await LibroModel.create(l);
    }
    // El usuario de prueba queda suscripto al libro 1 para poder probar el flujo de notificaciones enseguida
    const usuario = await UserModel.findOne({ where: { email: 'usuario@tp.com' } });
    const libro = await LibroModel.findOne({ order: [['id', 'ASC']] });
    if (usuario !== null && libro !== null) {
      await SubscriptionModel.findOrCreate({ where: { userId: usuario.id, libroId: libro.id } });
    }
  }
}
