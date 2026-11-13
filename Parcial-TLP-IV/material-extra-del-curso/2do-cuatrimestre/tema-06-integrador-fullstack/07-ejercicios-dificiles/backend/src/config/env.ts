import 'dotenv/config';

function leer(nombre: string, porDefecto: string): string {
  const valor = process.env[nombre];
  return valor === undefined || valor === '' ? porDefecto : valor;
}

export const env = {
  DB_HOST: leer('DB_HOST', 'localhost'),
  DB_PORT: Number(leer('DB_PORT', '5432')),
  DB_USER: leer('DB_USER', 'tlp4'),
  DB_PASSWORD: leer('DB_PASSWORD', 'tlp4'),
  DB_NAME: leer('DB_NAME', 'tp_integrador'),
  JWT_SECRET: leer('JWT_SECRET', 'solo-para-desarrollo'),
  JWT_EXPIRES_IN: leer('JWT_EXPIRES_IN', '2h'),
  // Puerto DENTRO del contenedor. API_PORT (del .env) es el puerto del host que Compose mapea a este.
  PORT: Number(leer('PORT', '3000')),
  CORS_ORIGIN: leer('CORS_ORIGIN', 'http://localhost:5173'),
};
