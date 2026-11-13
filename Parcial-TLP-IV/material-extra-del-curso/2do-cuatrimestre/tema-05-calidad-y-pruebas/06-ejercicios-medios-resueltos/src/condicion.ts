export type Condicion = 'promocionado' | 'regular' | 'libre';

function validarNota(nota: number): void {
  // 📌 [DEFECTO CORREGIDO - R1] Antes: nota < 0 (aceptaba 0). Las notas van de 1 a 10
  if (!Number.isInteger(nota) || nota < 1 || nota > 10) {
    throw new RangeError(`Nota inválida: ${nota}`);
  }
}

/**
 * Calcula la condición final de un alumno.
 * Reglas: ver ENUNCIADOS.md (R1 a R5).
 */
export function calcularCondicion(parcial1: number, parcial2: number, recuperatorio?: number): Condicion {
  validarNota(parcial1);
  validarNota(parcial2);
  let n1 = parcial1;
  let n2 = parcial2;
  let recupero = false;

  if (recuperatorio !== undefined) {
    validarNota(recuperatorio);
    if (n1 < 4 || n2 < 4) {
      if (n1 <= n2) {
        n1 = recuperatorio;
      } else {
        n2 = recuperatorio;
      }
      recupero = true;
    }
  }

  const promedio = (n1 + n2) / 2;
  // 📌 [DEFECTO CORREGIDO - R2] Antes: promedio > 7 (con 7 y 7 no promocionaba). R2 dice "7 o más"
  if (!recupero && promedio >= 7 && n1 >= 6 && n2 >= 6) {
    return 'promocionado';
  }
  if (n1 >= 4 && n2 >= 4) {
    return 'regular';
  }
  return 'libre';
}
