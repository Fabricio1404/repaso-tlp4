import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('usuario@tp.com');
  const [password, setPassword] = useState('Usuario123');
  const [error, setError] = useState('');

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/libros');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    }
  };

  return (
    <form onSubmit={enviar} style={{ maxWidth: 320, margin: '64px auto', display: 'grid', gap: 8, fontFamily: 'system-ui' }}>
      <h1>Ingresar</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
      <button type="submit">Entrar</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <Link to="/registro">Crear cuenta</Link>
    </form>
  );
}
