import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import { Can } from '../components/Can';
import { ESTADOS, type EstadoLibro, type Libro } from '../tipos';

export function LibroDetalle() {
  const { id } = useParams();
  const { sesion } = useAuth();
  const token = sesion?.token;
  const [libro, setLibro] = useState<Libro | null>(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    api<Libro>(`/libros/${id}`, { token }).then(setLibro).catch((e: Error) => setMensaje(e.message));
  }, [id, token]);

  const ejecutar = async (accion: () => Promise<unknown>, ok: string) => {
    try {
      await accion();
      setMensaje(ok);
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : 'Error');
    }
  };

  const cambiarEstado = (estado: EstadoLibro) =>
    ejecutar(async () => setLibro(await api<Libro>(`/libros/${id}/estado`, { metodo: 'PATCH', body: { estado }, token })), `Estado cambiado a ${estado}`);

  if (libro === null) return <p>{mensaje || 'Cargando...'}</p>;
  return (
    <section>
      <h2>{libro.titulo}</h2>
      <p>
        {libro.autor} — estado: <strong>{libro.estado}</strong>
      </p>
      <Can permiso="subscription:create">
        <button onClick={() => ejecutar(() => api(`/libros/${id}/suscripcion`, { metodo: 'POST', token }), 'Te suscribiste')}>
          Suscribirme
        </button>{' '}
      </Can>
      <Can permiso="subscription:delete">
        <button onClick={() => ejecutar(() => api(`/libros/${id}/suscripcion`, { metodo: 'DELETE', token }), 'Te desuscribiste')}>
          Desuscribirme
        </button>
      </Can>
      <Can permiso="libro:change-status">
        <p>
          Cambiar estado:{' '}
          {ESTADOS.map((e) => (
            <button key={e} disabled={e === libro.estado} onClick={() => cambiarEstado(e)}>
              {e}
            </button>
          ))}
        </p>
      </Can>
      {mensaje && <p>{mensaje}</p>}
    </section>
  );
}
