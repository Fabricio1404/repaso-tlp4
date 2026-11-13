// 📌 [CAPA DE SERVICIO] Lógica de negocio pura: no conoce Express, se puede probar llamándola directo (prueba unitaria)

/** Calcula el precio luego de aplicar un porcentaje de descuento. */
export function calcularPrecioFinal(precio: number, descuento: number): number {
  // 📌 [VALIDACIÓN CON NUMBER.ISFINITE] Rechaza NaN e Infinity, que "< 0" solo no atrapa
  if (!Number.isFinite(precio) || precio < 0) {
    // 📌 [RANGEERROR] El dato es de tipo correcto (number) pero está fuera del rango permitido
    throw new RangeError('El precio debe ser un número mayor o igual a 0');
  }
  // 📌 [REGLA DE NEGOCIO] Descuento entre 0 y 100 inclusive: los bordes 0 y 100 son válidos
  if (!Number.isFinite(descuento) || descuento < 0 || descuento > 100) {
    throw new RangeError('El descuento debe estar entre 0 y 100');
  }
  return precio - (precio * descuento) / 100;
}
