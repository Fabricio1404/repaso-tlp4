import { type FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../api';
import { useAuth } from '../auth/AuthContext';
import { Can } from '../components/Can';
import type { Libro } from '../tipos';

export function Libros() {
  const { sesion } = useAuth();
  const token = sesion?.token;
  const [libros, setLibros] = useState<Libro[]>([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [error, setError] = useState('');

  const cargar = () => {
    api<Libro[]>('/libros', { token }).then(setLibros).catch((e: Error) => setError(e.message));
  };
  useEffect(cargar, [token]);

  const crear = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api('/libros', { metodo: 'POST', body: { titulo, autor }, token });
      setTitulo('');
      setAutor('');
      cargar();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    }
  };

  const eliminar = async (id: number) => {
    try {
      await api(`/libros/${id}`, { metodo: 'DELETE', token });
      cargar();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    }
  };

  return (
    <section>
      <h2>Libros</h2>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {libros.map((l) => (
          <li key={l.id}>
            <Link to={`/libros/${l.id}`}>{l.titulo}</Link> — {l.autor} [{l.estado}]{' '}
            {/* 📌 [BOTÓN SEGÚN PERMISO] Solo el admin ve "Eliminar"; igual el backend responde 403 si alguien llama directo */}
            <Can permiso="libro:delete">
              <button onClick={() => eliminar(l.id)}>Eliminar</button>
            </Can>
          </li>
        ))}
      </ul>
      <Can permiso="libro:create">
        <form onSubmit={crear} style={{ display: 'flex', gap: 8 }}>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
          <input value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" />
          <button type="submit">Agregar libro</button>
        </form>
      </Can>
    </section>
  );
}
