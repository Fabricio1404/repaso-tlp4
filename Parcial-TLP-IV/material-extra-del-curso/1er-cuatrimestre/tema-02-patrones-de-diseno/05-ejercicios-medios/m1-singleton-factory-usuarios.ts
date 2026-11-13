// EJERCICIO M1 · Singleton + Factory de usuarios — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

type Rol = "admin" | "cliente" | "invitado";

// TODO: GeneradorDeIds (Singleton), Usuario (abstracta), Admin, Cliente, Invitado, FabricaUsuarios


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const altas: { rol: Rol; nombre: string }[] = [
//   { rol: "admin", nombre: "Ana" },
//   { rol: "cliente", nombre: " Beto " },
//   { rol: "invitado", nombre: "Caro" },
//   { rol: "cliente", nombre: "Dani" },
// ];
// const usuarios: Usuario[] = altas.map((a) => FabricaUsuarios.crear(a.rol, a.nombre));
// for (const u of usuarios) {
//   console.log(u.describir());
// }
// console.log(`¿Beto puede borrar? ${usuarios[1].puede("borrar")}`);
// console.log(`¿Ana puede borrar? ${usuarios[0].puede("borrar")}`);
// try {
//   FabricaUsuarios.crear("cliente", "   ");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// console.log(`Próximo id: ${GeneradorDeIds.obtenerInstancia().siguiente("TEST")}`);
