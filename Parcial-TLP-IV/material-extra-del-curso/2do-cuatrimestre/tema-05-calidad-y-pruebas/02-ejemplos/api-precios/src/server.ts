import { app } from './app';

const PUERTO = Number(process.env.PORT ?? 3000);

// 📌 [SERVER] Solo acá se escucha un puerto. Los tests NO importan este archivo
app.listen(PUERTO, () => {
  console.log(`API de precios en http://localhost:${PUERTO}`);
});
