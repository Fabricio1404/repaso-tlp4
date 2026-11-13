// ============================================================================
// EJEMPLO 7 · TYPESCRIPT BÁSICO: tipos, uniones, opcionales, unknown y narrowing
// Todo lo que el examen asume que ya sabés antes de escribir una clase.
// ============================================================================

// 📌 [TIPOS PRIMITIVOS] string, number (no hay int/float), boolean
const nombre: string = "Ana";
const edad: number = 30;
const activo: boolean = true;

// 📌 [ARREGLOS Y TUPLAS] number[] = lista de largo variable; [string, number] = tupla de largo fijo
const notas: number[] = [7, 8, 10];
const par: [string, number] = ["Ana", 30];

// 📌 [INFERENCIA] No hace falta escribir el tipo si se asigna al declarar: total ya es number
const total = notas.reduce((acc, n) => acc + n, 0);

// 📌 [UNIÓN DE LITERALES] Reemplazo de enum: solo estos valores compilan
type Talle = "S" | "M" | "L";

// 📌 [TYPE ALIAS PARA OBJETO] Describe la forma de un objeto
type Remera = { modelo: string; talle: Talle; precio: number; descuento?: number };

// 📌 [PARÁMETRO OPCIONAL] titulo? puede no pasarse; dentro de la función vale string | undefined
function saludar(persona: string, titulo?: string): string {
  // 📌 [NARROWING] El ternario comprueba titulo: en la rama verdadera TS sabe que es string
  return titulo ? `${titulo} ${persona}` : persona;
}

// 📌 [NULLISH COALESCING] ?? da un valor por defecto si descuento es undefined o null
function precioFinal(r: Remera): number {
  const descuento = r.descuento ?? 0;
  return r.precio - (r.precio * descuento) / 100;
}

// 📌 [UNKNOWN] Más seguro que any: obliga a comprobar el tipo antes de usar el valor
function describir(dato: unknown): string {
  // 📌 [TYPEOF] Narrowing para tipos primitivos
  if (typeof dato === "string") {
    return `texto de ${dato.length} letras`;
  }
  if (typeof dato === "number") {
    return `número ${dato.toFixed(1)}`;
  }
  // 📌 [ARRAY.ISARRAY] Narrowing para arreglos
  if (Array.isArray(dato)) {
    return `arreglo de ${dato.length} elementos`;
  }
  return "otra cosa";
}

// 📌 [RETORNO CON UNDEFINED] Si algo puede no encontrarse, el tipo lo dice: Remera | undefined
function buscar(remeras: Remera[], modelo: string): Remera | undefined {
  return remeras.find((r) => r.modelo === modelo);
}

// 📌 [FUNCIÓN FLECHA TIPADA]
const doble = (n: number): number => n * 2;

// Bloque de prueba
console.log(nombre, edad, activo, notas, par, total); // Ana 30 true [ 7, 8, 10 ] [ 'Ana', 30 ] 25
console.log(saludar("Pérez"), "|", saludar("Pérez", "Dra.")); // Pérez | Dra. Pérez

const stock: Remera[] = [
  { modelo: "Básica", talle: "M", precio: 10000 },
  { modelo: "Estampada", talle: "L", precio: 15000, descuento: 20 },
];
console.log(precioFinal(stock[0]), precioFinal(stock[1])); // 10000 12000

console.log(describir("hola"), "|", describir(3.14159), "|", describir([1, 2])); // texto de 4 letras | número 3.1 | arreglo de 2 elementos

const encontrada = buscar(stock, "Lisa");
// 📌 [OPTIONAL CHAINING] ?. evita el error si encontrada es undefined
console.log(encontrada?.precio ?? "no existe"); // no existe
console.log(doble(21)); // 42

// const t: Talle = "XL";   ❌ Type '"XL"' is not assignable to type 'Talle'
// let x: any;              ❌ Prohibido en el examen
