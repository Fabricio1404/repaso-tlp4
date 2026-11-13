// 📌 [FETCH NATIVO] Sin axios (no es una librería vista). Un único lugar arma las peticiones y agrega el token
const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export class ApiError extends Error {
  readonly status: number;
  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.status = status;
  }
}

export async function api<T>(ruta: string, opciones: { metodo?: string; body?: unknown; token?: string } = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  // 📌 [AUTHORIZATION: BEARER] Así viaja el JWT en cada petición
  if (opciones.token) headers.Authorization = `Bearer ${opciones.token}`;
  const res = await fetch(`${API_URL}${ruta}`, {
    method: opciones.metodo ?? 'GET',
    headers,
    body: opciones.body === undefined ? undefined : JSON.stringify(opciones.body),
  });
  if (res.status === 204) return undefined as T;
  const datos: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const mensaje = typeof datos === 'object' && datos !== null && 'error' in datos ? String(datos.error) : res.statusText;
    throw new ApiError(res.status, mensaje);
  }
  return datos as T;
}
