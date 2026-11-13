/**
 * Devuelve la lista de problemas de una contraseña (vacía si es válida).
 * Reglas: R4.
 */
export function validarPassword(password: string): string[] {
  const errores: string[] = [];
  // 📌 [DEFECTO CORREGIDO] Antes: length <= 8 (rechazaba 8 caracteres exactos). R4: "al menos 8"
  if (password.length < 8) {
    errores.push('Debe tener al menos 8 caracteres');
  }
  if (!/[0-9]/.test(password)) {
    errores.push('Debe tener al menos un número');
  }
  if (!/[A-Z]/.test(password)) {
    errores.push('Debe tener al menos una mayúscula');
  }
  return errores;
}
