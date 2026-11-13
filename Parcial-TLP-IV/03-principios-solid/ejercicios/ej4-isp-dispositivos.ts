// Ejercicio 4 · ISP · Dispositivos del hogar inteligente
// CONSIGNA: la interface Dispositivo obliga a todos a implementar cosas que no usan.
//   1. Señalá en un comentario qué métodos son "de mentira" en cada clase.
//   2. Refactorizá aplicando ISP: interfaces chicas (Encendible, Regulable, ConTemperatura).
//      Cada clase implementa solo las que usa.
//   3. Las funciones de abajo deben pedir SOLO la interface que necesitan.
//   4. La salida debe quedar igual (salvo los "No soportado", que deben desaparecer).
// Ejecutá: node 03-principios-solid/ejercicios/ej4-isp-dispositivos.ts

export {};

interface Dispositivo {
  encender(): string;
  apagar(): string;
  regularIntensidad(nivel: number): string;
  fijarTemperatura(grados: number): string;
}

class Lampara implements Dispositivo {
  encender(): string { return "Lámpara encendida"; }
  apagar(): string { return "Lámpara apagada"; }
  regularIntensidad(nivel: number): string { return `Lámpara al ${nivel}%`; }
  fijarTemperatura(_grados: number): string { return "No soportado"; }
}

class AireAcondicionado implements Dispositivo {
  encender(): string { return "Aire encendido"; }
  apagar(): string { return "Aire apagado"; }
  regularIntensidad(_nivel: number): string { return "No soportado"; }
  fijarTemperatura(grados: number): string { return `Aire a ${grados} °C`; }
}

class Enchufe implements Dispositivo {
  encender(): string { return "Enchufe con corriente"; }
  apagar(): string { return "Enchufe sin corriente"; }
  regularIntensidad(_nivel: number): string { return "No soportado"; }
  fijarTemperatura(_grados: number): string { return "No soportado"; }
}

function modoNoche(dispositivos: Dispositivo[]): void {
  for (const d of dispositivos) console.log(d.regularIntensidad(20));
}

function apagarTodo(dispositivos: Dispositivo[]): void {
  for (const d of dispositivos) console.log(d.apagar());
}

// ---------------- Bloque de prueba ----------------
const lampara = new Lampara();
const aire = new AireAcondicionado();
const enchufe = new Enchufe();

console.log(lampara.encender());
console.log(aire.fijarTemperatura(24));
modoNoche([lampara, aire, enchufe]);
apagarTodo([lampara, aire, enchufe]);
