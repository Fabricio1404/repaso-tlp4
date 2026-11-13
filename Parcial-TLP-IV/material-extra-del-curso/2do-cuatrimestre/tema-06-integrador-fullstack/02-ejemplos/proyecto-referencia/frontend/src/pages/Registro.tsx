import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await registrar(nombre, email, password);
      navigate('/libros');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    }
  };

  return (
    <form onSubmit={enviar} style={{ maxWidth: 320, margin: '64px auto', display: 'grid', gap: 8, fontFamily: 'system-ui' }}>
      <h1>Crear cuenta</h1>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña (8+)" />
      <button type="submit">Registrarme</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <Link to="/login">Ya tengo cuenta</Link>
    </form>
  );
}
