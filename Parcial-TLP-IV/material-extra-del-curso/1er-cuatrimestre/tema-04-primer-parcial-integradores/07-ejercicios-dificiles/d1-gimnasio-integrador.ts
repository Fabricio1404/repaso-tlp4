// EJERCICIO D1 · Gimnasio (integrador del primer cuatrimestre) — consigna completa en ENUNCIADOS.md
// Escribí todo desde cero acá abajo. Cuando termines, descomentá el bloque de prueba
// (seleccionalo y Ctrl+K Ctrl+U en VS Code) y compará con la salida esperada.

// ======================= CÓDIGO DADO (no lo modifiques) =======================
type TipoPlan = "mensual" | "trimestral" | "libre";
type Actividad = "musculacion" | "funcional" | "spinning";

// Molinete viejo de la entrada: trabaja con códigos numéricos y responde 1 (abrió) o 0 (no abrió).
class MolineteLegacy {
  private aperturas = 0;
  abrirPuerta(codigo: number): number {
    if (codigo <= 0) return 0;
    this.aperturas++;
    return 1;
  }
  contador(): number {
    return this.aperturas;
  }
}
// ===============================================================================

// TODO


// ------------------------- Bloque de prueba (descomentá) -------------------------
// const molinete = new MolineteLegacy();
// const gym = new Gimnasio(new MolineteAdapter(molinete));
// const ana = gym.alta("30111222", "Ana", "libre");
// const beto = gym.alta("30333444", "Beto", "trimestral");
// const caro = gym.alta("30555666", "Caro", "mensual");
// const dani = gym.alta("30777888", "Dani", "libre");
// try {
//   gym.alta("30111222", "Ana bis", "mensual");
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
//
// const funcional = new ClaseGrupal("funcional", "19h", 2);
// const recepcion = new RegistroRecepcion();
// funcional.suscribir(new AvisoSocio(new NotificadorWhatsapp()));
// funcional.suscribir(recepcion);
//
// funcional.inscribir(ana);
// funcional.inscribir(beto);
// funcional.inscribir(dani);
// try {
//   funcional.inscribir(caro);
// } catch (e) {
//   if (e instanceof Error) console.log(e.message);
// }
// console.log(funcional.ocupacion);
// funcional.darDeBaja("30333444");
// console.log(funcional.ocupacion);
//
// caro.cambiarPlan(FabricaPlanes.crear("trimestral"));
// dani.suspender();
// for (const linea of gym.listado()) console.log(linea);
// console.log(gym.ingresar("30111222"));
// console.log(gym.ingresar("30777888"));
// console.log(gym.ingresar("99999999"));
// console.log(`Recaudación mensual: $${gym.recaudacionMensual}`);
// console.log(`Aperturas del molinete: ${molinete.contador()}`);
// console.log(`Altas históricas: ${Socio.totalAltas()}`);
// console.log(recepcion.obtener());
