// Ejercicio 4 · ISP · Dispositivos del hogar inteligente (RESUELTO)
// Métodos "de mentira" del original:
//   Lampara.fijarTemperatura, AireAcondicionado.regularIntensidad,
//   Enchufe.regularIntensidad y Enchufe.fijarTemperatura.

export {};

// ISP: interfaces chicas; cada dispositivo implementa solo lo que sabe hacer
interface Encendible {
  encender(): string;
  apagar(): string;
}
// ISP: solo para los que regulan intensidad
interface Regulable {
  regularIntensidad(nivel: number): string;
}
// ISP: solo para los que manejan temperatura
interface ConTemperatura {
  fijarTemperatura(grados: number): string;
}

class Lampara implements Encendible, Regulable {
  encender(): string { return "Lámpara encendida"; }
  apagar(): string { return "Lámpara apagada"; }
  regularIntensidad(nivel: number): string { return `Lámpara al ${nivel}%`; }
}

class AireAcondicionado implements Encendible, ConTemperatura {
  encender(): string { return "Aire encendido"; }
  apagar(): string { return "Aire apagado"; }
  fijarTemperatura(grados: number): string { return `Aire a ${grados} °C`; }
}

class Enchufe implements Encendible {
  encender(): string { return "Enchufe con corriente"; }
  apagar(): string { return "Enchufe sin corriente"; }
}

// Cada función pide SOLO lo que usa
function modoNoche(dispositivos: Regulable[]): void {
  for (const d of dispositivos) console.log(d.regularIntensidad(20));
}

function apagarTodo(dispositivos: Encendible[]): void {
  for (const d of dispositivos) console.log(d.apagar());
}

// ---------------- Bloque de prueba ----------------
const lampara = new Lampara();
const aire = new AireAcondicionado();
const enchufe = new Enchufe();

console.log(lampara.encender());
console.log(aire.fijarTemperatura(24));
modoNoche([lampara]);                 // modoNoche([aire]) ya NO compila: el aire no es Regulable
apagarTodo([lampara, aire, enchufe]);
