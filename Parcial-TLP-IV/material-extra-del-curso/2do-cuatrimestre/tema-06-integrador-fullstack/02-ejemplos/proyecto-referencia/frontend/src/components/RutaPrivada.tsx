import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

// Si no hay sesión, redirige al login
export function RutaPrivada({ children }: { children: ReactNode }) {
  const { sesion } = useAuth();
  return sesion ? <>{children}</> : <Navigate to="/login" replace />;
}
