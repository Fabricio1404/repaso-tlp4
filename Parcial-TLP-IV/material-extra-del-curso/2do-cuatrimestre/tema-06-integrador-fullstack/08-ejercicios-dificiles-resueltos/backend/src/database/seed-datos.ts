import type { DatosLibro, NombreRol } from '../domain/tipos';

export const PERMISOS_POR_ROL: Record<NombreRol, string[]> = {
  admin: [
    'libro:read', 'libro:create', 'libro:update', 'libro:change-status', 'libro:delete', 'libro:export',
    'subscription:create', 'subscription:delete', 'notification:read',
    'user:read', 'user:assign-role',
  ],
  operador: [
    // 📌 [MODIFICACIÓN B] Permiso nuevo en el seed (admin y operador)
    'libro:read', 'libro:create', 'libro:update', 'libro:change-status', 'libro:export',
    'subscription:create', 'subscription:delete', 'notification:read',
  ],
  usuario: ['libro:read', 'subscription:create', 'subscription:delete', 'notification:read'],
};

// Usuarios de prueba (también figuran en el README)
export const USUARIOS_DE_PRUEBA: { nombre: string; email: string; password: string; rol: NombreRol }[] = [
  { nombre: 'Admin', email: 'admin@tp.com', password: 'Admin123', rol: 'admin' },
  { nombre: 'Operador', email: 'operador@tp.com', password: 'Operador123', rol: 'operador' },
  { nombre: 'Usuario', email: 'usuario@tp.com', password: 'Usuario123', rol: 'usuario' },
];

export const LIBROS_INICIALES: DatosLibro[] = [
  { titulo: 'Rayuela', autor: 'Julio Cortázar' },
  { titulo: 'Ficciones', autor: 'Jorge Luis Borges' },
  { titulo: 'Martín Fierro', autor: 'José Hernández' },
];
