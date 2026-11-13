import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import type { Notificacion } from '../tipos';

// 📌 [RF5 EN LA INTERFAZ] Lista las notificaciones in-app; las no leídas en negrita. Sin tiempo real: se consulta al entrar y cada 10 s
export function Notificaciones() {
  const { sesion } = useAuth();
  const token = sesion?.token;
  const [lista, setLista] = useState<Notificacion[]>([]);

  const cargar = () => {
    api<Notificacion[]>('/notificaciones', { token }).then(setLista).catch(() => setLista([]));
  };

  useEffect(() => {
    cargar();
    const intervalo = setInterval(cargar, 10000);
    return () => clearInterval(intervalo);
  }, [token]);

  const marcar = async (id: number) => {
    await api(`/notificaciones/${id}/leida`, { metodo: 'PATCH', token });
    cargar();
  };

  return (
    <section>
      <h2>Notificaciones ({lista.filter((n) => !n.leida).length} sin leer)</h2>
      <ul>
        {lista.map((n) => (
          <li key={n.id} style={{ fontWeight: n.leida ? 'normal' : 'bold' }}>
            {new Date(n.fecha).toLocaleString()} — {n.mensaje}{' '}
            {!n.leida && <button onClick={() => marcar(n.id)}>Marcar como leída</button>}
          </li>
        ))}
      </ul>
    </section>
  );
}
