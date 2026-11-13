import { createContext, type ReactNode, useContext, useState } from 'react';
import { api } from '../api';
import type { Sesion } from '../tipos';

interface ValorAuth {
  sesion: Sesion | null;
  puede: (permiso: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  registrar: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<ValorAuth | null>(null);
const CLAVE = 'biblioteca.sesion';

function leerSesion(): Sesion | null {
  try {
    const texto = localStorage.getItem(CLAVE);
    return texto ? (JSON.parse(texto) as Sesion) : null;
  } catch {
    return null;
  }
}

// 📌 [CONTEXTO DE AUTENTICACIÓN] Guarda token y permisos (en localStorage para no perderlos al recargar)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState<Sesion | null>(leerSesion);

  const guardar = (s: Sesion | null) => {
    setSesion(s);
    try {
      if (s) localStorage.setItem(CLAVE, JSON.stringify(s));
      else localStorage.removeItem(CLAVE);
    } catch {
      /* almacenamiento no disponible: la sesión vive solo en memoria */
    }
  };

  const valor: ValorAuth = {
    sesion,
    // 📌 [PERMISOS EN EL FRONT] Solo para mostrar u ocultar; la validación real está en el backend (403)
    puede: (permiso) => sesion?.permisos.includes(permiso) ?? false,
    login: async (email, password) => guardar(await api<Sesion>('/auth/login', { metodo: 'POST', body: { email, password } })),
    registrar: async (nombre, email, password) =>
      guardar(await api<Sesion>('/auth/register', { metodo: 'POST', body: { nombre, email, password } })),
    logout: () => guardar(null),
  };
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth(): ValorAuth {
  const ctx = useContext(AuthContext);
  if (ctx === null) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
