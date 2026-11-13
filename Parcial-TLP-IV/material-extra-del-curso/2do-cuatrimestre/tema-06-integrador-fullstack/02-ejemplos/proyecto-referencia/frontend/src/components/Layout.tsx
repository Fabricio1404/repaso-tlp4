import { Link, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { Can } from './Can';

export function Layout() {
  const { sesion, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 16, alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
        <strong>📚 Biblioteca</strong>
        <Link to="/libros">Libros</Link>
        <Can permiso="notification:read">
          <Link to="/notificaciones">Notificaciones</Link>
        </Can>
        <Can permiso="user:read">
          <Link to="/usuarios">Usuarios</Link>
        </Can>
        <span style={{ marginLeft: 'auto' }}>
          {sesion?.usuario.nombre} ({sesion?.usuario.rol}){' '}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Salir
          </button>
        </span>
      </nav>
      <Outlet />
    </div>
  );
}
