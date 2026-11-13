import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { RutaPrivada } from './components/RutaPrivada';
import { LibroDetalle } from './pages/LibroDetalle';
import { Libros } from './pages/Libros';
import { Login } from './pages/Login';
import { Notificaciones } from './pages/Notificaciones';
import { Registro } from './pages/Registro';
import { Usuarios } from './pages/Usuarios';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route
        element={
          <RutaPrivada>
            <Layout />
          </RutaPrivada>
        }
      >
        <Route path="/libros" element={<Libros />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>
      <Route path="*" element={<Navigate to="/libros" replace />} />
    </Routes>
  );
}
