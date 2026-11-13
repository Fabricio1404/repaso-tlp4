import type { ReactNode } from 'react';
import { useAuth } from '../auth/AuthContext';

// 📌 [CONTROL DE ACCESO EN LA INTERFAZ] <Can permiso="libro:delete">...</Can> muestra el contenido solo si el rol tiene el permiso
export function Can({ permiso, children }: { permiso: string; children: ReactNode }) {
  const { puede } = useAuth();
  return puede(permiso) ? <>{children}</> : null;
}
