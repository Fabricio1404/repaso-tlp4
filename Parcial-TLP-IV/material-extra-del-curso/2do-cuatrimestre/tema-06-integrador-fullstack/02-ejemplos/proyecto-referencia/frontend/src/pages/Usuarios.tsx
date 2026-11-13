import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import type { NombreRol, Usuario } from '../tipos';

const ROLES: NombreRol[] = ['admin', 'operador', 'usuario'];

// RF6: el administrador lista usuarios y les asigna un rol
export function Usuarios() {
  const { sesion } = useAuth();
  const token = sesion?.token;
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState('');

  const cargar = () => {
    api<Usuario[]>('/usuarios', { token }).then(setUsuarios).catch((e: Error) => setError(e.message));
  };
  useEffect(cargar, [token]);

  const asignar = async (id: number, rol: NombreRol) => {
    await api(`/usuarios/${id}/rol`, { metodo: 'PATCH', body: { rol }, token });
    cargar();
  };

  return (
    <section>
      <h2>Usuarios</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <table>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <select value={u.rol} onChange={(e) => asignar(u.id, e.target.value as NombreRol)}>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
