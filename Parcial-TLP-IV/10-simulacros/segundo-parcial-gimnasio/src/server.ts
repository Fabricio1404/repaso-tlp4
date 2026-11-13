import { crearApp } from './app';

const PUERTO = Number(process.env.PORT ?? 3000);

crearApp().listen(PUERTO, () => {
  console.log(`API del gimnasio escuchando en http://localhost:${PUERTO}`);
});
